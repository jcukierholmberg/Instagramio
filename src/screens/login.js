import React, {Component} from "react";
import {View, Text, TextInput, StyleSheet, TouchableOpacity} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

class Login extends Component{
    constructor(props){
        super(props)
        this.state={
            email:'',
            password:'',
        }
        console.log(this.props.state)
    }

    render(){
        return(
            <View style={styles.formContainer}>
                <Text style={styles.titulo}>Iniciar sesión</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(text)=>this.setState({email: text})}
                    placeholder='Email'
                    keyboardType='email-address'/>
                <TextInput
                    style={styles.input}
                    onChangeText={(text)=>this.setState({password: text})}
                    placeholder='Contraseña'
                    keyboardType='email-address'
                    secureTextEntry={true}
                />
                <LinearGradient
                colors={['#00C618', '#98ED00', '#00C618']}
                style={styles.button}>
                    <TouchableOpacity onPress={()=>this.props.login(this.state.email, this.state.password)}>
                        <Text style={styles.textButton}>I N G R E S A R</Text>    
                    </TouchableOpacity>
                </LinearGradient>
                <Text>{this.props.error}</Text>
                
            </View>
        )
    }
}

const styles = StyleSheet.create({
    formContainer:{
        paddingHorizontal:10,
        backgroundColor: "#D0006E",
        paddingBottom: 6000,
    },
    input:{
        height:20,
        paddingVertical:15,
        paddingHorizontal: 10,
        borderRadius: 6,
        marginVertical:10,
        backgroundColor: "white",
        shadowColor: '#171717',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    button:{
        paddingHorizontal: 10,
        paddingVertical: 10,
        textAlign: 'center',
        borderRadius:6, 
        marginTop: 20,
        shadowColor: '#171717',
        shadowOffset: {width: -2, height: 8},
        shadowOpacity: 0.3,
        shadowRadius: 3,
    
    },
    textButton:{
        fontWeight: 'thin',
        color:'white',
        textAlign: 'center',
        fontSize: 16,
    },
    titulo:{
        fontWeight: 'thin',
        color:'white',
        fontSize: 20,
        marginTop:5,
    }
})


export default Login;