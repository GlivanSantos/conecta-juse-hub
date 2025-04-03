
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  Send, 
  Paperclip, 
  Smile, 
  Mic, 
  Users, 
  UserPlus, 
  X,
  RefreshCw,
  Download,
  Clock,
  Phone,
  MoreHorizontal,
  BookText
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface ConversationPanelProps {
  atendimento: any;
  onClose: () => void;
  onStatusChange?: (id: string, newStatus: string) => void;
  isClosed?: boolean;
}

// Dados de exemplo para mensagens
const exampleMessages = [
  {
    id: 1,
    sender: "customer",
    message: "Bom dia! Gostaria de saber como posso parcelar minha compra.",
    time: "10:30",
    read: true,
  },
  {
    id: 2,
    sender: "attendant",
    message: "Olá, bom dia! Tudo bem? Você pode parcelar sua compra em até 12x no cartão de crédito sem juros para compras acima de R$500.",
    time: "10:35",
    read: true,
  },
  {
    id: 3,
    sender: "customer",
    message: "Entendi. E como faço para aplicar um cupom de desconto que recebi?",
    time: "10:38",
    read: true,
  },
  {
    id: 4,
    sender: "attendant",
    message: "Você pode inserir o código do cupom no campo 'Cupom de desconto' durante o processo de pagamento. O desconto será aplicado automaticamente ao valor total.",
    time: "10:40",
    read: true,
  },
  {
    id: 5,
    sender: "customer",
    message: "Ótimo! E sobre a entrega, qual seria o prazo para SP capital?",
    time: "10:42",
    read: true,
  },
  {
    id: 6,
    sender: "customer",
    type: "audio",
    duration: "0:23",
    time: "10:43",
    read: true,
  },
  {
    id: 7,
    sender: "attendant",
    message: "Para São Paulo capital, o prazo médio de entrega é de 2 a 3 dias úteis após a confirmação do pagamento.",
    time: "10:44",
    read: true,
  },
  {
    id: 8,
    sender: "attendant",
    type: "file",
    filename: "tabela_frete.pdf",
    time: "10:44",
    read: true,
  },
  {
    id: 9,
    sender: "customer",
    message: "Perfeito! Obrigado pelas informações, vou finalizar minha compra agora mesmo.",
    time: "10:45",
    read: false,
  },
];

const ConversationPanel = ({ 
  atendimento, 
  onClose, 
  onStatusChange,
  isClosed = false 
}: ConversationPanelProps) => {
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState(exampleMessages);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const newMsg = {
        id: messages.length + 1,
        sender: "attendant",
        message: newMessage,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        read: false,
      };
      
      setMessages([...messages, newMsg]);
      setNewMessage("");
      
      // Ensure the messages container scrolls to the newest message
      setTimeout(scrollToBottom, 100);
    }
  };

  const handleStatusChange = () => {
    if (onStatusChange) {
      onStatusChange(atendimento.id, isClosed ? "active" : "closed");
    }
  };

  const handleTransferToDepartment = () => {
    toast({
      title: "Atendimento transferido",
      description: `O atendimento foi transferido para outro departamento.`,
    });
  };

  const handleTransferToAgent = () => {
    toast({
      title: "Atendimento transferido",
      description: `O atendimento foi transferido para outro atendente.`,
    });
  };

  const getCanalIcon = (canal: string) => {
    switch (canal) {
      case "whatsapp":
        return "text-green-600";
      case "facebook":
        return "text-blue-600";
      case "instagram":
        return "text-purple-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Cabeçalho da conversa */}
      <div className="flex justify-between items-center p-4 border-b border-gray-200">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-brand-100 flex items-center justify-center text-brand-700 font-bold">
            {atendimento.cliente.charAt(0)}
          </div>
          <div className="ml-3">
            <div className="flex items-center">
              <h3 className="font-medium">{atendimento.cliente}</h3>
              <span className="mx-2 text-gray-400">•</span>
              <span className="text-sm text-gray-500">{atendimento.id}</span>
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <Phone className={`h-3 w-3 mr-1 ${getCanalIcon(atendimento.canal)}`} />
              {atendimento.telefone}
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="text-brand-600"
            onClick={handleTransferToDepartment}
          >
            <Users className="h-4 w-4 mr-2" />
            Departamento
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="text-brand-600"
            onClick={handleTransferToAgent}
          >
            <UserPlus className="h-4 w-4 mr-2" />
            Transferir
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className={isClosed ? "text-green-600 border-green-200 hover:bg-green-50" : "text-red-600 border-red-200 hover:bg-red-50"}
            onClick={handleStatusChange}
          >
            {isClosed ? (
              <>
                <RefreshCw className="h-4 w-4 mr-2" />
                Reabrir
              </>
            ) : (
              <>
                <X className="h-4 w-4 mr-2" />
                Fechar
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Histórico de mensagens */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
        <div className="space-y-3">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === "customer" ? "justify-start" : "justify-end"}`}
            >
              <div
                className={`max-w-[70%] rounded-lg p-3 ${
                  msg.sender === "customer"
                    ? "bg-white border border-gray-200"
                    : "bg-brand-600 text-white"
                }`}
              >
                {msg.type === "audio" ? (
                  <div className="flex items-center space-x-2">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className={`h-8 w-8 rounded-full ${msg.sender === "customer" ? "text-brand-600 hover:bg-gray-100" : "text-white hover:bg-brand-700"}`}
                    >
                      <Mic className="h-4 w-4" />
                    </Button>
                    <div className="h-1 flex-1 rounded-full bg-gray-200">
                      <div className="w-1/3 h-full rounded-full bg-brand-500"></div>
                    </div>
                    <span className={`text-xs ${msg.sender === "customer" ? "text-gray-500" : "text-brand-100"}`}>
                      {msg.duration}
                    </span>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className={`h-8 w-8 rounded-full ${msg.sender === "customer" ? "text-brand-600 hover:bg-gray-100" : "text-white hover:bg-brand-700"}`}
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                ) : msg.type === "file" ? (
                  <div className={`flex items-center space-x-2 ${msg.sender === "customer" ? "text-brand-600" : "text-white"}`}>
                    <Paperclip className="h-4 w-4" />
                    <span className="text-sm">{msg.filename}</span>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className={`h-7 w-7 rounded-full p-0 ${msg.sender === "customer" ? "text-brand-600 hover:bg-gray-100" : "text-white hover:bg-brand-700"}`}
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <p className="text-sm whitespace-pre-wrap">{msg.message}</p>
                )}
                <div className="flex items-center justify-end mt-1">
                  <span 
                    className={`text-xs ${
                      msg.sender === "customer" ? "text-gray-500" : "text-brand-100"
                    }`}
                  >
                    {msg.time}
                  </span>
                  {msg.sender === "attendant" && (
                    <span className="ml-1 text-xs text-brand-100">
                      {msg.read ? "✓✓" : "✓"}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} /> {/* Empty div for scrolling to bottom */}
        </div>
      </div>

      {/* Campo de digitação e envio */}
      <div className="p-3 border-t border-gray-200">
        <div className="flex mb-3">
          <Button variant="ghost" size="sm" className="text-gray-500">
            <BookText className="h-4 w-4" />
            <span className="ml-1">Templates</span>
          </Button>
        </div>
        <div className="flex items-end space-x-2">
          <div className="flex-1 relative">
            <Textarea
              placeholder="Digite sua mensagem..."
              className="resize-none min-h-[80px]"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              disabled={isClosed}
            />
            <div className="absolute bottom-2 right-2 flex space-x-1">
              <Button variant="ghost" size="sm" className="h-8 w-8 rounded-full p-0 text-gray-500">
                <Smile className="h-5 w-5" />
              </Button>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" className="rounded-full text-gray-500" disabled={isClosed}>
              <Paperclip className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full text-gray-500" disabled={isClosed}>
              <Mic className="h-5 w-5" />
            </Button>
            <Button 
              variant="default" 
              size="icon" 
              className="rounded-full bg-brand-600 hover:bg-brand-700"
              onClick={handleSendMessage}
              disabled={isClosed}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConversationPanel;
