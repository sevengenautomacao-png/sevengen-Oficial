"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { ColaboradorSchema, type Colaborador } from "@/lib/types";
import { addColaborador, updateColaborador } from "@/app/actions";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import type { ColaboradorWithId } from "@/lib/colaboradores-db";

type ColaboradorFormDialogProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  colaborador: ColaboradorWithId | null;
  colaboradores: ColaboradorWithId[];
  onSuccess: (updatedColaboradores: ColaboradorWithId[]) => void;
};

export function ColaboradorFormDialog({
  isOpen,
  onOpenChange,
  colaborador,
  colaboradores,
  onSuccess,
}: ColaboradorFormDialogProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const isEditing = !!colaborador;

  const form = useForm<Colaborador>({
    resolver: zodResolver(ColaboradorSchema),
    defaultValues: {
      name: "",
      age: 0,
      email: "",
      role: "",
    },
  });

  React.useEffect(() => {
    if (colaborador) {
      form.reset(colaborador);
    } else {
      form.reset({
        name: "",
        age: 0,
        email: "",
        role: "",
      });
    }
  }, [colaborador, form, isOpen]);

  async function onSubmit(data: Colaborador) {
    setIsSubmitting(true);
    try {
      if (isEditing && colaborador) {
        await updateColaborador(colaborador.id, data);
        const updatedList = colaboradores.map(c => c.id === colaborador.id ? { ...c, ...data } : c);
        onSuccess(updatedList);
        toast({
          title: "Colaborador Atualizado!",
          description: "Os dados do colaborador foram atualizados com sucesso.",
        });
      } else {
        const result = await addColaborador(data);
        const newColaborador = { ...data, id: result.id };
        const updatedList = [...colaboradores, newColaborador].sort((a,b) => a.name.localeCompare(b.name));
        onSuccess(updatedList);
        toast({
          title: "Colaborador Adicionado!",
          description: "O novo colaborador foi adicionado à equipe.",
        });
      }
      onOpenChange(false);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Oh não! Algo deu errado.",
        description: `Houve um problema ao ${isEditing ? 'atualizar' : 'adicionar'} o colaborador.`,
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Editar Colaborador" : "Adicionar Novo Colaborador"}</DialogTitle>
          <DialogDescription>
            {isEditing ? "Altere os dados abaixo para atualizar o colaborador." : "Preencha os dados abaixo para adicionar um novo membro à equipe."}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input placeholder="João da Silva" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="joao.silva@empresa.com" type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
                <FormField
                control={form.control}
                name="age"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Idade</FormLabel>
                    <FormControl>
                        <Input type="number" placeholder="30" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Cargo</FormLabel>
                    <FormControl>
                        <Input placeholder="Engenheiro" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isSubmitting}>
                Cancelar
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : null}
                {isSubmitting ? "Salvando..." : "Salvar"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
