import Presentation from '@components/Form/Presentation';
import TableOfContents from '@components/Form/TableOfContents';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { getGroupById, updateGroup } from 'src/api/group';
import { FormType, schema } from 'src/types/form';
import { styled } from 'stitches.config';

const EditPage = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const id = router.query.id as string;

  const query = useQuery({
    queryKey: ['group', id],
    queryFn: () => getGroupById(id),
    enabled: !!id,
  });
  const formData = query.data?.data;

  const { mutateAsync } = useMutation({
    mutationFn: ({ id, formData }: { id: string; formData: FormType }) =>
      updateGroup(id, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['group', id] });
    },
  });

  const methods = useForm<FormType>({
    mode: 'onChange',
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormType> = async formData => {
    try {
      await mutateAsync({ id, formData });

      // TODO: handle success
      alert('모임을 수정했습니다.');
    } catch (error) {
      // TODO: handle error
      alert('모임을 수정하지 못했습니다.');
    }
  };

  // NOTE: formData를 불러와 데이터가 존재하면 RHF의 값을 채워준다.
  useEffect(() => {
    methods.reset({
      ...formData,
      category: { label: formData?.category, value: formData?.category },
      // TODO: 불필요한 재정의 피할 수 있도록 API server 랑 싱크 맞추는 거 필요할 듯
      detail: {
        desc: formData?.desc,
        processDesc: formData?.processDesc,
        mStartDate: formData?.mStartDate,
        mEndDate: formData?.mEndDate,
        leaderDesc: formData?.leaderDesc,
        targetDesc: formData?.targetDesc,
        note: formData?.note ?? '',
      },
    });
  }, [methods, formData]);

  // TODO: add loading UI
  if (!formData) {
    return <div>loading...</div>;
  }

  return (
    <FormProvider {...methods}>
      <SContainer>
        <SFormContainer>
          <SFormName>모임 수정하기</SFormName>
          <Presentation
            onSubmit={methods.handleSubmit(onSubmit)}
            submitButtonLabel="수정 완료하기"
            cancelButtonLabel="수정 취소하기"
          />
        </SFormContainer>
        <TableOfContents label="모임 수정" />
      </SContainer>
    </FormProvider>
  );
};

export default EditPage;

const SContainer = styled('div', {
  margin: '80px 0',
  display: 'flex',
  gap: '30px',
});
const SFormContainer = styled('div', {
  width: '100%',
  padding: '44px 40px 56px',
  background: '$black80',
  borderRadius: '15px',
});
const SFormName = styled('h1', {
  fontAg: '24_bold_100',
  color: '$white',
  marginBottom: '90px',
});
