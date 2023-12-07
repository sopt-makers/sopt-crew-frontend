import { ampli } from '@/ampli';
import { createPost } from '@api/post';
import { useQueryMyProfile } from '@api/user/hooks';
import ConfirmModal from '@components/modal/ConfirmModal';
import ModalContainer, { ModalContainerProps } from '@components/modal/ModalContainer';
import { zodResolver } from '@hookform/resolvers/zod';
import useModal from '@hooks/useModal';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { formatDate } from '@utils/dayjs';
import dynamic from 'next/dynamic';
import { useEffect } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { styled } from 'stitches.config';
import FeedFormPresentation, { GroupInfo } from './FeedFormPresentation';
import { FormCreateType, feedCreateSchema } from './feedSchema';

const DevTool = dynamic(() => import('@hookform/devtools').then(module => module.DevTool), {
  ssr: false,
});

interface CreateModalProps extends ModalContainerProps {
  meetingId: string;
}
const mockAttendGroupsInfo: GroupInfo[] = [
  {
    id: 63,
    title: '모임 이름',
    imageUrl:
      'https://makers-web-img.s3.ap-northeast-2.amazonaws.com/meeting/2023/04/18/94cf107b-4ba4-4a4d-962a-b4351c95ab93.png',
    category: '카테고리',
    contents: '모임 소개',
  },
  {
    id: 2,
    title: '모임 이름2',
    imageUrl:
      'https://makers-web-img.s3.ap-northeast-2.amazonaws.com/meeting/2023/04/18/94cf107b-4ba4-4a4d-962a-b4351c95ab93.png',
    category: '카테고리',
    contents: '모임 소개',
  },
  {
    id: 3,
    title: '모임 이름3',
    imageUrl:
      'https://makers-web-img.s3.ap-northeast-2.amazonaws.com/meeting/2023/04/18/94cf107b-4ba4-4a4d-962a-b4351c95ab93.png',
    category: '카테고리',
    contents: '모임 소개',
  },
  {
    id: 4,
    title: '모임 이름4',
    imageUrl:
      'https://makers-web-img.s3.ap-northeast-2.amazonaws.com/meeting/2023/04/18/94cf107b-4ba4-4a4d-962a-b4351c95ab93.png',
    category: '카테고리',
    contents: '모임 소개',
  },
  {
    id: 5,
    title: '모임 이름5',
    imageUrl:
      'https://makers-web-img.s3.ap-northeast-2.amazonaws.com/meeting/2023/04/18/94cf107b-4ba4-4a4d-962a-b4351c95ab93.png',
    category: '카테고리',
    contents: '모임 소개',
  },
];

function FeedCreateWithSelectMeetingModal({ isModalOpened, handleModalClose }: CreateModalProps) {
  const queryClient = useQueryClient();
  const { data: me } = useQueryMyProfile();
  const exitModal = useModal();
  const submitModal = useModal();
  const platform = window.innerWidth > 768 ? 'PC' : 'MO';

  const formMethods = useForm<FormCreateType>({
    mode: 'onChange',
    resolver: zodResolver(feedCreateSchema),
  });

  const { isValid } = formMethods.formState;

  const { mutateAsync: mutateCreateFeed, isLoading: isSubmitting } = useMutation({
    mutationFn: (formData: FormCreateType) => createPost(formData),
    onSuccess: () => {
      queryClient.invalidateQueries(['getPosts']);
      alert('피드를 작성했습니다.');
      submitModal.handleModalClose();
      handleModalClose();
    },
    onError: () => alert('피드 작성에 실패했습니다.'),
  });

  const handleDeleteImage = (index: number) => {
    const images = formMethods.getValues().images.slice();
    images.splice(index, 1);
    formMethods.setValue('images', images);
  };

  const handleSubmitClick: SubmitHandler<FormCreateType> = () => {
    submitModal.handleModalOpen();
  };

  const onSubmit = async () => {
    const createFeedParameter = { ...formMethods.getValues() };
    await mutateCreateFeed(createFeedParameter);
    ampli.completedFeedPosting({ user_id: Number(me?.orgId), platform_type: platform, feed_upload: formatDate() });
  };

  useEffect(() => {}, [formMethods, isModalOpened]);

  useEffect(() => {
    return () => {
      ampli.completedFeedPostingCanceled({ user_id: Number(me?.orgId), platform_type: platform });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log(formMethods.formState.isValid);
  console.log(formMethods.getValues());
  return (
    <ModalContainer isModalOpened={isModalOpened} handleModalClose={exitModal.handleModalOpen}>
      <SDialogWrapper>
        <FormProvider {...formMethods}>
          <FeedFormPresentation
            userId={Number(me?.orgId)}
            attendGroupsInfo={mockAttendGroupsInfo}
            title="피드 작성"
            handleDeleteImage={handleDeleteImage}
            handleModalClose={handleModalClose}
            setMeetingInfo={meetingInfo =>
              formMethods.setValue('meetingId', meetingInfo?.id as unknown as number, {
                shouldValidate: true,
                shouldDirty: true,
                shouldTouch: true,
              })
            }
            onSubmit={formMethods.handleSubmit(handleSubmitClick)}
            disabled={isSubmitting || !isValid}
          />
        </FormProvider>
      </SDialogWrapper>
      <ConfirmModal
        isModalOpened={exitModal.isModalOpened}
        message={`피드 작성을 그만두시겠어요?\n지금까지 쓴 내용이 지워져요.`}
        handleModalClose={exitModal.handleModalClose}
        cancelButton="돌아가기"
        confirmButton="그만두기"
        handleConfirm={() => {
          exitModal.handleModalClose();
          handleModalClose();
        }}
      />
      <ConfirmModal
        isModalOpened={submitModal.isModalOpened}
        message="게시글을 작성하시겠습니까?"
        handleModalClose={submitModal.handleModalClose}
        cancelButton="돌아가기"
        confirmButton="확인"
        handleConfirm={onSubmit}
      />
      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
      {/* @ts-ignore */}
      <DevTool control={formMethods.control} />
    </ModalContainer>
  );
}

export default FeedCreateWithSelectMeetingModal;

const SDialogWrapper = styled('div', {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  zIndex: '$2',
  borderRadius: '20px',
  backgroundColor: '$gray700',
  width: '100%',
  maxWidth: '$768',
  boxShadow: '0px 4px 4px rgba(0,0,0,0.25)',
  maxHeight: '100vh',
  overflow: 'auto scroll',
  '&::-webkit-scrollbar': {
    display: 'none',
  },
  '@tablet': {
    width: '100%',
    height: '100%',
    boxShadow: 'none',
    borderRadius: '0',
  },
});
