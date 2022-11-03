import { Box } from '@components/box/Box';
import DetailHeader from '@components/page/groupDetail/DetailHeader';
import Carousel from '@components/page/groupDetail/Carousel';
import { TabList } from '@components/tabList/TabList';
import {
  imgExample1,
  imgExample2,
  imgExample3,
  imgExample4,
} from 'public/assets/img';
import { useRef, useState } from 'react';
import { styled } from 'stitches.config';
import useModal from '@hooks/useModal';
import ConfirmModal from '@components/modal/ConfirmModal';
import DefaultModal from '@components/modal/DefaultModal';

const DetailPage = () => {
  const { isModalOpened, handleModalOpen, handleModalClose } = useModal();
  const [modalWidth, setModalWidth] = useState('');
  const [modalTitle, setModalTitle] = useState('');
  const [modalType, setModalType] = useState('');

  const imageList = [imgExample1, imgExample2, imgExample3, imgExample4];
  const tabRef = useRef(new Array());
  const detailList = [
    {
      id: 0,
      title: '모임 소개',
      content: '내용',
    },
    {
      id: 1,
      title: '모임 기간',
      content: '내용',
    },
    {
      id: 2,
      title: '진행 방식',
      content: '내용',
    },
    {
      id: 3,
      title: '개설자 소개',
      content: '내용',
    },
    {
      id: 4,
      title: '모집 대상',
      content: '내용',
    },
    {
      id: 5,
      title: '유의사항',
      content: '내용',
    },
  ];
  const [selectedTab, setSelectedTab] = useState(detailList[0].title);

  const handleChange = (text: string) => {
    setSelectedTab(text);
    tabRef.current[
      detailList.findIndex(item => item.title === text)
    ].scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <SDetailPage>
        <Carousel imageList={imageList} />
        <DetailHeader
          handleModalOpen={handleModalOpen}
          setModalWidth={setModalWidth}
          setModalTitle={setModalTitle}
          setModalType={setModalType}
        />
        <TabList text={selectedTab} size="small" onChange={handleChange}>
          {detailList.map(({ id, title }) => (
            <TabList.Item key={id} text={title}>
              {title}
            </TabList.Item>
          ))}
        </TabList>
        {detailList.map(({ id, title, content }) => (
          <SDetail key={id} ref={element => (tabRef.current[id] = element)}>
            <STitle>{title}</STitle>
            <SContent>{content}</SContent>
          </SDetail>
        ))}
      </SDetailPage>
      {isModalOpened && modalType !== 'default' && (
        <ConfirmModal
          message="모임을 삭제하시겠습니까?"
          cancelButton="돌아가기"
          confirmButton="삭제하기"
          handleModalClose={handleModalClose}
        />
      )}
      {isModalOpened && modalType === 'default' && (
        <DefaultModal
          width={modalWidth}
          title={modalTitle}
          handleModalClose={handleModalClose}
        />
      )}
    </>
  );
};

export default DetailPage;

const SDetailPage = styled(Box, {
  mb: '$374',
});

const SDetail = styled(Box, {
  color: '$white',
  mt: '$120',
});

const STitle = styled(Box, {
  fontAg: '24_bold_100',
  mb: '$24',
});

const SContent = styled('p', {
  fontSize: '$22',
  lineHeight: '37.4px',
});
