import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Hello from './android/app/src/main/components/Hello';
import CartScreen from './android/app/src/main/components/CartScreen';
import ProductScreen from './android/app/src/main/components/ProductScreen';

export default function App() {
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      {/* <Hello /> */}
      <CartScreen />
      <ProductScreen />
    </View>
  );
}

const styles = StyleSheet.create({});
