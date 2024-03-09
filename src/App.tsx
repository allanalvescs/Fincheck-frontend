import { Router } from "./Router"

import { Toaster } from "react-hot-toast"
import { AuthProvider } from "./App/contexts/AuthContext"

import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false
    }
  }
})

function App() {  
    return (
      <QueryClientProvider client={queryClient}>
        <AuthProvider>

          <Router />
          
          <Toaster />
        
        </AuthProvider>

        <ReactQueryDevtools />
      </QueryClientProvider>
  )
}

export default App
