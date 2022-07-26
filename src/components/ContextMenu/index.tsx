import { ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material"
import { useDispatch, useSelector } from "react-redux";
import { getContextMenuPos } from "../../app/appStatus/selectors";
import { actions } from "../../app/appStatus/slice";
import { actions as linkActions } from "../../app/links/slice";
import { actions as modalActions } from "../../app/modals/slice";
import { TileType } from "../../types";

import SettingsIcon from '@mui/icons-material/Settings';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { AppState } from "../../app/store";

export const HandleContext  = (e: React.MouseEvent, dispatch: any, type: TileType, groupId?: string, linkId?: string) => {
  e.preventDefault();
  e.stopPropagation();
  dispatch(actions.setContextMenuPos({ x: e.clientX + 2, y: e.clientY - 6 }));
  dispatch(actions.setSelectedType(type));
  dispatch(actions.setSelectedLinkId(linkId));
  dispatch(actions.setSelectedGroupId(groupId));
}

const ContextMenu = () => {

  const dispatch = useDispatch();
  const contextMenuPos = useSelector(getContextMenuPos)

  const selectedType = useSelector((state: AppState) => state.appStatus.selectedType);
  const linkId = useSelector((state: AppState) => state.appStatus.selectedLinkId);
  const groupId = useSelector((state: AppState) => state.appStatus.selectedGroupId);

  const handleClose = () => {
    dispatch(actions.setContextMenuPos(null));
  };

  const handleConfigure = () => {
    if (selectedType === 'link') dispatch(modalActions.toggleLinkSettingsModal());
    else if (selectedType === 'group') dispatch(modalActions.toggleGroupSettingsModal());
    handleClose();
  }

  const handleDelete = () => {
    if (selectedType === 'link') dispatch(linkActions.removeLinkData({groupId, linkId}))
    if (selectedType === 'group') dispatch(linkActions.removeLinkGroup({groupId}))
    handleClose();
  }

  return (
    <Menu
      open={contextMenuPos !== null}
      onClose={handleClose}
      anchorReference="anchorPosition"
      anchorPosition={contextMenuPos ? { top: contextMenuPos.y, left: contextMenuPos.x } : undefined}
    >
      <MenuItem onClick={handleConfigure}>
        <ListItemIcon>
          <SettingsIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText>Configure</ListItemText>
      </MenuItem>
      <MenuItem onClick={handleDelete}>
        <ListItemIcon>
          <DeleteForeverIcon fontSize="small"/>
        </ListItemIcon>
        <ListItemText>Delete</ListItemText>
      </MenuItem>
    </Menu>
  )
}

export default ContextMenu