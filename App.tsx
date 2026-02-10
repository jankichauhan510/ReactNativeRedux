import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Hello from './android/app/src/main/components/Hello';

export default function App() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Hello />
    </View>
  );
}

const styles = StyleSheet.create({});
