import { Flex } from '@components/util/layout/Flex';
import { Disclosure as HeadlessDisclosure } from '@headlessui/react';
import { styled } from 'stitches.config';
import ArrowIcon from 'public/assets/svg/ic.svg';

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
            <HeadlessDisclosure.Button>
              <SArrowIcon isOpen={open} />
            </HeadlessDisclosure.Button>
          </STitleContainer>
          <HeadlessDisclosure.Panel>
            <SDivider />
            <SContents>{contents}</SContents>
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
  /* Crew/Headline/1 */
  fontWeight: '700',
  fontSize: '24px',
  lineHeight: '24px',
  color: '$white',
  '@mobile': {
    /* Crew/Headline/5 */
    fontSize: '14px',
    lineHeight: '14px',
  },
});
const SSubTitle = styled('h4', {
  /* Crew/Title/4 */
  fontWeight: '600',
  fontSize: '16px',
  lineheight: '24px',
  color: 'gray60',
  '@mobile': {
    /* Crew/Body/4 */
    fontWeight: '500',
    fontSize: '12px',
    lineHeight: '18px',
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
  /* Crew/Body/2 */
  fontWeight: '500',
  fontSize: '16px',
  lineHeight: '26px',
  color: '$gray30',
  '@mobile': {
    /* Crew/Body/4 */
    fontSize: '12px',
    lineHeight: '18px',
  },
});
const SInfo = styled(Flex, {
  gap: '6px',
  '@mobile': {
    marginTop: '14px',
  },
});
const SCreatedAt = styled('span', {
  /* Crew/Title/6 */
  fontWeight: '600',
  fontSize: '12px',
  lineheight: '18px',
  color: '$gray100',
  '@mobile': {
    /* Crew/Caption/1 */
    fontWeight: '700',
    fontSize: '10px',
    lineHeight: '10px',
  },
});
const SDate = styled('span', {
  /* Crew/Body/4 */
  fontWeight: '500',
  fontSize: '12px',
  lineHeight: '18px',
  color: '$gray60',
  '@mobile': {
    /* Crew/Caption/1 */
    fontWeight: '700',
    fontSize: '10px',
    lineHeight: '10px',
  },
});
