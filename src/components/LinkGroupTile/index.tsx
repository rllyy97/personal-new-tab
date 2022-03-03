import { LinkGroup } from '../../types'

import LinkTile from '../LinkTile'
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
import { useState } from 'react'
import { NewLinkData } from '../../EmptyData'

import { actions as linkActions } from '../../app/links/slice'
import { actions as appStatusActions } from '../../app/appStatus/slice'
import { actions as modalActions } from '../../app/modals/slice'
import { getDomain } from '../../Utilities'


interface LinkGroupProps {
    linkGroup: LinkGroup;
}

const LinkGroupTile = (props: LinkGroupProps) => {
    const { linkGroup } = props
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

    const [dragOver, setDragOver] = useState(false)

    const urlDrop = async (e: any) => {
        e.stopPropagation()
        e.preventDefault()
        setDragOver(false)
        const url = e.dataTransfer.getData('text')
        let newUrl = (url as string).startsWith('http') ? url : `http://${url}`
        const newLinkData = NewLinkData()
        newLinkData.title = getDomain(newUrl)
        newLinkData.url = newUrl
        dispatch(linkActions.addLinkData({groupId: id, linkData: newLinkData}))
    } 

    return (
        <GroupContainer
            id={id}
            className={dragOver ? 'drag' : ''}
            style={minimized ? {padding: '16px'} : {}}
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
                    <LinksContainer
                        onDragEnter={(e) => setDragOver(true)}
                        onDragLeave={(e) => setDragOver(false)}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={urlDrop}
                    >
                        {links.map(link => <LinkTile groupId={id} linkData={link}/>)}
                    </LinksContainer>
                ) : (
                    <EmptyGroupWarningContainer
                        onDragEnter={(e) => setDragOver(true)}
                        onDragLeave={(e) => setDragOver(false)}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={urlDrop}
                    >
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
