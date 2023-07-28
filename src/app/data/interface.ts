import { Board } from "../../types"

export interface DataState {
  username: string
  activeBoardId: string
  boards: Record<string, Board>
}
