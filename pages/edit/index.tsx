import Presentation from '@components/form/Presentation';
import TableOfContents from '@components/form/TableOfContents';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import getExtensionFromUrl from '@utils/getExtensionFromUrl';
import urlToFile from '@utils/urlToFile';
import { useRouter } from 'next/router';
import { useEffect, useMemo } from 'react';
import { FormProvider, SubmitHandler, useForm, useWatch } from 'react-hook-form';
import { getMeeting, updateMeeting } from 'src/api/meeting';
import { FormType, schema } from 'src/types/form';
import { styled } from 'stitches.config';
import dayjs from 'dayjs';
import Loader from '@components/loader/Loader';
import CheckIcon from 'public/assets/svg/check.svg';
import dynamic from 'next/dynamic';
const DevTool = dynamic(() => import('@hookform/devtools').then(module => module.DevTool), {
  ssr: false,
});

const EditPage = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const id = router.query.id as string;

  const query = useQuery({
    queryKey: ['meeting', id],
    queryFn: () => getMeeting(id),
    enabled: !!id,
  });
  const { data: formData } = query;

  const { mutateAsync, isLoading: isSubmitting } = useMutation({
    mutationFn: ({ id, formData }: { id: string; formData: FormType }) => updateMeeting(id, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['meeting', id] });
    },
  });

  const formMethods = useForm<FormType>({
    mode: 'onChange',
    resolver: zodResolver(schema),
  });
  const files = useWatch({
    control: formMethods.control,
    name: 'files',
  }) as File[] | undefined;
  const imagesFromFiles = useMemo(() => {
    return files ? files.map(file => URL.createObjectURL(file)) : [];
  }, [files]);

  const onSubmit: SubmitHandler<FormType> = async formData => {
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

  // NOTE: formData를 불러와 데이터가 존재하면 RHF의 값을 채워준다.
  useEffect(() => {
    if (!formData) {
      return;
    }
    async function fillForm() {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const filePromises = formData!.imageURL.map(async ({ url }, index) => {
        return urlToFile(url, `image-${index}.${getExtensionFromUrl(url)}`);
      });
      const files = await Promise.all(filePromises);

      formMethods.reset({
        ...formData,
        startDate: dayjs(formData?.startDate).format('YYYY.MM.DD'),
        endDate: dayjs(formData?.endDate).format('YYYY.MM.DD'),
        category: { label: formData?.category, value: formData?.category },
        files,
        // TODO: 불필요한 재정의 피할 수 있도록 API server 랑 싱크 맞추는 거 필요할 듯
        detail: {
          desc: formData?.desc,
          processDesc: formData?.processDesc,
          mStartDate: dayjs(formData?.mStartDate).format('YYYY.MM.DD'),
          mEndDate: dayjs(formData?.mEndDate).format('YYYY.MM.DD'),
          leaderDesc: formData?.leaderDesc,
          isMentorNeeded: formData?.isMentorNeeded,
          targetDesc: formData?.targetDesc,
          note: formData?.note ?? '',
        },
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
          <SFormName>모임 수정하기</SFormName>
          <SFormWrapper>
            <Presentation
              submitButtonLabel={
                <>
                  <CheckIcon />
                  모임 수정하기
                </>
              }
              cancelButtonLabel="수정 취소하기"
              imageUrls={imagesFromFiles}
              handleChangeImage={handleChangeImage}
              handleDeleteImage={handleDeleteImage}
              onSubmit={formMethods.handleSubmit(onSubmit)}
              disabled={isSubmitting}
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
