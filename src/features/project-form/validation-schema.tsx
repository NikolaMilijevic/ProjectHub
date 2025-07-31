import * as Yup from 'yup';

export const validationSchema = Yup.object({
  projectTitle: Yup.string()
  .transform(value =>
    typeof value === 'string'
    ? value.trim().replace(/\s+/g, ' ')
    : value
  )
  .test(
    'not-empty-after-trim',
    'ProjectTitle cannot be only spaces',
    (value) => !!value && value.trim() !== ''
  )
  .min(3, 'ProjectTitle must be at least 3 characters')
  .max(100, 'ProjectTitle must be at most 100 characters')
  .required('ProjectTitle is required'),
  client: Yup.object().shape({
  clientName: Yup.string()
  .transform(value =>
    typeof value === 'string'
    ? value.trim().replace(/\s+/g, ' ')
    : value
  )
  .test(
    'not-empty-after-trim',
    'ProjectTitle cannot be only spaces',
    (value) => !!value && value.trim() !== ''
  )
  .min(2, 'Client must be at least 2 characters')
  .max(100, 'Client must be at most 100 characters')
  .required('Client is required')}),

  description: Yup.string()
  .transform(value =>
    typeof value === 'string'
    ? value.trim().replace(/\s+/g, ' ')
    : value
  )
  .test(
    'not-empty-after-trim',
    'ProjectTitle cannot be only spaces',
    (value) => !!value && value.trim() !== ''
  )
  .min(10, 'Description must be at least 10 characters')
  .max(500, 'Description must be at most 500 characters')
  .required('Description is required'),
  budget: Yup.number()
  .typeError('Budget must be a valid number')
  .test(
    'is-integer',
    'Budget must be a whole number without decimals or letters',
    value => Number.isInteger(value)
  )
  .positive('Budget must be positive')
  .max(10000000, 'Budget must be at most 10M')
  .required('Budget is required'),
  startDate: Yup.date()
  .required('Start Date is required'),
  dueDate: Yup.date()
  .min(Yup.ref('startDate'), 'Due Date must be after Start Date')
  .required('Due Date is required'),
  initialStatus: Yup.string()
  .oneOf(['Planning', 'InProgress', 'Completed'], 'Invalid status')
  .required('Status is required'),
  priorityLevel: Yup.string()
  .oneOf(['Low', 'Medium', 'High'], 'Invalid priority level')
  .required('Priority level is required'),
  progress: Yup.number()
  .typeError('Budget must be a valid number')
  .test(
    'is-integer',
    'Budget must be a whole number without decimals or letters',
    value => Number.isInteger(value)
  )
  .min(0, 'Progress must be at least 0')
  .max(100, 'Progress must be at most 100')
  .required('Progress is required')
});