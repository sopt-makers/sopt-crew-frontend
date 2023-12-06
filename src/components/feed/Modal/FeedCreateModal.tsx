import { ampli } from '@/ampli';
import { useQueryGetMeeting } from '@api/meeting/hooks';
import { createPost } from '@api/post';
import { useQueryMyProfile } from '@api/user/hooks';
import ConfirmModal from '@components/modal/ConfirmModal';
import ModalContainer, { ModalContainerProps } from '@components/modal/ModalContainer';
import { THUMBNAIL_IMAGE_INDEX } from '@constants/index';
import { zodResolver } from '@hookform/resolvers/zod';
import useModal from '@hooks/useModal';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { formatDate } from '@utils/dayjs';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { styled } from 'stitches.config';
import FeedFormPresentation from './FeedFormPresentation';
import { FormCreateType, feedCreateSchema } from './feedSchema';

const DevTool = dynamic(() => import('@hookform/devtools').then(module => module.DevTool), {
  ssr: false,
});

interface CreateModalProps extends ModalContainerProps {
  meetingId: string;
}

function FeedCreateModal({ isModalOpened, meetingId, handleModalClose }: CreateModalProps) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { data: detailData } = useQueryGetMeeting({ params: { id: meetingId } });
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
    onError: () => alert('피드를 개설하지 못했습니다.'),
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
    ampli.completedFeedPosting({
      user_id: Number(me?.orgId),
      platform_type: platform,
      feed_upload: formatDate(),
      location: router.pathname,
    });
  };

  useEffect(() => {
    formMethods.reset({ meetingId: Number(meetingId) });
  }, [formMethods, isModalOpened]);

  useEffect(() => {
    return () => {
      ampli.completedFeedPostingCanceled({
        user_id: Number(me?.orgId),
        platform_type: platform,
        location: router.pathname,
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ModalContainer isModalOpened={isModalOpened} handleModalClose={exitModal.handleModalOpen}>
      <SDialogWrapper>
        <FormProvider {...formMethods}>
          <FeedFormPresentation
            userId={Number(me?.orgId)}
            groupInfo={{
              title: detailData?.title || '',
              imageUrl: detailData?.imageURL[THUMBNAIL_IMAGE_INDEX].url || '',
              category: detailData?.category || '',
            }}
            title="피드 작성"
            handleDeleteImage={handleDeleteImage}
            handleModalClose={handleModalClose}
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

export default FeedCreateModal;

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
