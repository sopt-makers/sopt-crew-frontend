import LocalStorage from '@/store/localStorage/LocalStorage';
import LocalStorageKey from '@/store/localStorage/LocalStorageKey';
import { useDialog } from '@sopt-makers/ui';
import { FormType } from '@type/form';
import dayjs from '@util/dayjs';
import { useCallback, useEffect, useState } from 'react';

const formatDateTime = (dateTime: number) => {
  return dayjs(dateTime).format('YYYY년 M월 D일 HH시 mm분');
};

const useDraftCreateMeeting = () => {
  const { open: openDialog, close: closeDialog } = useDialog();
  const [draftFormValues, setDraftFormValues] = useState<FormType | null>(null);
  const removeDraftCreateMeeting = useCallback(() => {
    LocalStorage.removeItem(LocalStorageKey.DraftCreateMeeting);
    setDraftFormValues(null);
  }, []);

  useEffect(() => {
    const draftCreateMeeting = LocalStorage.getItem(LocalStorageKey.DraftCreateMeeting);
    if (draftCreateMeeting) {
      const { dateTime, formValues } = draftCreateMeeting;
      openDialog({
        title: '작성 중인 글이 있어요.',
        description: `${formatDateTime(dateTime)}에 작성 중인 글이 있어요. 새로 작성하면 임시 저장된 글은 사라집니다.`,
        type: 'default',
        typeOptions: {
          cancelButtonText: '새로 쓰기',
          approveButtonText: '이어서 쓰기',
          onCancel: () => {
            removeDraftCreateMeeting();
            closeDialog();
          },
          onApprove: () => {
            setDraftFormValues(formValues);
            closeDialog();
          },
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { draftFormValues, removeDraftCreateMeeting };
};

export default useDraftCreateMeeting;
