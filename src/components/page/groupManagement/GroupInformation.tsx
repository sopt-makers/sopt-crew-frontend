import { Box } from '@components/box/Box';
import { useRouter } from 'next/router';
import { styled } from 'stitches.config';
import ArrowSmallRightPurpleIcon from '@assets/svg/arrow_small_right_purple.svg';
import { GroupResponse } from 'src/api/meeting';
import { dateFormat } from '@utils/date';
import { RECRUITMENT_STATUS } from '@constants/status';

interface GroupInformationProps {
  groupData: GroupResponse;
}

const GroupInformation = ({ groupData }: GroupInformationProps) => {
  const router = useRouter();
  const groupId = router.query.id;
  const {
    imageURL,
    status,
    user,
    confirmedApply,
    category,
    title,
    startDate,
    endDate,
    capacity,
  } = groupData;
  const isRecruiting = status === 2 ? true : false;
  const hostName = user.name;
  const current = confirmedApply.length;

  return (
    <SGroupInformation>
      <SImage src={imageURL[0].url} />
      <div>
        <SCategory>{category}</SCategory>
        <STitle>
          <SRecruitingStatus isRecruiting={isRecruiting}>
            {RECRUITMENT_STATUS[status]}
          </SRecruitingStatus>
          {` ${title}`}
        </STitle>
        <SDetailContainer>
          <div>
            <SDetail>
              <SDetailType>모임 개설</SDetailType>
              <span>{hostName}</span>
            </SDetail>
            <SDetail>
              <SDetailType>모집 기간</SDetailType>
              <span>
                {dateFormat(startDate)['YY.MM.DD']} -{' '}
                {dateFormat(endDate)['YY.MM.DD']}
              </span>
            </SDetail>
            <SDetail>
              <SDetailType>모집 현황</SDetailType>
              <span>
                {current}/{capacity}명
              </span>
            </SDetail>
          </div>
          <button onClick={() => router.push(`/detail?id=${groupId}`)}>
            <SButtonText>상세 보기</SButtonText>
            <ArrowSmallRightPurpleIcon />
          </button>
        </SDetailContainer>
      </div>
    </SGroupInformation>
  );
};

export default GroupInformation;

const SGroupInformation = styled(Box, {
  flexType: 'verticalCenter',
  marginTop: '$70',
  paddingBottom: '$80',
  borderBottom: `2px solid $black40`,

  '& > div': {
    width: '100%',
  },
});

const SImage = styled('img', {
  width: '$478',
  minWidth: '$478',
  height: '$312',
  borderRadius: '14px',
  marginRight: '$35',
  objectFit: 'cover',
});

const SCategory = styled(Box, {
  color: '$gray80',
  fontAg: '24_semibold_100',
  mb: '$12',
});

const STitle = styled('p', {
  fontAg: '34_bold_140',
  mb: '$40',
});

const SRecruitingStatus = styled('span', {
  variants: {
    isRecruiting: {
      true: {
        color: '$purple100',
      },
      false: {
        color: '$gray80',
      },
    },
  },
});

const SDetailContainer = styled(Box, {
  fontAg: '20_medium_100',
  display: 'flex',
  alignItems: 'flex-end',
  justifyContent: 'space-between',

  '& > div': {
    minWidth: 'fit-content',
    mb: '$24',
  },

  '& > button': {
    minWidth: 'fit-content',
    padding: '$20 $34',
    color: '$purple100',
    border: `2px solid $purple100`,
    borderRadius: '10px',
    fontAg: '20_bold_100',
  },
});

const SDetail = styled(Box, {
  mb: '$12',
});

const SDetailType = styled('span', {
  color: '$gray80',
  mr: '$16',
});

const SButtonText = styled('span', {
  mr: '$16',
});
