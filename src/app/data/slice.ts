import { createSlice } from '@reduxjs/toolkit'
import { LinkData } from '../../types'

import { DataState } from './interface'

const initialState: DataState = {
  selectedBoardId: 'default',
  boards: {
    'default': {
      id: 'default',
      title: 'Default',
      linkGroups: [],
    },
  },
}

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setBoards(state, action) {
      state.boards = action.payload
    },
    setSelectedBoardId(state, action) {
      state.selectedBoardId = action.payload
    },
    addNewBoard(state) {
      const newBoardId = `board-${Date.now()}`
      state.boards[newBoardId] = {
        id: newBoardId,
        title: newBoardId,
        linkGroups: [],
      }
    },
    updateBoard(state, action) {
      const board = state.boards[action.payload.id]
      if (!board) return
      Object.keys(action.payload).forEach(key => {
        (board as any)[key] = action.payload[key]
      });
      state.boards[action.payload.id] = board
    },

    setLinkGroups(state, action) {
      state.boards[state.selectedBoardId].linkGroups = action.payload
    },

    addLinkGroup(state, action) {
      state.boards[state.selectedBoardId].linkGroups.push(action.payload.linkGroup)
    },
    addLinkData(state, action) {
      const group = state.boards[state.selectedBoardId].linkGroups.find(g => g.id === action.payload.groupId)
      if (group) group.links.push(action.payload.linkData)
    },

    updateLinkGroup(state, action) {
      const groupIndex = state.boards[state.selectedBoardId].linkGroups.findIndex(g => g.id === action.payload.groupId)
      if (groupIndex === -1) return
      Object.keys(action.payload).forEach(key => {
        (state.boards[state.selectedBoardId].linkGroups[groupIndex])[key] = action.payload[key]
      });
    },
    updateLinkData(state, action) {
      const groupIndex = state.boards[state.selectedBoardId].linkGroups.findIndex(g => g.id === action.payload.groupId)
      if (groupIndex === -1) return
      const linkIndex = state.boards[state.selectedBoardId].linkGroups[groupIndex].links.findIndex(l => l.id === action.payload.linkId)
      if (linkIndex === -1) return
      Object.keys(action.payload).forEach(key => {
        (state.boards[state.selectedBoardId].linkGroups[groupIndex].links[linkIndex] as LinkData)[key] = action.payload[key]
      });
    },

    moveLinkData(state, action) {
      const { fromGroupId, toGroupId, fromIndex, toIndex } = action.payload

      const fromGroupIndex = state.boards[state.selectedBoardId].linkGroups.findIndex(g => g.id === fromGroupId)
      const toGroupIndex = state.boards[state.selectedBoardId].linkGroups.findIndex(g => g.id === toGroupId)
      if (fromGroupIndex === -1) return
      if (toGroupIndex === -1) return
      
      const fromGroup = state.boards[state.selectedBoardId].linkGroups[fromGroupIndex]
      const toGroup = state.boards[state.selectedBoardId].linkGroups[toGroupIndex]

      const link = fromGroup.links.splice(fromIndex, 1)[0]
      toGroup.links.splice(toIndex, 0, link)
    },
    moveLinkGroup(state, action) {
      const { fromIndex, toIndex } = action.payload
      const group = state.boards[state.selectedBoardId].linkGroups.splice(fromIndex, 1)[0]
      state.boards[state.selectedBoardId].linkGroups.splice(toIndex, 0, group)
    },

    removeLinkGroup(state, action) {
      const groupIndex = state.boards[state.selectedBoardId].linkGroups.findIndex(g => g.id === action.payload.groupId)
      if (groupIndex === -1) return
      state.boards[state.selectedBoardId].linkGroups.splice(groupIndex, 1)
    },
    removeLinkData(state, action) {
      const groupIndex = state.boards[state.selectedBoardId].linkGroups.findIndex(g => g.id === action.payload.groupId)
      if (groupIndex === -1) return
      const group = state.boards[state.selectedBoardId].linkGroups[groupIndex]
      const linkIndex = group.links.findIndex(l => l.id === action.payload.linkId)
      if (linkIndex === -1) return
      group.links.splice(linkIndex, 1)
    },
  }
})

export const { name, actions, reducer } = dataSlice