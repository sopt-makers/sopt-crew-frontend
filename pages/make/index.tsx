import Presentation from '@components/Form/Presentation';
import TableOfContents from '@components/Form/TableOfContents';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { FormType, schema } from 'src/types/form';
import { styled } from 'stitches.config';
import { zodResolver } from '@hookform/resolvers/zod';
import { createGroup } from 'src/api/group';

const MakePage = () => {
  const methods = useForm<FormType>({
    mode: 'onChange',
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormType> = async formData => {
    try {
      await createGroup(formData);

      // TODO: handle success
      alert('모임을 생성했습니다.');
    } catch (error) {
      // TODO: handle error
      alert('모임을 생성하지 못했습니다.');
    }
  };

  return (
    <FormProvider {...methods}>
      <SContainer>
        <SFormContainer>
          <SFormName>모임 생성하기</SFormName>
          <Presentation
            onSubmit={methods.handleSubmit(onSubmit)}
            submitButtonLabel="모임 생성하기"
          />
        </SFormContainer>
        <TableOfContents label="모임 생성" />
      </SContainer>
    </FormProvider>
  );
};

export default MakePage;

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
