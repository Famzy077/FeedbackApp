import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="welcome" options={{ headerShown: false }} />
      <Stack.Screen name="feedback" options={{ title: 'Give Feedback' }} />

      <Stack.Screen name="+not-found" options={{ headerShown: false }} />
    </Stack>
  );
}