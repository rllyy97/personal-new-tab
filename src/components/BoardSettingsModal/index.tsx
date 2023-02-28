import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Dialog, TextField } from "@mui/material"
import GroupWorkIcon from '@mui/icons-material/GroupWork';

import { actions as linkActions } from '../../app/data/slice'
import { actions as appStatusActions } from '../../app/appStatus/slice'
import { actions as modalActions } from '../../app/modals/slice'

import { StyledDialog } from "../../GlobalComponents"
import { isBoardSettingsOpen } from "../../app/modals/selectors";
import { useSelectedBoard } from "../../app/appStatus/selectors";

const BoardSettingsModal = () => {

  const dispatch = useDispatch()
  
  const isOpen = useSelector(isBoardSettingsOpen)
  const handleClose = () => {
    dispatch(modalActions.toggleBoardSettingsModal())
    setTimeout(() => dispatch(appStatusActions.clearSelectedIds()), 200)
  }

  const board = useSelectedBoard()

  useEffect(() => setTempTitle(board?.title ?? ''), [board])

  const [tempTitle, setTempTitle] = useState('')
  const updateTitle = () => dispatch(linkActions.updateBoard({
    id: board?.id,
    title: tempTitle
  }))

  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <StyledDialog>
        <GroupWorkIcon style={{marginBottom: '12px', width: '96px', height: '96px' }} />
        <TextField
          required
          fullWidth
          label="Title"
          value={tempTitle}
          size="small"
          variant="outlined"
          onBlur={updateTitle}
          onChange={(e) => setTempTitle(e.target.value)}
        />
      </StyledDialog>
    </Dialog>
  )
}

export default BoardSettingsModal