import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { styled } from 'stitches.config';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { Box } from '@components/box/Box';
import ModalContainer, { ModalContainerProps } from '@components/modal/ModalContainer';
import FeedFormPresentation from './FeedFormPresentation';
import { FormType, schema } from './schema';
import { useOverlay } from '@hooks/useOverlay/Index';
import ConfirmModal from '@components/modal/ConfirmModal';

const DevTool = dynamic(() => import('@hookform/devtools').then(module => module.DevTool), {
  ssr: false,
});

function FeedCreateModal({ isModalOpened, handleModalClose }: ModalContainerProps) {
  const router = useRouter();

  const submitCreateFeedOverlay = useOverlay();

  const formMethods = useForm<FormType>({
    mode: 'onChange',
    resolver: zodResolver(schema),
  });

  const { isValid } = formMethods.formState;
  console.log(isValid);
  // const { mutateAsync: mutateCreateMeeting, isLoading: isSubmitting } = useMutation({
  //   mutationFn: (formData: FormType) => createMeeting(formData),
  //   onError: () => alert('피드를 개설하지 못했습니다.'),
  // });

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
        handleConfirm={() => {
          //TODO: 개설 api
          close();
        }}
      />
    ));
    // const {
    //   data: { meetingId },
    // } = await mutateCreateMeeting(formData);
    // alert('모임을 개설했습니다.');
    // router.push(`/detail?id=${meetingId}`);
  };

  return (
    <ModalContainer isModalOpened={isModalOpened} handleModalClose={handleModalClose}>
      <SDialogWrapper>
        <FormProvider {...formMethods}>
          <FeedFormPresentation
            groupInfo={{
              title: '대충 모임 이름',
              imageUrl:
                'https://wsrv.nl/?url=https%3A%2F%2Fmakers-web-img.s3.ap-northeast-2.amazonaws.com%2Fmeeting%2F2023%2F09%2F01%2F0896ca6c-9bc6-40c1-9e33-2130058522ff.jpeg&w=760&output=webp',
              category: '스터디',
            }}
            title="피드 작성"
            handleDeleteImage={handleDeleteImage}
            handleModalClose={handleModalClose}
            onSubmit={formMethods.handleSubmit(onSubmit)}
            disabled={
              // isSubmitting ||
              !isValid
            }
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
  '@tablet': {
    width: '100%',
  },
});
