import { z } from 'zod';

export const QuoteSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  company: z.string().optional(),
  phone: z.string().optional(),
  projectDetails: z.string().min(10, { message: "Please provide some details about your project." }),
});

export type Quote = z.infer<typeof QuoteSchema>;
