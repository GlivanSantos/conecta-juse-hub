
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
import { 
  Search, 
  Filter, 
  Plus, 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  Phone, 
  MessageSquare, 
  Mail,
  MoreVertical 
} from "lucide-react";
import { 
  ResizablePanelGroup, 
  ResizablePanel, 
  ResizableHandle 
} from "@/components/ui/resizable";

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
  const [viewMode, setViewMode] = useState<"tabela" | "kanban">("kanban");
  const [leads, setLeads] = useState(leadsData);

  const filteredLeads = leads.filter((lead) => {
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

  const handleDragStart = (e: React.DragEvent, lead: any) => {
    e.dataTransfer.setData("leadId", lead.id);
  };

  const handleDrop = (e: React.DragEvent, newStatus: string) => {
    e.preventDefault();
    const leadId = e.dataTransfer.getData("leadId");
    
    setLeads(leads.map(lead => 
      lead.id === leadId ? { ...lead, status: newStatus } : lead
    ));
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const getLeadsByStatus = (status: string) => {
    return filteredLeads.filter(lead => lead.status === status);
  };

  const renderKanbanView = () => {
    const statuses = ["Novo", "Em Andamento", "Qualificado", "Convertido", "Perdido"];
    
    return (
      <ResizablePanelGroup direction="horizontal" className="min-h-[500px] rounded-lg border">
        {statuses.map((status, index) => (
          <>
            <ResizablePanel key={status} defaultSize={20} minSize={15}>
              <div 
                className="h-full p-4 bg-gray-50 flex flex-col"
                onDrop={(e) => handleDrop(e, status)}
                onDragOver={handleDragOver}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium text-sm uppercase tracking-wide text-gray-700">{status}</h3>
                  <Badge className={`${getStatusColor(status)}`}>
                    {getLeadsByStatus(status).length}
                  </Badge>
                </div>
                <div className="space-y-3 flex-1 overflow-y-auto">
                  {getLeadsByStatus(status).map((lead) => (
                    <Card 
                      key={lead.id}
                      className="p-3 cursor-move shadow-sm hover:shadow-md transition-shadow"
                      draggable
                      onDragStart={(e) => handleDragStart(e, lead)}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium text-sm">{lead.nome}</h4>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-7 w-7">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
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
                      <div className="text-xs text-gray-500 mb-1">{lead.email}</div>
                      <div className="text-xs text-gray-500 mb-2">{lead.telefone}</div>
                      <div className="flex justify-between items-center">
                        <Badge className={`${getOrigemColor(lead.origem)} text-xs`}>
                          {lead.origem}
                        </Badge>
                        <div className="text-xs text-gray-500">{lead.dataContato}</div>
                      </div>
                      <div className="mt-2 pt-2 border-t flex justify-between">
                        <div className="text-xs text-gray-500">
                          Atribuído: {lead.atribuido}
                        </div>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                            <Phone className="h-3 w-3" />
                          </Button>
                          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                            <MessageSquare className="h-3 w-3" />
                          </Button>
                          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                            <Mail className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </ResizablePanel>
            {index < statuses.length - 1 && (
              <ResizableHandle withHandle />
            )}
          </>
        ))}
      </ResizablePanelGroup>
    );
  };

  const renderTableView = () => {
    return (
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
    );
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
        <div className="flex gap-2">
          <div className="border rounded-md overflow-hidden flex">
            <Button 
              variant={viewMode === "tabela" ? "default" : "ghost"}
              className={`rounded-none ${viewMode === "tabela" ? "bg-brand-600 hover:bg-brand-700" : ""}`}
              onClick={() => setViewMode("tabela")}
            >
              Tabela
            </Button>
            <Button 
              variant={viewMode === "kanban" ? "default" : "ghost"}
              className={`rounded-none ${viewMode === "kanban" ? "bg-brand-600 hover:bg-brand-700" : ""}`}
              onClick={() => setViewMode("kanban")}
            >
              Kanban
            </Button>
          </div>
          <Button className="bg-brand-600 hover:bg-brand-700">
            <Plus className="h-4 w-4 mr-2" />
            Novo Lead
          </Button>
        </div>
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

      {viewMode === "tabela" ? renderTableView() : renderKanbanView()}
    </>
  );
};

export default CRM;
