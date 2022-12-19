import { useState, useEffect, useContext } from 'react';
import UserContext from './hooks/userContext';
import Button from 'react-bootstrap/Button';
import UserForm from './UserForm';

const AddItem = ({ onBtExport }) => {
  const [showform, setShowForm] = useState(false)
  const { isEdit, handleEditCloseBtn } = useContext(UserContext);

  const handleAddForm = () => {
    setShowForm(true)
  }
  const handleCloseBtn = () => {
    setShowForm(false)
    handleEditCloseBtn()
  }
  useEffect(() => {
    if (isEdit) {
      setShowForm(true)
      // handleEditCloseBtn()
    }
  }, [isEdit, showform])
  return (
    <>
      <div className="addBtn">
        <Button variant="primary" onClick={handleAddForm}>Add</Button>
        <Button variant="primary" onClick={onBtExport}>Export to Excel</Button>
      </div>
      <div className="row m-0">
        {showform ? <UserForm handleCloseBtn={handleCloseBtn} /> : ""}
      </div>
    </>
  )
}

export default AddItem

