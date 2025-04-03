
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Search, Filter, Plus, MoreHorizontal, Edit, Trash2, Phone, MessageSquare, Mail } from "lucide-react";

// Dados de exemplo para leads
const leadsData = [
  {
    id: "LD-001",
    nome: "Roberto Almeida",
    email: "roberto.almeida@email.com",
    telefone: "(11) 98765-4321",
    origem: "Site",
    status: "Novo",
    interesse: "Plano Premium",
    dataContato: "03/04/2025",
    atribuido: "Carlos Santos",
  },
  {
    id: "LD-002",
    nome: "Juliana Costa",
    email: "juliana.costa@email.com",
    telefone: "(11) 91234-5678",
    origem: "Facebook",
    status: "Em Andamento",
    interesse: "Plano Básico",
    dataContato: "02/04/2025",
    atribuido: "Ana Silva",
  },
  {
    id: "LD-003",
    nome: "Marcelo Pereira",
    email: "marcelo.pereira@email.com",
    telefone: "(11) 95555-6666",
    origem: "Instagram",
    status: "Qualificado",
    interesse: "Plano Enterprise",
    dataContato: "01/04/2025",
    atribuido: "Ricardo Oliveira",
  },
  {
    id: "LD-004",
    nome: "Fernanda Lima",
    email: "fernanda.lima@email.com",
    telefone: "(11) 97777-8888",
    origem: "WhatsApp",
    status: "Convertido",
    interesse: "Plano Premium",
    dataContato: "31/03/2025",
    atribuido: "Carlos Santos",
  },
  {
    id: "LD-005",
    nome: "Thiago Mendes",
    email: "thiago.mendes@email.com",
    telefone: "(11) 99999-0000",
    origem: "Site",
    status: "Perdido",
    interesse: "Plano Básico",
    dataContato: "30/03/2025",
    atribuido: "Ana Silva",
  },
  {
    id: "LD-006",
    nome: "Camila Rodrigues",
    email: "camila.rodrigues@email.com",
    telefone: "(11) 98888-7777",
    origem: "Facebook",
    status: "Novo",
    interesse: "Plano Enterprise",
    dataContato: "29/03/2025",
    atribuido: "Ricardo Oliveira",
  },
  {
    id: "LD-007",
    nome: "Paulo Ferreira",
    email: "paulo.ferreira@email.com",
    telefone: "(11) 96666-5555",
    origem: "Instagram",
    status: "Em Andamento",
    interesse: "Plano Premium",
    dataContato: "28/03/2025",
    atribuido: "Carlos Santos",
  },
];

const CRM = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("todos");
  const [origemFilter, setOrigemFilter] = useState("todas");

  const filteredLeads = leadsData.filter((lead) => {
    const matchesSearch = 
      lead.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.telefone.includes(searchTerm);
    
    const matchesStatus = statusFilter === "todos" || lead.status === statusFilter;
    const matchesOrigem = origemFilter === "todas" || lead.origem === origemFilter;
    
    return matchesSearch && matchesStatus && matchesOrigem;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Novo":
        return "bg-blue-100 text-blue-800";
      case "Em Andamento":
        return "bg-orange-100 text-orange-800";
      case "Qualificado":
        return "bg-purple-100 text-purple-800";
      case "Convertido":
        return "bg-green-100 text-green-800";
      case "Perdido":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getOrigemColor = (origem: string) => {
    switch (origem) {
      case "Site":
        return "bg-indigo-100 text-indigo-800";
      case "Facebook":
        return "bg-blue-100 text-blue-800";
      case "Instagram":
        return "bg-pink-100 text-pink-800";
      case "WhatsApp":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <>
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">CRM</h1>
          <p className="text-muted-foreground">
            Gestão de leads e oportunidades
          </p>
        </div>
        <Button className="bg-brand-600 hover:bg-brand-700">
          <Plus className="h-4 w-4 mr-2" />
          Novo Lead
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mt-6 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Buscar por nome, email ou telefone..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos os status</SelectItem>
              <SelectItem value="Novo">Novo</SelectItem>
              <SelectItem value="Em Andamento">Em Andamento</SelectItem>
              <SelectItem value="Qualificado">Qualificado</SelectItem>
              <SelectItem value="Convertido">Convertido</SelectItem>
              <SelectItem value="Perdido">Perdido</SelectItem>
            </SelectContent>
          </Select>

          <Select value={origemFilter} onValueChange={setOrigemFilter}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Origem" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todas">Todas as origens</SelectItem>
              <SelectItem value="Site">Site</SelectItem>
              <SelectItem value="Facebook">Facebook</SelectItem>
              <SelectItem value="Instagram">Instagram</SelectItem>
              <SelectItem value="WhatsApp">WhatsApp</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" className="flex items-center">
            <Filter className="h-4 w-4 mr-2" />
            Mais Filtros
          </Button>
        </div>
      </div>

      <Card className="mt-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Contato</TableHead>
              <TableHead>Origem</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Interesse</TableHead>
              <TableHead>Data de Contato</TableHead>
              <TableHead>Atribuído a</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredLeads.map((lead) => (
              <TableRow key={lead.id}>
                <TableCell className="font-medium">{lead.nome}</TableCell>
                <TableCell>
                  <div className="text-sm">
                    {lead.email}
                    <div className="text-muted-foreground">{lead.telefone}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className={getOrigemColor(lead.origem)}>
                    {lead.origem}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge className={getStatusColor(lead.status)}>
                    {lead.status}
                  </Badge>
                </TableCell>
                <TableCell>{lead.interesse}</TableCell>
                <TableCell>{lead.dataContato}</TableCell>
                <TableCell>{lead.atribuido}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button size="icon" variant="ghost" className="h-8 w-8">
                      <Phone className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="ghost" className="h-8 w-8">
                      <MessageSquare className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="ghost" className="h-8 w-8">
                      <Mail className="h-4 w-4" />
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button size="icon" variant="ghost" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Ações</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <Edit className="h-4 w-4 mr-2" />
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Trash2 className="h-4 w-4 mr-2" />
                          Excluir
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </>
  );
};

export default CRM;
