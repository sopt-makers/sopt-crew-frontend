import Switch from '@components/button/Switch';
import { Flex } from '@components/util/layout/Flex';
import { useIsOnlyActiveGenerationParams } from '@hooks/queryString/custom';
import { parseBool } from '@utils/parseBool';
import { CSSType, styled } from 'stitches.config';
import { Switch as HeadlessSwitch } from '@headlessui/react';
interface ToggleProps {
  css?: CSSType;
  label: string;
}

function Toggle({ css, label }: ToggleProps) {
  const { value: isOnlyActiveGeneration, setValue } = useIsOnlyActiveGenerationParams();
  return (
    <HeadlessSwitch.Group>
      <ToggleWrapper css={{ ...css }}>
        {label && <SLabel>{label}</SLabel>}
        <SSwitchWrapper align="center" justify="center">
          <SToggleDetailWord isOnlyActiveGeneration={parseBool(isOnlyActiveGeneration)}>
            <HeadlessSwitch.Label>활동 기수만</HeadlessSwitch.Label>
          </SToggleDetailWord>
          <Switch
            checked={parseBool(isOnlyActiveGeneration || '')}
            onChange={() => setValue(String(!parseBool(isOnlyActiveGeneration)))}
          />
        </SSwitchWrapper>
      </ToggleWrapper>
    </HeadlessSwitch.Group>
  );
}

export default Toggle;
const ToggleWrapper = styled('div', {});
const SLabel = styled('p', {
  color: '$white100',
  fontAg: '18_bold_100',
  mb: '$20',
  '@tablet': {
    fontAg: '14_bold_100',
    mb: '$16',
  },
});
const SSwitchWrapper = styled(Flex, {
  background: '$black100',
  borderRadius: '14px',
  width: '163px',
  height: '46px',
  '@tablet': {
    width: '124px',
    height: '36px',
    borderRadius: '10px',
  },
});
const SToggleDetailWord = styled('div', {
  fontAg: '16_medium_100',
  color: '$gray60',
  mt: '$1',
  mr: '$15',
  '@tablet': {
    fontAg: '12_semibold_100',
    mr: '$8',
  },
  variants: {
    isOnlyActiveGeneration: {
      true: {
        color: '$white100',
      },
    },
  },
});
