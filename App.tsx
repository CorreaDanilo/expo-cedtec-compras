import { useState } from 'react';
import { View } from 'react-native';
import Header from './components/Header/Header';
import Form from './components/Form/Form';
import ListaItens from './components/ListaItens/ListaItens';
import { ProdutoItem } from './interfaces/ProdutoItem';

export default function App() {
  const [produtos, setProdutos] = useState<ProdutoItem[]>([]);

  function adicionarProduto(nome: string) {
    const novoProduto: ProdutoItem = {
      id: Date.now().toString(),
      nome: nome,
      comprado: false,
    };
    setProdutos([...produtos, novoProduto]);
  }

  return (
    <View style={{ flex: 1 }}>
      <Header />
      <Form onAdicionar={adicionarProduto} />
      <ListaItens produtos={produtos} />
    </View>
  );
}