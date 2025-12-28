import { usePutMeetingMutation } from '@api/meeting/mutation';
import { useMeetingQueryOption } from '@api/meeting/query';
import Loader from '@common/loader/Loader';
import { parts } from '@data/options';
import { zodResolver } from '@hookform/resolvers/zod';
import Presentation from '@shared/form/Presentation';
import TableOfContents from '@shared/form/TableOfContents';
import { colors } from '@sopt-makers/colors';
import { fontsObject } from '@sopt-makers/fonts';
import { useQuery } from '@tanstack/react-query';
import { FormType, schema } from '@type/form';
import { formatCalendarDate } from '@util/dayjs';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { styled } from 'stitches.config';

const DevTool = dynamic(() => import('@hookform/devtools').then(module => module.DevTool), {
  ssr: false,
});

const EditPage = () => {
  const router = useRouter();
  const id = router.query.id as string;

  const { data: formData } = useQuery(useMeetingQueryOption({ meetingId: Number(id) }));
  const { mutateAsync, isPending: isSubmitting } = usePutMeetingMutation(Number(id));

  const formMethods = useForm<FormType>({
    mode: 'onChange',
    resolver: zodResolver(schema),
    defaultValues: {
      detail: {
        coLeader: [],
      },
    },
  });
  const { isValid, errors, isDirty } = formMethods.formState;

  const onSubmit: SubmitHandler<FormType> = async formData => {
    try {
      await mutateAsync(formData);
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

  const handleSubmit = formMethods.handleSubmit(onSubmit);

  //고치기
  // NOTE: formData를 불러와 데이터가 존재하면 RHF의 값을 채워준다.
  useEffect(() => {
    if (!formData) {
      return;
    }
    async function fillForm() {
      const joinableParts =
        // NOTE: null(디폴트), all(전체) 옵션을 제외한 나머지 옵션 개수와 서버에서 내려온 개수가 같으면 '전체' 옵션이 선택된 것 처럼 여겨져야 한다.
        // NOTE: 그게 아니라면, 서버에서 저장된 옵션에 더해 null(디폴트) 옵션을 추가해준다.
        parts.length - 1 === formData?.joinableParts.length
          ? parts
          : // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            [...formData!.joinableParts.map(partString => parts.find(part => part.value === partString))];

      formMethods.reset({
        ...formData,
        files: formData?.imageURL.map(image => image.url),
        dateRange: [formatCalendarDate(formData?.startDate), formatCalendarDate(formData?.endDate)],
        category: { label: formData?.category, value: formData?.category },
        // TODO: 불필요한 재정의 피할 수 있도록 API server 랑 싱크 맞추는 거 필요할 듯
        detail: {
          desc: formData?.desc,
          leaderDesc: formData?.leaderDesc,
          isMentorNeeded: formData?.isMentorNeeded,
          joinableParts,
          canJoinOnlyActiveGeneration: formData?.canJoinOnlyActiveGeneration,
          coLeader: formData?.coMeetingLeaders,
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
          <SFormName>모임 정보 수정</SFormName>
          <SFormCaution>모임 개설에 필요한 필수 항목이 모두 입력 되었는지 꼼꼼하게 확인해주세요!</SFormCaution>
          <Presentation
            submitButtonLabel={<>정보 수정하기</>}
            cancelButtonLabel="수정 취소하기"
            handleChangeImage={handleChangeImage}
            handleDeleteImage={handleDeleteImage}
            onSubmit={handleSubmit}
            disabled={isSubmitting || !isValid || Object.keys(errors).length > 0 || !isDirty}
          />
        </SFormContainer>
        <TableOfContents
          label="작성 항목"
          onSubmit={handleSubmit}
          cancelButtonLabel="수정 취소하기"
          submitButtonLabel="정보 수정하기"
          disabled={isSubmitting || !isValid || Object.keys(errors).length > 0 || !isDirty}
        />
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
  ...fontsObject.HEADING_2_32_B,
  color: '$gray10',
  marginBottom: '20px',

  '@media (max-width: 768px)': {
    ...fontsObject.HEADING_4_24_B,
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
