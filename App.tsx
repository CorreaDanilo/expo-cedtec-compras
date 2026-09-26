import { useState } from 'react';
import { View } from 'react-native';
import Header from './components/Header/Header';
import Form from './components/Form/Form';
import ListaItens from './components/ListaItens/ListaItens';
import { ProdutoItem } from './interfaces/ProdutoItem';

export default function App() {
  const [produtos, setProdutos] = useState<ProdutoItem[]>([]);
  const [abaAtiva, setAbaAtiva] = useState<'presentes' | 'comprados'>('presentes');

  function adicionarProduto(nome: string) {
    const novoProduto: ProdutoItem = {
      id: Date.now().toString(),
      nome: nome,
      comprado: false,
    };
    setProdutos([...produtos, novoProduto]);
  }

  function alternarComprado(id: string) {
    const novaLista = produtos.map((produto) => {
      if (produto.id === id) {
        return { ...produto, comprado: !produto.comprado };
      }
      return produto;
    });
    setProdutos(novaLista);
  }

  function removerProduto(id: string) {
    const novaLista = produtos.filter((produto) => produto.id !== id);
    setProdutos(novaLista);
  }

  function limparItens(comprados: boolean) {
    const novaLista = produtos.filter((produto) => produto.comprado !== comprados);
    setProdutos(novaLista);
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
        onRemover={removerProduto}
        onLimpar={limparItens}
      />
    </View>
  );
}