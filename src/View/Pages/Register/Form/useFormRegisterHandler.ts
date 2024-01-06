import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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

    const handleSubmit = hookFormHandleSubmit((data) => {
        console.log({ data })
    })

    return { register, handleSubmit, errors }
}