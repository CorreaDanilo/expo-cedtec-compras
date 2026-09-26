import { View, FlatList, TouchableOpacity } from 'react-native';
import { CircleCheckBig, CircleDashed } from 'lucide-react-native';
import { styles } from './styles';
import ProdutoListaItem from '../ProdutoListaItem/ProdutoListaItem';
import { ProdutoItem } from '../../interfaces/ProdutoItem';

interface ListaItensProps {
  produtos: ProdutoItem[];
  abaAtiva: 'presentes' | 'comprados';
  onMudarAba: (aba: 'presentes' | 'comprados') => void;
  onAlternarComprado: (id: string) => void;
}

export default function ListaItens({
  produtos,
  abaAtiva,
  onMudarAba,
  onAlternarComprado,
}: ListaItensProps) {
  const listaFiltrada = produtos.filter((produto) => {
    if (abaAtiva === 'presentes') {
      return produto.comprado === false;
    } else {
      return produto.comprado === true;
    }
  });

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <View style={styles.buttonTopBar}>
          <TouchableOpacity onPress={() => onMudarAba('presentes')}>
            <CircleDashed color={abaAtiva === 'presentes' ? '#2f80ed' : '#999'} size={18} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onMudarAba('comprados')}>
            <CircleCheckBig color={abaAtiva === 'comprados' ? '#2f80ed' : '#999'} size={18} />
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={listaFiltrada}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ProdutoListaItem produto={item} onAlternarComprado={onAlternarComprado} />
        )}
      />
    </View>
  );
}