import { useEffect, useMemo, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Alert, Button, Dialog, FormControl, IconButton, InputAdornment, InputLabel, Typography } from "@mui/material"
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import { VisibilityOff, Visibility } from '@mui/icons-material';

import { isAuthOpen } from "../../app/modals/selectors"
import { actions as modalActions } from '../../app/modals/slice'
import { ButtonRow, StyledDialog } from "../../GlobalComponents"
import { Supabase } from "../../supabaseClient"
import styled from "styled-components";
import OutlinedInput from "@mui/material/OutlinedInput";
import { setSession, setUser } from "../../app/auth/slice";
import { User, Session } from "@supabase/supabase-js";

const AlertFooter = styled(Alert)`
  width: -webkit-fill-available;
  margin: 16px -24px -32px -24px;
  border-radius: 0px !important;
`

export const AuthModal = () => {

  const dispatch = useDispatch()
  
  const isOpen = useSelector(isAuthOpen)
  const handleClose = () => {
    setErrorValue('')
    dispatch(modalActions.toggleAuthModal())
    setTimeout(() => clearState(), 200)
  }

  useEffect(() => {
    Supabase.auth.refreshSession().then(({ data }) => {
      if (data) handleSuccess(data)
    })
  }, [])

  useEffect(() => {
    if (isOpen) clearState()
  }, [isOpen])

  const handleSuccess = ({user, session}: {user: User | null, session: Session | null}) => {
    if (!user || !session) return
    dispatch(setSession(session))
    dispatch(setUser(user))
    setErrorValue('')
    setSuccessValue('Success!')
  }

  const delayedClose = () => {
    setTimeout(() => handleClose(), 600)
  }

  const clearState = () => {
    setEmailValue('')
    setPasswordValue('')
    setErrorValue('')
    setSuccessValue('')
  }

  const [emailValue, setEmailValue] = useState('')
  const [passwordValue, setPasswordValue] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errorValue, setErrorValue] = useState('')
  const [successValue, setSuccessValue] = useState('')

  const disableInput = useMemo(() => isLoading || successValue !== '', [isLoading, successValue])

  // Try to login with supabase
  const login = async () => {
    setErrorValue('')
    setIsLoading(true)
    const loginResponse = await Supabase.auth.signInWithPassword({
      email: emailValue,
      password: passwordValue,
    })
    setIsLoading(false)
    if (loginResponse.error) setErrorValue(loginResponse.error.message)
    else if (loginResponse.data) {
      handleSuccess(loginResponse.data)
      delayedClose()
    }
  }

  // Try to sign up with supabase
  const signup = async () => {
    setErrorValue('')
    setIsLoading(true)
    const signupResponse = await Supabase.auth.signUp({
      email: emailValue,
      password: passwordValue,
    })
    setIsLoading(false)
    if (signupResponse.error) setErrorValue(signupResponse.error.message)
    else if (signupResponse.data) {
      handleSuccess(signupResponse.data)
      delayedClose()
    }
  }

  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <StyledDialog>
        <div style={{margin: '16px 0px', width: '100%'}}>
          <VpnKeyIcon style={{fontSize: '48px'}}/>
          <Typography style={{fontWeight: 'bold'}}>
            Login or signup
          </Typography>
        </div>
        <FormControl fullWidth required>
          <InputLabel htmlFor="email-field">Email</InputLabel>
          <OutlinedInput
            id="email-field"
            disabled={disableInput}
            fullWidth
            label="Email"
            value={emailValue}
            onChange={(e) => setEmailValue(e.target.value)}
            error={!!errorValue && !emailValue}
          />
        </FormControl>
        <FormControl fullWidth required>
          <InputLabel htmlFor="password-field">Password</InputLabel>
          <OutlinedInput
            id="password-field"
            disabled={disableInput}
            fullWidth
            label="Password"
            value={passwordValue}
            onChange={(e) => setPasswordValue(e.target.value)}
            error={!!errorValue && !passwordValue}
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword(!showPassword)}
                  onMouseDown={(e) => e.preventDefault()}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>

        <ButtonRow>
          <Button 
            disabled={disableInput}
            variant="contained" 
            color="primary" 
            onClick={signup}
          >
            Sign Up
          </Button>
          <Button 
            disabled={disableInput}
            variant="contained"
            color="primary" 
            onClick={login}
          >
            Login
          </Button>
        </ButtonRow>

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