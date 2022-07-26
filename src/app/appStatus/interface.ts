import { ItemType } from "../../types"

export interface AppStatusState {
  selectedType: ItemType | undefined
  selectedGroupId: string
  selectedLinkId: string
  draggedLinkId: string

  contextMenuPos: {
    x: number
    y: number
  } | null
  
}