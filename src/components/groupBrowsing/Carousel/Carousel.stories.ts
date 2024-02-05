import type { Meta, StoryObj } from '@storybook/react';

import Carousel from './Carousel';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Carousel> = {
  title: 'Carousel',
  component: Carousel,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Carousel>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {
  args: {
    cardList: [
      {
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
        status: 1,
      },
      {
        id: 82,
        userId: 253,
        title: '고기 좋아요',
        category: '스터디',
        imageURL: [
          {
            id: 0,
            url: 'https://makers-web-img.s3.ap-northeast-2.amazonaws.com/meeting/2023/09/28/270911ef-e176-4323-b713-b0352a8363a7.jpeg',
          },
        ],
        startDate: '2023-01-13T00:00:00.000Z',
        endDate: '2099-01-01T23:59:59.999Z',
        capacity: 7,
        mStartDate: '2100-01-01T00:00:00.000Z',
        mEndDate: '2100-01-02T00:00:00.000Z',
        recentActivityDate: '2024-02-14T00:00:00.000Z',
        targetActiveGeneration: 32,
        joinableParts: ['PM', 'DESIGN', 'WEB', 'ANDROID', 'IOS', 'SERVER'],
        applicantCount: 0,
        approvedUserCount: 1,
        user: {
          id: 253,
          name: '강영우',
          orgId: 18,
          profileImage:
            'https://s3.ap-northeast-2.amazonaws.com/sopt-makers-internal//dev/image/project/377c054a-1d17-48bd-8906-e36af319eeff-thumb-1889155643_tTsRhUda_df98a7412d411689021274036b55ee934f215b47_640x640.jpg',
        },
        status: 1,
      },
      {
        id: 67,
        userId: 253,
        title: '내가 최고야',
        category: '스터디',
        imageURL: [
          {
            id: 0,
            url: 'https://makers-web-img.s3.ap-northeast-2.amazonaws.com/meeting/2023/09/17/bc1d00b7-9770-4cde-ba04-69bbd5a9ae72.png',
          },
        ],
        startDate: '2023-01-13T00:00:00.000Z',
        endDate: '2099-01-01T23:59:59.999Z',
        capacity: 10,
        mStartDate: '2023-09-17T00:00:00.000Z',
        mEndDate: '9999-12-30T00:00:00.000Z',
        recentActivityDate: '2024-02-14T00:00:00.000Z',
        targetActiveGeneration: 33,
        joinableParts: ['PM', 'DESIGN', 'WEB', 'ANDROID', 'IOS', 'SERVER'],
        applicantCount: 0,
        approvedUserCount: 0,
        user: {
          id: 253,
          name: '강영우',
          orgId: 18,
          profileImage:
            'https://s3.ap-northeast-2.amazonaws.com/sopt-makers-internal//dev/image/project/377c054a-1d17-48bd-8906-e36af319eeff-thumb-1889155643_tTsRhUda_df98a7412d411689021274036b55ee934f215b47_640x640.jpg',
        },
        status: 1,
      },
      {
        id: 65,
        userId: 261,
        title: '나',
        category: '스터디',
        imageURL: [
          {
            id: 0,
            url: 'https://makers-web-img.s3.ap-northeast-2.amazonaws.com/meeting/2023/05/13/e907b6b8-015b-4685-854d-47f633c90c53.jpeg',
          },
        ],
        startDate: '2023-05-10T00:00:00.000Z',
        endDate: '3013-05-10T23:59:59.999Z',
        capacity: 1234567890,
        mStartDate: '2034-05-15T00:00:00.000Z',
        mEndDate: '1997-08-14T00:00:00.000Z',
        recentActivityDate: '2024-02-14T00:00:00.000Z',
        targetActiveGeneration: 31,
        joinableParts: ['PM', 'DESIGN', 'WEB', 'ANDROID', 'IOS', 'SERVER'],
        applicantCount: 0,
        approvedUserCount: 3,
        user: {
          id: 261,
          name: '백지연',
          orgId: 28,
          profileImage:
            'https://s3.ap-northeast-2.amazonaws.com/sopt-makers-internal//prod/image/project/39f5882c-e322-425c-9f83-1194cf0aa220-톡방.png',
        },
        status: 1,
      },
      {
        id: 99,
        userId: 262,
        title: '하하',
        category: '스터디',
        imageURL: [
          {
            id: 0,
            url: 'https://makers-web-img.s3.ap-northeast-2.amazonaws.com/meeting/2023/05/13/e907b6b8-015b-4685-854d-47f633c90c53.jpeg',
          },
        ],
        startDate: '2023-05-10T00:00:00.000Z',
        endDate: '3013-05-10T23:59:59.999Z',
        capacity: 1234567890,
        mStartDate: '2034-05-15T00:00:00.000Z',
        mEndDate: '1997-08-14T00:00:00.000Z',
        recentActivityDate: '2024-02-14T00:00:00.000Z',
        targetActiveGeneration: 31,
        joinableParts: ['PM', 'DESIGN', 'WEB', 'ANDROID', 'IOS', 'SERVER'],
        applicantCount: 0,
        approvedUserCount: 3,
        user: {
          id: 299,
          name: '김현수',
          orgId: 28,
          profileImage:
            'https://s3.ap-northeast-2.amazonaws.com/sopt-makers-internal//prod/image/project/39f5882c-e322-425c-9f83-1194cf0aa220-톡방.png',
        },
        status: 1,
      },
      {
        id: 100,
        userId: 262,
        title: '하하',
        category: '스터디',
        imageURL: [
          {
            id: 0,
            url: 'https://makers-web-img.s3.ap-northeast-2.amazonaws.com/meeting/2023/05/13/e907b6b8-015b-4685-854d-47f633c90c53.jpeg',
          },
        ],
        startDate: '2023-05-10T00:00:00.000Z',
        endDate: '3013-05-10T23:59:59.999Z',
        capacity: 1234567890,
        mStartDate: '2034-05-15T00:00:00.000Z',
        mEndDate: '1997-08-14T00:00:00.000Z',
        recentActivityDate: '2024-02-14T00:00:00.000Z',
        targetActiveGeneration: 31,
        joinableParts: ['PM', 'DESIGN', 'WEB', 'ANDROID', 'IOS', 'SERVER'],
        applicantCount: 0,
        approvedUserCount: 3,
        user: {
          id: 299,
          name: '김현수',
          orgId: 28,
          profileImage:
            'https://s3.ap-northeast-2.amazonaws.com/sopt-makers-internal//prod/image/project/39f5882c-e322-425c-9f83-1194cf0aa220-톡방.png',
        },
        status: 1,
      },
      {
        id: 101,
        userId: 262,
        title: '하하',
        category: '스터디',
        imageURL: [
          {
            id: 0,
            url: 'https://makers-web-img.s3.ap-northeast-2.amazonaws.com/meeting/2023/05/13/e907b6b8-015b-4685-854d-47f633c90c53.jpeg',
          },
        ],
        startDate: '2023-05-10T00:00:00.000Z',
        endDate: '3013-05-10T23:59:59.999Z',
        capacity: 1234567890,
        mStartDate: '2034-05-15T00:00:00.000Z',
        mEndDate: '1997-08-14T00:00:00.000Z',
        recentActivityDate: '2024-02-14T00:00:00.000Z',
        targetActiveGeneration: 31,
        joinableParts: ['PM', 'DESIGN', 'WEB', 'ANDROID', 'IOS', 'SERVER'],
        applicantCount: 0,
        approvedUserCount: 3,
        user: {
          id: 299,
          name: '김현수',
          orgId: 28,
          profileImage:
            'https://s3.ap-northeast-2.amazonaws.com/sopt-makers-internal//prod/image/project/39f5882c-e322-425c-9f83-1194cf0aa220-톡방.png',
        },
        status: 1,
      },
      {
        id: 102,
        userId: 262,
        title: '하하',
        category: '스터디',
        imageURL: [
          {
            id: 0,
            url: 'https://makers-web-img.s3.ap-northeast-2.amazonaws.com/meeting/2023/05/13/e907b6b8-015b-4685-854d-47f633c90c53.jpeg',
          },
        ],
        startDate: '2023-05-10T00:00:00.000Z',
        endDate: '3013-05-10T23:59:59.999Z',
        capacity: 1234567890,
        mStartDate: '2034-05-15T00:00:00.000Z',
        mEndDate: '1997-08-14T00:00:00.000Z',
        recentActivityDate: '2024-02-14T00:00:00.000Z',
        targetActiveGeneration: 31,
        joinableParts: ['PM', 'DESIGN', 'WEB', 'ANDROID', 'IOS', 'SERVER'],
        applicantCount: 0,
        approvedUserCount: 3,
        user: {
          id: 299,
          name: '김현수',
          orgId: 28,
          profileImage:
            'https://s3.ap-northeast-2.amazonaws.com/sopt-makers-internal//prod/image/project/39f5882c-e322-425c-9f83-1194cf0aa220-톡방.png',
        },
        status: 1,
      },
    ],
  },
};
