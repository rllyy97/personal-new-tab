import { Dialog, TextField } from "@mui/material"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getSelectedGroupId, getSelectedLinkId, useSelectedLink } from "../../app/appStatus/selectors"
import { isLinkSettingsOpen } from "../../app/modals/selectors"

import { actions as linkActions } from '../../app/links/slice'
import { actions as appStatusActions } from '../../app/appStatus/slice'
import { actions as modalActions } from '../../app/modals/slice'

import { StyledDialog } from "../../GlobalComponents"
import { LinkImg } from "../LinkTile/styles"
import { getFavicon } from "../../Utilities"

export const LinkSettingsModal = () => {

  const dispatch = useDispatch()
  
  const isOpen = useSelector(isLinkSettingsOpen)
  const handleClose = () => {
    dispatch(appStatusActions.clearSelectedIds())
    dispatch(modalActions.toggleLinkSettingsModal())
  }

  const groupId = useSelector(getSelectedGroupId)
  const linkId = useSelector(getSelectedLinkId)

  const linkData = useSelectedLink();

  useEffect(() => {
    setTempTitle(linkData?.title ?? '')
    setTempUrl(linkData?.url ?? '')
    setTempImageUrl(linkData?.imageUrl ?? '')
  }, [linkData])

  const [tempTitle, setTempTitle] = useState('')
  const updateTitle = () => dispatch(linkActions.updateLinkData({groupId, linkId, title: tempTitle}))
  const [tempUrl, setTempUrl] = useState('')
  const updateUrl = () => dispatch(linkActions.updateLinkData({groupId, linkId, url: tempUrl}))
  const [tempImageUrl, setTempImageUrl] = useState('')
  const updateImageUrl = () => dispatch(linkActions.updateLinkData({groupId, linkId, imageUrl: tempImageUrl}))
  
  const fallback = getFavicon(tempUrl)

  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <StyledDialog>
        {/* <h1>Link Settings</h1> */}
        <LinkImg
          alt=''
          style={{marginBottom: '12px'}}
          src={tempImageUrl !== '' ? tempImageUrl : fallback}
        />
        <TextField
          required
          label="Title"
          value={tempTitle}
          size="small"
          variant="outlined"
          onBlur={updateTitle}
          onChange={(e) => setTempTitle(e.target.value)}
        />
        <TextField
          required
          label="Url"
          value={tempUrl} 
          size="small"
          variant="outlined"
          onBlur={updateUrl}
          onChange={(e) => setTempUrl(e.target.value)}
        />
        <TextField
          label="Custom Image URL"
          value={tempImageUrl}
          size="small"
          variant="outlined"
          onBlur={updateImageUrl}
          onChange={(e) => setTempImageUrl(e.target.value)}
        />
      </StyledDialog>
    </Dialog>
  )
}