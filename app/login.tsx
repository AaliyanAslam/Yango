import { View, Text, TextInput, StyleSheet, Pressable, Alert, Image } from 'react-native';
import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { router } from 'expo-router';
import Loader from '@/components/loader';
import { AntDesign } from '@expo/vector-icons';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Missing info', 'Please enter both email and password');
      return;
    }

    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      Alert.alert('Success', 'Logged in!');
      router.replace('/Index');
    } catch (err: any) {
      Alert.alert('Login Failed', err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Heading */}
      <Text style={styles.heading}>ENTER YOUR EMAIL</Text>
      <Text style={styles.subText}>We will log you in using this email and password</Text>

      {/* Email Input Style similar to Yango */}
      <View style={styles.inputBox}>
        <AntDesign name="mail" size={20} color="black" style={{ marginRight: 8 }} />
        <TextInput
          placeholder="Email"
          value={email}
          autoCapitalize="none"
          keyboardType="email-address"
          onChangeText={setEmail}
          style={{ flex: 1 }}
        />
      </View>

      <View style={styles.inputBox}>
        <AntDesign name="lock" size={20} color="black" style={{ marginRight: 8 }} />
        <TextInput
          placeholder="Password"
          value={password}
          secureTextEntry
          onChangeText={setPassword}
          style={{ flex: 1 }}
        />
      </View>

      {/* Continue Button */}
      <Pressable onPress={handleLogin} style={styles.button}>
        {loading ? <Loader /> : <Text style={styles.buttonText}>Continue</Text>}
      </Pressable>

      {/* Terms Text */}
      <Text style={styles.terms}>
        By continuing, I accept the terms of the User Agreement and Privacy Policy.
      </Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 100,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 22,
    fontWeight: '900',
    marginBottom: 8,
    color: '#111',
  },
  subText: {
    color: '#666',
    marginBottom: 20,
  },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    padding: 14,
    borderRadius: 14,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#FF3B30',
    padding: 16,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  terms: {
    fontSize: 12,
    color: '#888',
    textAlign: 'center',
    marginTop: 20,
  },
});
