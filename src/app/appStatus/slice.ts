import { createSlice } from '@reduxjs/toolkit'

import { AppStatusState } from './interface'

const initialState: AppStatusState = {
  selectedGroupId: '',
  selectedLinkId: '',
}

const appStatusSlice = createSlice({
    name: 'modals',
    initialState,
    reducers: {
        setSelectedGroupId(state, action) { state.selectedGroupId = action.payload },
        setSelectedLinkId(state, action) { state.selectedLinkId = action.payload },
        clearSelectedIds(state) {
          state.selectedLinkId = ''
          state.selectedGroupId = ''
        },
    }
})

export const { name, actions, reducer } = appStatusSlice