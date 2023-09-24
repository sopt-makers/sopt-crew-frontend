import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { styled } from 'stitches.config';
import { zodResolver } from '@hookform/resolvers/zod';
import dynamic from 'next/dynamic';
import { Box } from '@components/box/Box';
import ModalContainer, { ModalContainerProps } from '@components/modal/ModalContainer';
import FeedFormPresentation from './FeedFormPresentation';
import { FormType, schema } from './schema';
import ConfirmModal from '@components/modal/ConfirmModal';
import { useMutation } from '@tanstack/react-query';
import { createPost } from '@api/post';
import { useQueryGetMeeting } from '@api/meeting/hooks';
import { useRouter } from 'next/router';
import useModal from '@hooks/useModal';
import { useEffect } from 'react';

const DevTool = dynamic(() => import('@hookform/devtools').then(module => module.DevTool), {
  ssr: false,
});

function FeedCreateModal({ isModalOpened, handleModalClose }: ModalContainerProps) {
  const router = useRouter();
  const id = router.query.id as string;
  const { data: detailData } = useQueryGetMeeting({ params: { id } });
  const exitModal = useModal();
  const submitModal = useModal();

  const formMethods = useForm<FormType>({
    mode: 'onChange',
    resolver: zodResolver(schema),
  });

  const { isValid } = formMethods.formState;

  const { mutateAsync: mutateCreateFeed, isLoading: isSubmitting } = useMutation({
    mutationFn: (formData: FormType) => createPost(formData),
    onError: () => alert('피드를 개설하지 못했습니다.'),
  });

  const handleDeleteImage = (index: number) => {
    const images = formMethods.getValues().images.slice();
    images.splice(index, 1);
    formMethods.setValue('images', images);
  };

  const handleSubmitClick: SubmitHandler<FormType> = () => {
    submitModal.handleModalOpen();
  };

  const onSubmit = async () => {
    const createFeedParameter = { ...formMethods.getValues(), meetingId: Number(id) };
    await mutateCreateFeed(createFeedParameter, {
      onSuccess: () => {
        alert('피드를 작성했습니다.');
        submitModal.handleModalClose();
        handleModalClose();
      },
    });
  };

  useEffect(() => {
    formMethods.reset();
  }, [isModalOpened]);

  return (
    <ModalContainer isModalOpened={isModalOpened} handleModalClose={exitModal.handleModalOpen}>
      <SDialogWrapper>
        <FormProvider {...formMethods}>
          <FeedFormPresentation
            groupInfo={{
              title: detailData?.title || '',
              imageUrl: detailData?.imageURL[0].url || '',
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

const SDialogWrapper = styled(Box, {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  zIndex: '$2',
  borderRadius: '20px',
  backgroundColor: '$black60',
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
    height: '100vh',
    boxShadow: 'none',
    borderRadius: '0',
  },
});
