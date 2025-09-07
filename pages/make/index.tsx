import { ampli } from '@/ampli';
import { usePostMeetingMutation } from '@api/meeting/mutation';
import PlusIcon from '@assets/svg/plus.svg';
import { zodResolver } from '@hookform/resolvers/zod';
import Presentation from '@shared/form/Presentation';
import TableOfContents from '@shared/form/TableOfContents';
import { colors } from '@sopt-makers/colors';
import { fontsObject } from '@sopt-makers/fonts';
import { FormType, schema } from '@type/form';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { styled } from 'stitches.config';

const DevTool = dynamic(() => import('@hookform/devtools').then(module => module.DevTool), {
  ssr: false,
});

const MakePage = () => {
  const router = useRouter();
  const formMethods = useForm<FormType>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: zodResolver(schema),
    defaultValues: {
      detail: {
        coLeader: [],
      },
    },
  });
  const { isValid, errors, isDirty } = formMethods.formState;
  const { mutate: mutateCreateMeeting, isPending: isSubmitting } = usePostMeetingMutation();

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
    mutateCreateMeeting(formData, {
      onSuccess: data => {
        ampli.completedMakeGroup();
        alert('모임을 개설했습니다.');
        router.push(`/detail?id=${data.meetingId}`);
      },
    });
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
            disabled={isSubmitting || !isValid || Object.keys(errors).length > 0 || !isDirty}
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

  '@media (max-width: 768px)': {
    margin: 0,
  },
});
const SFormContainer = styled('div', {
  width: '100%',
  padding: '36px 40px 56px',
  borderRadius: '15px',

  '@media (max-width: 768px)': {
    padding: '40px 0 0 0',
    background: '$gray950',
  },
});
const SFormName = styled('h1', {
  fontAg: '24_bold_100',
  color: '$gray10',
  marginBottom: '20px',

  '@media (max-width: 768px)': {
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
