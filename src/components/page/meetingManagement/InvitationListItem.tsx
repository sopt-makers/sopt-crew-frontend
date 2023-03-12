import ProfileDefaultIcon from '@assets/svg/profile_default.svg?rect';
import { styled } from 'stitches.config';

interface Member {
  id: number;
  name: string;
  profileImage?: string | null;
}

interface InvitationListProps {
  member: Member;
  checked: boolean;
  onSelect: (userId: number) => void;
}

const InvitationListItem = ({ member: { id, profileImage, name }, checked, onSelect }: InvitationListProps) => {
  const handleChange = () => {
    onSelect(id);
  };

  return (
    <SInvitationListItem htmlFor={`member-${id}`}>
      <div>
        {profileImage ? <img src={profileImage} alt="" /> : <ProfileDefaultIcon />}
        <span>{name}</span>
      </div>
      <SCheckbox id={`member-${id}`} type="checkbox" isChecked={checked} onChange={handleChange} />
    </SInvitationListItem>
  );
};

export default InvitationListItem;

const SInvitationListItem = styled('label', {
  boxSizing: 'border-box',
  display: 'block',
  flexType: 'verticalCenter',
  justifyContent: 'space-between',
  height: '$56',
  background: '$black60',
  borderRadius: '14px',
  padding: '$16 $24 $16 $20',
  mr: '$8',

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
    width: '$24',
    height: '$24',
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
        background: 'url(/group/assets/img/checkBox/selected.png) left top no-repeat',
        backgroundSize: 'contain',
        border: '0',
      },
    },
  },
});
