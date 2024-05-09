import { Dispatch, SetStateAction, useEffect, useRef, useCallback } from 'react';
import { styled } from 'stitches.config';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import dayjs from 'dayjs';
import ErrorMessage from '../ErrorMessage';
import { useDisplay } from '@hooks/useDisplay';
import BottomSheetDialog from '../Select/BottomSheetSelect/BottomSheetDialog';
interface Props {
  selectedDate: string | null;
  setSelectedDate: Dispatch<SetStateAction<string | null>>;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  error?: string;
}

const CalendarModal = ({ selectedDate, setSelectedDate, isOpen, setIsOpen, error }: Props) => {
  const CalendarComponent = () => {
    return (
      <Calendar
        value={selectedDate ? dayjs(selectedDate).toDate() : null}
        onClickDay={date => setSelectedDate(dayjs(date).format('YYYY.MM.DD'))}
        formatDay={(locale, date) => dayjs(date).format('D')}
        formatShortWeekday={(locale, date) => ['SUN', 'MOM', 'TUE', 'WED', 'THU', 'FRI', 'SAT'][date.getDay()]}
        showNeighboringMonth={false}
        next2Label={null}
        prev2Label={null}
        minDetail="month"
        maxDetail="month"
        tileContent={({ date, view }) => {
          if (selectedDate == dayjs(date).format('YYYY.MM.DD')) {
            return (
              <SDotWrapper>
                <SDot></SDot>
              </SDotWrapper>
            );
          }
        }}
      />
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
        <div>
          <BottomSheetDialog label={''} handleClose={() => setIsOpen(false)} isOpen={isOpen}>
            <CalendarComponent />
            {error && <SErrorMessage>{error}</SErrorMessage>}
          </BottomSheetDialog>
        </div>
      ) : (
        <SCalendarWrapper ref={containerRef}>
          <CalendarComponent />
          {error && <SErrorMessage>{error}</SErrorMessage>}
        </SCalendarWrapper>
      )}
    </>
  );
};

export default CalendarModal;

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

const SDot = styled('div', {
  height: '5px',
  width: '5px',
  backgroundColor: '$gray400',
  borderRadius: '50%',
  position: 'absolute',
  top: '22px',
  display: 'flex',
});
