import type { Meta, StoryObj } from '@storybook/react';

import FeedPostViewer from './FeedPostViewer';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof FeedPostViewer> = {
  title: 'FeedPostViewer',
  component: FeedPostViewer,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof FeedPostViewer>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {
  args: {
    post: {
      id: 1,
      title: '하트시그널 시즌 1부터 시즌 4까지 중에 가장 인기가 많았던 출연자는?',
      contents: `1번 김현우\n2번 오영주\n3번 임현주\n4번 박지현\n5번 기타`,
      updatedDate: '2시간 전',
      images: ['https://via.placeholder.com/600/92c952'],
      user: {
        id: 1,
        name: '김지민',
        profileImage: 'https://mui.com/static/images/avatar/1.jpg',
      },
      viewCount: 1234,
      likeCount: 0,
      isLiked: false,
    },
    Actions: ['수정', '삭제'],
  },
};
