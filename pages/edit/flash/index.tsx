import TableOfContents from '@components/form/TableOfContents';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { updateMeeting } from '@api/API_LEGACY/meeting';
import { styled } from 'stitches.config';
import dayjs from 'dayjs';
import Loader from '@components/@common/loader/Loader';
import dynamic from 'next/dynamic';
import { useFlashByIdQuery } from '@api/flash/hook';
import { FlashFormType, flashSchema } from '@type/form';
import Presentation from '@components/form/Bungae';
import BungaeIcon from '@assets/svg/bungae.svg';

const DevTool = dynamic(() => import('@hookform/devtools').then(module => module.DevTool), {
  ssr: false,
});

const EditPage = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const id = +(router.query.id || 0);

  const { data: formData } = useFlashByIdQuery({ meetingId: id });
  const { mutateAsync, isLoading: isSubmitting } = useMutation({
    // mutationFn: ({ id, formData }: { id: number; formData: FlashFormType }) => updateMeeting(id + '', formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getFlash', id] });
    },
  });

  const formMethods = useForm<FlashFormType>({
    mode: 'onChange',
    resolver: zodResolver(flashSchema),
  });

  const { isValid, errors } = formMethods.formState;

  const onSubmit: SubmitHandler<FlashFormType> = async formData => {
    try {
      // await mutateAsync({ id, formData });
      // TODO: handle success
      alert('모임을 수정했습니다.');
      router.push(`/detail?id=${id}`);
    } catch (error) {
      // TODO: handle error
      alert('모임을 수정하지 못했습니다.');
    }
  };

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

  useEffect(() => {
    if (!formData) {
      return;
    }
    async function fillForm() {
      formMethods.reset({
        ...formData,
        title: formData?.title,
        desc: formData?.desc,
        minCapacity: formData?.minimumCapacity,
        maxCapacity: formData?.maximumCapacity,
        // flashTimingType: formData?.flashTimingType,
        // activityStartDate: dayjs(formData?.activityStartDate).format('YYYY.MM.DD'),
        // activityEndDate: dayjs(formData?.activityEndDate).format('YYYY.MM.DD'),
        // flashPlaceType: formData?.flashPlaceType,
        // flashPlace: formData?.flashPlace,
        // welcomeMessageTypes: formData?.welcomeMessageTypes,
        // imageURL: formData?.imageURL,
      });
    }

    fillForm();
  }, [formMethods, formData]);

  if (!formData) {
    return <Loader />;
  }

  return (
    <FormProvider {...formMethods}>
      <SContainer>
        <SFormContainer>
          <SFormName>번쩍 수정하기</SFormName>
          <SFormWrapper>
            <Presentation
              errors={errors}
              submitButtonLabel={
                <>
                  <BungaeIcon />
                  번쩍 수정하기
                </>
              }
              cancelButtonLabel="수정 취소하기"
              handleChangeImage={handleChangeImage}
              handleDeleteImage={handleDeleteImage}
              onSubmit={formMethods.handleSubmit(onSubmit)}
              disabled={isSubmitting || !isValid}
            />
          </SFormWrapper>
        </SFormContainer>
        <TableOfContents label="모임 수정" />
      </SContainer>
      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
      {/* @ts-ignore */}
      <DevTool control={formMethods.control} />
    </FormProvider>
  );
};

export default EditPage;

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
  padding: '44px 40px 56px',
  borderRadius: '15px',

  '@tablet': {
    padding: '40px 0 0 0',
    background: '$gray950',
  },
});
const SFormName = styled('h1', {
  fontAg: '24_bold_100',
  color: '$gray10',
  marginBottom: '90px',

  '@tablet': {
    margin: 0,
    paddingBottom: '40px',
    borderBottom: '1px solid $gray700',
  },
});
const SFormWrapper = styled('div', {
  '@tablet': {
    paddingTop: '40px',
  },
});
