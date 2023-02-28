import { createSelector } from "@reduxjs/toolkit"
import { AppState } from "../store"

export const getModalData = (state: AppState) => state.modals

export const isAppSettingsOpen = createSelector(getModalData, data => data.appSettingsOpen)
export const isBoardSettingsOpen = createSelector(getModalData, data => data.boardSettingsOpen)
export const isGroupSettingsOpen = createSelector(getModalData, data => data.groupSettingsOpen)
export const isLinkSettingsOpen = createSelector(getModalData, data => data.linkSettingsOpen)
export const isAuthOpen = createSelector(getModalData, data => data.authOpen)
export const isProfileOpen = createSelector(getModalData, data => data.profileOpen)
