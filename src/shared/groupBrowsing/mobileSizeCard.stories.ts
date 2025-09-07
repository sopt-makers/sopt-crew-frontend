import type { Meta, StoryObj } from '@storybook/react';

import MobileSizeCard from './mobileSizeCard';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof MobileSizeCard> = {
  title: 'MobileSizeCard',
  component: MobileSizeCard,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof MobileSizeCard>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {
  args: {},
};
