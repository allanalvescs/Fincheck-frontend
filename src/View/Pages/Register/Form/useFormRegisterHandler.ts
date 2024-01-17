import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query"
 
import authServices from "../../../../App/services/authServices";
import { SignUpBody } from "../../../../App/services/authServices/signUp";
import toast from "react-hot-toast";

const schema = z.object({
    name: z.string().nonempty("Nome é obrigatório"),
    email: z.string().nonempty("E-mail é obrigatório").email("Informe um e-mail válido"),
    password: z.string().nonempty("Senha é obrigatória").min(8, "A senha deve possuir no minimo 8 digitos")
})

type FormData = z.infer<typeof schema>

export function useFormRegister() {
    const { 
        handleSubmit: hookFormHandleSubmit,
        register, 
        formState: { errors } 
    } = useForm<FormData>({
        resolver: zodResolver(schema)
    })

    const { mutateAsync, isLoading, data: response } = useMutation({
        mutationFn: (data: SignUpBody) => {
            return authServices.signUp(data)
        }
    })

    const handleSubmit = hookFormHandleSubmit(async (data) => {
        try{
            await mutateAsync(data)
            console.log({ response })
        }catch(err) {
            toast.error('Ocorreu um erro ao criar sua conta!')
        }
    })

    return { register, handleSubmit, errors, isLoading }
}