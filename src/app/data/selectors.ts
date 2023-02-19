import { AppState } from "../store"
import { useSelector } from "react-redux"


export const useBoards = () => useSelector((state: AppState) => state.links.boards)
export const useSelectedBoardId = () => useSelector((state: AppState) => state.links.selectedBoardId)

export const useLinkGroups = () => useSelector((state: AppState) => state.links.boards?.[state.links.selectedBoardId]?.linkGroups ?? [])
