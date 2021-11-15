import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator} from '@react-navigation/drawer';

import Inicio from '../screens/Inicio';
import Register from '../screens/register';
import Login from '../screens/login';
import Perfil from '../screens/profile';
import PostForm from '../screens/postForm';
import { auth } from '../firebase/config';


const Drawer = createDrawerNavigator();

class NavBar extends Component{
    constructor(){
        super();
        this.state = {
            loggedIn:false,
            user:''
        }
    }
    
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

    register(email, pass){
        auth.createUserWithEmailAndPassword(email, pass)
            .then( ()=>{
                console.log('Registrado');
            })
            .catch( error => console.log(error))
    }
    login(email,pass){
        auth.signInWithEmailAndPassword(email,pass)
            .then( response => {
                this.setState({
                    loggedIn: true,
                    user:response.user,
                })
            })
            .catch(error => console.log(error))
    }

    logout(){
        auth.signOut()
            .then( (res)=>{
                this.setState({
                    user:'',
                    loggedIn: false,
                })
            })
            .catch(error => console.log(error))
    }

    render(){
        return(
            
            <NavigationContainer>
            {this.state.loggedIn == false ?
                <Drawer.Navigator>
                    <Drawer.Screen name="Registro" component={()=><Register register={(email, pass)=>this.register(email, pass)} />} />
                   
                    <Drawer.Screen name="Login" component={()=><Login login={(email, pass)=>this.login(email, pass)} />}/>
                </Drawer.Navigator> :
                <Drawer.Navigator>
                     <Drawer.Screen name="Inicio" component={()=><Inicio />} />
                     <Drawer.Screen name ="Nuevo Posteo" component={(drawerProps)=><PostForm drawerProps={drawerProps}/>}/>
                      <Drawer.Screen name="Perfil" component={()=><Perfil userData={this.state.user} logout={()=>this.logout() } />} />
                </Drawer.Navigator>
            }
            </NavigationContainer>
        )
    }

}

export default NavBar