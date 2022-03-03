import { createSelector } from "@reduxjs/toolkit"
import { AppState } from "../store"

export const getAppStatusData = (state: AppState) => state.appStatus

export const getSelectedGroupId = createSelector(getAppStatusData, data => data.selectedGroupId)
export const getSelectedLinkId = createSelector(getAppStatusData, data => data.selectedLinkId)
