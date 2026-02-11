import {
  Alert,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import React, { useState } from 'react';
import Hello from './android/app/src/main/components/Hello';
import CartScreen from './android/app/src/main/components/CartScreen';
import ProductScreen from './android/app/src/main/components/ProductScreen';
import { useTranslation } from 'react-i18next';
import './assets/i18n/i18n';

export default function App() {
  const { t, i18n } = useTranslation();

  const [currentLanguage, setLanguage] = useState<string>('en');

  const changeLanguage = (value: string): void => {
    i18n
      .changeLanguage(value)
      .then(() => setLanguage(value))
      .catch((err: unknown) => console.log(err));
  };

  const buttonStyle = (lang: string): StyleProp<ViewStyle> => ({
    backgroundColor: currentLanguage === lang ? '#33A850' : '#d3d3d3',
    padding: 20,
  });

  return (
    // <View
    //   style={{
    //     flex: 1,
    //   }}
    // >
    //   {/* <Hello /> */}
    //   <CartScreen />
    //   <ProductScreen />
    // </View>

    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'space-evenly',
      }}
    >
      <Text style={{ fontWeight: 'bold', fontSize: 25, color: '#33A850' }}>
        {t('hello')}
      </Text>

      <Text style={{ fontWeight: 'bold', fontSize: 25, color: '#33A850' }}>
        {t('janki')}
      </Text>

      <Text style={{ fontWeight: 'bold', fontSize: 25, color: '#33A850' }}>
        {t('this line is translated')}
      </Text>

      <Pressable onPress={() => changeLanguage('en')} style={buttonStyle('en')}>
        <Text>Select English</Text>
      </Pressable>

      <Pressable onPress={() => changeLanguage('hi')} style={buttonStyle('hi')}>
        <Text>हिंदी का चयन करें</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({});
