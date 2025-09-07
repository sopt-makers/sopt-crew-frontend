import { useDisplay } from '@hook/useDisplay';
import { Tooltip } from '@shared/Tooltip/Tooltip';
import { Tag } from '@sopt-makers/ui';

export const TooltipContent = () => {
  const { isMobile } = useDisplay();

  if (isMobile) {
    return (
      <Tooltip.Content>
        관심 키워드 설정하고 <br />
        신규 모임 개설 알림을 받아보세요
      </Tooltip.Content>
    );
  }

  return (
    <Tooltip.Content
      TooltipClose={<Tooltip.Close />}
      title={'키워드 알림'}
      titleRightIcon={
        <Tag variant="primary" size="sm">
          NEW
        </Tag>
      }
    >
      관심 키워드 설정하고 <br />
      신규 모임 개설 알림을 받아보세요
    </Tooltip.Content>
  );
};
