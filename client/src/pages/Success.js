import React, { useEffect, useRef } from 'react';
import Jumbotron from '../components/Jumbotron';
import { useQuery } from '@apollo/client';
import { useMutation } from '@apollo/client';
import { ADD_ORDER } from '../utils/mutations';
import { QUERY_ME ,} from '../utils/queries';

function Success() {
  const { loading, data } = useQuery(QUERY_ME);

  const [ addOrder ] = useMutation(ADD_ORDER, {
    refetchQueries: [{ query: QUERY_ME }],
  });
  const ordered = useRef(false);

  useEffect(() => {
    if(data?.me.cart && !ordered.current){
      ordered.current = true;
      
      async function saveOrder() {
        const productsList = data?.me.cart || [];
        const products = productsList.map(({ __typename , ...item }) => item);

        if (products.length) {
          const { data } = await addOrder({ variables: { products } });
        }

        setTimeout(() => {
          window.location.assign('/');
        }, 3000);
      }
      saveOrder();
    }   
  },[addOrder , data ]);

  return (
    <div>
      <Jumbotron>
      <h1>Success!</h1>
      <h2>Thank you for your purchase!</h2>
      <h2>You will now be redirected to the home page</h2>
      </Jumbotron>
    </div>
  );
}

export default Success;