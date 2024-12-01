import { Link } from 'expo-router';
import { StyleSheet, TextInput, Pressable } from 'react-native';
import { useState } from 'react';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useAuthController } from '@/hooks/useAuthController';

export default function RegisterScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { handleRegister, registerLoading, registerError } = useAuthController();

  const onSubmit = async () => {
    try {
      await handleRegister({ name, email, password });
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.headerContainer}>
        <IconSymbol size={64} name="person.badge.plus.fill" color="#808080" />
        <ThemedText type="title">Create Account</ThemedText>
      </ThemedView>

      <ThemedView style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={setName}
          placeholderTextColor="#666"
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          placeholderTextColor="#666"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholderTextColor="#666"
        />
        <Pressable 
          style={styles.button}
          onPress={onSubmit}
          disabled={registerLoading}
        >
          <ThemedText style={styles.buttonText}>
            {registerLoading ? 'Creating Account...' : 'Create Account'}
          </ThemedText>
        </Pressable>
        {registerError && (
          <ThemedText style={styles.errorText}>
            Registration failed. Please try again.
          </ThemedText>
        )}
      </ThemedView>

      <ThemedView style={styles.footer}>
        <ThemedText>Already have an account? </ThemedText>
        <Link href="/(auth)/login">
          <ThemedText type="link">Sign in</ThemedText>
        </Link>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  headerContainer: {
    alignItems: 'center',
    gap: 16,
    marginBottom: 48,
  },
  formContainer: {
    gap: 16,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  errorText: {
    color: 'red',
    marginTop: 10,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  button: {
    height: 48,
    backgroundColor: '#007AFF',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
}); 