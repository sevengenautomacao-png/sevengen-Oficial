
import data from './page-content.json';

export type Service = {
    icon: string;
    title: string;
    description: string;
    imageId: string;
}

export type PageContent = {
    hero: {
        title: string;
        subtitle: string;
        ctaButton: string;
        imageId: string;
    };
    servicesSection: {
        title: string;
        subtitle: string;
    };
    services: Service[];
    aboutSection: {
        title: string;
        paragraphs: string[];
        imageId: string;
    };
    ctaSection: {
        title: string;
        subtitle: string;
        ctaButton: string;
    };
}

export const pageContent: PageContent = data;
