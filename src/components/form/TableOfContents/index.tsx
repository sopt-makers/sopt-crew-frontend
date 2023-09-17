import { useFormContext, useWatch } from 'react-hook-form';
import { FormType } from '@type/form';
import { styled } from 'stitches.config';
import UncheckedIcon from '@assets/svg/icon_progress_unchecked.svg';
import CheckedIcon from '@assets/svg/icon_progress_checked.svg';
import { Box } from '@components/box/Box';

interface TableOfContentsProps {
  label: string;
}

function TableOfContents({ label }: TableOfContentsProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext<FormType>();
  const form = useWatch({ control });

  const isTitleValid = form.title && !errors.title;
  const isCategoryValid = form.category?.value && !errors.category;
  const isImageValid = form.files && form.files.length > 0;
  const isApplicationDateValid = form.startDate && form.endDate && !errors.startDate && !errors.endDate;
  const isMemberCountValid = form.capacity && !errors.capacity;
  const isDetailValid =
    form.detail &&
    form.detail.desc &&
    form.detail.processDesc &&
    form.detail.mStartDate &&
    form.detail.mEndDate &&
    form.detail.leaderDesc &&
    form.detail.targetDesc &&
    form.detail.joinableParts &&
    form.detail.joinableParts.length > 1 && // default 옵션이 선택되어 있기 때문 최소 2개 이상 선택되어야 통과
    !errors.detail;

  const validityList = [
    isTitleValid,
    isCategoryValid,
    isImageValid,
    isApplicationDateValid,
    isMemberCountValid,
    isDetailValid,
  ];

  return (
    <SContainer>
      <SListHeader>
        <SLabel>{label}</SLabel>
        <SCount>
          {validityList.filter(Boolean).length} / {validityList.length}
        </SCount>
      </SListHeader>

      <SItemList>
        <SItem>
          {isTitleValid ? <CheckedIcon /> : <UncheckedIcon />}
          <SItemLabel>모임 제목</SItemLabel>
        </SItem>
        <SItem>
          {isCategoryValid ? <CheckedIcon /> : <UncheckedIcon />}
          <SItemLabel>모임 카테고리</SItemLabel>
        </SItem>
        <SItem>
          {isImageValid ? <CheckedIcon /> : <UncheckedIcon />}
          <SItemLabel>이미지</SItemLabel>
        </SItem>
        <SItem>
          {isApplicationDateValid ? <CheckedIcon /> : <UncheckedIcon />}
          <SItemLabel>모집 기간</SItemLabel>
        </SItem>
        <SItem>
          {isMemberCountValid ? <CheckedIcon /> : <UncheckedIcon />}
          <SItemLabel>모집 인원</SItemLabel>
        </SItem>
        <SItem>
          {isDetailValid ? <CheckedIcon /> : <UncheckedIcon />}
          <SItemLabel>모임 정보</SItemLabel>
        </SItem>
      </SItemList>
    </SContainer>
  );
}

export default TableOfContents;

const SContainer = styled('div', {
  width: '341px',
  padding: '50px 40px 60px',
  height: 'fit-content',
  background: '$black80',
  border: '1px solid $black60',
  borderRadius: '15px',
  position: 'sticky',
  top: '$80',

  '@tablet': {
    display: 'none',
  },
});
const SListHeader = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '$36',
  paddingBottom: '$36',
  borderBottom: '1.5px solid $black60',
});
const SLabel = styled('h2', {
  fontWeight: '700',
  fontSize: '24px',
  lineHeight: '100%',
  color: '$white100',
});
const SCount = styled(Box, {
  width: '$60',
  padding: '$6 0',
  fontWeight: '600',
  fontSize: '12px',
  lineHeight: '100%',
  textAlign: 'center',
  background: '$black60',
  borderRadius: '6px',
});
const SItemList = styled('ul', {
  margin: 0,
  display: 'flex',
  flexDirection: 'column',
  gap: '30px',
});
const SItem = styled('li', {
  display: 'flex',
  alignItems: 'center',
  gap: '28px',
});
const SItemLabel = styled('span', {
  display: 'inline-block',
  fontAg: '16_medium_100',
  color: '$white100',
});
