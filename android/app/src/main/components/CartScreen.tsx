import React from 'react';
import { View, Text } from 'react-native';
import { useAppSelector } from '../../redux/hooks';

const CartScreen = () => {
  const cartData = useAppSelector(state => state.cart);

  return (
    <View>
      <Text>Total items: {cartData.length}</Text>
    </View>
  );
};

export default CartScreen;
