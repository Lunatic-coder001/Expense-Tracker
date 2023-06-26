import { View, Text, StyleSheet } from 'react-native'

import { GlobalStyles } from '../../constants/styles';
import ExpensesList from './ExpensesList';
import ExpensesSummary from './ExpensesSummary';

export default function ExpensesOutput({ expenses, expensesPeriod, fallbackText }) {
  let content = <Text style={styles.infoText}>{fallbackText}</Text>;

  if (expenses.length > 0) {
    content = <ExpensesList expenses={expenses} />;
  }
  return (
    <View style={styles.container}>
      <ExpensesSummary expenses={expenses} periodName={expensesPeriod} />
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom:0,
    backgroundColor:GlobalStyles.colors.primary700
  },
  infoText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    marginTop:32,
  }
})

// you don't have
// this strange gap here at the bottom
// you have to make sure that in expenses output,
// where we add the padding in all directions,
// you don't add it in all directions