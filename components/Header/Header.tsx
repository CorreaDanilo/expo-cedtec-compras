import { Text, View } from "react-native";
import { ShoppingCart } from "lucide-react-native";
import { styles } from "./styles";
import { colors } from "../colors";

export default function Header() {
  return (
    <View style={styles.container}>
      <ShoppingCart
        size={colors.titulo}
        color={colors.azul500}
        strokeWidth={3}
      />
      <Text style={styles.title}>comprar</Text>
    </View>
  );
}
