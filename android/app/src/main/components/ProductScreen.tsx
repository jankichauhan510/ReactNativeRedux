import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  Pressable,
  Alert,
  ToastAndroid,
} from 'react-native';
import { useAppDispatch } from '../../redux/hooks';
import { addToCart, CartItem, removeFromCart } from '../../redux/action';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

export const PRODUCTS = [
  {
    id: 1,
    nameKey: 'product_1_name',
    price: 2999,
    categoryKey: 'product_1_category',
    image: require('../../assets/images/headphones.jpg'),
    descKey: 'product_1_desc',
  },
  {
    id: 2,
    nameKey: 'product_2_name',
    price: 4999,
    categoryKey: 'product_2_category',
    image: require('../../assets/images/smartwatch.jpg'),
    descKey: 'product_2_desc',
  },
  {
    id: 3,
    nameKey: 'product_3_name',
    price: 1499,
    categoryKey: 'product_3_category',
    image: require('../../assets/images/backpack.jpg'),
    descKey: 'product_3_desc',
  },
  {
    id: 4,
    nameKey: 'product_4_name',
    price: 999,
    categoryKey: 'product_4_category',
    image: require('../../assets/images/charger.jpg'),
    descKey: 'product_4_desc',
  },
  {
    id: 5,
    nameKey: 'product_5_name',
    price: 799,
    categoryKey: 'product_5_category',
    image: require('../../assets/images/bulb.jpg'),
    descKey: 'product_5_desc',
  },
] as const;

export default function ProductScreen() {
  const dispatch = useAppDispatch();
  const cartItems = useSelector((state: any) => state.cart);
  const { t } = useTranslation();

  const isInCart = (id: number) =>
    cartItems.some((item: CartItem) => item.id === id);

  const renderItem = ({ item }: { item: (typeof PRODUCTS)[number] }) => (
    <View style={styles.card}>
      <Image source={item.image} style={styles.image} />

      <View style={styles.info}>
        <Text style={styles.name}>{t(item.nameKey)}</Text>
        <Text style={styles.category}>{t(item.categoryKey)}</Text>
        <Text style={styles.description}>{t(item.descKey)}</Text>

        <View style={styles.bottomRow}>
          <Text style={styles.price}>₹{item.price}</Text>

          <Pressable
            style={styles.addButton}
            onPress={() =>
              isInCart(item.id)
                ? dispatch(removeFromCart(item.id))
                : dispatch(
                    addToCart({
                      id: item.id,
                      name: t(item.nameKey),
                      price: item.price,
                    }),
                  )
            }
          >
            <Text style={styles.addButtonText}>
              {isInCart(item.id) ? t('remove_from_cart') : t('add_to_cart')}
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={PRODUCTS}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff', // WHITE background
  },
  list: {
    padding: 16,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#f8fafc', // light card background
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
    backgroundColor: '#e5e7eb',
  },
  info: {
    flex: 1,
  },
  name: {
    color: '#111827', // dark text
    fontSize: 16,
    fontWeight: '600',
  },
  category: {
    color: '#6b7280',
    fontSize: 12,
    marginVertical: 2,
  },
  description: {
    color: '#374151',
    fontSize: 13,
    marginVertical: 4,
  },
  price: {
    color: '#16a34a',
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 6,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  addButton: {
    backgroundColor: '#2563eb',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  addButtonText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
});
