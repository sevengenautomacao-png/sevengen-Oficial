"use server";

import { revalidatePath } from "next/cache";
import { QuoteSchema, type Quote } from "@/lib/types";
import { addQuote } from "@/lib/quotes-db";

export async function submitQuote(data: Quote) {
  const parsedData = QuoteSchema.safeParse(data);

  if (!parsedData.success) {
    // This can be expanded to return field-specific errors
    throw new Error("Dados de cotação inválidos fornecidos.");
  }

  try {
    await addQuote(parsedData.data);
    // Revalidate the admin page to show the new quote immediately
    revalidatePath("/admin");
    return { success: true, message: "Cotação enviada com sucesso." };
  } catch (error) {
    console.error("Falha ao enviar cotação:", error);
    // In a real app, you might have more specific error handling
    throw new Error("Ocorreu um erro no servidor. Por favor, tente novamente mais tarde.");
  }
}
