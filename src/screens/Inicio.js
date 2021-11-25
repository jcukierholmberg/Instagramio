import React, {Component} from 'react';
import {Text, TouchableOpacity, View, StyleSheet, Image, ActivityIndicator, FlatList, TextInput, ScrollView} from 'react-native';
import { db, auth } from '../firebase/config';
import Post from '../components/Post';


class Inicio extends Component{
  constructor(props){
    super(props);
    this.state ={
      posteos: [],
    }
  }
  componentDidMount(){
    
    db.collection('posts').orderBy("createdAt", "desc").onSnapshot(
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
        })
      }
    )
  }

  render(){
    return(
      <View style={styles.container}>
        <ScrollView>
          <FlatList 
            data= { this.state.posteos }
            keyExtractor = { post => post.id}
            renderItem = { ({item}) => <Post postData={item} />} // <Text>{item.data.texto}</Text>//Podríamos armar un componente <Post > más complejo y rendirazolo con los datos de cada documanto.
          />
        </ScrollView>
      </View>
      )
  }
}

const styles = StyleSheet.create({
  container:{
    paddingHorizontal:10,
    backgroundColor: "#D0006E",
    marginBottom:600,
  },
})

export default Inicio;