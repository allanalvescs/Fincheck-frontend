import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Router } from "./Router"
import { Toaster } from "react-hot-toast"

const queryClient = new QueryClient()
 

function App() {  
  console.log({ queryClient })
  return (
    <QueryClientProvider client={queryClient}>
        <Router />
        <Toaster />
    </QueryClientProvider>
  )
}

export default App
