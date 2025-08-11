import { financialTimelineFields } from "./status-progress-fields";
import FieldInput from "./base-fields";
import DatePickerField from "../date-picker-field";


const FinancialTimeline = () => {
  return (
    <div className="mb-3">
        <div className="border-b-1 mb-5">
            <p className='text-base font-bold'>Financial & Timeline</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {financialTimelineFields.map(field => {
          if (field.type === "date") {
            return (
              <DatePickerField
                key={field.name}
                name={field.name}
                label={field.label}
                placeholder={field.placeholder}
              />
            );
          } else {
            return <FieldInput key={field.name} {...field} />;
          }
        })}
      </div>
    </div>
  )
}

export default FinancialTimeline