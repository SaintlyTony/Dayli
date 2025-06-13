import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'nutrigo-progress';

export default function ProgressScreen() {
  const [weight, setWeight] = useState('');
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then((data) => {
      if (data) setEntries(JSON.parse(data));
    });
  }, []);

  useEffect(() => {
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  }, [entries]);

  function addEntry() {
    const w = parseFloat(weight);
    if (!w) return;
    const entry = { date: new Date().toLocaleDateString(), weight: w };
    setEntries([entry, ...entries]);
    setWeight('');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Прогресс</Text>
      <TextInput
        style={styles.input}
        placeholder="Вес (кг)"
        value={weight}
        onChangeText={setWeight}
        keyboardType="decimal-pad"
      />
      <Button title="Добавить" onPress={addEntry} />
      <FlatList
        data={entries}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Text>{`${item.date}: ${item.weight} кг`}</Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
  },
});
