import { v4 as uuid } from 'uuid'

import { LinkData, LinkGroup } from "./types"


export const NewLinkGroup = (): LinkGroup => ({
    id: uuid(),
    title: 'New Group',
    links: [],
    minimized: false,
})

export const NewLinkData = (): LinkData => ({
    id: uuid(),
    title: 'New Link',
    url: '',
    imageUrl: '',
    visitCount: 0,
})
