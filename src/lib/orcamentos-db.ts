import { db } from "@/lib/firebase/firebase";
import {
  collection,
  addDoc,
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

const orcamentosCollection = collection(db, "orcamentos");

// Helper para converter dados do Firestore
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
): Promise<OrcamentoWithMetadata> {
  const newDocRef = await addDoc(orcamentosCollection, {
    ...orcamento,
    submittedAt: new Date(),
    status: "new",
  });

  const newDoc = await getDoc(newDocRef);
  return fromFirestore(newDoc);
}

export async function getOrcamentos(): Promise<OrcamentoWithMetadata[]> {
  const q = query(orcamentosCollection, orderBy("submittedAt", "desc"));
  try {
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(fromFirestore);
  } catch (error) {
    console.error("Erro ao buscar orçamentos:", error);
    // Retorna um array vazio em caso de erro para não quebrar a página de admin.
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
): Promise<OrcamentoWithMetadata | undefined> {
  const docRef = doc(db, "orcamentos", id);
  await updateDoc(docRef, { status });
  return getOrcamentoById(id);
}

export async function deleteOrcamento(id: string): Promise<void> {
  const docRef = doc(db, "orcamentos", id);
  await deleteDoc(docRef);
}
