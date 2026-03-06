import { TourStep } from '../utils/TourEngine';

export const tourPrimeiroOrcamento: TourStep[] = [
  {
    target: ['.topbar-btn-novo', '.mobile-btn-novo'],
    title: 'Comece aqui',
    desc: 'Este botão inicia um novo orçamento. Toque nele agora.',
    cta: 'Toque no botão laranja',
    icon: '🚀',
    padding: 6,
  },
  {
    target: '.profissao-toggle-pedreiro',
    title: 'Escolha sua profissão',
    desc: 'Cada profissão tem cálculos diferentes. Selecione a sua.',
    cta: 'Toque em Pedreiro',
    padding: 8,
  },
  {
    target: 'select[name="cliente"]',
    title: 'Selecione o cliente',
    desc: 'Escolha para quem você está fazendo este orçamento.',
    cta: 'Toque para selecionar',
    padding: 8,
  },
  {
    target: 'input[placeholder="Rua, número, bairro..."]',
    title: 'Endereço da Obra',
    desc: 'Informe onde o serviço será realizado.',
    cta: 'Toque e escreva o endereço',
    padding: 8,
    action: (target) => target.focus(),
  },
  {
    target: '.btn-proximo-passo',
    title: 'Avance para os materiais',
    desc: 'Informações preenchidas. Agora vamos calcular o material.',
    cta: 'Toque em Próximo',
    padding: 6,
  }
];

export const tourCadastrarCliente: TourStep[] = [
  {
    target: 'a[href="/clients"]',
    title: 'Abra a lista de clientes',
    desc: 'Aqui ficam guardados todos os seus clientes.',
    cta: 'Toque em Clientes',
  },
  {
    target: '.btn-novo-cliente',
    title: 'Adicione um cliente',
    desc: 'Cadastre o nome e telefone para usar nos próximos orçamentos.',
    cta: 'Toque no botão laranja',
    padding: 8,
  },
  {
    target: 'input[placeholder="Ex: João da Silva"]',
    title: 'Nome do cliente',
    desc: 'Digite o nome completo. Use apelidos se preferir.',
    cta: 'Toque e escreva o nome',
    action: (target) => target.focus(),
  },
  {
    target: '.btn-salvar-cliente',
    title: 'Pronto! Salve o cliente',
    desc: 'O cliente vai aparecer na busca quando criar orçamentos.',
    cta: 'Toque para salvar',
    icon: '👤',
  }
];