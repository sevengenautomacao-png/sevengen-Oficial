// This is a mock database for demonstration purposes.
// In a real application, you would use a proper database like Firestore.
import type { Quote } from './types';

export interface QuoteWithMetadata extends Quote {
  id: string;
  submittedAt: Date;
  status: 'new' | 'contacted' | 'closed';
}

// In-memory store with some initial data
let quotes: QuoteWithMetadata[] = [
    {
        id: 'q_1',
        name: 'Alice Johnson',
        email: 'alice.j@examplecorp.com',
        company: 'Example Corp',
        phone: '123-456-7890',
        projectDetails: 'We need to automate our primary assembly line. Looking for a comprehensive solution including robotics and PLC programming. Our current cycle time is 45 seconds and we aim to reduce it to under 30 seconds.',
        submittedAt: new Date('2023-10-26T10:00:00Z'),
        status: 'new',
    },
    {
        id: 'q_2',
        name: 'Bob Smith',
        email: 'bob.smith@innovatech.io',
        company: 'InnovaTech',
        phone: '987-654-3210',
        projectDetails: 'Requesting a quote for a custom PCB design for a new IoT device. The device needs to be low-power and have Bluetooth connectivity. We have detailed schematics available upon request.',
        submittedAt: new Date('2023-10-25T14:30:00Z'),
        status: 'contacted',
    },
    {
        id: 'q_3',
        name: 'Charlie Brown',
        email: 'charlie@manufacturing.com',
        company: 'Global Manufacturing',
        phone: '555-555-5555',
        projectDetails: 'Looking to upgrade our legacy control systems. We are interested in a phased migration to a modern DCS platform. Project scope includes 3 production units.',
        submittedAt: new Date('2023-10-24T09:00:00Z'),
        status: 'closed',
    },
];

let counter = quotes.length;

export async function addQuote(quote: Quote): Promise<QuoteWithMetadata> {
  counter++;
  const newQuote: QuoteWithMetadata = {
    ...quote,
    id: `q_${counter}`,
    submittedAt: new Date(),
    status: 'new',
  };
  quotes.unshift(newQuote); // Add to the beginning of the array
  return newQuote;
}

export async function getQuotes(): Promise<QuoteWithMetadata[]> {
  // sort by date descending
  return [...quotes].sort((a, b) => b.submittedAt.getTime() - a.submittedAt.getTime());
}

export async function getQuoteById(id: string): Promise<QuoteWithMetadata | undefined> {
    return quotes.find(q => q.id === id);
}
