import { useState } from 'react'

const useInput = (initialValue) => {
  const [value, setValue] = useState(initialValue);
  const reset = () => {
    setValue(initialValue)
  }
  const bind = {
    onChange: e => {
      setValue(e.target.value)
    }
  }
  return [value, setValue, reset, bind]
}

export default useInput;