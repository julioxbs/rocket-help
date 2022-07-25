import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { VStack } from "native-base";
import { useState } from "react";
import { Alert } from "react-native";
import { Button } from "../components/Button";
import { Header } from "../components/Header";
import { Input } from "../components/Input";

export function Register() {
  const [isLoading, setIsLoading] = useState(false);
  const [patrimony, setPatrimony] = useState("");
  const [description, setDescription] = useState("");

  const navigation = useNavigation();

  const handleNewOrderRegister = () => {
    if (!patrimony || !description) {
      return Alert.alert('Register', 'All fields are required');
    }

    setIsLoading(true);

    firestore().collection('orders')
    .add({
      patrimony,
      description,
      status: "open",
      created_at: firestore.FieldValue.serverTimestamp(),
    })
    .then(() => {
      Alert.alert('Solicitation', 'Solicitation created successfully');
      navigation.goBack();
    }).catch((err) => {
      console.log(err);
      setIsLoading(false);
      Alert.alert('Solicitation', 'Error creating solicitation');
    })
  }

  return (
    <VStack flex={1} p={6} bg="gray.600">
      <Header title="New Solicitation" />

      <Input onChangeText={setPatrimony} placeholder="Number of patrimony" mt={4} />

      <Input
        placeholder="Description of the solicitation"
        flex={1}
        mt={5}
        multiline={true}
        textAlignVertical="top"
        onChangeText={setDescription}
      />

      <Button isLoading={isLoading} onPress={handleNewOrderRegister} title="Register" mt={5} />
    </VStack>
  );
}
