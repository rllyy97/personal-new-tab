import { LinkGroup } from '../../types'

import LinkTile, { LinkTileProps } from '../LinkTile'
import { EmptyGroupWarningContainer, GroupContainer, GroupTitle, LinksContainer, TitleBackground } from './styles'

import CancelIcon from '@mui/icons-material/Cancel'
import BuildCircleIcon from '@mui/icons-material/BuildCircle'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown'

import CircleButton from '../CircleButton'
import { useDispatch } from 'react-redux'
import colors from '../../colors'
import { Button } from '@mui/material'
import { InvisibleInput } from '../../GlobalComponents'
import { useRef, useState } from 'react'
import { NewLinkData } from '../../EmptyData'

import { actions as linkActions } from '../../app/links/slice'
import { actions as appStatusActions } from '../../app/appStatus/slice'
import { actions as modalActions } from '../../app/modals/slice'
import { getDomain } from '../../Utilities'
import { DragSourceMonitor, DropTargetMonitor, useDrag, useDrop } from 'react-dnd'
import { Identifier } from 'typescript'
import { group } from 'console'
import { NativeTypes } from 'react-dnd-html5-backend'


export interface LinkGroupProps {
    index: number;
    linkGroup: LinkGroup;
}

const LinkGroupTile = (props: LinkGroupProps) => {
    const { index, linkGroup } = props
    const { id, title, links, minimized = false } = linkGroup
    
    const dispatch = useDispatch()
    
    const [tempTitle, setTempTitle] = useState(title)
    const updateTitle = () => dispatch(linkActions.updateLinkGroup({groupId: id, title: tempTitle}))

    const toggleMinimize = () => dispatch(linkActions.updateLinkGroup({groupId: id, minimized: !minimized}))
    const deleteGroup = () => dispatch(linkActions.removeLinkGroup({groupId: id}))
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

    // Dropping Groups
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
            dispatch(linkActions.moveLinkGroup({fromIndex, toIndex}))
            item.index = toIndex
        },
    })

    // Dragging Groups
    const [{ isDragging }, dragGroup] = useDrag({
      type: "GROUP",
      item: () => ({ id, index }),
      collect: (monitor: DragSourceMonitor) => ({isDragging: monitor.isDragging()}),
    })

    dropUrl(rootRef)
    dragGroup(dropGroup(rootRef))
    dropLinks(linksContainerRef)

    ///

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
        >
            {/* This first title is invisible, it's just to have the reactive white background */}
            <TitleBackground>
                {tempTitle}
            </TitleBackground>
            <GroupTitle style={{backgroundColor: 'transparent'}}>
                <InvisibleInput
                    value={tempTitle}
                    onBlur={updateTitle}
                    onChange={(e) => setTempTitle(e.target.value)}
                    style={{width: ((tempTitle.length + 3) * 13) + 'px'}}
                />
            </GroupTitle>

            {!minimized && (
                links.length !== 0 ? (
                    <LinksContainer ref={linksContainerRef}>
                        {links.filter(x => x != null).map((link, index) => <LinkTile key={link.id} groupId={id} index={index} linkData={link}/>)}
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

            <CircleButton
                className='tr'
                icon={<CancelIcon style={{fill: colors.red}} />}
                onClick={deleteGroup}
            />
            <CircleButton
                className='tr'
                style={{marginRight: '36px', transform: minimized ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'all 0.2s ease-in-out'}}
                icon={<ExpandCircleDownIcon style={{fill: colors.blue}} />}
                onClick={toggleMinimize}
            />
            <CircleButton
                className='tr'
                style={{marginRight: '72px'}}
                icon={<AddCircleIcon style={{fill: colors.green}} />}
                onClick={addLink}
            />
        </GroupContainer>
    )
}

export default LinkGroupTile
