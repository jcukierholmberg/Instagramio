import React, {Component} from 'react';
import {Text, TouchableOpacity, View, StyleSheet, Image, ActivityIndicator, FlatList, TextInput, Alert, Button, AppRegistry} from 'react-native';
import { db, auth } from '../firebase/config';
import firebase from 'firebase';
import Post from '../components/Post';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator} from '@react-navigation/drawer';
import { LinearGradient } from 'expo-linear-gradient';

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
    
    db.collection('posts').orderBy("createdAt", "desc").where("owner","==",auth.currentUser.email).onSnapshot(
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
          <Text style={styles.welcome}>B I E N V E N I D O !  {this.props.userData.username}</Text>
          <Text style={styles.mail}>{this.props.userData.email}</Text>
          <Text style={styles.element}>{this.state.posteos.length} posteos</Text>
          <Text style={styles.element}> En Instagramio desde: {this.props.userData.metadata.creationTime}</Text>
          <Text style={styles.element}> Última sesión: {this.props.userData.metadata.lastSignInTime}</Text>
           
          
        <View style={styles.posteos}>
          <FlatList 
            data= { this.state.posteos }
            keyExtractor = { post => post.id}
            renderItem = { ({item}) => <Post postData={item} />} // <Text>{item.data.texto}</Text>//Podríamos armar un componente <Post > más complejo y rendirazolo con los datos de cada documanto.
          />
        </View>  
        <LinearGradient
                colors={['#A60800', '#FF0D00', '#A60800']}
                style={styles.button}>
              <TouchableOpacity onPress={()=>this.props.logout()}>
                  <Text style={styles.touchableText}>C E R R A R  S E S I Ó N</Text>
              </TouchableOpacity>
        </LinearGradient>
        <LinearGradient
                colors={['#A60800', '#FF0D00', '#A60800']}
                style={styles.button}>
            <TouchableOpacity onPress={()=>this.borrarUsuario()} > 
                  <Text style={styles.touchableText}>E L I M I N A R  U S U A R I O</Text>
                  <Text>{this.state.message}</Text>
            </TouchableOpacity>
        </LinearGradient>
         
      </View>       
    )
  }
}

const styles = StyleSheet.create({
    container:{
        paddingHorizontal:10,
        backgroundColor: "#D0006E",
        paddingBottom: 600,
    },
    posteos:{
        margin:10,
    },
    welcome:{
        fontSize:25,
        marginTop:20,
        fontWeight: 'light',
        color: "white",
    },
    mail:{
      fontSize:20,
      fontWeight: 'light',
      color: "white",
      marginBottom:15,
    },
    element:{
        marginBottom:10,
        color: "white",
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
    touchableText:{
        fontWeight: 'bold',
        color:'#fff',
        textAlign: 'center'
    },
    
});

export default Profile;