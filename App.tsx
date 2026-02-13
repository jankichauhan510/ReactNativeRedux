import { View } from 'react-native';
import React from 'react';
import CartScreen from './android/app/src/main/components/CartScreen';
import ProductScreen from './android/app/src/main/components/ProductScreen';
import './assets/i18n/i18n';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <View
          style={{
            flex: 1,
          }}
        >
          <CartScreen />
          <ProductScreen />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
