import { useRouter } from 'next/router';
import { styled } from 'stitches.config';
import ArrowMediumRightGrayIcon from '@assets/svg/arrow_medium_right_gray.svg';
import { MeetingResponse } from '@api/meeting';
import { ERecruitmentStatus, RECRUITMENT_STATUS } from '@constants/option';
import Link from 'next/link';

interface MeetingInformationProps {
  meetingData: MeetingResponse;
}

const MeetingInformation = ({ meetingData }: MeetingInformationProps) => {
  const router = useRouter();
  const meetingId = router.query.id;
  const { imageURL, status, category, title } = meetingData;
  const isRecruiting = status === ERecruitmentStatus.RECRUITING;

  return (
    <Link href={`/detail?id=${meetingId}`} passHref legacyBehavior>
      <SMeetingInformation>
        <SImage src={imageURL[0].url} />
        <div>
          <SCategory>{category}</SCategory>
          <STitle>
            <SRecruitingStatus isRecruiting={isRecruiting}>{RECRUITMENT_STATUS[status]}</SRecruitingStatus>
            {` ${title}`}
          </STitle>
        </div>
        <ArrowMediumRightGrayIcon />
      </SMeetingInformation>
    </Link>
  );
};

export default MeetingInformation;

const SMeetingInformation = styled('a', {
  flexType: 'verticalCenter',
  marginTop: '$64',
  background: '$gray800',
  padding: '$32 $26 $32 $29',
  border: `1px solid $gray600`,
  borderRadius: '24px',

  '& > div': {
    flex: '1',
  },

  '@tablet': {
    marginTop: '$48',
    padding: '$16',
    border: 'none',
    svg: {
      display: 'none',
    },
  },
});

const SImage = styled('img', {
  width: '$167',
  minWidth: '$167',
  height: '$109',
  borderRadius: '14px',
  marginRight: '$35',
  objectFit: 'cover',

  '@tablet': {
    width: '$103',
    minWidth: '$103',
    height: '$67',
    borderRadius: '6px',
    marginRight: '$12',
  },
});

const SCategory = styled('div', {
  fontAg: '24_semibold_100',
  color: '$gray400',
  mb: '$10',

  '@tablet': {
    fontAg: '12_bold_100',
  },
});

const STitle = styled('p', {
  fontAg: '28_bold_140',
  color: '$gray10',

  '@tablet': {
    fontAg: '14_bold_140',
  },
});

const SRecruitingStatus = styled('span', {
  variants: {
    isRecruiting: {
      true: {
        color: '$orange400',
      },
      false: {
        color: '$gray400',
      },
    },
  },
});
