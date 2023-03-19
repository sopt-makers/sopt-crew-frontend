import Link from 'next/link';
import { styled } from 'stitches.config';
import { ApplyResponse } from 'src/api/user';
import { Box } from '@components/box/Box';
import RecruitmentStatusList from './RecruitmentStatusList';
import ArrowSmallRightIcon from '@assets/svg/arrow_small_right.svg';

interface RecruitmentStatusModalContentProps {
  current: number;
  total: number;
  meetingId: number;
  appliedInfo: ApplyResponse[];
  isHost: boolean;
  isApplied: boolean;
}

const RecruitmentStatusModalContent = ({
  current,
  total,
  meetingId,
  appliedInfo,
  isHost,
  isApplied,
}: RecruitmentStatusModalContentProps) => {
  const isBottomVisible = total > 0 || isHost || isApplied;

  return (
    <>
      {current > 0 ? (
        <SRecruitmentStatusListWrapper>
          <RecruitmentStatusList recruitmentStatusList={appliedInfo} />
        </SRecruitmentStatusListWrapper>
      ) : (
        <SEmptyText>{isHost ? '신청자' : '참여자'}가 없습니다.</SEmptyText>
      )}
      {isBottomVisible && (
        <SRecruitmentStatusModalBottom>
          {total > 0 && <STotal>총 {total}명 신청</STotal>}
          <Link href={`/mine/management?id=${meetingId}`} passHref>
            <SManagementAnchor>
              {isHost ? '신청자 관리' : isApplied && '참여자 리스트'}
              <ArrowSmallRightIcon />
            </SManagementAnchor>
          </Link>
        </SRecruitmentStatusModalBottom>
      )}
    </>
  );
};

export default RecruitmentStatusModalContent;

const SRecruitmentStatusListWrapper = styled(Box, {
  padding: '$24 $24 0 $24',

  '@mobile': {
    padding: '$0',
  },
});

const SEmptyText = styled('p', {
  flexType: 'center',
  width: '100%',
  height: '$280',
  color: '$gray80',
  fontAg: '18_semibold_100',

  '@mobile': {
    height: '$184',
    fontAg: '14_medium_100',
  },
});

const SRecruitmentStatusModalBottom = styled(Box, {
  margin: '$24 $42 $44 $30',
  flexType: 'verticalCenter',
  justifyContent: 'space-between',

  '@mobile': {
    margin: '$16 $20 $24 $20',
  },
});

const STotal = styled('p', {
  color: '$gray80',
  fontAg: '16_medium_100',

  '@mobile': {
    fontAg: '12_medium_100',
  },
});

const SManagementAnchor = styled('a', {
  fontAg: '16_semibold_100',
  color: '$white',
  flexType: 'verticalCenter',
  position: 'absolute',
  right: '$42',

  '@mobile': {
    fontAg: '12_semibold_100',
    right: '$20',
  },

  svg: {
    ml: '$8',
  },
});
