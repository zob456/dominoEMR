import React, { useState } from 'react'
import {
    ScrollView,
    Text,
    TextInput,
    View,
    Button
} from 'react-native';

interface Props {
    signIn: (email: string, password: string) => void
}

const Login = ({ signIn }: Props) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    return (
        <ScrollView style={{ padding: 20 }}>
            <Text
                style={{ fontSize: 27 }}>
                Login
        </Text>
            <TextInput placeholder='Username' onChangeText={text => setEmail(text)} />
            <TextInput placeholder='Password' onChangeText={text => setPassword(text)} />
            <View style={{ margin: 7 }} />
            <Button
                onPress={() => signIn(email, password)}
                title="Login"
            />
        </ScrollView>
    )
}

export default Login
