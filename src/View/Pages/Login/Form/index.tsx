import { Button } from "../../../Components/Button";
import { Input } from "../../../Components/Input";
import { useFormLoginHandler } from "./useFormLoginHandler";

export function Form() {
    const { handleSubmit, register, errors, isLoading } = useFormLoginHandler()
    return (
        <form 
            onSubmit={handleSubmit}
            className="mt-[60px] flex flex-col gap-4"
        >
            <Input 
             type="email" 
             placeholder="E-mail"
             error={errors.email?.message}
             {...register('email')}
            />

            <Input 
             type="password" 
             placeholder="Senha"
             error={errors.password?.message}
             {...register('password')}
            />

            <Button type="submit" className="mt-2" isLoading={isLoading}>
                Entrar
            </Button>
        </form>
    )
}