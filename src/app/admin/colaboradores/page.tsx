import { Metadata } from "next";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getColaboradores } from "@/lib/colaboradores-db";
import { ColaboradoresTable } from "@/components/admin/colaboradores-table";

export const metadata: Metadata = {
    title: "Gerenciar Colaboradores",
};

export default async function ColaboradoresPage() {
    const colaboradores = await getColaboradores();

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
                    <CardDescription>Adicione, edite ou remova membros da equipe.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ColaboradoresTable colaboradores={colaboradores} />
                </CardContent>
            </Card>
        </div>
    );
}
