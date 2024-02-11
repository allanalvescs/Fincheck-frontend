import { Link } from "react-router-dom";
import { Form } from "./Form";


export function Register() {
    return (
        <>
        <header className="flex flex-col items-center gap-4 text-center">
            <h1 className="text-2xl font-bold text-gray-900 tracking-[-1px]">
                Crie sua conta
            </h1>

            <p className="space-x-2">
                <span className="text-gray-700 tracking-[-0.5px]">Já possui uma conta?</span>
                <Link to="/login" className="text-teal-900 tracking-[-0.5px] font-medium">
                    Fazer login
                </Link>
            </p>
        </header>

        <Form />
    </>       
    )
}