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

export const PRODUCTS = [
  {
    id: 1,
    name: 'Wireless Bluetooth Headphones',
    price: 2999,
    category: 'Electronics',
    image: 'file:///android_asset/images/headphones.jpg',
    description:
      'Noise-cancelling headphones with deep bass and 30-hour battery life',
  },
  {
    id: 2,
    name: 'Smart Fitness Watch',
    price: 4999,
    category: 'Wearables',
    image: 'file:///android_asset/images/smartwatch.jpg',
    description: 'Tracks heart rate, steps, sleep, and phone notifications',
  },
  {
    id: 3,
    name: 'Laptop Backpack',
    price: 1499,
    category: 'Accessories',
    image: 'file:///android_asset/images/backpack.jpg',
    description: 'Water-resistant backpack with padded laptop compartment',
  },
  {
    id: 4,
    name: 'Wireless Charging Pad',
    price: 999,
    category: 'Mobile Accessories',
    image: 'file:///android_asset/images/charger.jpg',
    description: 'Fast wireless charging pad for Android and iOS devices',
  },
  {
    id: 5,
    name: 'Smart LED Bulb',
    price: 799,
    category: 'Smart Home',
    image: 'file:///android_asset/images/bulb.jpg',
    description: 'App-controlled RGB bulb with voice assistant support',
  },
] as const;

export default function ProductScreen() {
  const dispatch = useAppDispatch();
  const cartItems = useSelector((state: any) => state.cart);

  const isInCart = (id: number) =>
    cartItems.some((item: CartItem) => item.id === id);

  // const addItem = (item: any) => {
  //   dispatch(
  //     addToCart({
  //       id: Date.now(),
  //       name: item.name,
  //       price: item.price,
  //     }),
  //   );

  //   ToastAndroid.show(`${item.name} added to cart`, ToastAndroid.SHORT);
  // };

  const renderItem = ({ item }: { item: (typeof PRODUCTS)[number] }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />

      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.category}>{item.category}</Text>
        <Text style={styles.description}>{item.description}</Text>

        <View style={styles.bottomRow}>
          <Text style={styles.price}>₹{item.price}</Text>

          <Pressable
            style={styles.addButton}
            onPress={() =>
              isInCart(item.id)
                ? dispatch(removeFromCart(item.id))
                : dispatch(addToCart(item))
            }
          >
            <Text style={styles.addButtonText}>
              {isInCart(item.id) ? 'Remove from Cart' : 'Add to Cart'}
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
