import { useFieldArray } from 'react-hook-form';
import Privileges from './Privileges'

const Module = ({ moduleIndex, register, control, errors, removeModule }) => {

  const { fields, remove, append } = useFieldArray({
    control,
    name: `module[${moduleIndex}].privileges`
  });

  const addPrivileges = (e) => {
    e.preventDefault()
    append({ pattern: "", permissions: [] })

  }
  return (
    <div className="border module-wrapper">
      <div className="row" >
        <div className="col-md-6">
          <label>Module Name <span className='error'>*</span></label>
          <input type="text" placeholder="Enter role name" className="form-control" {...register(`module.${moduleIndex}.moduleName`, { required: true })} />
          {errors.module?.[moduleIndex]?.moduleName && <span className='error'>Please enter module name</span>}
        </div>
        <div className='col-md-4'></div>
        <div className='col-md-2'>
          <button type="button" className='btn btn-outline-primary removeBtn' onClick={() => removeModule(moduleIndex)}>
            Delete Module
          </button>
        </div>
      </div>
      {fields.map((item, index) => {
        return <Privileges
          key={item.id}
          moduleIndex={moduleIndex}
          privilegesIndex={index}
          register={register}
          control={control}
          errors={errors}
          removePrivileges={remove}
        />
      })}
      <button className='btn btn-outline-secondary' onClick={addPrivileges}>+ Add Privileges</button>
    </div>
  )
}
export default Module