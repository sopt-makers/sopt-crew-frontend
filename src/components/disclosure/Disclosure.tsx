import { Flex } from '@components/util/layout/Flex';
import { Disclosure as HeadlessDisclosure } from '@headlessui/react';
import { Fragment } from 'react';
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
          <HeadlessDisclosure.Button as={Fragment}>
            <Flex justify="between" align="center">
              <STitleWrapper direction="column">
                <STitle>{title}</STitle>
                <SSubTitle>{subTitle}</SSubTitle>
              </STitleWrapper>
              <SArrowIcon isOpen={open} />
            </Flex>
          </HeadlessDisclosure.Button>
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
  width: '100$',
  padding: '48px',
  background: '$black80',
  borderRadius: '20px',
});
const STitleWrapper = styled(Flex, {
  gap: '14px',
});
const STitle = styled('h1', {
  /* Crew/Headline/1 */
  fontWeight: '700',
  fontSize: '24px',
  lineHeight: '24px',
  color: '$white',
});
const SSubTitle = styled('h4', {
  /* Crew/Title/4 */
  fontWeight: '600',
  fontSize: '16px',
  lineheight: '24px',
  color: 'gray60',
});
const SArrowIcon = styled(ArrowIcon, {
  variants: {
    isOpen: {
      true: {
        transform: 'rotate(180deg)',
      },
    },
  },
});
const SDivider = styled('div', {
  height: '1px',
  margin: '36px 0 32px 0',
  background: '$black40',
});
const SContents = styled('div', {
  padding: '0 9px',
  /* Crew/Body/2 */
  fontWeight: '500',
  fontSize: '16px',
  lineHeight: '26px',
  color: '$gray30',
});
const SInfo = styled(Flex, {
  gap: '6px',
});
const SCreatedAt = styled('span', {
  /* Crew/Title/6 */
  fontWeight: '600',
  fontSize: '12px',
  lineheight: '18px',
  color: '$gray100',
});
const SDate = styled('span', {
  /* Crew/Body/4 */
  fontWeight: '500',
  fontSize: '12px',
  lineHeight: '18px',
  color: '$gray60',
});
