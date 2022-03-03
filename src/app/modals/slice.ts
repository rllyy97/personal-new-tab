import { createSlice } from '@reduxjs/toolkit'

import { ModalsState } from './interface'

const initialState: ModalsState = {
    appSettingsOpen: false,
    groupSettingsOpen: false,
    linkSettingsOpen: false,
}

const modalsSlice = createSlice({
    name: 'modals',
    initialState,
    reducers: {
        toggleAppSettingsModal(state) { state.appSettingsOpen = !state.appSettingsOpen },
        toggleGroupSettingsModal(state) { state.groupSettingsOpen = !state.groupSettingsOpen },
        toggleLinkSettingsModal(state) { state.linkSettingsOpen = !state.linkSettingsOpen },
    }
})

export const { name, actions, reducer } = modalsSlice