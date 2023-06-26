import { useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";

import Input from "./Input";
import Button from "../UI/Button";
import { getFormattedDate } from "../../utils/date";
import { GlobalStyles } from "../../constants/styles";

function ExpenseForm({ submitButtonLabel, onCancel, onSubmit, defaultValues }) {

  const [inputs, setInputs] = useState({
    amount: {
      value: defaultValues? defaultValues.amount.toString() :'',
      isValid: true, 
    },
    date :{
    value: defaultValues ? getFormattedDate(defaultValues.date) : '',
    isValid: true,
    },
  description: {
    description: defaultValues ? defaultValues.description : '',
    isValid: true,
    },
  });
 

  function inputChangedHandler(inputIdentifier, enteredValue) {
    setInputs((curInputs) => {
      return {
        ...curInputs,
        [inputIdentifier]: {value: enteredValue, isValid: true}
      };
    });
  }

  function submitHandler() {
    const expenseData = {
      amount: +inputs.amount.value,  //+ here converts this string to a number.
      date: new Date(inputs.date.value),
      description: inputs.description.value,
    };
    //we don't need the input values here in expense form but we need them in manage expense where we have this confirmHandler where we are then triggering different 
    //context methods.
    console.log("skfjdhkshdfkhkhs",expenseData.description)
    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateIsValid = expenseData.date.toString() !== 'Invalid Date';
    const descriptionIsValid = inputs.description.value ? inputs.description.value.trim().length > 0 : false;

    
    if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
     // Alert.alert('Invalid Input', 'Please check your input values');
      setInputs((curInputs) => {
        return {
          amount: { value: curInputs.amount.value, isValid: amountIsValid },
          date: { value: curInputs.date.value, isValid: dateIsValid },
          description: {
            value: curInputs.description.value,
            isValid: descriptionIsValid,
          },
        };
      });
      return;
    }
    onSubmit(expenseData);
  }

  const formIsInvalid = !inputs.amount.isValid || !inputs.date.isValid || !inputs.description.isValid;
  
  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputsRow}>
        <Input
        style={styles.rowInput}
        label="Amount"
        invalid={!inputs.amount.isValid}
        textInputConfig={{
          keyboardType: 'decimal-pad',
          onChangeText: inputChangedHandler.bind(this, 'amount'),
          value: inputs.amount.value,
        }}
      />
        <Input
        style={styles.rowInput}
        label="Date"
        invalid={!inputs.date.isValid}
        textInputConfig={{
          placeholder: 'YYYY-MM-DD',
          maxLength: 10,
          onChangeText: inputChangedHandler.bind(this, 'date'),
          value: inputs.date.value,
        }}
      />
      </View>
      <Input
        label="Description"
        invalid={!inputs.description.isValid}
        textInputConfig={{
          multiline: true,
          // autoCapitalize:"None" sentences are default
          // autoCorrect:false // default is true
          onChangeText: inputChangedHandler.bind(this, 'description'),
          value: inputs.description.value,
        }}
      />
      { formIsInvalid && ( <Text style={styles.errorText}>Invalid input values- please check your enterd data!</Text>)}
      <View style={styles.buttons}>
        <Button style={styles.button} mode="flat" onPress={onCancel}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={submitHandler}>
         {submitButtonLabel}
        </Button>
      </View>
    </View>
  );
}

export default ExpenseForm;

const styles = StyleSheet.create({
  form: {
    marginTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginVertical: 24,
    textAlign: 'center',
  },
  inputsRow: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  rowInput: {
    flex: 1,
  },
  errorText: {
    textAlign: 'center',
    color: GlobalStyles.colors.error500,
    margin: 8
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
});

/*automatically.
React Native gives us the entered text or the entered amount if we connect this function to onChangeText,then React Native will make sure that this parameter value
is provided automatically, and this will be the amount or the value in general, entered into the text input to which this function is connected.So then we can update the
amountValue in our state with the enteredAmount.And we can also set up two-way bindingso that we could change this from somewhere else in our component as well
and reflect the changed value in the input by also adding the value property here to the textInputConfig.



And then my idea is that in here, I can call setinputs and update this state such that we keep all the inputs that haven't changed, but we overwrite the one value for 
the one input that has been changed.And we should be able to identify this input by this inputIdentifier. And now the expectation is,that inputIdentifier is amount, date,
description, one of these three values.So we can dynamically set this property and target a specific property by using square brackets here.And passing inputIdentifier
between the square brackets,and then setting the enteredValue as a value for this dynamically access property.But now, since this is a generic function,we must make sure
that this inputIdentifier is passed into this function when it's executed.You learned that the enteredValue is passed in automatically by React Native,but this identifier
isn't because that's my own idea that I wanna get this identifier. we can preconfigure a function for future execution with help of the bind method.We can execute this 
on a function and then bind takes a couple of arguments.The first argument defines what this keyword in the two,be executed function will refer to,but we're not working 
with this here.Therefore, it doesn't matter and I'll just set it to this,but again, this does not matter.The second argument you pass to bind will be the first argument
received by this function, though.And that should be my inputIdentifier.So therefore here, I want us pass amount to target the amount property in my state for this in 
input.Now we don't need to set this value here because that will still be provided by React Native.And by default, that will be added as a second parameter.So that is the
setup we need to preconfigure the first parameter value for this function.The second value will then still be passed in automatically by React Native.So we will still get 
that enteredValue.


But for this form, we want a string because for all the text inputs,we have strings as you learned.


validation 
And actually we can shorten this instead of having this ternary expression we can just use this approach, which will convert a truthy or falsy value into a real boolean,
into true or false.So if we have no default values, this will yield false.If we have default values, this will yield true.inputchangeHandlerI will also always set the 
validity to true then because when I'm entering something, I actually do assume that it's valid and we will change it back to false later if we detect that it was invalid
after submission.!!defaultValues not bcoz it you click on + you get by default error text so we did it true 
*/
