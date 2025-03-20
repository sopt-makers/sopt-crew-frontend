import { Dispatch, SetStateAction, useEffect, useRef, useCallback, useState } from 'react';
import { styled } from 'stitches.config';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import dayjs from 'dayjs';
import ErrorMessage from '../ErrorMessage';
import { useDisplay } from '@hooks/useDisplay';
import BottomSheetDialog from '../Select/BottomSheetSelect/BottomSheetDialog';
import { fontsObject } from '@sopt-makers/fonts';
import CalendarIcon from '@assets/svg/calendar_big.svg';
import CalendarMobileIcon from '@assets/svg/calendar_small.svg';
import { useFormContext } from 'react-hook-form';

/**
 * CalendarInputForm
 * @param selectedDate 선택된 날짜
 * @param setSelectedDate 선택된 날짜 변경 함수
 * @param error 에러 메시지
 * @param dateType 캘린더 타입, startDate(시작일 캘린더), endDate(마감일 캘린더), singleSelect(단일선택 캘린더)
 */

interface Props {
  selectedDate: string[] | null;
  setSelectedDate: Dispatch<SetStateAction<string[] | null>>;
  selectedDateFieldName: string;
  error?: string;
  dateType?: 'startDate' | 'endDate' | 'singleSelect';
}

const CalendarInputForm = ({ selectedDate, setSelectedDate, error, dateType, selectedDateFieldName }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const { getValues } = useFormContext();

  const handleDateChange = (date: Date) => {
    const newDate = dayjs(date).format('YYYY.MM.DD');
    const [startDate, endDate] = getValues(selectedDateFieldName) ?? ['', ''];

    if (dateType === 'singleSelect') {
      setSelectedDate([newDate]);
      return;
    }

    // 첫 번째 날짜 선택
    if (!startDate && !endDate) {
      return setSelectedDate([newDate, '']);
    }

    // startDate 만 선택된 상태,  새로운 날짜 선택
    if (startDate && !endDate) {
      // 새로운 날짜가 startDate 보다 전이면 startDate 변경
      return newDate < startDate ? setSelectedDate([newDate, '']) : setSelectedDate([startDate, newDate]);
    }

    // end 만 선택된 상태,  새로운 날짜 선택
    if (!startDate && endDate) {
      // 새로운 날짜가 end보다 이후면 end 변경
      return newDate > endDate ? setSelectedDate(['', newDate]) : setSelectedDate([newDate, endDate]);
    }

    // start 와 end 모두 선택된 상태,  새로운 날짜 선택
    if (startDate && endDate) {
      // start보다 이전 날짜 클릭 → start 변경
      if (newDate < startDate) {
        return setSelectedDate([newDate, endDate]);
      }
      // end보다 이후 날짜 클릭 → end 변경
      if (newDate > endDate) {
        return setSelectedDate([startDate, newDate]);
      }

      // start와 end 사이의 날짜 선택
      if (newDate > startDate && newDate < endDate) {
        // 캘린더가 시작일 캘린더이냐 종료일 캘린더이냐
        return dateType === 'startDate' ? setSelectedDate([newDate, endDate]) : setSelectedDate([startDate, newDate]);
      }
    }
  };

  const CalendarComponent = () => {
    return (
      <>
        <Calendar
          value={
            selectedDate
              ? [dayjs(selectedDate[0], 'YYYY.MM.DD').toDate(), dayjs(selectedDate[1], 'YYYY.MM.DD').toDate()]
              : null
          }
          selectRange={dateType !== 'singleSelect'}
          onClickDay={handleDateChange}
          formatDay={(locale, date) => dayjs(date).format('D')}
          formatShortWeekday={(locale, date) => ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'][date.getDay()] ?? ''}
          showNeighboringMonth={false}
          next2Label={null}
          prev2Label={null}
          minDetail="month"
          maxDetail="month"
          calendarType="gregory"
          tileContent={({ date, view }) => {
            if (selectedDate?.includes(dayjs(date).format('YYYY.MM.DD'))) {
              return (
                <SDotWrapper>
                  <SDot></SDot>
                </SDotWrapper>
              );
            }
          }}
        />
        {error && <SErrorMessage>{error}</SErrorMessage>}
      </>
    );
  };
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { isDesktop, isMobile, isTablet } = useDisplay();

  const handleOutsideClick = useCallback((event: any) => {
    if (!containerRef.current || !containerRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    if (isDesktop && !isMobile && !isTablet) {
      document.addEventListener('mousedown', handleOutsideClick);
      return () => {
        document.removeEventListener('mousedown', handleOutsideClick);
      };
    }
  }, [isDesktop, containerRef, setIsOpen, handleOutsideClick]);

  return (
    <>
      {!isDesktop && (isMobile || isTablet) ? (
        <>
          <SInputWrapper onClick={() => setIsOpen(true)}>
            <SInput value={dateType === 'endDate' ? selectedDate?.[1] : selectedDate?.[0]} placeholder="YYYY.MM.DD" />
            {isMobile ? <CalendarMobileIcon /> : <CalendarIcon />}
          </SInputWrapper>
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
            <SInput value={dateType === 'endDate' ? selectedDate?.[1] : selectedDate?.[0]} placeholder="YYYY.MM.DD" />
            <CalendarIcon />
          </SInputWrapper>
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
