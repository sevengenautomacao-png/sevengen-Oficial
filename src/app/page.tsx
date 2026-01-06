
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Cpu, GanttChartSquare, Wrench, PlugZap, ShoppingCart, Truck, Lightbulb, TestTube, Factory } from 'lucide-react';
import { pageContent } from '@/lib/page-content';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const serviceIcons: { [key: string]: React.ReactNode } = {
  PlugZap: <PlugZap className="h-10 w-10 text-primary" />,
  GanttChartSquare: <GanttChartSquare className="h-10 w-10 text-primary" />,
  Wrench: <Wrench className="h-10 w-10 text-primary" />,
  ShoppingCart: <ShoppingCart className="h-10 w-10 text-primary" />,
  Truck: <Truck className="h-10 w-10 text-primary" />,
  Lightbulb: <Lightbulb className="h-10 w-10 text-primary" />,
  Factory: <Factory className="h-10 w-10 text-primary" />,
  TestTube: <TestTube className="h-10 w-10 text-primary" />,
};

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
    const { hero } = pageContent;
    const heroImage = PlaceHolderImages.find(p => p.id === hero.imageId);

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
          {hero.title}
        </h1>
        <p className="mt-4 max-w-2xl text-lg md:text-xl text-primary-foreground/90 drop-shadow">
          {hero.subtitle}
        </p>
        <Button asChild size="lg" className="mt-8 bg-accent text-accent-foreground hover:bg-accent/90">
          <Link href="/orcamento">
            {hero.ctaButton} <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
      </div>
    </section>
  );
}

function ServicesSection() {
    const { servicesSection, services } = pageContent;
  return (
    <section id="services" className="py-16 md:py-24 bg-secondary">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold font-headline">{servicesSection.title}</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            {servicesSection.subtitle}
          </p>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {services.map((service) => {
            const serviceImage = PlaceHolderImages.find(p => p.id === service.imageId);
            return (
                <Card key={service.title} className="flex flex-col overflow-hidden transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl">
                {serviceImage && (
                    <div className="aspect-[16/10] relative">
                    <Image
                        src={serviceImage.imageUrl}
                        alt={serviceImage.description}
                        data-ai-hint={serviceImage.imageHint}
                        width={600}
                        height={400}
                        className="object-cover w-full h-full"
                    />
                    </div>
                )}
                <CardHeader className="flex-row items-start gap-4">
                    {serviceIcons[service.icon]}
                    <CardTitle className="text-xl font-headline mt-2">{service.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                    <CardDescription>{service.description}</CardDescription>
                </CardContent>
                </Card>
            )
          })}
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
    const { aboutSection } = pageContent;
    const aboutImage = PlaceHolderImages.find(p => p.id === aboutSection.imageId);
  return (
    <section id="about" className="py-16 md:py-24 bg-background">
      <div className="container grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold font-headline">{aboutSection.title}</h2>
          {aboutSection.paragraphs.map((p, i) => (
            <p key={i} className={i === 0 ? "mt-4 text-lg text-muted-foreground" : "mt-4 text-muted-foreground"}>
              {p}
            </p>
          ))}
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
    const { ctaSection } = pageContent;
  return (
    <section id="contact" className="py-16 md:py-24 bg-secondary">
      <div className="container text-center">
        <h2 className="text-3xl md:text-4xl font-bold font-headline">{ctaSection.title}</h2>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          {ctaSection.subtitle}
        </p>
        <Button asChild size="lg" className="mt-8">
          <Link href="/orcamento">
            {ctaSection.ctaButton} <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
      </div>
    </section>
  );
}
