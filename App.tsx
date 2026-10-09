import { useState, useEffect } from 'react';
import { View } from 'react-native';
import Header from './components/Header/Header';
import Form from './components/Form/Form';
import ListaItens from './components/ListaItens/ListaItens';
import { ProdutoItem } from './interfaces/ProdutoItem';
import {
  criarProduto,
  atualizarProduto,
  removerProduto,
  observarProdutos,
} from './src/produtos';

export default function App() {
  const [produtos, setProdutos] = useState<ProdutoItem[]>([]);
  const [abaAtiva, setAbaAtiva] = useState<'presentes' | 'comprados'>('presentes');

  useEffect(() => {
    const cancelarEscuta = observarProdutos(setProdutos);
    return cancelarEscuta;
  }, []);

  async function adicionarProduto(nome: string) {
    await criarProduto(nome);
  }

  async function alternarComprado(id: string) {
    const produto = produtos.find((p) => p.id === id);
    if (!produto) return;
    await atualizarProduto(id, produto.nome, !produto.comprado);
  }

  async function removerItem(id: string) {
    await removerProduto(id);
  }

  async function limparItens(comprados: boolean) {
    const paraRemover = produtos.filter((p) => p.comprado === comprados);
    for (const produto of paraRemover) {
      await removerProduto(produto.id);
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <Header />
      <Form onAdicionar={adicionarProduto} />
      <ListaItens
        produtos={produtos}
        abaAtiva={abaAtiva}
        onMudarAba={setAbaAtiva}
        onAlternarComprado={alternarComprado}
        onRemover={removerItem}
        onLimpar={limparItens}
      />
    </View>
  );
}