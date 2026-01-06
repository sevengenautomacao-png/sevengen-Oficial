import { db } from "@/lib/firebase/firebase";
import { adminDb } from "@/lib/firebase/firebase-admin";
import {
  collection,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  Timestamp,
} from "firebase/firestore";
import type { Orcamento } from "./types";

export interface OrcamentoWithMetadata extends Orcamento {
  id: string;
  submittedAt: Date;
  status: "new" | "contacted" | "closed";
}

// Para o lado do cliente (leitura)
const orcamentosCollection = collection(db, "orcamentos");

// Para o lado do servidor (escrita)
const orcamentosAdminCollection = adminDb.collection("orcamentos");

// Helper para converter dados do Firestore (para leitura do cliente)
function fromFirestore(docSnap: any): OrcamentoWithMetadata {
  const data = docSnap.data();
  return {
    id: docSnap.id,
    name: data.name,
    email: data.email,
    company: data.company,
    phone: data.phone,
    projectDetails: data.projectDetails,
    submittedAt: (data.submittedAt as Timestamp).toDate(),
    status: data.status,
  };
}


export async function addOrcamento(
  orcamento: Orcamento
): Promise<{ id: string }> {
  const newDocRef = await orcamentosAdminCollection.add({
    ...orcamento,
    submittedAt: new Date(),
    status: "new",
  });

  return { id: newDocRef.id };
}


export async function getOrcamentos(): Promise<OrcamentoWithMetadata[]> {
  const q = query(orcamentosCollection, orderBy("submittedAt", "desc"));
  try {
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(fromFirestore);
  } catch (error) {
    console.error("Erro ao buscar orçamentos:", error);
    return [];
  }
}

export async function getOrcamentoById(
  id: string
): Promise<OrcamentoWithMetadata | undefined> {
  const docRef = doc(db, "orcamentos", id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return fromFirestore(docSnap);
  } else {
    return undefined;
  }
}

export async function updateOrcamentoStatus(
  id: string,
  status: "new" | "contacted" | "closed"
): Promise<void> {
  const docRef = adminDb.collection("orcamentos").doc(id);
  await docRef.update({ status });
}

export async function deleteOrcamento(id: string): Promise<void> {
  const docRef = adminDb.collection("orcamentos").doc(id);
  await docRef.delete();
}
