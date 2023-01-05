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
  const [tags, setTags] = useState([
    { id: 'red', text: 'red*' },
    { id: 'hur', text: 'hur*' },

  ]);
  const handleDelete = (i) => {
    setTags(tags.filter((tag, index) => index !== i));
  };

  const handleAddition = (tag) => {
    setTags([...tags, tag]);
  };

  const handleDrag = (tag, currPos, newPos) => {
    const newTags = tags.slice();

    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);

    // re-render
    setTags(newTags);
  };

  const validateTags = (index) => {
    console.log('The tag at index ' + index + ' was clicked');
  };

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
  console.log("errors", errors)
  return (
    <div>

      <div className="row">
        <div className="col-md-5">
          <label>Pattern(s)</label>
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
              <ReactTags
                tags={tags}
                // suggestions={suggestions}
                {...register(`module.${moduleIndex}.privileges.${privilegesIndex}.patterns`, { required: true, pattern: /^[a-zA-Z*_-]+$/g })}
                classNames={{
                  tagInputField: 'form-control'
                }}
                handleInputChange = {validateTags}
                delimiters={delimiters}
                handleDelete={handleDelete}
                handleAddition={handleAddition}
                handleDrag={handleDrag}
                handleTagClick={validateTags}
                inputFieldPosition="top"
                autocomplete
                editable
              />
            )}
          />
          {/* <input placeholder="Enter Pattern" className="form-control" {...register(`module.${moduleIndex}.privileges.${privilegesIndex}.patterns`, { required: true, pattern: /^[a-zA-Z*_-]+$/g })} /> */}
          {errors.module?.[moduleIndex]?.privileges?.[privilegesIndex]?.patterns?.type === "required" && <span className='error'>Please enter pattern</span>}
          {errors.module?.[moduleIndex]?.privileges?.[privilegesIndex]?.patterns?.type === "pattern" && (
            <span className='error'>Only *,-,_ allowed</span>
          )}
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