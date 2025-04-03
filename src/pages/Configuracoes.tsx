
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
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
import { Save, Plus, Trash2, Lock, User, Clock, MessageSquare, Shield } from "lucide-react";
import { useState } from "react";

// Dados de exemplo para usuários
const usuariosData = [
  {
    id: "USR-001",
    nome: "Carlos Santos",
    email: "carlos.santos@email.com",
    cargo: "Administrador",
    ultimoAcesso: "03/04/2025, 10:45",
    status: "Ativo",
  },
  {
    id: "USR-002",
    nome: "Ana Silva",
    email: "ana.silva@email.com",
    cargo: "Atendente",
    ultimoAcesso: "03/04/2025, 09:30",
    status: "Ativo",
  },
  {
    id: "USR-003",
    nome: "Ricardo Oliveira",
    email: "ricardo.oliveira@email.com",
    cargo: "Supervisor",
    ultimoAcesso: "02/04/2025, 16:20",
    status: "Ativo",
  },
  {
    id: "USR-004",
    nome: "Mariana Costa",
    email: "mariana.costa@email.com",
    cargo: "Atendente",
    ultimoAcesso: "01/04/2025, 14:15",
    status: "Inativo",
  },
];

// Dados de exemplo para templates de resposta
const templatesData = [
  {
    id: "TPL-001",
    titulo: "Boas-vindas",
    conteudo: "Olá! Bem-vindo à ConnectaJuse. Como posso ajudar você hoje?",
    categoria: "Geral",
    criado: "01/03/2025",
  },
  {
    id: "TPL-002",
    titulo: "Agradecimento pelo contato",
    conteudo: "Obrigado por entrar em contato conosco. Agradecemos sua preferência!",
    categoria: "Geral",
    criado: "01/03/2025",
  },
  {
    id: "TPL-003",
    titulo: "Informação de pagamento",
    conteudo: "Aceitamos cartões de crédito, boleto bancário e PIX. Qual forma de pagamento prefere?",
    categoria: "Vendas",
    criado: "10/03/2025",
  },
  {
    id: "TPL-004",
    titulo: "Problema técnico",
    conteudo: "Lamento pelo inconveniente. Para resolver seu problema técnico, poderia por favor nos informar: 1) Qual dispositivo está usando? 2) Qual navegador? 3) Descreva detalhadamente o erro que está ocorrendo.",
    categoria: "Suporte",
    criado: "15/03/2025",
  },
];

// Componente para a página de configurações
const Configuracoes = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogType, setDialogType] = useState("");

  const openAddUserDialog = () => {
    setDialogType("user");
    setOpenDialog(true);
  };

  const openAddTemplateDialog = () => {
    setDialogType("template");
    setOpenDialog(true);
  };

  return (
    <>
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Configurações</h1>
          <p className="text-muted-foreground">
            Personalize seu sistema de atendimento
          </p>
        </div>
      </div>

      <Tabs defaultValue="gerais" className="mt-6">
        <TabsList className="mb-6">
          <TabsTrigger value="gerais">Gerais</TabsTrigger>
          <TabsTrigger value="usuarios">Usuários</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="horarios">Horários</TabsTrigger>
          <TabsTrigger value="seguranca">Segurança</TabsTrigger>
        </TabsList>
        
        <TabsContent value="gerais">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Configurações Gerais</h3>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-start">
                <div className="md:col-span-1">
                  <Label className="text-sm font-medium">Empresa</Label>
                </div>
                <div className="md:col-span-3 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="empresa-nome">Nome da Empresa</Label>
                    <Input id="empresa-nome" defaultValue="ConnectaJuse Ltda." />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="empresa-site">Site</Label>
                    <Input id="empresa-site" defaultValue="https://conectajuse.com.br" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="empresa-email">E-mail de Contato</Label>
                    <Input id="empresa-email" defaultValue="contato@conectajuse.com.br" />
                  </div>
                </div>
              </div>
              
              <div className="border-t pt-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-start">
                  <div className="md:col-span-1">
                    <Label className="text-sm font-medium">Notificações</Label>
                  </div>
                  <div className="md:col-span-3 space-y-4">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="notif-email">Notificações por E-mail</Label>
                      <Switch id="notif-email" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="notif-app">Notificações no App</Label>
                      <Switch id="notif-app" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="notif-som">Sons de Notificação</Label>
                      <Switch id="notif-som" defaultChecked />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="border-t pt-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-start">
                  <div className="md:col-span-1">
                    <Label className="text-sm font-medium">Atendimento</Label>
                  </div>
                  <div className="md:col-span-3 space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="atend-tempo">Tempo máximo de resposta (minutos)</Label>
                      <Input id="atend-tempo" type="number" defaultValue="5" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="atend-mensagem">Mensagem de ausência</Label>
                      <Textarea id="atend-mensagem" defaultValue="Estamos fora do horário de atendimento. Retornaremos em breve!" />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button className="bg-brand-600 hover:bg-brand-700">
                  <Save className="h-4 w-4 mr-2" />
                  Salvar Alterações
                </Button>
              </div>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="usuarios">
          <Card className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold">Usuários e Permissões</h3>
              <Button className="bg-brand-600 hover:bg-brand-700" onClick={openAddUserDialog}>
                <Plus className="h-4 w-4 mr-2" />
                Novo Usuário
              </Button>
            </div>
            
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Cargo</TableHead>
                  <TableHead>Último Acesso</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {usuariosData.map((usuario) => (
                  <TableRow key={usuario.id}>
                    <TableCell className="font-medium">{usuario.nome}</TableCell>
                    <TableCell>{usuario.email}</TableCell>
                    <TableCell>{usuario.cargo}</TableCell>
                    <TableCell>{usuario.ultimoAcesso}</TableCell>
                    <TableCell>
                      <Badge className={usuario.status === "Ativo" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}>
                        {usuario.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button size="sm" variant="outline">
                          Editar
                        </Button>
                        <Button size="sm" variant="outline" className="text-red-500 hover:text-red-700">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>
        
        <TabsContent value="templates">
          <Card className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold">Templates de Resposta</h3>
              <Button className="bg-brand-600 hover:bg-brand-700" onClick={openAddTemplateDialog}>
                <Plus className="h-4 w-4 mr-2" />
                Novo Template
              </Button>
            </div>
            
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Título</TableHead>
                  <TableHead>Conteúdo</TableHead>
                  <TableHead>Categoria</TableHead>
                  <TableHead>Criado em</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {templatesData.map((template) => (
                  <TableRow key={template.id}>
                    <TableCell className="font-medium">{template.titulo}</TableCell>
                    <TableCell className="max-w-md truncate">{template.conteudo}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{template.categoria}</Badge>
                    </TableCell>
                    <TableCell>{template.criado}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button size="sm" variant="outline">
                          Editar
                        </Button>
                        <Button size="sm" variant="outline" className="text-red-500 hover:text-red-700">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>
        
        <TabsContent value="horarios">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Horários de Atendimento</h3>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-brand-600 mr-2" />
                    <h4 className="font-medium">Segunda a Sexta</h4>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="seg-sex-inicio">Início</Label>
                      <Select defaultValue="09:00">
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="08:00">08:00</SelectItem>
                          <SelectItem value="09:00">09:00</SelectItem>
                          <SelectItem value="10:00">10:00</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="seg-sex-fim">Fim</Label>
                      <Select defaultValue="18:00">
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="17:00">17:00</SelectItem>
                          <SelectItem value="18:00">18:00</SelectItem>
                          <SelectItem value="19:00">19:00</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-brand-600 mr-2" />
                    <h4 className="font-medium">Sábado</h4>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="sab-inicio">Início</Label>
                      <Select defaultValue="09:00">
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="09:00">09:00</SelectItem>
                          <SelectItem value="10:00">10:00</SelectItem>
                          <SelectItem value="fechado">Fechado</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="sab-fim">Fim</Label>
                      <Select defaultValue="13:00">
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="12:00">12:00</SelectItem>
                          <SelectItem value="13:00">13:00</SelectItem>
                          <SelectItem value="14:00">14:00</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-brand-600 mr-2" />
                    <h4 className="font-medium">Domingo e Feriados</h4>
                  </div>
                  <div className="pt-2">
                    <div className="flex items-center space-x-2">
                      <Switch id="dom-feriados" />
                      <Label htmlFor="dom-feriados">Habilitar atendimento</Label>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="pt-4 border-t">
                <div className="flex items-center mb-4">
                  <MessageSquare className="h-5 w-5 text-brand-600 mr-2" />
                  <h4 className="font-medium">Configurações Adicionais</h4>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="atend-automatico">Atendimento Automático Fora do Horário</Label>
                    <Switch id="atend-automatico" defaultChecked />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="msg-fora-horario">Mensagem Fora do Horário</Label>
                    <Textarea
                      id="msg-fora-horario"
                      defaultValue="Estamos fora do horário de atendimento. Retornaremos seu contato no próximo dia útil. Obrigado pela compreensão!"
                    />
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button className="bg-brand-600 hover:bg-brand-700">
                  <Save className="h-4 w-4 mr-2" />
                  Salvar Alterações
                </Button>
              </div>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="seguranca">
          <Card className="p-6">
            <div className="flex items-center mb-6">
              <Shield className="h-5 w-5 text-brand-600 mr-2" />
              <h3 className="text-lg font-semibold">Segurança e Privacidade</h3>
            </div>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-start">
                <div className="md:col-span-1">
                  <Label className="text-sm font-medium">Autenticação</Label>
                </div>
                <div className="md:col-span-3 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="two-factor" className="mb-1 block">Autenticação de Dois Fatores</Label>
                      <p className="text-sm text-muted-foreground">Exige verificação adicional ao fazer login</p>
                    </div>
                    <Switch id="two-factor" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="sessao-expira" className="mb-1 block">Expiração de Sessão</Label>
                      <p className="text-sm text-muted-foreground">Sessões inativas são encerradas automaticamente</p>
                    </div>
                    <Select defaultValue="60">
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="30">30 minutos</SelectItem>
                        <SelectItem value="60">1 hora</SelectItem>
                        <SelectItem value="120">2 horas</SelectItem>
                        <SelectItem value="480">8 horas</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              
              <div className="border-t pt-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-start">
                  <div className="md:col-span-1">
                    <Label className="text-sm font-medium">Políticas de Senha</Label>
                  </div>
                  <div className="md:col-span-3 space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="senha-complexa" className="mb-1 block">Exigir senhas complexas</Label>
                        <p className="text-sm text-muted-foreground">Inclui letras, números e caracteres especiais</p>
                      </div>
                      <Switch id="senha-complexa" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="troca-senha" className="mb-1 block">Forçar troca de senha</Label>
                        <p className="text-sm text-muted-foreground">Periodicidade para alteração obrigatória</p>
                      </div>
                      <Select defaultValue="90">
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="30">30 dias</SelectItem>
                          <SelectItem value="60">60 dias</SelectItem>
                          <SelectItem value="90">90 dias</SelectItem>
                          <SelectItem value="180">180 dias</SelectItem>
                          <SelectItem value="never">Nunca</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="border-t pt-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-start">
                  <div className="md:col-span-1">
                    <Label className="text-sm font-medium">Privacidade dos Dados</Label>
                  </div>
                  <div className="md:col-span-3 space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="log-atividades" className="mb-1 block">Registrar atividades do usuário</Label>
                        <p className="text-sm text-muted-foreground">Mantém histórico de ações no sistema</p>
                      </div>
                      <Switch id="log-atividades" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="retencao-dados" className="mb-1 block">Política de retenção de dados</Label>
                        <p className="text-sm text-muted-foreground">Período para manter histórico de conversas</p>
                      </div>
                      <Select defaultValue="365">
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="90">90 dias</SelectItem>
                          <SelectItem value="180">180 dias</SelectItem>
                          <SelectItem value="365">1 ano</SelectItem>
                          <SelectItem value="forever">Indefinidamente</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button className="bg-brand-600 hover:bg-brand-700">
                  <Save className="h-4 w-4 mr-2" />
                  Salvar Alterações
                </Button>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Diálogo para adicionar usuário ou template */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="sm:max-w-[525px]">
          {dialogType === "user" ? (
            <>
              <DialogHeader>
                <DialogTitle>Adicionar Novo Usuário</DialogTitle>
                <DialogDescription>
                  Preencha os dados para criar um novo usuário no sistema.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="nome" className="text-right">
                    Nome
                  </Label>
                  <Input
                    id="nome"
                    placeholder="Nome completo"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="email" className="text-right">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="email@exemplo.com"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="cargo" className="text-right">
                    Cargo
                  </Label>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Selecione um cargo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Administrador</SelectItem>
                      <SelectItem value="supervisor">Supervisor</SelectItem>
                      <SelectItem value="atendente">Atendente</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="senha" className="text-right">
                    Senha
                  </Label>
                  <Input
                    id="senha"
                    type="password"
                    placeholder="••••••••"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="confirmar-senha" className="text-right">
                    Confirmar Senha
                  </Label>
                  <Input
                    id="confirmar-senha"
                    type="password"
                    placeholder="••••••••"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <div className="col-span-4 flex items-center space-x-2 justify-end">
                    <Switch id="status" defaultChecked />
                    <Label htmlFor="status">Ativo</Label>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setOpenDialog(false)}>
                  Cancelar
                </Button>
                <Button onClick={() => setOpenDialog(false)} className="bg-brand-600 hover:bg-brand-700">
                  <Lock className="h-4 w-4 mr-2" />
                  Criar Usuário
                </Button>
              </DialogFooter>
            </>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle>Adicionar Novo Template</DialogTitle>
                <DialogDescription>
                  Crie um novo template de resposta para uso no atendimento.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="titulo" className="text-right">
                    Título
                  </Label>
                  <Input
                    id="titulo"
                    placeholder="Título do template"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="categoria" className="text-right">
                    Categoria
                  </Label>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Selecione uma categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="geral">Geral</SelectItem>
                      <SelectItem value="vendas">Vendas</SelectItem>
                      <SelectItem value="suporte">Suporte</SelectItem>
                      <SelectItem value="reclamacoes">Reclamações</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-start gap-4">
                  <Label htmlFor="conteudo" className="text-right pt-2">
                    Conteúdo
                  </Label>
                  <Textarea
                    id="conteudo"
                    placeholder="Digite o conteúdo do template..."
                    className="col-span-3"
                    rows={5}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="variaveis" className="text-right">
                    Variáveis
                  </Label>
                  <div className="col-span-3 text-sm text-muted-foreground">
                    Você pode usar: {`{nome}, {empresa}, {atendente}`}
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setOpenDialog(false)}>
                  Cancelar
                </Button>
                <Button onClick={() => setOpenDialog(false)} className="bg-brand-600 hover:bg-brand-700">
                  <Save className="h-4 w-4 mr-2" />
                  Salvar Template
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Configuracoes;
