import { LinkData } from '../../types'
import { LinkContainer, LinkImg, LinkTitle } from './styles'

import { getFavicon } from '../../Utilities'
import { FlexDiv, InvisibleInput } from '../../GlobalComponents'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import CircleButton from '../CircleButton'
import colors from '../../colors'

import { actions as linkActions } from '../../app/links/slice'
import { actions as appStatusActions } from '../../app/appStatus/slice'
import { actions as modalActions } from '../../app/modals/slice'

import CancelIcon from '@mui/icons-material/Cancel'
import BuildCircleIcon from '@mui/icons-material/BuildCircle'


interface LinkTileProps {
    groupId: string;
    linkData: LinkData;
}

const LinkTile = (props: LinkTileProps) => {
    const { groupId, linkData } = props
    const { id, title, url, imageUrl, visitCount } = linkData

    const dispatch = useDispatch()

    const [hasHover, setHasHover] = useState(false)

    const fallback = getFavicon(url)

    const redirect = () => {
        let newUrl = (url as string).startsWith('http') ? url : `http://${url}`
        window.location.href = newUrl
    }

    const deleteLink = () => {
        dispatch(linkActions.removeLinkData({groupId, linkId: id}))
    }

    const openLinkSettings = () => {
        dispatch(appStatusActions.setSelectedGroupId(groupId))
        dispatch(appStatusActions.setSelectedLinkId(id))
        dispatch(modalActions.toggleLinkSettingsModal())
    }

    return (
        <LinkContainer
            id={id}
            onMouseEnter={() => setHasHover(true)}
            onMouseLeave={() => setHasHover(false)}
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
