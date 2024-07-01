import type { Meta, StoryObj } from '@storybook/react';

import FeedCommentInput from './FeedCommentInput';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof FeedCommentInput> = {
  title: 'FeedCommentInput',
  component: FeedCommentInput,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof FeedCommentInput>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {
  args: {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    users: [
      {
        userId: 10,
        userName: '송림',
        part: '웹',
        generation: 33,
        profileImageUrl: 'url~~~',
      },
      {
        userId: 11,
        userName: '송민규',
        part: '서버',
        generation: 34,
        profileImageUrl: 'url~~~',
      },
      {
        userId: 12,
        userName: '송지환',
        part: '서버',
        generation: 23,
        profileImageUrl: 'url~~~',
      },
    ],
    meta: {
      page: 1,
      take: 10,
      itemCount: 3,
      pageCount: 1,
      hasPreviousPage: false,
      hasNextPage: false,
    },
  },
};
