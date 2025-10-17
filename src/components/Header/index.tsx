import { useDispatch } from "react-redux"
import { VpnKey } from "@mui/icons-material"
import GitHubIcon from '@mui/icons-material/GitHub';
import { FlexDiv } from "../../GlobalComponents"
import { ChipIconButton } from "../../styles"
import BoardSelection from "../BoardSelection"
import Clock from "../Clock"
import { useAuthSession } from "../../app/auth/selectors"
import { toggleProfileModal, toggleAuthModal } from "../../app/modals/slice"


const Header = () => {

  const authSession = useAuthSession()
  const dispatch = useDispatch()

	const projectVersion = APP_VERSION ?? 'dev'

  return (
    <FlexDiv style={{justifyContent: 'space-between', marginBottom: '16px'}}>
      <FlexDiv style={{gap: '32px'}}>
        <h1 style={{opacity: '0.15'}} title={projectVersion}>{"// New Tab"}</h1>
        <BoardSelection />
      </FlexDiv>
      <FlexDiv style={{gap: '16px'}}>
        <a href={"https://github.com/rllyy97/personal-new-tab"} target="_blank" rel="noopener noreferrer">
          <ChipIconButton
            icon={<GitHubIcon />}
            color={'default'}
            onClick={() => {}}
          />
        </a>
        <ChipIconButton
          icon={<VpnKey />} 
          color={authSession ? 'primary' : 'default'}
          onClick={() => dispatch(authSession ? toggleProfileModal() : toggleAuthModal())}
        />
        <Clock />
      </FlexDiv>
    </FlexDiv>
  )
}

export default Header