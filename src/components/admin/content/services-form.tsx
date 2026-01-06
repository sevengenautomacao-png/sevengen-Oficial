
'use client';

import * as React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useToast } from '@/hooks/use-toast';
import { updateServicesContent } from '@/app/actions';
import { type Service } from '@/lib/page-content';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, Sparkles } from 'lucide-react';
import { CardFooter } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Checkbox } from '@/components/ui/checkbox';

const ServiceSchema = z.object({
  icon: z.string(),
  title: z.string().min(3, 'O título deve ter pelo menos 3 caracteres.'),
  description: z.string().min(10, 'A descrição deve ter pelo menos 10 caracteres.'),
  imageId: z.string(),
  imageUrl: z.string().url('Por favor, insira uma URL de imagem válida.').optional().or(z.literal('')),
  comingSoon: z.boolean(),
});

const ServicesFormSchema = z.object({
  services: z.array(ServiceSchema),
});

type ServicesFormValues = z.infer<typeof ServicesFormSchema>;

type ServicesFormProps = {
  services: Service[];
};

export function ServicesForm({ services }: ServicesFormProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const form = useForm<ServicesFormValues>({
    resolver: zodResolver(ServicesFormSchema),
    defaultValues: {
      services: services.map(s => ({ ...s, imageUrl: s.imageUrl || '', comingSoon: s.comingSoon || false })),
    },
  });

  const { fields } = useFieldArray({
    control: form.control,
    name: "services",
  });

  async function onSubmit(data: ServicesFormValues) {
    setIsSubmitting(true);
    try {
      const result = await updateServicesContent(data.services);
      if (result.success) {
        toast({
          title: 'Sucesso!',
          description: result.message,
        });
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Oh não! Algo deu errado.',
        description: 'Houve um problema ao salvar as alterações.',
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Accordion type="single" collapsible className="w-full">
          {fields.map((field, index) => (
            <AccordionItem value={`item-${index}`} key={field.id}>
              <AccordionTrigger>
                <div className="flex items-center justify-between w-full pr-2">
                    <span className="font-semibold text-left">{form.watch(`services.${index}.title`)}</span>
                    {form.watch(`services.${index}.comingSoon`) && (
                        <span className="text-xs font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded-full">Em Breve</span>
                    )}
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4 p-1">
                  <FormField
                    control={form.control}
                    name={`services.${index}.title`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Título</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`services.${index}.description`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Descrição</FormLabel>
                        <FormControl>
                          <Textarea className="min-h-[100px]" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`services.${index}.imageUrl`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>URL da Imagem</FormLabel>
                        <FormControl>
                          <Input placeholder="https://exemplo.com/imagem.jpg" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                   <FormField
                    control={form.control}
                    name={`services.${index}.icon`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Ícone</FormLabel>
                        <FormControl>
                          <Input placeholder="Nome do Ícone (ex: PlugZap)" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`services.${index}.comingSoon`}
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow-sm">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            Marcar como "Em Breve"
                          </FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        
        <CardFooter className="border-t px-6 py-4 mt-6">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            {isSubmitting ? 'Salvando...' : 'Salvar Todas as Alterações'}
          </Button>
        </CardFooter>
      </form>
    </Form>
  );
}
