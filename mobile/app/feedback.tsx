import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, SafeAreaView, Alert } from 'react-native';

export default function FeedbackScreen() {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');

  const submitFeedback = async () => {
    if (rating === 0) {
      Alert.alert('Hold On!', 'Please select a star rating before submitting.');
      return;
    }
    const apiUrl = 'http://192.168.0.106:3000'
    try {
      const response = await fetch(`${apiUrl}/api/v1/feedback`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // UPDATED: Send both rating and feedback text
        body: JSON.stringify({ rating, feedback }),
      });

      if (response.ok) {
        Alert.alert('Feedback Submitted!', 'Thanks for your feedback.');
        // UPDATED: Reset both rating and feedback text
        setFeedback('');
        setRating(0);
      } else {
        Alert.alert('Error', 'Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Could not connect to the server.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>Please help us to serve you better</Text>
      <Text style={styles.title}>How was your experience?</Text>

      {/* NEW: Clickable Star Rating Component */}
      <View style={styles.starsContainer}>
        {[...Array(5)].map((_, index) => {
          const starValue = index + 1;
          return (
            <TouchableOpacity
              key={starValue}
              onPress={() => setRating(starValue)}
            >
              <Text style={[styles.star, { color: starValue <= rating ? '#FFD700' : '#ccc' }]}>
                ★
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <TextInput
        style={styles.input}
        placeholder="Tell us more (optional)"
        placeholderTextColor="#888"
        multiline={true}
        value={feedback}
        onChangeText={setFeedback}
      />
      <TouchableOpacity style={styles.button} onPress={submitFeedback}>
        <Text style={styles.buttonText}>Submit Feedback</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFFBF5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  // NEW: Style for the container holding the stars
  starsContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  // UPDATED: Renamed 'stars' to 'star' for a single star
  star: {
    fontSize: 40,
    marginHorizontal: 5, // Adds a little space between stars
  },
  input: {
    width: '100%',
    height: 120,
    borderColor: '#ccc',
    borderWidth: 1,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingTop: 15,
    marginBottom: 25,
    fontSize: 16,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: 'rgba(0, 122, 255, 1)',
    paddingVertical: 15,
    paddingHorizontal: 45,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontSize: 19,
    fontWeight: 'bold',
  }
});