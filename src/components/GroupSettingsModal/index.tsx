import { Dialog, MenuItem, Select, TextField } from "@mui/material"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getSelectedGroupId } from "../../app/appStatus/selectors"
import { getLinkGroups } from "../../app/links/selectors"
import { isGroupSettingsOpen } from "../../app/modals/selectors"
import { LinkGroup } from "../../types"

import { actions as linkActions } from '../../app/links/slice'
import { actions as appStatusActions } from '../../app/appStatus/slice'
import { actions as modalActions } from '../../app/modals/slice'

import { StyledDialog } from "../../GlobalComponents"

export const GroupSettingsModal = () => {

  const dispatch = useDispatch()
  
  const isOpen = useSelector(isGroupSettingsOpen)
  const handleClose = () => {
    dispatch(appStatusActions.clearSelectedIds())
    dispatch(modalActions.toggleGroupSettingsModal())
  }

  const groupLinks = useSelector(getLinkGroups)
  const groupId = useSelector(getSelectedGroupId)
  const [selectedLinkGroup, setSelectedLinkGroup] = useState<LinkGroup | undefined>(undefined)
  useEffect(() => {
    setSelectedLinkGroup(groupLinks.find(group => group.id === groupId))
  }, [groupId])


  useEffect(() => {
    setTempTitle(selectedLinkGroup?.title ?? '')
  }, [selectedLinkGroup])

  const [tempTitle, setTempTitle] = useState('')
  const updateTitle = () => dispatch(linkActions.updateLinkGroup({groupId, title: tempTitle}))
  const updateTileStyle = (e: any) => dispatch(linkActions.updateLinkGroup({groupId, tileStyle: e.target.value}))


  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <StyledDialog>
        {/* <h1>Group Settings</h1> */}
        <TextField
          required
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
          value={selectedLinkGroup?.tileStyle}
          size="small"
          fullWidth
          onChange={updateTileStyle}
        >
          <MenuItem value={'normal'}>Normal</MenuItem>
          <MenuItem value={'mini'}>Mini</MenuItem>
        </Select>
      </StyledDialog>
    </Dialog>
  )
}
