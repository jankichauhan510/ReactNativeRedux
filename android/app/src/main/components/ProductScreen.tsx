import React from 'react';
import { View, Button } from 'react-native';
import { addToCart } from '../../redux/action';
import { useAppDispatch } from '../../redux/hooks';

const ProductScreen = () => {
  const dispatch = useAppDispatch();

  const addItem = () => {
    dispatch(
      addToCart({
        id: Date.now(),
        name: 'iPhone 15',
        price: 80000,
      }),
    );
  };

  return (
    <View>
      <Button title="Add to Cart" onPress={addItem} />
    </View>
  );
};

export default ProductScreen;
