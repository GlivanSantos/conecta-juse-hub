
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
import { toast } from "@/hooks/use-toast";

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
  const [openTestDialog, setOpenTestDialog] = useState(false);
  const [openTrainDialog, setOpenTrainDialog] = useState(false);
  const [openSettingsDialog, setOpenSettingsDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState<any>(null);
  const [agents, setAgents] = useState(agentesData);
  const [testMessage, setTestMessage] = useState("");
  const [testResponse, setTestResponse] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  
  const filteredAgentes = agents.filter((agente) =>
    agente.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    agente.descricao.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteAgent = () => {
    if (selectedAgent) {
      const updatedAgents = agents.filter(agent => agent.id !== selectedAgent.id);
      setAgents(updatedAgents);
      toast({
        title: "Agente excluído",
        description: `O agente ${selectedAgent.nome} foi excluído com sucesso.`,
      });
      setOpenDeleteDialog(false);
      setSelectedAgent(null);
    }
  };

  const handleTestAgent = () => {
    if (!testMessage.trim()) {
      toast({
        title: "Mensagem vazia",
        description: "Por favor, digite uma mensagem para testar o agente.",
        variant: "destructive"
      });
      return;
    }
    
    setIsProcessing(true);
    
    // Simulando tempo de processamento
    setTimeout(() => {
      const responses = [
        "Olá, sou o assistente virtual e estou aqui para ajudar! Como posso auxiliar com sua solicitação?",
        `Entendi sua pergunta sobre "${testMessage}". Baseado nas informações disponíveis, posso oferecer as seguintes opções...`,
        "Vou verificar essa informação para você. Baseado nos nossos registros, posso confirmar que...",
        "Agradeço seu contato! Para responder adequadamente, precisarei de algumas informações adicionais."
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      setTestResponse(randomResponse);
      setIsProcessing(false);
    }, 1500);
  };

  const handleTrainAgent = () => {
    setIsProcessing(true);
    
    // Simulando tempo de processamento
    setTimeout(() => {
      toast({
        title: "Treinamento concluído",
        description: `O agente ${selectedAgent?.nome} foi treinado com sucesso.`,
      });
      setIsProcessing(false);
      setOpenTrainDialog(false);
    }, 2000);
  };

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
              <Button 
                onClick={() => {
                  setOpenDialog(false);
                  toast({
                    title: "Agente criado",
                    description: "Seu agente foi criado com sucesso.",
                  });
                }} 
                className="bg-brand-600 hover:bg-brand-700"
              >
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
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="flex items-center"
                    onClick={() => {
                      setSelectedAgent(agente);
                      setOpenTestDialog(true);
                    }}
                  >
                    <MessageSquare className="h-4 w-4 mr-1" />
                    Testar
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="flex items-center"
                    onClick={() => {
                      setSelectedAgent(agente);
                      setOpenTrainDialog(true);
                    }}
                  >
                    <Brain className="h-4 w-4 mr-1" />
                    Treinar
                  </Button>
                </div>
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    className="flex items-center text-gray-500 hover:text-gray-700"
                    onClick={() => {
                      setSelectedAgent(agente);
                      setOpenSettingsDialog(true);
                    }}
                  >
                    <Settings className="h-4 w-4" />
                  </Button>
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    className="flex items-center text-gray-500 hover:text-red-600"
                    onClick={() => {
                      setSelectedAgent(agente);
                      setOpenDeleteDialog(true);
                    }}
                  >
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

      {/* Test Dialog */}
      <Dialog open={openTestDialog} onOpenChange={setOpenTestDialog}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>Testar Agente: {selectedAgent?.nome}</DialogTitle>
            <DialogDescription>
              Envie uma mensagem para testar como o agente irá responder.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="bg-gray-50 p-4 rounded-lg max-h-48 overflow-y-auto">
              {testResponse && (
                <div className="flex flex-col">
                  <div className="self-end mb-2 p-3 rounded-lg bg-brand-600 text-white max-w-[80%]">
                    <p className="text-sm">{testMessage}</p>
                    <p className="text-xs text-right mt-1 text-brand-100">Você</p>
                  </div>
                  <div className="self-start p-3 rounded-lg bg-white border border-gray-200 max-w-[80%]">
                    <p className="text-sm">{testResponse}</p>
                    <p className="text-xs text-right mt-1 text-gray-500">{selectedAgent?.nome}</p>
                  </div>
                </div>
              )}
              {!testResponse && !isProcessing && (
                <div className="text-center text-sm text-gray-500 py-2">
                  Envie uma mensagem para iniciar o teste
                </div>
              )}
              {isProcessing && (
                <div className="flex items-center justify-center">
                  <div className="animate-pulse flex space-x-1">
                    <div className="h-2 w-2 bg-gray-400 rounded-full"></div>
                    <div className="h-2 w-2 bg-gray-400 rounded-full"></div>
                    <div className="h-2 w-2 bg-gray-400 rounded-full"></div>
                  </div>
                </div>
              )}
            </div>
            <div className="flex gap-2">
              <Input 
                placeholder="Digite sua mensagem..." 
                value={testMessage}
                onChange={(e) => setTestMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleTestAgent();
                  }
                }}
              />
              <Button onClick={handleTestAgent} disabled={isProcessing}>
                Enviar
              </Button>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => {
              setOpenTestDialog(false);
              setTestMessage("");
              setTestResponse("");
            }}>
              Fechar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Train Dialog */}
      <Dialog open={openTrainDialog} onOpenChange={setOpenTrainDialog}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>Treinar Agente: {selectedAgent?.nome}</DialogTitle>
            <DialogDescription>
              Adicione novos dados para melhorar o desempenho do agente.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Fonte de dados</Label>
              <Select defaultValue="knowledge">
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a fonte de dados" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="knowledge">Base de conhecimento</SelectItem>
                  <SelectItem value="web">Conteúdo da web</SelectItem>
                  <SelectItem value="conversations">Conversas anteriores</SelectItem>
                  <SelectItem value="documents">Documentos</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Conteúdo para treinamento</Label>
              <Textarea 
                placeholder="Cole aqui o texto ou dados para treinamento..." 
                className="h-32"
              />
            </div>
            {isProcessing && (
              <div className="bg-brand-50 p-3 rounded-lg flex items-center">
                <div className="animate-spin h-4 w-4 border-2 border-brand-600 border-t-transparent rounded-full mr-2"></div>
                <span className="text-sm text-brand-600">Processando treinamento...</span>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenTrainDialog(false)}>
              Cancelar
            </Button>
            <Button 
              onClick={handleTrainAgent} 
              disabled={isProcessing}
              className="bg-brand-600 hover:bg-brand-700"
            >
              <Brain className="h-4 w-4 mr-2" />
              Iniciar Treinamento
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Settings Dialog */}
      <Dialog open={openSettingsDialog} onOpenChange={setOpenSettingsDialog}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>Configurações: {selectedAgent?.nome}</DialogTitle>
            <DialogDescription>
              Personalize o comportamento e as capacidades do agente.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="agent-name" className="text-right">Nome</Label>
              <Input id="agent-name" defaultValue={selectedAgent?.nome} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="agent-model" className="text-right">Modelo</Label>
              <Select defaultValue={selectedAgent?.modelo.toLowerCase()}>
                <SelectTrigger className="col-span-3">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gpt4">GPT-4</SelectItem>
                  <SelectItem value="gpt35">GPT-3.5</SelectItem>
                  <SelectItem value="claude">Claude</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="agent-creativity" className="text-right">Criatividade</Label>
              <div className="col-span-3">
                <Slider defaultValue={[70]} max={100} step={1} />
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="agent-status" className="text-right">Status</Label>
              <div className="flex items-center space-x-2 col-span-3">
                <Switch id="agent-status" defaultChecked={selectedAgent?.status === "Ativo"} />
                <Label htmlFor="agent-status">
                  {selectedAgent?.status === "Ativo" ? "Ativo" : "Inativo"}
                </Label>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenSettingsDialog(false)}>
              Cancelar
            </Button>
            <Button 
              onClick={() => {
                toast({
                  title: "Configurações salvas",
                  description: `As configurações do agente ${selectedAgent?.nome} foram atualizadas.`,
                });
                setOpenSettingsDialog(false);
              }} 
              className="bg-brand-600 hover:bg-brand-700"
            >
              <Save className="h-4 w-4 mr-2" />
              Salvar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirmar exclusão</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja excluir o agente "{selectedAgent?.nome}"? Esta ação não pode ser desfeita.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setOpenDeleteDialog(false)}>
              Cancelar
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleDeleteAgent}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Excluir
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

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
