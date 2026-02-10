import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Modal,
  FlatList,
} from 'react-native';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { removeFromCart } from '../../redux/action';

const CartPopup = () => {
  const [visible, setVisible] = useState(false);
  const cartItems = useAppSelector(state => state.cart);
  const dispatch = useAppDispatch();
  const totalAmount = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <>
      {/* 🛒 HEADER */}
      <View style={styles.header}>
        <Pressable
          style={styles.cartContainer}
          onPress={() => setVisible(true)}
        >
          <Text style={styles.cartEmoji}>🛒</Text>

          {cartItems.length > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{cartItems.length}</Text>
            </View>
          )}
        </Pressable>
      </View>

      {/* 🧾 CART POPUP */}
      <Modal
        visible={visible}
        transparent
        animationType="fade"
        onRequestClose={() => setVisible(false)}
      >
        {/* background */}
        <Pressable style={styles.overlay} onPress={() => setVisible(false)} />

        <View style={styles.popup}>
          <Text style={styles.title}>Your Cart</Text>

          {cartItems.length === 0 ? (
            <Text style={styles.empty}>🛒 Cart is empty</Text>
          ) : (
            <FlatList
              data={cartItems}
              keyExtractor={item => item.id.toString()}
              renderItem={({ item }) => (
                <View style={styles.itemRow}>
                  <View>
                    <Text style={styles.name}>{item.name}</Text>
                    <Text style={styles.price}>₹{item.price}</Text>
                  </View>

                  <Pressable onPress={() => dispatch(removeFromCart(item.id))}>
                    <Text style={styles.remove}>Remove</Text>
                  </Pressable>
                </View>
              )}
            />
          )}

          {/* TOTAL */}
          {cartItems.length > 0 && (
            <View style={styles.totalRow}>
              <Text style={styles.totalText}>Total</Text>
              <Text style={styles.totalPrice}>₹{totalAmount}</Text>
            </View>
          )}

          <Pressable style={styles.closeBtn} onPress={() => setVisible(false)}>
            <Text style={styles.closeText}>Close</Text>
          </Pressable>
        </View>
      </Modal>
    </>
  );
};

export default CartPopup;

const styles = StyleSheet.create({
  header: {
    height: 56,
    backgroundColor: '#fff',
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
    fontSize: 26,
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
  },
  badgeText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: 'bold',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  totalText: {
    fontSize: 15,
    fontWeight: '600',
  },
  totalPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: '#16a34a',
  },

  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  popup: {
    position: 'absolute',
    top: 70,
    right: 16,
    width: 280,
    maxHeight: 350,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    elevation: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 8,
  },
  empty: {
    textAlign: 'center',
    marginVertical: 20,
    color: '#9ca3af',
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
  },
  name: {
    fontSize: 14,
    fontWeight: '600',
  },
  price: {
    fontSize: 13,
    color: '#6b7280',
  },
  remove: {
    color: '#ef4444',
    fontSize: 13,
    fontWeight: '600',
  },
  closeBtn: {
    marginTop: 10,
    alignSelf: 'flex-end',
  },
  closeText: {
    color: '#2563eb',
    fontWeight: '600',
  },
});
