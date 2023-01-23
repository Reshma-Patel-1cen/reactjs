import React, { useState, useEffect, useCallback, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

const User = () => {
  const gridRef = useRef();
  const navigate = useNavigate();
  const [rowData, setRowData] = useState([]);
  const IconComponent = ({ data }) => {
    return <span className='grid-icon'><i className='bi bi-pencil' onClick={() => handleEdit(data.id)} /><i className='bi bi-trash' onClick={() => handleDelete(data.id)} /></span>
  }
  const [columnDefs] = useState([
    { field: 'id', headerName: 'id', hide: true },
    { field: 'firstname', headerName: 'First Name', sortable: true, filter: true, unSortIcon: true, suppressMovable: true },
    { field: 'lastname', headerName: 'Last Name', sortable: true, filter: true, unSortIcon: true },
    { field: 'user_name', headerName: 'User Name', sortable: true, filter: true, unSortIcon: true },
    { field: 'user_email', headerName: 'Email', resizable: true, sortable: true, filter: true, unSortIcon: true },
    { field: 'user_role', headerName: 'Roles', sortable: true, filter: true, unSortIcon: true },
    { field: 'status', headerName: 'Status', sortable: true, filter: true, unSortIcon: true },
    { field: 'action', headerName: 'Action', maxWidth: '100', suppressMovable: true, cellRenderer: IconComponent }
  ])
  const handleEdit = (id) => {
    navigate("/users/" + id)
  }
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user") === true) {
      fetch('http://localhost:8000/api/v1.1/user/' + id, { method: 'DELETE' })
        .then(response => {
          getUsers()
        })
        .catch((err) => {
          console.log(err.message);
        });
    } else {
      return false
    }
  }

  const getUsers = useCallback(async() => {
   return await fetch('http://localhost:8000/api/v1.1/users')
      .then((response) => response.json())
      
  },[])

  useEffect(() => {
    getUsers().then((res) => {
      const result = [];
      res.data.map(x => {
        if(x.user_id!==1){
        result.push({ "id": x.user_id, "firstname": x.first_name, "lastname": x.last_name, "user_email": x.user_email, "user_name": x.user_name, "user_role": JSON.parse(x.user_role).map((element) => element.label).join(", "), "status": x.status === 1 ? "Active" : "Deactive" })
        }
        return result
      })

      setRowData(result);
    })
    .catch((err) => {
      console.log(err.message);
    });
  }, [getUsers]);

  const onFilterTextBoxChanged = useCallback(() => {
    gridRef.current.api.setQuickFilter(
      document.getElementById('filter-text-box').value
    );
  }, []);

  return (
    <div>
      <div className='d-flex justify-content-between filter'>
        <input type="text" id="filter-text-box" className="form-control w-75" placeholder="Enter any text to filter." onInput={onFilterTextBoxChanged} />
        <NavLink to="addEditUser"><button className='btn btn-primary'>Create New User</button></NavLink>
      </div>
      <div className="ag-theme-alpine" style={{ height: 400 }}>
        <AgGridReact
          ref={gridRef}
          pagination={true}
          // paginationPageSize={7}
          rowData={rowData}
          columnDefs={columnDefs}>
        </AgGridReact>
      </div>
    </div>

  );
};

export default User