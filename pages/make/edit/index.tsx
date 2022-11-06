import Presentation from '@components/Form/Presentation';
import TableOfContents from '@components/Form/TableOfContents';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { FormType, schema } from 'src/types/form';
import { styled } from 'stitches.config';

const EditPage = () => {
  // TODO: query param으로 부터 id를 가져와서 해당 id에 맞는 폼을 채워넣어야 함
  // TODO: integrate API and fill default values
  const methods = useForm<FormType>({
    mode: 'onChange',
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormType> = data => {
    console.log(data);
  };
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
  display: 'flex',
});
const SFormContainer = styled('div', {
  margin: '80px 0',
  padding: '44px 40px 56px',
  background: '$black80',
  borderRadius: '15px',
});
const SFormName = styled('h1', {
  fontAg: '24_bold_100',
  color: '$white',
  marginBottom: '90px',
});
