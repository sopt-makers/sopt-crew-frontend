import Presentation from '@components/form/Presentation';
import TableOfContents from '@components/form/TableOfContents';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { FormType, schema } from '@type/form';
import { styled } from 'stitches.config';
import { zodResolver } from '@hookform/resolvers/zod';
import { createMeeting } from '@api/API_LEGACY/meeting';
import { useRouter } from 'next/router';
import PlusIcon from '@assets/svg/plus.svg';
import { useMutation } from '@tanstack/react-query';
import dynamic from 'next/dynamic';
import { ampli } from '@/ampli';
import { fontsObject } from '@sopt-makers/fonts';
import { colors } from '@sopt-makers/colors';

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
    const { meetingId } = await mutateCreateMeeting(formData);
    ampli.completedMakeGroup();
    alert('모임을 개설했습니다.');
    router.push(`/detail?id=${meetingId}`);
  };

  return (
    <FormProvider {...formMethods}>
      <SContainer>
        <SFormContainer>
          <SFormName>모임 개설하기</SFormName>
          <SFormCaution>모임 개설에 필요한 필수 항목이 모두 입력 되었는지 꼼꼼하게 확인해주세요!</SFormCaution>
          <Presentation
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
          />
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

  '@tablet': {
    margin: 0,
  },
});
const SFormContainer = styled('div', {
  width: '100%',
  padding: '36px 40px 56px',
  borderRadius: '15px',

  '@tablet': {
    padding: '40px 0 0 0',
    background: '$gray950',
  },
});
const SFormName = styled('h1', {
  fontAg: '24_bold_100',
  color: '$gray10',
  marginBottom: '20px',

  '@tablet': {
    margin: 0,
    paddingBottom: '40px',
    borderBottom: '1px solid $gray700',
  },
});

const SFormCaution = styled('div', {
  ...fontsObject.BODY_4_13_M,
  padding: '14px 18px',
  marginBottom: '60px',
  borderRadius: '10px',
  border: `1px solid ${colors.blue600}`,
  background: 'var(--blue-alpha-100, rgba(52, 111, 250, 0.10))',
});
