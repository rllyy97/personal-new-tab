import { v4 as uuid } from 'uuid'

import { Board, LinkData, LinkGroup } from "./types"

export const NewBoard = (id?: string): Board => {
  if (!id) id = `board-${Date.now()}`
  return {
    id,
    title: `board-${Date.now()}`,
    linkGroups: [NewLinkGroup()],
  }
}

export const NewLinkGroup = (): LinkGroup => ({
  id: uuid(),
  title: 'New Group',
  links: [],
  minimized: false,
  tileStyle: 'normal',
})

export const NewLinkData = (): LinkData => ({
  id: uuid(),
  title: 'New Link',
  url: '',
  imageUrl: '',
  visitCount: 0,
})
