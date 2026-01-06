import { OrcamentoForm } from "@/components/orcamento-form";
import { Metadata } from "next";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Solicitar um Orçamento",
  description: "Preencha o formulário para obter um orçamento personalizado para o seu projeto de automação.",
};

export default function OrcamentoPage() {
  return (
    <div className="container max-w-3xl py-16 md:py-24">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold font-headline">Vamos Construir Algo Incrível Juntos</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Conte-nos sobre o seu projeto e nossa equipe de especialistas entrará em contato com uma estimativa personalizada.
        </p>
      </div>
      <Card>
        <CardContent className="p-6 sm:p-8">
            <OrcamentoForm />
        </CardContent>
      </Card>
    </div>
  );
}
