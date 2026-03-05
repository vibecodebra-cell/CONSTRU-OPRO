export type Profession = 'pedreiro' | 'eletricista' | 'encanador';
export type ServiceStatus = 'rascunho' | 'enviado' | 'aprovado' | 'andamento' | 'concluido' | 'cancelado';

export interface Material {
  id: string;
  nome: string;
  qty: number;
  unit: string;
  precoUnit: number;
  total: number;
  categoria: string;
}

export interface Client {
  id: string;
  nome: string;
  telefone: string;
  email?: string;
  cidade: string;
  tipo: 'residencial' | 'comercial' | 'industrial';
  obs?: string;
}

export interface Service {
  id: string;
  numero: number;
  clienteId: string;
  profissao: Profession;
  tipoServico: string;
  endereco: string;
  descricao?: string;
  dataInicio: string;
  status: ServiceStatus;
  materiais: Material[];
  totalMaterial: number;
  maoDeObra: number;
  custosExtras: number;
  margem: number;
  lucro: number;
  totalFinal: number;
  diasExecucao: number;
  prazoCliente: number;
  validade: number;
  garantia: string;
  formaPagamento: string;
  observacoes?: string;
  criadoEm: string;
  atualizadoEm: string;
}

export interface PriceItem {
  id: string;
  nome: string;
  unidade: string;
  preco: number;
  categoria: string;
}

export interface UserProfile {
  nome: string;
  profissao: Profession | 'multiplas';
  telefone: string;
  email: string;
  cidade: string;
  estado: string;
  cpf?: string;
  logo?: string;
}