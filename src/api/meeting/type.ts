import { paths } from '@/__generated__/schema2';

export type GetMeetingList = {
  request: paths['/meeting/v2']['get']['parameters']['query'];
  response: paths['/meeting/v2']['get']['responses']['200']['content']['application/json;charset=UTF-8'];
};

export type GetMeeting = {
  request: paths['/meeting/v2/{meetingId}']['get']['parameters']['path'];
  response: paths['/meeting/v2/{meetingId}']['get']['responses']['200']['content']['application/json;charset=UTF-8'];
};

export type PostMeeting = {
  request: paths['/meeting/v2']['post']['requestBody']['content']['application/json;charset=UTF-8'];
  response: paths['/meeting/v2']['post']['responses']['201']['content']['application/json;charset=UTF-8'];
};

export type MeetingData = GetMeetingList['response']['meetings'][number];

export type GetMeetingMemberList = {
  request: paths['/meeting/v2/{meetingId}/list']['get']['parameters']['query'];
  response: paths['/meeting/v2/{meetingId}/list']['get']['responses']['200']['content']['application/json;charset=UTF-8'];
};

export type GetRecommendMeetingList = {
  request: paths['/meeting/v2/recommend']['get']['parameters']['query'];
  response: paths['/meeting/v2/recommend']['get']['responses']['200']['content']['application/json;charset=UTF-8'];
};

export type PostMeetingApplication = {
  request: paths['/meeting/v2/apply']['post']['requestBody']['content']['application/json;charset=UTF-8'];
  response: paths['/meeting/v2/apply']['post']['responses']['201']['content']['application/json;charset=UTF-8'];
};

export type UpdateMeetingApplication = {
  request: paths['/meeting/v2/{meetingId}/apply/status']['put']['requestBody']['content']['application/json;charset=UTF-8'];
  response: paths['/meeting/v2/{meetingId}/apply/status']['put']['responses']['200']['content']['application/json;charset=UTF-8'];
};

export type GetMeetingMemberCSV = {
  request: paths['/meeting/v2/{meetingId}/list/csv']['get']['parameters']['query'];
  response: paths['/meeting/v2/{meetingId}/list/csv']['get']['responses']['200']['content']['application/json;charset=UTF-8'];
};
