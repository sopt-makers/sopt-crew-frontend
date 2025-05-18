import FormController from '@components/form/FormController';
import Select from '@components/form/Select';
import { categories } from '@data/categories';
import { FieldError } from 'react-hook-form';

const CategoryField = () => {
  return (
    <FormController
      name="category"
      defaultValue={categories[0]}
      render={({ field: { value, onChange, onBlur }, fieldState }) => {
        const error = (fieldState.error as (FieldError & { value: FieldError }) | undefined)?.value;
        return (
          <div style={{ width: '260px' }}>
            <Select
              label="모임 카테고리"
              options={categories}
              required
              error={error?.message}
              value={value}
              onChange={onChange}
              onBlur={onBlur}
            />
          </div>
        );
      }}
    ></FormController>
  );
};

export default CategoryField;
