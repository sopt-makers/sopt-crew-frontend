import MapQueryKey from '@api/map/MapQueryKey';
import { usePostSoptMapMutation } from '@api/map/mutation';
import { zodResolver } from '@hookform/resolvers/zod';
import { fontsObject } from '@sopt-makers/fonts';
import { Button, useToast } from '@sopt-makers/ui';
import { useQueryClient } from '@tanstack/react-query';
import router from 'next/router';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { styled } from 'stitches.config';
import DescriptionField from './Form/DescriptionField';
import LinkField from './Form/LinkField';
import LocationKeywordField from './Form/LocationKeywordField';
import NameField from './Form/NameField';
import SubwayField from './Form/SubwayField';
import { FormType, formSchema } from './Form/type';

interface RegisterFormProps {
  onFirstRegistered: (id?: number) => void;
}
const RegisterForm = ({ onFirstRegistered }: RegisterFormProps) => {
  const queryClient = useQueryClient();
  const { open } = useToast();
  const formMethods = useForm<FormType>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      subwayStations: [],
      description: '',
      category: {
        label: '',
        value: '',
      },
      links: {
        naverMapLink: '',
        kakaoMapLink: '',
      },
    },
  });
  const { isValid, errors } = formMethods.formState;

  const { mutate: mutateCreateMap } = usePostSoptMapMutation();

  const onSubmit: SubmitHandler<FormType> = async formData => {
    mutateCreateMap(formData, {
      onSuccess: data => {
        open({
          icon: 'success',
          content: '장소를 등록했습니다.',
        });
        queryClient.invalidateQueries({ queryKey: MapQueryKey.all() });

        if (data.firstRegistered) {
          onFirstRegistered(data.id);
          return;
        }

        router.push('/map');
      },
    });
  };

  const handleSubmit = formMethods.handleSubmit(onSubmit);
  const isSubmitDisabled = !isValid || Object.keys(errors).length > 0;

  return (
    <FormProvider {...formMethods}>
      <SContainer>
        <SFormContainer>
          <SFormName>솝맵 등록</SFormName>
          <SForm onSubmit={handleSubmit}>
            <NameField />
            <SubwayField />
            <DescriptionField />
            <LocationKeywordField />
            <LinkField />
            <ButtonContainer>
              <Button type="submit" size="lg" disabled={isSubmitDisabled}>
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
  '@tablet': {
    gap: '56px',
  },
});

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
  padding: '36px 40px 56px',
  borderRadius: '15px',

  '@tablet': {
    padding: '40px 0',
    background: '$gray950',
  },
});

const SFormName = styled('h1', {
  ...fontsObject.HEADING_2_32_B,
  color: '$gray10',
  marginBottom: '20px',

  '@tablet': {
    ...fontsObject.HEADING_4_24_B,
  },
});

const ButtonContainer = styled('div', {
  display: 'flex',
  justifyContent: 'end',
  '& button': {
    width: '220px',
  },
  '@tablet': {
    width: '100%',
    '& button': {
      width: '100%',
    },
  },
});

export default RegisterForm;
