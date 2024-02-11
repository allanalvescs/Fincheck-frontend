import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Router } from "./Router"
import { Toaster } from "react-hot-toast"
import { AuthProvider } from "./App/contexts/AuthContext"

const queryClient = new QueryClient()
 

function App() {  
  console.log({ queryClient })
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router />
        <Toaster />
      </AuthProvider>
    </QueryClientProvider>
  )
}

export default App
