import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  title: {
    default: 'Sevengen Automação',
    template: '%s | Sevengen Automação',
  },
  description: 'Projetando o Futuro da Automação.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased flex min-h-screen flex-col bg-background">
        <Header />
        <div className="flex-1 w-full max-w-screen-2xl mx-auto">
          <main className="flex-1">{children}</main>
        </div>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
