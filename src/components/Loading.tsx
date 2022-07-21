import { Center, Spinner } from "native-base";
import React from "react";

export const Loading = () => {
  return (
    <Center flex={1} bg="gray.700">
        <Spinner color="secondary.700" />
    </Center>
  );
};
