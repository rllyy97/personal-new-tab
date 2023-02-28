import { createSlice } from '@reduxjs/toolkit'

import { AppStatusState } from './interface'

const initialState: AppStatusState = {
  selectedType: undefined,
  selectedBoardId: '',
  selectedGroupId: '',
  selectedLinkId: '',
  draggedLinkId: '',

  contextMenuPos: null,
}

const appStatusSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    setSelectedType(state: AppStatusState, action: any) { state.selectedType = action.payload },
    setSelectedBoardId(state: AppStatusState, action: any) { state.selectedBoardId = action.payload },
    setSelectedGroupId(state: AppStatusState, action: any) { state.selectedGroupId = action.payload },
    setSelectedLinkId(state: AppStatusState, action: any) { state.selectedLinkId = action.payload },
    setDraggedLinkId(state: AppStatusState, action: any) { state.draggedLinkId = action.payload },
    clearSelectedIds(state: AppStatusState) {
      state.selectedType = undefined
      state.selectedLinkId = ''
      state.selectedGroupId = ''
    },
    setContextMenuPos(state: AppStatusState, action: any) { state.contextMenuPos = action.payload },
  }
})

export const { name, actions, reducer } = appStatusSlice