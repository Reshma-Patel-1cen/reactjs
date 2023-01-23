import { useCallback, useEffect, useState, useRef } from "react";
import { useParams } from "react-router";
import Dropdown from 'react-bootstrap/Dropdown';
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { cloneDeep, flatten } from "lodash";

const UserModule = () => {
  const gridRef = useRef();
  const { id } = useParams();
  const [rowData, setRowData] = useState([]);
  const [hideColumnData, setHideColumnData] = useState({ product: false, email: false, serial_no: false })

  const IconComponent = ({ data }) => {
    const editIcon = (data.showId).find(val => val === 3 || val === 1) ? <i className='bi bi-pencil' onClick={() => handleEdit(data.id)} /> : "";
    const deleteIcon = (data.showId).find(val => val === 4 || val === 1) ? <i className='bi bi-trash' onClick={() => handleDelete(data.id)} /> : "";

    return <span className='grid-icon'>
      {editIcon}
      {deleteIcon}
    </span>
  }

  const [columnDefs] = useState([
    // { field: 'role_id', headerName: 'id', hide: true },
    { field: 'customer_name', headerName: 'Customer Name', sortable: true, filter: true, unSortIcon: true, suppressMovable: true },
    { field: 'email', headerName: 'Email', sortable: true, filter: true, unSortIcon: true },
    { field: 'product', headerName: 'Product', sortable: true, filter: true, unSortIcon: true },
    { field: 'serial_no', headerName: 'SKU', sortable: true, filter: true, unSortIcon: true },
    { field: 'showId', headerName: 'showId', hide: true },
    { field: 'action', headerName: 'Action', maxWidth: '100', suppressMovable: true, cellRenderer: IconComponent }
  ])

  const handleEdit = (id) => {
  }
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user") === true) {
      fetch('http://localhost:8000/api/v1.1/user/' + id, { method: 'DELETE' })
        .then(response => {
        })
        .catch((err) => {
          console.log(err.message);
        });
    } else {
      return false
    }
  }

  const getModuleData = useCallback(async (id) => {
    return await fetch('http://localhost:8000/api/v1.1/module/' + id)
      .then((response) => response.json())
  }, [])

  const getData = useCallback(async (data) => {
    // console.log("data1", data)
    return await fetch('http://localhost:8000/api/v1.1/privileges', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    }).then((response) => response.json())

  }, [])

  const handleClick = (e) => {
    const newData = hideColumnData;
    gridRef.current.columnApi.setColumnVisible(e, newData[e])
    newData[e] = !newData[e];
    setHideColumnData({ ...newData })
  }
  const onColumnVisible = (params) => {
    const hideColumn = cloneDeep(hideColumnData)
    hideColumn[params.columns[0].colDef.field] = !params.visible
    setHideColumnData(hideColumn)
  }

  useEffect(() => {

    getModuleData(id).then(res => {
     
      const privileges = JSON.parse(res.data[0].privileges)
      Promise.all(
        privileges.map(async (item) => {
          return await getData(item)
        })
      ).then((res) => {
        const result = [];
        if ((res).length) {
          flatten(res.map(x => x.data)).map(x => {
            return result.push({ "customer_name": x.first_name, "email": x.email, "product": x.product, "serial_no": x.serial_no, "showId": x.showId })
          })
        }
        setRowData(result);
      })
    })
  }, [id, getModuleData, getData])

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
        <Dropdown onSelect={handleClick}>
          <Dropdown.Toggle variant="default" id="dropdown-basic" >
            <i className="fa fa-solid fa-gears"></i>View Settings
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item eventKey="product">{hideColumnData.product === true ? <i class="bi bi-eye-slash" aria-hidden="true"></i> : <i class="bi bi-eye" aria-hidden="true"></i>}
              Product</Dropdown.Item>
            <Dropdown.Item eventKey="email">{hideColumnData.email === true ? <i class="bi bi-eye-slash" aria-hidden="true"></i> : <i class="bi bi-eye" aria-hidden="true"></i>}
              Email</Dropdown.Item>
            <Dropdown.Item eventKey="serial_no">{hideColumnData.serial_no === true ? <i class="bi bi-eye-slash" aria-hidden="true"></i> : <i class="bi bi-eye" aria-hidden="true"></i>
            }SKU</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>      </div>
      <div className="ag-theme-alpine" style={{ height: 400 }}>
        <AgGridReact
          onColumnVisible={onColumnVisible}
          onGridReady={onGridReady}
          ref={gridRef}
          pagination={true}
          paginationPageSize={7}
          rowData={rowData}
          columnDefs={columnDefs}>
        </AgGridReact>
      </div>
    </div>

  );
}

export default UserModule