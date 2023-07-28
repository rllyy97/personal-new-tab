import { useCallback, useMemo, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Alert, Button, Dialog, Typography } from "@mui/material"
import VpnKeyIcon from '@mui/icons-material/VpnKey';

import { isProfileOpen } from "../../app/modals/selectors"
import { actions as modalActions } from '../../app/modals/slice'
import { StyledDialog } from "../../GlobalComponents"
import { Supabase } from "../../supabaseClient"
import styled from "styled-components";
import { setSession, setUser } from "../../app/auth/slice";
import { useAuthSession, useAuthUser } from "../../app/auth/selectors";
import colors from "../../colors";
import { setBoards } from "../../app/data/slice";

const AlertFooter = styled(Alert)`
  width: -webkit-fill-available;
  margin: 16px -24px -32px -24px;
  border-radius: 0px !important;
`

export const ProfileModal = () => {

  const dispatch = useDispatch()

  const authSession = useAuthSession()
  const authUser = useAuthUser()
  
  const isOpen = useSelector(isProfileOpen)
  const handleClose = () => {
    setErrorValue('')
    dispatch(modalActions.toggleProfileModal())
    setTimeout(() => clearState(), 200)
  }

  const handleDeleteSuccess = (message: string) => {
    setErrorValue('')
    setSuccessValue(message)
    dispatch(setUser(null))
    dispatch(setSession(null))
    dispatch(setBoards({}))
    setTimeout(() => handleClose(), 600)
  }

  const handleRestoreSuccess = (message: string) => {
    setErrorValue('')
    setSuccessValue(message)
    setTimeout(() => {
      // Refresh the page
      window.location.reload()
    }, 600)
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
      handleDeleteSuccess('Logged out')
    }
  }

  const [tryingToDeleteAccount, setTryingToDeleteAccount] = useState(false)

  // Try to delete account from supabase
  const deleteAccount = useCallback(async () => {
    if (!authUser?.id) return
    setIsLoading(true)
    const deleteResponse = await Supabase.rpc('userDeleteSelf')
    if (deleteResponse.error) {
      setIsLoading(false)
      console.error(deleteResponse)
      setErrorValue(deleteResponse.error.message)
    } else {
      handleDeleteSuccess('Account deleted')
    }
  }, [])

  const restoreBackup = useCallback(async () => {
    if (!authSession || !authUser?.id) return
    setIsLoading(true)

    try {
      const { data } = await Supabase
      .from('user_data')
      .select('backup_data')
      .eq('user_id', authSession.user.id)
      .single()

      const backupData = data?.backup_data

      if (!backupData) throw new Error('No backup data found')

      const { error } = await Supabase
        .from('user_data')
        .update({
          data: backupData,
          updated_at: new Date().toISOString(),
        })
        .eq('user_id', authSession.user.id)

      if (error) throw error?.message
      handleRestoreSuccess('Data restored')
    } catch (error: any) {
      setIsLoading(false)
      console.error(error)
      setErrorValue(error)
    }
  }, [authUser])

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
            {authUser?.email}
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
            <Button 
              disabled={disableInput}
              color="info" 
              onClick={restoreBackup}
              size="small"
            >
              Restore backup
            </Button>
          </>
        ) : (
          <>
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
            <Button 
              variant="outlined"
              color="primary"
              onClick={() => setTryingToDeleteAccount(false)}
            >
              Cancel
            </Button>
          </>
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