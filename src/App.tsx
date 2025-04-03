
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import AuthGuard from "@/components/AuthGuard";
import MainLayout from "@/components/layout/MainLayout";
import Login from "./pages/Login";
import ResetPassword from "./pages/ResetPassword";
import Dashboard from "./pages/Dashboard";
import Atendimentos from "./pages/Atendimentos";
import CRM from "./pages/CRM";
import Contatos from "./pages/Contatos";
import Agentes from "./pages/Agentes";
import Configuracoes from "./pages/Configuracoes";
import Canais from "./pages/Canais";
import Integracao from "./pages/Integracao";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <AuthGuard>
            <MainLayout>
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/atendimentos" element={<Atendimentos />} />
                <Route path="/crm" element={<CRM />} />
                <Route path="/contatos" element={<Contatos />} />
                <Route path="/agentes" element={<Agentes />} />
                <Route path="/configuracoes" element={<Configuracoes />} />
                <Route path="/canais" element={<Canais />} />
                <Route path="/integracao" element={<Integracao />} />
                <Route path="/" element={<Dashboard />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </MainLayout>
          </AuthGuard>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
