import { createSlice } from '@reduxjs/toolkit'

import { ModalsState } from './interface'

const initialState: ModalsState = {
  appSettingsOpen: false,
  boardSettingsOpen: false,
  groupSettingsOpen: false,
  linkSettingsOpen: false,
  authOpen: false,
  profileOpen: false,
}

const modalsSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    toggleAppSettingsModal(state) { state.appSettingsOpen = !state.appSettingsOpen },
    toggleBoardSettingsModal(state) { state.boardSettingsOpen = !state.boardSettingsOpen },
    toggleGroupSettingsModal(state) { state.groupSettingsOpen = !state.groupSettingsOpen },
    toggleLinkSettingsModal(state) { state.linkSettingsOpen = !state.linkSettingsOpen },
    toggleAuthModal(state) { state.authOpen = !state.authOpen },
    toggleProfileModal(state) { state.profileOpen = !state.profileOpen },
  }
})

export const { name, actions, reducer } = modalsSlice
export const { 
  toggleAppSettingsModal,
  toggleGroupSettingsModal,
  toggleLinkSettingsModal,
  toggleAuthModal,
  toggleProfileModal,
} = modalsSlice.actions