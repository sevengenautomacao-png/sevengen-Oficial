import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ArrowRight, Cpu, GanttChartSquare, Wrench, PlugZap, ShoppingCart, Truck, Lightbulb, TestTube, Factory } from 'lucide-react';

const heroImage = PlaceHolderImages.find(p => p.id === 'hero');

const serviceImages = {
  distribution: PlaceHolderImages.find(p => p.id === 'service-distribution-control'),
  engineering: PlaceHolderImages.find(p => p.id === 'service-engineering'),
  installation: PlaceHolderImages.find(p => p.id === 'service-installation-maintenance'),
  retail: PlaceHolderImages.find(p => p.id === 'service-retail'),
  rent: PlaceHolderImages.find(p => p.id === 'service-rent'),
  repair: PlaceHolderImages.find(p => p.id === 'service-repair'),
  general: PlaceHolderImages.find(p => p.id === 'service-general-maintenance'),
  measurement: PlaceHolderImages.find(p => p.id === 'service-measurement-repair'),
};
const aboutImage = PlaceHolderImages.find(p => p.id === 'about-team');

const services = [
  {
    icon: <PlugZap className="h-10 w-10 text-primary" />,
    title: 'Distribuição e Controle de Energia',
    description: 'Fabricação de subestações, quadros de comando, disjuntores, e outros equipamentos para distribuição e controle de energia elétrica.',
    image: serviceImages.distribution,
  },
  {
    icon: <GanttChartSquare className="h-10 w-10 text-primary" />,
    title: 'Serviços de Engenharia',
    description: 'Elaboração e gestão de projetos técnicos, supervisão de obras e consultoria em diversas áreas da engenharia.',
    image: serviceImages.engineering,
  },
  {
    icon: <Wrench className="h-10 w-10 text-primary" />,
    title: 'Instalação e Manutenção Elétrica',
    description: 'Instalação e manutenção de sistemas de eletricidade, redes de comunicação, automação predial e sistemas de segurança.',
    image: serviceImages.installation,
  },
  {
    icon: <ShoppingCart className="h-10 w-10 text-primary" />,
    title: 'Comércio de Material Elétrico',
    description: 'Comércio varejista de fios, cabos, lâmpadas, interruptores, tomadas e outros materiais elétricos.',
    image: serviceImages.retail,
  },
  {
    icon: <Truck className="h-10 w-10 text-primary" />,
    title: 'Aluguel de Máquinas e Equipamentos',
    description: 'Aluguel de motores, geradores, guindastes, equipamentos de som e vídeo profissional, e contêineres.',
    image: serviceImages.rent,
  },
  {
    icon: <Lightbulb className="h-10 w-10 text-primary" />,
    title: 'Reparo de Eletroeletrônicos',
    description: 'Reparação e manutenção de eletrodomésticos, televisores, rádios, e equipamentos de ar condicionado de uso doméstico ou industrial.',
    image: serviceImages.repair,
  },
   {
    icon: <Factory className="h-10 w-10 text-primary" />,
    title: 'Manutenção de Equipamentos de Uso Geral',
    description: 'Manutenção e reparação de máquinas de embalar, equipamentos de saneamento, extintores de incêndio e outras máquinas de uso geral.',
    image: serviceImages.general,
  },
  {
    icon: <TestTube className="h-10 w-10 text-primary" />,
    title: 'Manutenção de Instrumentos de Medida',
    description: 'Manutenção e reparação de aparelhos e instrumentos de medida, teste e controle utilizados na indústria.',
    image: serviceImages.measurement,
  },
];

export default function Home() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <AboutSection />
      <CtaSection />
    </>
  );
}

function HeroSection() {
  return (
    <section className="relative w-full h-[60vh] md:h-[80vh]">
      {heroImage && (
        <Image
          src={heroImage.imageUrl}
          alt={heroImage.description}
          data-ai-hint={heroImage.imageHint}
          fill
          className="object-cover"
          priority
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20" />
      <div className="container mx-auto relative h-full flex flex-col items-center justify-center text-center text-white px-4">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight drop-shadow-md font-headline">
          Projetando o Futuro da Automação
        </h1>
        <p className="mt-4 max-w-2xl text-lg md:text-xl text-primary-foreground/90 drop-shadow">
          A Sevengen oferece soluções de automação elétrica e eletrônica de ponta, adaptadas às necessidades da sua indústria.
        </p>
        <Button asChild size="lg" className="mt-8 bg-accent text-accent-foreground hover:bg-accent/90">
          <Link href="/orcamento">
            Obtenha seu Orçamento Gratuito <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
      </div>
    </section>
  );
}

function ServicesSection() {
  return (
    <section id="services" className="py-16 md:py-24 bg-secondary">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold font-headline">Nossa Expertise</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Oferecemos uma gama completa de serviços para aumentar sua eficiência operacional e produtividade.
          </p>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {services.map((service) => (
            <Card key={service.title} className="flex flex-col overflow-hidden transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl">
              {service.image && (
                <div className="aspect-[16/10] relative">
                  <Image
                    src={service.image.imageUrl}
                    alt={service.image.description}
                    data-ai-hint={service.image.imageHint}
                    width={600}
                    height={400}
                    className="object-cover w-full h-full"
                  />
                </div>
              )}
              <CardHeader className="flex-row items-start gap-4">
                {service.icon}
                <CardTitle className="text-xl font-headline mt-2">{service.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <CardDescription>{service.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section id="about" className="py-16 md:py-24 bg-background">
      <div className="container grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold font-headline">Sobre a Sevengen Automação</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Desde a nossa fundação, a Sevengen está na vanguarda da indústria de automação. Nossa missão é capacitar empresas com sistemas de automação inteligentes, confiáveis e eficientes que impulsionam o crescimento e a inovação.
          </p>
          <p className="mt-4 text-muted-foreground">
            Nossa equipe de engenheiros especialistas traz décadas de experiência combinada em disciplinas elétricas e eletrônicas, garantindo uma abordagem holística para cada projeto que realizamos. Estamos comprometidos com a qualidade, segurança e satisfação do cliente.
          </p>
        </div>
        <div className="relative h-80 rounded-lg overflow-hidden shadow-lg">
          {aboutImage && <Image
            src={aboutImage.imageUrl}
            alt={aboutImage.description}
            data-ai-hint={aboutImage.imageHint}
            fill
            className="object-cover"
          />}
        </div>
      </div>
    </section>
  );
}

function CtaSection() {
  return (
    <section id="contact" className="py-16 md:py-24 bg-secondary">
      <div className="container text-center">
        <h2 className="text-3xl md:text-4xl font-bold font-headline">Pronto para Automatizar?</h2>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Vamos discutir como a Sevengen pode ajudá-lo a alcançar seus objetivos de automação. Entre em contato hoje para uma consulta e orçamento personalizados.
        </p>
        <Button asChild size="lg" className="mt-8">
          <Link href="/orcamento">
            Solicite um Orçamento Agora <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
      </div>
    </section>
  );
}
