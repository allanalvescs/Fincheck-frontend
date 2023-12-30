import { Navigate, Outlet } from "react-router-dom";

interface AuthenticateProps {
    isPrivate?: boolean
}

export function Authenticate({ isPrivate = false }: AuthenticateProps) {
    const signIn = false; 
    
    if (!signIn && isPrivate) {
        return <Navigate  to="/login" replace/>
    }

    if (signIn && !isPrivate) {
        return <Navigate to="/" replace/>
    }

    return (
        <Outlet />
    )
}