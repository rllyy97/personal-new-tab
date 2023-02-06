import { createSlice } from '@reduxjs/toolkit'
import { LinkData } from '../../types'

import { LinksState } from './interface'

const initialState: LinksState = {
  linkGroups: [],
}

const linksSlice = createSlice({
  name: 'links',
  initialState,
  reducers: {
    setLinkGroups(state, action) {state.linkGroups = action.payload},

    addLinkGroup(state, action) {
      state.linkGroups.push(action.payload.linkGroup)
    },
    addLinkData(state, action) {
      const group = state.linkGroups.find(g => g.id === action.payload.groupId)
      if (group) group.links.push(action.payload.linkData)
    },

    updateLinkGroup(state, action) {
      const groupIndex = state.linkGroups.findIndex(g => g.id === action.payload.groupId)
      if (groupIndex === -1) return
      Object.keys(action.payload).forEach(key => {
        (state.linkGroups[groupIndex])[key] = action.payload[key]
      });
    },
    updateLinkData(state, action) {
      const groupIndex = state.linkGroups.findIndex(g => g.id === action.payload.groupId)
      if (groupIndex === -1) return
      const linkIndex = state.linkGroups[groupIndex].links.findIndex(l => l.id === action.payload.linkId)
      if (linkIndex === -1) return
      Object.keys(action.payload).forEach(key => {
        (state.linkGroups[groupIndex].links[linkIndex] as LinkData)[key] = action.payload[key]
      });
    },

    moveLinkData(state, action) {
      const { fromGroupId, toGroupId, fromIndex, toIndex } = action.payload

      const fromGroupIndex = state.linkGroups.findIndex(g => g.id === fromGroupId)
      const toGroupIndex = state.linkGroups.findIndex(g => g.id === toGroupId)
      if (fromGroupIndex === -1) return
      if (toGroupIndex === -1) return
      
      const fromGroup = state.linkGroups[fromGroupIndex]
      const toGroup = state.linkGroups[toGroupIndex]

      const link = fromGroup.links.splice(fromIndex, 1)[0]
      toGroup.links.splice(toIndex, 0, link)
    },
    moveLinkGroup(state, action) {
      const { fromIndex, toIndex } = action.payload
      const group = state.linkGroups.splice(fromIndex, 1)[0]
      state.linkGroups.splice(toIndex, 0, group)
    },

    removeLinkGroup(state, action) {
      const groupIndex = state.linkGroups.findIndex(g => g.id === action.payload.groupId)
      if (groupIndex === -1) return
      state.linkGroups.splice(groupIndex, 1)
    },
    removeLinkData(state, action) {
      const groupIndex = state.linkGroups.findIndex(g => g.id === action.payload.groupId)
      if (groupIndex === -1) return
      const group = state.linkGroups[groupIndex]
      const linkIndex = group.links.findIndex(l => l.id === action.payload.linkId)
      if (linkIndex === -1) return
      group.links.splice(linkIndex, 1)
    },
  }
})

export const { name, actions, reducer } = linksSlice