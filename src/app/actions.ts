"use server";

import { revalidatePath } from "next/cache";
import { OrcamentoSchema, type Orcamento } from "@/lib/types";
import { addOrcamento } from "@/lib/orcamentos-db";

export async function submitOrcamento(data: Orcamento) {
  const parsedData = OrcamentoSchema.safeParse(data);

  if (!parsedData.success) {
    throw new Error("Dados de orçamento inválidos fornecidos.");
  }

  try {
    await addOrcamento(parsedData.data);
    revalidatePath("/admin");
    return { success: true, message: "Orçamento enviado com sucesso." };
  } catch (error) {
    console.error("Falha ao enviar orçamento:", error);
    throw new Error("Ocorreu um erro no servidor. Por favor, tente novamente mais tarde.");
  }
}
