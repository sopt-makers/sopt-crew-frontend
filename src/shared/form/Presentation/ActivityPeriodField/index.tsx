import CalendarInputForm from '@shared/form/Calendar';
import FormController from '@shared/form/FormController';
import Label from '@shared/form/Label';
import OfficialScheduleTooltip from '@shared/form/Presentation/ActivityPeriodField/OfficialScheduleTooltop';
import { Flex } from '@shared/util/layout/Flex';
import { FieldError } from 'react-hook-form';
import { styled } from 'stitches.config';

const ActivityPeriodField = () => {
  return (
    <div>
      <Flex justify="between">
        <Label required={true} size="small">
          활동 기간
        </Label>
        <OfficialScheduleTooltip />
      </Flex>
      <SApplicationFieldWrapper>
        <SApplicationField>
          <FormController
            name="detail.mDateRange"
            render={({ field, formState: { errors } }) => {
              const dateError = errors.detail as
                | (FieldError & {
                    mDateRange?: FieldError[];
                  })
                | undefined;
              return (
                <CalendarInputForm
                  selectedDate={field.value}
                  setSelectedDate={field.onChange}
                  selectedDateFieldName={field.name}
                  error={
                    (dateError?.mDateRange as FieldError[])?.[0]?.message ||
                    (dateError?.mDateRange as FieldError[])?.[1]?.message
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
            name="detail.mDateRange"
            render={({ field, formState: { errors } }) => {
              const dateError = errors.detail as
                | (FieldError & {
                    mDateRange?: FieldError[];
                  })
                | undefined;

              return (
                <CalendarInputForm
                  selectedDate={field.value}
                  setSelectedDate={field.onChange}
                  dateType="endDate"
                  error={
                    (dateError?.mDateRange as FieldError[])?.[0]?.message ||
                    (dateError?.mDateRange as FieldError[])?.[1]?.message
                  }
                  selectedDateFieldName={field.name}
                />
              );
            }}
          ></FormController>
        </SApplicationField>
      </SApplicationFieldWrapper>
    </div>
  );
};

export default ActivityPeriodField;

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
