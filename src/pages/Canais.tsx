
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { PhoneCall, Plus, Settings, Smartphone, MessageSquare, RefreshCw, QrCode, Trash2 } from "lucide-react";

// Dados de exemplo para canais do WhatsApp
const whatsappData = [
  {
    id: "WA-001",
    numero: "+55 11 98765-4321",
    nome: "Atendimento Principal",
    status: "Conectado",
    responsavel: "Carlos Santos",
    mensagensEnviadas: 1254,
    mensagensRecebidas: 986,
    ultimaAtividade: "03/04/2025, 10:45",
  },
  {
    id: "WA-002",
    numero: "+55 11 91234-5678",
    nome: "Suporte Técnico",
    status: "Conectado",
    responsavel: "Ana Silva",
    mensagensEnviadas: 876,
    mensagensRecebidas: 543,
    ultimaAtividade: "03/04/2025, 09:30",
  },
  {
    id: "WA-003",
    numero: "+55 11 95555-6666",
    nome: "Vendas",
    status: "Desconectado",
    responsavel: "Ricardo Oliveira",
    mensagensEnviadas: 452,
    mensagensRecebidas: 321,
    ultimaAtividade: "01/04/2025, 16:20",
  },
];

const Canais = () => {
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <>
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Canais</h1>
          <p className="text-muted-foreground">
            Gerencie seus canais de comunicação
          </p>
        </div>
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogTrigger asChild>
            <Button className="bg-brand-600 hover:bg-brand-700">
              <Plus className="h-4 w-4 mr-2" />
              Novo Canal
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>Adicionar Novo Canal</DialogTitle>
              <DialogDescription>
                Conecte um novo número de WhatsApp ou outro canal de comunicação.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="tipo-canal" className="text-right">
                  Tipo
                </Label>
                <Select defaultValue="whatsapp">
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Selecione o tipo de canal" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="whatsapp">WhatsApp</SelectItem>
                    <SelectItem value="facebook">Facebook Messenger</SelectItem>
                    <SelectItem value="instagram">Instagram Direct</SelectItem>
                    <SelectItem value="telegram">Telegram</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="nome-canal" className="text-right">
                  Nome
                </Label>
                <Input
                  id="nome-canal"
                  placeholder="Ex: Atendimento Geral"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="numero" className="text-right">
                  Número
                </Label>
                <Input
                  id="numero"
                  placeholder="+55 00 00000-0000"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="responsavel" className="text-right">
                  Responsável
                </Label>
                <Select>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Selecione um responsável" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="carlos">Carlos Santos</SelectItem>
                    <SelectItem value="ana">Ana Silva</SelectItem>
                    <SelectItem value="ricardo">Ricardo Oliveira</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-start gap-4">
                <div className="col-span-4 border p-4 rounded-md">
                  <div className="flex items-center justify-center flex-col gap-4 py-4">
                    <QrCode className="h-6 w-6 text-brand-600" />
                    <p className="text-sm text-center text-muted-foreground">
                      Após salvar, você poderá escanear o QR Code para conectar este número.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpenDialog(false)}>
                Cancelar
              </Button>
              <Button onClick={() => setOpenDialog(false)} className="bg-brand-600 hover:bg-brand-700">
                Adicionar Canal
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="whatsapp" className="mt-6">
        <TabsList className="mb-6">
          <TabsTrigger value="whatsapp" className="flex items-center">
            <PhoneCall className="h-4 w-4 mr-2" />
            WhatsApp
          </TabsTrigger>
          <TabsTrigger value="facebook" className="flex items-center">
            <MessageSquare className="h-4 w-4 mr-2" />
            Facebook
          </TabsTrigger>
          <TabsTrigger value="instagram" className="flex items-center">
            <MessageSquare className="h-4 w-4 mr-2" />
            Instagram
          </TabsTrigger>
          <TabsTrigger value="outros" className="flex items-center">
            <MessageSquare className="h-4 w-4 mr-2" />
            Outros
          </TabsTrigger>
        </TabsList>

        <TabsContent value="whatsapp">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whatsappData.map((canal) => (
              <Card key={canal.id} className="overflow-hidden">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center">
                      <div className={`p-2 rounded-full ${canal.status === "Conectado" ? "bg-green-100" : "bg-red-100"}`}>
                        <Smartphone className={`h-5 w-5 ${canal.status === "Conectado" ? "text-green-600" : "text-red-600"}`} />
                      </div>
                      <div className="ml-3">
                        <h3 className="font-semibold text-lg">{canal.nome}</h3>
                        <p className="text-sm text-muted-foreground">{canal.numero}</p>
                      </div>
                    </div>
                    <Badge className={canal.status === "Conectado" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                      {canal.status}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 text-sm mb-4">
                    <div>
                      <p className="text-muted-foreground">Enviadas:</p>
                      <p>{canal.mensagensEnviadas}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Recebidas:</p>
                      <p>{canal.mensagensRecebidas}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Responsável:</p>
                      <p>{canal.responsavel}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Última atividade:</p>
                      <p>{canal.ultimaAtividade}</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-between mt-6">
                    {canal.status === "Conectado" ? (
                      <Button variant="outline" className="flex items-center text-red-600 hover:text-red-700 hover:bg-red-50">
                        Desconectar
                      </Button>
                    ) : (
                      <Button variant="outline" className="flex items-center">
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Reconectar
                      </Button>
                    )}
                    <div className="flex gap-2">
                      <Button size="icon" variant="ghost" className="h-9 w-9">
                        <Settings className="h-4 w-4" />
                      </Button>
                      <Button size="icon" variant="ghost" className="h-9 w-9 text-red-500 hover:text-red-700">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}

            {/* Card para adicionar novo canal */}
            <Card 
              className="flex items-center justify-center p-6 border-dashed cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={() => setOpenDialog(true)}
            >
              <div className="text-center">
                <div className="mx-auto w-12 h-12 rounded-full bg-brand-50 flex items-center justify-center mb-4">
                  <Plus className="h-6 w-6 text-brand-600" />
                </div>
                <h3 className="font-medium text-lg mb-1">Novo Canal</h3>
                <p className="text-sm text-muted-foreground">
                  Adicione um novo número de WhatsApp
                </p>
              </div>
            </Card>
          </div>

          <Card className="mt-8 p-6">
            <h3 className="text-lg font-semibold mb-4">Configurações do WhatsApp</h3>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <Label htmlFor="msg-boas-vindas">Mensagem de boas-vindas</Label>
                  <Input
                    id="msg-boas-vindas"
                    defaultValue="Olá! Bem-vindo ao atendimento da ConnectaJuse. Como posso ajudar?"
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="msg-ausencia">Mensagem de ausência</Label>
                  <Input
                    id="msg-ausencia"
                    defaultValue="Estamos fora do expediente. Retornaremos em breve!"
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="limite-mensagens">Limite de mensagens diárias</Label>
                  <Input
                    id="limite-mensagens"
                    type="number"
                    defaultValue="1000"
                    className="mt-2"
                  />
                </div>
              </div>
              
              <div className="border-t pt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="auto-resposta">Auto-resposta</Label>
                    <p className="text-sm text-muted-foreground">Resposta automática para primeiras mensagens</p>
                  </div>
                  <Switch id="auto-resposta" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="notif-novas-msgs">Notificações</Label>
                    <p className="text-sm text-muted-foreground">Receber notificações de novas mensagens</p>
                  </div>
                  <Switch id="notif-novas-msgs" defaultChecked />
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button className="bg-brand-600 hover:bg-brand-700">
                  Salvar Configurações
                </Button>
              </div>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="facebook">
          <Card className="p-6">
            <div className="text-center py-8">
              <MessageSquare className="h-12 w-12 mx-auto text-brand-300 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Conecte-se ao Facebook Messenger</h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                Integre o Messenger para atender seus clientes diretamente pelo Facebook.
              </p>
              <Button className="bg-brand-600 hover:bg-brand-700">
                Configurar Messenger
              </Button>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="instagram">
          <Card className="p-6">
            <div className="text-center py-8">
              <MessageSquare className="h-12 w-12 mx-auto text-brand-300 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Conecte-se ao Instagram Direct</h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                Integre o Instagram Direct para atender seus clientes através do Instagram.
              </p>
              <Button className="bg-brand-600 hover:bg-brand-700">
                Configurar Instagram
              </Button>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="outros">
          <Card className="p-6">
            <div className="text-center py-8">
              <MessageSquare className="h-12 w-12 mx-auto text-brand-300 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Outras Integrações</h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                Conecte-se a outros canais de comunicação como Telegram, Email, Chat ao vivo e mais.
              </p>
              <Button className="bg-brand-600 hover:bg-brand-700">
                Explorar Integrações
              </Button>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  );
};

export default Canais;
