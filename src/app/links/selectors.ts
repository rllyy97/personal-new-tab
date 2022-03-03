import { createSelector } from "@reduxjs/toolkit"
import { AppState } from "../store"

export const getLinkData = (state: AppState) => state.links

export const getLinkGroups = createSelector(getLinkData, data => data.linkGroups ?? [])
