import Loader from '@/components/loader';
import { AntDesign } from '@expo/vector-icons';
import { router } from 'expo-router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { auth } from '../lib/firebase';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(false);
  const [error, setError] = useState('');
    const [registerLoading , setRegisterLoading] = useState(false);
  

  const handleLogin = async () => {
    setError('');
    setMessage(false);

    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }

    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      setMessage(true);
      router.replace('/Index');
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };
const goToLogin = ()=> {
    setRegisterLoading(true);
    router.replace('/signup');
  }
  return (
    <View style={styles.container}>
      {/* Heading */}
      <Text style={styles.heading}>ENTER YOUR EMAIL</Text>
      <Text style={styles.subText}>We will log you in using this email and password</Text>

      {/* Email Input */}
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

      {/* Password Input */}
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

      {/* Error Message */}
      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      {/* Success Message */}
      {message && <Text style={styles.successText}>Login Successful!</Text>}

      {/* Continue Button */}
      <Pressable onPress={handleLogin} style={styles.button}>
        {loading ? <Loader col={"#fff"} /> : <Text style={styles.buttonText}>Continue</Text>}
      </Pressable>

      {/* Register Text */}
      <View style={styles.bottomTextContainer}>
        <Text style={styles.accountText}>Don't have an account? </Text>
        <Pressable onPress={goToLogin}>
          <View style={{ flexDirection: 'row', alignItems: 'center'  , gap: 4 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' ,  justifyContent: 'center' }}>
              {registerLoading ? <Loader col={"red"} /> : <AntDesign name="login" size={16} color="#FF3B30" style={{ marginRight: 4 }} />} 
            <Text style={styles.loginLink}>Register here</Text>
            </View>
          </View>
      
        </Pressable>
      </View>

      {/* Terms */}
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
  errorText: {
    color: '#FF3B30',
    fontSize: 13,
    marginBottom: 10,
    marginLeft: 5,
  },
  successText: {
    color: 'green',
    fontSize: 13,
    marginBottom: 10,
    marginLeft: 5,
  },
});
