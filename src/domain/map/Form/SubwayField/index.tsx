import FormController from '@shared/form/FormController';
import HelpMessage from '@shared/form/HelpMessage';
import Label from '@shared/form/Label';
import SearchSubway from './SearchSubway';

const SubwayField = () => {
  return (
    <div>
      <Label size="small" required>
        주변 지하철역
      </Label>
      <HelpMessage>가까운 지하철역을 작성해주세요. 최대 3개까지 선택할 수 있어요. </HelpMessage>
      <FormController
        name="subwayStations"
        render={({ field: { value, onChange }, fieldState: { error } }) => {
          return (
            <div>
              <SearchSubway value={value} onChange={onChange} error={error?.message} />
            </div>
          );
        }}
      ></FormController>
    </div>
  );
};

export default SubwayField;
