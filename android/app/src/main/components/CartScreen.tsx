import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useAppSelector } from '../../redux/hooks';

const CartScreen = () => {
  const cartCount = useAppSelector(state => state.cart.length);

  return (
    <View style={styles.header}>
      <View style={styles.cartContainer}>
        <Text style={styles.cartEmoji}>🛒</Text>

        {cartCount > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{cartCount}</Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  header: {
    height: 56,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  cartContainer: {
    position: 'relative',
  },
  cartEmoji: {
    fontSize: 26, // emoji size
  },
  badge: {
    position: 'absolute',
    top: -6,
    right: -10,
    backgroundColor: '#ef4444',
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    color: '#ffffff',
    fontSize: 11,
    fontWeight: 'bold',
  },
});
