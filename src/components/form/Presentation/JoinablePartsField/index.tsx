import { Option } from '@components/form/Select/OptionItem';
import { parts } from '@data/options';
import { Chip } from '@sopt-makers/ui';

interface JoinablePartsFieldProps {
  value: Option[];
  onChange: (newSelectedParts: Option[]) => void;
}

const JoinablePartsField = ({ value, onChange }: JoinablePartsFieldProps) => {
  const handleClick = (selectedOption: Option) => {
    const isValidValue = Array.isArray(value);
    let updatedParts = isValidValue ? [...value] : [];

    // 'all' 옵션을 클릭했을 때 처리
    if (selectedOption.value === 'all') {
      // 전체 옵션이 이미 선택되어 있으면 해제, 아니면 전체 선택
      updatedParts = isValidValue && value.some(part => part.value === 'all') ? [] : parts;
    } else {
      // 개별 옵션을 선택할 때
      if (isValidValue && value.some(part => part.value === selectedOption.value)) {
        // 이미 선택된 항목이면 해제
        updatedParts = updatedParts.filter(part => part.value !== selectedOption.value);
      } else {
        // 선택되지 않은 항목이면 추가
        updatedParts.push(selectedOption);
      }

      // 개별 옵션 해제 시 전체 옵션도 해제
      if (updatedParts.some(part => part.value === 'all') && updatedParts.length < parts.length) {
        updatedParts = updatedParts.filter(part => part.value !== 'all');
      }

      // 모든 개별 파트가 선택되었으면 'all' 옵션도 활성화
      if (updatedParts.length === parts.length - 1) {
        updatedParts.push(parts[0]); // 'all'을 활성화
      }
    }

    onChange(updatedParts);
  };

  return (
    <>
      {parts.map(part => (
        <Chip
          active={Array.isArray(value) && value.some(selected => selected.value === part.value)}
          onClick={() => handleClick(part)}
          key={part.value}
          style={{ width: '80px' }}
        >
          {part.label}
        </Chip>
      ))}
    </>
  );
};

export default JoinablePartsField;
