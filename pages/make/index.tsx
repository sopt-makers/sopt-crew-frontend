import Presentation from '@components/form/Presentation';
import TableOfContents from '@components/form/TableOfContents';
import { FormProvider, SubmitHandler, useForm, useWatch } from 'react-hook-form';
import { FormType, schema } from 'src/types/form';
import { styled } from 'stitches.config';
import { zodResolver } from '@hookform/resolvers/zod';
import { createMeeting } from 'src/api/meeting';
import { useMemo } from 'react';
import { useRouter } from 'next/router';
import PlusIcon from 'public/assets/svg/plus.svg';
import { useMutation } from '@tanstack/react-query';
import dynamic from 'next/dynamic';
const DevTool = dynamic(() => import('@hookform/devtools').then(module => module.DevTool), {
  ssr: false,
});

const MakePage = () => {
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

  const files = useWatch({
    control: formMethods.control,
    name: 'files',
  }) as File[] | undefined;

  const imagesFromFiles = useMemo(() => {
    return files ? files.map(file => URL.createObjectURL(file)) : [];
  }, [files]);

  const handleChangeImage = (index: number, file: File) => {
    const files = (formMethods.getValues().files as File[]).slice();
    files.splice(index, 1, file);
    formMethods.setValue('files', files);
  };

  const handleDeleteImage = (index: number) => {
    const files = (formMethods.getValues().files as File[]).slice();
    files.splice(index, 1);
    formMethods.setValue('files', files);
  };

  const onSubmit: SubmitHandler<FormType> = async formData => {
    const { data: meetingId } = await mutateCreateMeeting(formData);
    alert('모임을 개설했습니다.');
    router.push(`/detail?id=${meetingId}`);
  };

  return (
    <FormProvider {...formMethods}>
      <SContainer>
        <SFormContainer>
          <SFormName>모임 개설하기</SFormName>
          <SFormWrapper>
            <Presentation
              submitButtonLabel={
                <>
                  <PlusIcon />
                  모임 개설하기
                </>
              }
              imageUrls={imagesFromFiles}
              handleChangeImage={handleChangeImage}
              handleDeleteImage={handleDeleteImage}
              onSubmit={formMethods.handleSubmit(onSubmit)}
              disabled={isSubmitting || !isValid}
            />
          </SFormWrapper>
        </SFormContainer>
        <TableOfContents label="모임 개설" />
      </SContainer>
      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
      {/* @ts-ignore */}
      <DevTool control={formMethods.control} />
    </FormProvider>
  );
};

export default MakePage;

const SContainer = styled('div', {
  margin: '80px 0',
  display: 'flex',
  gap: '30px',

  '@mobile': {
    margin: 0,
  },
});
const SFormContainer = styled('div', {
  width: '100%',
  padding: '44px 40px 56px',
  background: '$black80',
  borderRadius: '15px',

  '@mobile': {
    padding: '40px 0 0 0',
    background: '$black100',
  },
});
const SFormName = styled('h1', {
  fontAg: '24_bold_100',
  color: '$white',
  marginBottom: '90px',

  '@mobile': {
    margin: 0,
    paddingBottom: '40px',
    borderBottom: '1px solid $black60',
  },
});
const SFormWrapper = styled('div', {
  '@mobile': {
    paddingTop: '40px',
  },
});
