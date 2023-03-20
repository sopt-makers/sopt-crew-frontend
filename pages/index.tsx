import type { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { styled } from 'stitches.config';
import { useGetMemberOfMe } from 'src/api/members/hooks';
import useModal from '@hooks/useModal';
import { useDisplay } from '@hooks/useDisplay';
import moveToProfileUploadPage from '@utils/moveToProfileUploadPage';
import ConfirmModal from '@components/modal/ConfirmModal';
import { Box } from '@components/box/Box';
import { TabList } from '@components/tabList/TabList';
import { Flex } from '@components/util/layout/Flex';
import { SSRSafeSuspense } from '@components/util/SSRSafeSuspense';
import { MeetingListOfAll } from '@components/page/meetingList/Grid/List';
import Filter from '@components/page/meetingList/Filter';
import Search from '@components/page/meetingList/Filter/Search';
import GridLayout from '@components/page/meetingList/Grid/Layout';
import CardSkeleton from '@components/page/meetingList/Card/Skeleton';
import PlusIcon from '@assets/svg/plus.svg';
import WriteIcon from '@assets/svg/write.svg';

const Home: NextPage = () => {
  const router = useRouter();
  const { data: me } = useGetMemberOfMe();
  const { isModalOpened, handleModalOpen, handleModalClose } = useModal();
  const { isMobile } = useDisplay();

  const handleMakeMeeting = () => {
    if (!me?.hasProfile) {
      handleModalOpen();
      return;
    }
    router.push('/make');
  };

  return (
    <>
      <div>
        <Flex align="center" justify="between">
          <TabList text="all" size="big">
            <Link href="/" passHref>
              <a>
                <TabList.Item text="all">전체 모임</TabList.Item>
              </a>
            </Link>
            <Link href="/mine" passHref>
              <a>
                <TabList.Item text="mine">내 모임</TabList.Item>
              </a>
            </Link>
          </TabList>
          <SMobileButtonContainer>
            <WriteIcon onClick={handleMakeMeeting} />
            <Search.Mobile />
          </SMobileButtonContainer>
          <SMakeMeetingButton onClick={handleMakeMeeting}>
            <PlusIcon />
            <span>모임 개설하기</span>
          </SMakeMeetingButton>
        </Flex>
        <SFilterWrapper>
          <Filter />
        </SFilterWrapper>
        <SSRSafeSuspense
          fallback={
            <GridLayout>
              {new Array(isMobile ? 4 : 9).fill(null).map((_, index) => (
                <CardSkeleton key={index} />
              ))}
            </GridLayout>
          }
        >
          <MeetingListOfAll />
        </SSRSafeSuspense>
      </div>
      <ConfirmModal
        isModalOpened={isModalOpened}
        message={`모임을 개설하려면\n프로필 작성이 필요해요`}
        cancelButton="돌아가기"
        confirmButton="작성하기"
        handleModalClose={handleModalClose}
        handleConfirm={moveToProfileUploadPage}
      />
    </>
  );
};

export default Home;

const SMakeMeetingButton = styled('button', {
  flexType: 'verticalCenter',
  padding: '$18 $24 $18 $20',
  background: '$purple100',
  borderRadius: '12px',
  '& > span': {
    ml: '$12',
    fontAg: '18_bold_100',
    color: '$white',
  },
  '@mobile': {
    display: 'none',
  },
});

const SMobileButtonContainer = styled(Box, {
  display: 'none',
  '@mobile': {
    flexType: 'verticalCenter',
    gap: '16px',
  },
  svg: {
    cursor: 'pointer',
  },
});

const SFilterWrapper = styled(Box, {
  mt: '$120',
  mb: '$64',
  '@mobile': {
    mt: '$48',
    mb: '$24',
  },
});
