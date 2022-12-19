import { useState, useEffect, useContext } from "react"
import useInput from './hooks/useInput'
import UserContext from './hooks/userContext'
import { Form } from "react-bootstrap"
import Button from 'react-bootstrap/Button';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const UserForm = ({ handleCloseBtn }) => {
  const [firstName, setFirstName, resetFirstName, bindFirstName] = useInput("")
  const [lastName, setLastName, resetLastName, bindLastName] = useInput("")
  const [email, setEmail, resetEmail, bindEmail] = useInput("")
  const [gender, setGender, resetGender, bindGender] = useInput("")
  const [dob, setDob] = useState(new Date())
  const { handleList, isEdit, editData, handleEditCloseBtn } = useContext(UserContext);
  const [errMessage, setErrMessage] = useState('')
  const today = new Date();

  const handleClick = (e) => {
    e.preventDefault();
    if (firstName === "" || lastName === "" || email === "" || gender === "" || dob === "") {
      setErrMessage("Please privide all details")
      return false;
    }
    handleList({ firstname: firstName, lastname: lastName, email: email, gender: gender, dob: dob.toLocaleDateString('en-US') })

    resetFirstName()
    resetLastName()
    resetEmail()
    resetGender()
    setDob('')
    setErrMessage('')
    handleEditCloseBtn()
  }

  useEffect(() => {
    if (isEdit) {
      setFirstName(editData.firstname)
      setLastName(editData.lastname)
      setEmail(editData.email)
      setGender(editData.gender)
      setDob(new Date(editData.dob))
    }
  }, [isEdit, JSON.stringify(editData)])
  return (
    <div className="userForm">
      <div className="closeBtn"><i className="fa fa-close" onClick={handleCloseBtn}></i></div>
      <div className="row mt-4">
        <div className="col-md-3">
          <input value={firstName} type="text" placeholder="First Name" className="form-control" {...bindFirstName} />
        </div>
        <div className="col-md-3">
          <input value={lastName} type="text" placeholder="Last Name" className="form-control" {...bindLastName} />
        </div>
        <div className="col-md-3">
          <input value={email} type="email" placeholder="Email" className="form-control" {...bindEmail} />
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-md-3">
          <Form.Label>Gender</Form.Label>
          <Form.Check
            inline
            value="male"
            type="radio"
            label="Male"
            name="gender"
            {...bindGender}
            id="type-1"
            checked={gender === 'male'}
          />
          <Form.Check
            inline
            value="female"
            type="radio"
            label="Female"
            name="gender"
            id="type-2"
            {...bindGender}
            checked={gender === 'female'}
          />
        </div>
        <div className="col-md-3">
          <DatePicker
            value={dob}
            selected={dob}
            dateFormat="dd/MM/yyyy"
            className="form-control"
            onChange={(e) => {
              setDob(e);
            }}
            minDate={today}
            customInput={
              <input
                type="text"
                id="validationCustom01"
              />
            }
          />
        </div>
        <div className="col-md-2">
          <Button variant="primary" onClick={handleClick}> Submit</Button>

          {/* <button type="button" className="btn btn-outline-dark" onClick={handleClick}>{listIndex !== null ? 'Update' : '+ Add'}</button> */}
        </div>
      </div>
      <div className="error">
        {errMessage ? errMessage : ""}
      </div>
    </div>
  )
}

export default UserForm