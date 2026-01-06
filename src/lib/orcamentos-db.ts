// This is a mock database for demonstration purposes.
// In a real application, you would use a proper database like Firestore.
import type { Orcamento } from './types';

export interface OrcamentoWithMetadata extends Orcamento {
  id: string;
  submittedAt: Date;
  status: 'new' | 'contacted' | 'closed';
}

// In-memory store with some initial data
let orcamentos: OrcamentoWithMetadata[] = [
    {
        id: 'o_1',
        name: 'Alice Johnson',
        email: 'alice.j@examplecorp.com',
        company: 'Example Corp',
        phone: '123-456-7890',
        projectDetails: 'Precisamos automatizar nossa linha de montagem primária. Procurando uma solução completa, incluindo robótica e programação de CLP. Nosso tempo de ciclo atual é de 45 segundos e pretendemos reduzi-lo para menos de 30 segundos.',
        submittedAt: new Date('2023-10-26T10:00:00Z'),
        status: 'new',
    },
    {
        id: 'o_2',
        name: 'Bob Smith',
        email: 'bob.smith@innovatech.io',
        company: 'InnovaTech',
        phone: '987-654-3210',
        projectDetails: 'Solicitando um orçamento para um projeto de PCB personalizado para um novo dispositivo IoT. O dispositivo precisa ser de baixo consumo e ter conectividade Bluetooth. Temos esquemas detalhados disponíveis mediante solicitação.',
        submittedAt: new Date('2023-10-25T14:30:00Z'),
        status: 'contacted',
    },
    {
        id: 'o_3',
        name: 'Carlos Silva',
        email: 'carlos@fabricaglobal.com',
        company: 'Fábrica Global',
        phone: '555-555-5555',
        projectDetails: 'Queremos atualizar nossos sistemas de controle legados. Estamos interessados em uma migração em fases para uma plataforma DCS moderna. O escopo do projeto inclui 3 unidades de produção.',
        submittedAt: new Date('2023-10-24T09:00:00Z'),
        status: 'closed',
    },
];

let counter = orcamentos.length;

export async function addOrcamento(orcamento: Orcamento): Promise<OrcamentoWithMetadata> {
  counter++;
  const newOrcamento: OrcamentoWithMetadata = {
    ...orcamento,
    id: `o_${counter}`,
    submittedAt: new Date(),
    status: 'new',
  };
  orcamentos.unshift(newOrcamento); // Add to the beginning of the array
  return newOrcamento;
}

export async function getOrcamentos(): Promise<OrcamentoWithMetadata[]> {
  // sort by date descending
  return [...orcamentos].sort((a, b) => b.submittedAt.getTime() - a.submittedAt.getTime());
}

export async function getOrcamentoById(id: string): Promise<OrcamentoWithMetadata | undefined> {
    return orcamentos.find(o => o.id === id);
}
