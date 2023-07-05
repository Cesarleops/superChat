import {z} from 'zod'
import { useState } from "react"
import { Login, SignUp } from '@/interfaces';
import { useUserContext } from '@/context/store';




const FormSchema = z.object({
    userName: z.string().min(5, 'User name must have more than 5 characters'),
    password: z.string().min(6, 'password must have at least 6 characters').min(9, 'password is can"t be longer than 9 characters').refine((value) => {
      return /[A-Z]/.test(value) && /[0-9]/.test(value) && /[!@#$%^&*]/.test(value);
    }, "password should contain at least one uppercase letter, one number, and one special character"),
    email: z.string().email()
  })


type Errors = {
    userName?: string
    email?:string
    password?:string
    login?:string
}
 type Form = {
    signUp?: SignUp
    login?:Login
    [index:string]: string | SignUp | Login | undefined
 }

const useForm = (initialForm: Form) => {
  const { login } = useUserContext();
    const [form, setForm] = useState(initialForm)
    const [errors,setErrors] = useState<Errors>({})
    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [e.currentTarget.name]: e.currentTarget.value,
          });
    }

    const handleBlur = (property:string) => {
        
            const propertySchema = FormSchema.pick({ [property]: true });
            
            const result = propertySchema.safeParse({ [property]: form[property]});
            if (result.success) {
                setErrors((prevErrors) => ({
                  ...prevErrors,
                  [property]: '',
                }));
              } else {
                setErrors((prevErrors) => ({
                  ...prevErrors,
                  [property]: result.error.issues[0].message,
                }));
              }
            };
    
    const handleSubmit = (e: React.FormEvent, type:string) =>{
      e.preventDefault()
      if(type === 'login'){
         login(form).then(() => {
     
        })
        .catch((error:string) => {
          setErrors({...errors,
          ['login']: error});
        });
     

      }
    }
     
    return{
        form,
        handleChange,
        handleBlur,
        handleSubmit,
        errors
    }
    
}




export default useForm