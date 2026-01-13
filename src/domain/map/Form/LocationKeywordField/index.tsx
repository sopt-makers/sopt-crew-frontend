import ErrorMessage from '@shared/form/ErrorMessage';
import FormController from '@shared/form/FormController';
import HelpMessage from '@shared/form/HelpMessage';
import Label from '@shared/form/Label';
import { Chip } from '@sopt-makers/ui';
import { styled } from 'stitches.config';

const mapCategories = [
  { label: '카페', value: '카페' },
  { label: '음식점', value: '음식점' },
  { label: '기타', value: '기타' },
];

const LocationKeywordField = () => {
  return (
    <div>
      <Label required={true}>장소 태그</Label>
      <HelpMessage>장소의 카테고리를 선택해주세요</HelpMessage>
      <FormController
        name="category"
        defaultValue={{ label: '', value: '' }}
        render={({ field: { value, onChange }, fieldState: { error } }) => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const categoryError = error as any;
          return (
            <>
              <SChipContainer>
                {mapCategories.map(option => {
                  const isSelected = value.value === option.value;
                  return (
                    <Chip key={option.value} active={isSelected} onClick={() => onChange(option)}>
                      {option.label}
                    </Chip>
                  );
                })}
              </SChipContainer>
              {categoryError?.value && (
                <ErrorMessage style={{ marginTop: '12px' }}>{categoryError.value.message}</ErrorMessage>
              )}
            </>
          );
        }}
      ></FormController>
    </div>
  );
};

export default LocationKeywordField;

const SChipContainer = styled('div', {
  display: 'flex',
  gap: '$10',
  flexWrap: 'wrap',

  '@media(max-width: 430px)': {
    maxWidth: '320px',
  },
});
