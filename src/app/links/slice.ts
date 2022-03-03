import { createSlice } from '@reduxjs/toolkit'
import { NewLinkData, NewLinkGroup } from '../../EmptyData'

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
            // Set data
            if (action.payload?.title) state.linkGroups[groupIndex].title = action.payload.title
            if (action.payload?.minimized !== undefined)
                state.linkGroups[groupIndex].minimized = action.payload.minimized
        },
        updateLinkData(state, action) {
            const groupIndex = state.linkGroups.findIndex(g => g.id === action.payload.groupId)
            if (groupIndex === -1) return
            const group = state.linkGroups[groupIndex]
            const linkIndex = group.links.findIndex(l => l.id === action.payload.linkId)
            if (linkIndex === -1) return
            // Set data
            if (action.payload?.title) group.links[linkIndex].title = action.payload.title
            if (action.payload?.url) group.links[linkIndex].url = action.payload.url
            if (action.payload?.imageUrl) group.links[linkIndex].imageUrl = action.payload.imageUrl
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