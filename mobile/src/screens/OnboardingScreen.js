import React, { useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet } from 'react-native';

export default function OnboardingScreen() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('male');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [goal, setGoal] = useState('maintain');
  const [activity, setActivity] = useState('1.2');
  const [result, setResult] = useState(null);

  function calculate() {
    const w = parseFloat(weight);
    const h = parseFloat(height);
    const a = parseInt(age, 10);
    if (!w || !h || !a) return;

    let bmr = 10 * w + 6.25 * h - 5 * a;
    bmr += gender === 'male' ? 5 : -161;
    const calories = bmr * parseFloat(activity);

    let target = calories;
    if (goal === 'lose') target -= 500;
    else if (goal === 'gain') target += 500;

    const protein = (target * 0.3) / 4;
    const fat = (target * 0.3) / 9;
    const carbs = (target * 0.4) / 4;

    setResult({ calories: Math.round(target), protein: Math.round(protein), fat: Math.round(fat), carbs: Math.round(carbs) });
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Анкета</Text>
      <TextInput placeholder="Имя" value={name} onChangeText={setName} style={styles.input} />
      <TextInput placeholder="Возраст" value={age} onChangeText={setAge} keyboardType="number-pad" style={styles.input} />
      <TextInput placeholder="Пол (male/female)" value={gender} onChangeText={setGender} style={styles.input} />
      <TextInput placeholder="Рост (см)" value={height} onChangeText={setHeight} keyboardType="number-pad" style={styles.input} />
      <TextInput placeholder="Вес (кг)" value={weight} onChangeText={setWeight} keyboardType="number-pad" style={styles.input} />
      <TextInput placeholder="Цель (lose/gain/maintain)" value={goal} onChangeText={setGoal} style={styles.input} />
      <TextInput placeholder="Активность (1.2-1.9)" value={activity} onChangeText={setActivity} keyboardType="decimal-pad" style={styles.input} />
      <Button title="Рассчитать" onPress={calculate} />
      {result && (
        <View style={styles.result}>
          <Text>Калории: {result.calories}</Text>
          <Text>Белки: {result.protein} г</Text>
          <Text>Жиры: {result.fat} г</Text>
          <Text>Углеводы: {result.carbs} г</Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
  },
  result: {
    marginTop: 20,
  },
});
