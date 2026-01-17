import { useSearchSubwayQueryOption } from '@api/map/query';
import { fontsObject } from '@sopt-makers/fonts';
import { IconSearch, IconXCircle, IconXClose } from '@sopt-makers/icons';
import { useQuery } from '@tanstack/react-query';
import { useRef, useState } from 'react';
import { styled } from 'stitches.config';

interface SubwayStationDataType {
  name?: string;
  subwayLines?: string[];
}

interface SearchSubwayProps {
  value: SubwayStationDataType[];
  onChange: (value: SubwayStationDataType[]) => void;
  error: string | undefined;
}

const SearchSubway = ({ value: selectedStations = [], onChange, error }: SearchSubwayProps) => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const { data: subwayStationsData } = useQuery(useSearchSubwayQueryOption(searchKeyword));
  const containerRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const subwayStations = subwayStationsData?.stations ?? [];

  const handleStationSelect = (station: SubwayStationDataType) => {
    if (selectedStations.length < 3 && !selectedStations.some(s => s.name === station.name)) {
      onChange([...selectedStations, station]);
    }
    setSearchKeyword('');
  };

  const handleDeleteStation = (index: number) => {
    const updatedStations = selectedStations.filter((_, i) => i !== index);
    onChange(updatedStations);
  };

  return (
    <div ref={containerRef}>
      <StationsContainer>
        {/*지하철역 검색 인풋 */}
        {selectedStations.length < 3 && (
          <InputBox isActive={searchKeyword !== ''}>
            <SearchInput
              ref={inputRef}
              value={searchKeyword}
              onChange={e => setSearchKeyword(e.target.value)}
              placeholder="지하철역 검색"
            />
            {searchKeyword ? (
              <StyledIconXCircle
                onClick={() => {
                  setSearchKeyword('');
                }}
              />
            ) : (
              <StyledIconSearch
                style={{
                  position: 'absolute',
                  right: '10px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                }}
              />
            )}
            {/* 검색 결과 드롭다운 */}
            {searchKeyword && subwayStations.length > 0 && (
              <SearchResultDropdown>
                {subwayStations.map((station: SubwayStationDataType, idx: number) => (
                  <StationItem key={`${station.name}-${idx}`} onClick={() => handleStationSelect(station)}>
                    <StationName>{station.name}</StationName>
                    <SubwayLines>
                      {station.subwayLines?.map((line: string, lineIdx: number) => (
                        <SubwayLine key={lineIdx}>{line}</SubwayLine>
                      ))}
                    </SubwayLines>
                  </StationItem>
                ))}
              </SearchResultDropdown>
            )}
          </InputBox>
        )}

        {/*추가된 지하철역 렌더링 */}
        <StationsWrapper>
          {selectedStations?.map((station, idx) => (
            <Station key={`${station.name}-${idx}`}>
              <StationName>{station.name}</StationName>
              <DeleteButton type={'button'} onClick={() => handleDeleteStation(idx)}>
                <StyledIconXClose />
              </DeleteButton>
            </Station>
          ))}
        </StationsWrapper>
      </StationsContainer>

      {error && <ErrorMessage>{error}</ErrorMessage>}
    </div>
  );
};

export default SearchSubway;

const StationsContainer = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  '@media (max-width: 430px)': {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
});

const StationsWrapper = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '10px',
  '@media (max-width: 430px)': {
    gap: '8px',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
});

const Station = styled('div', {
  width: 'auto',
  minWidth: '100px',
  height: '48px',

  display: 'flex',
  padding: '8px 12px',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '10px',

  borderRadius: '10px',
  backgroundColor: '$gray900',
  flexWrap: 'nowrap',

  color: '$white',
  position: 'relative',

  '@media (max-width: 430px)': {
    minWidth: '80px',
    height: '40px',
    padding: '8px 10px',
    gap: '8px',
  },
});

const StationName = styled('span', {
  color: '$white',
  ...fontsObject.BODY_2_16_M,
  whiteSpace: 'nowrap',

  '@media (max-width: 430px)': {
    ...fontsObject.BODY_3_14_M,
  },
});

const SearchInput = styled('input', {
  flex: 1,
  background: 'transparent',
  border: 'none',
  outline: 'none',
  color: '$white',
  ...fontsObject.BODY_2_16_M,
  '&::placeholder': {
    color: '$gray400',
  },
  '@media (max-width: 430px)': {
    ...fontsObject.BODY_3_14_M,
  },
});

const SearchResultDropdown = styled('div', {
  position: 'absolute',
  top: 'calc(100% + 4px)',
  left: 0,
  right: 0,
  maxHeight: '210px',
  overflowY: 'auto',
  backgroundColor: '$gray800',
  borderRadius: '10px',
  border: '1px solid $gray600',
  zIndex: 10,
});

const StationItem = styled('div', {
  padding: '12px 16px',
  cursor: 'pointer',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  '&:hover': {
    backgroundColor: '$gray700',
  },
  '&:not(:last-child)': {
    borderBottom: '1px solid $gray600',
  },
});

const SubwayLines = styled('div', {
  display: 'flex',
  gap: '4px',
});

const SubwayLine = styled('span', {
  fontSize: '12px',
  color: '$gray300',
  padding: '2px 6px',
  backgroundColor: '$gray700',
  borderRadius: '4px',
});

const DeleteButton = styled('button', {
  display: 'flex',
  width: '16px',
  height: '16px',
  padding: '2px',
  justifyContent: 'center',
  alignItems: 'center',

  borderRadius: '50px',
  background: '$gray700',
  cursor: 'pointer',
});

const InputBox = styled('div', {
  position: 'relative',
  flexShrink: 0,
  width: '210px',
  height: '100%',
  display: 'flex',
  padding: '11px 16px',
  justifyContent: 'space-between',
  alignItems: 'center',
  borderRadius: '10px',
  backgroundColor: '$gray800',
  variants: {
    isActive: {
      true: {
        border: '1px solid $gray200',
      },
      false: {
        border: '1px solid transparent',
      },
    },
  },
});

const ErrorMessage = styled('div', {
  color: '$red500',
  fontSize: '12px',
  marginTop: '8px',
});

const StyledIconXCircle = styled(IconXCircle, {
  width: '24px',
  height: '24px',
  cursor: 'pointer',
});

const StyledIconSearch = styled(IconSearch, {
  width: '24px',
  height: '24px',
  color: '$gray300',
  //모바일에선 input에 다른 뷰 필요 (현재는 구현 x)
});

const StyledIconXClose = styled(IconXClose, {
  width: '16px',
  height: '16px',
  color: '#9D9DA4',
  strokeWidth: '1.5',
  cursor: 'pointer',
});
