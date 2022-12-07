import { useCallback, useState } from 'react'
import { cloneDeep } from 'lodash'
import useInput from './hooks/useInput'
import TodoList from './TodoList'

const Todo = () => {

  const [firstName, setFirstName, resetFirstName, bindFirstName] = useInput("")
  const [lastName, setLastName, resetLastName, bindLastName] = useInput("")

  const [list, setList] = useState([]);
  const [listIndex, setListIndex] = useState(null)
  const [errMessage, setErrMessage] = useState('')

  const handleClick = (e) => {
    e.preventDefault();
    if (firstName === "" || lastName === "") {
      setErrMessage("Please privide all details")
      return false;
    }

    const newList = cloneDeep(list);
    if (listIndex != null) {
      newList[listIndex].firstName = firstName
      newList[listIndex].lastName = lastName
    } else {
      newList.push({ firstName: firstName, lastName: lastName })
    }
    setList(newList)

    resetFirstName()
    resetLastName()
    setListIndex(null)
    setErrMessage('')
  }

  const handleEdit = useCallback((index) => {
    setFirstName(list[index].firstName)
    setLastName(list[index].lastName)
    setListIndex(index)
  }, [JSON.stringify(list)])


  const handleDelete = useCallback((i) => {
    const newlist = list.filter((item, index) => index !== i)
    setList(newlist)
  }, [JSON.stringify(list)])

  return (
    <div>
      <div className="row">
        <div className="col-md-3">
          <input type="text" placeholder="First Name" className="form-control" {...bindFirstName} />
        </div>
        <div className="col-md-3">
          <input type="text" placeholder="Last Name" className="form-control" {...bindLastName} />
        </div>
        <div className="col-md-2">
          <button type="button" className="btn btn-outline-dark" onClick={handleClick}>{listIndex !== null ? 'Update' : '+ Add'}</button>
        </div>
      </div>
      <div className="error">
        {errMessage ? errMessage : ""}
      </div>
      <div className="todolist">
        {list.length > 0 ? <TodoList
          list={list}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        /> : ""}
      </div>
    </div>
  )
}

export default Todo