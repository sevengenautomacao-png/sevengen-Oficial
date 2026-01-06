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
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import type { OrcamentoWithMetadata } from "@/lib/orcamentos-db";
import { format } from "date-fns";
import { ptBR } from 'date-fns/locale';
import { useToast } from "@/hooks/use-toast";
import { deleteOrcamento, updateOrcamentoStatus } from "@/app/actions";
import { OrcamentoDetailsDialog } from "./orcamento-details-dialog";

type OrcamentoTableProps = {
  orcamentos: OrcamentoWithMetadata[];
};

export function OrcamentoTable({ orcamentos: initialOrcamentos }: OrcamentoTableProps) {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [selectedOrcamento, setSelectedOrcamento] = React.useState<OrcamentoWithMetadata | null>(null);
  const [orcamentos, setOrcamentos] = React.useState(initialOrcamentos);
  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
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
    );
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
  
  const handleViewDetails = React.useCallback((orcamento: OrcamentoWithMetadata) => {
      setSelectedOrcamento(orcamento);
      setIsDialogOpen(true);
  }, []);

  return (
    <>
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
            {orcamentos.length === 0 && (
              <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center">
                      Nenhum pedido de orçamento ainda.
                  </TableCell>
              </TableRow>
            )}
            {orcamentos.map((orcamento) => (
              <TableRow key={orcamento.id}>
                <TableCell>
                  <div className="font-medium">{orcamento.name}</div>
                  <div className="text-sm text-muted-foreground hidden sm:block">{orcamento.email}</div>
                </TableCell>
                <TableCell className="hidden md:table-cell">{orcamento.company || "N/A"}</TableCell>
                <TableCell>
                  <Badge 
                      variant={
                          orcamento.status === 'new' ? 'default' :
                          orcamento.status === 'contacted' ? 'secondary' :
                          'outline'
                      }
                      className="capitalize"
                  >
                    {orcamento.status === 'new' ? 'novo' : orcamento.status}
                  </Badge>
                </TableCell>
                <TableCell className="hidden lg:table-cell">
                  {isClient ? format(new Date(orcamento.submittedAt), "d 'de' MMMM, yyyy 'às' HH:mm", { locale: ptBR }) : '...'}
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Ações para {orcamento.name}</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleViewDetails(orcamento)}>
                        Ver Detalhes
                      </DropdownMenuItem>
                      {orcamento.status === 'new' && (
                        <DropdownMenuItem onClick={() => handleUpdateStatus(orcamento.id, "contacted")}>
                            Marcar como Contactado
                        </DropdownMenuItem>
                      )}
                      {orcamento.status === 'contacted' && (
                        <DropdownMenuItem onClick={() => handleUpdateStatus(orcamento.id, "closed")}>
                            Marcar como Fechado
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuSeparator />
                      <DropdownMenuItem 
                        className="text-destructive focus:bg-destructive/10 focus:text-destructive"
                        onClick={() => handleDelete(orcamento.id)}
                      >
                        Excluir
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {selectedOrcamento && (
          <OrcamentoDetailsDialog
            isOpen={isDialogOpen}
            onOpenChange={setIsDialogOpen}
            orcamento={selectedOrcamento}
          />
      )}
    </>
  );
}
