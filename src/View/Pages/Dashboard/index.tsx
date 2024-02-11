import { useNavigate } from "react-router-dom";
import { Button } from "../../Components/Button";

export function Dashboard () {
    const navigate = useNavigate()
    return (
        <div>
            <h1>Dashboard</h1>
            <Button>Sair</Button>
        </div>
    )
}