import React, { memo } from 'react'

const TodoList = (props) => {
  return (
    <div>
      {/* {props.list.map((l, i) =>
        <div className="row list" key={i}>
          <div className="col-md-3">
            <input type="text" className="form-control" value={l.firstName} disabled />
          </div>
          <div className="col-md-3">
            <input type="text" className="form-control" value={l.lastName} disabled />
          </div>
          <div className="col-md-1">
            <button type="button" className="btn btn-success" onClick={() => props.handleEdit(i)} >Edit</button>
          </div>
          <div className="col-md-1">
            <button type="button" className="btn btn-danger" onClick={() => props.handleDelete(i)} >Delete</button>
          </div>
        </div>
      )} */}


      {props.list.map((l, i) =>
        <table className="table-width" key={i}>
          <tr>
            <td><input type="text" className="form-control" value={l.firstName} disabled /></td>
            <td><input type="text" className="form-control" value={l.lastName} disabled /></td>
            <td>
              <button type="button" className="btn btn-success btn-outline-success" onClick={() => props.handleEdit(i)} >Edit</button>
              <button type="button" className="btn btn-danger" onClick={() => props.handleDelete(i)} >Delete</button>
            </td>
          </tr>
        </table>
      )}
    </div>
  )
}

export default memo(TodoList)