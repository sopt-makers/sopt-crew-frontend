import FormController from '@components/form/FormController';
import HelpMessage from '@components/form/HelpMessage';
import Label from '@components/form/Label';
import { Option } from '@components/form/Select/OptionItem';
import { flashTags } from '@data/options';
import { Chip } from '@sopt-makers/ui';
import { styled } from 'stitches.config';

const WelcomeMessageField = () => {
  return (
    <div>
      <SLabelCheckboxWrapper>
        <SLabelWrapper>
          <Label size="small">#환영 태그</Label>
        </SLabelWrapper>
      </SLabelCheckboxWrapper>
      <HelpMessage>
        멤버들이 신청을 주저하지 않도록 환영의 의사를 알려주는건 어떨까요? 최대 3개까지 선택 가능해요.
      </HelpMessage>
      <STargetFieldWrapper>
        <STargetChipContainer>
          <FormController
            name="welcomeMessageTypes"
            defaultValue={[]}
            render={({ field: { value = [], onChange } }) => {
              const handleClick = (option: Option) => {
                let updatedKeywords = [...value];
                if (updatedKeywords.includes(option.value)) {
                  updatedKeywords = updatedKeywords.filter(keyword => keyword !== option.value);
                } else {
                  updatedKeywords.push(option.value);
                }

                if (updatedKeywords.length > 3) return;

                onChange(updatedKeywords);
              };

              return (
                <>
                  {flashTags.map(tag => {
                    return (
                      <Chip active={value.includes(tag.value)} onClick={() => handleClick(tag)} key={tag.value}>
                        {tag.label}
                      </Chip>
                    );
                  })}
                </>
              );
            }}
          ></FormController>
        </STargetChipContainer>
      </STargetFieldWrapper>
    </div>
  );
};

export default WelcomeMessageField;
const SLabelCheckboxWrapper = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
});

const SLabelWrapper = styled('div', {
  width: 'fit-content',
});

const STargetFieldWrapper = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$16',
  marginBottom: '16px',
});

const STargetChipContainer = styled('div', {
  display: 'flex',
  gap: '$10',
  flexWrap: 'wrap',

  '@media(max-width: 430px)': {
    maxWidth: '320px',
  },
});
