"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import type { OrcamentoWithMetadata } from "@/lib/orcamentos-db";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

type OrcamentoDetailsDialogProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  orcamento: OrcamentoWithMetadata;
};

export function OrcamentoDetailsDialog({
  isOpen,
  onOpenChange,
  orcamento,
}: OrcamentoDetailsDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Detalhes do Orçamento</DialogTitle>
          <DialogDescription>
            Enviado por {orcamento.name} em{" "}
            {format(orcamento.submittedAt, "d 'de' MMMM, yyyy", {
              locale: ptBR,
            })}
            .
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <p className="text-sm font-medium text-muted-foreground col-span-1">
              Nome
            </p>
            <p className="col-span-3 text-sm">{orcamento.name}</p>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <p className="text-sm font-medium text-muted-foreground col-span-1">
              Email
            </p>
            <p className="col-span-3 text-sm">{orcamento.email}</p>
          </div>
          {orcamento.company && (
            <div className="grid grid-cols-4 items-center gap-4">
              <p className="text-sm font-medium text-muted-foreground col-span-1">
                Empresa
              </p>
              <p className="col-span-3 text-sm">{orcamento.company}</p>
            </div>
          )}
          {orcamento.phone && (
            <div className="grid grid-cols-4 items-center gap-4">
              <p className="text-sm font-medium text-muted-foreground col-span-1">
                Telefone
              </p>
              <p className="col-span-3 text-sm">{orcamento.phone}</p>
            </div>
          )}
          <div className="grid grid-cols-1 gap-2">
            <p className="text-sm font-medium text-muted-foreground">
              Detalhes do Projeto
            </p>
            <div className="col-span-3 text-sm p-4 bg-muted/50 rounded-md whitespace-pre-wrap">
              {orcamento.projectDetails}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}