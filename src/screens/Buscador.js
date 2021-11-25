import React, {Component} from 'react';
import {Text, TouchableOpacity, View, StyleSheet, FlatList, TextInput} from 'react-native';
import { db } from '../firebase/config';
import Post from '../components/Post';
import {FontAwesomeIcon, fontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch } from "@fortawesome/free-solid-svg-icons"


class Buscador extends Component{
  constructor(props){
    super(props);
    this.state ={
      posteos: [],
      resultadoBusqueda: '',
    }
  }

  filtro (){
    db.collection('posts').where("owner","==",this.state.resultadoBusqueda).orderBy("createdAt", "desc").onSnapshot( 
        docs => {
          let posts = [];
          docs.forEach( doc => {
            posts.push({
              id: doc.id,   
              data: doc.data(),
            })
          })
  
          this.setState({
            posteos: posts,
          })
  
        }
      )
    }

  render(){
    return(
      <View style={styles.container}>
        <View style={{flexDirection:"row", alignItems:"center"}}>
          <TextInput style={styles.input} keyboardType='email-address' placeholder='Buscar email del usuario ' onChangeText={(texto)=> this.setState({resultadoBusqueda: texto})}/>
          <TouchableOpacity style={styles.icon} onPress={()=> this.filtro()}> <FontAwesomeIcon icon={faSearch} style={{fontSize: 24}}/> </TouchableOpacity>
        </View>
          
         
         {
          
          this.state.posteos.length ? 
          <FlatList 
          data= { this.state.posteos }
          keyExtractor = { post => post.id}
          renderItem = { ({item}) => <Post postData={item} />} /> :
          <Text style={styles.text}> No hay usuarios </Text> 
          
         }
        
      </View>
      )}
}

const styles = StyleSheet.create({
  container:{
    paddingBottom:600,
    paddingHorizontal:10,
    backgroundColor: "#D0006E",
    alignItems:"center",
  },
  input:{
    flex:8,
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
    width: 320
  },
  icon:{
    flex:1,
    color: "white",
    paddingLeft:10,
  },
  text:{
    color:"white",
    paddingTop:20,
    fontSize: 20
  }
})

export default Buscador;