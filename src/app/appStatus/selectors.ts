import { createSelector } from "@reduxjs/toolkit"
import { useSelector } from "react-redux"
import { AppState } from "../store"

export const getAppStatusData = (state: AppState) => state.appStatus

export const getSelectionType = createSelector(getAppStatusData, data => data.selectedType)
export const getSelectedGroupId = createSelector(getAppStatusData, data => data.selectedGroupId)
export const getSelectedLinkId = createSelector(getAppStatusData, data => data.selectedLinkId)
export const getDraggedLinkId = createSelector(getAppStatusData, data => data.draggedLinkId)

export const getContextMenuPos = createSelector(getAppStatusData, data => data.contextMenuPos)


export const useSelectedGroup = () => (
  useSelector((state: AppState) => (
    state.links.boards[state.links.selectedBoardId].linkGroups?.find(g => g.id === state.appStatus.selectedGroupId)
  ))
)
export const useGroup = (id: string) => (
  useSelector((state: AppState) => (
    state.links.boards[state.links.selectedBoardId].linkGroups?.find(g => g.id === id)
  ))
)

export const useSelectedLink = () => (
  useSelector((state: AppState) => (
    state.links.boards[state.links.selectedBoardId].linkGroups?.find(g => g.id === state.appStatus.selectedGroupId)?.links.find(l => l.id === state.appStatus.selectedLinkId)
  ))
)

export const useDraggedLink = () => (
  useSelector((state: AppState) => (
    state.links.boards[state.links.selectedBoardId].linkGroups?.find(g => g.id === state.appStatus.selectedGroupId)?.links.find(l => l.id === state.appStatus.draggedLinkId)
  ))
)
