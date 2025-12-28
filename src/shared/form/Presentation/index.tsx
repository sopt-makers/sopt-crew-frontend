import ApplicationPeriodField from '@shared/form/Presentation/ApplicationPeriodField';
import CategoryField from '@shared/form/Presentation/CategoryField';
import CoLeaderField from '@shared/form/Presentation/CoLeaderField';
import ImageField from '@shared/form/Presentation/ImageField';
import useImageHandler from '@shared/form/Presentation/ImageField/useImageHandler';
import KeywordField from '@shared/form/Presentation/KeywordField';
import LeaderDescriptionField from '@shared/form/Presentation/LeaderDescriptionField';
import SubmitPresentationButton from '@shared/form/Presentation/SubmitPresentationButton';
import TargetField from '@shared/form/Presentation/TargetField';
import TitleField from '@shared/form/Presentation/TitleField';
import WelcomeMessageField from '@shared/form/Presentation/WelcomeMessageField';
import { colors } from '@sopt-makers/colors';
import { fontsObject } from '@sopt-makers/fonts';
import React, { useRef } from 'react';
import { styled } from 'stitches.config';
import DescriptionField from './DescriptionField';
interface PresentationProps {
  submitButtonLabel: React.ReactNode;
  cancelButtonLabel?: React.ReactNode;
  handleChangeImage: (index: number, url: string) => void;
  handleDeleteImage: (index: number) => void;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  disabled?: boolean;
}

function Presentation({
  submitButtonLabel,
  cancelButtonLabel,
  handleChangeImage,
  handleDeleteImage,
  onSubmit,
  disabled = true,
}: PresentationProps) {
  const { handleChangeFile, handleDeleteFile, handleAddFiles } = useImageHandler({
    onChangeImage: handleChangeImage,
    onDeleteImage: handleDeleteImage,
  });

  const formRef = useRef<HTMLFormElement>(null);

  return (
    <SForm onSubmit={onSubmit} ref={formRef}>
      <div>
        <SFormSectionDivider>1. 필수 정보</SFormSectionDivider>
        <SectionLine />
        <SFormSectionContainer>
          <TitleField />
          <CategoryField />
          <KeywordField />
          <ImageField onChangeFile={handleChangeFile} onDeleteFile={handleDeleteFile} onAddFiles={handleAddFiles} />
          <DescriptionField />
          <ApplicationPeriodField />
          <TargetField />
        </SFormSectionContainer>
      </div>

      <div>
        <SFormSectionDivider>
          2. 추가 정보
          <SFormSectionDividerOptionText>(선택)</SFormSectionDividerOptionText>
        </SFormSectionDivider>
        <SectionLine />
        <SFormSectionContainer>
          <CoLeaderField />
          <LeaderDescriptionField />
          <WelcomeMessageField />
        </SFormSectionContainer>
        <SubmitPresentationButton
          cancelButtonLabel={cancelButtonLabel}
          submitButtonLabel={submitButtonLabel}
          disabled={disabled}
          formRef={formRef}
        />
      </div>
    </SForm>
  );
}

export default Presentation;

const SForm = styled('form', {
  display: 'flex',
  flexDirection: 'column',
  gap: '120px',
  '@media (max-width: 430px)': {
    gap: '40px',
  },
});

const SFormSectionDivider = styled('div', {
  ...fontsObject.HEADING_4_24_B,
  paddingBottom: '12px',
  display: 'flex',
  gap: '8px',
  alignItems: 'center',

  '@media (max-width: 768px)': {
    ...fontsObject.HEADING_5_20_B,
  },
});

const SFormSectionContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '60px',

  '@media (max-width: 768px)': {
    gap: '56px',
  },
});

const SFormSectionDividerOptionText = styled('p', {
  ...fontsObject.HEADING_4_24_B,
  color: `${colors.gray400}`,

  '@media (max-width: 768px)': {
    ...fontsObject.HEADING_5_20_B,
  },
});

const SectionLine = styled('div', {
  width: '100%',
  height: '1px',
  background: `${colors.gray800}`,
  mb: '$20',
});
