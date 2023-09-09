import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { FormType, schema } from '@type/form';
import { styled } from 'stitches.config';
import { zodResolver } from '@hookform/resolvers/zod';
import { createMeeting } from '@api/meeting';
import { useRouter } from 'next/router';
import PlusIcon from '@assets/svg/plus.svg';
import { useMutation } from '@tanstack/react-query';
import dynamic from 'next/dynamic';
import FeedFormPresentation from '@components/form/Presentation/FeedFormPresentation';
import { Box } from '@components/box/Box';
import { ModalContainerProps } from '@components/modal/ModalContainer';
import CancelIcon from '@assets/svg/x.svg';
import { getResizedImage } from '@utils/image';
import { Divider } from '@components/util/Divider';

const DevTool = dynamic(() => import('@hookform/devtools').then(module => module.DevTool), {
  ssr: false,
});

type ModalContentProps = Pick<ModalContainerProps, 'handleModalClose'>;

function FeedCreate({ handleModalClose }: ModalContentProps) {
  const router = useRouter();
  const formMethods = useForm<FormType>({
    mode: 'onChange',
    resolver: zodResolver(schema),
  });

  const { isValid } = formMethods.formState;

  const { mutateAsync: mutateCreateMeeting, isLoading: isSubmitting } = useMutation({
    mutationFn: (formData: FormType) => createMeeting(formData),
    onError: () => alert('모임을 개설하지 못했습니다.'),
  });

  const handleChangeImage = (index: number, url: string) => {
    const files = formMethods.getValues().files.slice();
    files.splice(index, 1, url);
    formMethods.setValue('files', files);
  };

  const handleDeleteImage = (index: number) => {
    const files = formMethods.getValues().files.slice();
    files.splice(index, 1);
    formMethods.setValue('files', files);
  };

  const onSubmit: SubmitHandler<FormType> = async formData => {
    const {
      data: { meetingId },
    } = await mutateCreateMeeting(formData);
    alert('모임을 개설했습니다.');
    router.push(`/detail?id=${meetingId}`);
  };

  return (
    <>
      <SDialogWrapper>
        <FormProvider {...formMethods}>
          <SContainer>
            <SFormContainer>
              <SFormHeader>
                <CancelIcon />
                <SFormName>피드 작성</SFormName>
                <SSubmitButton>완료</SSubmitButton>
              </SFormHeader>
              <SGroupInfoSection>
                <SThumbnailImage
                  css={{
                    backgroundImage: `url(${getResizedImage(
                      'https://wsrv.nl/?url=https%3A%2F%2Fmakers-web-img.s3.ap-northeast-2.amazonaws.com%2Fmeeting%2F2023%2F09%2F01%2F0896ca6c-9bc6-40c1-9e33-2130058522ff.jpeg&w=760&output=webp',
                      168
                    )})`,
                  }}
                />
                <SCategory>카테고리</SCategory>
                <STitle>제목</STitle>
              </SGroupInfoSection>
              <SDivider />
              <SFormWrapper>
                {/* <FeedFormPresentation
                  submitButtonLabel={
                    <>
                      <PlusIcon />
                      모임 개설하기
                    </>
                  }
                  handleChangeImage={handleChangeImage}
                  handleDeleteImage={handleDeleteImage}
                  onSubmit={formMethods.handleSubmit(onSubmit)}
                  disabled={isSubmitting || !isValid}
                /> */}
              </SFormWrapper>
            </SFormContainer>
          </SContainer>
        </FormProvider>
      </SDialogWrapper>
      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
      {/* @ts-ignore */}
      <DevTool control={formMethods.control} />
    </>
  );
}

export default FeedCreate;
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
    width: 'calc(100% - 40px)',
  },
});

const SContainer = styled('div', {
  display: 'flex',
  gap: '30px',

  '@tablet': {
    margin: 0,
  },
});
const SFormContainer = styled('div', {
  width: '100%',
  padding: '40px 30px 30px',
  background: '$black80',
  borderRadius: '15px',

  '@tablet': {
    padding: '40px 0 0 0',
    background: '$black100',
  },
});
const SFormName = styled('h1', {
  fontStyle: 'H1',
  color: '$white100',

  '@tablet': {
    margin: 0,
    borderBottom: '1px solid $black60',
  },
});
const SFormWrapper = styled('div', {
  '@tablet': {
    paddingTop: '40px',
  },
});

const SFormHeader = styled(Box, {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

const SSubmitButton = styled('button', {
  fontStyle: 'T1',
  color: '$purple100',
});

const SGroupInfoSection = styled(Box, {
  mt: '$40',
  flexType: 'verticalCenter',
});

const SThumbnailImage = styled('div', {
  width: '56px',
  height: '56px',
  borderRadius: '$6',
  overflow: 'hidden',
  backgroundColor: '$black80',
  backgroundSize: 'cover',
  backgroundPosition: 'center center',
  backgroundRepeat: 'no-repeat',
});

const SCategory = styled('p', {
  color: '$gray80',
  fontStyle: 'T3',
  ml: '$20',
});

const STitle = styled('p', {
  color: '$white',
  fontStyle: 'T3',
  ml: '$8',
});

const SDivider = styled(Divider, {
  my: '$24',
  backgroundColor: '$black40',
});
