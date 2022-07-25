import { useRoute } from '@react-navigation/native';
import { Text, VStack } from 'native-base';
import { useEffect, useState } from 'react';
import { Header } from "../components/Header";
import { OrderProps } from '../components/Order';
import firestore from '@react-native-firebase/firestore';
import { OrderFirestoreDTO } from '../DTOs/OrderDTO';
import { dateFormat } from '../utils/firestoreDateFormat';
import { Loading } from '../components/Loading';

type RouteParams = {
  orderId: string;
}

type OrderDetails = OrderProps & {
  description: string;
  solution: string;
  closed: string;
}

export function Details() {
  const [isLoading, setIsLoading] = useState(true);
  const [solution, setSolution] = useState('');
  const [order, setOrder] = useState<OrderDetails>({} as OrderDetails);

  const route = useRoute();
  const { orderId } = route.params as RouteParams;

  useEffect(() => {
    firestore()
    .collection<OrderFirestoreDTO>('orders')
    .doc(orderId)
    .get()
    .then(doc => {
      const { patrimony, description, status, created_at, closed_at, solution} = doc.data();

      const closed = closed_at ? dateFormat(closed_at) : '';

      setOrder({
        id: doc.id,
        patrimony,
        description,
        status,
        solution,
        when: dateFormat(created_at),
        closed,
      });

      setIsLoading(false);
    })
  });

  if (isLoading) {
    return <Loading />
  }

  return (
    <VStack flex={1} bg='gray.700'>
        <Header title='Solicitation' />
        <Text color='white'>{orderId}</Text>
    </VStack>
  );
}