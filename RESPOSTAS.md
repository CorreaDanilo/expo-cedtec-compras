RESPOSTAS DO ESTUDO DIRIGIDO: DE LOCALSTORAGE PARA FIRESTORE

PERGUNTAS PARE E PENSE

Pare e pense extra: se amanhã cada produto precisar de um campo quantidade, o que eu teria que fazer em um banco relacional? E no Firestore?
Em um banco relacional eu teria que mexer na estrutura da tabela, criando uma coluna nova chamada quantidade, e ainda decidir que valor os produtos que já existem iam ter. No Firestore é bem mais simples, porque não tem estrutura fixa. Eu só começo a salvar o campo quantidade nos produtos novos e pronto. Os antigos continuam sem o campo, então no código eu só preciso tratar isso com um valor padrão, tipo 1.

Pare e pense 1: se dois colegas abrirem o app ao mesmo tempo, em computadores diferentes, o que cada um vê na versão localStorage? E na versão Firestore?
Na versão com armazenamento local, cada um vê só a própria lista, porque os dados ficam salvos no aparelho de cada pessoa e não são compartilhados. No meu caso o app é em Expo, então eu usava o AsyncStorage, que funciona como o localStorage do celular. Já no Firestore os dois veem a mesma lista, porque os dados ficam no servidor do Google e todo mundo que abre o app lê de lá.

Pare e pense 2: por que as credenciais ficam no .env e não escritas direto no firebase.ts?
Porque o firebase.ts vai pro GitHub e o .env não, já que ele fica no .gitignore. Assim as chaves do meu projeto não ficam à mostra no repositório. Também ajuda a trocar de projeto ou de ambiente sem precisar mexer no código. No repositório fica só o .env.example, que mostra os nomes das variáveis sem os valores. Vale lembrar que a chave acaba indo dentro do app de qualquer jeito, então quem protege os dados de verdade são as regras de segurança do Firestore.

Pare e pense 3: o que acontece se eu esquecer o await antes de criarProduto(nome) e logo depois chamar listarProdutos()?
O criarProduto devolve uma Promise, então se eu esquecer o await o código não espera o produto ser gravado e já segue pra próxima linha. Aí o listarProdutos pode rodar antes do produto chegar no banco e devolver a lista sem o produto novo. Ou seja, a lista fica desatualizada.

Pare e pense 4: com o app aberto em duas telas lado a lado, se eu marcar um produto como comprado em uma delas, o que acontece na outra? Por quê?
A outra tela atualiza sozinha, quase na hora. Isso acontece porque o onSnapshot fica escutando a coleção. Quando um documento muda, o Firestore avisa todo mundo que está escutando, e a função que atualiza a tela roda de novo com a lista nova. No meu app, se eu marcar um produto como comprado no celular, ele já aparece como comprado no outro aparelho sem precisar recarregar nada.

QUESTÕES DE FIXAÇÃO

Questão 1: Qual a diferença entre uma coleção e um documento no Firestore? Dê um exemplo usando a Lista de Compras.
A coleção é o grupo que guarda os documentos, e o documento é cada registro dentro dela, com um id e os seus campos. Na Lista de Compras, produtos é a coleção, e cada produto é um documento. Por exemplo, um documento com nome Arroz e comprado false.

Questão 2: Para que serve o comando npm install firebase? Em qual arquivo eu confirmo que ele funcionou?
Ele baixa a biblioteca do Firebase e instala no projeto, pra eu conseguir usar os imports que vêm de firebase. Pra confirmar que funcionou eu olho o package.json, o firebase precisa aparecer lá dentro de dependencies.

Questão 3: Por que as variáveis do .env precisam começar com VITE_ neste projeto? O que muda se o app for feito em Expo (React Native)?
No Vite, só as variáveis que começam com VITE_ são enviadas pro código que roda no navegador. Isso serve pra evitar que alguma variável privada vaze sem querer. No Expo (React Native) o prefixo muda pra EXPO_PUBLIC_ e a variável é lida com process.env.EXPO_PUBLIC_NOME. Como o meu projeto é feito em Expo, foi esse prefixo que eu usei no .env.

Questão 4: Qual a diferença entre getDocs e onSnapshot? Em que situação cada um é mais útil?
O getDocs lê os dados uma vez só, como se fosse uma foto do momento. O onSnapshot fica escutando e chama a minha função toda vez que os dados mudam. O getDocs é mais útil quando eu só preciso dos dados uma vez, por exemplo pra carregar um relatório. O onSnapshot é mais útil em telas que precisam ficar sempre atualizadas, como a lista de compras, principalmente se mais de uma pessoa usa ao mesmo tempo.

Questão 5: Por que usamos serverTimestamp() no campo criadoEm em vez da hora do computador do usuário?
Porque a hora vem do servidor do Firebase e é a mesma pra todo mundo. O relógio do celular ou do computador pode estar errado, adiantado ou em outro fuso horário, e isso ia bagunçar a ordem da lista.

Questão 6: O banco foi criado em modo de teste. Por que esse modo não serve para um app publicado de verdade?
Porque o modo de teste libera leitura e escrita pra qualquer pessoa. Então qualquer um que tivesse a configuração do app poderia ler, mudar ou apagar todos os dados. Além disso, ele expira depois de uns 30 dias, e depois disso o app começa a dar erro de permissão. Num app publicado de verdade é preciso escrever regras de segurança, por exemplo deixando só usuários logados acessarem os dados.