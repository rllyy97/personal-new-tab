import { Chip, IconButton } from "@mui/material"
import { FlexDiv } from "../../GlobalComponents"
import AddIcon from '@mui/icons-material/Add'
import { useDispatch } from "react-redux"
import { addNewBoard, setActiveBoardId } from "../../app/data/slice"
import { useBoards, useActiveBoardId } from "../../app/data/selectors"
import { HandleContext } from "../ContextMenu"
import { useEffect } from "react"
import colors from "../../colors"

import WorkspacesIcon from '@mui/icons-material/Workspaces';


const BoardSelection = () => {

  const dispatch = useDispatch()

  const boards = useBoards()
  const activeBoardId = useActiveBoardId()

  /////////////////////////////////////////////////////////
  /// Storage

  useEffect(() => {
    if (activeBoardId) localStorage.setItem("lastUsedBoardId", activeBoardId)
  }, [activeBoardId])
  useEffect(() => {
    const lastBoardId = localStorage.getItem("lastUsedBoardId")
    if (lastBoardId) dispatch(setActiveBoardId(lastBoardId))
  }, [dispatch])

  useEffect(() => {
    if (!activeBoardId && Object.keys(boards).length > 0)
    dispatch(setActiveBoardId(Object.keys(boards)[0]))
  }, [activeBoardId, boards, dispatch])

  if (Object.keys(boards).length === 0) return null

  return (
    <FlexDiv style={{
      borderRadius: '48px', 
      background: colors.backgroundLight,
      padding: '4px',
      margin: '-4px',
    }}>
      <WorkspacesIcon htmlColor={colors.grey} style={{padding: '0px 2px', marginLeft: '4px'}} />
      {
        Object.values(boards).map(board => (
          <Chip
            key={board.id}
            variant={board.id === activeBoardId ? 'filled' : 'outlined'}
            onClick={() => dispatch(setActiveBoardId(board.id))}
            onContextMenu={(e) => HandleContext(e, dispatch, 'BOARD', undefined, undefined, board.id)}
            label={board.title}
            color="primary"
          />
        ))
      }
      <IconButton size="small" onClick={() => dispatch(addNewBoard())} style={{
        padding: '0px',
        margin: '0px 4px',
      }}>
        <AddIcon htmlColor={colors.grey} />
      </IconButton>
    </FlexDiv>
  )
}

export default BoardSelection