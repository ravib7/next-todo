"use client"

import { useSignInMutation } from '@/redux/apis/auth.api'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import z from 'zod'

const login = () => {

  const [signin] = useSignInMutation()
  const router = useRouter()

  const loginSchema = z.object({
    email: z.string().min(1),
    password: z.string().min(1),
  })

  type loginType = z.infer<typeof loginSchema>

  const { reset, register, handleSubmit, formState: { errors } } = useForm<loginType>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema)
  })

  const handleLogin = async (data: loginType) => {
    try {
      signin(data)
      toast.success("Login Successfully")
      router.push("/admin")
      reset()
    } catch (error) {
      console.log(error)
      toast.error("unable to login")
    }
  }

  return <>
    <form onSubmit={handleSubmit(handleLogin)}>
      <input type="email" {...register("email")} placeholder='Enter Email' />
      <input type="password" {...register("password")} placeholder='Enter Password' />
      <button type='submit'>Login</button>
    </form>
  </>
}

export default login