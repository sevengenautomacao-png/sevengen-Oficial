
import { Metadata } from "next";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
    title: "Gerenciar Conteúdo da Página Inicial",
};

export default function ContentManagementPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Gerenciar Página Inicial</h1>
                <p className="text-muted-foreground">
                    Edite os textos e imagens que aparecem na sua página inicial.
                </p>
            </div>

            <Tabs defaultValue="hero">
                <TabsList>
                    <TabsTrigger value="hero">Seção Hero</TabsTrigger>
                    <TabsTrigger value="services">Serviços</TabsTrigger>
                    <TabsTrigger value="about">Sobre</TabsTrigger>
                </TabsList>
                
                <TabsContent value="hero">
                    <Card>
                        <CardHeader>
                            <CardTitle>Seção Hero</CardTitle>
                            <CardDescription>A primeira seção que os visitantes veem. Edite o título, subtítulo e a imagem de fundo.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground">(Funcionalidade de edição em breve)</p>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="services">
                    <Card>
                        <CardHeader>
                            <CardTitle>Seção de Serviços</CardTitle>
                            <CardDescription>Gerencie os cards de serviços, incluindo ícones, títulos, descrições e imagens.</CardDescription>
                        </CardHeader>
                        <CardContent>
                             <p className="text-sm text-muted-foreground">(Funcionalidade de edição em breve)</p>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="about">
                    <Card>
                        <CardHeader>
                            <CardTitle>Seção Sobre</CardTitle>
                            <CardDescription>Edite o texto e a imagem da seção que fala sobre a sua empresa.</CardDescription>
                        </CardHeader>
                        <CardContent>
                             <p className="text-sm text-muted-foreground">(Funcionalidade de edição em breve)</p>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
