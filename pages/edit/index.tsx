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
import { parts } from 'src/data/options';
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

  const urlsToFiles = async (urls: string[]) => {
    const filePromises = urls.map((url, index) => {
      return urlToFile(url, `image-${index}.${getExtensionFromUrl(url)}`);
    });
    return await Promise.all(filePromises);
  };

  // NOTE: formData를 불러와 데이터가 존재하면 RHF의 값을 채워준다.
  useEffect(() => {
    if (!formData) {
      return;
    }
    async function fillForm() {
      const joinableParts =
        // NOTE: null(디폴트), all(전체) 옵션을 제외한 나머지 옵션 개수와 서버에서 내려온 개수가 같으면 '전체' 옵션이 선택된 것 처럼 여겨져야 한다.
        // NOTE: 그게 아니라면, 서버에서 저장된 옵션에 더해 null(디폴트) 옵션을 추가해준다.
        parts.length - 2 === formData?.joinableParts.length
          ? parts
          : // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            [parts[0], ...formData!.joinableParts.map(partString => parts.find(part => part.value === partString))];

      formMethods.reset({
        ...formData,
        startDate: dayjs(formData?.startDate).format('YYYY.MM.DD'),
        endDate: dayjs(formData?.endDate).format('YYYY.MM.DD'),
        category: { label: formData?.category, value: formData?.category },
        // TODO: 불필요한 재정의 피할 수 있도록 API server 랑 싱크 맞추는 거 필요할 듯
        detail: {
          desc: formData?.desc,
          processDesc: formData?.processDesc,
          mStartDate: dayjs(formData?.mStartDate).format('YYYY.MM.DD'),
          mEndDate: dayjs(formData?.mEndDate).format('YYYY.MM.DD'),
          leaderDesc: formData?.leaderDesc,
          isMentorNeeded: formData?.isMentorNeeded,
          joinableParts,
          canJoinOnlyActiveGeneration: formData?.canJoinOnlyActiveGeneration,
          targetDesc: formData?.targetDesc,
          note: formData?.note ?? '',
        },
      });
      // NOTE: files 필드는 다른 폼 필드를 모두 채우고 나서 채운다. 이미지 url을 파일로 변환하는 동안 빈 폼이 보이지 않도록 하기 위해서.
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const files = await urlsToFiles(formData!.imageURL.map(({ url }) => url));
      formMethods.setValue('files', files);
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
