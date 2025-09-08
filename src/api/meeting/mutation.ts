import MeetingQueryKey from '@api/meeting/MeetingQueryKey';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FormType } from '@type/form';
import alertErrorMessage from '@util/alertErrorMessage';
import { AxiosError } from 'axios';
import {
  deleteMeeting,
  deleteMeetingApplication,
  getMeetingMemberCSV,
  postEventApplication,
  postMeeting,
  postMeetingApplication,
  putMeeting,
  updateMeetingApplication,
} from '.';
import { serializeMeetingData } from './serialize';

export const useDeleteMeetingMutation = () => {
  return useMutation({
    mutationFn: deleteMeeting,
  });
};

export const usePostMeetingApplicationMutation = () => {
  return useMutation({
    mutationFn: postMeetingApplication,
  });
};

export const usePostMeetingMutation = () => {
  return useMutation({
    mutationFn: (formData: FormType) => postMeeting(serializeMeetingData(formData)),
    onError: () => {
      alert('모임을 개설하지 못했습니다.');
    },
  });
};

export const usePutMeetingMutation = (meetingId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData: FormType) => putMeeting(meetingId, serializeMeetingData(formData)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: MeetingQueryKey.detail(meetingId) });
    },
  });
};

export const useDeleteMeetingApplicationMutation = () => {
  return useMutation({
    mutationFn: deleteMeetingApplication,
  });
};

export const useUpdateMeetingApplicationMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateMeetingApplication,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: MeetingQueryKey.memberList(),
      });
    },
    onError: (error: unknown) => {
      if (error instanceof AxiosError) {
        alertErrorMessage(error);
      }
    },
  });
};

export const usePostEventApplicationMutation = () => {
  return useMutation({
    mutationFn: postEventApplication,
  });
};

export const useDownloadMeetingMemberCSVMutation = () => {
  return useMutation({
    mutationFn: getMeetingMemberCSV,
    onSuccess: ({ data }) => {
      const url = data.url;
      const a = document.createElement('a');
      a.href = url;
      a.download = 'groupMember.csv';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    },
  });
};
