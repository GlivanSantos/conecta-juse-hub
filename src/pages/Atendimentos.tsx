
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Plus, MessageCircle } from "lucide-react";

// Dados de exemplo para atendimentos
const atendimentosAbertos = [
  {
    id: "ATD-1001",
    cliente: "João Silva",
    telefone: "+55 11 98765-4321",
    assunto: "Dúvidas sobre pagamento",
    ultimaMensagem: "Gostaria de saber como posso parcelar minha compra",
    canal: "whatsapp",
    horario: "10:45",
    prioridade: "alta",
    atendente: "Carlos",
  },
  {
    id: "ATD-1002",
    cliente: "Maria Oliveira",
    telefone: "+55 11 91234-5678",
    assunto: "Problema com entrega",
    ultimaMensagem: "Meu pedido ainda não chegou, já se passaram 5 dias",
    canal: "facebook",
    horario: "11:20",
    prioridade: "média",
    atendente: "Ana",
  },
  {
    id: "ATD-1003",
    cliente: "Pedro Souza",
    telefone: "+55 11 97777-8888",
    assunto: "Informações sobre produto",
    ultimaMensagem: "Este produto está disponível na cor azul?",
    canal: "instagram",
    horario: "12:05",
    prioridade: "baixa",
    atendente: "Mariana",
  },
];

const atendimentosPendentes = [
  {
    id: "ATD-984",
    cliente: "Lucas Santos",
    telefone: "+55 11 95555-6666",
    assunto: "Orçamento personalizado",
    ultimaMensagem: "Aguardando retorno do setor financeiro",
    canal: "whatsapp",
    horario: "Ontem, 15:30",
    prioridade: "média",
    atendente: "Ricardo",
  },
  {
    id: "ATD-990",
    cliente: "Fernanda Lima",
    telefone: "+55 11 94444-3333",
    assunto: "Troca de produto",
    ultimaMensagem: "Cliente enviará fotos do produto com defeito",
    canal: "facebook",
    horario: "Ontem, 16:45",
    prioridade: "alta",
    atendente: "Paulo",
  },
];

const atendimentosFechados = [
  {
    id: "ATD-950",
    cliente: "Thiago Mendes",
    telefone: "+55 11 99999-8888",
    assunto: "Cancelamento de compra",
    ultimaMensagem: "Pedido cancelado e reembolso processado",
    canal: "whatsapp",
    horario: "20/03/2025, 14:20",
    prioridade: "alta",
    atendente: "Juliana",
  },
  {
    id: "ATD-945",
    cliente: "Amanda Costa",
    telefone: "+55 11 98888-7777",
    assunto: "Dúvida sobre garantia",
    ultimaMensagem: "Cliente satisfeito com as informações",
    canal: "site",
    horario: "19/03/2025, 10:15",
    prioridade: "baixa",
    atendente: "Roberto",
  },
  {
    id: "ATD-939",
    cliente: "Bruno Almeida",
    telefone: "+55 11 97777-6666",
    assunto: "Problema com login",
    ultimaMensagem: "Problema resolvido após redefinição de senha",
    canal: "email",
    horario: "18/03/2025, 16:30",
    prioridade: "média",
    atendente: "Camila",
  },
];

// Componente para exibir um atendimento
const AtendimentoCard = ({ atendimento }: { atendimento: any }) => {
  const getCanalColor = (canal: string) => {
    switch (canal) {
      case "whatsapp":
        return "bg-green-100 text-green-800";
      case "facebook":
        return "bg-blue-100 text-blue-800";
      case "instagram":
        return "bg-purple-100 text-purple-800";
      case "email":
        return "bg-yellow-100 text-yellow-800";
      case "site":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPrioridadeColor = (prioridade: string) => {
    switch (prioridade) {
      case "alta":
        return "bg-red-100 text-red-800";
      case "média":
        return "bg-orange-100 text-orange-800";
      case "baixa":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card className="p-4 mb-4 cursor-pointer hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center">
          <span className="font-medium text-brand-800">{atendimento.id}</span>
          <span className="mx-2 text-gray-400">•</span>
          <Badge className={getCanalColor(atendimento.canal)}>
            {atendimento.canal}
          </Badge>
        </div>
        <div className="text-xs text-gray-500">{atendimento.horario}</div>
      </div>

      <div className="mb-2">
        <h3 className="text-md font-semibold">{atendimento.cliente}</h3>
        <p className="text-sm text-gray-600">{atendimento.telefone}</p>
      </div>

      <div className="mb-2">
        <p className="text-sm font-medium">{atendimento.assunto}</p>
        <p className="text-sm text-gray-600 truncate">{atendimento.ultimaMensagem}</p>
      </div>

      <div className="flex justify-between items-center mt-3">
        <Badge className={getPrioridadeColor(atendimento.prioridade)}>
          {atendimento.prioridade}
        </Badge>
        <div className="text-xs text-gray-500">
          Atendente: {atendimento.atendente}
        </div>
      </div>
    </Card>
  );
};

const Atendimentos = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <>
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Atendimentos</h1>
          <p className="text-muted-foreground">
            Gerencie todos os seus atendimentos
          </p>
        </div>
        <Button className="bg-brand-600 hover:bg-brand-700">
          <Plus className="h-4 w-4 mr-2" />
          Novo Atendimento
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mt-6 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Buscar por nome, número ou assunto..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Select defaultValue="todos">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Atendente" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos atendentes</SelectItem>
              <SelectItem value="carlos">Carlos</SelectItem>
              <SelectItem value="ana">Ana</SelectItem>
              <SelectItem value="mariana">Mariana</SelectItem>
              <SelectItem value="ricardo">Ricardo</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" className="flex items-center">
            <Filter className="h-4 w-4 mr-2" />
            Filtros
          </Button>
        </div>
      </div>

      <Tabs defaultValue="abertos" className="w-full">
        <TabsList className="mb-6 grid w-full grid-cols-3">
          <TabsTrigger value="abertos" className="flex items-center">
            <MessageCircle className="h-4 w-4 mr-2" />
            Abertos <Badge className="ml-2 bg-brand-100 text-brand-800">{atendimentosAbertos.length}</Badge>
          </TabsTrigger>
          <TabsTrigger value="pendentes">
            Pendentes <Badge className="ml-2 bg-orange-100 text-orange-800">{atendimentosPendentes.length}</Badge>
          </TabsTrigger>
          <TabsTrigger value="fechados">
            Fechados <Badge className="ml-2 bg-gray-100 text-gray-800">{atendimentosFechados.length}</Badge>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="abertos">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {atendimentosAbertos.map((atendimento) => (
              <AtendimentoCard key={atendimento.id} atendimento={atendimento} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="pendentes">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {atendimentosPendentes.length > 0 ? (
              atendimentosPendentes.map((atendimento) => (
                <AtendimentoCard key={atendimento.id} atendimento={atendimento} />
              ))
            ) : (
              <div className="col-span-3 text-center py-12">
                <p className="text-muted-foreground">Não há atendimentos pendentes</p>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="fechados">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {atendimentosFechados.map((atendimento) => (
              <AtendimentoCard key={atendimento.id} atendimento={atendimento} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </>
  );
};

export default Atendimentos;
