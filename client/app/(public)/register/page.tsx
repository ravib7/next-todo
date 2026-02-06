"use client"

import { useSignUpMutation } from '@/redux/apis/auth.api'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import z from 'zod'

const register = () => {

    const router = useRouter()
    const [signup] = useSignUpMutation()

    const registerSchema = z.object({
        name: z.string().min(1),
        email: z.string().min(1),
        password: z.string().min(1),
    })

    type registerType = z.infer<typeof registerSchema>

    const { reset, register, handleSubmit, formState: { errors } } = useForm<registerType>({
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
        resolver: zodResolver(registerSchema)
    })

    const handleRegister = async (data: registerType) => {
        try {
            await signup(data).unwrap()
            toast.success("Register Successfully")
            router.push("/")
            reset()
        } catch (error) {
            console.log(error)
            toast.error("unable to register")
        }
    }

    return <>
        <form onSubmit={handleSubmit(handleRegister)}>
            <input type="text" {...register("name")} placeholder='Enter Name' />
            <input type="email" {...register("email")} placeholder='Enter Email' />
            <input type="password" {...register("password")} placeholder='Enter Password' />
            <button type='submit'>Register</button>
        </form>
    </>
}

export default register