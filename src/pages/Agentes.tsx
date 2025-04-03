
import { useState, useRef, useEffect } from "react";
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
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { 
  Bot, 
  Plus, 
  Save, 
  Trash2, 
  Zap, 
  MessageSquare, 
  User, 
  Settings, 
  Brain,
  Upload,
  FileText,
  Pencil,
  Link as LinkIcon,
  AlertTriangle,
  Download,
  ArrowLeft,
  Globe,
  Clock,
  Key,
  CheckCircle2,
  RefreshCw
} from "lucide-react";
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
import { useForm } from "react-hook-form";

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
    idiomas: ["Português", "Inglês"],
    tempoResposta: 2,
    palavrasChave: ["compra", "produto", "disponibilidade"],
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
    idiomas: ["Português"],
    tempoResposta: 1,
    palavrasChave: ["problema", "erro", "ajuda"],
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
    idiomas: ["Português", "Espanhol"],
    tempoResposta: 3,
    palavrasChave: ["agendar", "horário", "consulta"],
  },
];

// Estrutura para os documentos de treinamento
interface DocumentoTreinamento {
  id: string;
  nome: string;
  tipo: string;
  tamanho: string;
  data: string;
  status: "processando" | "concluido" | "erro";
}

// Estrutura para perguntas e respostas
interface PerguntaResposta {
  id: string;
  pergunta: string;
  resposta: string;
}

// Estrutura para mensagens de teste
interface MensagemTeste {
  id: string;
  texto: string;
  remetente: "usuario" | "agente";
  timestamp: string;
}

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
  const [testMessages, setTestMessages] = useState<MensagemTeste[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [trainingTab, setTrainingTab] = useState("documentos");
  const [treinamentoProgress, setTreinamentoProgress] = useState(0);
  const [documentosTreinamento, setDocumentosTreinamento] = useState<DocumentoTreinamento[]>([]);
  const [perguntasRespostas, setPerguntasRespostas] = useState<PerguntaResposta[]>([]);
  const [novaPergunta, setNovaPergunta] = useState("");
  const [novaResposta, setNovaResposta] = useState("");
  const [backupBeforeDelete, setBackupBeforeDelete] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messageEndRef = useRef<HTMLDivElement>(null);
  const [apiUrl, setApiUrl] = useState("");
  const [treinamentoStatus, setTreinamentoStatus] = useState("");
  
  // Referência para scrollbar em chats de teste
  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [testMessages]);

  const filteredAgentes = agents.filter((agente) =>
    agente.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    agente.descricao.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const resetTestChat = () => {
    setTestMessages([]);
    setTestMessage("");
  };

  const handleDeleteAgent = () => {
    if (selectedAgent) {
      if (backupBeforeDelete) {
        // Simular download de backup
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(selectedAgent));
        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", `backup_agente_${selectedAgent.id}.json`);
        document.body.appendChild(downloadAnchorNode);
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
      }

      const updatedAgents = agents.filter(agent => agent.id !== selectedAgent.id);
      setAgents(updatedAgents);
      toast({
        title: "Agente excluído",
        description: `O agente ${selectedAgent.nome} foi excluído com sucesso.`,
      });
      setOpenDeleteDialog(false);
      setSelectedAgent(null);
      setBackupBeforeDelete(false);
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
    
    // Adicionar mensagem do usuário
    const userMessage: MensagemTeste = {
      id: Date.now().toString(),
      texto: testMessage,
      remetente: "usuario",
      timestamp: new Date().toLocaleTimeString(),
    };
    
    setTestMessages(prev => [...prev, userMessage]);
    setIsProcessing(true);
    
    // Limpar campo de entrada
    setTestMessage("");
    
    // Simular tempo de processamento
    setTimeout(() => {
      const responses = [
        `Olá! Sou o ${selectedAgent?.nome} e estou aqui para ajudar. Baseado na minha base de conhecimento sobre ${selectedAgent?.conhecimento.join(", ")}, posso responder sua dúvida.`,
        `Entendi sua pergunta sobre "${userMessage.texto}". Baseado nas informações disponíveis, posso oferecer as seguintes opções...`,
        `Vou verificar essa informação para você. Baseado nos nossos registros, posso confirmar que...`,
        `Agradeço seu contato! Para responder adequadamente sobre ${userMessage.texto}, utilizarei minha personalidade ${selectedAgent?.personalidade} para fornecer o melhor atendimento.`,
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      // Adicionar resposta do agente
      const agentMessage: MensagemTeste = {
        id: (Date.now() + 1).toString(),
        texto: randomResponse,
        remetente: "agente",
        timestamp: new Date().toLocaleTimeString(),
      };
      
      setTestMessages(prev => [...prev, agentMessage]);
      setIsProcessing(false);
    }, 1500);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      // Criar registros para os arquivos carregados
      const newDocuments: DocumentoTreinamento[] = Array.from(files).map(file => ({
        id: Date.now().toString() + Math.random().toString(36).substring(2, 7),
        nome: file.name,
        tipo: file.type,
        tamanho: formatFileSize(file.size),
        data: new Date().toLocaleDateString(),
        status: "processando"
      }));
      
      setDocumentosTreinamento(prev => [...prev, ...newDocuments]);
      
      // Simular processamento
      toast({
        title: "Arquivos recebidos",
        description: `${files.length} arquivo(s) enviado(s) para processamento.`,
      });
      
      // Reset input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + " bytes";
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
    else return (bytes / 1048576).toFixed(1) + " MB";
  };

  const handleAddQA = () => {
    if (novaPergunta.trim() && novaResposta.trim()) {
      const newQA: PerguntaResposta = {
        id: Date.now().toString(),
        pergunta: novaPergunta,
        resposta: novaResposta
      };
      
      setPerguntasRespostas(prev => [...prev, newQA]);
      setNovaPergunta("");
      setNovaResposta("");
      
      toast({
        title: "Pergunta e resposta adicionadas",
        description: "O par de pergunta e resposta foi adicionado com sucesso.",
      });
    } else {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha tanto a pergunta quanto a resposta.",
        variant: "destructive"
      });
    }
  };

  const handleApiConnect = () => {
    if (apiUrl.trim()) {
      toast({
        title: "API conectada",
        description: `Conexão estabelecida com ${apiUrl}`,
      });
    } else {
      toast({
        title: "URL necessária",
        description: "Por favor, insira uma URL de API válida.",
        variant: "destructive"
      });
    }
  };

  const handleTrainAgent = () => {
    setIsProcessing(true);
    setTreinamentoStatus("processando");
    setTreinamentoProgress(0);
    
    // Simulação de progresso de treinamento
    const intervalId = setInterval(() => {
      setTreinamentoProgress(prev => {
        const newProgress = prev + Math.floor(Math.random() * 10) + 1;
        if (newProgress >= 100) {
          clearInterval(intervalId);
          setTreinamentoStatus("concluido");
          setIsProcessing(false);
          
          // Atualizar status dos documentos para concluído
          setDocumentosTreinamento(prev => 
            prev.map(doc => ({ ...doc, status: "concluido" }))
          );
          
          // Notificar usuário
          toast({
            title: "Treinamento concluído",
            description: `O agente ${selectedAgent?.nome} foi treinado com sucesso.`,
          });
          
          return 100;
        }
        return newProgress;
      });
    }, 300);
    
    // Limpar intervalo se o diálogo for fechado
    return () => clearInterval(intervalId);
  };

  const handleDeleteDocument = (documentId: string) => {
    setDocumentosTreinamento(prev => 
      prev.filter(doc => doc.id !== documentId)
    );
    
    toast({
      title: "Documento removido",
      description: "O documento foi removido da lista de treinamento.",
    });
  };

  const handleDeleteQA = (qaId: string) => {
    setPerguntasRespostas(prev => 
      prev.filter(qa => qa.id !== qaId)
    );
    
    toast({
      title: "Item removido",
      description: "O par de pergunta e resposta foi removido.",
    });
  };

  // Função para criar um novo agente
  const handleCreateAgent = () => {
    const newAgent = {
      id: `AI-${(agents.length + 1).toString().padStart(3, '0')}`,
      nome: "Novo Agente",
      descricao: "Descreva a função deste agente",
      modelo: "GPT-4",
      status: "Ativo",
      canais: ["WhatsApp"],
      criado: new Date().toLocaleDateString(),
      personalidade: "Profissional",
      conhecimento: ["Base de conhecimento vazia"],
      idiomas: ["Português"],
      tempoResposta: 2,
      palavrasChave: [],
    };
    
    setAgents(prev => [...prev, newAgent]);
    setOpenDialog(false);
    
    toast({
      title: "Agente criado",
      description: "Seu agente foi criado com sucesso.",
    });
  };

  // Função para salvar configurações
  const handleSaveSettings = () => {
    if (selectedAgent) {
      // Atualizar o agente selecionado
      const updatedAgents = agents.map(agent => 
        agent.id === selectedAgent.id ? { ...selectedAgent } : agent
      );
      
      setAgents(updatedAgents);
      setOpenSettingsDialog(false);
      
      toast({
        title: "Configurações salvas",
        description: `As configurações do agente ${selectedAgent.nome} foram atualizadas.`,
      });
    }
  };

  // Função para atualizar um valor específico do agente selecionado
  const updateSelectedAgentField = (field: string, value: any) => {
    if (selectedAgent) {
      setSelectedAgent({
        ...selectedAgent,
        [field]: value
      });
    }
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
                <Select defaultValue="amigavel">
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Selecione o tom de voz" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="amigavel">Amigável</SelectItem>
                    <SelectItem value="formal">Formal</SelectItem>
                    <SelectItem value="tecnico">Técnico</SelectItem>
                    <SelectItem value="casual">Casual</SelectItem>
                    <SelectItem value="divertido">Divertido</SelectItem>
                  </SelectContent>
                </Select>
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
                <Label htmlFor="idiomas" className="text-right">
                  Idiomas
                </Label>
                <div className="col-span-3 flex flex-wrap gap-2">
                  <Badge className="bg-brand-100 text-brand-800 cursor-pointer hover:bg-brand-200">
                    Português
                  </Badge>
                  <Badge className="bg-gray-100 text-gray-800 cursor-pointer hover:bg-gray-200">
                    Inglês
                  </Badge>
                  <Badge className="bg-gray-100 text-gray-800 cursor-pointer hover:bg-gray-200">
                    Espanhol
                  </Badge>
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
                onClick={handleCreateAgent} 
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
                      resetTestChat();
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
                      setTrainingTab("documentos");
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
                      setBackupBeforeDelete(false);
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
      <Dialog open={openTestDialog} onOpenChange={(open) => {
        setOpenTestDialog(open);
        if (!open) resetTestChat();
      }}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Testar Agente: {selectedAgent?.nome}</DialogTitle>
            <DialogDescription>
              Envie mensagens para testar como o agente responde com base no seu treinamento.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="bg-gray-50 p-4 rounded-lg h-64 overflow-y-auto flex flex-col">
              {testMessages.length === 0 ? (
                <div className="text-center text-sm text-gray-500 py-2 mt-auto">
                  Envie uma mensagem para iniciar o teste
                </div>
              ) : (
                testMessages.map((msg) => (
                  <div 
                    key={msg.id} 
                    className={`flex flex-col mb-3 ${msg.remetente === "usuario" ? "items-end" : "items-start"}`}
                  >
                    <div 
                      className={`p-3 rounded-lg max-w-[80%] ${
                        msg.remetente === "usuario" 
                          ? "bg-brand-600 text-white" 
                          : "bg-white border border-gray-200"
                      }`}
                    >
                      <p className="text-sm">{msg.texto}</p>
                      <p className={`text-xs text-right mt-1 ${
                        msg.remetente === "usuario" ? "text-brand-100" : "text-gray-500"
                      }`}>
                        {msg.remetente === "usuario" ? "Você" : selectedAgent?.nome} • {msg.timestamp}
                      </p>
                    </div>
                  </div>
                ))
              )}
              
              {isProcessing && (
                <div className="flex items-start my-3">
                  <div className="p-3 rounded-lg bg-white border border-gray-200">
                    <div className="flex space-x-2 items-center h-5">
                      <div className="animate-pulse h-2 w-2 bg-gray-400 rounded-full"></div>
                      <div className="animate-pulse h-2 w-2 bg-gray-400 rounded-full"></div>
                      <div className="animate-pulse h-2 w-2 bg-gray-400 rounded-full"></div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messageEndRef} /> {/* Ref para auto-scroll */}
            </div>
            
            <div className="flex gap-2">
              <Input 
                placeholder="Digite sua mensagem..." 
                value={testMessage}
                onChange={(e) => setTestMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey && !isProcessing) {
                    e.preventDefault();
                    handleTestAgent();
                  }
                }}
                disabled={isProcessing}
              />
              <Button 
                onClick={handleTestAgent} 
                disabled={isProcessing || !testMessage.trim()}
              >
                Enviar
              </Button>
            </div>
            
            <div className="flex justify-between items-center text-sm text-gray-500 border-t pt-2">
              <div className="flex items-center">
                <Brain className="h-4 w-4 mr-1" />
                <span>Modelo: {selectedAgent?.modelo}</span>
              </div>
              
              {testMessages.length > 0 && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={resetTestChat}
                  className="text-xs"
                >
                  <RefreshCw className="h-3 w-3 mr-1" />
                  Reiniciar conversa
                </Button>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenTestDialog(false)}>
              Fechar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Train Dialog */}
      <Dialog open={openTrainDialog} onOpenChange={(open) => {
        setOpenTrainDialog(open);
        if (!open) {
          setIsProcessing(false);
          setTreinamentoProgress(0);
          setTreinamentoStatus("");
        }
      }}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Treinar Agente: {selectedAgent?.nome}</DialogTitle>
            <DialogDescription>
              Adicione novos dados para melhorar o desempenho do agente.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <Tabs defaultValue="documentos" value={trainingTab} onValueChange={setTrainingTab}>
              <TabsList className="grid grid-cols-3 mb-4">
                <TabsTrigger value="documentos" className="flex gap-1 items-center">
                  <FileText className="h-4 w-4" />
                  Documentos
                </TabsTrigger>
                <TabsTrigger value="perguntas" className="flex gap-1 items-center">
                  <MessageSquare className="h-4 w-4" />
                  Perguntas e Respostas
                </TabsTrigger>
                <TabsTrigger value="apis" className="flex gap-1 items-center">
                  <LinkIcon className="h-4 w-4" />
                  APIs Externas
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="documentos" className="space-y-4">
                <div className="flex flex-col gap-4">
                  <div className="border border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                    <h4 className="font-medium mb-1">Arraste arquivos ou clique para fazer upload</h4>
                    <p className="text-sm text-gray-500 mb-3">
                      Suporta PDF, DOCX, TXT e outros documentos de texto
                    </p>
                    <div>
                      <Input 
                        type="file" 
                        multiple
                        className="hidden" 
                        ref={fileInputRef}
                        onChange={handleFileUpload}
                        accept=".pdf,.docx,.txt,.csv,.md,.json,.html"
                      />
                      <Button 
                        variant="outline" 
                        onClick={() => fileInputRef.current?.click()}
                        className="mx-auto"
                      >
                        Selecionar Arquivos
                      </Button>
                    </div>
                  </div>
                  
                  {documentosTreinamento.length > 0 && (
                    <div className="border rounded-lg">
                      <div className="bg-gray-50 px-4 py-2 border-b">
                        <h4 className="font-medium">Documentos para treinamento</h4>
                      </div>
                      <div className="p-2">
                        <div className="divide-y">
                          {documentosTreinamento.map((doc) => (
                            <div key={doc.id} className="py-2 px-2 flex justify-between items-center">
                              <div className="flex items-center gap-2">
                                <FileText className="h-4 w-4 text-gray-400" />
                                <div>
                                  <p className="font-medium text-sm">{doc.nome}</p>
                                  <p className="text-xs text-gray-500">{doc.tamanho} • {doc.data}</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                {doc.status === "processando" ? (
                                  <Badge className="bg-yellow-100 text-yellow-800 text-xs">Processando</Badge>
                                ) : doc.status === "concluido" ? (
                                  <Badge className="bg-green-100 text-green-800 text-xs">
                                    <CheckCircle2 className="h-3 w-3 mr-1" />
                                    Concluído
                                  </Badge>
                                ) : (
                                  <Badge className="bg-red-100 text-red-800 text-xs">Erro</Badge>
                                )}
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className="h-6 w-6 p-0"
                                  onClick={() => handleDeleteDocument(doc.id)}
                                >
                                  <Trash2 className="h-3 w-3 text-gray-500" />
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="perguntas" className="space-y-4">
                <div className="space-y-4">
                  <div className="grid gap-3">
                    <div>
                      <Label htmlFor="pergunta">Pergunta</Label>
                      <Input 
                        id="pergunta" 
                        placeholder="Ex: Quais são os horários de atendimento?" 
                        value={novaPergunta}
                        onChange={(e) => setNovaPergunta(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="resposta">Resposta</Label>
                      <Textarea 
                        id="resposta" 
                        placeholder="Ex: Nosso horário de atendimento é de segunda a sexta, das 9h às 18h." 
                        className="h-20"
                        value={novaResposta}
                        onChange={(e) => setNovaResposta(e.target.value)}
                      />
                    </div>
                    <Button 
                      onClick={handleAddQA}
                      disabled={!novaPergunta.trim() || !novaResposta.trim()}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Adicionar
                    </Button>
                  </div>
                  
                  {perguntasRespostas.length > 0 && (
                    <div className="border rounded-lg">
                      <div className="bg-gray-50 px-4 py-2 border-b">
                        <h4 className="font-medium">Perguntas e respostas adicionadas</h4>
                      </div>
                      <div className="p-2">
                        <div className="divide-y">
                          {perguntasRespostas.map((qa) => (
                            <div key={qa.id} className="py-3 px-3">
                              <div className="flex justify-between">
                                <p className="font-medium text-sm">{qa.pergunta}</p>
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className="h-6 w-6 p-0"
                                  onClick={() => handleDeleteQA(qa.id)}
                                >
                                  <Trash2 className="h-3 w-3 text-gray-500" />
                                </Button>
                              </div>
                              <p className="text-sm text-gray-600 mt-1">{qa.resposta}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="apis" className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="api-url">URL da API</Label>
                    <div className="flex gap-2">
                      <Input 
                        id="api-url" 
                        placeholder="https://api.example.com/data" 
                        value={apiUrl}
                        onChange={(e) => setApiUrl(e.target.value)}
                      />
                      <Button onClick={handleApiConnect} disabled={!apiUrl.trim()}>
                        Conectar
                      </Button>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      Conecte uma API externa para fornecer dados em tempo real ao seu agente.
                    </p>
                  </div>
                  
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center gap-2 text-yellow-700">
                      <AlertTriangle className="h-5 w-5" />
                      <h4 className="font-medium">Permissões de acesso</h4>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">
                      O agente terá acesso para ler dados da API, mas não poderá modificar dados 
                      a menos que especificado nas configurações avançadas.
                    </p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
            
            {treinamentoStatus && (
              <div className={`p-3 rounded-lg ${
                treinamentoStatus === "processando" 
                  ? "bg-blue-50 border border-blue-200" 
                  : "bg-green-50 border border-green-200"
              }`}>
                <div className="flex justify-between items-center mb-2">
                  <p className={`text-sm font-medium ${
                    treinamentoStatus === "processando" ? "text-blue-700" : "text-green-700"
                  }`}>
                    {treinamentoStatus === "processando" 
                      ? "Treinamento em andamento..." 
                      : "Treinamento concluído!"}
                  </p>
                  {treinamentoStatus === "concluido" && (
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                  )}
                </div>
                
                <Progress value={treinamentoProgress} className="h-2" />
                
                {treinamentoStatus === "concluido" && (
                  <p className="text-xs text-green-600 mt-2">
                    O agente foi treinado com sucesso e está pronto para uso.
                  </p>
                )}
              </div>
            )}
          </div>
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setOpenTrainDialog(false)}
              disabled={isProcessing}
            >
              {isProcessing ? "Processando..." : "Cancelar"}
            </Button>
            <Button 
              onClick={handleTrainAgent} 
              disabled={isProcessing || (documentosTreinamento.length === 0 && perguntasRespostas.length === 0 && !apiUrl.trim())}
              className="bg-brand-600 hover:bg-brand-700"
            >
              <Brain className="h-4 w-4 mr-2" />
              {isProcessing ? (
                <>
                  <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                  Processando...
                </>
              ) : (
                "Iniciar Treinamento"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Settings Dialog */}
      <Dialog open={openSettingsDialog} onOpenChange={setOpenSettingsDialog}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Configurações: {selectedAgent?.nome}</DialogTitle>
            <DialogDescription>
              Personalize o comportamento e as capacidades do agente.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6 py-4 max-h-[60vh] overflow-y-auto">
            <div className="space-y-4">
              <h3 className="text-sm font-medium flex items-center">
                <Bot className="h-4 w-4 mr-2" />
                Informações Básicas
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="agent-name">Nome</Label>
                  <Input 
                    id="agent-name" 
                    value={selectedAgent?.nome || ""} 
                    onChange={(e) => updateSelectedAgentField("nome", e.target.value)}
                  />
                </div>
                
                <div>
                  <Label htmlFor="agent-model">Modelo</Label>
                  <Select 
                    value={selectedAgent?.modelo?.toLowerCase()} 
                    onValueChange={(value) => updateSelectedAgentField("modelo", value === "gpt35" ? "GPT-3.5" : value === "gpt4" ? "GPT-4" : "Claude")}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="gpt4">GPT-4</SelectItem>
                      <SelectItem value="gpt35">GPT-3.5</SelectItem>
                      <SelectItem value="claude">Claude</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <Label htmlFor="agent-description">Descrição</Label>
                <Textarea 
                  id="agent-description" 
                  value={selectedAgent?.descricao || ""} 
                  onChange={(e) => updateSelectedAgentField("descricao", e.target.value)}
                  className="h-20"
                />
              </div>
            </div>
            
            <div className="space-y-4 pt-2">
              <h3 className="text-sm font-medium flex items-center">
                <Globe className="h-4 w-4 mr-2" />
                Idiomas Suportados
              </h3>
              
              <div className="space-y-2">
                <div className="flex flex-wrap gap-2">
                  <Badge 
                    className="bg-brand-100 text-brand-800 cursor-pointer hover:bg-brand-200"
                    onClick={() => {
                      if (selectedAgent && !selectedAgent.idiomas.includes("Português")) {
                        updateSelectedAgentField("idiomas", [...selectedAgent.idiomas, "Português"]);
                      }
                    }}
                  >
                    Português
                  </Badge>
                  <Badge 
                    className={`cursor-pointer ${
                      selectedAgent?.idiomas.includes("Inglês") 
                        ? "bg-brand-100 text-brand-800 hover:bg-brand-200" 
                        : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                    }`}
                    onClick={() => {
                      if (selectedAgent) {
                        if (selectedAgent.idiomas.includes("Inglês")) {
                          updateSelectedAgentField("idiomas", selectedAgent.idiomas.filter(i => i !== "Inglês"));
                        } else {
                          updateSelectedAgentField("idiomas", [...selectedAgent.idiomas, "Inglês"]);
                        }
                      }
                    }}
                  >
                    Inglês
                  </Badge>
                  <Badge 
                    className={`cursor-pointer ${
                      selectedAgent?.idiomas.includes("Espanhol") 
                        ? "bg-brand-100 text-brand-800 hover:bg-brand-200" 
                        : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                    }`}
                    onClick={() => {
                      if (selectedAgent) {
                        if (selectedAgent.idiomas.includes("Espanhol")) {
                          updateSelectedAgentField("idiomas", selectedAgent.idiomas.filter(i => i !== "Espanhol"));
                        } else {
                          updateSelectedAgentField("idiomas", [...selectedAgent.idiomas, "Espanhol"]);
                        }
                      }
                    }}
                  >
                    Espanhol
                  </Badge>
                  <Badge 
                    className={`cursor-pointer ${
                      selectedAgent?.idiomas.includes("Francês") 
                        ? "bg-brand-100 text-brand-800 hover:bg-brand-200" 
                        : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                    }`}
                    onClick={() => {
                      if (selectedAgent) {
                        if (selectedAgent.idiomas.includes("Francês")) {
                          updateSelectedAgentField("idiomas", selectedAgent.idiomas.filter(i => i !== "Francês"));
                        } else {
                          updateSelectedAgentField("idiomas", [...selectedAgent.idiomas, "Francês"]);
                        }
                      }
                    }}
                  >
                    Francês
                  </Badge>
                </div>
                <p className="text-xs text-gray-500">Clique nos idiomas para selecionar/deselecionar</p>
              </div>
            </div>
            
            <div className="space-y-4 pt-2">
              <h3 className="text-sm font-medium flex items-center">
                <MessageSquare className="h-4 w-4 mr-2" />
                Canais de Atendimento
              </h3>
              
              <div className="space-y-2">
                <div className="flex flex-wrap gap-2">
                  {["WhatsApp", "Site", "Instagram", "Facebook", "E-mail"].map((canal) => (
                    <Badge 
                      key={canal}
                      className={`cursor-pointer ${
                        selectedAgent?.canais.includes(canal) 
                          ? "bg-brand-100 text-brand-800 hover:bg-brand-200" 
                          : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                      }`}
                      onClick={() => {
                        if (selectedAgent) {
                          if (selectedAgent.canais.includes(canal)) {
                            updateSelectedAgentField("canais", selectedAgent.canais.filter(c => c !== canal));
                          } else {
                            updateSelectedAgentField("canais", [...selectedAgent.canais, canal]);
                          }
                        }
                      }}
                    >
                      {canal}
                    </Badge>
                  ))}
                </div>
                <p className="text-xs text-gray-500">Clique nos canais para selecionar/deselecionar</p>
              </div>
            </div>
            
            <div className="space-y-4 pt-2">
              <h3 className="text-sm font-medium flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                Tempo de Resposta
              </h3>
              
              <div>
                <div className="flex justify-between text-sm">
                  <span>Imediato</span>
                  <span>Alguns segundos</span>
                  <span>Até 5 segundos</span>
                </div>
                <Slider 
                  value={[selectedAgent?.tempoResposta || 2]} 
                  min={1} 
                  max={5} 
                  step={1} 
                  className="mt-1"
                  onValueChange={(value) => updateSelectedAgentField("tempoResposta", value[0])}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Defina um tempo de resposta adequado para tornar a interação mais humanizada
                </p>
              </div>
            </div>
            
            <div className="space-y-4 pt-2">
              <h3 className="text-sm font-medium flex items-center">
                <Key className="h-4 w-4 mr-2" />
                Palavras-chave Personalizadas
              </h3>
              
              <div>
                <div className="flex flex-wrap gap-2 mb-2">
                  {selectedAgent?.palavrasChave.map((palavra, index) => (
                    <Badge key={index} className="bg-gray-100 flex items-center gap-1">
                      {palavra}
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-4 w-4 p-0 ml-1 hover:bg-transparent"
                        onClick={() => {
                          if (selectedAgent) {
                            updateSelectedAgentField(
                              "palavrasChave", 
                              selectedAgent.palavrasChave.filter((_, i) => i !== index)
                            );
                          }
                        }}
                      >
                        <Trash2 className="h-3 w-3 text-gray-500" />
                      </Button>
                    </Badge>
                  ))}
                </div>
                
                <div className="flex gap-2">
                  <Input 
                    placeholder="Adicionar palavra-chave..." 
                    id="keyword"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                        if (selectedAgent) {
                          updateSelectedAgentField(
                            "palavrasChave", 
                            [...selectedAgent.palavrasChave, e.currentTarget.value.trim()]
                          );
                          e.currentTarget.value = '';
                        }
                      }
                    }}
                  />
                  <Button 
                    onClick={() => {
                      const input = document.getElementById("keyword") as HTMLInputElement;
                      if (input.value.trim() && selectedAgent) {
                        updateSelectedAgentField(
                          "palavrasChave", 
                          [...selectedAgent.palavrasChave, input.value.trim()]
                        );
                        input.value = '';
                      }
                    }}
                  >
                    Adicionar
                  </Button>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Palavras que acionarão respostas específicas do agente
                </p>
              </div>
            </div>
            
            <div className="space-y-2 pt-2">
              <h3 className="text-sm font-medium flex items-center">
                <User className="h-4 w-4 mr-2" />
                Status do Agente
              </h3>
              
              <div className="flex items-center space-x-2">
                <Switch 
                  id="agent-status" 
                  checked={selectedAgent?.status === "Ativo"} 
                  onCheckedChange={(checked) => updateSelectedAgentField("status", checked ? "Ativo" : "Inativo")}
                />
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
              onClick={handleSaveSettings} 
              className="bg-brand-600 hover:bg-brand-700"
            >
              <Save className="h-4 w-4 mr-2" />
              Salvar Configurações
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex items-center text-red-600 gap-2">
              <AlertTriangle className="h-5 w-5" />
              Confirmar exclusão
            </DialogTitle>
            <DialogDescription>
              Tem certeza que deseja excluir o agente "{selectedAgent?.nome}"? Esta ação não pode ser desfeita.
            </DialogDescription>
          </DialogHeader>
          
          <div className="my-4 bg-red-50 border border-red-200 rounded-md p-4">
            <p className="text-sm text-red-800">
              Esta ação excluirá permanentemente o agente e toda a sua base de conhecimento associada, incluindo:
            </p>
            <ul className="text-sm text-red-700 mt-2 space-y-1 list-disc list-inside">
              <li>Configurações personalizadas</li>
              <li>Base de conhecimento treinada</li>
              <li>Histórico de conversas</li>
              <li>Integrações configuradas</li>
            </ul>
          </div>
          
          <div className="flex items-center space-x-2 mt-2">
            <Checkbox 
              id="backup" 
              checked={backupBeforeDelete} 
              onCheckedChange={(checked) => setBackupBeforeDelete(checked as boolean)}
            />
            <label 
              htmlFor="backup" 
              className="text-sm font-medium leading-none cursor-pointer"
            >
              Fazer backup antes de excluir
            </label>
          </div>
          
          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setOpenDeleteDialog(false)}>
              Cancelar
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleDeleteAgent}
              className="gap-2"
            >
              <Trash2 className="h-4 w-4" />
              Excluir Agente
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

