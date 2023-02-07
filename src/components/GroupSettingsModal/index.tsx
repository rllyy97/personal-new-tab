import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Checkbox, Dialog, FormControlLabel, MenuItem, Select, TextField } from "@mui/material"
import FolderIcon from '@mui/icons-material/Folder';
import { getSelectedGroupId } from "../../app/appStatus/selectors"
import { isGroupSettingsOpen } from "../../app/modals/selectors"
import { TILE_STYLES } from "../../types"

import { actions as linkActions } from '../../app/links/slice'
import { actions as appStatusActions } from '../../app/appStatus/slice'
import { actions as modalActions } from '../../app/modals/slice'

import { StyledDialog } from "../../GlobalComponents"
import { AppState } from "../../app/store"

export const GroupSettingsModal = () => {

  const dispatch = useDispatch()
  
  const isOpen = useSelector(isGroupSettingsOpen)
  const handleClose = () => {
    dispatch(modalActions.toggleGroupSettingsModal())
    setTimeout(() => dispatch(appStatusActions.clearSelectedIds()), 200)
  }

  const groupId = useSelector(getSelectedGroupId)
  const group = useSelector((state: AppState) => state.links.linkGroups.find(g => g.id === groupId))

  useEffect(() => {
    setTempTitle(group?.title ?? '')
  }, [group])

  const [tempTitle, setTempTitle] = useState('')
  const updateTitle = () => dispatch(linkActions.updateLinkGroup({groupId, title: tempTitle}))
  const updateTileStyle = (e: any) => dispatch(linkActions.updateLinkGroup({groupId, tileStyle: e.target.value}))
  const toggleHideTitle = () => dispatch(linkActions.updateLinkGroup({groupId, hideTitle: !group?.hideTitle}))

  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <StyledDialog>
        <FolderIcon style={{marginBottom: '12px', width: '96px', height: '96px' }} />
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
        <Select
          required
          label="Tile Style"
          value={group?.tileStyle}
          size="small"
          fullWidth
          onChange={updateTileStyle}
          style={{ textTransform: 'capitalize' }}
        >
          {TILE_STYLES.map((style: string) => (
            <MenuItem value={style} style={{ textTransform: 'capitalize' }}>{style}</MenuItem>
          ))}
        </Select>
        <FormControlLabel
          control={<Checkbox checked={group?.hideTitle ?? false} onChange={toggleHideTitle} />}
          label="Hide Title"
        />
      </StyledDialog>
    </Dialog>
  )
}
