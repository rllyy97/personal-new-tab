import { ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material"
import { useDispatch, useSelector } from "react-redux";
import { getContextMenuPos } from "../../app/appStatus/selectors";
import { actions } from "../../app/appStatus/slice";
import { actions as linkActions } from "../../app/data/slice";
import { actions as modalActions } from "../../app/modals/slice";
import { ItemType } from "../../types";

import SettingsIcon from '@mui/icons-material/Settings';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { AppState } from "../../app/store";

export const HandleContext  = (e: React.MouseEvent, dispatch: any, type: ItemType, groupId?: string, linkId?: string, boardId?: string) => {
  e.preventDefault();
  e.stopPropagation();
  dispatch(actions.setContextMenuPos({ x: e.clientX + 2, y: e.clientY - 6 }));
  dispatch(actions.setSelectedType(type));
  dispatch(actions.setSelectedLinkId(linkId));
  dispatch(actions.setSelectedGroupId(groupId));
  dispatch(actions.setSelectedBoardId(boardId));
}

const ContextMenu = () => {

  const dispatch = useDispatch();
  const contextMenuPos = useSelector(getContextMenuPos)

  const selectedType = useSelector((state: AppState) => state.appStatus.selectedType);
  const linkId = useSelector((state: AppState) => state.appStatus.selectedLinkId);
  const groupId = useSelector((state: AppState) => state.appStatus.selectedGroupId);
  const boardId = useSelector((state: AppState) => state.appStatus.selectedBoardId);

  const handleClose = () => {
    dispatch(actions.setContextMenuPos(null));
  };

  const handleConfigure = () => {
    if (selectedType === 'LINK') dispatch(modalActions.toggleLinkSettingsModal());
    else if (selectedType === 'GROUP') dispatch(modalActions.toggleGroupSettingsModal());
    else if (selectedType === 'BOARD') dispatch(modalActions.toggleBoardSettingsModal());
    handleClose();
  }

  const handleDelete = () => {
    if (selectedType === 'LINK') dispatch(linkActions.removeLinkData({groupId, linkId}))
    else if (selectedType === 'GROUP') dispatch(linkActions.removeLinkGroup({groupId}))
    else if (selectedType === 'BOARD') dispatch(linkActions.deleteBoard(boardId))
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