
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  Clock,
  MessageCircle,
  UserCircle2,
  CheckCircle2,
} from "lucide-react";
import { Area, AreaChart, Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

// Dados de exemplo para os gráficos
const areaChartData = [
  { name: "Jan", Abertos: 40, Concluídos: 24 },
  { name: "Fev", Abertos: 30, Concluídos: 25 },
  { name: "Mar", Abertos: 20, Concluídos: 27 },
  { name: "Abr", Abertos: 27, Concluídos: 30 },
  { name: "Mai", Abertos: 36, Concluídos: 28 },
  { name: "Jun", Abertos: 30, Concluídos: 35 },
  { name: "Jul", Abertos: 35, Concluídos: 32 },
];

const barChartData = [
  { name: "WhatsApp", value: 400 },
  { name: "Facebook", value: 300 },
  { name: "Site", value: 200 },
  { name: "E-mail", value: 100 },
  { name: "Instagram", value: 150 },
];

const Dashboard = () => {
  return (
    <>
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Visão geral do seu sistema de atendimento
          </p>
        </div>
        <div className="flex gap-2">
          <Select defaultValue="ultimos7dias">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Período" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="hoje">Hoje</SelectItem>
              <SelectItem value="ultimos7dias">Últimos 7 dias</SelectItem>
              <SelectItem value="ultimos30dias">Últimos 30 dias</SelectItem>
              <SelectItem value="personalizado">Personalizado</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="overview" className="mt-6">
        <TabsList className="mb-6">
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="reports">Relatórios</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {/* Card 1 - Atendimentos em tempo real */}
            <Card className="dashboard-card">
              <div className="info-card">
                <div className="flex justify-between items-start">
                  <div className="info-card-title">Atendimentos em tempo real</div>
                  <div className="p-1 bg-brand-50 rounded-full">
                    <MessageCircle className="h-4 w-4 text-brand-700" />
                  </div>
                </div>
                <div className="info-card-value">74</div>
                <div className="info-card-change info-card-positive">
                  <div className="flex items-center">
                    <ArrowUpIcon className="mr-1 h-4 w-4" />
                    12% desde ontem
                  </div>
                </div>
              </div>
            </Card>

            {/* Card 2 - Leads gerados */}
            <Card className="dashboard-card">
              <div className="info-card">
                <div className="flex justify-between items-start">
                  <div className="info-card-title">Leads gerados</div>
                  <div className="p-1 bg-green-50 rounded-full">
                    <UserCircle2 className="h-4 w-4 text-green-700" />
                  </div>
                </div>
                <div className="info-card-value">236</div>
                <div className="info-card-change info-card-positive">
                  <div className="flex items-center">
                    <ArrowUpIcon className="mr-1 h-4 w-4" />
                    8% desde a semana passada
                  </div>
                </div>
              </div>
            </Card>

            {/* Card 3 - Tempo médio de atendimento */}
            <Card className="dashboard-card">
              <div className="info-card">
                <div className="flex justify-between items-start">
                  <div className="info-card-title">Tempo médio de atendimento</div>
                  <div className="p-1 bg-orange-50 rounded-full">
                    <Clock className="h-4 w-4 text-orange-700" />
                  </div>
                </div>
                <div className="info-card-value">8m 42s</div>
                <div className="info-card-change info-card-negative">
                  <div className="flex items-center">
                    <ArrowDownIcon className="mr-1 h-4 w-4" />
                    2% desde ontem
                  </div>
                </div>
              </div>
            </Card>

            {/* Card 4 - Atendimentos concluídos */}
            <Card className="dashboard-card">
              <div className="info-card">
                <div className="flex justify-between items-start">
                  <div className="info-card-title">Atendimentos concluídos</div>
                  <div className="p-1 bg-blue-50 rounded-full">
                    <CheckCircle2 className="h-4 w-4 text-blue-700" />
                  </div>
                </div>
                <div className="info-card-value">589</div>
                <div className="info-card-change info-card-positive">
                  <div className="flex items-center">
                    <ArrowUpIcon className="mr-1 h-4 w-4" />
                    16% desde a semana passada
                  </div>
                </div>
              </div>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {/* Gráfico de Atendimentos */}
            <Card className="dashboard-card">
              <h3 className="text-base font-semibold mb-4">Atendimentos (últimos 7 dias)</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={areaChartData}
                    margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="colorAbertos" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3182CE" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#3182CE" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="colorConcluidos" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#68D391" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#68D391" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="Abertos"
                      stroke="#3182CE"
                      fillOpacity={1}
                      fill="url(#colorAbertos)"
                    />
                    <Area
                      type="monotone"
                      dataKey="Concluídos"
                      stroke="#68D391"
                      fillOpacity={1}
                      fill="url(#colorConcluidos)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </Card>

            {/* Gráfico de Canais */}
            <Card className="dashboard-card">
              <h3 className="text-base font-semibold mb-4">Atendimentos por Canal</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={barChartData}
                    margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
                  >
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#3182CE" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="analytics" className="space-y-6">
          <Card className="dashboard-card p-6">
            <h3 className="text-lg font-semibold mb-4">Análise Detalhada</h3>
            <p className="text-muted-foreground mb-4">
              Dados analíticos detalhados estarão disponíveis nesta seção.
            </p>
          </Card>
        </TabsContent>
        
        <TabsContent value="reports" className="space-y-6">
          <Card className="dashboard-card p-6">
            <h3 className="text-lg font-semibold mb-4">Relatórios</h3>
            <p className="text-muted-foreground mb-4">
              Relatórios personalizados estarão disponíveis nesta seção.
            </p>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  );
};

export default Dashboard;
