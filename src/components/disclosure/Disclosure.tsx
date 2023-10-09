import { Flex } from '@components/util/layout/Flex';
import { Disclosure as HeadlessDisclosure } from '@headlessui/react';
import { styled } from 'stitches.config';
import ArrowIcon from 'public/assets/svg/arrow_down.svg';
import { parseTextToLink } from '@components/util/parseTextToLink';
import { ampli } from '@/ampli';

interface DisclosureProps {
  title: string;
  subTitle: string;
  contents: string;
  createdDate: string; // YYYY-MM-DD
}

export default function Disclosure({ title, subTitle, contents, createdDate }: DisclosureProps) {
  return (
    <HeadlessDisclosure>
      {({ open }) => (
        <Container>
          <STitleContainer justify="between" align="center">
            <STitleWrapper direction="column">
              <STitle>{title}</STitle>
              <SSubTitle>{subTitle}</SSubTitle>
            </STitleWrapper>
            <HeadlessDisclosure.Button onClick={() => (!open ? ampli.clickNoticeOn() : ampli.clickNoticeOff())}>
              <SArrowIcon isOpen={open} />
            </HeadlessDisclosure.Button>
          </STitleContainer>
          <HeadlessDisclosure.Panel>
            <SDivider />
            <SContents>{parseTextToLink(contents)}</SContents>
            <SInfo justify="end" align="center">
              <SCreatedAt>작성 일자</SCreatedAt>
              <SDate>{createdDate}</SDate>
            </SInfo>
          </HeadlessDisclosure.Panel>
        </Container>
      )}
    </HeadlessDisclosure>
  );
}

const Container = styled('div', {
  padding: '48px',
  background: '$black80',
  borderRadius: '20px',
  '@mobile': {
    padding: '24px 16px',
    borderRadius: '12px',
  },
});
const STitleContainer = styled(Flex, {
  width: '100%',
});
const STitleWrapper = styled(Flex, {
  gap: '14px',
  '@mobile': {
    gap: '6px',
  },
});
const STitle = styled('h1', {
  fontStyle: 'H1',
  color: '$white',
  '@mobile': {
    fontStyle: 'H5',
  },
});
const SSubTitle = styled('h4', {
  fontStyle: 'T4',
  color: 'gray60',
  '@mobile': {
    fontStyle: 'B4',
  },
});
const SArrowIcon = styled(ArrowIcon, {
  width: '32px',
  height: '32px',
  color: '$white',
  variants: {
    isOpen: {
      true: {
        transform: 'rotate(180deg)',
      },
    },
  },
  '@mobile': {
    width: '24px',
    height: '24px',
  },
});
const SDivider = styled('div', {
  height: '1px',
  margin: '36px 0 32px 0',
  background: '$black40',
  '@mobile': {
    margin: '20px 0',
  },
});
const SContents = styled('div', {
  padding: '0 4px',
  fontStyle: 'B2',
  color: '$gray30',
  whiteSpace: 'pre-line',
  '@mobile': {
    fontStyle: 'B4',
  },
});
const SInfo = styled(Flex, {
  gap: '6px',
  '@mobile': {
    marginTop: '14px',
  },
});
const SCreatedAt = styled('span', {
  fontStyle: 'T6',
  color: '$gray100',
  '@mobile': {
    fontStyle: 'C1',
  },
});
const SDate = styled('span', {
  fontStyle: 'B4',
  color: '$gray60',
  '@mobile': {
    fontStyle: 'C1',
  },
});
