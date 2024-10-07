import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { auth } from '../utils/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const CreateAccountScreen = () => {
  //Variaveis para estilização dos inputs
  const [usernameFocused, setUsernameFocused] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused1, setPasswordFocused1] = useState(false);
  const [passwordFocused2, setPasswordFocused2] = useState(false);

  //Variaveis para armazenar os valores para a criação da conta
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');

  //Função para criar uma conta
  async function handleRegister(email: string, password1: string, password2: string) {
    if (password1 !== password2) {
      alert('As senhas não coincidem');
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password1).then(
        (userCredential) => {
          const user = userCredential.user;
          console.log('Usuário criado com sucesso', user);
        }
      );
    } catch (e) {
      console.error(e);
      alert('Erro ao criar usuário');
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.registerText}>
        <Text style={styles.title}>Criação de conta</Text>
      </View>
      <TextInput
        placeholder="Username"
        style={[styles.input, usernameFocused && styles.inputSelected]}
        onFocus={() => setUsernameFocused(true)}
        onBlur={() => setUsernameFocused(false)}
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        placeholder="Email"
        style={[styles.input, emailFocused && styles.inputSelected]}
        onFocus={() => setEmailFocused(true)}
        onBlur={() => setEmailFocused(false)}
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="Password"
        style={[styles.input, passwordFocused1 && styles.inputSelected]}
        secureTextEntry
        onFocus={() => setPasswordFocused1(true)}
        onBlur={() => setPasswordFocused1(false)}
        value={password1}
        onChangeText={setPassword1}
      />
      <TextInput
        placeholder="Password"
        style={[styles.input, passwordFocused2 && styles.inputSelected]}
        secureTextEntry
        onFocus={() => setPasswordFocused2(true)}
        onBlur={() => setPasswordFocused2(false)}
        value={password2}
        onChangeText={setPassword2}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleRegister(email, password1, password2)}>
        <Text style={styles.buttonText}>Registrar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    gap: 10,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 12,
    borderRadius: 10,
    marginBottom: 20,
    fontSize: 16,
    width: '100%',
  },
  inputSelected: {
    borderColor: 'gray',
  },
  button: {
    backgroundColor: '#00B9D1',
    padding: 12,
    borderRadius: 10,
    width: '50%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  registerText: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CreateAccountScreen;
