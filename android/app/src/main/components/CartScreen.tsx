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
        <Text style={styles.headerTitle}>Redux Cart Demo</Text>

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
        <Pressable style={styles.overlay} onPress={() => setVisible(false)} />

        <View style={styles.popup}>
          <Text style={styles.popupTitle}>Your Cart</Text>
          <View style={styles.divider} />

          {cartItems.length === 0 ? (
            <Text style={styles.empty}>Your cart is empty 🛒</Text>
          ) : (
            <FlatList
              data={cartItems}
              keyExtractor={item => item.id.toString()}
              showsVerticalScrollIndicator={false}
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
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
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
    fontWeight: '700',
  },

  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
  },
  popup: {
    position: 'absolute',
    top: 70,
    right: 16,
    width: 300,
    maxHeight: 360,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 14,
    elevation: 12,
  },
  popupTitle: {
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
    color: '#111827',
  },
  divider: {
    height: 1,
    backgroundColor: '#e5e7eb',
    marginVertical: 10,
  },
  empty: {
    textAlign: 'center',
    marginVertical: 30,
    color: '#9ca3af',
    fontSize: 14,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
  },
  name: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
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

  closeBtn: {
    marginTop: 12,
    alignSelf: 'flex-end',
  },
  closeText: {
    color: '#2563eb',
    fontWeight: '600',
  },
});
