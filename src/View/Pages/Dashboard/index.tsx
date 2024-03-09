import { useNavigate } from "react-router-dom";
import { Button } from "../../Components/Button";
import { useAuth } from "../../../App/hooks/useAuth";

export function Dashboard () {
    const { signout } = useAuth()
    return (
        <div>
            <h1>Dashboard</h1>
            <Button onClick={signout}>Sair</Button>
        </div>
    )
}