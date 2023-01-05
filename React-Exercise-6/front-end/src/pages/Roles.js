import React, { useState, useEffect, useCallback, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

const Roles = () => {
  const gridRef = useRef();
  const navigate = useNavigate();
  const [rowData, setRowData] = useState([]);
  const IconComponent = ({ rowIndex, data }) => {
    return <span className='grid-icon'><i className='bi bi-pencil' onClick={() => handleEdit(data.id)} /><i className='bi bi-trash' onClick={() => handleDelete(data.id)} /></span>
  }
  const [columnDefs] = useState([
    { field: 'role_id', headerName: 'id', hide: true },
    { field: 'role_name', headerName: 'Role Name', sortable: true, filter: true, unSortIcon: true, suppressMovable: true },
    { field: 'description', headerName: 'Description', sortable: true, filter: true, unSortIcon: true },
    { field: 'action', headerName: 'Action', maxWidth: '100', suppressMovable: true, cellRenderer: IconComponent }
  ])
  const handleEdit = (id) => {
    navigate("/roles/AddEditRole/" + id)
  }
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this role") === true) {
      fetch('http://localhost:8000/api/v1.1/role/' + id, { method: 'DELETE' })
        .then(response => {
          getRoles()
        })
        .catch((err) => {
          console.log(err.message);
        });
    } else {
      return false
    }
  }

  const getRoles = () => {
    fetch('http://localhost:8000/api/v1.1/roles')
      .then((response) => response.json())
      .then((data) => {
        const result = [];
        data.data.map(x => {
          result.push({ "id": x.role_id, "role_name": x.role_name, "description": x.description })
          return result
        })
        setRowData(result);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }
  useEffect(() => {
    getRoles()
  }, []);

  const onFilterTextBoxChanged = useCallback(() => {
    gridRef.current.api.setQuickFilter(
      document.getElementById('filter-text-box').value
    );
  }, []);

  const onGridReady = (params) => {
    params.api.sizeColumnsToFit();
  }
  return (
    <div>
      <div className='d-flex justify-content-between filter'>
        <input type="text" id="filter-text-box" className="form-control w-75" placeholder="Enter any text to filter." onInput={onFilterTextBoxChanged} />
        <NavLink to="addEditRole"><button className='btn btn-primary'>Create New Role</button></NavLink>
      </div>
      <div className="ag-theme-alpine" style={{ height: 400 }}>
        <AgGridReact
          onGridReady={onGridReady}
          ref={gridRef}
          pagination={true}
          paginationPageSize={5}
          rowData={rowData}
          columnDefs={columnDefs}>
        </AgGridReact>
      </div>
    </div>

  );
};

export default Roles