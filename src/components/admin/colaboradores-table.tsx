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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, PlusCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { deleteColaborador } from "@/app/actions";
import type { ColaboradorWithId } from "@/lib/colaboradores-db";
import { ColaboradorFormDialog } from "./colaborador-form-dialog";

type ColaboradoresTableProps = {
  colaboradores: ColaboradorWithId[];
};

export function ColaboradoresTable({ colaboradores: initialColaboradores }: ColaboradoresTableProps) {
  const { toast } = useToast();
  const [colaboradores, setColaboradores] = React.useState(initialColaboradores);
  const [isFormOpen, setIsFormOpen] = React.useState(false);
  const [isAlertOpen, setIsAlertOpen] = React.useState(false);
  const [selectedColaborador, setSelectedColaborador] = React.useState<ColaboradorWithId | null>(null);

  React.useEffect(() => {
    setColaboradores(initialColaboradores);
  }, [initialColaboradores]);
  
  const handleEdit = (colaborador: ColaboradorWithId) => {
    setSelectedColaborador(colaborador);
    setIsFormOpen(true);
  };

  const handleAdd = () => {
    setSelectedColaborador(null);
    setIsFormOpen(true);
  };

  const handleDeleteClick = (colaborador: ColaboradorWithId) => {
    setSelectedColaborador(colaborador);
    setIsAlertOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedColaborador) return;

    try {
      await deleteColaborador(selectedColaborador.id);
      setColaboradores(prev => prev.filter(c => c.id !== selectedColaborador.id));
      toast({
        title: "Sucesso!",
        description: "Colaborador excluído com sucesso.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro!",
        description: "Falha ao excluir o colaborador.",
      });
    } finally {
      setIsAlertOpen(false);
      setSelectedColaborador(null);
    }
  };

  const handleFormSuccess = (updatedColaboradores: ColaboradorWithId[]) => {
    setColaboradores(updatedColaboradores);
  };

  return (
    <>
      <div className="flex justify-end mb-4">
        <Button onClick={handleAdd}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Adicionar Colaborador
        </Button>
      </div>
      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead className="hidden md:table-cell">Email</TableHead>
              <TableHead>Idade</TableHead>
              <TableHead>Cargo</TableHead>
              <TableHead><span className="sr-only">Ações</span></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {colaboradores.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  Nenhum colaborador encontrado.
                </TableCell>
              </TableRow>
            ) : (
              colaboradores.map((colaborador) => (
                <TableRow key={colaborador.id}>
                  <TableCell className="font-medium">{colaborador.name}</TableCell>
                  <TableCell className="hidden md:table-cell text-muted-foreground">{colaborador.email}</TableCell>
                  <TableCell>{colaborador.age}</TableCell>
                  <TableCell>{colaborador.role}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Ações para {colaborador.name}</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEdit(colaborador)}>
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-destructive focus:bg-destructive/10 focus:text-destructive"
                          onClick={() => handleDeleteClick(colaborador)}
                        >
                          Excluir
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <ColaboradorFormDialog
        isOpen={isFormOpen}
        onOpenChange={setIsFormOpen}
        colaborador={selectedColaborador}
        onSuccess={handleFormSuccess}
        colaboradores={colaboradores}
      />
      
      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
            <AlertDialogDescription>
              Essa ação não pode ser desfeita. Isso excluirá permanentemente o colaborador
              "{selectedColaborador?.name}".
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive hover:bg-destructive/90"
              onClick={handleDeleteConfirm}
            >
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
