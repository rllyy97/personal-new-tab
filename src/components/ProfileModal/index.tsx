import { useMemo, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Alert, Button, Dialog, Typography } from "@mui/material"
import VpnKeyIcon from '@mui/icons-material/VpnKey';

import { isProfileOpen } from "../../app/modals/selectors"
import { actions as modalActions } from '../../app/modals/slice'
import { StyledDialog } from "../../GlobalComponents"
import { Supabase } from "../../supabaseClient"
import styled from "styled-components";
import { setSession, setUser } from "../../app/auth/slice";
import { useAuthUser } from "../../app/auth/selectors";
import colors from "../../colors";

const AlertFooter = styled(Alert)`
  width: -webkit-fill-available;
  margin: 16px -24px -32px -24px;
  border-radius: 0px !important;
`

export const ProfileModal = () => {

  const dispatch = useDispatch()

  const user = useAuthUser()
  
  const isOpen = useSelector(isProfileOpen)
  const handleClose = () => {
    setErrorValue('')
    dispatch(modalActions.toggleProfileModal())
  }

  const handleLogoutSuccess = () => {
    setErrorValue('')
    setSuccessValue('Logged out')
    dispatch(setUser(null))
    dispatch(setSession(null))
    setTimeout(() => handleClose(), 1000)
    setTimeout(() => clearState(), 1200)
  }

  const clearState = () => {
    setErrorValue('')
    setSuccessValue('')
    setIsLoading(false)
  }

  const [isLoading, setIsLoading] = useState(false)
  const [errorValue, setErrorValue] = useState('')
  const [successValue, setSuccessValue] = useState('')

  const disableInput = useMemo(() => isLoading, [isLoading])

  // Try to logout with supabase
  const logout = async () => {
    setIsLoading(true)
    const logoutResponse = await Supabase.auth.signOut()
    if (logoutResponse.error) {
      setIsLoading(false)
      setErrorValue(logoutResponse.error.message)
    } else {
      handleLogoutSuccess()
    }
  }

  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <StyledDialog>
        <div style={{margin: '16px 0px', width: '100%'}}>
          <VpnKeyIcon style={{fontSize: '48px'}}/>
          <Typography style={{fontWeight: 'bold'}}>
            You are signed in with 
          </Typography>
          <Typography variant="h5" style={{
            fontWeight: 'bold',
            textDecoration: 'underline',
            textDecorationStyle: 'wavy',
            textDecorationColor: colors.darkGreen,
          }}>
            {user?.email}
          </Typography>
        </div>

        <Button 
          disabled={disableInput}
          variant="contained" 
          color="primary" 
          onClick={logout}
          style={{alignSelf: 'flex-start'}}
        >
          Log Out
        </Button>

        {/* Error message */}
        {errorValue ? (
          <AlertFooter severity="error" variant="filled">
            {errorValue}
          </AlertFooter>
        ) : successValue ? (
          <AlertFooter severity="success" variant="filled">
            {successValue}
          </AlertFooter>
        ) : (
          <div style={{height: '32px'}} />
        )}

      </StyledDialog>
    </Dialog>
  )
}