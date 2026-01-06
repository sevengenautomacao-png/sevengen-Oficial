"use server";

import { revalidatePath } from "next/cache";
import { OrcamentoSchema, type Orcamento } from "@/lib/types";
import { addOrcamento, deleteOrcamento as dbDeleteOrcamento, updateOrcamentoStatus as dbUpdateOrcamentoStatus } from "@/lib/orcamentos-db";

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

export async function updateOrcamentoStatus(id: string, status: "new" | "contacted" | "closed") {
    try {
        await dbUpdateOrcamentoStatus(id, status);
        revalidatePath("/admin");
        return { success: true, message: "Status do orçamento atualizado com sucesso." };
    } catch (error) {
        console.error(`Falha ao atualizar status para ${status}:`, error);
        throw new Error("Ocorreu um erro no servidor. Por favor, tente novamente mais tarde.");
    }
}

export async function deleteOrcamento(id: string) {
    try {
        await dbDeleteOrcamento(id);
        revalidatePath("/admin");
        return { success: true, message: "Orçamento excluído com sucesso." };
    } catch (error) {
        console.error("Falha ao excluir orçamento:", error);
        throw new Error("Ocorreu um erro no servidor. Por favor, tente novamente mais tarde.");
    }
}