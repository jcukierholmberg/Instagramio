import React, {Component} from 'react';
import {Text, TouchableOpacity, View, StyleSheet, Image, ActivityIndicator, FlatList, TextInput, Alert, Button, AppRegistry} from 'react-native';
import { db, auth } from '../firebase/config';
import firebase from 'firebase';
import Post from '../components/Post';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator} from '@react-navigation/drawer';

class Profile extends Component{
  constructor(props){
    super(props);
    this.state ={
      posteos: [],
      loggedIn: true,
      user: '',
      message: ''
    }
  }
  componentDidMount(){
    
    db.collection('posts').where("owner","==",auth.currentUser.email).onSnapshot(
      docs => {
        //Armo un array vacio asi guardo solo la info que me sirve - esa info me la da data()
        let posts = [];
        docs.forEach( doc => {
          posts.push({
            id: doc.id,   
            data: doc.data(),
          })
        })

        this.setState({
          posteos: posts,
        }, 
         ( )=> console.log(this.state.posteos))

      }
    )

  }

  borrarUsuario(){
    auth.currentUser.delete()
    .then( ()=>{
      this.setState({
          user:'',
          loggedIn: false,
      })
    })
    .then(()=> location.reload())
    .catch(error => {
      console.log(error);
      this.setState({
          message: error.message,
      })
  })
}

createTwoButtonAlert(){
    Alert.alert(
      "Alert Title",
      "My Alert Msg",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ]
    )}

  render(){
    return(
      <View style={styles.container}>
          <Text style={styles.welcome}> Bienvenido  {this.props.userData.username}</Text>
          <Text style={styles.welcome}>{this.props.userData.email}</Text>
          {/* <Text style={styles.welcome}> Posteos:  {this.props.posts.length}</Text> */}
          <Text>{this.state.posteos.length} posteos</Text>
          <Text style={styles.element}> Usuario creado el: {this.props.userData.metadata.creationTime}</Text>
          <Text style={styles.element}> Última sesión: {this.props.userData.metadata.lastSignInTime}</Text>
          <TouchableOpacity style={styles.touchable} onPress={()=>this.props.logout()}>
            <Text style={styles.touchableText}>Cerrar sesión</Text>
          </TouchableOpacity> 
        <View style={styles.container}>
          <FlatList 
            data= { this.state.posteos }
            keyExtractor = { post => post.id}
            renderItem = { ({item}) => <Post postData={item} />} // <Text>{item.data.texto}</Text>//Podríamos armar un componente <Post > más complejo y rendirazolo con los datos de cada documanto.
          />
        </View>  
        <TouchableOpacity style={styles.touchable} onPress={()=>this.borrarUsuario()} > 
            <Text style={styles.touchableText}>Borrar usuario</Text>
            <Text>{this.state.message}</Text>
          </TouchableOpacity> 
      </View>       
    )
  }
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: "#D0006E",
    },
    welcome:{
        fontSize:18,
        marginTop:20,
        marginBottom:30,
        fontWeight: 'bold'
    },
    element:{
        marginBottom:10,
    },
    touchable:{
        padding: 10,
        backgroundColor: '#dc3545',
        marginTop: 30,
        borderRadius: 4,
    },
    touchableText:{
        fontWeight: 'bold',
        color:'#fff',
        textAlign: 'center'
    },
    buttonContainer: {  
      margin: 20  
  },  
  multiButtonContainer: {  
      margin: 20,  
      flexDirection: 'row',  
      justifyContent: 'space-between'  
  }  
});

export default Profile;