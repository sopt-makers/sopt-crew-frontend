import ApplicationPeriodField from '@components/form/Presentation/ApplicationPeriodField';
import CategoryField from '@components/form/Presentation/CategoryField';
import CoLeaderField from '@components/form/Presentation/CoLeaderField';
import ImageField from '@components/form/Presentation/ImageField';
import useImageHandler from '@components/form/Presentation/ImageField/useImageHandler';
import KeywordField from '@components/form/Presentation/KeywordField';
import LeaderDescriptionField from '@components/form/Presentation/LeaderDescriptionField';
import NoticeField from '@components/form/Presentation/NoticeField';
import SubmitPresentationButton from '@components/form/Presentation/SubmitPresentationButton';
import TargetField from '@components/form/Presentation/TargetField';
import TitleField from '@components/form/Presentation/TitleField';
import WelcomeMessageField from '@components/form/Presentation/WelcomeMessageField';
import { colors } from '@sopt-makers/colors';
import { fontsObject } from '@sopt-makers/fonts';
import React, { useRef } from 'react';
import { styled } from 'stitches.config';
import ActivityPeriodField from './ActivityPeriodField';
import DescriptionField from './DescriptionField';
import ProcessIntroductionField from './ProcessIntroductionField';
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
        <SFormSectionDivider>1. 모임 정보</SFormSectionDivider>
        <SectionLine />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '52px' }}>
          <TitleField />
          <CategoryField />
          <KeywordField />
          <ImageField onChangeFile={handleChangeFile} onDeleteFile={handleDeleteFile} onAddFiles={handleAddFiles} />
          <DescriptionField />
        </div>
      </div>
      <div>
        <SFormSectionDivider>2. 활동 정보</SFormSectionDivider>
        <SectionLine />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '52px' }}>
          <ActivityPeriodField />
          <ProcessIntroductionField />
          <div>
            <SFormSectionDivider>3. 모집 정보</SFormSectionDivider>
            <SectionLine />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '52px' }}>
              <ApplicationPeriodField />
              <TargetField />
            </div>
          </div>
          <div>
            <SFormSectionDivider>4. 추가 정보</SFormSectionDivider>
            <SectionLine />
            <CoLeaderField />
          </div>
          <LeaderDescriptionField />
          <WelcomeMessageField />
          <NoticeField />
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
  gap: '60px',
  '@media (max-width: 768px)': {
    gap: '56px',
  },
});

const SFormSectionDivider = styled('div', {
  ...fontsObject.HEADING_4_24_B,
  paddingBottom: '12px',
  display: 'flex',
  alignItems: 'center',
});

const SectionLine = styled('div', {
  width: '100%',
  height: '1px',
  background: `${colors.gray800}`,
  mb: '$20',
});
