import { putPost } from '@api/post';
import { useGetPostDetailQuery } from '@api/post/hooks';
import PostQueryKey from '@api/post/PostQueryKey';
import { useUserProfileQuery } from '@api/user/hooks';
import ConfirmModal from '@components/modal/ConfirmModal';
import ModalContainer, { ModalContainerProps } from '@components/modal/ModalContainer';
import { THUMBNAIL_IMAGE_INDEX } from '@constants/index';
import { zodResolver } from '@hookform/resolvers/zod';
import useModal from '@hooks/useModal';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import dynamic from 'next/dynamic';
import { useEffect } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { styled } from 'stitches.config';
import FeedFormPresentation from './FeedFormPresentation';
import { FormEditType, feedEditSchema } from './feedSchema';

const DevTool = dynamic(() => import('@hookform/devtools').then(module => module.DevTool), {
  ssr: false,
});

interface EditModal extends ModalContainerProps {
  postId: number;
}

function FeedEditModal({ isModalOpened, postId, handleModalClose }: EditModal) {
  const queryClient = useQueryClient();
  const { data: postData } = useGetPostDetailQuery(String(postId));
  const exitModal = useModal();
  const submitModal = useModal();
  const { data: me } = useUserProfileQuery();

  const formMethods = useForm<FormEditType>({
    mode: 'onChange',
    resolver: zodResolver(feedEditSchema),
  });

  const { isValid } = formMethods.formState;

  const { mutateAsync: mutateEditFeed, isPending: isSubmitting } = useMutation({
    mutationFn: (formData: FormEditType) => putPost(postId, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PostQueryKey.detail(postId) });
      queryClient.invalidateQueries({ queryKey: PostQueryKey.all() });
      alert('피드를 수정했습니다.');
      submitModal.handleModalClose();
      handleModalClose();
    },
    onError: () => alert('피드를 수정하지 못했습니다.'),
  });

  const handleDeleteImage = (index: number) => {
    const images = formMethods.getValues().images.slice();
    images.splice(index, 1);
    formMethods.setValue('images', images);
  };

  const handleSubmitClick: SubmitHandler<FormEditType> = () => {
    submitModal.handleModalOpen();
  };

  const onSubmit = async () => {
    await mutateEditFeed(formMethods.getValues());
  };

  //고치기
  useEffect(() => {
    if (!postData) return;
    formMethods.reset({
      title: postData.title,
      contents: postData.contents,
      images: postData.images || [],
    });
  }, [formMethods, isModalOpened, postData]);

  return (
    <ModalContainer isModalOpened={isModalOpened} handleModalClose={exitModal.handleModalOpen}>
      <SDialogWrapper>
        <FormProvider {...formMethods}>
          <FeedFormPresentation
            userId={Number(me?.orgId)}
            groupInfo={{
              title: postData?.meeting?.title || '',
              imageUrl: postData?.meeting?.imageURL[THUMBNAIL_IMAGE_INDEX]?.url || '',
              category: postData?.meeting?.category || '',
            }}
            title="피드 수정"
            handleDeleteImage={handleDeleteImage}
            handleModalClose={handleModalClose}
            onSubmit={formMethods.handleSubmit(handleSubmitClick)}
            disabled={isSubmitting || !isValid}
          />
        </FormProvider>
      </SDialogWrapper>
      <ConfirmModal
        isModalOpened={exitModal.isModalOpened}
        message={`수정을 취소하시겠습니까?`}
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
        message="게시글을 수정하시겠습니까?"
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

export default FeedEditModal;

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
  overflow: 'visible',
  '&::-webkit-scrollbar': {
    display: 'none',
  },
  '@media (max-width: 768px)': {
    width: '100%',
    height: '100%',
    boxShadow: 'none',
    borderRadius: '0',
  },
});
