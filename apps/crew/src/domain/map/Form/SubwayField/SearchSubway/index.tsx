import { useSearchSubwayQueryOption } from '@api/map/query';
import { fontsObject } from '@sopt-makers/fonts';
import { IconCheck, IconSearch, IconXCircle, IconXClose } from '@sopt-makers/icons';
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

const COMMA_SPACE = ',\u00A0';

const SearchSubway = ({ value: selectedStations = [], onChange, error }: SearchSubwayProps) => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const { data: subwayStationsData } = useQuery(useSearchSubwayQueryOption(searchKeyword));
  const containerRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const subwayStations = subwayStationsData?.stations ?? [];
  const unselectedSubwayStations = subwayStations.filter(
    (station) => !selectedStations.some((selectedStation) => selectedStation.name === station.name),
  );

  const handleStationSelect = (station: SubwayStationDataType) => {
    if (selectedStations.length < 3 && !selectedStations.some((s) => s.name === station.name)) {
      onChange([...selectedStations, station]);
    }
    setSearchKeyword('');
  };

  const handleDeleteStation = (name?: string) => {
    const updatedStations = selectedStations.filter((station) => station.name !== name);
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
              onChange={(e) => setSearchKeyword(e.target.value)}
              placeholder='지하철역 검색'
            />
            {searchKeyword && (
              <StyledIconXCircle
                onClick={() => {
                  setSearchKeyword('');
                }}
              />
            )}
            <StyledIconSearch isActive={searchKeyword !== ''} />

            {/* 검색 결과 드롭다운 */}
            {searchKeyword && (selectedStations.length > 0 || unselectedSubwayStations.length > 0) && (
              <SearchResultDropdown>
                {selectedStations.map((station: SubwayStationDataType) => (
                  <SelectedStationItem key={station.name} onClick={() => handleDeleteStation(station.name)}>
                    <SelectedStationContent>
                      <StationName>{station.name}</StationName>
                      <SubwayLineList>
                        {station.subwayLines?.map((line, index, subwayLines) => (
                          <SubwayLineItem key={line}>
                            {line}
                            {index < subwayLines.length - 1 ? COMMA_SPACE : ''}
                          </SubwayLineItem>
                        ))}
                      </SubwayLineList>
                    </SelectedStationContent>
                    <SelectedCheckIcon />
                  </SelectedStationItem>
                ))}

                {unselectedSubwayStations.map((station: SubwayStationDataType) => (
                  <StationItem key={station.name} onClick={() => handleStationSelect(station)}>
                    <StationName>{station.name}</StationName>
                    <SubwayLineList>
                      {station.subwayLines?.map((line, index, subwayLines) => (
                        <SubwayLineItem key={line}>
                          {line}
                          {index < subwayLines.length - 1 ? COMMA_SPACE : ''}
                        </SubwayLineItem>
                      ))}
                    </SubwayLineList>
                  </StationItem>
                ))}
              </SearchResultDropdown>
            )}
          </InputBox>
        )}

        {/*추가된 지하철역 렌더링 */}
        <AddedStationsWrapper>
          {selectedStations?.map((station) => (
            <Station key={station.name}>
              <StationName>{station.name}</StationName>
              <DeleteButton type={'button'} onClick={() => handleDeleteStation(station.name)}>
                <StyledIconXClose />
              </DeleteButton>
            </Station>
          ))}
        </AddedStationsWrapper>
      </StationsContainer>

      {error && <ErrorMessage>{error}</ErrorMessage>}
    </div>
  );
};

export default SearchSubway;

const StationsContainer = styled('div', {
  'display': 'flex',
  'alignItems': 'center',
  'gap': '8px',
  '@media (max-width: 430px)': {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
});

const AddedStationsWrapper = styled('div', {
  'display': 'flex',
  'justifyContent': 'center',
  'alignItems': 'center',
  'gap': '10px',
  '@media (max-width: 430px)': {
    gap: '8px',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
});

const Station = styled('div', {
  'width': 'auto',
  'minWidth': '100px',
  'height': '48px',

  'display': 'flex',
  'padding': '8px 12px',
  'justifyContent': 'center',
  'alignItems': 'center',
  'gap': '10px',

  'borderRadius': '10px',
  'backgroundColor': '$gray900',
  'flexWrap': 'nowrap',

  'color': '$white',
  'position': 'relative',

  '@media (max-width: 430px)': {
    minWidth: '80px',
    height: '40px',
    padding: '8px 10px',
    gap: '8px',
  },
});

const StationName = styled('span', {
  'color': '$white',
  ...fontsObject.BODY_2_16_M,
  'whiteSpace': 'nowrap',

  '@media (max-width: 430px)': {
    ...fontsObject.BODY_3_14_M,
  },
});

const SearchInput = styled('input', {
  'flex': 1,
  'minWidth': 0,
  'background': 'transparent',
  'border': 'none',
  'outline': 'none',
  'color': '$white',
  ...fontsObject.BODY_2_16_M,
  '&::placeholder': {
    color: '$gray400',
  },
  '@media (max-width: 430px)': {
    ...fontsObject.BODY_3_14_M,
  },
});

const SearchResultDropdown = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '5px',
  position: 'absolute',
  top: 'calc(100% + 4px)',
  left: 0,
  width: '248px',
  maxHeight: '210px',
  overflowY: 'auto',
  padding: '8px',
  backgroundColor: '$gray800',
  borderRadius: '10px',
  border: '1px solid $gray600',
  scrollbarWidth: 'none',
  zIndex: 10,
});

const StationItem = styled('div', {
  'padding': '8px 12px',
  'cursor': 'pointer',
  'display': 'flex',
  'flexDirection': 'column',
  'justifyContent': 'space-between',
  'alignItems': 'flex-start',
  '&:hover': {
    backgroundColor: '$gray700',
  },
  'borderRadius': '8px',
});

const SelectedStationItem = styled('div', {
  'display': 'flex',
  'width': '100%',
  'justifyContent': 'space-between',
  'alignItems': 'center',
  'gap': '12px',
  'padding': '8px 12px',
  'borderRadius': '8px',
  'cursor': 'pointer',
  '&:hover': {
    backgroundColor: '$gray700',
  },
});

const SelectedStationContent = styled('div', {
  display: 'flex',
  flex: 1,
  minWidth: 0,
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
});

const SubwayLineList = styled('div', {
  display: 'flex',
  flexWrap: 'wrap',
});

const SubwayLineItem = styled('span', {
  fontSize: '12px',
  color: '$gray200',
  whiteSpace: 'nowrap',
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
  width: '248px',
  height: '100%',
  display: 'flex',
  padding: '11px 16px',
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
  color: '$white',
  cursor: 'pointer',
  flexShrink: 0,
});

const StyledIconSearch = styled(IconSearch, {
  width: '24px',
  height: '24px',
  marginLeft: '8px',
  flexShrink: 0,
  variants: {
    isActive: {
      true: {
        color: '$white',
      },
      false: {
        color: '$gray300',
      },
    },
  },
});

const StyledIconXClose = styled(IconXClose, {
  width: '16px',
  height: '16px',
  color: '#9D9DA4',
  strokeWidth: '1.5',
  cursor: 'pointer',
});

const SelectedCheckIcon = styled(IconCheck, {
  width: '24px',
  height: '24px',
  color: '$success',
  flexShrink: 0,
});
