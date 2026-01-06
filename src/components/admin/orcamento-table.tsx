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
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import type { OrcamentoWithMetadata } from "@/lib/orcamentos-db";
import { format } from "date-fns";
import { ptBR } from 'date-fns/locale';


type OrcamentoTableProps = {
  orcamentos: OrcamentoWithMetadata[];
};

export function OrcamentoTable({ orcamentos }: OrcamentoTableProps) {
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
                  {orcamento.status === 'new' ? 'novo' : orcamento.status === 'contacted' ? 'contactado' : 'fechado'}
                </Badge>
              </TableCell>
              <TableCell className="hidden lg:table-cell">
                {format(orcamento.submittedAt, "d 'de' MMMM, yyyy 'às' HH:mm", { locale: ptBR })}
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
                    <DropdownMenuItem>Ver Detalhes</DropdownMenuItem>
                    <DropdownMenuItem>Marcar como Contactado</DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive focus:bg-destructive/10 focus:text-destructive">
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
  );
}
