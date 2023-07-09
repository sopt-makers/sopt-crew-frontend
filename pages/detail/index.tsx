import { Box } from '@components/box/Box';
import DetailHeader from '@components/page/meetingDetail/DetailHeader';
import Carousel from '@components/page/meetingDetail/Carousel';
import { styled } from 'stitches.config';
import { useMutationDeleteMeeting, useMutationPostApplication, useQueryGetMeeting } from '@api/meeting/hooks';
import { useRouter } from 'next/router';
import Loader from '@components/loader/Loader';
import InformationPanel from '@components/page/meetingDetail/InformationPanel';
import { Tab } from '@headlessui/react';
import FeedPanel from '@components/page/meetingDetail/FeedPanel';

const DetailPage = () => {
  const router = useRouter();
  const id = router.query.id as string;
  const { data: detailData } = useQueryGetMeeting({ params: { id } });
  const { mutate: mutateDeleteMeeting } = useMutationDeleteMeeting({});
  const { mutate: mutatePostApplication } = useMutationPostApplication({});

  if (!detailData) {
    return <Loader />;
  }

  return (
    <SDetailPage>
      <Carousel imageList={detailData?.imageURL} />
      <DetailHeader
        detailData={detailData}
        mutateMeetingDeletion={mutateDeleteMeeting}
        mutateApplication={mutatePostApplication}
      />
      <Tab.Group
        onChange={index => {
          console.log('Changed selected tab to:', index);
        }}
      >
        <STabList>
          <STab>피드</STab>
          <STab>모임 안내</STab>
        </STabList>
        <Tab.Panels>
          <Tab.Panel>
            <FeedPanel />
          </Tab.Panel>
          <Tab.Panel>
            <InformationPanel detailData={detailData} />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </SDetailPage>
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
});

const STab = styled(Tab, {
  pb: '$16',
  mr: '$20',
  fontStyle: 'H1',
  flex: '1',
  textAlign: 'center',
  color: '$gray100',

  '&:hover': {
    color: '$white100',
  },

  '@tablet': {
    fontStyle: 'T3',
    pb: '$6',
    mr: '$12',
  },

  // 선택된 값 관련 수정 필요
  variants: {
    isSelected: {
      true: {
        color: '$white100',
        borderBottom: `2px solid $white100`,
      },
      false: {
        color: '$gray100',
      },
    },
  },
});
