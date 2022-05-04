import { LinkData, TileStyle } from '../../types'
import { LinkContainer, LinkImg, LinkTitle } from './styles'

import { getFavicon } from '../../Utilities'
import { FlexDiv } from '../../GlobalComponents'
import { useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import CircleButton from '../CircleButton'
import colors from '../../colors'

import { actions as linkActions } from '../../app/links/slice'
import { actions as appStatusActions } from '../../app/appStatus/slice'
import { actions as modalActions } from '../../app/modals/slice'

import CancelIcon from '@mui/icons-material/Cancel'
import BuildCircleIcon from '@mui/icons-material/BuildCircle'
import { useDrop, useDrag, DragSourceMonitor } from 'react-dnd'
import { Identifier } from 'typescript'


export interface LinkTileProps {
  groupId: string;
  index: number;
  linkData: LinkData;
  tileStyle?: TileStyle;
}

const LinkTile = (props: LinkTileProps) => {
  const { groupId, index, linkData, tileStyle = 'normal' } = props
  const { id, title, url, imageUrl, visitCount } = linkData

  const dispatch = useDispatch()

  const [hasHover, setHasHover] = useState(false)

  const fallback = getFavicon(url)

  const handleDelete = (e: any) => {
    e.preventDefault()
    e.stopPropagation()
    dispatch(linkActions.removeLinkData({groupId, linkId: id}))
  }

  const handleLinkSettings = (e: any) => {
    e.preventDefault()
    e.stopPropagation()
    dispatch(appStatusActions.setSelectedGroupId(groupId))
    dispatch(appStatusActions.setSelectedLinkId(id))
    dispatch(modalActions.toggleLinkSettingsModal())
  }

  ///

  const ref = useRef<HTMLDivElement>(null)
  const [{ handlerId }, drop] = useDrop<
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

  const [{ isDragging }, drag] = useDrag({
    type: "LINK",
    item: () => ({ id, index, groupId }),
    collect: (monitor: DragSourceMonitor) => ({isDragging: monitor.isDragging()}),
  })

  drag(drop(ref))

  ///

  return (
    <a href={(url as string).startsWith('http') ? url : `http://${url}`} style={{"opacity": "0.999"}}>
      <LinkContainer
        ref={ref}
        id={id}
        className={tileStyle}
        onMouseEnter={() => setHasHover(true)}
        onMouseLeave={() => setHasHover(false)}
        style={{opacity: isDragging ? 0 : 1}}
      >
          <LinkImg alt='' src={imageUrl !== '' ? imageUrl : fallback} />
          <FlexDiv style={{maxWidth: '96px'}}>
            <LinkTitle>{title}</LinkTitle>
          </FlexDiv>
          {hasHover && !isDragging && (
            <>
              <CircleButton
                className='tr'
                icon={<CancelIcon style={{fill: colors.red}} />}
                onClick={handleDelete}
              />
              <CircleButton
                className='tr'
                style={{marginRight: '28px'}}
                icon={<BuildCircleIcon style={{fill: colors.blue}} />}
                onClick={handleLinkSettings}
              />
            </>
          )}
      </LinkContainer>
    </a>
  )
}

export default LinkTile
