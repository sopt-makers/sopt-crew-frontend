import { useFlashQuery } from '@api/flash/hook';
import { usePutFlashMutation } from '@api/flash/mutation';
import BungaeIcon from '@assets/svg/bungae.svg';
import Loader from '@components/@common/loader/Loader';
import FlashPresentation from '@components/form/Presentation/FlashPresentation';
import { zodResolver } from '@hookform/resolvers/zod';
import { FlashFormType, flashSchema } from '@type/form';
import { formatCalendarDate } from '@utils/dayjs';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { styled } from 'stitches.config';

const DevTool = dynamic(() => import('@hookform/devtools').then(module => module.DevTool), {
  ssr: false,
});

const FlashEditPage = () => {
  const router = useRouter();
  const id = +(router.query.id || 0);

  const { data: formData } = useFlashQuery({ meetingId: id });
  const { mutateAsync, isPending: isSubmitting } = usePutFlashMutation({ meetingId: id });

  const formMethods = useForm<FlashFormType>({
    mode: 'onChange',
    resolver: zodResolver(flashSchema),
  });

  const { isValid, errors, isDirty } = formMethods.formState;

  const onSubmit: SubmitHandler<FlashFormType> = async formData => {
    try {
      await mutateAsync({ id, formData });
      alert('모임을 수정했습니다.');
      router.push(`/detail?id=${id}`);
    } catch (error) {
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
          dateRange: [formatCalendarDate(formData?.activityStartDate), formatCalendarDate(formData?.activityEndDate)],
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
        welcomeMessageTypes: formData?.welcomeMessageTypes,
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
            <FlashPresentation
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
              disabled={isSubmitting || !isValid || Object.keys(errors).length > 0 || !isDirty}
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
