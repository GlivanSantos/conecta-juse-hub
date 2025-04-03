
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Bot, Plus, Save, Trash2, Zap, MessageSquare, User, Settings, Brain } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// Dados de exemplo para agentes de IA
const agentesData = [
  {
    id: "AI-001",
    nome: "Assistente de Vendas",
    descricao: "Auxilia clientes com dúvidas sobre produtos e finalização de compras",
    modelo: "GPT-4",
    status: "Ativo",
    canais: ["WhatsApp", "Site"],
    criado: "01/03/2025",
    personalidade: "Prestativo e amigável",
    conhecimento: ["Produtos", "Preços", "Estoque"],
  },
  {
    id: "AI-002",
    nome: "Suporte Técnico",
    descricao: "Resolve problemas técnicos e dúvidas sobre uso dos serviços",
    modelo: "Claude",
    status: "Ativo",
    canais: ["WhatsApp", "Email"],
    criado: "15/02/2025",
    personalidade: "Técnico e direto",
    conhecimento: ["FAQ", "Troubleshooting", "Manuais"],
  },
  {
    id: "AI-003",
    nome: "Agendamento",
    descricao: "Auxilia clientes a marcar consultas e gerenciar horários",
    modelo: "GPT-3.5",
    status: "Inativo",
    canais: ["Site"],
    criado: "10/01/2025",
    personalidade: "Eficiente e organizado",
    conhecimento: ["Agenda", "Disponibilidade", "Procedimentos"],
  },
];

const Agentes = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  
  const filteredAgentes = agentesData.filter((agente) =>
    agente.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    agente.descricao.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Agentes de IA</h1>
          <p className="text-muted-foreground">
            Crie e gerencie seus assistentes virtuais
          </p>
        </div>
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogTrigger asChild>
            <Button className="bg-brand-600 hover:bg-brand-700">
              <Plus className="h-4 w-4 mr-2" />
              Novo Agente
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>Criar novo agente de IA</DialogTitle>
              <DialogDescription>
                Configure as características e habilidades do seu novo assistente virtual.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="nome" className="text-right">
                  Nome
                </Label>
                <Input
                  id="nome"
                  placeholder="Ex: Assistente de Vendas"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="descricao" className="text-right">
                  Descrição
                </Label>
                <Textarea
                  id="descricao"
                  placeholder="Descreva a função deste agente"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="modelo" className="text-right">
                  Modelo
                </Label>
                <Select defaultValue="gpt4">
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Selecione um modelo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="gpt4">GPT-4</SelectItem>
                    <SelectItem value="gpt35">GPT-3.5</SelectItem>
                    <SelectItem value="claude">Claude</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="personalidade" className="text-right">
                  Personalidade
                </Label>
                <Input
                  id="personalidade"
                  placeholder="Ex: Amigável e prestativo"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="canais" className="text-right">
                  Canais
                </Label>
                <div className="col-span-3 flex flex-wrap gap-2">
                  <Badge className="bg-brand-100 text-brand-800 cursor-pointer hover:bg-brand-200">
                    WhatsApp
                  </Badge>
                  <Badge className="bg-gray-100 text-gray-800 cursor-pointer hover:bg-gray-200">
                    Site
                  </Badge>
                  <Badge className="bg-gray-100 text-gray-800 cursor-pointer hover:bg-gray-200">
                    Facebook
                  </Badge>
                  <Badge className="bg-gray-100 text-gray-800 cursor-pointer hover:bg-gray-200">
                    Instagram
                  </Badge>
                  <Badge className="bg-gray-100 text-gray-800 cursor-pointer hover:bg-gray-200">
                    E-mail
                  </Badge>
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="criatividade" className="text-right">
                  Criatividade
                </Label>
                <div className="col-span-3">
                  <Slider defaultValue={[70]} max={100} step={1} className="mt-2" />
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="status" className="text-right">
                  Ativo
                </Label>
                <div className="flex items-center space-x-2 col-span-3">
                  <Switch id="status" defaultChecked />
                  <Label htmlFor="status">Ativar imediatamente</Label>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpenDialog(false)}>
                Cancelar
              </Button>
              <Button onClick={() => setOpenDialog(false)} className="bg-brand-600 hover:bg-brand-700">
                <Save className="h-4 w-4 mr-2" />
                Salvar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="mt-6 mb-8">
        <Input
          placeholder="Buscar agentes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-md"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAgentes.map((agente) => (
          <Card key={agente.id} className="overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center">
                  <div className={`p-2 rounded-full ${agente.status === "Ativo" ? "bg-green-100" : "bg-gray-100"}`}>
                    <Bot className={`h-5 w-5 ${agente.status === "Ativo" ? "text-green-600" : "text-gray-600"}`} />
                  </div>
                  <div className="ml-3">
                    <h3 className="font-semibold text-lg">{agente.nome}</h3>
                    <p className="text-sm text-muted-foreground">ID: {agente.id}</p>
                  </div>
                </div>
                <Badge className={agente.status === "Ativo" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}>
                  {agente.status}
                </Badge>
              </div>
              
              <p className="text-sm mb-4">{agente.descricao}</p>
              
              <div className="grid grid-cols-2 gap-2 text-sm mb-4">
                <div>
                  <p className="text-muted-foreground">Modelo:</p>
                  <p>{agente.modelo}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Criado em:</p>
                  <p>{agente.criado}</p>
                </div>
              </div>
              
              <div className="mb-4">
                <p className="text-sm text-muted-foreground mb-2">Canais:</p>
                <div className="flex flex-wrap gap-2">
                  {agente.canais.map((canal) => (
                    <Badge key={canal} variant="outline">
                      {canal}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-between mt-6">
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="flex items-center">
                    <MessageSquare className="h-4 w-4 mr-1" />
                    Testar
                  </Button>
                  <Button size="sm" variant="outline" className="flex items-center">
                    <Brain className="h-4 w-4 mr-1" />
                    Treinar
                  </Button>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="ghost" className="flex items-center text-gray-500 hover:text-gray-700">
                    <Settings className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="ghost" className="flex items-center text-gray-500 hover:text-red-600">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}

        {/* Card para adicionar novo agente */}
        <Card className="flex items-center justify-center p-6 border-dashed cursor-pointer hover:bg-gray-50 transition-colors" onClick={() => setOpenDialog(true)}>
          <div className="text-center">
            <div className="mx-auto w-12 h-12 rounded-full bg-brand-50 flex items-center justify-center mb-4">
              <Plus className="h-6 w-6 text-brand-600" />
            </div>
            <h3 className="font-medium text-lg mb-1">Novo Agente</h3>
            <p className="text-sm text-muted-foreground">
              Crie um novo assistente virtual
            </p>
          </div>
        </Card>
      </div>

      <div className="mt-12">
        <Tabs defaultValue="overview">
          <TabsList className="mb-6">
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="settings">Configurações</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Desempenho dos Agentes</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <MessageSquare className="h-5 w-5 text-brand-600 mr-2" />
                    <h4 className="font-medium">Atendimentos</h4>
                  </div>
                  <p className="text-2xl font-bold">1,284</p>
                  <p className="text-sm text-muted-foreground">Nos últimos 30 dias</p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <User className="h-5 w-5 text-green-600 mr-2" />
                    <h4 className="font-medium">Taxa de Resolução</h4>
                  </div>
                  <p className="text-2xl font-bold">78%</p>
                  <p className="text-sm text-muted-foreground">Sem intervenção humana</p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <Zap className="h-5 w-5 text-yellow-600 mr-2" />
                    <h4 className="font-medium">Tempo Médio</h4>
                  </div>
                  <p className="text-2xl font-bold">1m 45s</p>
                  <p className="text-sm text-muted-foreground">Para primeira resposta</p>
                </div>
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="analytics">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Analytics</h3>
              <p className="text-muted-foreground">
                Dados analíticos detalhados estarão disponíveis nesta seção.
              </p>
            </Card>
          </TabsContent>
          
          <TabsContent value="settings">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Configurações Globais</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-4 gap-4">
                  <Label htmlFor="api-key" className="text-right">Chave API</Label>
                  <Input id="api-key" type="password" value="••••••••••••••••" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 gap-4">
                  <Label htmlFor="model-default" className="text-right">Modelo Padrão</Label>
                  <Select defaultValue="gpt4">
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Selecione um modelo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="gpt4">GPT-4</SelectItem>
                      <SelectItem value="gpt35">GPT-3.5</SelectItem>
                      <SelectItem value="claude">Claude</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 gap-4">
                  <Label className="text-right">Fallback Humano</Label>
                  <div className="flex items-center space-x-2 col-span-3">
                    <Switch id="fallback" defaultChecked />
                    <Label htmlFor="fallback">Ativar transferência para humano quando necessário</Label>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default Agentes;
