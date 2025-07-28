
import { financialTimelineFields } from "./status-progress-fields";
import FieldInput from "./base-fields";


const FinancialTimeline = () => {
  return (
    <div className="mb-3">
        <div className="border-b-1 mb-5">
            <h2 className='text-base font-bold'>Financial & Timeline</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {financialTimelineFields.map(field => (
            <FieldInput key={field.name} {...field} />
            ))}
        </div>
    </div>
  )
}

export default FinancialTimeline