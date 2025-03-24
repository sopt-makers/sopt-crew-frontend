import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { styled } from 'stitches.config';
import Loader from '@components/@common/loader/Loader';
import dynamic from 'next/dynamic';
import { useFlashByIdQuery } from '@api/flash/hook';
import { FlashFormType, flashSchema } from '@type/form';
import Presentation from '@components/form/Flash';
import BungaeIcon from '@assets/svg/bungae.svg';
import { updateFlashById } from '@api/flash';
import dayjs from 'dayjs';

const DevTool = dynamic(() => import('@hookform/devtools').then(module => module.DevTool), {
  ssr: false,
});

const FlashEditPage = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const id = +(router.query.id || 0);

  const { data: formData } = useFlashByIdQuery({ meetingId: id });
  const { mutateAsync, isLoading: isSubmitting } = useMutation({
    mutationFn: ({ id, formData }: { id: number; formData: FlashFormType }) => updateFlashById({ id, formData }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getFlash', id] });
    },
  });

  const formMethods = useForm<FlashFormType>({
    mode: 'onChange',
    resolver: zodResolver(flashSchema),
  });

  const { isValid, errors } = formMethods.formState;
  console.log(formMethods.watch());

  const onSubmit: SubmitHandler<FlashFormType> = async formData => {
    try {
      await mutateAsync({ id, formData });
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

  //고치기
  useEffect(() => {
    if (!formData) {
      return;
    }
    async function fillForm() {
      formMethods.reset({
        ...formData,
        title: formData?.title,
        desc: formData?.desc,
        timeInfo: {
          time: {
            label: formData?.flashTimingType,
            value: formData?.flashTimingType,
          },
          startDate: dayjs(formData?.activityStartDate).format('YYYY.MM.DD'),
          endDate: dayjs(formData?.activityEndDate).format('YYYY.MM.DD'),
        },
        placeInfo: {
          place: {
            label: formData?.flashPlaceType,
            value: formData?.flashPlaceType,
          },
          placeDetail: formData?.flashPlace,
        },
        capacityInfo: {
          minCapacity: formData?.minimumCapacity,
          maxCapacity: formData?.maximumCapacity,
        },
        files: formData?.imageURL.map(({ url }) => url),
        welcomeTags: formData?.welcomeMessageTypes.map(type => ({ label: type, value: type })),
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
              placeType={formData.flashPlaceType as '협의 후 결정' | '오프라인' | '온라인'}
              timeType={formData.flashTimingType as '당일' | '예정 기간 (협의 후 결정)'}
            />
          </SFormWrapper>
        </SFormContainer>
      </SContainer>
      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
      {/* @ts-ignore */}
      <DevTool control={formMethods.control} />
    </FormProvider>
  );
};

export default FlashEditPage;

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
  padding: '44px 40px 56px',
  borderRadius: '15px',

  '@media (max-width: 768px)': {
    padding: '40px 0 0 0',
    background: '$gray950',
  },
});
const SFormName = styled('h1', {
  fontAg: '24_bold_100',
  color: '$gray10',
  marginBottom: '90px',

  '@media (max-width: 768px)': {
    margin: 0,
    paddingBottom: '40px',
    borderBottom: '1px solid $gray700',
  },
});
const SFormWrapper = styled('div', {
  '@media (max-width: 768px)': {
    paddingTop: '40px',
  },
});
