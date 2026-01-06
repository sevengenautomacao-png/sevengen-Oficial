
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
import { Label } from "@/components/ui/label";
import { Loader2, Copy } from "lucide-react";
import type { ColaboradorWithId } from "@/lib/colaboradores-db";

type ColaboradorFormDialogProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  colaborador: ColaboradorWithId | null;
  colaboradores: ColaboradorWithId[];
  onSuccess: (updatedColaboradores: ColaboradorWithId[]) => void;
};

// We don't want to validate the password on the client, as it's generated on the server
const FormSchema = ColaboradorSchema.omit({ password: true });

export function ColaboradorFormDialog({
  isOpen,
  onOpenChange,
  colaborador,
  colaboradores,
  onSuccess,
}: ColaboradorFormDialogProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [generatedPassword, setGeneratedPassword] = React.useState<string | null>(null);
  const isEditing = !!colaborador;

  const form = useForm<Omit<Colaborador, 'password'>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      age: 0,
      email: "",
      role: "",
    },
  });

  React.useEffect(() => {
    // Reset form and password state when dialog opens or collaborator changes
    setGeneratedPassword(null);
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
  
  const handleClose = () => {
    onOpenChange(false);
  };

  const copyToClipboard = () => {
    if (generatedPassword) {
      navigator.clipboard.writeText(generatedPassword);
      toast({
        title: "Senha Copiada!",
        description: "A senha foi copiada para a área de transferência.",
      });
    }
  };

  async function onSubmit(data: Omit<Colaborador, 'password'>) {
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
        handleClose();
      } else {
        const result = await addColaborador(data);
        if (result.success && result.data) {
            const newColaborador: ColaboradorWithId = { ...data, id: result.data.id, password: result.data.password };
            const updatedList = [...colaboradores, newColaborador].sort((a,b) => a.name.localeCompare(b.name));
            onSuccess(updatedList);
            setGeneratedPassword(result.data.password);
            toast({
              title: "Colaborador Adicionado!",
              description: "A senha gerada está visível abaixo. Copie-a em um local seguro.",
            });
        }
      }
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
          <DialogTitle>{isEditing ? "Editar Colaborador" : generatedPassword ? "Colaborador Criado com Sucesso" : "Adicionar Novo Colaborador"}</DialogTitle>
          <DialogDescription>
             {generatedPassword
              ? "O colaborador foi adicionado. Copie a senha abaixo antes de fechar."
              : isEditing
              ? "Altere os dados abaixo para atualizar o colaborador."
              : "Preencha os dados abaixo para adicionar um novo membro à equipe."}
          </DialogDescription>
        </DialogHeader>

        {generatedPassword ? (
          <div className="space-y-4 py-4">
             <div className="space-y-2">
              <Label htmlFor="generated-password">Senha Gerada</Label>
              <div className="relative">
                <Input id="generated-password" type="text" readOnly value={generatedPassword} className="pr-10" />
                <Button type="button" size="icon" variant="ghost" className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7" onClick={copyToClipboard}>
                    <Copy className="h-4 w-4" />
                    <span className="sr-only">Copiar senha</span>
                </Button>
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleClose}>Fechar</Button>
            </DialogFooter>
          </div>
        ) : (
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
                <Button type="button" variant="outline" onClick={handleClose} disabled={isSubmitting}>
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
        )}
      </DialogContent>
    </Dialog>
  );
}
