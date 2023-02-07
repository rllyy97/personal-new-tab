import { LinkData, TileStyle } from '../../types'
import { LinkContainer, LinkImg, LinkTitle } from './styles'

import { getFavicon } from '../../Utilities'
import { FlexDiv } from '../../GlobalComponents'
import { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'

import { actions as linkActions } from '../../app/links/slice'
import { actions as appStatusActions } from '../../app/appStatus/slice'

import { useDrop, useDrag, DragSourceMonitor } from 'react-dnd'
import { Identifier } from 'typescript'
import PingStatusDot from './pingStatusDot'
import { HandleContext } from '../ContextMenu'
import { getEmptyImage } from 'react-dnd-html5-backend'


export interface LinkTileProps {
  groupId: string;
  index: number;
  linkData: LinkData;
  tileStyle?: TileStyle;
  hideTitle?: boolean;
}

const LinkTile = (props: LinkTileProps) => {
  const { groupId, index, linkData, tileStyle = 'normal', hideTitle = false } = props
  const { id, title, url, imageUrl, visitCount } = linkData

  const dispatch = useDispatch()

  const [hasHover, setHasHover] = useState(false)

  const fallback = getFavicon(url)

  ///

  const ref = useRef<HTMLDivElement>(null)
  const [, drop] = useDrop<
    LinkTileProps,
    void,
    { handlerId: Identifier | null }
  >({
    accept: "LINK",
    collect: (monitor: any) => {
      return { handlerId: monitor.getHandlerId() }
    },
    hover(item: LinkTileProps, monitor) {
      if (!ref.current) return
      const dragGroupId = item.groupId
      const hoverGroupId = groupId
      const dragIndex = item.index
      const hoverIndex = index
      if (dragIndex === hoverIndex) return
      dispatch(linkActions.moveLinkData({
        fromGroupId: dragGroupId,
        toGroupId: hoverGroupId,
        fromIndex: dragIndex,
        toIndex: hoverIndex
      }))
      item.index = hoverIndex
      item.groupId = hoverGroupId
    },
  })

  const [{ isDragging }, drag, preview] = useDrag({
    type: "LINK",
    item: () => ({ id, index, groupId }),
    collect: (monitor: DragSourceMonitor) => ({isDragging: monitor.isDragging()})
  })

  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true })
  }, [preview])

  drag(drop(ref))

  const isLocalPort = url.includes('localhost:')

  ///

  const selectIds = () => {
    dispatch(appStatusActions.setSelectedLinkId(id))
    dispatch(appStatusActions.setSelectedGroupId(groupId))
  }

  return (
    <a
      href={(url as string).startsWith('http') ? url : `http://${url}`}
      onDragStart={selectIds}
      onContextMenu={(e) => HandleContext(e, dispatch, 'LINK', groupId, id)}
    >
      <LinkContainer
        ref={ref}
        id={id}
        className={tileStyle}
        onMouseEnter={() => setHasHover(true)}
        onMouseLeave={() => setHasHover(false)}
        style={{opacity: isDragging ? 0 : 0.999}}
      >
        {!isLocalPort ? (
          <LinkImg alt='' src={imageUrl !== '' ? imageUrl : fallback} />
        ) : (
          <PingStatusDot url={url} />
        )}
        {!hideTitle && (
          <FlexDiv style={{maxWidth: '96px'}}>
            <LinkTitle>{title}</LinkTitle>
          </FlexDiv>
        )}
      </LinkContainer>
    </a>
  )
}

export default LinkTile
