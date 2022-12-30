import ProfileDefaultIcon from '@assets/svg/profile_default.svg';
import { Box } from '@components/box/Box';
import { useState } from 'react';
import { styled } from 'stitches.config';

interface Member {
  id: number;
  name: string;
  profileImage?: string;
}

interface InvitationListProps {
  member: Member;
}

const InvitationListItem = ({
  member: { id, profileImage, name },
}: InvitationListProps) => {
  const [isChecked, setIsChecked] = useState(false);
  const handleChange = () => {
    setIsChecked(prev => !prev);
    console.log(id);
  };

  return (
    <SInvitationListItem>
      <div>
        {profileImage ? <img src={profileImage} /> : <ProfileDefaultIcon />}
        <span>{name}</span>
      </div>
      <SCheckbox
        type="checkbox"
        isChecked={isChecked}
        onChange={handleChange}
      />
    </SInvitationListItem>
  );
};

export default InvitationListItem;

const SInvitationListItem = styled(Box, {
  flexType: 'verticalCenter',
  justifyContent: 'space-between',
  height: '$56',
  background: '$black60',
  borderRadius: '14px',
  padding: '$16 $24 $16 $20',

  '& + &': {
    mt: '$10',
  },

  div: {
    flexType: 'verticalCenter',
  },

  img: {
    width: '$24',
    height: '$24',
    borderRadius: '$round',
    objectFit: 'cover',
  },

  svg: {
    transform: 'scale(0.75)',
  },

  span: {
    ml: '$10',
  },
});

const SCheckbox = styled('input', {
  width: '$16',
  height: '$16',
  border: '1px solid $white',
  borderRadius: '3px',

  variants: {
    isChecked: {
      true: {
        background:
          'url(/group/assets/img/checkBox/selected.png) left top no-repeat',
        backgroundSize: 'contain',
        border: '0',
      },
    },
  },
});
