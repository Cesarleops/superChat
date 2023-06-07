import { useState } from "react"

interface IUseForm {
    initialForm: {
         email: string; 
         password: string; 
    }
}
const useForm = ({initialForm}:any) => {
    const [form, setForm] = useState(initialForm)

    const handleChange = (e:React.FormEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [e.currentTarget.name]: e.currentTarget.value,
          });
    }

    return {
        form,
        handleChange
    }
}


export default useForm