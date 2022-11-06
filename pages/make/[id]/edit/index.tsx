import Presentation from '@components/Form/Presentation';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { FormData } from 'src/types/form';
import { styled } from 'stitches.config';

const EditPage = () => {
  // TODO: integrate API and fill default values
  const methods = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = data => {
    console.log(data);
  };

  return (
    <FormProvider {...methods}>
      <SFormContainer>
        <SFormName>모임 수정하기</SFormName>
        <Presentation
          onSubmit={methods.handleSubmit(onSubmit)}
          submitButtonLabel="수정 완료하기"
          cancelButtonLabel="수정 취소하기"
        />
      </SFormContainer>
      {/* TODO: 플로팅 Table of Content 추가 */}
    </FormProvider>
  );
};

export default EditPage;

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
