import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { styled } from 'stitches.config';
import { zodResolver } from '@hookform/resolvers/zod';
import dynamic from 'next/dynamic';
import { Box } from '@components/box/Box';
import ModalContainer, { ModalContainerProps } from '@components/modal/ModalContainer';
import FeedFormPresentation from './FeedFormPresentation';
import { FormType, schema } from './schema';
import { useOverlay } from '@hooks/useOverlay/Index';
import ConfirmModal from '@components/modal/ConfirmModal';
import { useMutation } from '@tanstack/react-query';
import { createPost } from '@api/post';
import { useQueryGetMeeting } from '@api/meeting/hooks';
import { useRouter } from 'next/router';

const DevTool = dynamic(() => import('@hookform/devtools').then(module => module.DevTool), {
  ssr: false,
});

interface FeedCreateModalProps extends ModalContainerProps {
  handleModalExit: () => void;
}

function FeedCreateModal({ isModalOpened, handleModalExit, handleModalClose }: FeedCreateModalProps) {
  const submitCreateFeedOverlay = useOverlay();
  const router = useRouter();
  const id = router.query.id as string;
  const { data: detailData } = useQueryGetMeeting({ params: { id } });

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

  const onSubmit: SubmitHandler<FormType> = async formData => {
    submitCreateFeedOverlay.open(({ isOpen, close }) => (
      <ConfirmModal
        isModalOpened={isOpen}
        message="게시글을 작성하시겠습니까?"
        handleModalClose={close}
        cancelButton="돌아가기"
        confirmButton="확인"
        handleConfirm={async () => {
          const createFeedParameter = { ...formData, meetingId: Number(id) };
          await mutateCreateFeed(createFeedParameter, {
            onSuccess: () => {
              alert('피드를 작성했습니다.');
              close();
              handleModalExit();
            },
          });
        }}
      />
    ));
  };

  return (
    <ModalContainer isModalOpened={isModalOpened} handleModalClose={handleModalClose}>
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
            onSubmit={formMethods.handleSubmit(onSubmit)}
            disabled={isSubmitting || !isValid}
          />
        </FormProvider>
      </SDialogWrapper>
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
