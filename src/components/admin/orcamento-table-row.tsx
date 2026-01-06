"use client";

import * as React from "react";
import { TableCell, TableRow } from "@/components/ui/table";
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
import { OrcamentoDetailsDialog } from "./orcamento-details-dialog";

type OrcamentoTableRowProps = {
  orcamento: OrcamentoWithMetadata;
  isClient: boolean;
  onUpdateStatus: (id: string, status: "contacted" | "closed") => void;
  onDelete: (id: string) => void;
};

export function OrcamentoTableRow({
  orcamento,
  isClient,
  onUpdateStatus,
  onDelete,
}: OrcamentoTableRowProps) {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  return (
    <>
      <TableRow>
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
              <DropdownMenuItem onClick={() => setIsDialogOpen(true)}>
                Ver Detalhes
              </DropdownMenuItem>
              {orcamento.status === 'new' && (
                <DropdownMenuItem onClick={() => onUpdateStatus(orcamento.id, "contacted")}>
                  Marcar como Contactado
                </DropdownMenuItem>
              )}
              {orcamento.status === 'contacted' && (
                <DropdownMenuItem onClick={() => onUpdateStatus(orcamento.id, "closed")}>
                  Marcar como Fechado
                </DropdownMenuItem>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-destructive focus:bg-destructive/10 focus:text-destructive"
                onClick={() => onDelete(orcamento.id)}
              >
                Excluir
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </TableCell>
      </TableRow>
      {/* O Dialog é renderizado condicionalmente aqui, mas controlado pelo estado desta linha */}
      <OrcamentoDetailsDialog
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        orcamento={orcamento}
      />
    </>
  );
}
