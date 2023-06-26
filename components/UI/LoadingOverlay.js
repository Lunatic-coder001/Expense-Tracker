import { View, Text, ActivityIndicator, StyleSheet } from 'react-native'
import { GlobalStyles } from '../../constants/styles';

 function LoadingOverlay() {
  return (
    <View style={styles.conatainer}>
      <ActivityIndicator size="large" color="white" />
    </View>
  )
}

export default LoadingOverlay;

const styles = StyleSheet.create({
    conatainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary700,

    },
})