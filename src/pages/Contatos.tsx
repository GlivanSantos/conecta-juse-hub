
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import { Search, Filter, Plus, MoreHorizontal, Edit, Trash2, Phone, MessageSquare, Mail, Download, Upload } from "lucide-react";

// Dados de exemplo para contatos
const contatosData = [
  {
    id: "CT-001",
    nome: "Roberto Almeida",
    email: "roberto.almeida@email.com",
    telefone: "(11) 98765-4321",
    grupo: "Cliente",
    cidade: "São Paulo",
    estado: "SP",
    ultimoContato: "03/04/2025",
  },
  {
    id: "CT-002",
    nome: "Juliana Costa",
    email: "juliana.costa@email.com",
    telefone: "(11) 91234-5678",
    grupo: "Lead",
    cidade: "Rio de Janeiro",
    estado: "RJ",
    ultimoContato: "02/04/2025",
  },
  {
    id: "CT-003",
    nome: "Marcelo Pereira",
    email: "marcelo.pereira@email.com",
    telefone: "(11) 95555-6666",
    grupo: "Fornecedor",
    cidade: "Belo Horizonte",
    estado: "MG",
    ultimoContato: "01/04/2025",
  },
  {
    id: "CT-004",
    nome: "Fernanda Lima",
    email: "fernanda.lima@email.com",
    telefone: "(11) 97777-8888",
    grupo: "Cliente",
    cidade: "Curitiba",
    estado: "PR",
    ultimoContato: "31/03/2025",
  },
  {
    id: "CT-005",
    nome: "Thiago Mendes",
    email: "thiago.mendes@email.com",
    telefone: "(11) 99999-0000",
    grupo: "Parceiro",
    cidade: "Brasília",
    estado: "DF",
    ultimoContato: "30/03/2025",
  },
  {
    id: "CT-006",
    nome: "Camila Rodrigues",
    email: "camila.rodrigues@email.com",
    telefone: "(11) 98888-7777",
    grupo: "Lead",
    cidade: "Salvador",
    estado: "BA",
    ultimoContato: "29/03/2025",
  },
  {
    id: "CT-007",
    nome: "Paulo Ferreira",
    email: "paulo.ferreira@email.com",
    telefone: "(11) 96666-5555",
    grupo: "Cliente",
    cidade: "Recife",
    estado: "PE",
    ultimoContato: "28/03/2025",
  },
  {
    id: "CT-008",
    nome: "Amanda Silveira",
    email: "amanda.silveira@email.com",
    telefone: "(11) 94444-3333",
    grupo: "Lead",
    cidade: "Fortaleza",
    estado: "CE",
    ultimoContato: "27/03/2025",
  },
  {
    id: "CT-009",
    nome: "Lucas Oliveira",
    email: "lucas.oliveira@email.com",
    telefone: "(11) 93333-2222",
    grupo: "Cliente",
    cidade: "Porto Alegre",
    estado: "RS",
    ultimoContato: "26/03/2025",
  },
  {
    id: "CT-010",
    nome: "Mariana Santos",
    email: "mariana.santos@email.com",
    telefone: "(11) 92222-1111",
    grupo: "Parceiro",
    cidade: "Manaus",
    estado: "AM",
    ultimoContato: "25/03/2025",
  },
];

const Contatos = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredContatos, setFilteredContatos] = useState(contatosData);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    
    if (term.trim() === "") {
      setFilteredContatos(contatosData);
    } else {
      const filtered = contatosData.filter(
        (contato) =>
          contato.nome.toLowerCase().includes(term.toLowerCase()) ||
          contato.email.toLowerCase().includes(term.toLowerCase()) ||
          contato.telefone.includes(term) ||
          contato.cidade.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredContatos(filtered);
    }
  };

  const getGrupoColor = (grupo: string) => {
    switch (grupo) {
      case "Cliente":
        return "bg-green-100 text-green-800";
      case "Lead":
        return "bg-blue-100 text-blue-800";
      case "Fornecedor":
        return "bg-purple-100 text-purple-800";
      case "Parceiro":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <>
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Contatos</h1>
          <p className="text-muted-foreground">
            Gerencie todos os seus contatos
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Button variant="outline" className="flex items-center">
            <Upload className="h-4 w-4 mr-2" />
            Importar
          </Button>
          <Button variant="outline" className="flex items-center">
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
          <Button className="bg-brand-600 hover:bg-brand-700">
            <Plus className="h-4 w-4 mr-2" />
            Novo Contato
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mt-6 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Buscar por nome, email, telefone ou cidade..."
            className="pl-10"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <Button variant="outline" className="flex items-center">
          <Filter className="h-4 w-4 mr-2" />
          Filtros
        </Button>
      </div>

      <Card className="mt-4 overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Telefone</TableHead>
                <TableHead>Grupo</TableHead>
                <TableHead>Localização</TableHead>
                <TableHead>Último Contato</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredContatos.map((contato) => (
                <TableRow key={contato.id}>
                  <TableCell className="font-medium">{contato.nome}</TableCell>
                  <TableCell>{contato.email}</TableCell>
                  <TableCell>{contato.telefone}</TableCell>
                  <TableCell>
                    <Badge className={getGrupoColor(contato.grupo)}>
                      {contato.grupo}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {contato.cidade}, {contato.estado}
                  </TableCell>
                  <TableCell>{contato.ultimoContato}</TableCell>
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
        </div>
      </Card>
    </>
  );
};

export default Contatos;
