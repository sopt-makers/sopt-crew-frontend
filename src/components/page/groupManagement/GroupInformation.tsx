import { Box } from '@components/box/Box';
import { useRouter } from 'next/router';
import { styled } from 'stitches.config';
import ArrowMediumRightGrayIcon from '@assets/svg/arrow_medium_right_gray.svg';
import { GroupResponse } from 'src/api/meeting';
import { EApplyStatus, RECRUITMENT_STATUS } from '@constants/status';
import Link from 'next/link';

interface GroupInformationProps {
  groupData: GroupResponse;
}

const GroupInformation = ({ groupData }: GroupInformationProps) => {
  const router = useRouter();
  const groupId = router.query.id;
  const { imageURL, status, category, title } = groupData;
  const isRecruiting = status === EApplyStatus.APPROVE ? true : false;

  return (
    <Link href={`/detail?id=${groupId}`} passHref>
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
        </div>
        <ArrowMediumRightGrayIcon />
      </SGroupInformation>
    </Link>
  );
};

export default GroupInformation;

const SGroupInformation = styled('a', {
  flexType: 'verticalCenter',
  marginTop: '$64',
  background: '$black80',
  padding: '$32 $26 $32 $29',
  border: `1px solid $black20`,
  borderRadius: '24px',

  '& > div': {
    flex: '1',
  },
});

const SImage = styled('img', {
  width: '$167',
  minWidth: '$167',
  height: '$109',
  borderRadius: '14px',
  marginRight: '$35',
  objectFit: 'cover',
});

const SCategory = styled(Box, {
  fontAg: '24_semibold_100',
  color: '$gray80',
  mb: '$10',
});

const STitle = styled('p', {
  fontAg: '28_bold_140',
  color: '$white',
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
