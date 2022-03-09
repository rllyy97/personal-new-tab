
export type LocalData = {
    username: string,
    notes: string[],
    backgroundColor: string,
    linkGroups: LinkGroup[],
}

export type LinkGroup = {
    id: string,
    title: string,
    links: LinkData[],
    minimized: boolean,
    tileStyle: TileStyle,
}

export type LinkData = {
    id: string,
    title: string
    url: string
    imageUrl: string
    visitCount: number
}

///

export type TileStyle = 'mini' | 'normal'
