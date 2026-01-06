
"use client"

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Cpu } from 'lucide-react';
import * as React from 'react';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';

const Logo = () => (
  <Link href="/" className="flex items-center gap-2" aria-label="Voltar para a página inicial">
    <Cpu className="h-8 w-8 text-primary" />
    <span className="text-xl font-bold tracking-tight text-primary font-headline">
      Sevengen
    </span>
  </Link>
);

const NavLinks = ({ className, onLinkClick }: { className?: string; onLinkClick?: () => void }) => (
  <nav className={className}>
    <Link href="/#services" className="text-muted-foreground transition-colors hover:text-foreground" onClick={onLinkClick}>
      Serviços
    </Link>
    <Link href="/#about" className="text-muted-foreground transition-colors hover:text-foreground" onClick={onLinkClick}>
      Sobre
    </Link>
    <Link href="/orcamento" className="text-muted-foreground transition-colors hover:text-foreground" onClick={onLinkClick}>
      Contato
    </Link>
  </nav>
);

export function Header() {
  const [isSheetOpen, setIsSheetOpen] = React.useState(false);
  const pathname = usePathname();
  const { loading } = useAuth();

  if (pathname.startsWith('/admin') || pathname.startsWith('/login') || loading) {
    return null;
  }
  
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between mx-auto">
        <div className="flex items-center gap-4 md:gap-10">
          <Logo />
          <NavLinks className="hidden gap-6 md:flex" />
        </div>
        <div className="flex items-center gap-2">
          <Button asChild className="hidden sm:inline-flex">
            <Link href="/orcamento">Solicitar Orçamento</Link>
          </Button>
          <div className="md:hidden">
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Abrir Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <SheetHeader>
                   <SheetTitle>
                    <Logo />
                  </SheetTitle>
                </SheetHeader>
                <NavLinks className="mt-6 flex flex-col space-y-4 px-0" onLinkClick={() => setIsSheetOpen(false)} />
                 <div className="mt-6">
                    <Button asChild className="w-full">
                        <Link href="/orcamento" onClick={() => setIsSheetOpen(false)}>Solicitar Orçamento</Link>
                    </Button>
                 </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
