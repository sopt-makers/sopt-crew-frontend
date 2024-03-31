import type { Meta, StoryObj } from '@storybook/react';

import GroupBrowsingSlider from './groupBrowsingSlider';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof GroupBrowsingSlider> = {
  title: 'GroupBrowsingSlider',
  component: GroupBrowsingSlider,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof GroupBrowsingSlider>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {
  args: {},
};
