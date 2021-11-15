import React, {Component} from "react";
import {View, Text, TextInput, StyleSheet, TouchableOpacity} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

class Login extends Component{
    constructor(props){
        super(props)
        this.state={
            email:'',
            password:'',
            error:'',
        }
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
                colors={['#DB0058', '#ED3B83', '#DB0058']}
                style={styles.button}>
                    <TouchableOpacity onPress={()=>this.props.login(this.state.email, this.state.password)}>
                        <Text style={styles.textButton}>Ingresar</Text>    
                    </TouchableOpacity>
                </LinearGradient>
                
            </View>
        )
    }
}

const styles = StyleSheet.create({
    formContainer:{
        paddingHorizontal:10,
        marginTop: 20,
    },
    input:{
        height:20,
        paddingVertical:15,
        paddingHorizontal: 10,
        borderWidth:1,
        borderStyle: 'solid',
        borderRadius: 6,
        marginVertical:10,
        backgroundColor: "#8E003940",
    },
    button:{
        backgroundColor:'#28a745',
        paddingHorizontal: 10,
        paddingVertical: 10,
        textAlign: 'center',
        borderRadius:4, 
        borderWidth:1,
        borderStyle: 'solid',
        borderColor: 'white',
        marginTop: 20,
    
    },
    textButton:{
        fontWeight: 'bold',
        color:'#fff',
        textAlign: 'center',
        fontSize: 16,
    },
    titulo:{
        fontWeight: 'bold',
        color:'black',
        fontSize: 16,
    }
})


export default Login;