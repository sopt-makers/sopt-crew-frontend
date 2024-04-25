import { Dispatch, SetStateAction } from 'react';
import DatePicker from 'react-datepicker';
import { getMonth, getYear } from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css';
import { styled } from '@stitches/react';
import { Arrow } from '@components/button/Arrow';
import { css } from '@stitches/react';

interface Props {
  selectedDate: Date | null;
  setSelectedDate: Dispatch<SetStateAction<Date | null>>;
}

const Calendar = ({ selectedDate, setSelectedDate }: Props) => {
  return (
    <DatePicker
      dateFormat="yyyy.MM.dd"
      formatWeekDay={nameOfDay => nameOfDay.substring(0, 3).toUpperCase()}
      scrollableYearDropdown
      shouldCloseOnSelect
      yearDropdownItemNumber={100}
      placeholderText="YYYY.MM.DD"
      minDate={new Date('2000-01-01')}
      showPopperArrow={false}
      selected={selectedDate}
      className={datePickerStyleClassName}
      calendarClassName={calenderWrapperClassName}
      onKeyDown={e => {
        e.preventDefault();
      }}
      onChange={date => setSelectedDate(date)}
      renderCustomHeader={({ date, changeYear, decreaseMonth, increaseMonth }) => (
        <CustomHeaderContainerStyle>
          <div>
            <Month>
              {getMonth(date) + 1}월 {getYear(date)}
            </Month>
          </div>
          <div>
            <MonthButton type="button" onClick={decreaseMonth}>
              <Arrow direction={'left'} />
            </MonthButton>
            <MonthButton type="button" onClick={increaseMonth}>
              <Arrow direction={'right'} />
            </MonthButton>
          </div>
        </CustomHeaderContainerStyle>
      )}
    ></DatePicker>
  );
};

export default Calendar;

const datePickerStyle = css({
  width: '100%',
  padding: '18px 20px',
  display: 'flex',
  alignItems: 'center',
  fontAg: '16_medium_100',
  color: '$gray10',
  background: '$gray700',
  borderRadius: 10,
  '&::placeholder': {
    color: '$gray500',
  },

  '@tablet': {
    padding: '16px',
  },
});

const datePickerStyleClassName = datePickerStyle.toString();

const calenderWrapper = css({
  backgroundColor: '$gray700',
  color: 'white',
});

const calenderWrapperClassName = calenderWrapper.toString();

const CustomHeaderContainerStyle = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: '$gray700',
});

const MonthButton = styled('button', {
  width: '20px',
  height: '20px',
  borderRadius: '50%',

  '&:hover': {
    backgroundColor: 'rgba($WHITE, 0.08)',
  },
  '&:disabled': {
    cursor: 'default',
    backgroundColor: '$BG_COLOR',
    svg: {
      fill: '#575757',
    },
  },
});

const Month = styled('span', {
  color: '$gray30',
  fontSize: '1rem',
  fontStyle: 'normal',
  fontWeight: 700,
});
