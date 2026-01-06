import { z } from 'zod';

export const OrcamentoSchema = z.object({
  name: z.string().min(2, { message: "O nome deve ter pelo menos 2 caracteres." }),
  email: z.string().email({ message: "Por favor, insira um endereço de e-mail válido." }),
  company: z.string().optional(),
  phone: z.string().optional(),
  projectDetails: z.string().min(10, { message: "Por favor, forneça alguns detalhes sobre o seu projeto." }),
});

export type Orcamento = z.infer<typeof OrcamentoSchema>;

export const ColaboradorSchema = z.object({
  name: z.string().min(2, { message: "O nome deve ter pelo menos 2 caracteres." }),
  age: z.coerce.number().min(16, { message: "A idade deve ser de pelo menos 16 anos." }),
  email: z.string().email({ message: "Por favor, insira um e-mail válido." }),
  role: z.string().min(2, { message: "O cargo deve ter pelo menos 2 caracteres." }),
  password: z.string().optional(),
});

export type Colaborador = z.infer<typeof ColaboradorSchema>;
