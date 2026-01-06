"use client";

import Link from 'next/link';
import { Cpu, Mail, Phone } from 'lucide-react';
import React from 'react';

const Logo = () => (
  <Link href="/" className="flex items-center gap-2">
    <Cpu className="h-8 w-8 text-primary" />
    <span className="text-xl font-bold tracking-tight text-primary font-headline">
      Sevengen
    </span>
  </Link>
);

export function Footer() {
    const [year, setYear] = React.useState(new Date().getFullYear());

    React.useEffect(() => {
        setYear(new Date().getFullYear());
    }, []);

  return (
    <footer className="border-t bg-card">
      <div className="container mx-auto max-w-screen-2xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              Seu parceiro em automação elétrica e eletrônica. Entregamos soluções inovadoras e confiáveis.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 lg:col-span-2 sm:grid-cols-3">
            <div>
              <p className="font-medium text-foreground">Empresa</p>
              <nav className="mt-4 flex flex-col space-y-2 text-sm">
                <Link href="/#about" className="text-muted-foreground transition-colors hover:text-foreground">
                  Sobre
                </Link>
                <Link href="/#services" className="text-muted-foreground transition-colors hover:text-foreground">
                  Serviços
                </Link>
                <Link href="/orcamento" className="text-muted-foreground transition-colors hover:text-foreground">
                  Pedir Orçamento
                </Link>
              </nav>
            </div>
            <div>
              <p className="font-medium text-foreground">Contato</p>
              <div className="mt-4 flex flex-col space-y-2 text-sm">
                <a href="mailto:contato@sevengen.com" className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground">
                  <Mail className="h-4 w-4" />
                  <span>contato@sevengen.com</span>
                </a>
                <a href="tel:+5511999999999" className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground">
                  <Phone className="h-4 w-4" />
                  <span>+55 (11) 99999-9999</span>
                </a>
              </div>
            </div>
            <div>
              <p className="font-medium text-foreground">Legal</p>
              <nav className="mt-4 flex flex-col space-y-2 text-sm">
                <Link href="#" className="text-muted-foreground transition-colors hover:text-foreground">
                  Política de Privacidade
                </Link>
                <Link href="#" className="text-muted-foreground transition-colors hover:text-foreground">
                  Termos de Serviço
                </Link>
              </nav>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 flex flex-col sm:flex-row justify-between items-center text-sm text-muted-foreground">
          <p className="text-center sm:text-left">&copy; {year} Sevengen Automação. Todos os direitos reservados.</p>
          <Link href="/admin" className="mt-4 sm:mt-0 opacity-50 hover:opacity-100 transition-opacity">
            Admin
          </Link>
        </div>
      </div>
    </footer>
  );
}
