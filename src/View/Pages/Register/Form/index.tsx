import { Button } from "../../../Components/Button";
import { Input } from "../../../Components/Input";
import { useFormRegister } from "./useFormRegisterHandler";

export function Form() {
    const { register, handleSubmit, errors, isLoading } = useFormRegister()
    return (
        <form
            onSubmit={handleSubmit} 
            className="mt-[60px] flex flex-col gap-4"
        >
            <Input 
                type="text" 
                placeholder="Nome"
                {...register("name")}
                error={errors.name?.message}
            />

            <Input 
                type="email" 
                placeholder="E-mail"
                {...register("email")}
                error={errors.email?.message}
            />

            <Input 
                type="password" 
                placeholder="Senha"
                {...register("password")}
                error={errors.password?.message}
            />

            <Button type="submit" className="mt-2" isLoading={isLoading}>
                Criar conta
            </Button>
     </form>
    )
}