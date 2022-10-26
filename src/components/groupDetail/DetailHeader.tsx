import { Box } from '@components/box/Box';
import React from 'react';
import { styled } from 'stitches.config';

const DetailHeader = () => {
  const isRecruiting = true;
  const period = '22.10.21 - 22.10.28';
  const category = '스터디';
  const studyName = '피그마 왕초보를 위한 스터디';
  const hostName = '홍길동';
  const current = 4;
  const total = 5;

  return (
    <SDetailHeader>
      <SAbout>
        <div>
          <SRecruitStatus isRecruiting={isRecruiting}>
            모집{isRecruiting ? ' 중' : '마감'}
          </SRecruitStatus>
          <SPeriod>{period}</SPeriod>
        </div>
        <h1>
          <span>{category}</span>
          {studyName}
        </h1>
        <SProfile>
          <SProfileImage />
          <span>{hostName}</span>
          {/* 여기 > 아이콘 추가 */}
        </SProfile>
      </SAbout>
      <SApplication>
        <SStatusButton>
          <div>
            <span>모집 현황</span>
            <span>
              {current}/{total}명
            </span>
          </div>
          {/* 여기 > 아이콘 추가 */}
        </SStatusButton>
        <SApplicationButton>신청하기</SApplicationButton>
      </SApplication>
    </SDetailHeader>
  );
};

export default DetailHeader;

const SDetailHeader = styled(Box, {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingBottom: '$120',
  borderBottom: `2px solid $black60`,
  marginBottom: '$40',
});

const SAbout = styled(Box, {
  '& > div': {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '$12',
  },

  '& > h1': {
    span: {
      color: '$gray80',
      marginRight: '$8',
    },

    fontAg: '34_bold_140',
    marginBottom: '$20',
  },
});

const SRecruitStatus = styled(Box, {
  width: 'fit-content',
  padding: '$7 $8',
  marginRight: '$12',
  borderRadius: '6px',
  fontAg: '16_bold_100',

  variants: {
    isRecruiting: {
      true: {
        backgroundColor: '$purple100',
      },
      false: {
        backgroundColor: '$gray80',
      },
    },
  },
});

const SPeriod = styled(Box, {
  fontAg: '20_bold_100',
});

const SProfile = styled(Box, {
  display: 'flex',
  alignItems: 'center',
});

const SProfileImage = styled(Box, {
  width: '$60',
  height: '$60',
  borderRadius: '50%',
  objectFit: 'cover',
  marginRight: '$16',
  backgroundColor: '$black60',
});

const SApplication = styled(Box, {});

const Button = styled('button', {
  width: '$300',
  height: '$60',
  borderRadius: '12px',
  color: '$white',
});

const SStatusButton = styled(Button, {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '$21 $20',
  marginBottom: '$16',
  backgroundColor: '$black80',
  fontAg: '18_semibold_100',

  'span:first-child': {
    marginRight: '$12',
    color: '$gray80',
  },
});

const SApplicationButton = styled(Button, {
  backgroundColor: '$purple100',
  fontAg: '20_bold_100',
  padding: '$20 0',
  textAlign: 'center',
});
