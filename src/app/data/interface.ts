import { Board } from "../../types"

export interface DataState {
  activeBoardId: string
  boards: Record<string, Board>
}
