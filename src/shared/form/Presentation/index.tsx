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
        <div style={{ display: 'flex', flexDirection: 'column', gap: '60px' }}>
          <TitleField />
          <CategoryField />
          <KeywordField />
          <ImageField onChangeFile={handleChangeFile} onDeleteFile={handleDeleteFile} onAddFiles={handleAddFiles} />
          <DescriptionField />
          <ApplicationPeriodField />
          <TargetField />
        </div>
      </div>

      <div>
        <SFormSectionDivider>
          2. 추가 정보
          <SFormSectionDividerOptionText>(선택)</SFormSectionDividerOptionText>
        </SFormSectionDivider>
        <SectionLine />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '60px' }}>
          <CoLeaderField />
          <LeaderDescriptionField />
          <WelcomeMessageField />
        </div>
      </div>

      <SubmitPresentationButton
        cancelButtonLabel={cancelButtonLabel}
        submitButtonLabel={submitButtonLabel}
        disabled={disabled}
        formRef={formRef}
      />
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
});

const SFormSectionDividerOptionText = styled('p', {
  ...fontsObject.HEADING_4_24_B,
  color: `${colors.gray400}`,
});

const SectionLine = styled('div', {
  width: '100%',
  height: '1px',
  background: `${colors.gray800}`,
  mb: '$20',
});
