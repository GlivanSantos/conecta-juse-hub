
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Copy, Plus, RefreshCw, Code, Link2, FileJson, Webhook, ArrowRight, Play, Clock } from "lucide-react";

// Dados de exemplo para webhooks
const webhooksData = [
  {
    id: "WH-001",
    nome: "Novo Atendimento",
    evento: "atendimento.criado",
    url: "https://meusite.com/webhooks/atendimento-criado",
    status: "Ativo",
    ultimoDisparo: "03/04/2025, 10:45",
    ultimoStatus: "Sucesso",
  },
  {
    id: "WH-002",
    nome: "Atendimento Atualizado",
    evento: "atendimento.atualizado",
    url: "https://meusite.com/webhooks/atendimento-atualizado",
    status: "Ativo",
    ultimoDisparo: "03/04/2025, 09:30",
    ultimoStatus: "Erro",
  },
  {
    id: "WH-003",
    nome: "Mensagem Recebida",
    evento: "mensagem.recebida",
    url: "https://meusite.com/webhooks/mensagem-recebida",
    status: "Inativo",
    ultimoDisparo: "01/04/2025, 16:20",
    ultimoStatus: "Sucesso",
  },
];

// Exemplos de código para a documentação da API
const apiExamples = {
  authentication: `curl -X POST https://api.conectajuse.com/v1/auth/token \\
  -H "Content-Type: application/json" \\
  -d '{
    "email": "seu-email@exemplo.com",
    "password": "sua-senha"
  }'`,
  
  sendMessage: `curl -X POST https://api.conectajuse.com/v1/messages \\
  -H "Authorization: Bearer SEU_TOKEN_AQUI" \\
  -H "Content-Type: application/json" \\
  -d '{
    "to": "+5511987654321",
    "body": "Olá! Esta é uma mensagem de teste.",
    "channel": "whatsapp"
  }'`,
  
  getTickets: `curl -X GET https://api.conectajuse.com/v1/tickets \\
  -H "Authorization: Bearer SEU_TOKEN_AQUI" \\
  -H "Content-Type: application/json"`,
};

const Integracao = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [apiKey] = useState("cj_test_Gd3xX5zP8qR7tV2wL9kB1mN6oY4jH3iZ");
  
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // Aqui poderia usar o toast para informar que foi copiado
  };

  return (
    <>
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Integração</h1>
          <p className="text-muted-foreground">
            Gerencie APIs e webhooks para integração com outros sistemas
          </p>
        </div>
      </div>

      <Tabs defaultValue="api" className="mt-6">
        <TabsList className="mb-6">
          <TabsTrigger value="api" className="flex items-center">
            <Code className="h-4 w-4 mr-2" />
            API
          </TabsTrigger>
          <TabsTrigger value="webhooks" className="flex items-center">
            <Webhook className="h-4 w-4 mr-2" />
            Webhooks
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="api">
          <Card className="p-6 mb-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
              <div>
                <h3 className="text-lg font-semibold">Chaves de API</h3>
                <p className="text-muted-foreground">
                  Utilize estas chaves para autenticar suas requisições à API
                </p>
              </div>
              <Button className="bg-brand-600 hover:bg-brand-700">
                <RefreshCw className="h-4 w-4 mr-2" />
                Gerar Nova Chave
              </Button>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2 col-span-2">
                  <Label htmlFor="api-key">Chave de Teste</Label>
                  <div className="flex">
                    <Input
                      id="api-key"
                      value={apiKey}
                      className="rounded-r-none font-mono"
                      readOnly
                    />
                    <Button
                      variant="secondary"
                      className="rounded-l-none"
                      onClick={() => copyToClipboard(apiKey)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Status</Label>
                  <div className="flex items-center h-10">
                    <Badge className="bg-green-100 text-green-800">
                      Ativo
                    </Badge>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2 col-span-2">
                  <Label htmlFor="api-key-prod">Chave de Produção</Label>
                  <div className="flex">
                    <Input
                      id="api-key-prod"
                      value="cj_prod_••••••••••••••••••••••••••••••••"
                      className="rounded-r-none font-mono"
                      readOnly
                    />
                    <Button
                      variant="secondary"
                      className="rounded-l-none"
                      onClick={() => copyToClipboard("cj_prod_Jd5xX9zP2qR1tV8wL3kB7mN9oY6jH5iZ")}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Status</Label>
                  <div className="flex items-center h-10">
                    <Badge className="bg-green-100 text-green-800">
                      Ativo
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="border-t pt-4 mt-4">
                <p className="text-sm text-muted-foreground mb-2">
                  <span className="font-medium text-red-600">Atenção:</span> Suas chaves de API são secretas. Não compartilhe em ambientes públicos ou no código fonte do cliente.
                </p>
              </div>
            </div>
          </Card>
          
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Documentação da API</h3>
            
            <div className="space-y-6">
              <div>
                <h4 className="text-md font-medium mb-2 flex items-center">
                  <FileJson className="h-4 w-4 mr-2 text-brand-600" />
                  Autenticação
                </h4>
                <div className="bg-gray-50 p-4 rounded-md">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-sm font-medium">Obter Token de Autenticação</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={() => copyToClipboard(apiExamples.authentication)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                  <pre className="text-xs overflow-x-auto p-2 bg-gray-100 rounded">
                    {apiExamples.authentication}
                  </pre>
                </div>
              </div>
              
              <div>
                <h4 className="text-md font-medium mb-2 flex items-center">
                  <FileJson className="h-4 w-4 mr-2 text-brand-600" />
                  Mensagens
                </h4>
                <div className="bg-gray-50 p-4 rounded-md">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-sm font-medium">Enviar Mensagem</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={() => copyToClipboard(apiExamples.sendMessage)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                  <pre className="text-xs overflow-x-auto p-2 bg-gray-100 rounded">
                    {apiExamples.sendMessage}
                  </pre>
                </div>
              </div>
              
              <div>
                <h4 className="text-md font-medium mb-2 flex items-center">
                  <FileJson className="h-4 w-4 mr-2 text-brand-600" />
                  Atendimentos
                </h4>
                <div className="bg-gray-50 p-4 rounded-md">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-sm font-medium">Listar Atendimentos</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={() => copyToClipboard(apiExamples.getTickets)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                  <pre className="text-xs overflow-x-auto p-2 bg-gray-100 rounded">
                    {apiExamples.getTickets}
                  </pre>
                </div>
              </div>
              
              <div className="flex justify-center pt-4">
                <Button variant="outline" className="flex items-center">
                  <Link2 className="h-4 w-4 mr-2" />
                  Acessar Documentação Completa
                </Button>
              </div>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="webhooks">
          <Card className="p-6 mb-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
              <div>
                <h3 className="text-lg font-semibold">Webhooks</h3>
                <p className="text-muted-foreground">
                  Configure endpoints para receber notificações de eventos
                </p>
              </div>
              <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogTrigger asChild>
                  <Button className="bg-brand-600 hover:bg-brand-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Novo Webhook
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[525px]">
                  <DialogHeader>
                    <DialogTitle>Adicionar Novo Webhook</DialogTitle>
                    <DialogDescription>
                      Configure um endpoint para receber notificações de eventos.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="webhook-nome" className="text-right">
                        Nome
                      </Label>
                      <Input
                        id="webhook-nome"
                        placeholder="Ex: Notificação de novo atendimento"
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="webhook-evento" className="text-right">
                        Evento
                      </Label>
                      <Select>
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Selecione um evento" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="atendimento.criado">Atendimento Criado</SelectItem>
                          <SelectItem value="atendimento.atualizado">Atendimento Atualizado</SelectItem>
                          <SelectItem value="atendimento.fechado">Atendimento Fechado</SelectItem>
                          <SelectItem value="mensagem.recebida">Mensagem Recebida</SelectItem>
                          <SelectItem value="mensagem.enviada">Mensagem Enviada</SelectItem>
                          <SelectItem value="lead.criado">Lead Criado</SelectItem>
                          <SelectItem value="lead.convertido">Lead Convertido</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="webhook-url" className="text-right">
                        URL
                      </Label>
                      <Input
                        id="webhook-url"
                        placeholder="https://seu-site.com/webhook"
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label className="text-right">
                        Status
                      </Label>
                      <div className="flex items-center space-x-2 col-span-3">
                        <Switch id="webhook-status" defaultChecked />
                        <Label htmlFor="webhook-status">Ativo</Label>
                      </div>
                    </div>
                    <div className="grid grid-cols-4 items-start gap-4">
                      <Label htmlFor="webhook-secret" className="text-right pt-2">
                        Secret Key
                      </Label>
                      <div className="col-span-3">
                        <Input
                          id="webhook-secret"
                          placeholder="Opcional: Chave para validar a assinatura dos eventos"
                        />
                        <p className="text-xs text-muted-foreground mt-1">
                          Use esta chave para verificar a autenticidade dos eventos recebidos.
                        </p>
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setOpenDialog(false)}>
                      Cancelar
                    </Button>
                    <Button onClick={() => setOpenDialog(false)} className="bg-brand-600 hover:bg-brand-700">
                      Salvar Webhook
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
            
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Evento</TableHead>
                  <TableHead>URL</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Último Disparo</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {webhooksData.map((webhook) => (
                  <TableRow key={webhook.id}>
                    <TableCell className="font-medium">{webhook.nome}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{webhook.evento}</Badge>
                    </TableCell>
                    <TableCell className="max-w-xs truncate">{webhook.url}</TableCell>
                    <TableCell>
                      <Badge className={webhook.status === "Ativo" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}>
                        {webhook.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span>{webhook.ultimoDisparo}</span>
                        <span className={`text-xs ${webhook.ultimoStatus === "Sucesso" ? "text-green-600" : "text-red-600"}`}>
                          {webhook.ultimoStatus}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button size="sm" variant="outline" className="flex items-center">
                          <Play className="h-3 w-3 mr-1" />
                          Testar
                        </Button>
                        <Button size="sm" variant="outline">
                          Editar
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
          
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Logs de Eventos</h3>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="col-span-2">
                  <Select defaultValue="all">
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um evento" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos os eventos</SelectItem>
                      <SelectItem value="atendimento.criado">Atendimento Criado</SelectItem>
                      <SelectItem value="atendimento.atualizado">Atendimento Atualizado</SelectItem>
                      <SelectItem value="mensagem.recebida">Mensagem Recebida</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Select defaultValue="7d">
                    <SelectTrigger>
                      <SelectValue placeholder="Período" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="24h">Últimas 24 horas</SelectItem>
                      <SelectItem value="7d">Últimos 7 dias</SelectItem>
                      <SelectItem value="30d">Últimos 30 dias</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Button variant="outline" className="w-full flex items-center">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Atualizar
                  </Button>
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-md h-64 overflow-y-auto">
                <div className="space-y-3">
                  <div className="border-l-4 border-green-500 pl-3 py-1">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 text-muted-foreground mr-2" />
                      <span className="text-xs text-muted-foreground">03/04/2025, 10:45:12</span>
                    </div>
                    <div className="flex items-center mt-1">
                      <Badge variant="outline" className="mr-2">atendimento.criado</Badge>
                      <ArrowRight className="h-3 w-3 text-muted-foreground mx-1" />
                      <span className="text-sm truncate">https://meusite.com/webhooks/atendimento-criado</span>
                    </div>
                    <p className="text-sm text-green-600 mt-1">Sucesso (HTTP 200)</p>
                  </div>
                  
                  <div className="border-l-4 border-red-500 pl-3 py-1">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 text-muted-foreground mr-2" />
                      <span className="text-xs text-muted-foreground">03/04/2025, 09:30:45</span>
                    </div>
                    <div className="flex items-center mt-1">
                      <Badge variant="outline" className="mr-2">atendimento.atualizado</Badge>
                      <ArrowRight className="h-3 w-3 text-muted-foreground mx-1" />
                      <span className="text-sm truncate">https://meusite.com/webhooks/atendimento-atualizado</span>
                    </div>
                    <p className="text-sm text-red-600 mt-1">Erro (HTTP 500)</p>
                  </div>
                  
                  <div className="border-l-4 border-green-500 pl-3 py-1">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 text-muted-foreground mr-2" />
                      <span className="text-xs text-muted-foreground">02/04/2025, 16:20:33</span>
                    </div>
                    <div className="flex items-center mt-1">
                      <Badge variant="outline" className="mr-2">mensagem.recebida</Badge>
                      <ArrowRight className="h-3 w-3 text-muted-foreground mx-1" />
                      <span className="text-sm truncate">https://meusite.com/webhooks/mensagem-recebida</span>
                    </div>
                    <p className="text-sm text-green-600 mt-1">Sucesso (HTTP 200)</p>
                  </div>
                  
                  <div className="border-l-4 border-green-500 pl-3 py-1">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 text-muted-foreground mr-2" />
                      <span className="text-xs text-muted-foreground">02/04/2025, 15:10:22</span>
                    </div>
                    <div className="flex items-center mt-1">
                      <Badge variant="outline" className="mr-2">lead.convertido</Badge>
                      <ArrowRight className="h-3 w-3 text-muted-foreground mx-1" />
                      <span className="text-sm truncate">https://meusite.com/webhooks/lead-convertido</span>
                    </div>
                    <p className="text-sm text-green-600 mt-1">Sucesso (HTTP 200)</p>
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <Button variant="link" className="text-brand-600">
                  Ver todos os logs
                </Button>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  );
};

export default Integracao;
