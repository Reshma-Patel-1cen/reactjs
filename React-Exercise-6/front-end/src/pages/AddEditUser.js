import { useEffect, useState, useCallback } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom'
import Select from 'react-select';

const AddEditUser = () => {
  const { id } = useParams();
  const isAddMode = !id;
  const navigate = useNavigate();
  const {
    register,
    setValue,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm();

  const [options, setOptions] = useState([])

  const onSubmit = async (data) => {
    console.log("dddd",data)
    return isAddMode
      ? createUser(data)
      : updateUser(id, data);
  }

  const createUser = async (data) => {
    await fetch('http://localhost:8000/api/v1.1/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
      .then((response) => response.json())
      .then((data) => {
        navigate("/users")
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  const updateUser = async (id, data) => {
    await fetch('http://localhost:8000/api/v1.1/user/' + id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
      .then((response) => response.json())
      .then((data) => {
        navigate("/users")
      })
      .catch((err) => {
        console.log(err.message);
      });
  }
  const getUser = useCallback(async (id) => {
    await fetch('http://localhost:8000/api/v1.1/user/' + id)
      .then((response) => response.json())
      .then((data) => {
        const editData = data.data[0]
        console.log("editData",editData)
        setValue("userName", editData.user_name)
        setValue("firstName", editData.first_name)
        setValue("lastName", editData.last_name)
        setValue("email", editData.user_email)
        setValue("roles", JSON.parse(editData.user_role))
        setValue("status",editData.status.toString())
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [setValue])

  const getRoles = useCallback(async () => {

    await fetch('http://localhost:8000/api/v1.1/roles')
      .then((response) => response.json())
      .then((data) => {
        const roles = data.data
        const optionArr = [];
        roles.map(x => {
          optionArr.push({ value: x.role_id, label: x.role_name })
          return optionArr;
        })
        setOptions(optionArr)
      })
      .catch((err) => {
        console.log("error msg", err.message);
      });
  }, [])

  useEffect(() => {
    if (!isAddMode) {
      getUser(id)
    }
    getRoles();

  }, [id, isAddMode, getUser, getRoles]);

  return (
    <>
      <div>
        <h3>New User</h3>
        <hr />
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="user-form">
            <div className="row">
              <div className="col-md-6">
                <label>Username <span className='error'>*</span></label>
                <input type="text" placeholder="Enter user name" className="form-control" {...register('userName', { required: true })} />
                {errors.userName && <span className='error'>Please enter user name</span>}
              </div>
              <div className="col-md-6">
                <label>Email Id<span className='error'>*</span></label>
                <input type="text" placeholder="Enter your email address" className="form-control" {...register('email', { required: true })} />
                {errors.email && <span className='error'>Please enter email address</span>}
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <label>First Name<span className='error'>*</span></label>
                <input type="text" placeholder="Enter your first name" className="form-control" {...register('firstName', { required: true })} />
                {errors.firstName && <span className='error'>Please enter first name</span>}
              </div>
              <div className="col-md-6">
                <label>Last Name<span className='error'>*</span></label>
                <input type="text" placeholder="Enter your last name" className="form-control" {...register('lastName', { required: true })} />
                {errors.lastName && <span className='error'>Please enter last name</span>}
              </div>
            </div>
            {isAddMode ?
              <div>
                <div className="row">
                  <div className="col-md-6">
                    <label>Password<span className='error'>*</span></label>
                    <input type="password" placeholder="Enter your password" className="form-control" {...register('password', { required: true })} />
                    {errors.password && <span className='error'>Please enter password</span>}
                  </div>
                  <div className="col-md-6">
                    <label>Confirm Password<span className='error'>*</span></label>
                    <input type="password" placeholder="Enter your confirm password" className="form-control" {...register('confPassword', {
                      required: "Enter your confirm password", validate: (val) => {
                        if (watch('password') !== val) {
                          return "Your password do no match";
                        }
                      },
                    })} />
                    {errors.confPassword && <span className='error'>{errors.confPassword.message}</span>}
                  </div>
                </div>
              </div>
              : ""}
            <div className="row">
              <div className="col-md-6">
                <label>Roles</label>
                <Controller
                  control={control}
                  name="roles"
                  render={({
                    field: { onChange, onBlur, value, name, ref },
                  }) => (
                    <Select
                      options={options}
                      onChange={onChange}
                      isMulti={true}
                      value={value}
                      name={name}
                      ref={ref}
                    />
                  )}
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <label>Status</label>
                <br />
                <div className="form-check form-check-inline">
                  <input type="radio" className="form-check-input" value="1"  {...register("status", { required: true })} />
                  <label>Active</label>
                </div>
                <div className="form-check form-check-inline">
                  <input type="radio" className="form-check-input" value="2" {...register("status", { required: true })} />
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

export default AddEditUser