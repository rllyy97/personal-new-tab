import { Button, CssBaseline, ThemeProvider, useTheme } from '@mui/material'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getLinkGroups } from './app/links/selectors'
import { actions as linkActions } from './app/links/slice'
import Clock from './components/Clock'
import LinkGroupTile from './components/LinkGroupTile'
import { FlexDiv, InvisibleInput } from './GlobalComponents'

import { ContentWrapper, SiteWrapper } from './styles'
import { LocalData } from './types'

import AddIcon from '@mui/icons-material/Add'
import { theme } from './theme'
import { LinkSettingsModal } from './components/LinkSettingsModal'
import { NewLinkGroup } from './EmptyData'

function App() {

  const dispatch = useDispatch()

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
    let temp = { username, notes, backgroundColor, linkGroups }
    localStorage.setItem('data', JSON.stringify(temp))
  }
  window.addEventListener('beforeunload', saveData)


  /////////////////////////////////////////////////////////////////////////////////////////////////
  /// RENDER

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SiteWrapper backgroundColor={backgroundColor} textColor={textColor}>
        <ContentWrapper>
          <h1 style={{opacity: '0.3', marginBottom: '16px'}}>// New Tab</h1>
          {/* <h3>
            Welcome&nbsp;
            <InvisibleInput value={username} onChange={(e) => setUsername(e.target.value)}/>
          </h3> */}
          <Clock />

          {linkGroups.map((group) => <LinkGroupTile linkGroup={group} />)}

          <FlexDiv>
            <Button 
              variant="contained"
              onClick={() => dispatch(linkActions.addLinkGroup({linkGroup: NewLinkGroup()}))}
              startIcon={<AddIcon />}
            >
              Add Group
            </Button>
          </FlexDiv>
        </ContentWrapper>

        <LinkSettingsModal />
      </SiteWrapper>
    </ThemeProvider>
  )
}

export default App
