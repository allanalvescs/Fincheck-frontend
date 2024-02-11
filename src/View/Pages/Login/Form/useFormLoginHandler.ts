import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod";
import authServices from "../../../../App/services/authServices";
import { SignInBody } from "../../../../App/services/authServices/signIn";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useAuth } from "../../../../App/hooks/useAuth";


const schema = z.object({
    email: z.string().nonempty("E-mail é obrigatório").email("Informe um e-mail válido"),
    password: z.string().nonempty("Senha é obrigatória").min(8, "A senha deve possuir no minimo 8 digitos")
})

type FormData = z.infer<typeof schema>

export function useFormLoginHandler() {
    const {
        handleSubmit: hookFormHandleSubmit,
        register,
        formState: { errors }
    } = useForm<FormData>({
        resolver: zodResolver(schema)
    })

    const { mutateAsync, isLoading } = useMutation({
        mutationFn: (data: SignInBody) => {
            return authServices.signIn(data)
        }
    })

    const { singin } = useAuth()

    const handleSubmit = hookFormHandleSubmit(async (data) => {
        try{
            const { accessToken } = await mutateAsync(data)
            singin(accessToken)
        }catch(err) {
            toast.error('Credenciais invalidas!')
        }
    })

    console.log(errors)
    return { handleSubmit, register, errors, isLoading }
}