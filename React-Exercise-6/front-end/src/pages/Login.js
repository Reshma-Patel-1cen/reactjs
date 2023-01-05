import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { setUserSession } from '../utils/common'

const Login = () => {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [errMessage, setErrMessage] = useState()
  const navigate = useNavigate()


  const onSubmit = async (data) => {
    console.log("dddd", data)
    await fetch('http://localhost:8000/api/v1.0/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("dttt",data)
        if (data.error) {
          setErrMessage(data.message)
        }
        else if (data.user.name) {
          setUserSession(data.token, data.user);
          setErrMessage()
          navigate("/users")
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  return (

    <div className='login-wrapper card-body p-5 shadow-5 ' >
      <div className="row justify-content-center">
        <div className="col-md-6 shadow">
          <h5 className='mb-4'>Please login to your account</h5>
          <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-outline mb-4">
              {/* <label> Username</label> */}
              <input type="text" placeholder='Username' className="form-control" {...register('userName', { required: true })} />
              {errors.userName && <span className='error'>Please enter user name</span>}

            </div>
            <div className="form-outline mb-4">
              {/* <label> Password</label> */}
              <input type="password" placeholder='Password' className="form-control" {...register('password', { required: true })} />
              {errors.password && <span className='error'>Please enter password</span>}

            </div>
            <span className='error'>{errMessage ? errMessage : ""}</span>
            <div>
              <input type="submit" value="Login" className="btn btn-success" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login