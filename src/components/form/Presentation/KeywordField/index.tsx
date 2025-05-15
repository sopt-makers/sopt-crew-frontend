import FormController from '@components/form/FormController';
import HelpMessage from '@components/form/HelpMessage';
import Label from '@components/form/Label';
import { Option } from '@components/form/Select/OptionItem';
import { keywordOptions } from '@data/options';
import { Chip } from '@sopt-makers/ui';
import { useCallback } from 'react';
import { styled } from 'stitches.config';

const MAX_KEYWORD_COUNT = 2;

const KeywordField = () => {
  const handleClick = useCallback((option: Option, value: string[], onChange: (value: string[]) => void) => {
    if (!option.value) return;

    let updatedKeywords = [...value];
    if (updatedKeywords.includes(option.value)) {
      updatedKeywords = updatedKeywords.filter(keyword => keyword !== option.value);
    } else {
      updatedKeywords.push(option.value);
    }

    if (updatedKeywords.length > MAX_KEYWORD_COUNT) return;

    onChange(updatedKeywords);
  }, []);

  return (
    <div>
      <Label required={true}>모임 키워드</Label>
      <HelpMessage>최대 {MAX_KEYWORD_COUNT}개까지 선택할 수 있어요</HelpMessage>
      <FormController
        name="meetingKeywordTypes"
        defaultValue={[]}
        render={({ field: { value, onChange } }) => {
          return (
            <SChipContainer>
              {keywordOptions.map(option => {
                const isSelected = value.includes(option.value);
                return (
                  <Chip
                    disabled={value.length >= MAX_KEYWORD_COUNT && !isSelected}
                    key={option.value}
                    active={isSelected}
                    onClick={() => handleClick(option, value, onChange)}
                  >
                    {option.label}
                  </Chip>
                );
              })}
            </SChipContainer>
          );
        }}
      ></FormController>
    </div>
  );
};

export default KeywordField;

const SChipContainer = styled('div', {
  display: 'flex',
  gap: '$10',
  flexWrap: 'wrap',

  '@media(max-width: 430px)': {
    maxWidth: '320px',
  },
});
