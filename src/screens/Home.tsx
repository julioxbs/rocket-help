import { useNavigation } from "@react-navigation/native";
import {
  Center,
  FlatList,
  Heading,
  HStack,
  IconButton,
  Text,
  useTheme,
  VStack,
} from "native-base";
import { ChatTeardropText, SignOut } from "phosphor-react-native";
import { useState } from "react";
import Logo from "../assets/logo_secondary.svg";
import { Button } from "../components/Button";
import { Filter } from "../components/Filter";
import { Order, OrderProps } from "../components/Order";

export function Home() {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const [statusSelected, setStatusSelected] = useState<"open" | "closed">(
    "open"
  );

  const [orders, setOrders] = useState<OrderProps[]>([
    {
      id: "1",
      patrimony: "123456789",
      status: "open",
      when: "2020-01-01",
    }
  ]);

  const handleNewOrder = () => {
    navigation.navigate('new')
  }

  const handleOpenDetails = (orderId: string) => {
    navigation.navigate('details', { orderId })
  }

  return (
    <VStack flex={1} pb={6} bg="gray.700">
      <HStack
        w="full"
        justifyContent="space-between"
        bg="gray.600"
        pt={12}
        pb={5}
        px={6}
      >
        <Logo />

        <IconButton icon={<SignOut color={colors.gray[300]} size={26} />} />
      </HStack>

      <VStack flex={3} px={6}>
        <HStack
          w="full"
          mt={8}
          mb={4}
          justifyContent="space-between"
          alignItems="center"
        >
          <Heading color="gray.100">My calls</Heading>

          <Text color="gray.200">3</Text>
        </HStack>

        <HStack space={3} mb={8}>
          <Filter
            type="open"
            title="On going"
            onPress={() => setStatusSelected("open")}
            isActive={statusSelected === "open"}
          />

          <Filter
            type="close"
            title="Finalized"
            onPress={() => setStatusSelected("closed")}
            isActive={statusSelected === "closed"}
          />
        </HStack>

        <FlatList
          data={orders}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <Order onPress={() => handleOpenDetails(item.id)} data={item} />}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
          ListEmptyComponent={() => (
            <Center>
              <ChatTeardropText color={colors.gray[300]} size={40} />
              <Text color="gray.300" fontSize="xl" mt={6} textAlign="center">
                No calls {statusSelected === "open" ? "on going" : "finalized"}
              </Text>
            </Center>
          )}
        />

        <Button title="New Solicitation" onPress={handleNewOrder} />
      </VStack>
    </VStack>
  );
}
