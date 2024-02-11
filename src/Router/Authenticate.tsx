import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../App/hooks/useAuth";

interface AuthenticateProps {
    isPrivate?: boolean
}

export function Authenticate({ isPrivate = false }: AuthenticateProps) {
    const { signedIn } = useAuth()
    
    if (!signedIn && isPrivate) {
        return <Navigate  to="/login" replace/>
    }

    if (signedIn && !isPrivate) {
        return <Navigate to="/" replace/>
    }

    return (
        <Outlet />
    )
}