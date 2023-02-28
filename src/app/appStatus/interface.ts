import { ItemType } from "../../types"

export interface AppStatusState {
  selectedType: ItemType | undefined
  selectedBoardId: string
  selectedGroupId: string
  selectedLinkId: string
  draggedLinkId: string

  contextMenuPos: {
    x: number
    y: number
  } | null
  
}