import axios from 'axios';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Url } from '../assets/url/Url';

type Inputs={
email:string,
first_name:string,
last_name:string,
password:string,
genre:string,
picture?:string
}

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {

      const newUser = await axios.post(Url.enregistrement,data);

      console.log(newUser);
     
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type='email' placeholder='Email' {...register("email",{required:true})} />
      {errors.email && <span></span>}

      <input type='text' placeholder='Prénom'{...register("first_name", { required: true })} />
      {errors.first_name && <span>This field is required</span>}

      <input type='text' placeholder='Nom'{...register("last_name", { required: true })} />
      {errors.last_name && <span>This field is required</span>}

      <input type='password' placeholder='Password'{...register("password", { required: true })} />
      {errors.password && <span>This field is required</span>}

      <input type='radio' id='homme' value="Homme" {...register("genre", { required: true })} />
      <label htmlFor='homme'>Homme</label>

      <input type='radio' id='femme' value="Femme" {...register("genre", { required: true })} />
      <label htmlFor='femme'>Femme</label>

      {errors.genre && <span>This field is required</span>}

      <input type="submit" value="Enregistrer"/>
    </form>
  )
}

export default SignUp