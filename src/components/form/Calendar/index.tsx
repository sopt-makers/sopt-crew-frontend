import React, { Dispatch, SetStateAction, useCallback, useEffect, useRef, useState } from 'react';
import { styled } from 'stitches.config';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import dayjs from 'dayjs';
import ErrorMessage from '../ErrorMessage';
import { useDisplay } from '@hooks/useDisplay';
import BottomSheetDialog from '../Select/BottomSheetSelect/BottomSheetDialog';
import { fontsObject } from '@sopt-makers/fonts';
import { IconCalendar } from '@sopt-makers/icons';
import { formatCalendarDate } from '@utils/dayjs';
import { formatDateInput, MAX_DATE_INPUT_LENGTH, WEEKDAYS } from '@utils/date';

/**
 * CalendarInputForm
 * @param selectedDate 선택된 날짜
 * @param setSelectedDate 선택된 날짜 변경 함수
 * @param selectedDateFieldName 선택된 날짜 필드 이름
 * @param error 에러 메시지
 * @param dateType 캘린더 타입, startDate(시작일 캘린더), endDate(마감일 캘린더), singleSelect(단일선택 캘린더)
 */

interface Props {
  selectedDate: string[] | string | null;
  setSelectedDate: Dispatch<SetStateAction<string[] | string | null>>;
  selectedDateFieldName: string;
  error?: string;
  dateType?: 'startDate' | 'endDate' | 'singleSelect';
}

const CalendarInputForm = ({ selectedDate, setSelectedDate, error, dateType, selectedDateFieldName }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState(dateType === 'endDate' ? selectedDate?.[1] : selectedDate?.[0]);
  const startDate = selectedDate?.[0] ?? '';
  const endDate = selectedDate?.[1] ?? '';

  const handleDateSelection = (newDate: string) => {
    if (dateType === 'singleSelect') {
      setSelectedDate([newDate, '']);
      setInputValue(newDate);
      return;
    }

    if (!startDate || (startDate && endDate)) {
      setSelectedDate([newDate, '']);
      setInputValue(newDate);
      return;
    }

    const newSelectedDate = newDate < startDate ? [newDate, startDate] : [startDate, newDate];
    setSelectedDate(newSelectedDate);
    setInputValue(dateType === 'endDate' ? newSelectedDate[1] : newSelectedDate[0]);
  };

  const handleDateChange = (date: Date) => {
    const newDate = formatCalendarDate(date);
    handleDateSelection(newDate);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = event.target.value.replace(/\D/g, '');
    const formattedValue = formatDateInput(rawValue);
    setInputValue(formattedValue);

    if (rawValue.length === MAX_DATE_INPUT_LENGTH) {
      const isValidFormatted = dayjs(formattedValue, 'YYYY.MM.DD', true).isValid();
      const isValidStart = dayjs(startDate, 'YYYY.MM.DD', true).isValid();
      const isValidEnd = dayjs(endDate, 'YYYY.MM.DD', true).isValid();

      if (dateType === 'endDate') {
        if (isValidFormatted && isValidStart) {
          const newSelectedEndDate =
            formattedValue < startDate ? [formattedValue, startDate] : [startDate, formattedValue];
          setSelectedDate(newSelectedEndDate);
        } else {
          setSelectedDate([startDate, formattedValue]); // invalid도 넘겨서 폼에서 에러처리
        }
      }

      if (dateType === 'startDate') {
        if (!endDate) {
          setSelectedDate([formattedValue, '']);
        } else if (isValidFormatted && isValidEnd) {
          const newSelectedStartDate = formattedValue > endDate ? [endDate, formattedValue] : [formattedValue, endDate];
          setSelectedDate(newSelectedStartDate);
        } else {
          setSelectedDate([formattedValue, endDate]);
        }
      }

      if (dateType === 'singleSelect') {
        setSelectedDate([formattedValue, '']);
      }
    }
  };

  const containerRef = useRef<HTMLDivElement | null>(null);
  const { isDesktop, isMobile, isTablet } = useDisplay();

  const handleOutsideClick = useCallback((event: MouseEvent) => {
    if (!containerRef.current || !containerRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  }, []);

  const getCalendarValue = (): Date | [Date, Date] | null => {
    const isValidStart = dayjs(startDate, 'YYYY.MM.DD', true).isValid();
    const isValidEnd = dayjs(endDate, 'YYYY.MM.DD', true).isValid();

    if (dateType === 'singleSelect') {
      return isValidStart ? dayjs(startDate, 'YYYY.MM.DD').toDate() : null;
    }

    if (isValidStart && isValidEnd) {
      return [dayjs(startDate, 'YYYY.MM.DD').toDate(), dayjs(endDate, 'YYYY.MM.DD').toDate()] as [Date, Date];
    }

    if (isValidStart) {
      return dayjs(startDate, 'YYYY.MM.DD').toDate();
    }

    return null;
  };

  useEffect(() => {
    if (selectedDate) {
      setInputValue(dateType === 'endDate' ? selectedDate[1] : selectedDate[0]);
    }
  }, [selectedDate, dateType]);

  useEffect(() => {
    if (isDesktop && !isMobile && !isTablet) {
      document.addEventListener('mousedown', handleOutsideClick);
      return () => {
        document.removeEventListener('mousedown', handleOutsideClick);
      };
    }
  }, [isDesktop, containerRef, setIsOpen, handleOutsideClick]);

  const isRange = dateType !== 'singleSelect';

  const CalendarComponent = () => {
    return (
      <Calendar
        value={getCalendarValue()}
        selectRange={isRange}
        onClickDay={handleDateChange}
        formatDay={(locale, date) => dayjs(date).format('D')}
        formatShortWeekday={(locale, date) => WEEKDAYS[date.getDay()] ?? ''}
        showNeighboringMonth={false}
        next2Label={null}
        prev2Label={null}
        minDate={new Date()}
        minDetail="month"
        maxDetail="month"
        calendarType="gregory"
        tileContent={({ date, view }) => {
          if (selectedDate?.includes(formatCalendarDate(date))) {
            return (
              <SDotWrapper>
                <SDot />
              </SDotWrapper>
            );
          }
        }}
        tileClassName={() => {
          if (dateType === 'singleSelect') {
            return 'single-select-mode';
          }
        }}
      />
    );
  };

  return (
    <>
      {!isDesktop && (isMobile || isTablet) ? (
        <>
          <SInputWrapper onClick={() => setIsOpen(true)}>
            <SInputCustom>
              <span className="filled">{inputValue}</span>
              <span className="placeholder">{'YYYY.MM.DD'.substring(inputValue?.length ?? 0)}</span>
              <SInput
                type="text"
                name={selectedDateFieldName}
                value={inputValue}
                onChange={handleInputChange}
                maxLength={10}
                placeholder=""
                autoComplete="off"
              />
            </SInputCustom>
            {isMobile ? <IconCalendar style={{ width: '20' }} /> : <IconCalendar style={{ width: '24' }} />}
          </SInputWrapper>
          {error && selectedDate?.[0] && <SErrorMessage>{error}</SErrorMessage>}
          {isOpen && (
            <div>
              <BottomSheetDialog label={''} handleClose={() => setIsOpen(false)} isOpen={isOpen}>
                <CalendarComponent />
              </BottomSheetDialog>
            </div>
          )}
        </>
      ) : (
        <>
          <SInputWrapper onClick={() => setIsOpen(true)}>
            <SInputCustom>
              <span className="filled">{inputValue}</span>
              <span className="placeholder">{'YYYY.MM.DD'.substring(inputValue?.length ?? 0)}</span>
              <SInput
                type="text"
                name={selectedDateFieldName}
                value={inputValue}
                onChange={handleInputChange}
                maxLength={10}
                placeholder="YYYY.MM.DD"
                autoComplete="off"
              />
            </SInputCustom>
            <IconCalendar style={{ width: '24' }} />
          </SInputWrapper>
          {error && dateType !== 'endDate' && <SErrorMessage>{error}</SErrorMessage>}
          {isOpen && (
            <SCalendarWrapper ref={containerRef}>
              <CalendarComponent />
            </SCalendarWrapper>
          )}
        </>
      )}
    </>
  );
};

export default CalendarInputForm;

const SInputCustom = styled('div', {
  position: 'relative',
  width: '80%',
  display: 'flex',
  alignItems: 'center',
  color: '$gray10',
  caretColor: '$gray10',

  '& .filled': {
    color: '$gray10',
  },
  '& .placeholder': {
    color: '$gray500',
  },

  '& input': {
    position: 'absolute',
    width: '100%',
    opacity: 0,
    caretColor: '$gray10',
    background: 'transparent',
    letterSpacing: '-0.24px',
    lineHeight: '26px',
    border: 'none',
    outline: 'none',
  },
});

const SCalendarWrapper = styled('div', {
  backgroundColor: '$gray700',
  padding: '10px',
  width: '320px',
  borderRadius: '16px',
  position: 'absolute',
  zIndex: '9999',
  marginTop: '10px',
});

const SErrorMessage = styled(ErrorMessage, {
  marginTop: '12px',
});

const SDotWrapper = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  position: 'absolute',
  alignItems: 'center',
});

const SInputWrapper = styled('div', {
  display: 'flex',
  width: '100%',
  padding: '18px 20px',
  color: '$gray10',
  background: '$gray800',
  borderRadius: 10,
  justifyContent: 'space-between',
  cursor: 'pointer',

  '@media (max-width: 768px)': {
    padding: '16px',
  },
});

const SDot = styled('div', {
  height: '5px',
  width: '5px',
  backgroundColor: '$gray400',
  borderRadius: '50%',
  position: 'absolute',
  top: '22px',
  display: 'flex',
});

const SInput = styled('input', {
  width: '80%',
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
  ...fontsObject.BODY_2_16_M,
  color: '$gray10',
  caretColor: '$transparent',
  '&::placeholder': {
    color: '$gray500',
    '@media (max-width: 768px)': {
      ...fontsObject.LABEL_5_11_SB,
    },
  },
});
