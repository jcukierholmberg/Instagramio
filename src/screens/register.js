import React, {Component} from "react";
import {View, Text, TextInput, StyleSheet, TouchableOpacity, DatePickerAndroid} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

class Register extends Component{
    constructor(props){
        super(props)
        this.state={
            email:'',
            username:'',
            password:'',
        }
    }
    
    render(){
        return(
            <View style={styles.formContainer}>
                <Text style={styles.titulo}> Crea tu usuario</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(text)=>this.setState({email: text})}
                    placeholder='Email'
                    keyboardType='email-address'/>
                <TextInput
                    style={styles.input}
                    onChangeText={(text)=>this.setState({username: text})}
                    placeholder='Usuario'
                    keyboardType='email-address'/>
                <TextInput
                    style={styles.input}
                    onChangeText={(text)=>this.setState({password: text})}
                    placeholder='Contraseña'
                    keyboardType='email-address'
                    secureTextEntry={true}
                />
                { this.state.email == '' || this.state.password == '' || this.state.username == ''?
                    <Text></Text> :
                    <LinearGradient
                colors={['#DB0058', '#ED3B83', '#DB0058']}
                style={styles.button}>
                        <TouchableOpacity  onPress={()=>this.props.register(this.state.email, this.state.password, this.state.username)} >
                            <Text style={styles.textButton}>Registrarse</Text>    
                        </TouchableOpacity>
                </LinearGradient>
                }
                <Text>{this.props.error}</Text>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    formContainer:{
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
    },
    
    button:{
        backgroundImage:'linear-gradient (red, yellow)',
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
        color:'white',
        textAlign: 'center',
        fontSize: 16,
    },
    titulo:{
        fontWeight: 'bold',
        color:'white',
        fontSize: 20,
        marginTop:5,
    }
})

export default Register;