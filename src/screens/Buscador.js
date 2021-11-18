import React, {Component} from 'react';
import {Text, TouchableOpacity, View, StyleSheet, Image, ActivityIndicator, FlatList, TextInput} from 'react-native';
import { db, auth } from '../firebase/config';
import Post from '../components/Post';


class Buscador extends Component{
  constructor(props){
    super(props);
    this.state ={
      posteos: [],
      resultadoBusqueda: ''
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
          }, 
           ( )=> console.log(this.state.posteos))
  
        }
      )
  }

  render(){
    return(
      <View style={styles.container}>
        <TextInput keyboardType='email-address' placeholder='Buscar..' onChangeText={(texto)=> this.setState({resultadoBusqueda: texto})}/>
        <TouchableOpacity onPress={()=> this.filtro()}> <Text> Buscar Usuario </Text> </TouchableOpacity>
        <FlatList 
          data= { this.state.posteos }
          keyExtractor = { post => post.id}
          renderItem = { ({item}) => <Post postData={item} />} // <Text>{item.data.texto}</Text>//Podríamos armar un componente <Post > más complejo y rendirazolo con los datos de cada documanto.
        />
      </View>
      )
  }
}

const styles = StyleSheet.create({
  container:{
    paddingHorizontal:10,
  },
  formContainer:{
    backgroundColor: '#ffffff',
    marginHorizontal: 10,
    padding:10,
  },
  field:{
    borderColor: '#444',
    borderWidth:1,
    borderStyle: 'solid',
    height: 20,
    paddingHorizontal: 20,
    paddingVertical:10
  },
  image:{
    height: 250,
  },
  touchable:{
    backgroundColor: '#ccc',
    borderRadius:4,
    marginVertical:10,
  }
})

export default Buscador;