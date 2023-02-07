import { createSlice } from '@reduxjs/toolkit'

import { AuthState } from './interface'

const initialState: AuthState = {
  user: null,
  session: null,
  error: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action) { state.user = action.payload },
    setSession(state, action) { state.session = action.payload },
    setError(state, action) { state.error = action.payload },
  }
})

export const { name, actions, reducer } = authSlice
export const {
  setUser,
  setSession,
  setError,
} = authSlice.actions