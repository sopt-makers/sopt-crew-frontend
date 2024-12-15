import type { Meta, StoryObj } from '@storybook/react';

import Avatar from './Avatar';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Avatar> = {
  title: 'Avatar',
  component: Avatar,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Avatar>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {
  args: {
    src: 'https://mui.com/static/images/avatar/1.jpg',
    alt: 'Avatar',
  },
};

export const CustomStyles: Story = {
  args: {
    src: 'https://mui.com/static/images/avatar/1.jpg',
    alt: 'Avatar',
    sx: {
      width: '48px',
      height: '48px',
    },
  },
};
