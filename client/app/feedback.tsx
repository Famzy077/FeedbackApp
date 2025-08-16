import React, { useState } from 'react';
import { Alert, StatusBar, Platform, TouchableOpacity, View } from 'react-native';
import styled from 'styled-components/native';
import { Rating } from 'react-native-ratings';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons'; 
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';

// Styled Components
const SafeContainer = styled.SafeAreaView`
  flex: 1;
  align-items: center; /* Center horizontally */
`;

const PageContainer = styled.View`
  flex: 1;
  width: 100%;
  margin: 10px 0;
  max-width: 600px; /* Maximum width for larger screens */
  padding: 20px;
  border-radius: 8px;
  overflow: hidden;
`;

const ScrollContainer = styled.ScrollView.attrs({
  contentContainerStyle: {
    paddingBottom: 20,
  },
  showsVerticalScrollIndicator: false,
})``;

const Title = styled.Text`
  font-size: 25px;
  font-weight: bold;
  color: #A0522D; /* Brown */
  margin-bottom: 2px;
  margin-top: 50px;
  text-align: center; /* Center the title */
`;

const Input = styled.TextInput.attrs({
  underlineColorAndroid: 'transparent',
  placeholderTextColor: '#aaa',
})`
  background-color: #ffffff;
  padding: 10px;
  border-radius: 10px;
  color: #3a3a3ce5;
  font-size: 13px;
  min-height: 120px;
  text-align-vertical: top; /* For Android */
  margin-bottom: 20px;
  border: 1px solid gold;
  overflow: hidden;
`;

const PickerContainer = styled.View`
  background-color: #ffffff;
  border-radius: 10px;
  margin-bottom: 5p x;
  border-width: 1px;
  border-color: gold;
  overflow: hidden; /* Important for border-radius to work on Android */
`;

const SubmitButton = styled.TouchableOpacity`
  background-color: #A0522D; /* Brown */
  padding: 10px;
  border-radius: 8px;
  align-items: center;
`;

const ButtonText = styled.Text`
  color: #ffffff;
  font-size: 14px;
  font-weight: 600;
`;

const SubTitle = styled.Text<{ centered?: boolean }>`
  font-size: 15px;
  font-weight: 600;
  color: #3a3a3ccb;
  margin-bottom: 25px;
  ${(props) => props.centered && `
    text-align: center;
  `}
`;
const SectionTitle = styled.Text<{ centered?: boolean }>`
  font-size: 12.5px;
  font-weight: 600;
  margin-top: 25px;
  margin-bottom: 4px;
  color: #3a3a3ccb;
  ${(props) => props.centered && `
    text-align: center;
  `}
`;

// --- REACT COMPONENT ---
const FeedbackForm = () => {
  const [rating, setRating] = useState(3);
  const [category, setCategory] = useState('Suggestion');
  const [comment, setComment] = useState('');
  const router = useRouter();

  const handleSubmit = async () => {
    try {
      // Remember to replace this with your actual IP address
      const response = await fetch('http://YOUR_COMPUTER_IP:3001/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rating, category, comment })
      });

      if (!response.ok) throw new Error('Submission failed');

      Alert.alert('Thank You!', 'Your feedback has been submitted successfully.', [
        { text: 'OK', onPress: () => router.back() } // Go back to welcome screen
      ]);
    } catch (error) {
      Alert.alert('Error', 'Could not submit feedback. Please try again.');
      console.error(error);
    }
  };

    // NEW: A custom component for our star rating
    type CustomRatingProps = {
    rating: number;
    onRate: (rating: number) => void;
    };

    const CustomRating: React.FC<CustomRatingProps> = ({ rating, onRate }) => {
        return (
            <View style={{ flexDirection: 'row', justifyContent: 'center', paddingVertical: 10 }}>
            {[1, 2, 3, 4, 5].map((index) => (
                <TouchableOpacity key={index} onPress={() => onRate(index)}>
                <Ionicons
                    name={index <= rating ? 'star' : 'star-outline'}
                    size={40}
                    color={index <= rating ? '#FFD700' : '#A0522D'} // Gold for filled, Brown for outline
                    style={{
                    // This adds the "think" (thick) border effect on the selected star
                    textShadowColor: index === rating ? 'rgba(160, 82, 45, 0.7)' : 'transparent',
                    textShadowOffset: { width: 0, height: 0 },
                    textShadowRadius: index === rating ? 3 : 0,
                    }}
                />
                </TouchableOpacity>
            ))}
            </View>
        );
    };


  return (
    <LinearGradient
      colors={['#fff8dc', '#fdf5e6', '#f5deb3']}
      style={{ flex: 1 }}
    >
      <SafeContainer>
        <PageContainer>
          <ScrollContainer>
            <Title>Give Us Your Feedback</Title>

            <SubTitle centered>How was your experience?</SubTitle>

            <CustomRating rating={rating} onRate={setRating} />

            <SectionTitle>What is this about?</SectionTitle>
            <PickerContainer>
              <Picker
                selectedValue={category}
                onValueChange={(itemValue) => setCategory(itemValue)}
                style={{ fontSize: 13, color: '#3a3a3ccb' }}
              >
                <Picker.Item label="Suggestion" value="Suggestion" />
                <Picker.Item label="Complaint" value="Complaint" />
                <Picker.Item label="Praise" value="Praise" />
                <Picker.Item label="Other" value="Other" />
              </Picker>
            </PickerContainer>

            <SectionTitle>Any comments? (Optional)</SectionTitle>
            <Input
              placeholder="Tell us more..."
              multiline
              value={comment}
              onChangeText={setComment}
            />
            
            <SubmitButton onPress={handleSubmit}>
              <ButtonText>Submit Feedback</ButtonText>
            </SubmitButton>
          </ScrollContainer>
        </PageContainer>
      </SafeContainer>
    </LinearGradient>
  );
};

export default FeedbackForm;