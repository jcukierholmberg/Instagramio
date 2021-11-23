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

    // disabled(){
    //      {this.state.email && this.state.password && this.state.username ? document.getElementById("submitbutton").disabled = false : document.getElementById("submitbutton").disabled = true;}
//}
    
    render(){
        return(
            <View style={styles.formContainer}>
                <Text style={styles.titulo}> Crea tu usuario</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(text)=>this.setState({email: text})}
                    // onChangeText={()=>this.disabled()}
                    placeholder='Email'
                    keyboardType='email-address'/>
                <TextInput
                    style={styles.input}
                    onChangeText={(text)=>this.setState({username: text})}
                    // onChangeText={()=>this.disabled()}
                    placeholder='Usuario'
                    keyboardType='email-address'/>
                <TextInput
                    style={styles.input}
                    onChangeText={(text)=>this.setState({password: text})}
                    // onChangeText={()=>this.disabled()}
                    placeholder='Contraseña'
                    keyboardType='email-address'
                    secureTextEntry={true}
                />
                {/* { this.state.email == '' || this.state.password == '' || this.state.username == ''?
                    <LinearGradient
                    colors={['#DB0058', '#ED3B83', '#DB0058']}
                    style={styles.button}>
                            <TouchableOpacity  onPress={()=>this.props.register(this.state.email, this.state.password, this.state.username)}  disabled>
                                <Text style={styles.textButton}>Registrarse</Text>    
                            </TouchableOpacity>
                    </LinearGradient> :
                    <LinearGradient
                    colors={['#DB0058', '#ED3B83', '#DB0058']}
                    style={styles.button}>
                            <TouchableOpacity  onPress={()=>this.props.register(this.state.email, this.state.password, this.state.username)} >
                                <Text style={styles.textButton}>Registrarse</Text>    
                            </TouchableOpacity>
                    </LinearGradient>
                } */}
                <LinearGradient
                    colors={['#00C618', '#98ED00', '#00C618']}
                    style={styles.button}>
                            <TouchableOpacity  onPress={()=>this.props.register(this.state.email, this.state.password, this.state.username)} id="submitbutton" disabled>
                                <Text style={styles.textButton}>R E G I S T R A R S E </Text>    
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
        fontSize: 25,
        marginTop:5,
    }
})

export default Register;