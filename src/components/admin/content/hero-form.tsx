
'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useToast } from '@/hooks/use-toast';
import { updateHeroContent } from '@/app/actions';
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
import { Loader2 } from 'lucide-react';
import { CardFooter } from '@/components/ui/card';

const HeroFormSchema = z.object({
  title: z.string().min(5, 'O título deve ter pelo menos 5 caracteres.'),
  subtitle: z.string().min(10, 'O subtítulo deve ter pelo menos 10 caracteres.'),
  ctaButton: z.string().min(5, 'O texto do botão deve ter pelo menos 5 caracteres.'),
});

type HeroFormValues = z.infer<typeof HeroFormSchema>;

type HeroFormProps = {
  heroContent: PageContent['hero'];
};

export function HeroForm({ heroContent }: HeroFormProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const form = useForm<HeroFormValues>({
    resolver: zodResolver(HeroFormSchema),
    defaultValues: {
      title: heroContent.title,
      subtitle: heroContent.subtitle,
      ctaButton: heroContent.ctaButton,
    },
  });

  async function onSubmit(data: HeroFormValues) {
    setIsSubmitting(true);
    try {
      // We need to pass the imageId along with the form data
      const payload = { ...data, imageId: heroContent.imageId };
      const result = await updateHeroContent(payload);
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
              <FormLabel>Título Principal</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="subtitle"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subtítulo</FormLabel>
              <FormControl>
                <Textarea className="min-h-[100px]" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="ctaButton"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Texto do Botão (CTA)</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
