// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View, SafeAreaView } from 'react-native';

// export default function App() {
  
//   return (
//     <SafeAreaView style={styles.container}>
//       <Text>Hola!!</Text>
//       <StatusBar style="auto" />
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'dodgerblue',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

import React from 'react';
import {StatusBar, Text, View} from 'react-native';
import Navigation from './src/components/Navigation';
import {AuthProvider} from './src/context/AuthContext';

const App = () => {
  return (
    <AuthProvider>
      <StatusBar backgroundColor="#06bcee" />
      <Navigation />
    </AuthProvider>
  );
};

export default App;
