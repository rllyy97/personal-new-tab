import { Alert, Button, CircularProgress, CssBaseline, Snackbar, ThemeProvider } from '@mui/material'
import { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useLinkGroups, useNotes, useSerializedData } from './app/data/selectors'
import { actions } from './app/data/slice'
import LinkGroupTile from './components/LinkGroupTile'
import { FlexDiv } from './GlobalComponents'

import { ContentWrapper, SiteWrapper } from './styles'
import { RootData } from './types'

import AddIcon from '@mui/icons-material/Add'
import { theme } from './theme'
import { LinkSettingsModal } from './components/LinkSettingsModal'
import { NewBoard } from './EmptyData'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { GroupSettingsModal } from './components/GroupSettingsModal'
import ContextMenu from './components/ContextMenu'
import { CustomDragLayer } from './components/CustomDragLayer/CustomDragLayer'
import { AuthModal } from './components/AuthModal'
import { useAuthSession, useAuthUser } from './app/auth/selectors'
import { ProfileModal } from './components/ProfileModal'
import { Supabase } from './supabaseClient'
import useDebouncedEffect from './hooks/useDebouncedEffect'
import BoardSettingsModal from './components/BoardSettingsModal'
import Header from './components/Header'
import NoteGroupTile from './components/NoteGroupTile'

function App() {

  const dispatch = useDispatch()

  const authSession = useAuthSession()
  const authUser = useAuthUser()
  const [isAuthLoading, setIsAuthLoading] = useState(false)

  const linkGroups = useLinkGroups()

  const serializedData: any = useSerializedData()

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
    dispatch(actions.setUsername(data.username));
    let _boards = data?.boards
    if (!_boards) _boards = {'default': NewBoard('default')}
    dispatch(actions.setBoards(_boards))
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

    if (
      Object.keys(serializedData).length < 1
      || Object.keys(serializedData?.boards).length < 1
    ) return

    if (!authSession || !authUser) return

    let shouldSaveBackup = false
    const { data } = await Supabase
      .from('user_data')
      .select('backup_updated_at')
      .eq('user_id', authSession.user.id)
      .single()
    const lastBackupTimestamp = new Date(data?.backup_updated_at)
    const currentTimestamp = new Date()
    // if it's been more than 7 days, set shouldSaveBackup to true
    if (currentTimestamp.getTime() - lastBackupTimestamp.getTime() > 604800000) {
      shouldSaveBackup = true
    }

    const { error } = await Supabase
      .from('user_data')
      .update({
        data: serializedData,
        updated_at: new Date().toISOString(),
        ...(shouldSaveBackup ? {
          backup_data: serializedData,
          backup_updated_at: new Date().toISOString(),
        } : {})
      })
      .eq('user_id', authSession.user.id)

    if (error) openAlert(error.message, 'error')
    else if (shouldSaveBackup) openAlert('Saved backup', 'info')

  }, [authSession, authUser, serializedData])
  useDebouncedEffect(saveData, 1000, [saveData])

  /////////////////////////////////////////////////////////
  /// RENDER

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <DndProvider backend={HTML5Backend}>
        <SiteWrapper>
          <ContentWrapper>
          <CustomDragLayer />
            <Header />

            {isAuthLoading ? 
              <CircularProgress style={{margin: '8px auto'}} />
            : authSession &&
              <>
                <NoteGroupTile />

                {linkGroups.map((group, index) => <LinkGroupTile key={group.id} index={index} linkGroup={group} />)}

                <FlexDiv>
                  <Button
                    variant="contained"
                    onClick={() => dispatch(actions.addLinkGroup())}
                    startIcon={<AddIcon />}
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
          <BoardSettingsModal />
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
