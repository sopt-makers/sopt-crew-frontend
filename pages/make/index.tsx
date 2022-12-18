import Presentation from '@components/Form/Presentation';
import TableOfContents from '@components/Form/TableOfContents';
import {
  FormProvider,
  SubmitHandler,
  useForm,
  useWatch,
} from 'react-hook-form';
import { FormType, schema } from 'src/types/form';
import { styled } from 'stitches.config';
import { zodResolver } from '@hookform/resolvers/zod';
import { createGroup } from 'src/api/group';
import { useMemo } from 'react';
import { useRouter } from 'next/router';

const MakePage = () => {
  const router = useRouter();
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

  const onSubmit: SubmitHandler<FormType> = async formData => {
    try {
      const { id } = await createGroup(formData);
      alert('모임을 개설했습니다.');
      router.push(`/detail?id=${id}`);
      // TODO: handle success
    } catch (error) {
      // TODO: handle error
      alert('모임을 개설하지 못했습니다.');
    }
  };

  return (
    <FormProvider {...formMethods}>
      <SContainer>
        <SFormContainer>
          <SFormName>모임 개설하기</SFormName>
          <Presentation
            submitButtonLabel="모임 개설하기"
            imageUrls={imagesFromFiles}
            handleChangeImage={handleChangeImage}
            handleDeleteImage={handleDeleteImage}
            onSubmit={formMethods.handleSubmit(onSubmit)}
          />
        </SFormContainer>
        <TableOfContents label="모임 개설" />
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
