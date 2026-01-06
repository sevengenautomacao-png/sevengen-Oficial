import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Cpu, PlugZap, GanttChartSquare, ArrowRight } from 'lucide-react';

const heroImage = PlaceHolderImages.find(p => p.id === 'hero');
const serviceImages = {
  electrical: PlaceHolderImages.find(p => p.id === 'service-electrical'),
  electronic: PlaceHolderImages.find(p => p.id === 'service-electronic'),
  custom: PlaceHolderImages.find(p => p.id === 'service-custom'),
};
const aboutImage = PlaceHolderImages.find(p => p.id === 'about-team');

const services = [
  {
    icon: <PlugZap className="h-10 w-10 text-primary" />,
    title: 'Electrical Automation',
    description: 'Design and implementation of robust electrical automation systems for industrial processes.',
    image: serviceImages.electrical,
  },
  {
    icon: <Cpu className="h-10 w-10 text-primary" />,
    title: 'Electronic Automation',
    description: 'Development of custom electronic circuits and embedded systems for precise control.',
    image: serviceImages.electronic,
  },
  {
    icon: <GanttChartSquare className="h-10 w-10 text-primary" />,
    title: 'Custom Projects',
    description: 'Tailor-made automation solutions to meet your unique business challenges and requirements.',
    image: serviceImages.custom,
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
      <div className="relative h-full flex flex-col items-center justify-center text-center text-white px-4">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight drop-shadow-md font-headline">
          Engineering the Future of Automation
        </h1>
        <p className="mt-4 max-w-2xl text-lg md:text-xl text-primary-foreground/90 drop-shadow">
          Sevengen delivers cutting-edge electrical and electronic automation solutions tailored to your industry's needs.
        </p>
        <Button asChild size="lg" className="mt-8 bg-accent text-accent-foreground hover:bg-accent/90">
          <Link href="/quote">
            Get Your Free Quote <ArrowRight className="ml-2 h-5 w-5" />
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
          <h2 className="text-3xl md:text-4xl font-bold font-headline">Our Expertise</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            We provide a comprehensive range of services to enhance your operational efficiency and productivity.
          </p>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
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
              <CardHeader className="flex-row items-center gap-4">
                {service.icon}
                <CardTitle className="text-xl font-headline">{service.title}</CardTitle>
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
          <h2 className="text-3xl md:text-4xl font-bold font-headline">About Sevengen Automation</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Since our founding, Sevengen has been at the forefront of the automation industry. Our mission is to empower businesses with intelligent, reliable, and efficient automation systems that drive growth and innovation.
          </p>
          <p className="mt-4 text-muted-foreground">
            Our team of expert engineers brings decades of combined experience in both electrical and electronic disciplines, ensuring a holistic approach to every project we undertake. We are committed to quality, safety, and customer satisfaction.
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
        <h2 className="text-3xl md:text-4xl font-bold font-headline">Ready to Automate?</h2>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Let's discuss how Sevengen can help you achieve your automation goals. Contact us today for a personalized consultation and quote.
        </p>
        <Button asChild size="lg" className="mt-8">
          <Link href="/quote">
            Request a Quote Now <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
      </div>
    </section>
  );
}