
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  ChevronLeft, 
  LayoutDashboard, 
  MessageSquare, 
  Users, 
  UserCircle, 
  Bot, 
  Settings, 
  Phone, 
  Link as LinkIcon
} from "lucide-react";

interface SidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const Sidebar = ({ open, setOpen }: SidebarProps) => {
  const location = useLocation();
  
  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Atendimentos", href: "/atendimentos", icon: MessageSquare },
    { name: "CRM", href: "/crm", icon: Users },
    { name: "Contatos", href: "/contatos", icon: UserCircle },
    { name: "Agente de IA", href: "/agentes", icon: Bot },
    { name: "Configurações", href: "/configuracoes", icon: Settings },
    { name: "Canais", href: "/canais", icon: Phone },
    { name: "Integração", href: "/integracao", icon: LinkIcon },
  ];

  return (
    <div
      className={cn(
        "fixed inset-y-0 left-0 z-10 flex flex-col bg-white shadow-lg transition-all duration-300 md:relative",
        open ? "w-64" : "w-20"
      )}
    >
      <div className="flex h-16 items-center justify-between px-4">
        <Link
          to="/dashboard"
          className={cn(
            "flex items-center space-x-2 transition-opacity",
            open ? "opacity-100" : "opacity-0"
          )}
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-brand-600 text-white">
            CJ
          </div>
          <span className="text-xl font-bold text-brand-800">ConnectaJuse</span>
        </Link>
        <button
          onClick={() => setOpen(!open)}
          className="grid h-8 w-8 place-items-center rounded-md border border-gray-200 text-gray-500 hover:bg-gray-100"
        >
          <ChevronLeft
            className={cn("h-5 w-5 transition-transform", !open && "rotate-180")}
          />
        </button>
      </div>
      <div className="flex-1 overflow-auto py-4">
        <nav className="space-y-1 px-2">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                "group flex items-center rounded-md py-2 px-3 text-sm font-medium",
                location.pathname === item.href
                  ? "bg-brand-50 text-brand-600"
                  : "text-gray-700 hover:bg-gray-100",
                !open && "justify-center"
              )}
            >
              <item.icon className={cn("h-5 w-5 flex-shrink-0", location.pathname === item.href ? "text-brand-600" : "text-gray-500")} />
              <span className={cn("ml-3 transition-opacity", open ? "opacity-100" : "opacity-0")}>{item.name}</span>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
