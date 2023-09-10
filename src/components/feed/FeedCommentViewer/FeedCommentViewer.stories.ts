import type { Meta, StoryObj } from '@storybook/react';

import FeedCommentViewer from './FeedCommentViewer';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof FeedCommentViewer> = {
  title: 'FeedCommentViewer',
  component: FeedCommentViewer,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof FeedCommentViewer>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {
  args: {
    comment: {
      id: 1,
      contents:
        '처음부터 민규가 마음에 들었어, 세 분이 너무 예쁘게 딱딱 옆으로 가서 불편해요. 이주미씨가 유지원씨처럼 모르는 거야 아직 파악이 안 되니까. 다 깃털에 치여서 날아갈 것 같은 거야. 피드 예시피드 예시피드 예시피드 예시피드 예시피드 예시피드 예시피드 예시피드 예시',
      updatedDate: '2시간 전',
      user: {
        id: 1,
        name: '김지민',
        profileImage: 'https://mui.com/static/images/avatar/1.jpg',
      },
      likeCount: 182,
      isLiked: false,
    },
    isMine: true,
    Actions: ['수정', '삭제'],
  },
};
