import React, { useEffect } from 'react';
import { StatusBar, Image } from 'react-native';
import styled from 'styled-components/native';
import { Link, useRouter } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';

// --- Styled Components (Gold & Brown Theme, friendly look) ---
const Container = styled.View`
  flex: 1;
  background-color: #c96e44ff; /* Warm brown */
  justify-content: center;
  align-items: center;
  padding: 30px;
`;

const Logo = styled.Image`
  width: 100px;
  border: 1px solid gold;
  height: 100px;
  margin-bottom: 20px;
  border-radius: 100px;
`;

const Title = styled.Text`
  font-size: 22px;
  font-weight: bold;
  color: #ffd700; /* Gold */
  text-align: center;
  margin-bottom: 3px;
`;

const Subtitle = styled.Text`
  font-size: 13px;
  color: #fff8dc; /* Light gold text */
  text-align: center;
  margin-bottom: 25px;
`;

const GoogleButton = styled.TouchableOpacity`
  background-color: #ffffff;
  flex-direction: row;
  align-items: center;
  padding: 7px 10px;
  border-radius: 7px;
  width: 100%;
  justify-content: center;
  margin-bottom: 15px;
  shadow-color: #000;
  shadow-opacity: 0.15;
  shadow-radius: 4px;
  elevation: 2;
`;

const GoogleButtonText = styled.Text`
  color: #3a3a3ccb;
  font-size: 12.5px;
  font-weight: 600;
  margin-left: 10px;
`;

const GuestButtonText = styled.Text`
  color: #ffd700; /* Gold */
  font-size: 12px;
  font-weight: 500;
  text-decoration: underline;
`;

WebBrowser.maybeCompleteAuthSession();

const WelcomeScreen = () => {
  const router = useRouter();
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: "YOUR_ANDROID_CLIENT_ID.apps.googleusercontent.com",
    iosClientId: "YOUR_IOS_CLIENT_ID.apps.googleusercontent.com",
    webClientId: "YOUR_WEB_BACKEND_CLIENT_ID.apps.googleusercontent.com",
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      sendTokenToBackend(id_token);
    }
  }, [response]);

  const sendTokenToBackend = async (googleIdToken: any) => {
    try {
      const backendResponse = await fetch('http://YOUR_COMPUTER_IP:3001/api/auth/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: googleIdToken }),
      });

      if (!backendResponse.ok) throw new Error("Backend sign-in failed");

      const ourAppAuth = await backendResponse.json();
      console.log('SUCCESS! Our app token:', ourAppAuth.token);
      router.push('/feedback');
    } catch (error) {
      console.error("Error sending token to backend:", error);
    }
  };

  return (
    <Container>
      <StatusBar barStyle="light-content" />
      <Logo source={require('../assets/images/gold.png')} />
      <Title>Welcome to FeedbackApp</Title>
      <Subtitle>Your opinion matters – help us make things better!</Subtitle>

      <GoogleButton disabled={!request} onPress={() => promptAsync()}>
        <Image source={require('../assets/images/google.png')} style={{ width: 24, height: 24 }} />
        <GoogleButtonText>Sign in with Google</GoogleButtonText>
      </GoogleButton>

      <Link href="/feedback" asChild>
        <GuestButtonText>Continue as Guest</GuestButtonText>
      </Link>
    </Container>
  );
};

export default WelcomeScreen;
