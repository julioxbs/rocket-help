import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { NavigationContainer } from "@react-navigation/native";
import { useState, useEffect } from "react";
import { Loading } from "../components/Loading";
import { Signin } from "../screens/Signin";
import { AppRoutes } from "./app.routes";

export const Routes = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User>();

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });

    return subscriber
  }, [])

  if (loading) {
    return <Loading />
  }

  return (
    <NavigationContainer>
      {user ? <AppRoutes/> : <Signin />}
    </NavigationContainer>
  );
};
