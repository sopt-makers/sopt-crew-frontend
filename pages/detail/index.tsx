import { Box } from '@components/box/Box';
import DetailHeader from '@components/page/meetingDetail/DetailHeader';
import Carousel from '@components/page/meetingDetail/Carousel';
import { styled } from 'stitches.config';
import { useMutationDeleteMeeting, useMutationPostApplication, useQueryGetMeeting } from '@api/meeting/hooks';
import { useRouter } from 'next/router';
import Loader from '@components/loader/Loader';
import InformationPanel from '@components/page/meetingDetail/Information/InformationPanel';
import { Tab } from '@headlessui/react';
import FeedPanel from '@components/page/meetingDetail/Feed/FeedPanel';
import { Fragment, useState } from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import { useOverlay } from '@hooks/useOverlay/Index';
import FeedCreateModal from '@components/page/meetingDetail/Feed/Modal/FeedCreateModal';
import ConfirmModal from '@components/modal/ConfirmModal';

dayjs.locale('ko');

const enum SelectedTab {
  FEED,
  INFORMATION,
}

const DetailPage = () => {
  const router = useRouter();
  const id = router.query.id as string;
  const [selectedIndex, setSelectedIndex] = useState(SelectedTab.FEED);
  const { data: detailData } = useQueryGetMeeting({ params: { id } });
  const { mutate: mutateDeleteMeeting } = useMutationDeleteMeeting({});
  const { mutate: mutatePostApplication } = useMutationPostApplication({});
  const createFeedOverlay = useOverlay();
  const closeCreateFeedOverlay = useOverlay();

  const handleCreateFeedOpen = () =>
    createFeedOverlay.open(({ isOpen: isCreateModalOpen, close: closeCreateModal }) => (
      <FeedCreateModal
        isModalOpened={isCreateModalOpen}
        handleModalExit={() => {
          closeCreateModal();
        }}
        handleModalClose={() => {
          closeCreateFeedOverlay.open(({ isOpen: isConfirmModalOpen, close: closeConfirmModal }) => (
            <ConfirmModal
              isModalOpened={isConfirmModalOpen}
              message={`피드 작성을 그만두시겠어요?\n지금까지 쓴 내용이 지워져요.`}
              handleModalClose={closeConfirmModal}
              cancelButton="돌아가기"
              confirmButton="그만두기"
              handleConfirm={() => {
                closeConfirmModal();
                closeCreateModal();
              }}
            />
          ));
        }}
      />
    ));

  if (!detailData) {
    return <Loader />;
  }

  return (
    <>
      <SDetailPage>
        <Carousel imageList={detailData?.imageURL} />
        <button style={{ color: 'white' }} onClick={handleCreateFeedOpen}>
          모달 오픈
        </button>

        <DetailHeader
          detailData={detailData}
          mutateMeetingDeletion={mutateDeleteMeeting}
          mutateApplication={mutatePostApplication}
        />
        <Tab.Group selectedIndex={selectedIndex} onChange={index => setSelectedIndex(index)}>
          <STabList>
            <Tab as={Fragment}>
              <STabButton isSelected={selectedIndex === SelectedTab.FEED}>피드</STabButton>
            </Tab>
            <Tab as={Fragment}>
              <STabButton isSelected={selectedIndex === SelectedTab.INFORMATION}>모임 안내</STabButton>
            </Tab>
          </STabList>
          <Tab.Panels>
            <Tab.Panel>
              <FeedPanel isMember={detailData?.approved || detailData?.host} />
            </Tab.Panel>
            <Tab.Panel>
              <InformationPanel detailData={detailData} />
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </SDetailPage>
    </>
  );
};

export default DetailPage;

const SDetailPage = styled(Box, {
  mb: '$374',

  '@tablet': {
    mb: '$122',
  },
});

const STabList = styled(Box, {
  display: 'flex',

  '@tablet': {
    width: 'calc(100% + 40px)',
    marginLeft: '-20px',
  },

  '@mobile': {
    width: 'calc(100% + 32px)',
    marginLeft: '-16px',
  },
});

const STabButton = styled('button', {
  pb: '$24',
  mr: '$32',
  fontStyle: 'H1',
  color: '$gray100',

  '&:hover': {
    color: '$white100',
  },

  '@tablet': {
    fontStyle: 'T3',
    padding: '$16 0',
    mr: '$0',
    flex: '1',
    textAlign: 'center',
  },

  variants: {
    isSelected: {
      true: {
        color: '$white100',
        borderBottom: `4px solid $white100`,
        '@tablet': {
          borderWidth: '2px',
        },
      },
      false: {
        color: '$gray100',
        paddingBottom: '$28',
        '@tablet': {
          paddingBottom: '$18',
        },
      },
    },
  },
});
