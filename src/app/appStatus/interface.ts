import { TileType } from "../../types"

export interface AppStatusState {
  selectedType: TileType | undefined
  selectedGroupId: string
  selectedLinkId: string
  draggedLinkId: string

  contextMenuPos: {
    x: number
    y: number
  } | null
  
}