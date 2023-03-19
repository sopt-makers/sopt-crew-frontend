import { Box } from '@components/box/Box';
import Switch from '@components/button/Switch';
import { Flex } from '@components/util/layout/Flex';
import { useIsCurrentGenerationParams } from '@hooks/queryString/custom';
import { parseBool } from '@utils/parseBool';
import { CSSType, styled } from 'stitches.config';
import { Switch as HeadlessSwitch } from '@headlessui/react';
interface ToggleProps {
  css?: CSSType;
  label: string;
}

function Toggle({ css, label }: ToggleProps) {
  const { value: isCurrentGeneration, setValue } = useIsCurrentGenerationParams();
  return (
    <HeadlessSwitch.Group>
      <ToggleWrapper css={{ ...css }}>
        {label && <SLabel>{label}</SLabel>}
        <SSwitchWrapper align="center" justify="center">
          <SToggleDetailWord isCurrentGeneration={parseBool(isCurrentGeneration)}>
            <HeadlessSwitch.Label>활동 기수만</HeadlessSwitch.Label>
          </SToggleDetailWord>
          <Switch
            checked={parseBool(isCurrentGeneration || '')}
            onChange={() => setValue(String(!parseBool(isCurrentGeneration)))}
          />
        </SSwitchWrapper>
      </ToggleWrapper>
    </HeadlessSwitch.Group>
  );
}

export default Toggle;
const ToggleWrapper = styled(Box, {});
const SLabel = styled('p', {
  color: '$white',
  fontAg: '18_bold_100',
  mb: '$20',
  '@mobile': {
    fontAg: '14_bold_100',
    mb: '$16',
  },
});
const SSwitchWrapper = styled(Flex, {
  background: '$black100',
  borderRadius: '14px',
  width: '163px',
  height: '46px',
  '@mobile': {
    width: '124px',
    height: '36px',
    borderRadius: '10px',
  },
});
const SToggleDetailWord = styled(Box, {
  fontAg: '16_medium_100',
  color: '$gray60',
  mt: '$1',
  mr: '$15',
  '@mobile': {
    fontAg: '12_semibold_100',
    mr: '$8',
  },
  variants: {
    isCurrentGeneration: {
      true: {
        color: '$white',
      },
    },
  },
});
