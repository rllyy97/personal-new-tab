import type { CSSProperties } from 'react'
import type { XYCoord } from 'react-dnd'
import { useDragLayer } from 'react-dnd'
import LinkGroupTilePreview from '../LinkGroupTile/LinkGroupTilePreview'
import LinkTilePreview from '../LinkTile/LinkTilePreview'

const layerStyles: CSSProperties = {
  position: 'fixed',
  pointerEvents: 'none',
  zIndex: 100,
  left: 0,
  top: 0,
  width: 'calc(100% - 64px)',
  maxWidth: '1120px',
  height: '100%',
}

const getItemStyles = (
  initialOffset: XYCoord | null,
  currentOffset: XYCoord | null,
) => {
  if (!initialOffset || !currentOffset) return { display: 'none' }

  const transform = `translate(${currentOffset.x}px, ${currentOffset.y}px)`
  return {
    transform,
    WebkitTransform: transform,
  }
}

export const CustomDragLayer = () => {
  const { itemType, isDragging, item, initialOffset, currentOffset } =
    useDragLayer((monitor) => ({
      item: monitor.getItem(),
      itemType: monitor.getItemType(),
      initialOffset: monitor.getInitialSourceClientOffset(),
      currentOffset: monitor.getSourceClientOffset(),
      isDragging: monitor.isDragging(),
    }))

  if (!isDragging) return null

  return (
    <div style={layerStyles}>
      <div style={getItemStyles(initialOffset, currentOffset)}>
        {itemType === 'LINK' && <LinkTilePreview />}
        {itemType === 'GROUP' && <LinkGroupTilePreview />}
      </div>
    </div>
  )
}
