import { getOrcamentos } from "@/lib/orcamentos-db";
import { OrcamentoTable } from "@/components/admin/orcamento-table";
import { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
    title: "Painel Administrativo",
};

export default async function AdminDashboardPage() {
  const orcamentos = await getOrcamentos();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Pedidos de Orçamento</h1>
        <p className="text-muted-foreground">
          Veja e gerencie os pedidos de orçamento enviados por clientes em potencial.
        </p>
      </div>
       <Card>
        <CardHeader>
          <CardTitle>Todos os Orçamentos ({orcamentos.length})</CardTitle>
        </CardHeader>
        <CardContent>
           <OrcamentoTable orcamentos={orcamentos} />
        </CardContent>
      </Card>
    </div>
  );
}
