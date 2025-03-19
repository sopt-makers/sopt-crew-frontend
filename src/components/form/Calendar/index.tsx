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

interface Props {
  selectedDate: string[] | null;
  setSelectedDate: Dispatch<SetStateAction<string[] | null>>;
  error?: string;
  type?: 'start' | 'end';
}

const CalendarInputForm = ({ selectedDate, setSelectedDate, error, type }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const { getValues } = useFormContext();

  const handleDateChange = (date: Date) => {
    const newDate = dayjs(date).format('YYYY.MM.DD');
    const [startDate, endDate] = getValues('detail.mDate') ?? ['', ''];

    // 첫 번째 날짜 선택
    if (!startDate && !endDate) {
      return setSelectedDate([newDate, '']);
    }

    // startDate만 선택된 상태에서 새로운 날짜 선택
    if (startDate && !endDate) {
      return newDate < startDate
        ? setSelectedDate([newDate, '']) // 새로운 날짜가 startDate보다 이전이면 startDate 변경
        : setSelectedDate([startDate, newDate]); // 아니면 end 설정
    }

    // end 만 선택된 상태에서 새로운 날짜 선택
    if (!startDate && endDate) {
      return newDate > endDate
        ? setSelectedDate(['', newDate]) // 새로운 날짜가 end보다 이후면 end 변경
        : setSelectedDate([newDate, endDate]); // 아니면 start 설정
    }

    // start 와 end  모두 선택된 상태에서 새로운 날짜 선택
    if (startDate && endDate) {
      if (newDate < startDate) {
        return setSelectedDate([newDate, endDate]); // start보다 이전 날짜 클릭 → start 변경
      }
      if (newDate > endDate) {
        return setSelectedDate([startDate, newDate]); // end보다 이후 날짜 클릭 → end 변경
      }

      // start와 end 사이의 날짜 선택
      if (newDate > startDate && newDate < endDate) {
        return type === 'start'
          ? setSelectedDate([newDate, endDate]) // type이 start일 때 → start 변경
          : setSelectedDate([startDate, newDate]); // type이 end일 때 → end 변경
      }
    }
  };

  const CalendarComponent = () => {
    return (
      <>
        <Calendar
          value={
            selectedDate && selectedDate.length === 2
              ? [dayjs(selectedDate[0], 'YYYY.MM.DD').toDate(), dayjs(selectedDate[1], 'YYYY.MM.DD').toDate()]
              : null
          }
          selectRange={true}
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
            <SInput value={type === 'start' ? selectedDate?.[0] : selectedDate?.[1]} placeholder="YYYY.MM.DD" />
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
            <SInput value={type === 'start' ? selectedDate?.[0] : selectedDate?.[1]} placeholder="YYYY.MM.DD" />
            <SCalendarIcon />
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
  '& > react-calendar__tile--range': {},
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

const SCalendarIcon = styled(CalendarIcon, {
  width: '24px',
  height: '24px',

  '@media (max-width: 430px)': {
    width: '20px',
    height: '20px',
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
