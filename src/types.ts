
export type LocalData = {
    username: string,
    notes: string[],
    backgroundColor: string,
    linkGroups: LinkGroup[],
}

export type LinkGroup = {
    [key: string]: any,
    id: string,
    title: string,
    links: LinkData[],
    minimized: boolean,
    tileStyle: TileStyle,
    hideTitle?: boolean,
}

export type LinkData = {
    [key: string]: any,
    id: string,
    title: string
    url: string
    imageUrl: string
    visitCount: number
}

///

export const TILE_STYLES = ['normal', 'mini']
export type TileStyle = typeof TILE_STYLES[number];

export const ITEM_TYPE = ['LINK', 'GROUP']
export type ItemType = typeof ITEM_TYPE[number];
