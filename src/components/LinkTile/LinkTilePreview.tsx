import { useSelectedGroup, useSelectedLink } from "../../app/appStatus/selectors"
import { FlexDiv } from "../../GlobalComponents";
import { getFavicon } from "../../Utilities";
import PingStatusDot from "./pingStatusDot";
import { LinkContainer, LinkImg, LinkTitle } from "./styles";


const LinkTilePreview = (props: any) => {

  const selectedLink = useSelectedLink()
  const propsLink = props.link
  const link = propsLink ?? selectedLink

  const group = useSelectedGroup()
  if (!link) return null;
  const { id, title, url, imageUrl } = link;

  const isLocalPort = link?.url.includes('localhost:')
  const tileStyle = group?.tileStyle

  const fallback = getFavicon(url)

  return (
    <a href={'https://www.google.com'} style={{"opacity": "0.999", display: 'flex'}}>
      <LinkContainer className={`${tileStyle} ${!propsLink && 'hover'}`}>
          {!isLocalPort ? (
            <LinkImg alt='' src={imageUrl !== '' ? imageUrl : fallback} />
          ) : (
            <PingStatusDot url={url} />
          )}
          {!group?.hideTitle && (
            <FlexDiv style={{maxWidth: '96px'}}>
              <LinkTitle>{title}</LinkTitle>
            </FlexDiv>
          )}
      </LinkContainer>
    </a>
  )
}

export default LinkTilePreview