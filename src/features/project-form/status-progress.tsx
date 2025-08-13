
import { statusProgressFields } from "./status-progress-fields";
import FieldInput from "./base-fields";

interface StatusProgressProps {
  disabled?: boolean;
}

const StatusProgress = ({disabled = false}: StatusProgressProps) => {
  return (
    <div className="mb-3">
        <div className="border-b-1 mb-5">
            <p className='text-base font-bold'>Status & Progress</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {statusProgressFields.map(field => (
                <FieldInput key={field.name} {...field} disabled={disabled} />
            ))}
      </div>
    </div>
  )
}

export default StatusProgress