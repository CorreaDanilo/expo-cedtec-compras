import { CircleCheckBig, CircleDashed } from "lucide-react-native";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import { useState } from "react";
import { ProdutoItem } from "../../interfaces/ProdutoItem";
import ProdutoListaItem from "../ProdutoListaItem/ProdutoListaItem";
import { colors } from "../colors";

export const DATA: ProdutoItem[] = [
  {
    id: "1",
    nome: "Arroz (5kg)",
    comprado: true,
  },
  {
    id: "2",
    nome: "Feijão Preto (1kg)",
    comprado: false,
  },
  {
    id: "3",
    nome: "Macarrão Espaguete",
    comprado: true,
  },
  {
    id: "4",
    nome: "Óleo de Soja",
    comprado: false,
  },
  {
    id: "5",
    nome: "Açúcar Refinado",
    comprado: false,
  },
];

export default function ListaItens() {
  const [active, setActive] = useState("presentes");

  // TODO(aluno): usar este estado para guardar a lista real de produtos (iniciando a partir de DATA ou de dados persistidos em AsyncStorage) e passar funções de adicionar/remover/alternar-comprado para Form e ProdutoListaItem.
  const [produtos, setProdutos] = useState<ProdutoItem[]>([]);

  function alterarActiveParaPresentes() {
    setActive("presentes");
  }

  function alterarActiveParaComprados() {
    setActive("comprados");
  }

  return (
    <View style={styles.container}>
      {/* Filtro */}
      <View style={styles.topBar}>
        <TouchableOpacity
          style={styles.buttonTopBar}
          onPress={alterarActiveParaPresentes}
        >
          <CircleDashed
            color={active === "presentes" ? colors.azul500 : colors.textSecondary}
          />
          <Text
            style={{
              color: active === "presentes" ? colors.azul500 : colors.textSecondary,
            }}
          >
            Presentes
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonTopBar}
          onPress={alterarActiveParaComprados}
        >
          <CircleCheckBig
            color={active === "comprados" ? colors.azul500 : colors.textSecondary}
          />
          <Text
            style={{
              color: active === "comprados" ? colors.azul500 : colors.textSecondary,
            }}
          >
            Comprados
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{ marginLeft: "auto" }}
          onPress={() => {}}
          // TODO(aluno): implementar a ação de "Limpar" (ex.: remover os itens marcados como comprados, atualizando o estado da lista).
        >
          <Text style={{ color: colors.textSecondary }}>Limpar</Text>
        </TouchableOpacity>
      </View>

      {/* Lista de itens */}
      {/* TODO(aluno): filtrar DATA/produtos de acordo com "active" (produto.comprado === false para "presentes", === true para "comprados") antes de passar para a FlatList. */}
      <FlatList<ProdutoItem>
        data={DATA}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={(linha) => <ProdutoListaItem produto={linha.item} />}
      />
    </View>
  );
}
