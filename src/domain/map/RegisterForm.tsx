import { zodResolver } from '@hookform/resolvers/zod';
import { fontsObject } from '@sopt-makers/fonts';
import { Button } from '@sopt-makers/ui';
import { FormType, schema } from '@type/form';
import { FormProvider, useForm } from 'react-hook-form';
import { styled } from 'stitches.config';
import DescriptionField from './Form/DescriptionField';
import LinkField from './Form/LinkField';
import LocationKeywordField from './Form/LocationKeywordField';
import NameField from './Form/NameField';
import SubwayField from './Form/SubwayField';

const RegisterForm = ({ disabled = true }) => {
  const formMethods = useForm<FormType>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: zodResolver(schema),
    defaultValues: {
      detail: {
        coLeader: [],
      },
    },
  });
  const { isValid, errors, isDirty } = formMethods.formState;
  const { watch } = formMethods;

  return (
    <FormProvider {...formMethods}>
      <SContainer>
        <SFormContainer>
          <SForm>
            <SFormName>솝맵 등록</SFormName>
            <NameField />
            <SubwayField />
            <DescriptionField />
            <LocationKeywordField />
            <LinkField />
            <ButtonContainer>
              <Button size="lg" disabled={disabled}>
                등록하기
              </Button>
            </ButtonContainer>
          </SForm>
        </SFormContainer>
      </SContainer>
    </FormProvider>
  );
};

const SForm = styled('form', {
  display: 'flex',
  flexDirection: 'column',
  gap: '60px',
  '@media (max-width: 768px)': {
    gap: '56px',
  },
});

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
  padding: '36px 40px 56px',
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

const ButtonContainer = styled('div', {
  display: 'flex',
  justifyContent: 'end',
});

export default RegisterForm;
