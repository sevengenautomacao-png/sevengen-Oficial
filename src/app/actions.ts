"use server";

import { revalidatePath } from "next/cache";
import { QuoteSchema, type Quote } from "@/lib/types";
import { addQuote } from "@/lib/quotes-db";

export async function submitQuote(data: Quote) {
  const parsedData = QuoteSchema.safeParse(data);

  if (!parsedData.success) {
    // This can be expanded to return field-specific errors
    throw new Error("Invalid quote data provided.");
  }

  try {
    await addQuote(parsedData.data);
    // Revalidate the admin page to show the new quote immediately
    revalidatePath("/admin");
    return { success: true, message: "Quote submitted successfully." };
  } catch (error) {
    console.error("Failed to submit quote:", error);
    // In a real app, you might have more specific error handling
    throw new Error("A server error occurred. Please try again later.");
  }
}
