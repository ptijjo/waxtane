import axios from "axios";
import { SubmitHandler, useForm } from "react-hook-form";
import { Url } from "../assets/url/Url";
import { useNavigate } from "react-router-dom";

type Inputs={
  email:string,
  password:string,
  }
const SignIn = () => {

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {

      const connectionUser = await axios.post(Url.connection,data);

      console.log(connectionUser);
      
      if (connectionUser.status===200) {
        localStorage.setItem("token",JSON.stringify(connectionUser.data.token));
        navigate("/home")

      }
     
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form_sign">
    <input type='email' placeholder='Email' {...register("email",{required:true})} />
    {errors.email && <span></span>}

    <input type='password' placeholder='Password'{...register("password", { required: true })} />
    {errors.password && <span>This field is required</span>}

    <input type="submit" value="Connection" className="btn-submit"/>
  </form>
  )
}

export default SignIn