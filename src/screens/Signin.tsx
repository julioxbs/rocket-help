import { Box, Heading, Icon, useTheme, VStack } from "native-base";
import React, { useState } from "react";
import Logo from "../assets/logo_primary.svg";
import { Input } from "../components/Input";
import { Envelope, Key } from "phosphor-react-native";
import { Button } from "../components/Button";

export const Signin = () => {
  const { colors } = useTheme();
  const [inputsContent, setInputsContent] = useState({
    email: "",
    password: "",
  });

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
        />

        <Button 
          title={'Sign Up'}
        />
      </Box>
    </VStack>
  );
};
