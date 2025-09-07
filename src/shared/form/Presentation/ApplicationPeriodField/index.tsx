import CalendarInputForm from '@shared/form/Calendar';
import FormController from '@shared/form/FormController';
import HelpMessage from '@shared/form/HelpMessage';
import Label from '@shared/form/Label';
import { FieldError } from 'react-hook-form';
import { styled } from 'stitches.config';

const ApplicationPeriodField = () => {
  return (
    <div>
      <Label required={true}>신청 기간</Label>
      <HelpMessage>설정한 신청 기간 시작일의 자정(AM 12:00)에 '신청하기' 버튼이 활성화돼요</HelpMessage>
      <SApplicationFieldWrapper>
        <SApplicationField>
          <FormController
            name="dateRange"
            render={({ field, formState: { errors } }) => {
              const dateError = errors as
                | {
                    dateRange?: FieldError[];
                  }
                | undefined;
              return (
                <CalendarInputForm
                  selectedDate={field.value}
                  setSelectedDate={field.onChange}
                  selectedDateFieldName={field.name}
                  error={
                    (dateError?.dateRange as FieldError[])?.[0]?.message ||
                    (dateError?.dateRange as FieldError[])?.[1]?.message
                  }
                  dateType="startDate"
                />
              );
            }}
          ></FormController>
        </SApplicationField>
        <span style={{ marginTop: '14px' }}>-</span>
        <SApplicationField>
          <FormController
            name="dateRange"
            render={({ field }) => (
              <CalendarInputForm
                selectedDate={field.value}
                setSelectedDate={field.onChange}
                selectedDateFieldName={field.name}
                dateType="endDate"
              />
            )}
          ></FormController>
        </SApplicationField>
      </SApplicationFieldWrapper>
    </div>
  );
};

export default ApplicationPeriodField;

const SApplicationFieldWrapper = styled('div', {
  display: 'flex',
  color: '$gray500',
  gap: '12px',
});
const SApplicationField = styled('div', {
  width: '100%',
  maxWidth: '205px',

  '@media (max-width: 768px)': {
    maxWidth: '151px',
  },
});
