import React, { useState, useCallback, useRef, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { EuiIcon } from '@elastic/eui';
import AddItem from "./AddItem";
import UserContext from './hooks/userContext'
import Dropdown from 'react-bootstrap/Dropdown';
import { cloneDeep } from "lodash";
import DeleteButton from './DeleteButton';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import Flyout from './Flyout';
import Tags from './Tags';

const Grid = () => {
  const gridRef = useRef();
  const tagRef = useRef(null);

  const [hideColumnData, setHideColumnData] = useState({ lastname: false, email: true, gender: false })
  const [rowData, setRowData] = useState([])
  const [isEdit, setIsEdit] = useState(false)
  const [editData, setEditData] = useState({})
  const [editIndex, setEditIndex] = useState(null)
  const [isPaneOpen, setIsPaneOpen] = useState(false)
  const [paneData, setPaneData] = useState({})
  const [paneEditIndex, setPaneEditIndex] = useState(null)
  const [isTagEdit, setIsTagEdit] = useState(false)

  const IconComponent = ({ rowIndex, data }) => {
    return <span className='grid-icon'><EuiIcon type="pencil" onClick={() => handleEdit(rowIndex, data)} /><DeleteButton handleDelete={handleDelete} rowIndex={rowIndex} /><EuiIcon type="eye" onClick={() => handleDataView(rowIndex, data)} /></span>
  }

  const TagsComponent = ({ rowIndex, data }) => {
    return (
      <div className='d-flex align-items-center justify-content-between'>
        {isTagEdit && paneEditIndex === rowIndex ? <Tags className="mt-2 mb-2" value={data.tags} ref={tagRef} /> : <div style={{ minHeight: 40 }}>{data.tags}</div>}
        {isTagEdit && paneEditIndex === rowIndex ? <EuiIcon className='m-2' type="save" onClick={() => updateTag(rowIndex, data)} /> : <EuiIcon className='m-2' type="pencil" data-action="edit" onClick={() => handleTagEdit(rowIndex, data)} />}
      </div>
    )
  }

  const [columnDefs, setColumnDefs] = useState([
    { field: 'firstname', headerName: 'First Name', sortable: true, filter: true, unSortIcon: true, width: 150, suppressMovable: true },
    { field: 'lastname', headerName: 'Last Name', sortable: true, filter: true, width: 150, unSortIcon: true },
    { field: 'email', headerName: 'Email', sortable: true, filter: true, unSortIcon: true, hide: true, resize: true },
    { field: 'tags', headerName: 'Tags', sortable: true, filter: true, unSortIcon: false, width: 300, autoHeight: true, suppressMovable: true, cellRendererFramework: TagsComponent },
    { field: 'gender', headerName: 'Gender', sortable: true, filter: true, unSortIcon: true, width: 120, },
    { field: 'dob', headerName: 'Date of Birth', sortable: true, filter: true, unSortIcon: true, width: 150, suppressMovable: true },
    { field: 'action', headerName: 'Action', suppressMovable: true, width: 150, cellRenderer: IconComponent }
  ])

  const handleTagEdit = (rowIndex, data) => {
    setIsTagEdit(true)
    setPaneEditIndex(rowIndex)
  }
  const updateTag = (rowIndex, data) => {
    const tagData = tagRef.current.tags.map(x => x.label).join();
    handleList({ tags: tagData })
    setPaneEditIndex(null)
    setIsTagEdit(false)
  }

  useEffect(() => {
    let columns = columnDefs.map((x) => {
      const obj = cloneDeep(x);
      if (obj.field === 'tags') {
        obj.cellRenderer = TagsComponent
      }
      return obj
    })
    setColumnDefs(columns)
  }, [isTagEdit])

  const onFilterTextBoxChanged = useCallback(() => {
    gridRef.current.api.setQuickFilter(
      document.getElementById('filter-text-box').value
    );
  }, []);

  const handleList = (data) => {

    const userList = cloneDeep(rowData);
    if (editIndex != null) {
      userList[editIndex]['firstname'] = data['firstname']
      userList[editIndex]['lastname'] = data['lastname']
      userList[editIndex]['email'] = data['email']
      userList[editIndex]['gender'] = data['gender']
      userList[editIndex]['dob'] = data['dob']
      setEditIndex(null)
      setIsEdit(false)
      setEditData({})
    }
    else if (paneEditIndex != null) {
      userList[paneEditIndex]['tags'] = data['tags']
    }
    else {
      userList.push(data)
    }
    setRowData(userList)
  }
  const handleEditCloseBtn = () => {
    setIsEdit(false)
    setEditIndex(null)
    setEditData({})
  }

  const handleEdit = (index, data) => {
    setEditData(data)
    setEditIndex(index)
    setIsEdit(true)
  }

  const handleDelete = (rowIndex) => {
    const userList = cloneDeep(gridRef.current.props.rowData)
    const newList = userList.filter((item, index) => index !== rowIndex)
    setRowData(newList);
  }
  const handleDataView = (index, data) => {
    setIsPaneOpen(true)
    setPaneData(data)
    setPaneEditIndex(index)
  }
  const handleFlyoutCloseBtn = () => {
    setIsPaneOpen(false)
    setPaneEditIndex(null)
  }

  const handleClick = (e) => {
    const newData = hideColumnData;
    gridRef.current.columnApi.setColumnVisible(e, newData[e])
    newData[e] = !newData[e];
    setHideColumnData({ ...newData })
  }
  const onBtExport = () => {
    gridRef.current.api.exportDataAsCsv({});
  }
  const onColumnVisible = (params) => {
    const hideColumn = cloneDeep(hideColumnData)
    hideColumn[params.columns[0].colDef.field] = !params.visible
    setHideColumnData(hideColumn)
  }

  return (
    <>
      <div className='d-flex justify-content-between'>
        <input type="text" id="filter-text-box" className="form-control w-25" placeholder="Enter any text to filter." onInput={onFilterTextBoxChanged} />
        <Dropdown onSelect={handleClick}>
          <Dropdown.Toggle variant="default" id="dropdown-basic" >
            <i className="fa fa-solid fa-gears"></i>View Settings
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item eventKey="lastname">{hideColumnData.lastname === true ? <EuiIcon type="eyeClosed" /> : <EuiIcon type="eye" />}Last Name</Dropdown.Item>
            <Dropdown.Item eventKey="email">{hideColumnData.email === true ? <EuiIcon type="eyeClosed" /> : <EuiIcon type="eye" />}Email</Dropdown.Item>
            <Dropdown.Item eventKey="gender">{hideColumnData.gender === true ? <EuiIcon type="eyeClosed" /> : <EuiIcon type="eye" />}Gender</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>

      <UserContext.Provider value={{
        handleList: handleList,
        editData: editData,
        isEdit: isEdit,
        handleEditCloseBtn: handleEditCloseBtn,
        paneEditIndex: paneEditIndex
      }}>
        <AddItem onBtExport={onBtExport} />
      </UserContext.Provider>

      <div className="ag-theme-alpine" style={{ height: 325 }}>
        <AgGridReact
          onColumnVisible={onColumnVisible}
          // onCellClicked={onCellClicked}
          ref={gridRef}
          pagination={true}
          paginationPageSize={5}
          rowData={rowData}
          columnDefs={columnDefs}
        />
        <Flyout
          isPaneOpen={isPaneOpen}
          paneData={paneData}
          handleFlyoutCloseBtn={handleFlyoutCloseBtn}
          handleList={handleList}
        />
      </div >
    </>
  );
}

export default Grid