import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen 
        name="index" 
        options={{ 
          headerShown: false // Hides the header on your welcome screen
        }} 
      />
      <Stack.Screen 
        name="feedback" 
        options={{ 
          title: 'Submit Feedback', // Sets the title for the feedback page header
          headerStyle: { backgroundColor: '#A0522D' }, // Brown header
          headerTintColor: '#FFFFFF', // White back arrow and title
        }} 
      />
    </Stack>
  );
}