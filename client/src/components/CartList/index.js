import React, { useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useLazyQuery } from '@apollo/client';
import { useMutation } from '@apollo/client';
import { REMOVE_PRODUCT , ADD_ORDER } from '../../utils/mutations';
import { QUERY_ME , QUERY_CHECKOUT } from '../../utils/queries';

const stripePromise = loadStripe('pk_test_51JolECLX6WERfsl88oWTF5ulTncYRMjzu4Nzj72Af5OStgrXVJkvEhFvuTLV6H8wzhvL9pYB8jAKiTfjpxBN3Rjo00RRzYhB7B');

const CartList = ({me}) => {
  const [checkout, { data }] = useLazyQuery(QUERY_CHECKOUT);

  const [removeCart, { error }] = useMutation(REMOVE_PRODUCT, {
    refetchQueries: [{ query: QUERY_ME }],
  });

  const [addOrder, { error2 }] = useMutation(ADD_ORDER, {
    refetchQueries: [{ query: QUERY_ME }],
  });

  useEffect(() => {
    if (data) {
      stripePromise.then((res) => {
        res.redirectToCheckout({ sessionId: data.checkout.session });
      });
    }
  }, [data]);

  const handleRemoveCart = async ( productId ) => {
    try {
      const { data2 } = await removeCart({
          variables: { productId },
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddOrder = async ( productsList ) => {
    try {
      const products = productsList.map(({ __typename , ...item }) => item);

      checkout({
          variables: { products },
      });

      // const { data2 } = await addOrder({
      //     variables: { products },
      // });
    } catch (err) {
      console.error(err);
    }
  };

  if (!me.length) {
    return <h3>No Products have been added</h3>;
  }
 
  return (
    <div>
      {me.map((products , i) => (
          <div key={me[i]._id} className="mb-3 col-12">
            <div className="bg-light p-2">
            <img
               alt="productimage"
              src={me[i].imageUrl}
              />
              <p>{me[i].productName}</p>
              <p>{me[i].price}</p>
              <p>{me[i].stock}</p>
            </div>
            <button onClick={() => handleRemoveCart(me[i]._id)}>Remove</button>
          </div>
        ))}
        <button onClick={() => handleAddOrder(me)}>Checkout</button>
    </div>
  );
};

export default CartList;