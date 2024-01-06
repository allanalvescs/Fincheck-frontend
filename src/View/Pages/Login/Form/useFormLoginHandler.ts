import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod";


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

    const handleSubmit = hookFormHandleSubmit(() => {
      
    })

    console.log(errors)
    return { handleSubmit, register, errors }
}