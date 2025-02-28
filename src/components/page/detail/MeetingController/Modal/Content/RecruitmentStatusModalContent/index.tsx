import Link from 'next/link';
import { styled } from 'stitches.config';
import RecruitmentStatusList from './RecruitmentStatusList';
import ArrowSmallRightIcon from '@assets/svg/arrow_small_right.svg';
import { ampli } from '@/ampli';
import { paths } from '@/__generated__/schema2';

interface RecruitmentStatusModalContentProps {
  meetingId: number;
  appliedInfo: paths['/meeting/v2/{meetingId}']['get']['responses']['200']['content']['application/json;charset=UTF-8']['appliedInfo'];
  isHost: boolean;
  isCoLeader: boolean;
  isApplied: boolean;
}

const RecruitmentStatusModalContent = ({
  meetingId,
  appliedInfo,
  isHost,
  isCoLeader,
  isApplied,
}: RecruitmentStatusModalContentProps) => {
  const total = appliedInfo.length;
  const isBottomVisible = total > 0 || isHost || isApplied || isCoLeader;

  return (
    <>
      {total > 0 ? (
        <SRecruitmentStatusListWrapper>
          <RecruitmentStatusList recruitmentStatusList={appliedInfo} />
        </SRecruitmentStatusListWrapper>
      ) : (
        <SEmptyText>{isHost ? '신청자' : '참여자'}가 없습니다.</SEmptyText>
      )}
      {isBottomVisible && (
        <SRecruitmentStatusModalBottom>
          {total > 0 && <STotal>총 {total}명 신청</STotal>}
          {(isHost || isApplied || isCoLeader) && (
            <Link href={`/mine/management?id=${meetingId}`} passHref legacyBehavior>
              <SManagementAnchor onClick={() => ampli.clickMemberManagement()}>
                {isHost ? '신청자 관리' : (isCoLeader || isApplied) && '참여자 리스트'}
                <ArrowSmallRightIcon />
              </SManagementAnchor>
            </Link>
          )}
        </SRecruitmentStatusModalBottom>
      )}
    </>
  );
};

export default RecruitmentStatusModalContent;

const SRecruitmentStatusListWrapper = styled('div', {
  padding: '$24 $24 0 $24',

  '@media (max-width: 768px)': {
    padding: '$0',
  },
});

const SEmptyText = styled('p', {
  flexType: 'center',
  width: '100%',
  height: '$280',
  color: '$gray400',
  fontAg: '18_semibold_100',

  '@media (max-width: 768px)': {
    height: '$184',
    fontAg: '14_medium_100',
  },
});

const SRecruitmentStatusModalBottom = styled('div', {
  margin: '$24 $42 $44 $30',
  flexType: 'verticalCenter',
  justifyContent: 'space-between',

  '@media (max-width: 768px)': {
    margin: '$16 $20 $24 $20',
  },
});

const STotal = styled('p', {
  color: '$gray400',
  fontAg: '16_medium_100',

  '@media (max-width: 768px)': {
    fontAg: '12_medium_100',
  },
});

const SManagementAnchor = styled('a', {
  fontAg: '16_semibold_100',
  color: '$gray10',
  flexType: 'verticalCenter',
  position: 'absolute',
  right: '$42',

  '@media (max-width: 768px)': {
    fontAg: '12_semibold_100',
    right: '$20',
  },

  svg: {
    ml: '$8',
  },
});
