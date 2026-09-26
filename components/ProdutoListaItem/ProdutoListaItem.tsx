import { View, Text, TouchableOpacity } from 'react-native';
import { CircleCheckBig, CircleDashed } from 'lucide-react-native';
import { styles } from './styles';
import { ProdutoItem } from '../../interfaces/ProdutoItem';

interface ProdutoListaItemProps {
  produto: ProdutoItem;
  onAlternarComprado: (id: string) => void;
}

export default function ProdutoListaItem({ produto, onAlternarComprado }: ProdutoListaItemProps) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.nameRow} onPress={() => onAlternarComprado(produto.id)}>
        {produto.comprado ? (
          <CircleCheckBig color="#2f80ed" size={20} />
        ) : (
          <CircleDashed color="#999" size={20} />
        )}
        <Text style={produto.comprado ? styles.nomeComprado : styles.nome}>
          {produto.nome}
        </Text>
      </TouchableOpacity>
    </View>
  );
}