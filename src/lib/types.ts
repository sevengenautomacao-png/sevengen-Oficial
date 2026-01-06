import { z } from 'zod';

export const OrcamentoSchema = z.object({
  name: z.string().min(2, { message: "O nome deve ter pelo menos 2 caracteres." }),
  email: z.string().email({ message: "Por favor, insira um endereço de e-mail válido." }),
  company: z.string().optional(),
  phone: z.string().optional(),
  projectDetails: z.string().min(10, { message: "Por favor, forneça alguns detalhes sobre o seu projeto." }),
});

export type Orcamento = z.infer<typeof OrcamentoSchema>;
