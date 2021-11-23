import { NavigationRouteContext } from "@react-navigation/native";
import React, {Component} from "react";
import {View, Text, TextInput, StyleSheet, TouchableOpacity} from 'react-native';
import { auth, db } from '../firebase/config'
import MyCamera from "../components/MyCamera";
import { LinearGradient } from 'expo-linear-gradient';

class PostForm extends Component{
    constructor(props){
        super(props)
        this.state={
            textoPost:'',
            showCamera:true,
            url:''
        }
    }
    submitPost(){
        db.collection('posts').add({
            owner: auth.currentUser.email,
            texto: this.state.textoPost,
            createdAt: Date.now(),
            photo: this.state.url,
        })
        .then( ()=>{ //Limpiar el form de carga
            this.setState({
                textoPost:'',
            })
            //Redirección
            this.props.drawerProps.navigation.navigate('Instagramio')
        })
        .catch(error => console.log(error))
    }

    onImageUpload(url){
        this.setState({
            showCamera: false,
            url: url
        })
    }

    render(){
        return(
            <View style={styles.container}>
                {
                    this.state.showCamera ?
                    <MyCamera onImageUpload={(url)=>{this.onImageUpload(url)}}/>:

                <View style={styles.formContainer}>
                        <TextInput
                            style={styles.input}
                            onChangeText={(text)=>this.setState({textoPost: text})}
                            placeholder='Deja tu comentario aca!'
                            keyboardType='default'
                            multiline
                            value={this.state.textoPost}    
                            />

                        <LinearGradient
                        colors={['#00C618', '#98ED00', '#00C618']}
                        style={styles.button}>
                            <TouchableOpacity onPress={()=>this.submitPost()}>
                                <Text style={styles.textButton}>P U B L I C A R</Text>    
                            </TouchableOpacity>
                        </LinearGradient>
                </View>
                }
            </View>
            
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: "#D0006E",
    },
    formContainer:{
        paddingHorizontal:10,
        marginTop: 20,
        backgroundColor: "#D0006E",
    },
    input:{
        height:100,
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

})

export default PostForm;