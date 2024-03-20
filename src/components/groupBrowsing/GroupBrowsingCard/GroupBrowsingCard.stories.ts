import type { Meta, StoryObj } from '@storybook/react';

import GroupBrowsingCard from './GroupBrowsingCard';

const meta: Meta<typeof GroupBrowsingCard> = {
  title: 'GroupBrowsingCard',
  component: GroupBrowsingCard,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof GroupBrowsingCard>;

export const Default: Story = {
  args: {
    id: 93,
    userId: 270,
    title: '비밀이야',
    category: '스터디',
    imageURL: [
      {
        id: 0,
        url: 'https://makers-web-img.s3.ap-northeast-2.amazonaws.com/meeting/2024/01/08/213a1b06-35fd-4227-9029-3843f66622a3.png',
      },
    ],
    startDate: '2023-02-13T00:00:00.000Z',
    endDate: '2024-09-12T23:59:59.999Z',
    capacity: 299,
    mStartDate: '2024-02-14T00:00:00.000Z',
    mEndDate: '2024-05-31T00:00:00.000Z',
    recentActivityDate: '2024-02-14T00:00:00.000Z',
    targetActiveGeneration: 33,
    joinableParts: ['PM', 'DESIGN', 'WEB', 'ANDROID', 'IOS', 'SERVER'],
    applicantCount: 0,
    approvedUserCount: 0,
    user: {
      id: 270,
      name: '이예서',
      orgId: 125,
      profileImage:
        'https://s3.ap-northeast-2.amazonaws.com/sopt-makers-internal//dev/image/project/377c054a-1d17-48bd-8906-e36af319eeff-thumb-1889155643_tTsRhUda_df98a7412d411689021274036b55ee934f215b47_640x640.jpg',
    },
    status: 2,
  },
};
