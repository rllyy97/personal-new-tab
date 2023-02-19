import { Board } from "../../types"

export interface DataState {
  selectedBoardId: string
  boards: Record<string, Board>
}
