
import { db } from "@/lib/firebase/firebase";
import { adminDb } from "@/lib/firebase/firebase-admin";
import {
  collection,
  getDocs as clientGetDocs,
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

// Para o lado do servidor (escrita e leitura de admin)
const orcamentosAdminCollection = adminDb.collection("orcamentos");

// Helper para converter dados do Firestore
function fromFirestore(
  docSnap:
    | FirebaseFirestore.DocumentSnapshot<FirebaseFirestore.DocumentData>
    | ReturnType<typeof doc>
): OrcamentoWithMetadata {
  const data = docSnap.data();
  if (!data) {
    throw new Error("Document data is undefined!");
  }
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
  try {
    const snapshot = await orcamentosAdminCollection.orderBy("submittedAt", "desc").get();
    if (snapshot.empty) {
      return [];
    }
    return snapshot.docs.map(fromFirestore);
  } catch (error) {
    console.error("Erro ao buscar orçamentos:", error);
    return [];
  }
}

export async function getOrcamentoById(
  id: string
): Promise<OrcamentoWithMetadata | undefined> {
  // Esta função ainda pode usar a SDK do cliente se for chamada do lado do cliente.
  // Se for usada no servidor, deveria ser refatorada para usar adminDb também.
  const docRef = doc(db, "orcamentos", id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    // A função fromFirestore precisa lidar com tipos de cliente e admin,
    // mas para esta função específica, o tipo do cliente está correto.
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
