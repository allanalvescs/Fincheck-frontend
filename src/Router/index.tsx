import { Routes ,Route, BrowserRouter } from "react-router-dom"
import { Authenticate } from "./Authenticate"
import { Login } from "../View/Pages/Login"
import { Register } from "../View/Pages/Register"
import { Dashboard } from "../View/Pages/Dashboard"
import { AuthLayout } from "../View/Layouts/AuthLayout"

export function Router () {
    return (
    <BrowserRouter>
        <Routes>
            <Route element={<Authenticate />}>
                <Route element={<AuthLayout />}>
                    <Route path="/login" element={<Login />}/>
                    <Route path="/register" element={<Register />}/>
                </Route>
            </Route>

            <Route element={<Authenticate isPrivate/>}>
                <Route path="/" element={<Dashboard />}/>
            </Route>
        </Routes>
    </BrowserRouter>
    )
}