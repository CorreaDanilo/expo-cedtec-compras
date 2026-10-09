import {
  addDoc, collection, deleteDoc, doc, getDocs,
  onSnapshot, orderBy, query, serverTimestamp, updateDoc,
} from "firebase/firestore";
import { db } from "./firebase";
import { ProdutoItem } from "../interfaces/ProdutoItem";

const produtosRef = collection(db, "produtos");
const produtosOrdenados = query(produtosRef, orderBy("criadoEm", "asc"));

export async function criarProduto(nome: string) {
  const ref = await addDoc(produtosRef, {
    nome: nome,
    comprado: false,
    criadoEm: serverTimestamp(),
  });
  return ref.id;
}

export async function listarProdutos() {
  const snapshot = await getDocs(produtosOrdenados);
  return snapshot.docs.map((d) => ({
    id: d.id,
    nome: d.data().nome,
    comprado: d.data().comprado,
  })) as ProdutoItem[];
}

export async function atualizarProduto(id: string, nome: string, comprado: boolean) {
  await updateDoc(doc(db, "produtos", id), {
    nome: nome,
    comprado: comprado,
  });
}

export async function removerProduto(id: string) {
  await deleteDoc(doc(db, "produtos", id));
}

export function observarProdutos(callback: (produtos: ProdutoItem[]) => void) {
  return onSnapshot(produtosOrdenados, (snapshot) => {
    const lista = snapshot.docs.map((d) => ({
      id: d.id,
      nome: d.data().nome,
      comprado: d.data().comprado,
    })) as ProdutoItem[];
    callback(lista);
  });
}