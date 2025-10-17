// @ts-nocheck
import React from 'react';
import { StyleSheet, Text, View, Pressable, SafeAreaView } from 'react-native';
import { Image } from 'react-native';
import { router } from 'expo-router';

export default function WelcomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.logo} source={require('../assets/images/welcomeLogo.png')}/>
      <Text style={styles.title}>Welcome!</Text>
      <Text style={styles.subtitle}>Ready to give your feedback?</Text>
      <Pressable
        style={styles.button}
        onPress={() => router.push('/feedback')}
      >
        <Text style={styles.buttonText}>Get Started</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backdropFilter: 'blur(5px)',
    backgroundColor: '#FFFBF5',
    borderRadius: 10,
  },
  logo: {
    backgroundColor: 'orangered',
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 10,
    
    // Shadow properties for iOS
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,

    // Elevation for Android
    elevation: 8,
  },
  title: { 
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10, },
    subtitle: {
    fontSize: 18, color: '#555',
    marginBottom: 40, 
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 8,
    pointerEvents: 'auto', 
  },
  buttonText: { color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});