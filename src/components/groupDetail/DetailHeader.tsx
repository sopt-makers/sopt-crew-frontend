import { Box } from '@components/box/Box';
import React, { useState } from 'react';
import { styled } from 'stitches.config';

const DetailHeader = () => {
  const isRecruiting = true;
  const startDate = '22.10.21';
  const endDate = '22.10.28';
  const category = '스터디';
  const studyName = '피그마 왕초보를 위한 스터디';
  const hostName = '홍길동';
  const current = 4;
  const total = 5;
  const isHost = false;
  const [isApplied, setIsApplied] = useState(true);

  const handleApplication = () => {
    setIsApplied(prev => !prev);
  };

  return (
    <SDetailHeader>
      <SAbout>
        <div>
          <SRecruitStatus isRecruiting={isRecruiting}>
            모집{isRecruiting ? ' 중' : '마감'}
          </SRecruitStatus>
          <SPeriod>
            {startDate} - {endDate}
          </SPeriod>
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
        {!isHost && (
          <SGuestButton isApplied={isApplied} onClick={handleApplication}>
            신청{isApplied ? ' 취소' : '하기'}
          </SGuestButton>
        )}
        {isHost && (
          <SHostButton>
            <button>삭제</button>
            <button>수정</button>
          </SHostButton>
        )}
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
  marginRight: '$90',

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

const SProfile = styled('button', {
  display: 'flex',
  alignItems: 'center',
  color: '$white',
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

const SGuestButton = styled(Button, {
  fontAg: '20_bold_100',
  padding: '$20 0',
  textAlign: 'center',

  variants: {
    isApplied: {
      true: {
        border: `2px solid $black40`,
      },
      false: {
        backgroundColor: '$purple100',
      },
    },
  },
});

const SHostButton = styled(Box, {
  button: {
    width: '$144',
    color: '$white',
    padding: '$20 0',
    textAlign: 'center',
    borderRadius: '$50',
    fontAg: '20_bold_100',
  },

  'button:first-child': {
    border: `2px solid $black40`,
    marginRight: '12px',
  },

  'button:last-child': {
    backgroundColor: '$purple100',
  },
});
