"use client"

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Cpu } from 'lucide-react';
import * as React from 'react';

const Logo = () => (
  <Link href="/" className="flex items-center gap-2" aria-label="Back to homepage">
    <Cpu className="h-8 w-8 text-primary" />
    <span className="text-xl font-bold tracking-tight text-primary font-headline">
      Sevengen
    </span>
  </Link>
);

const NavLinks = ({ className, onLinkClick }: { className?: string; onLinkClick?: () => void }) => (
  <nav className={className}>
    <Link href="/#services" className="text-muted-foreground transition-colors hover:text-foreground" onClick={onLinkClick}>
      Services
    </Link>
    <Link href="/#about" className="text-muted-foreground transition-colors hover:text-foreground" onClick={onLinkClick}>
      About
    </Link>
    <Link href="/quote" className="text-muted-foreground transition-colors hover:text-foreground" onClick={onLinkClick}>
      Contact
    </Link>
  </nav>
);

export function Header() {
  const [isSheetOpen, setIsSheetOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center">
        <div className="mr-auto flex items-center gap-4 md:gap-10">
          <Logo />
          <NavLinks className="hidden gap-6 md:flex" />
        </div>
        <div className="flex items-center gap-2">
          <Button asChild className="hidden sm:inline-flex">
            <Link href="/quote">Request a Quote</Link>
          </Button>
          <div className="md:hidden">
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <div className="p-6">
                  <Logo />
                </div>
                <NavLinks className="flex flex-col space-y-4 px-6" onLinkClick={() => setIsSheetOpen(false)} />
                 <div className="p-6 mt-4">
                    <Button asChild className="w-full">
                        <Link href="/quote" onClick={() => setIsSheetOpen(false)}>Request a Quote</Link>
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