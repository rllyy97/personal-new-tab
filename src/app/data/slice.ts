import { createSlice } from '@reduxjs/toolkit'
import { LinkData, NoteData } from '../../types'

import { DataState } from './interface'
import { NewBoard, NewLinkGroup, NewNoteData } from '../../EmptyData'

const initialState: DataState = {
  username: '',
  activeBoardId: '',
  boards: {},
}

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setUsername(state, action) {
      state.username = action.payload
    },
    setBoards(state, action) {
      state.boards = action.payload
    },
    setActiveBoardId(state, action) {
      state.activeBoardId = action.payload
    },
    addNewBoard(state) {
      const id = `board-${Date.now()}`
      state.boards[id] = NewBoard(id)
      state.activeBoardId = id
    },
    updateBoard(state, action) {
      const board = state.boards[action.payload.id]
      if (!board) return
      Object.keys(action.payload).forEach(key => {
        (board as any)[key] = action.payload[key]
      });
      state.boards[action.payload.id] = board
    },
    deleteBoard(state, action) {
      delete state.boards[action.payload]
      if (state.activeBoardId === action.payload) {
        if (Object.keys(state.boards).length === 0) {
          // If there are no boards left, create a new one
          const id = `board-${Date.now()}`
          state.boards[id] = NewBoard(id)
          state.activeBoardId = id
        } else {
          // Otherwise, just set the active board to the first one
          state.activeBoardId = Object.keys(state.boards)[0]
        }
      }
    },

    setLinkGroups(state, action) {
      state.boards[state.activeBoardId].linkGroups = action.payload
    },

    addLinkGroup(state) {
      state.boards[state.activeBoardId].linkGroups.push(NewLinkGroup())
    },
    addLinkData(state, action) {
      const group = state.boards[state.activeBoardId].linkGroups.find(g => g.id === action.payload.groupId)
      if (group) group.links.push(action.payload.linkData)
    },
    addNoteData(state) {
      if (!state.boards[state.activeBoardId].notes) {
        state.boards[state.activeBoardId].notes = []
      }
      state.boards[state.activeBoardId].notes.push(NewNoteData())
    },

    updateLinkGroup(state, action) {
      const groupIndex = state.boards[state.activeBoardId].linkGroups.findIndex(g => g.id === action.payload.groupId)
      if (groupIndex === -1) return
      Object.keys(action.payload).forEach(key => {
        (state.boards[state.activeBoardId].linkGroups[groupIndex])[key] = action.payload[key]
      });
    },
    updateLinkData(state, action) {
      const groupIndex = state.boards[state.activeBoardId].linkGroups.findIndex(g => g.id === action.payload.groupId)
      if (groupIndex === -1) return
      const linkIndex = state.boards[state.activeBoardId].linkGroups[groupIndex].links.findIndex(l => l.id === action.payload.linkId)
      if (linkIndex === -1) return
      Object.keys(action.payload).forEach(key => {
        (state.boards[state.activeBoardId].linkGroups[groupIndex].links[linkIndex] as LinkData)[key] = action.payload[key]
      });
    },
    updateNoteData(state, action) {
      const noteIndex = state.boards[state.activeBoardId].notes.findIndex(n => n.id === action.payload.id)
      if (noteIndex === -1) return
      Object.keys(action.payload).forEach(key => {
        (state.boards[state.activeBoardId].notes[noteIndex] as NoteData)[key] = action.payload[key]
      });
    },

    moveLinkData(state, action) {
      const { fromGroupId, toGroupId, fromIndex, toIndex } = action.payload

      const fromGroupIndex = state.boards[state.activeBoardId].linkGroups.findIndex(g => g.id === fromGroupId)
      const toGroupIndex = state.boards[state.activeBoardId].linkGroups.findIndex(g => g.id === toGroupId)
      if (fromGroupIndex === -1) return
      if (toGroupIndex === -1) return
      
      const fromGroup = state.boards[state.activeBoardId].linkGroups[fromGroupIndex]
      const toGroup = state.boards[state.activeBoardId].linkGroups[toGroupIndex]

      const link = fromGroup.links.splice(fromIndex, 1)[0]
      toGroup.links.splice(toIndex, 0, link)
    },
    moveLinkGroup(state, action) {
      const { fromIndex, toIndex } = action.payload
      const group = state.boards[state.activeBoardId].linkGroups.splice(fromIndex, 1)[0]
      state.boards[state.activeBoardId].linkGroups.splice(toIndex, 0, group)
    },
    moveNoteData(state, action) {
      const { fromIndex, toIndex } = action.payload
      const note = state.boards[state.activeBoardId].notes.splice(fromIndex, 1)[0]
      state.boards[state.activeBoardId].notes.splice(toIndex, 0, note)
    },

    removeLinkGroup(state, action) {
      const groupIndex = state.boards[state.activeBoardId].linkGroups.findIndex(g => g.id === action.payload.groupId)
      if (groupIndex === -1) return
      state.boards[state.activeBoardId].linkGroups.splice(groupIndex, 1)
    },
    removeLinkData(state, action) {
      const groupIndex = state.boards[state.activeBoardId].linkGroups.findIndex(g => g.id === action.payload.groupId)
      if (groupIndex === -1) return
      const group = state.boards[state.activeBoardId].linkGroups[groupIndex]
      const linkIndex = group.links.findIndex(l => l.id === action.payload.linkId)
      if (linkIndex === -1) return
      group.links.splice(linkIndex, 1)
    },
    removeNoteData(state, action) {
      const noteIndex = state.boards[state.activeBoardId].notes.findIndex(n => n.id === action.payload.id)
      if (noteIndex === -1) return
      state.boards[state.activeBoardId].notes.splice(noteIndex, 1)
    }
  }
})

export const { name, actions, reducer } = dataSlice
export const {
  setUsername,
  setBoards,
  setActiveBoardId,
  addNewBoard,
  updateBoard,
  deleteBoard,
  setLinkGroups,
  addLinkGroup,
  addLinkData,
  addNoteData,
  updateLinkGroup,
  updateLinkData,
  updateNoteData,
  moveLinkData,
  moveLinkGroup,
  moveNoteData,
  removeLinkGroup,
  removeLinkData,
  removeNoteData,
} = actions
