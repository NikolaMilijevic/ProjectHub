
import { basicInfoFields } from "./status-progress-fields"
import FieldInput from "./base-fields"

const BasicInfo = () => {
  return (
    <div className="mb-3">
      <div className="border-b-1 mb-5">
        <h2 className='text-base font-bold'>Basic Information</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {basicInfoFields.slice(0, 2).map(field => (
        <FieldInput key={field.name} {...field} />
        ))}
      </div> 
      <div className="mt-2">
        {basicInfoFields.slice(2).map(field => (
        <FieldInput key={field.name} {...field} />
        ))}
      </div>
    </div>
  )
}

export default BasicInfo