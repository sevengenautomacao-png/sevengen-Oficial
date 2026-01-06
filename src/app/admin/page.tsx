import { getQuotes } from "@/lib/quotes-db";
import { QuoteTable } from "@/components/admin/quote-table";
import { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
    title: "Painel Administrativo",
};

export default async function AdminDashboardPage() {
  const quotes = await getQuotes();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Pedidos de Cotação</h1>
        <p className="text-muted-foreground">
          Veja e gerencie os pedidos de cotação enviados por clientes em potencial.
        </p>
      </div>
       <Card>
        <CardHeader>
          <CardTitle>Todas as Cotações ({quotes.length})</CardTitle>
        </CardHeader>
        <CardContent>
           <QuoteTable quotes={quotes} />
        </CardContent>
      </Card>
    </div>
  );
}
