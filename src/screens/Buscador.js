import React, {Component} from 'react';
import {Text, TouchableOpacity, View, StyleSheet, Image, ActivityIndicator, FlatList, TextInput} from 'react-native';
import { db, auth } from '../firebase/config';
import Post from '../components/Post';
import {FontAwesomeIcon, fontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faShare, } from "@fortawesome/free-solid-svg-icons"


class Buscador extends Component{
  constructor(props){
    super(props);
    this.state ={
      posteos: [],
      resultadoBusqueda: '',
      aviso: 'Filtra los posteos por usuario'
    }
  }
  componentDidMount(){

  }

  filtro (){
    db.collection('posts').where("owner","==",this.state.resultadoBusqueda).onSnapshot(
        docs => {
          //Array para crear datos en formato más útil.
          let posts = [];
          docs.forEach( doc => {
            posts.push({
              id: doc.id,   
              data: doc.data(),
            })
          })
  
          this.setState({
            posteos: posts,
            aviso: ''
          }, 
           ( )=> console.log(this.state.posteos))
  
        }
      )
  }

  render(){
    return(
      <View style={styles.container}>
          <TextInput style={styles.input} keyboardType='email-address' placeholder='Buscar usuario' onChangeText={(texto)=> this.setState({resultadoBusqueda: texto})}/>
          <TouchableOpacity onPress={()=> this.filtro()}> <FontAwesomeIcon icon={faShare} style={{fontSize: 24}}/> </TouchableOpacity>
         
         {
          
          this.state.posteos.length ? 
          <FlatList 
          data= { this.state.posteos }
          keyExtractor = { post => post.id}
          renderItem = { ({item}) => <Post postData={item} />} /> :
          <Text> No hay usuario </Text> 
          
         }
        
      </View>
      )}
}

const styles = StyleSheet.create({
  container:{
    paddingBottom:600,
    paddingHorizontal:10,
    backgroundColor: "#D0006E",
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
  touchable:{
    backgroundColor: '#ccc',
    borderRadius:4,
    marginVertical:10,
  }
})

export default Buscador;