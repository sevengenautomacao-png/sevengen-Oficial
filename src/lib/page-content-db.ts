
'use server';

import { adminDb } from '@/lib/firebase/firebase-admin';
import { pageContent as defaultContent, PageContent } from './page-content';
import { DocumentReference } from 'firebase-admin/firestore';

const contentDocRef = adminDb.collection('pageContent').doc('home');

async function initializeDefaultContent(docRef: DocumentReference) {
    await docRef.set(defaultContent);
    return defaultContent;
}

export async function getPageContent(): Promise<PageContent> {
  try {
    const docSnap = await contentDocRef.get();
    if (!docSnap.exists) {
      console.log('Conteúdo da página não encontrado, inicializando com padrão.');
      return await initializeDefaultContent(contentDocRef);
    }
    return docSnap.data() as PageContent;
  } catch (error) {
    console.error("Erro ao buscar conteúdo da página:", error);
    // Em caso de erro, retorna o conteúdo padrão para evitar que o site quebre.
    return defaultContent;
  }
}

export async function updatePageContent(newContent: Partial<PageContent>): Promise<void> {
  await contentDocRef.update(newContent);
}

export async function updateHeroContent(heroData: PageContent['hero']) {
    await contentDocRef.update({ hero: heroData });
}
