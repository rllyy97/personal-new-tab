import { LinkData } from '../../types'
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
}

const LinkTile = (props: LinkTileProps) => {
  const { groupId, index, linkData } = props
  const { id, title, url, imageUrl, visitCount } = linkData

  const dispatch = useDispatch()

  const [hasHover, setHasHover] = useState(false)

  const fallback = getFavicon(url)

  const redirect = () => {
    window.location.href = (url as string).startsWith('http') ? url : `http://${url}`
  }

  const deleteLink = () => {
    dispatch(linkActions.removeLinkData({groupId, linkId: id}))
  }

  const openLinkSettings = () => {
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
    <LinkContainer
      ref={ref}
      id={id}
      onMouseEnter={() => setHasHover(true)}
      onMouseLeave={() => setHasHover(false)}
      style={{opacity: isDragging ? 0 : 1}}
    >
      <LinkImg alt='' src={imageUrl !== '' ? imageUrl : fallback} onClick={redirect} />
      <FlexDiv style={{maxWidth: '96px'}}>
        <LinkTitle>{title}</LinkTitle>
      </FlexDiv>
      {hasHover && (
        <>
          <CircleButton
            className='tr'
            icon={<CancelIcon style={{fill: colors.red}} />}
            onClick={deleteLink}
          />
          <CircleButton
            className='tr'
            style={{marginRight: '28px'}}
            icon={<BuildCircleIcon style={{fill: colors.blue}} />}
            onClick={openLinkSettings}
          />
        </>
      )}
    </LinkContainer>
  )
}

export default LinkTile
