import { router } from 'expo-router';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, View, Pressable } from 'react-native';
import { auth } from '../lib/firebase';
import { AntDesign, Feather } from '@expo/vector-icons';
import Loader from '@/components/loader';
import { updateProfile } from 'firebase/auth';

const SignupScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [registerLoading , setRegisterLoading] = useState(false);

  const handleSignup = async () => {
    if (!name || !email || !password) {
      Alert.alert('Missing Info', 'Please fill in all fields');
      return;
    }

    try {
      setLoading(true);
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      // console.log('User signed up:', userCredential.user);
      // Alert.alert('Success', `Welcome ${name}! You are signed up.`);
        await updateProfile(userCredential.user, {
    displayName: name, // name variable tum input field se le rahe hoge
  });
      router.replace('/Index');
    } catch (error: any) {
      Alert.alert('Signup Failed', error.message || 'Something went wrong');
      console.error('Signup error:', error);
    } finally {
      setLoading(false);
    }
  };
  const goToLogin = ()=> {
    setRegisterLoading(true);
    router.replace('/login');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>CREATE ACCOUNT</Text>
      <Text style={styles.subText}>Sign up to get started</Text>

      {/* Full Name */}
      <View style={styles.inputBox}>
        <Feather name="user" size={20} color="#333" style={{ marginRight: 8 }} />
        <TextInput
          placeholder="Full Name"
          value={name}
          onChangeText={setName}
          style={{ flex: 1 }}
        />
      </View>

      {/* Email */}
      <View style={styles.inputBox}>
        <AntDesign name="mail" size={20} color="#333" style={{ marginRight: 8 }} />
        <TextInput
          placeholder="Email"
          value={email}
          keyboardType="email-address"
          autoCapitalize="none"
          onChangeText={setEmail}
          style={{ flex: 1 }}
        />
      </View>

      {/* Password */}
      <View style={styles.inputBox}>
        <AntDesign name="lock" size={20} color="#333" style={{ marginRight: 8 }} />
        <TextInput
          placeholder="Password"
          value={password}
          secureTextEntry
          onChangeText={setPassword}
          style={{ flex: 1 }}
        />
      </View>

      {/* Signup Button */}
      <Pressable style={styles.button} onPress={handleSignup}>
        {loading ? <Loader col={"#fff"} /> : <Text style={styles.buttonText}>Sign Up</Text>}
      </Pressable>
{/* login here */}
      <View style={styles.bottomTextContainer} onTouchEnd={() => router.replace('/login')}>
  <Text style={styles.accountText}>Already have an account? </Text>
  <Pressable onPress={goToLogin}>
    <View style={{ flexDirection: 'row', alignItems: 'center'  , gap: 4 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' ,  justifyContent: 'center' }}>
        {registerLoading ? <Loader col = {"red"} /> : <AntDesign name="login" size={16} color="#FF3B30" style={{ marginRight: 4 }} />} 
      <Text style={styles.loginLink}>Login here</Text>
      </View>
    </View>

  </Pressable>
</View>
      <Text style={styles.terms}>
        By signing up, you agree to our Terms of Service and Privacy Policy.
      </Text>
    </View>
  );
};

export default SignupScreen;
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
  bottomTextContainer: {
  flexDirection: 'row',
  justifyContent: 'center',
  marginTop: 20,
},
accountText: {
  fontSize: 13,
  color: '#666',
},
loginLink: {
  fontSize: 13,
  color: '#FF3B30',
  fontWeight: '600',
},

});
