import { Box, Heading, Icon, useTheme, VStack } from "native-base";
import auth from "@react-native-firebase/auth"
import React, { useState } from "react";
import Logo from "../assets/logo_primary.svg";
import { Input } from "../components/Input";
import { Envelope, Key } from "phosphor-react-native";
import { Button } from "../components/Button";
import { Alert } from "react-native";

export const Signin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { colors } = useTheme();
  const [inputsContent, setInputsContent] = useState({
    email: "",
    password: "",
  });

  const handleSignIn = () => {
    const { email, password } = inputsContent;

    if (!email || !password) {
      return Alert.alert("Enter", "Please fill all fields");
    }

    setIsLoading(true);

    auth()
    .createUserWithEmailAndPassword(email, password)
    .then((response) => {
      console.log(response);
      setIsLoading(false);
    })
    .catch((error) => {
      console.log(error);
      setIsLoading(false);

      if (error.code === 'auth/invalid-email') {
        return Alert.alert("Invalid email", "Please enter a valid email");
      } else if (error.code === 'auth/wrong-password') {
        return Alert.alert("Enter", "E-mail or password is incorrect");
      } else if (error.code === 'auth/user-not-found') {
        return Alert.alert('Enter', 'E-mail or password is incorrect');
      } else {
        return Alert.alert("Error", "Something went wrong");
      }
    })
  }

  return (
    <VStack 
      flex={1} 
      alignItems="center" 
      bg="gray.600" 
      px={8} pt={20}
    >
      <Logo />

      <Heading 
        color="gray.100" 
        fontSize="xl" 
        mt={20} 
        mb={5}
      >
        Acess your account
      </Heading>

      <Input
        placeholder={"Email"}
        mb={6}
        InputLeftElement={<Icon as={<Envelope color={colors.gray[300]} />} ml={4} />}
        onChangeText={(text) => setInputsContent({ ...inputsContent, email: text })}
      />

      <Input 
        placeholder={"Password"} 
        InputLeftElement={<Icon as={<Key color={colors.gray[300]} />} ml={4} />}
        secureTextEntry={true}
        onChangeText={(text) => setInputsContent({ ...inputsContent, password: text })}
      />

      <Box mt={8} w='full'>
        <Button 
          bg={'green.700'}
          color={'white'}
          title={'Login'}
          _pressed={{ bg: 'green.500' }}
          mb={3}
          onPress={handleSignIn}
          isLoading={isLoading}
        />

        <Button 
          title={'Sign Up'}
        />
      </Box>
    </VStack>
  );
};
