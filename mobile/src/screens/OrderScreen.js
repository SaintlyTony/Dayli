import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Button, TextInput, Platform } from 'react-native';

export default function OrderScreen() {
  const [menu, setMenu] = useState([]);
  const [selected, setSelected] = useState([]);
  const [address, setAddress] = useState('');
  const [orders, setOrders] = useState([]);

  const baseUrl = Platform.OS === 'android' ? 'http://10.0.2.2:3000' : 'http://localhost:3000';

  useEffect(() => {
    fetch(baseUrl + '/menu')
      .then((res) => res.json())
      .then((data) => setMenu(data.menu))
      .catch(console.error);
    loadOrders();
  }, []);

  function toggleItem(item) {
    setSelected((prev) => {
      if (prev.find((i) => i.id === item.id)) {
        return prev.filter((i) => i.id !== item.id);
      }
      return [...prev, item];
    });
  }

  function submitOrder() {
    fetch(baseUrl + '/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer admin-token'
      },
      body: JSON.stringify({ items: selected, address })
    })
      .then(() => {
        setSelected([]);
        setAddress('');
        loadOrders();
      })
      .catch(console.error);
  }

  function loadOrders() {
    fetch(baseUrl + '/orders', {
      headers: { Authorization: 'Bearer admin-token' }
    })
      .then((res) => res.json())
      .then((data) => setOrders(data.orders || []))
      .catch(console.error);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Меню</Text>
      <FlatList
        data={menu}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Button
            title={selected.find((i) => i.id === item.id) ? `Убрать ${item.name}` : `Добавить ${item.name}`}
            onPress={() => toggleItem(item)}
          />
        )}
      />
      <TextInput
        style={styles.input}
        placeholder="Адрес доставки"
        value={address}
        onChangeText={setAddress}
      />
      <Button title="Заказать" onPress={submitOrder} disabled={!selected.length || !address} />
      <Text style={styles.title}>История заказов</Text>
      <FlatList
        data={orders}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Text>{`Заказ ${item.id} на ${item.address}`}</Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  title: {
    fontSize: 18,
    marginTop: 10
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 10
  }
});
