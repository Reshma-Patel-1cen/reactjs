import { useEffect, useState, useCallback } from 'react';
import { Controller } from 'react-hook-form';
import Select from 'react-select';
import { WithContext as ReactTags } from 'react-tag-input';

const Previleges = ({ moduleIndex, privilegesIndex, register, control, errors, removePrivileges }) => {

  const [options, setOptions] = useState([])
  const KeyCodes = {
    comma: 188,
    enter: 13,
  };

  const validateTag = tagText => {
    const regex = new RegExp(/^[A-Za-z*_-]*$/)
    return regex.test(tagText);
  }

  const delimiters = [KeyCodes.comma, KeyCodes.enter];

  const getPermissionList = useCallback(async () => {

    await fetch('http://localhost:8000/api/v1.1/permissions')
      .then((response) => response.json())
      .then((data) => {
        const permissions = data.data
        const optionArr = [];
        permissions.map(x => {
          optionArr.push({ value: x.permission_id, label: x.permission_name })
          return optionArr;
        })
        setOptions(optionArr)
      })
      .catch((err) => {
        console.log("error msg", err.message);
      });
  }, [])

  useEffect(() => {
    getPermissionList();

  }, [getPermissionList]);
  
  return (
    <div>

      <div className="row">
        <div className="col-md-5">
          <label>Pattern(s)</label>
          <Controller
            control={control}
            name={`module.${moduleIndex}.privileges.${privilegesIndex}.pattern`}
            rules={{
              validate: (val) => {
                if (!val.length) return "Please enter pattern.";
                const isValid = val.every(x => validateTag(x))
                if (!isValid) {
                  return "Only *,-,_ allowed";
                }
              }
            }}
            render={({
              field: { onChange, onBlur, defaultValue, value, name, ref },
            }) => (
              <ReactTags
                tags={value.map(x => ({ id: x, text: x, className: validateTag(x) ? '' : 'text-danger' }))}
                classNames={{
                  tagInputField: 'form-control',
                  placeHolder:"enter fruits"
                }}
                delimiters={delimiters}
                placeholder = "Enter pattern"
                handleDelete={index => onChange(value.filter((t, i) => i !== index))}
                handleAddition={tag => onChange([...value, tag.text])}
                inputFieldPosition="top"
                autocomplete
                editable
                innerRef={ref}
              />
            )}
          />
          {errors.module?.[moduleIndex]?.privileges?.[privilegesIndex]?.pattern && <span className='error'>{errors.module?.[moduleIndex]?.privileges?.[privilegesIndex]?.pattern.message}</span>}

        </div>
        <div className="col-md-5">
          <label>Permission(s)</label>
          <Controller
            control={control}
            name={`module.${moduleIndex}.privileges.${privilegesIndex}.permissions`}
            rules={{
              required: {
                message: "Item type is required.",
              },
            }}
            render={({
              field: { onChange, onBlur, defaultValue, value, name, ref },
            }) => (
              <Select
                {...register(`module.${moduleIndex}.privileges.${privilegesIndex}.permissions`, { required: true })}
                options={options}
                onChange={e => onChange(e.map(x => x.value))}
                isMulti
                value={options.filter(x => value && value.includes(x.value))}
                name={name}
                onBlur={onBlur}
                ref={ref}
              />
            )}
          />
          {errors.module?.[moduleIndex]?.privileges?.[privilegesIndex]?.permissions && <span className='error'>Please select at least one permission</span>}
        </div>
        <div className='col-md-2'>
          <button type="button" className='btn btn-defult removeBtn' onClick={() => removePrivileges(privilegesIndex)}>
            <i className='bi bi-trash' />
          </button></div>
      </div>
    </div>
  )
}
export default Previleges