import { View, Text, TextInput, StyleSheet } from "react-native";
import { GlobalStyles } from "../../constants/styles";

 function Input({ label,invalid , style, textInputConfig }) {
  
  const inputStyles = [styles.input]; //it can be const because it is a reference value so we can push
  if (textInputConfig && textInputConfig.multiline) {
    inputStyles.push(styles.inputMultiline)
   }

   if (invalid) {
     inputStyles.push(styles.inValidInput);
   }
   
  return (
    <View style={[styles.inputContainer, style]}>
      <Text style={[styles.label , invalid && styles.inValidLabel]}>{label}</Text>
      <TextInput style={inputStyles} {...textInputConfig} />
    </View>
  );
}

export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 4,
    marginVertical: 8
    // flex:1, not a good idea as it gets broken for multiline input
  },
  label: {
    fontSize: 12,
    color: GlobalStyles.colors.primary100,
    marginBottom: 4,  
  },
  input: {
    backgroundColor: GlobalStyles.colors.primary100,
    color: GlobalStyles.colors.primary700,
    padding:6,
    borderRadius: 6,
    fontSize:18,
  },
  inputMultiline: {
    minHeight:100,
    textAlignVertical:"top"//for same behavior in both platforms
  },
  inValidLabel: {
    color: GlobalStyles.colors.error500
  },
  inValidInput: {
    backgroundColor:GlobalStyles.colors.error50
  }
})

/*Therefore, a better approach here is to not do it like this,but to instead take one generic prop,like textInputConfig,and simply spread that onto our TextInput.We then
expect that textInputConfig will be an object,and the property names used in that object should match the prop names supported by TextInput and the values for those 
properties then are simply values accepted by the props we can set on TextInput.multiline styling I'm doing it like this now with a variable,so that we can then also 
dive into textInputConfig,and check if it's truthy.And if it does exist,check if it has a multiline property,which also is truthy.So, which is set to true for example,
and if that's the case,if we received a configuration object and that object has a multiline property that contains a truthy value,then I wanna actually go to my 
inputStyles and push an average style onto inputStyles.And that would now be inputMultiline. So that then our array of styles can have multiple styles
*/