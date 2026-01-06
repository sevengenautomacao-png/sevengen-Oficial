
'use client';

import * as React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useToast } from '@/hooks/use-toast';
import { updateAboutContent } from '@/app/actions';
import { type PageContent } from '@/lib/page-content-db';
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
import { Loader2, Trash2 } from 'lucide-react';
import { CardFooter } from '@/components/ui/card';

const AboutFormSchema = z.object({
  title: z.string().min(5, 'O título deve ter pelo menos 5 caracteres.'),
  paragraphs: z.array(z.object({ value: z.string().min(10, 'O parágrafo deve ter pelo menos 10 caracteres.') })),
});

type AboutFormValues = z.infer<typeof AboutFormSchema>;

type AboutFormProps = {
  aboutContent: PageContent['aboutSection'];
};

export function AboutForm({ aboutContent }: AboutFormProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const form = useForm<AboutFormValues>({
    resolver: zodResolver(AboutFormSchema),
    defaultValues: {
      title: aboutContent.title,
      paragraphs: aboutContent.paragraphs.map(p => ({ value: p })),
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "paragraphs",
  });

  async function onSubmit(data: AboutFormValues) {
    setIsSubmitting(true);
    try {
      const payload = { 
        ...aboutContent,
        title: data.title,
        paragraphs: data.paragraphs.map(p => p.value),
       };
      const result = await updateAboutContent(payload);
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
        <FormField
          control={form.control}
          name="title"
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
        
        <div className="space-y-4">
            <FormLabel>Parágrafos</FormLabel>
            {fields.map((field, index) => (
                <FormField
                    key={field.id}
                    control={form.control}
                    name={`paragraphs.${index}.value`}
                    render={({ field }) => (
                        <FormItem>
                             <div className="flex items-center gap-2">
                                <FormControl>
                                    <Textarea className="min-h-[120px] resize-y" {...field} />
                                </FormControl>
                                <Button type="button" variant="ghost" size="icon" onClick={() => remove(index)} disabled={fields.length <= 1}>
                                    <Trash2 className="h-4 w-4 text-destructive" />
                                </Button>
                             </div>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            ))}
            <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => append({ value: '' })}
                >
                Adicionar Parágrafo
            </Button>
        </div>

        <CardFooter className="border-t px-6 py-4">
            <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            {isSubmitting ? 'Salvando...' : 'Salvar Alterações'}
            </Button>
        </CardFooter>
      </form>
    </Form>
  );
}
