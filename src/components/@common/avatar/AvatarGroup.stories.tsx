import type { Meta, StoryObj } from '@storybook/react';

import AvatarGroup from './AvatarGroup';
import Avatar from './Avatar';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof AvatarGroup> = {
  title: 'AvatarGroup',
  component: AvatarGroup,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof AvatarGroup>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {
  args: {
    children: [
      <Avatar
        src="https://mui.com/static/images/avatar/1.jpg"
        alt="sample iamge"
        sx={{ width: '48px', height: '48px' }}
      />,
      <Avatar
        src="https://mui.com/static/images/avatar/2.jpg"
        alt="sample iamge"
        sx={{ width: '48px', height: '48px' }}
      />,
      <Avatar
        src="https://mui.com/static/images/avatar/3.jpg"
        alt="sample iamge"
        sx={{ width: '48px', height: '48px' }}
      />,
    ],
  },
};
