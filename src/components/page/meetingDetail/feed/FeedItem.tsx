import AvatarGroup from '@components/avatar/AvatarGroup';
import { Box } from '@components/box/Box';
import { Flex } from '@components/util/layout/Flex';
import { styled } from 'stitches.config';
import MoreIcon from '@assets/svg/more.svg';
import LikeIcon from '@assets/svg/like.svg';

const FeedItem = () => {
  return (
    <SFeedItem>
      <STop>
        <Flex align="center">
          <SProfileImage src="" alt="" />
          <SName>백지연</SName>
          <STime>1시간 전</STime>
        </Flex>
        <MoreIcon />
      </STop>

      <STitle>제목</STitle>
      <SContent>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto libero sapiente, quis fuga ipsam nulla? Rem
        voluptates beatae similique natus ipsa amet, aliquam, ipsum quia corrupti commodi, quis iusto sit?
      </SContent>
      <SThumbnail />

      <SBottom>
        <div>
          <SAvatarGroupWrapper>
            <AvatarGroup />
          </SAvatarGroupWrapper>
          <div>
            <SComment>댓글</SComment>
            <SCommentCount>1</SCommentCount>
          </div>
        </div>
        <Flex align="center">
          <LikeIcon />
          <SLikeCount>999+</SLikeCount>
        </Flex>
      </SBottom>
    </SFeedItem>
  );
};

export default FeedItem;

const SFeedItem = styled(Box, {
  padding: '$24 $20 $28 $20',
  color: '$white100',

  '@tablet': {
    padding: '$24 0 $28 0',
  },
});

const STop = styled(Box, {
  display: 'flex',
  justifyContent: 'space-between',
  mb: '$12',
});

const SProfileImage = styled('img', {
  width: '$32',
  height: '$32',
  objectFit: 'cover',
  borderRadius: '$round',
  background: '$black60',
});

const SName = styled('span', {
  ml: '$8',
  fontStyle: 'T5',
});

const STime = styled('span', {
  ml: '$8',
  fontStyle: 'T6',
  color: '$gray100',
});

const STitle = styled(Box, {
  mb: '$8',
  fontStyle: 'H3',

  '@tablet': {
    fontStyle: 'H4',
  },
});

const SContent = styled(Box, {
  mb: '$20',
  color: '$gray40',
  fontStyle: 'B2',

  '@tablet': {
    fontStyle: 'B3',
  },
});

const SThumbnail = styled('img', {
  mb: '$20',
  borderRadius: '8px',
});

const SBottom = styled(Box, {
  flexType: 'verticalCenter',
  justifyContent: 'space-between',
});

const SAvatarGroupWrapper = styled(Box, {
  mr: '$8',
});

const SComment = styled('span', {
  fontStyle: 'T5',
  color: '$gray40',
});

const SCommentCount = styled('span', {
  ml: '$4',
  fontStyle: 'H5',
  color: 'white100',
});

const SLikeCount = styled('span', {
  ml: '$6',
  fontStyle: 'H5',
  color: 'white100',
});
