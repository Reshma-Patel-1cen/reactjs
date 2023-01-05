import { useEffect, useCallback } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom'
import Module from './Module'

const AddEditRole = () => {
  const { id } = useParams();
  const isAddMode = !id;
  const navigate = useNavigate();
  const {
    register,
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      module: []
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "module"
  });

  const onSubmit = async (data) => {
    console.log("submitdata",data)
    return isAddMode
      ? createRole(data)
      : updateRole(id, data);

  }
  const createRole = async (data) => {
    await fetch('http://localhost:8000/api/v1.1/role', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
      .then((response) => response.json())
      .then((data) => {
        navigate("/roles")
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  const updateRole = async (id, data) => {
    await fetch('http://localhost:8000/api/v1.1/role/' + id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
      .then((response) => response.json())
      .then((data) => {
        navigate("/roles")
      })
      .catch((err) => {
        console.log(err.message);
      });
  }
  const addModule = (e) => {
    e.preventDefault();
    append({ moduleName: "" })
  }

  const getRoleData = useCallback(async (id) => {
    await fetch('http://localhost:8000/api/v1.1/role/' + id)
      .then((response) => response.json())
      .then((data) => {
        const editData = data.data[0]
        setValue("roleName", editData.role_name)
        setValue("description", editData.description)
        setValue("module", JSON.parse(editData.module_data))
        setValue("status", editData.status.toString())
      })
      .catch((err) => {
        // console.log(err.message);
      });
  }, [setValue])

  useEffect(() => {
    if (!isAddMode) {
      getRoleData(id)
    }
  }, [id, isAddMode, getRoleData])
  return (
    <>
      <div>
        <h3>New Role</h3>
        <hr />
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="user-form">
            <div className="row">
              <div className="col-md-6">
                <label>Role Name <span className='error'>*</span></label>
                <input type="text" placeholder="Enter role name" className="form-control" {...register('roleName', { required: true })} />
                {errors.roleName && <span className='error'>Please enter role name</span>}
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <label>Description</label>
                <textarea placeholder="Enter description" className="form-control" {...register('description')} />
              </div>
            </div>
            {fields.map((item, index) => {
              return <Module
                key={item.id}
                moduleIndex={index}
                register={register}
                control={control}
                handleSubmit={handleSubmit}
                errors={errors}
                removeModule={remove}
              />
            })}
            <button className='btn btn-outline-success' onClick={addModule}>+ Add Module</button>

            <div className="row">
              <div className="col-md-6">
                <label>Status</label>
                <br />
                <div className="form-check form-check-inline">
                  <input type="radio" className="form-check-input" value="1" {...register("status")} />
                  <label>Active</label>
                </div>
                <div className="form-check form-check-inline">
                  <input type="radio" className="form-check-input" value="2" {...register("status")} />
                  <label>Deactive</label>
                </div>
              </div>
            </div>
            <input type="submit" value="Submit" className="btn btn-success" onClick={handleSubmit} />
          </div>
        </form>
      </div>
    </>
  )
}

export default AddEditRole