import { Alert, Button, CircularProgress, CssBaseline, Snackbar, ThemeProvider } from '@mui/material'
import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getLinkGroups } from './app/links/selectors'
import { actions as linkActions } from './app/links/slice'
import Clock from './components/Clock'
import LinkGroupTile from './components/LinkGroupTile'
import { FlexDiv } from './GlobalComponents'

import { ChipIconButton, ContentWrapper, SiteWrapper } from './styles'
import { RootData } from './types'

import AddIcon from '@mui/icons-material/Add'
import { theme } from './theme'
import { LinkSettingsModal } from './components/LinkSettingsModal'
import { NewLinkGroup } from './EmptyData'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { GroupSettingsModal } from './components/GroupSettingsModal'
import ContextMenu from './components/ContextMenu'
import colors from './colors'
import { CustomDragLayer } from './components/CustomDragLayer/CustomDragLayer'
import { AuthModal } from './components/AuthModal'
import { toggleAuthModal, toggleProfileModal } from './app/modals/slice'
import { useAuthSession, useAuthUser } from './app/auth/selectors'
import { VpnKey } from '@mui/icons-material'
import { ProfileModal } from './components/ProfileModal'
import { Supabase } from './supabaseClient'
import useDebouncedEffect from './hooks/useDebouncedEffect'


function App() {

  const dispatch = useDispatch()

  const authSession = useAuthSession()
  const authUser = useAuthUser()
  const [isAuthLoading, setIsAuthLoading] = useState(false)

  const [username, setUsername] = useState('User')
  const [notes, setNotes] = useState<string[]>([])
  const [backgroundColor, setBackgroundColor] = useState(colors.background)
  const [textColor, setTextColor] = useState('#ffffff')

  const linkGroups = useSelector(getLinkGroups)

  const [isAlertOpen, setIsAlertOpen] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')
  const [alertSeverity, setAlertSeverity] = useState<'success' | 'error' | 'info' | 'warning'>('success')

  const openAlert = (message: string, severity: 'success' | 'error' | 'info' | 'warning') => {
    setAlertMessage(message)
    setAlertSeverity(severity)
    setIsAlertOpen(true)
  }

  const closeAlert = () => setIsAlertOpen(false)

  ///////////////////////////////////////////////////////// 
  /// READ

  const initData = useCallback((data: RootData) => {
    setUsername(data.username)
    setNotes(data.notes)
    setBackgroundColor(data.backgroundColor)
    dispatch(linkActions.setLinkGroups(data.linkGroups))
  }, [dispatch])

  const readDataRemote = useCallback(async () => {
    if (authSession) {
      setIsAuthLoading(true)
      const { data, error } = await Supabase.from('user_data').select('*').eq('user_id', authSession.user.id).single()
      if (data?.data) initData(data?.data)
      if (error) {
        // If no data exists for that id, create it
        if (error.message === 'JSON object requested, multiple (or no) rows returned') {
          const { data, error } = await Supabase.from('user_data').insert([
            { user_id: authSession.user.id, data: null }
          ])
          if (error) openAlert(error.message, 'error')
        } else {
          openAlert(error.message, 'error')
        }
      }
      setIsAuthLoading(false)
    }
  }, [authSession, initData])

  useEffect(() => {
    if (authSession) readDataRemote()
  }, [authSession, readDataRemote])

  /////////////////////////////////////////////////////////
  /// WRITE

  const saveData = useCallback(async () => {
    const cleanedLinkGroups = linkGroups.map(group => ({
      ...group, links: group.links.filter(link => link !== null)
    }))
    
    let serializedData = { 
      username, 
      notes, 
      backgroundColor, 
      linkGroups: cleanedLinkGroups,
    }

    if (Object.keys(serializedData).length === 0) return

    if (authSession && authUser) {
      const { error } = await Supabase.from('user_data').update({
        data: serializedData,
        updated_at: new Date().toISOString()
      }).eq('user_id', authSession.user.id)

      if (error) openAlert(error.message, 'error')
    }
  }, [authSession, authUser, backgroundColor, linkGroups, notes, username])
  useDebouncedEffect(saveData, 1000, [saveData])


  /////////////////////////////////////////////////////////
  /// RENDER

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <DndProvider backend={HTML5Backend}>
        <SiteWrapper backgroundColor={backgroundColor} textColor={textColor}>
          <ContentWrapper>
          <CustomDragLayer />
            <h1 style={{opacity: '0.15', marginBottom: '16px'}}>{"// New Tab"}</h1>
            <ChipIconButton 
              icon={<VpnKey />} 
              onClick={() => dispatch(authSession ? toggleProfileModal() : toggleAuthModal())} 
              style={{
                position: 'absolute',
                left: '50%',
                transform: 'translateX(-50%)',
                transition: 'background-color 0.2s',
                ...(authSession ? {backgroundColor: colors.darkGreen} : {}),
              }}
            />
            <Clock />

            {isAuthLoading ? 
              <CircularProgress style={{margin: '8px auto'}} />
            : authSession &&
              <>
                {linkGroups.map((group, index) => <LinkGroupTile key={group.id} index={index} linkGroup={group} />)}

                <FlexDiv>
                  <Button 
                    variant="contained"
                    onClick={() => dispatch(linkActions.addLinkGroup({linkGroup: NewLinkGroup()}))}
                    color="primary"
                    startIcon={<AddIcon />}
                    // style={{color: 'black'}}
                  >
                    Add Group
                  </Button>
                </FlexDiv>
              </>
            }

            <ContextMenu />
          </ContentWrapper>
          {/* Modals */}
          <LinkSettingsModal />
          <GroupSettingsModal />
          <AuthModal />
          <ProfileModal />
          {/* Alert */}
          <Snackbar open={isAlertOpen} autoHideDuration={6000} onClose={closeAlert}>
            <Alert onClose={closeAlert} severity={alertSeverity}>
              {alertMessage}
            </Alert>
          </Snackbar>
        </SiteWrapper>
      </DndProvider>
    </ThemeProvider>
  )
}

export default App
