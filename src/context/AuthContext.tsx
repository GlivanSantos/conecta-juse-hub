
import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

interface AuthContextProps {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  resetPassword: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check if user data exists in local storage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    try {
      // This is a placeholder for API integration
      // In a real implementation, this would make an API call
      
      // Demo credentials check
      if (email === "conectajuse@gmail.com" && password === "123456") {
        const userData: User = {
          id: "1",
          email: "conectajuse@gmail.com",
          name: "Admin User",
          role: "admin"
        };
        
        // Save user data to local storage
        localStorage.setItem("user", JSON.stringify(userData));
        setUser(userData);
        
        toast({
          title: "Login bem-sucedido",
          description: "Bem-vindo ao ConnectaJuse Hub!",
        });
        
        navigate("/dashboard");
      } else {
        throw new Error("Credenciais inválidas");
      }
    } catch (error) {
      toast({
        title: "Erro de login",
        description: error instanceof Error ? error.message : "Erro ao tentar fazer login",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
    toast({
      title: "Logout realizado",
      description: "Você foi desconectado com sucesso",
    });
  };

  const resetPassword = async (email: string) => {
    try {
      // Placeholder for password reset API call
      toast({
        title: "E-mail enviado",
        description: "Verifique seu e-mail para redefinir sua senha",
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível enviar o e-mail de redefinição",
        variant: "destructive",
      });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
