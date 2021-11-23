import React, { Component } from 'react';
import {View, Text, TextInput, StyleSheet, TouchableOpacity} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator} from '@react-navigation/drawer';

import Inicio from '../screens/Inicio';
import Register from '../screens/register';
import Login from '../screens/login';
import Perfil from '../screens/profile';
import PostForm from '../screens/postForm';
import { auth } from '../firebase/config';
import Buscador from '../screens/Buscador'


const Drawer = createDrawerNavigator();

class NavBar extends Component{
    constructor(props){
        super(props);
        this.state = {
            loggedIn: false,
            user: '',
            errorM: '',
            errorC: ''
        }
    }
    // hago un componentDidMount para que sepa que hay un usuario logueado y no este cargando todo el tiempo
    componentDidMount(){
        auth.onAuthStateChanged(user => {
            if(user){
                this.setState({
                    loggedIn:true,
                    user: user,
                })
            }
        })
    }
            // ¿Por que tengo las funciones aca? NavBar es el componente padre, le pasa la info por props la funcion a cada componente hijo - drawer es quien deberia saber como manejar las funciones ya que es el que mueve todo de un lado a otro

    register(email, pass){
        auth.createUserWithEmailAndPassword(email, pass)
            .then( ()=>{
                console.log('Registrado');
            })
            .catch( error => console.log(error))
    }
    login(email,pass){
        auth.signInWithEmailAndPassword(email,pass)
            .then( userInfo => {
                this.setState({
                    loggedIn: true,
                    user: userInfo.user,
                })
            })
            .catch(error => {
                console.log(error);
                this.setState({
                    errorM: error.message,
                    errorC: error.code
                })
            })
    }

    logout(){
        auth.signOut()
            .then( ()=>{
                this.setState({
                    user:'',
                    loggedIn: false,
                })
            })
            .catch(error => console.log(error))
    }

    render(){
        return(
            <NavigationContainer style={styles.topmenu}>
            {this.state.loggedIn == false ?
                <Drawer.Navigator>
                    <Drawer.Screen name="Registro" component={()=><Register register={(email, pass)=>this.register(email, pass)} />} />
                    <Drawer.Screen name="Iniciar sesión" component={()=><Login login={(email, pass)=>this.login(email, pass)} error={this.state.errorM}/>}/>
                </Drawer.Navigator> :
                <Drawer.Navigator>
                     <Drawer.Screen name="Instagramio" component={()=><Inicio />} />
                     <Drawer.Screen name ="Nuevo Posteo" component={(drawerProps)=><PostForm drawerProps={drawerProps}/>}/>
                     <Drawer.Screen name="Perfil" component={()=><Perfil userData={this.state.user} logout={()=>this.logout() } />} />
                     <Drawer.Screen name="Buscador" component={()=><Buscador />} />

                </Drawer.Navigator>
            }
            </NavigationContainer>
        )
    }

}

const styles = StyleSheet.create({
    topmenu:{
        backgroundColor: "#00B74A"
    }
})

export default NavBar;