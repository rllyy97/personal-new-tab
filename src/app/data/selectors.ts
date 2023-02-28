import { AppState } from "../store"
import { useSelector } from "react-redux"


export const useBoards = () => useSelector((state: AppState) => state.links.boards)
export const useActiveBoardId = () => useSelector((state: AppState) => state.links.activeBoardId)

export const useLinkGroups = () => useSelector((state: AppState) => state.links.boards?.[state.links.activeBoardId]?.linkGroups ?? [])
