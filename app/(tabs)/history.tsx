import React from 'react';
import { View, StyleSheet, FlatList, Text, Pressable, Alert, Platform } from 'react-native';
import { useCalculations } from '@/contexts/CalculationsContext';
import { useTheme } from '@/contexts/ThemeContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import HistoryItem from '@/components/History/HistoryItem';
import EmptyState from '@/components/EmptyState';
import { Trash2 } from 'lucide-react-native';
import { useRouter } from 'expo-router';

export default function HistoryScreen() {
  const { calculations, clearHistory } = useCalculations();
  const { colors } = useTheme();
  const router = useRouter();

  const handleHistoryItemPress = (expression: string, result: string) => {
    // Navigate to calculator with the selected calculation
    router.navigate('/calculator');
    // In a real app, we would pass these values to the calculator
    console.log('Selected:', expression, result);
  };

  const confirmClearHistory = () => {
    if (Platform.OS === 'web') {
      if (window.confirm('Are you sure you want to clear all calculation history?')) {
        clearHistory();
      }
    } else {
      Alert.alert(
        'Clear History',
        'Are you sure you want to clear all calculation history?',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Clear',
            onPress: clearHistory,
            style: 'destructive',
          },
        ],
        { cancelable: true }
      );
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {calculations.length > 0 ? (
        <>
          <View style={styles.header}>
            <Text style={[styles.title, { color: colors.text }]}>Calculation History</Text>
            <Pressable
              onPress={confirmClearHistory}
              style={({ pressed }) => [
                styles.clearButton,
                { opacity: pressed ? 0.7 : 1 }
              ]}
            >
              <Trash2 size={20} color={colors.text} />
            </Pressable>
          </View>

          <FlatList
            data={calculations}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <HistoryItem
                expression={item.expression}
                result={item.result}
                timestamp={item.timestamp}
                onPress={() => handleHistoryItemPress(item.expression, item.result)}
              />
            )}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          />
        </>
      ) : (
        <EmptyState
          title="No Calculations Yet"
          description="Your calculation history will appear here as you perform calculations."
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingVertical: 8,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
  },
  listContent: {
    paddingBottom: 24,
  },
  clearButton: {
    padding: 8,
  },
});