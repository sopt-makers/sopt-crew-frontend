import { Option } from '@components/form/Select/OptionItem';
import { parts } from '@data/options';
import { Chip } from '@sopt-makers/ui';
import { useState, useEffect } from 'react';

interface JoinablePartsFieldProps {
  value: Option[];
  onChange: (newSelectedParts: Option[]) => void;
}

const JoinablePartsField = ({ value, onChange }: JoinablePartsFieldProps) => {
  const [selectedParts, setSelectedParts] = useState<Option[]>([]);

  useEffect(() => {
    if (Array.isArray(value)) {
      setSelectedParts(value); // value prop이 변경되면 상태 동기화
    }
  }, [value]);

  const handleClick = (selectedOption: Option) => {
    let updatedParts = [...selectedParts];

    // 'all' 옵션을 클릭했을 때 처리
    if (selectedOption.value === 'all') {
      if (selectedParts.some(part => part.value === 'all')) {
        // 전체 옵션이 이미 선택되어 있으면 해제
        updatedParts = [];
      } else {
        // 전체 옵션을 선택하면 모든 부분을 선택
        updatedParts = parts;
      }
    } else {
      // 개별 옵션을 선택할 때
      if (selectedParts.some(part => part.value === selectedOption.value)) {
        // 이미 선택된 항목이면 해제
        updatedParts = updatedParts.filter(part => part.value !== selectedOption.value);
      } else {
        // 선택되지 않은 항목이면 추가
        updatedParts.push(selectedOption);
      }

      // 모든 개별 파트가 선택되었으면 'all' 옵션도 활성화
      if (updatedParts.length === parts.length - 1) {
        updatedParts.push(parts[0]);
      }
    }

    setSelectedParts(updatedParts);
    onChange(updatedParts); // 선택된 파트의 value만 전달
  };

  return (
    <>
      {parts.map(part => (
        <Chip
          active={selectedParts.some(selected => selected.value === part.value)}
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
