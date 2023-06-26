import { useContext, useLayoutEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import ExpenseForm from '../components/ManageExpense/ExpenseForm';
import IconButton from '../components/UI/IconButton';
import ErrorOverlay from '../components/UI/ErrorOverlay';
import LoadingOverlay from '../components/UI/LoadingOverlay';
import { GlobalStyles } from '../constants/styles';
import { ExpensesContext } from '../store/expenses-context';
import { storeExpense, updateExpense, deleteExpense } from '../utils/http';

export default function ManageExpense({ route, navigation }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState();
  const expensesCtx = useContext(ExpensesContext);
  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId;

  const selectedExpense = expensesCtx.expenses.find(
    (expense) => expense.id === editedExpenseId
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit Expense' : 'Add Expense',
    });
  }, [navigation, isEditing]);

  async function deleteExpenseHandler() {
    setIsSubmitting(true);
    try {
      await deleteExpense(editedExpenseId); //order doesn't matter
      // setIsSubmitting(false) not needed bcoz we are closing this screen
      expensesCtx.deleteExpense(editedExpenseId);
      navigation.goBack();
    } catch (error) {
      setError('Could not delete expense - please try again later!');
      setIsSubmitting(false);  
    }
  }

  function cancelHandler() {
    navigation.goBack();
  }

  async function confirmHandler(expenseData) {
    setIsSubmitting(true);
    try {
      if (isEditing) {
        expensesCtx.updateExpense(editedExpenseId, expenseData);
        await updateExpense(editedExpenseId, expenseData);
      } else {
        const id = await storeExpense(expenseData);
        expensesCtx.addExpense({ ...expenseData, id: id });
      }
      navigation.goBack();
    } catch (error) {
      setError('Could not save data - please try again later!');
      setIsSubmitting(false);
    }
  }

  if (error && !isSubmitting) {
    return <ErrorOverlay message={error} />;
  }

  if (isSubmitting) {
    return <LoadingOverlay />;
  }

  return (
    <View style={styles.container}>
      <ExpenseForm
        submitButtonLabel={isEditing ? 'Update' : 'Add'}
        onSubmit={confirmHandler}
        onCancel={cancelHandler}
        defaultValues={selectedExpense}
      />   
      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: 'center',
  },
});

/* As you learned in the earlier sections though,
 you shouldn't call setOptions like this,
 directly in the component function,
 instead you should wrap it with useEffect
 or to avoid that it's flickering initially,
 with useLayoutEffect, which is a hook imported from React.
*/

// import { useContext, useLayoutEffect } from 'react';
// import { StyleSheet, View } from 'react-native';

// import Button from '../components/UI/Button';
// import IconButton from '../components/UI/IconButton';
// import { GlobalStyles } from '../constants/styles';
// import { ExpensesContext } from '../store/expenses-context';
// import ExpenseForm from '../components/ManageExpense/ExpenseForm';

// function ManageExpense({ route, navigation }) {
//   const expensesCtx = useContext(ExpensesContext);

//   const editedExpenseId = route.params?.expenseId;
//   const isEditing = !!editedExpenseId;

//   useLayoutEffect(() => {
//     navigation.setOptions({
//       title: isEditing ? 'Edit Expense' : 'Add Expense',
//     });
//   }, [navigation, isEditing]);

//   function deleteExpenseHandler() {
//     expensesCtx.deleteExpense(editedExpenseId);
//     navigation.goBack();
//   }

//   function cancelHandler() {
//     navigation.goBack();
//   }

//   function confirmHandler() {
//     if (isEditing) {
//       expensesCtx.updateExpense(
//         editedExpenseId,
//         {
//           description: 'Test!!!!',
//           amount: 29.99,
//           date: new Date('2022-05-20'),
//         }
//       );
//     } else {
//       expensesCtx.addExpense({
//         description: 'Test',
//         amount: 19.99,
//         date: new Date('2022-05-19'),
//       });
//     }
//     navigation.goBack();
//   }

//   return (
//     <View style={styles.container}>
//       <ExpenseForm/>
//       <View style={styles.buttons}>
//         <Button style={styles.button} mode='flat' onPress={cancelHandler}>
//           Cancel
//         </Button>
//         <Button style={styles.button} onPress={confirmHandler}>
//           {isEditing ? 'Update' : 'Add'}
//         </Button>
//       </View>
//       {isEditing && (
//         <View style={styles.deleteContainer}>
//           <IconButton
//             icon='trash'
//             color={GlobalStyles.colors.error500}
//             size={36}
//             onPress={deleteExpenseHandler}
//           />
//         </View>
//       )}
//     </View>
//   );
// }

// export default ManageExpense;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 24,
//     backgroundColor: GlobalStyles.colors.primary800,
//   },
//   buttons: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   button: {
//     minWidth: 120,
//     marginHorizontal: 8,
//   },
//   deleteContainer: {
//     marginTop: 16,
//     paddingTop: 8,
//     borderTopWidth: 2,
//     borderTopColor: GlobalStyles.colors.primary200,
//     alignItems: 'center',
//   },
// });