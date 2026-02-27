import { DashboardContext, DashboardProvider } from "../../../App/contexts/DashboardContext";
import { Logo } from "../../Components/Logo";
import { Modal } from "../../Components/Modal";
import { UserMenu } from "../../Components/UserMenu";
import { Accounts } from "./Components/Accounts";
import { Fab } from "./Components/Fab";
import { Transactions } from "./Components/Transactions";
import { EditAccountModal } from "./modals/EditAccountModal ";
import { NewAccountModal } from "./modals/NewAccountModal";
import { NewTransactionModal } from "./modals/NewTransactionModal";

export function Dashboard () {
    return (
        <DashboardProvider>
            <DashboardContext.Consumer>
                {({ accountBeingEdited }) => (
                    <div className="w-full h-full p-4 md:px-8 md:pb-8 md:pt-6 flex flex-col gap-4">
                        <header className="h-12 flex items-center justify-between">
                            <Logo className="text-teal-900 h-6"/>
                            <UserMenu />
                        </header>

                        <main className="flex-1 flex flex-col md:flex-row gap-4 max-h-full">
                            <div className="w-full md:w-1/2">
                                <Accounts />
                            </div>

                            <div className="w-full md:w-1/2 ">
                                <Transactions />
                            </div>
                        </main>

                        <Fab />
                        <NewAccountModal />
                        <NewTransactionModal />
                        {accountBeingEdited && <EditAccountModal />}
                    </div>
                )}
            </DashboardContext.Consumer>
        </DashboardProvider>
    )
}