import { Metadata } from "next";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
    title: "Gerenciar Colaboradores",
};

export default function ColaboradoresPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Colaboradores</h1>
        <p className="text-muted-foreground">
          Gerencie os membros da sua equipe e suas permissões.
        </p>
      </div>
       <Card>
        <CardHeader>
          <CardTitle>Gerenciamento de Equipe</CardTitle>
          <CardDescription>Esta área está em desenvolvimento.</CardDescription>
        </CardHeader>
        <CardContent>
           <p className="text-sm text-muted-foreground">Em breve, você poderá adicionar, remover e editar colaboradores aqui.</p>
        </CardContent>
      </Card>
    </div>
  );
}
