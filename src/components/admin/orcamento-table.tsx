"use client";

import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { OrcamentoWithMetadata } from "@/lib/orcamentos-db";
import { useToast } from "@/hooks/use-toast";
import { deleteOrcamento, updateOrcamentoStatus } from "@/app/actions";
import { OrcamentoTableRow } from "./orcamento-table-row";

type OrcamentoTableProps = {
  orcamentos: OrcamentoWithMetadata[];
};

export function OrcamentoTable({ orcamentos: initialOrcamentos }: OrcamentoTableProps) {
  const { toast } = useToast();
  const [orcamentos, setOrcamentos] = React.useState(initialOrcamentos);
  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  React.useEffect(() => {
    setOrcamentos(initialOrcamentos);
  }, [initialOrcamentos]);

  const handleAction = React.useCallback(async (action: () => Promise<any>, successMessage: string, errorMessage: string) => {
    try {
      await action();
      toast({
        title: "Sucesso!",
        description: successMessage,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro!",
        description: errorMessage,
      });
    }
  }, [toast]);

  const handleUpdateStatus = React.useCallback((id: string, status: "contacted" | "closed") => {
    const successMessage = status === 'contacted' ? "Orçamento marcado como 'contactado'." : "Orçamento marcado como 'fechado'.";
    handleAction(
      () => updateOrcamentoStatus(id, status),
      successMessage,
      "Falha ao atualizar o status do orçamento."
    ).then(() => {
        setOrcamentos(prev => prev.map(o => o.id === id ? {...o, status} : o));
    });
  }, [handleAction]);

  const handleDelete = React.useCallback((id: string) => {
    handleAction(
      () => deleteOrcamento(id),
      "Orçamento excluído com sucesso.",
      "Falha ao excluir o orçamento."
    ).then(() => {
       setOrcamentos(prev => prev.filter(o => o.id !== id));
    });
  }, [handleAction]);

  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Cliente</TableHead>
            <TableHead className="hidden md:table-cell">Empresa</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="hidden lg:table-cell">Enviado em</TableHead>
            <TableHead><span className="sr-only">Ações</span></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orcamentos.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="h-24 text-center">
                Nenhum pedido de orçamento ainda.
              </TableCell>
            </TableRow>
          ) : (
            orcamentos.map((orcamento) => (
              <OrcamentoTableRow
                key={orcamento.id}
                orcamento={orcamento}
                isClient={isClient}
                onUpdateStatus={handleUpdateStatus}
                onDelete={handleDelete}
              />
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
