import React, { useState, forwardRef, useImperativeHandle, useEffect } from 'react';
import { EuiComboBox } from '@elastic/eui';

const Tags = forwardRef((props, ref) => {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    setTags(props.value ? props.value.split(',').map(x => ({ label: x })) : [])
  }, [props.value])

  const onChange = val => {
    setTags(val);
  };

  const onCreateOption = (searchValue) => {
    const normalizedSearchValue = searchValue.trim().toLowerCase();

    if (!normalizedSearchValue) {
      return;
    }

    const newOption = {
      label: searchValue,
    };

    // Select the option.
    setTags([...tags, newOption]);
  };

  useImperativeHandle(ref, () => ({
    tags
  }));

  return (
    <EuiComboBox
      placeholder="Select or create options"
      className={props.className}
      selectedOptions={tags}
      onChange={onChange}
      onCreateOption={onCreateOption}
      isClearable={true}
      data-test-subj="demoComboBox"
    />
  );
})

export default Tags;