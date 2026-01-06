import { adminDb } from "@/lib/firebase/firebase-admin";
import type { Colaborador } from "./types";
import { Timestamp } from "firebase-admin/firestore";

export interface ColaboradorWithId extends Colaborador {
  id: string;
}

const colaboradoresCollection = adminDb.collection("colaboradores");

function fromFirestore(
  docSnap: FirebaseFirestore.DocumentSnapshot<FirebaseFirestore.DocumentData>
): ColaboradorWithId {
  const data = docSnap.data();
  if (!data) {
    throw new Error("Document data is undefined!");
  }
  return {
    id: docSnap.id,
    name: data.name,
    age: data.age,
    email: data.email,
    role: data.role,
    password: data.password,
  };
}

export async function addColaborador(colaborador: Colaborador): Promise<{ id: string }> {
  const newDocRef = await colaboradoresCollection.add({
    ...colaborador,
    createdAt: Timestamp.now(),
  });
  return { id: newDocRef.id };
}

export async function getColaboradores(): Promise<ColaboradorWithId[]> {
  try {
    const snapshot = await colaboradoresCollection.orderBy("name").get();
    if (snapshot.empty) {
      return [];
    }
    return snapshot.docs.map(fromFirestore);
  } catch (error) {
    console.error("Erro ao buscar colaboradores:", error);
    return [];
  }
}

export async function updateColaborador(id: string, colaborador: Omit<Colaborador, 'password'>): Promise<void> {
  const docRef = colaboradoresCollection.doc(id);
  await docRef.update(colaborador);
}

export async function deleteColaborador(id: string): Promise<void> {
  const docRef = colaboradoresCollection.doc(id);
  await docRef.delete();
}
