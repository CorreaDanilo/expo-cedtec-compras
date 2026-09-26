import { Text, TouchableOpacity, View } from "react-native";
import { CircleCheckBig, CircleDashed, Trash2 } from "lucide-react-native";
import { ProdutoItem } from "../../interfaces/ProdutoItem";
import { styles } from "./styles";
import { colors } from "../colors";

interface Props {
  produto: ProdutoItem;
}

export default function ProdutoListaItem({ produto }: Props) {
  const comprado = produto.comprado;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.nameRow}
        onPress={() => {}}
        // TODO(aluno): alternar produto.comprado ao tocar aqui (ex.: recebendo uma função via props que atualiza o estado da lista em ListaItens/App).
      >
        {comprado ? (
          <CircleCheckBig color={colors.azul500} size={20} />
        ) : (
          <CircleDashed color={colors.textSecondary} size={20} />
        )}
        <Text style={[styles.nome, comprado && styles.nomeComprado]}>
          {produto.nome}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {}}
        // TODO(aluno): remover este produto da lista ao tocar aqui (ex.: recebendo uma função via props que atualiza o estado da lista em ListaItens/App).
      >
        <Trash2 color={colors.textSecondary} strokeWidth={1} />
      </TouchableOpacity>
    </View>
  );
}
