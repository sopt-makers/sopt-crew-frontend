import { Box } from '@components/box/Box';
import Switch from '@components/button/Switch';
import { Flex } from '@components/util/layout/Flex';
import { useIsCurrentGenerationParams } from '@hooks/queryString/custom';
import { parseBool } from '@utils/parseBool';
import { CSSType, styled } from 'stitches.config';

interface ToggleProps {
  css?: CSSType;
  label: string;
}

function Toggle({ css, label }: ToggleProps) {
  const { value: isCurrentGeneration, setValue } = useIsCurrentGenerationParams();
  return (
    <ToggleWrapper css={{ ...css }}>
      {label && <SLabel>{label}</SLabel>}
      <SSwitchWrapper align="center" justify="center">
        <SToggleDetailWord>활동 기수만</SToggleDetailWord>
        <Switch
          checked={parseBool(isCurrentGeneration || '')}
          onClick={() => setValue(String(!parseBool(isCurrentGeneration || '')))}
        />
      </SSwitchWrapper>
    </ToggleWrapper>
  );
}

export default Toggle;
const ToggleWrapper = styled(Box, {});
const SLabel = styled('p', {
  color: '$white',
  fontAg: '18_bold_100',
  mb: '$20',
});
const SSwitchWrapper = styled(Flex, {
  background: '$black100',
  borderRadius: '14px',
  width: '163px',
  height: '46px',
});
const SToggleDetailWord = styled('p', {
  fontAg: '16_medium_100',
  color: '$gray60',
  mt: '$1',
  mr: '$15',
});
