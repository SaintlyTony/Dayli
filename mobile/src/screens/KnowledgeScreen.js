import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function KnowledgeScreen() {
  return (
    <View style={styles.container}>
      <Text>База знаний (скоро)</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
