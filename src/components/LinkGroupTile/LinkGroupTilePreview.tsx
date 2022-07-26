import { Button, IconButton } from "@mui/material"
import { useSelectedGroup } from "../../app/appStatus/selectors"
import { InvisibleInput } from "../../GlobalComponents"
import LinkTile from "../LinkTile"
import { GroupContainer, GroupTitle, LinksContainer, EmptyGroupWarningContainer, ButtonContainer } from "./styles"

import AddCircleIcon from '@mui/icons-material/AddCircle';
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown'
import colors from "../../colors"
import LinkTilePreview from "../LinkTile/LinkTilePreview"

const LinkGroupTilePreview = () => {

  const group = useSelectedGroup()
  if (!group) return null
  const { id, title, links = [], minimized = false, tileStyle = 'normal', hideTitle = false } = group

  const rootStyle = {
    padding: minimized ? '16px' : '',
    boxShadow: `0px 0px 0px 2px ${colors.user}`,
    // display: 'flex',
  }

  return (
    <GroupContainer style={rootStyle}>
        <GroupTitle>
          <InvisibleInput value={title} />
        </GroupTitle>

        {!minimized && (
          links.length !== 0 ? (
            <LinksContainer>
              {links.filter(x => x != null).map((link, index) => (
                <LinkTilePreview link={link} />
              ))} 
            </LinksContainer>
          ) : (
            <EmptyGroupWarningContainer>
              <Button startIcon={<AddCircleIcon />} color="success">
                Add Link
              </Button>
            </EmptyGroupWarningContainer>
          )
        )}

        <ButtonContainer>
            <IconButton size="small">
                <AddCircleIcon style={{color: colors.green}} />
            </IconButton>
            <IconButton size="small" style={{color: colors.blue}}>
                <ExpandCircleDownIcon style={{
                    transform: !minimized ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'all 0.2s ease-in-out'
                }} />
            </IconButton>
        </ButtonContainer>
    </GroupContainer>
  )
}

export default LinkGroupTilePreview