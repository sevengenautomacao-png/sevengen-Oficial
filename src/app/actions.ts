"use server";

import { revalidatePath } from "next/cache";
import { OrcamentoSchema, type Orcamento } from "@/lib/types";
import { addOrcamento } from "@/lib/orcamentos-db";

export async function submitOrcamento(data: Orcamento) {
  const parsedData = OrcamentoSchema.safeParse(data);

  if (!parsedData.success) {
    // This can be expanded to return field-specific errors
    throw new Error("Dados de orçamento inválidos fornecidos.");
  }

  try {
    await addOrcamento(parsedData.data);
    // Revalidate the admin page to show the new orcamento immediately
    revalidatePath("/admin");
    return { success: true, message: "Orçamento enviado com sucesso." };
  } catch (error) {
    console.error("Falha ao enviar orçamento:", error);
    // In a real app, you might have more specific error handling
    throw new Error("Ocorreu um erro no servidor. Por favor, tente novamente mais tarde.");
  }
}
