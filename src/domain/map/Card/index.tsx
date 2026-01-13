import { useDeleteMapMutation, useRecommendMapMutation } from '@api/map/mutation';
import { mapData } from '@api/map/type';
import { useDisplay } from '@hook/useDisplay';
import { DialogOptionType, useDialog } from '@sopt-makers/ui';
import { useRef } from 'react';
import { styled } from 'stitches.config';
import LinkModalContent from '../Filter/Modal/LinkModalContent';
import { MapLinkKey } from '../Filter/Modal/type';
import DesktopMapCard from './DesktopMapCard';
import MobileMapCard from './MobileMapCard';

interface MapCardProps {
  mapData: mapData;
}

const MapCard = ({ mapData }: MapCardProps) => {
  const { isDesktop } = useDisplay();
  const { open, close } = useDialog();
  const { mutate: deleteMap } = useDeleteMapMutation();
  const { mutate: recommendMap } = useRecommendMapMutation();
  const selectedLinkRef = useRef<MapLinkKey | null>(null);

  const handleRecommendClick = (mapId: number) => {
    recommendMap(mapId);
  };

  const handleLinkSelect = (link: MapLinkKey | null) => {
    selectedLinkRef.current = link;
  };

  const handleLinkMove = () => {
    const selectedKey = selectedLinkRef.current;

    if (!selectedKey || !mapData) {
      close();
      return;
    }

    const targetUrl = mapData[selectedKey];

    if (targetUrl) {
      window.open(targetUrl, '_blank');
    }

    close();
  };

  const handleDeleteModalOpen = () => {
    const dialogOption: DialogOptionType = {
      title: '등록한 장소를 삭제할까요?',
      description: '삭제 시 복구할 수 없습니다.',
      type: 'danger',
      typeOptions: {
        cancelButtonText: '취소',
        approveButtonText: '삭제하기',
        onApprove: () => {
          if (!mapData?.id) {
            close();
            return;
          }

          deleteMap(mapData.id);
          close();
        },
      },
    };
    open(dialogOption);
  };

  const handleLinkModalOpen = () => {
    const hasNaverLink = !!mapData?.naverLink;
    const hasKakaoLink = !!mapData?.kakaoLink;

    if (!hasNaverLink && !hasKakaoLink) {
      return;
    }

    selectedLinkRef.current = null;

    if (hasNaverLink !== hasKakaoLink) {
      window.open(mapData.naverLink || mapData.kakaoLink, '_blank');
      return;
    }
    const dialogOption: DialogOptionType = {
      title: '어떤 링크로 이동할까요?',
      description: <LinkModalContent onSelect={handleLinkSelect} />,
      type: 'default',
      typeOptions: {
        cancelButtonText: '취소',
        approveButtonText: '이동하기',
        onApprove: handleLinkMove,
      },
    };
    open(dialogOption);
  };

  return (
    <CardWrapper>
      {isDesktop ? (
        <DesktopMapCard
          mapData={mapData}
          onDelete={handleDeleteModalOpen}
          onLinkClick={handleLinkModalOpen}
          onRecommendClick={handleRecommendClick}
        />
      ) : (
        <MobileMapCard
          mapData={mapData}
          onDelete={handleDeleteModalOpen}
          onLinkClick={handleLinkModalOpen}
          onRecommendClick={handleRecommendClick}
        />
      )}
    </CardWrapper>
  );
};

export default MapCard;

const CardWrapper = styled('li', {
  width: '100%',
});
