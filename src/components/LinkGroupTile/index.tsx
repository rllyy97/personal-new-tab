/* eslint-disable @typescript-eslint/no-unused-vars */
import { LinkGroup } from '../../types'

import LinkTile, { LinkTileProps } from '../LinkTile'
import { ButtonContainer, EmptyGroupWarningContainer, GroupContainer, GroupTitle, LinksContainer } from './styles'

import AddIcon from '@mui/icons-material/Add';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { useDispatch, useSelector } from 'react-redux'
import colors from '../../colors'
import { Button, IconButton } from '@mui/material'
import { InvisibleInput } from '../../GlobalComponents'
import { useEffect, useRef, useState } from 'react'
import { NewLinkData } from '../../EmptyData'

import { actions as linkActions } from '../../app/links/slice'
import { actions as appStatusActions } from '../../app/appStatus/slice'
import { actions as modalActions } from '../../app/modals/slice'
import { getDomain } from '../../Utilities'
import { DragSourceMonitor, DropTargetMonitor, useDrag, useDrop, XYCoord } from 'react-dnd'
import { Identifier } from 'typescript'
import { getEmptyImage, NativeTypes } from 'react-dnd-html5-backend'
import { AppState } from '../../app/store'
import { HandleContext } from '../ContextMenu'


export interface LinkGroupProps {
  index: number;
  linkGroup: LinkGroup;
}

const LinkGroupTile = (props: LinkGroupProps) => {
  const { index, linkGroup } = props
  const { id, title, links, minimized = false, tileStyle = 'normal', hideTitle = false } = linkGroup
  
  const dispatch = useDispatch()

  const group = useSelector((state: AppState) => state.links.linkGroups.find(g => g.id === id))
  useEffect(() => {
      setTempTitle(group?.title ?? '')
  }, [group])
  
  const [tempTitle, setTempTitle] = useState(title)
  const updateTitle = () => dispatch(linkActions.updateLinkGroup({groupId: id, title: tempTitle}))

  const toggleMinimize = () => dispatch(linkActions.updateLinkGroup({groupId: id, minimized: !minimized}))
  const addLink = () => {
    const newLinkData = NewLinkData()
    dispatch(linkActions.addLinkData({groupId: id, linkData: newLinkData}))
    dispatch(appStatusActions.setSelectedGroupId(id))
    dispatch(appStatusActions.setSelectedLinkId(newLinkData.id))
    dispatch(modalActions.toggleLinkSettingsModal())
  }

  const addUrl = async (url: string) => {
    let newUrl = url.startsWith('http') ? url : `http://${url}`
    const newLinkData = NewLinkData()
    newLinkData.title = getDomain(newUrl)
    newLinkData.url = newUrl
    dispatch(linkActions.addLinkData({groupId: id, linkData: newLinkData}))
  } 

  // DND ////////////////////////////////////////////////////////////////////

  // Dropping Links
  const linksContainerRef = useRef<HTMLDivElement>(null)
  const [linksHandler, dropLinks] = useDrop<
    LinkTileProps,
    void,
    { handlerId: Identifier | null }
  >({
    accept: ["LINK"],
    collect: (monitor: any) => {
      return { handlerId: monitor.getHandlerId() }
    },
    hover(item: LinkTileProps, monitor) {
      if (!rootRef.current) return
      const dragGroupId = item.groupId
      const hoverGroupId = id
      const dragIndex = item.index
      const hoverIndex = links.length
      if (dragGroupId === hoverGroupId) return
      dispatch(linkActions.moveLinkData({
        fromGroupId: dragGroupId,
        toGroupId: hoverGroupId,
        fromIndex: dragIndex,
        toIndex: links.length
      }))
      item.index = hoverIndex
      item.groupId = hoverGroupId
    },
  })

  // Dropping URLs
  const rootRef = useRef<HTMLDivElement>(null)
  const [{ canDrop, isOver }, dropUrl] = useDrop(() => ({
    accept: [NativeTypes.URL],
    drop: (item: { urls: string[] }) => {
      console.log(item)
      addUrl(item.urls[0])
    },
    collect: (monitor: DropTargetMonitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(), 
    }),
  }))

  // Dropping Groups
  const [groupHandler, dropGroup] = useDrop<
    LinkTileProps,
    void,
    { handlerId: Identifier | null }
  >({
    accept: "GROUP",
    collect: (monitor: any) => ({ handlerId: monitor.getHandlerId() }),
    hover: (item: LinkTileProps, monitor) => {
      if (!rootRef.current) return
      const fromIndex = item.index
      const toIndex = index
      if (fromIndex === toIndex) return

      // Only move when crossing the midpoint of a group
      const hoverBoundingRect = rootRef.current?.getBoundingClientRect()
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      const clientOffset = monitor.getClientOffset()
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top
      if (fromIndex < toIndex && hoverClientY < hoverMiddleY) return
      if (fromIndex > toIndex && hoverClientY > hoverMiddleY) return

      dispatch(linkActions.moveLinkGroup({fromIndex, toIndex}))
      item.index = toIndex
    },
  })

  // Dragging Groups
  const [{ isDragging }, dragGroup, preview] = useDrag({
    type: "GROUP",
    item: () => ({ id, index }),
    collect: (monitor: DragSourceMonitor) => ({isDragging: monitor.isDragging()}),
  })
    
  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true })
  }, [preview])

  dropUrl(rootRef)
  dragGroup(dropGroup(rootRef))
  dropLinks(linksContainerRef)

  ///

  const selectIds = () => {
    dispatch(appStatusActions.setSelectedGroupId(id))
  }

  const rootStyle = {
    opacity: isDragging ? 0 : 1,
    padding: minimized ? '16px' : '',
  }

  return (
    <GroupContainer
      ref={rootRef}
      id={id}
      className={canDrop && isOver ? 'drag' : ''}
      style={rootStyle}
      onDragStart={selectIds}
      onContextMenu={(e) => HandleContext(e, dispatch, 'GROUP', id)}
    >
      <GroupTitle>
        <InvisibleInput
          value={tempTitle}
          onBlur={updateTitle}
          onChange={(e) => setTempTitle(e.target.value)}
        />
      </GroupTitle>

      {!minimized && (
        links.length !== 0 ? (
          <LinksContainer ref={linksContainerRef}>
            {links.filter(x => x != null).map((link, index) => (
              <LinkTile 
                key={link.id} 
                groupId={id} 
                index={index} 
                linkData={link} 
                tileStyle={tileStyle}
                hideTitle={hideTitle}
              />
            ))}
          </LinksContainer>
        ) : (
          <EmptyGroupWarningContainer ref={linksContainerRef}>
            <Button
              startIcon={<AddCircleIcon />}
              onClick={addLink}
              color="success"
            >
              Add Link
            </Button>
          </EmptyGroupWarningContainer>
        )
      )}
      <ButtonContainer>
        <IconButton size="small" onClick={addLink}>
          <AddCircleIcon style={{color: colors.green}} />
        </IconButton>
        <IconButton size="small" onClick={toggleMinimize} style={{color: colors.blue}}>
          <ExpandCircleDownIcon style={{
            transform: !minimized ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'all 0.2s ease-in-out'
          }} />
        </IconButton>
      </ButtonContainer>
    </GroupContainer>
  )
}

export default LinkGroupTile
