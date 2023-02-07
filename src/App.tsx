import { Button, Chip, CssBaseline, ThemeProvider } from '@mui/material'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getLinkGroups } from './app/links/selectors'
import { actions as linkActions } from './app/links/slice'
import Clock from './components/Clock'
import LinkGroupTile from './components/LinkGroupTile'
import { FlexDiv } from './GlobalComponents'

import { ChipIconButton, ContentWrapper, SiteWrapper } from './styles'
import { LocalData } from './types'

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


function App() {

  const dispatch = useDispatch()

  const authSession = useAuthSession()
  const authUser = useAuthUser()

  const [username, setUsername] = useState('User')
  const [notes, setNotes] = useState<string[]>([])
  const [backgroundColor, setBackgroundColor] = useState('#202124')
  const [textColor, setTextColor] = useState('#ffffff')

  const linkGroups = useSelector(getLinkGroups)
  
  useEffect(() => {
    const dataString = localStorage.getItem('data')
    if (dataString) { // Set data from local storage
      const data = JSON.parse(dataString) as LocalData
      setUsername(data.username)
      setNotes(data.notes)
      setBackgroundColor(data.backgroundColor)
      dispatch(linkActions.setLinkGroups(data.linkGroups))
    }
  }, [])

  const saveData = () => {
    const cleanedLinkGroups = linkGroups.map(group => ({
      ...group, links: group.links.filter(link => link !== null)
    }))
    
    let temp = { username, notes, backgroundColor, linkGroups: cleanedLinkGroups }

    localStorage.setItem('data', JSON.stringify(temp))
  }
  window.addEventListener('beforeunload', saveData)


  /////////////////////////////////////////////////////////////////////////////////////////////////
  /// RENDER

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <DndProvider backend={HTML5Backend}>
        <SiteWrapper backgroundColor={backgroundColor} textColor={textColor}>
          <ContentWrapper>
          <CustomDragLayer />
            <h1 style={{opacity: '0.15', marginBottom: '16px'}}>// New Tab</h1>
            <ChipIconButton 
              icon={<VpnKey />} 
              onClick={() => dispatch(authSession ? toggleProfileModal() : toggleAuthModal())} 
              style={{
                position: 'absolute',
                left: '50%',
                transform: 'translateX(-50%)',
                ...(authSession ? {backgroundColor: colors.darkGreen} : {}),
              }}
            />
            <Clock />

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

            <ContextMenu />
          </ContentWrapper>
          {/* Modals */}
          <LinkSettingsModal />
          <GroupSettingsModal />
          <AuthModal />
          <ProfileModal />
          {/*  */}
        </SiteWrapper>
      </DndProvider>
    </ThemeProvider>
  )
}

export default App
