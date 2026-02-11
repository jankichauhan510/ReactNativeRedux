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
import { useTranslation } from 'react-i18next';

const CartPopup = () => {
  const [visible, setVisible] = useState(false);
  const cartItems = useAppSelector(state => state.cart);
  const dispatch = useAppDispatch();
  const { t, i18n } = useTranslation();
  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  const languages = [
    { code: 'en', label: 'EN' },
    { code: 'hi', label: 'हिं' },
    { code: 'gu', label: 'ગુ' },
  ];

  const totalAmount = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <>
      {/* 🛒 HEADER */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{t('header_title')}</Text>

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

        <View style={styles.langContainer}>
          {languages.map(lang => (
            <Pressable
              key={lang.code}
              onPress={() => changeLanguage(lang.code)}
              style={[
                styles.langButton,
                i18n.language === lang.code && styles.activeLangButton,
              ]}
            >
              <Text
                style={[
                  styles.langText,
                  i18n.language === lang.code && styles.activeLangText,
                ]}
              >
                {lang.label}
              </Text>
            </Pressable>
          ))}
        </View>
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
          <Text style={styles.popupTitle}>{t('cart_title')}</Text>
          <View style={styles.divider} />

          {cartItems.length === 0 ? (
            <Text style={styles.empty}>{t('cart_empty')}</Text>
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
                    <Text style={styles.remove}>{t('remove')}</Text>
                  </Pressable>
                </View>
              )}
            />
          )}

          {cartItems.length > 0 && (
            <View style={styles.totalRow}>
              <Text style={styles.totalText}>{t('total')}</Text>
              <Text style={styles.totalPrice}>₹{totalAmount}</Text>
            </View>
          )}

          <Pressable style={styles.closeBtn} onPress={() => setVisible(false)}>
            <Text style={styles.closeText}>{t('close')}</Text>
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
  langContainer: {
    flexDirection: 'row',
    backgroundColor: '#f1f5f9',
    borderRadius: 20,
    padding: 4,
  },

  langButton: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 16,
  },

  activeLangButton: {
    backgroundColor: '#2563eb',
  },

  langText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#475569',
  },

  activeLangText: {
    color: '#ffffff',
  },
});
