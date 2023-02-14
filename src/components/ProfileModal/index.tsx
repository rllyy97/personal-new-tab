import { useMemo, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Alert, Button, Dialog, Divider, Typography } from "@mui/material"
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
    setTimeout(() => clearState(), 200)
  }

  const handleSuccess = (message: string) => {
    setErrorValue('')
    setSuccessValue(message)
    dispatch(setUser(null))
    dispatch(setSession(null))
    setTimeout(() => handleClose(), 600)
  }

  const clearState = () => {
    setErrorValue('')
    setSuccessValue('')
    setIsLoading(false)
    setTryingToDeleteAccount(false)
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
      handleSuccess('Logged out')
    }
  }

  const [tryingToDeleteAccount, setTryingToDeleteAccount] = useState(false)

  // Try to delete account from supabase
  const deleteAccount = async () => {
    if (!user?.id) return
    setIsLoading(true)
    const deleteResponse = await Supabase.rpc('userDeleteSelf')
    if (deleteResponse.error) {
      setIsLoading(false)
      console.error(deleteResponse)
      setErrorValue(deleteResponse.error.message)
    } else {
      handleSuccess('Account deleted')
    }
  }

  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <StyledDialog
        style={{alignItems: 'flex-start'}}
      >
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

        {!tryingToDeleteAccount ? (
          <>
            <Button 
              disabled={disableInput}
              variant="contained" 
              color="primary" 
              onClick={logout}
            >
              Log Out
            </Button>
            <Button 
              disabled={disableInput}
              color="error" 
              onClick={() => setTryingToDeleteAccount(true)}
              size="small"
            >
              Delete Account
            </Button>
          </>
        ) : (
          <div style={{
            background: colors.red,
            padding: '48px 16px',
            borderRadius: '8px',
            display: 'flex',
            gap: '16px',
            alignItems: 'center',
            flexDirection: 'column',
            textAlign: 'center',
            width: '100%',
          }}>
            <p>
              This action is irreversible, <br />
              and all of your data will be deleted.
            </p>
            <Button
              disabled={disableInput}
              variant="contained"
              onClick={deleteAccount}
              color="error"
              style={{background: colors.backgroundLight}}
            >
              Delete Account
            </Button>
          </div>
        )}

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