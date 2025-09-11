import { ampli } from '@/ampli';
import ProfileDefaultIcon from '@assets/svg/profile_default.svg?rect';
import { playgroundURL } from '@constant/url';
import { fontsObject } from '@sopt-makers/fonts';
import { playgroundLink } from '@sopt-makers/playground-common';
import { styled } from 'stitches.config';

interface ProfileAnchorProps {
  profileData: {
    orgId: number;
    userprofileImage?: string;
    userName: string;
  };
}

const ProfileAnchor = ({ profileData }: ProfileAnchorProps) => {
  return (
    <SProfileAnchor
      href={`${playgroundURL}${playgroundLink.memberDetail(profileData.orgId)}`}
      onClick={() => ampli.clickOwnerProfile({ group_owner_id: Number(profileData.orgId) })}
    >
      {profileData.userprofileImage ? <img src={profileData.userprofileImage} /> : <ProfileDefaultIcon />}
      <span>{profileData.userName}</span>
      {/* <ArrowSmallRightIcon />*/}
    </SProfileAnchor>
  );
};

export default ProfileAnchor;

const SProfileAnchor = styled('a', {
  flexType: 'verticalCenter',
  color: '$gray10',
  width: 'fit-content',
  bg: '$gray900',
  br: '10px',

  display: 'flex',
  padding: '12px 16px',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '14px',
  '@media (max-width: 414px)': {
    padding: '5px 8px',
    gap: '6px',
    br: '6.25px',
  },

  img: {
    width: '$48',
    height: '$48',
    borderRadius: '50%',
    objectFit: 'cover',

    background: '$gray700',
    '@media (max-width: 768px)': {
      width: '$32',
      height: '$32',
    },
    '@media (max-width: 414px)': {
      width: '$20',
      height: '$20',
    },
  },

  '& > svg:first-child': {
    width: '$48',
    height: '$48',

    '@media (max-width: 768px)': {
      width: '$32',
      height: '$32',
    },
    '@media (max-width: 414px)': {
      width: '$20',
      height: '$20',
    },
  },

  '& > span': {
    ...fontsObject.TITLE_3_24_SB,
    fontWeight: 500,

    '@media (max-width: 768px)': {
      fontStyle: 'T5',
    },
    '@media (max-width: 414px)': {
      ...fontsObject.LABEL_5_11_SB,
    },
  },

  // '>' 아이콘이 사라지면서 지금은 사용 안함.
  '& > svg:last-child > path': {
    stroke: `$gray200`,
  },
});
