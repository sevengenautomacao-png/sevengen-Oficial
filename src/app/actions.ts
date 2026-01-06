"use server";

import { revalidatePath } from "next/cache";
import { OrcamentoSchema, type Orcamento, ColaboradorSchema, type Colaborador } from "@/lib/types";
import { addOrcamento, deleteOrcamento as dbDeleteOrcamento, updateOrcamentoStatus as dbUpdateOrcamentoStatus } from "@/lib/orcamentos-db";
import { addColaborador as dbAddColaborador, updateColaborador as dbUpdateColaborador, deleteColaborador as dbDeleteColaborador } from "@/lib/colaboradores-db";


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

// Colaborador Actions
export async function addColaborador(data: Colaborador) {
    const parsedData = ColaboradorSchema.safeParse(data);

    if (!parsedData.success) {
        throw new Error("Dados de colaborador inválidos fornecidos.");
    }
    
    // Generate a random password
    const password = Math.random().toString(36).slice(-8);
    const newColaboradorData = { ...parsedData.data, password };

    try {
        const { id } = await dbAddColaborador(newColaboradorData);
        revalidatePath("/admin/colaboradores");
        return { success: true, message: "Colaborador adicionado com sucesso.", data: { id, password } };
    } catch (error) {
        console.error("Falha ao adicionar colaborador:", error);
        throw new Error("Ocorreu um erro no servidor.");
    }
}

export async function updateColaborador(id: string, data: Omit<Colaborador, 'password'>) {
    // We remove password from the schema validation for updates
    const updateSchema = ColaboradorSchema.omit({ password: true });
    const parsedData = updateSchema.safeParse(data);

    if (!parsedData.success) {
        throw new Error("Dados de colaborador inválidos fornecidos.");
    }

    try {
        await dbUpdateColaborador(id, parsedData.data);
        revalidatePath("/admin/colaboradores");
        return { success: true, message: "Colaborador atualizado com sucesso." };
    } catch (error) {
        console.error("Falha ao atualizar colaborador:", error);
        throw new Error("Ocorreu um erro no servidor.");
    }
}

export async function deleteColaborador(id: string) {
    try {
        await dbDeleteColaborador(id);
        revalidatePath("/admin/colaboradores");
        return { success: true, message: "Colaborador excluído com sucesso." };
    } catch (error) {
        console.error("Falha ao excluir colaborador:", error);
        throw new Error("Ocorreu um erro no servidor.");
    }
}
