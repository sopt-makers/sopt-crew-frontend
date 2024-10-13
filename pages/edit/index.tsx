import Presentation from '@components/form/Presentation';
import TableOfContents from '@components/form/TableOfContents';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { getMeeting, updateMeeting } from '@api/API_LEGACY/meeting';
import { FormType, schema } from '@type/form';
import { styled } from 'stitches.config';
import dayjs from 'dayjs';
import Loader from '@components/loader/Loader';
import CheckIcon from '@assets/svg/check.svg';
import dynamic from 'next/dynamic';
import { parts } from '@data/options';
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
            [...formData!.joinableParts.map(partString => parts.find(part => part.value === partString))];

      formMethods.reset({
        ...formData,
        files: formData?.imageURL.map(image => image.url),
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
