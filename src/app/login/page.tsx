
'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { signInWithEmail } from '@/lib/firebase/auth';
import { Loader2, Cpu, ArrowLeft } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';

const LoginSchema = z.object({
  email: z.string().email({ message: 'Por favor, insira um e-mail válido.' }),
  password: z.string().min(6, { message: 'A senha deve ter pelo menos 6 caracteres.' }),
});

type LoginFormValues = z.infer<typeof LoginSchema>;

export default function LoginPage() {
  const { toast } = useToast();
  const router = useRouter();
  const { user, loading } = useAuth();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  React.useEffect(() => {
    if (!loading && user) {
      router.push('/admin');
    }
  }, [user, loading, router]);


  async function onSubmit(data: LoginFormValues) {
    setIsSubmitting(true);
    try {
      await signInWithEmail(data.email, data.password);
      toast({
        title: 'Login bem-sucedido!',
        description: 'Redirecionando para o painel de administração...',
      });
      router.push('/admin');
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Falha no login.',
        description: 'E-mail ou senha incorretos. Por favor, tente novamente.',
      });
    } finally {
        setIsSubmitting(false);
    }
  }
  
  if (loading || user) {
    return (
        <div className="flex h-screen w-full items-center justify-center bg-background">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted/40 p-4">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
            <div className="flex justify-center items-center gap-2 mb-4">
                <Cpu className="h-8 w-8 text-primary" />
                <span className="text-2xl font-bold tracking-tight text-primary font-headline">
                Sevengen
                </span>
            </div>
          <CardTitle className="text-2xl">Acesso Restrito</CardTitle>
          <CardDescription>
            Entre com suas credenciais para acessar o painel.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="admin@sevengen.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : null}
                {isSubmitting ? 'Entrando...' : 'Entrar'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      <Button asChild variant="link" className="mt-4 text-muted-foreground">
        <Link href="/">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar para o site
        </Link>
      </Button>
    </div>
  );
}
