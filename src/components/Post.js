import React, { Component } from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Modal, TextInput, Image} from 'react-native';
import { db, auth } from '../firebase/config';
import firebase from 'firebase';
import {FontAwesomeIcon, fontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeart, faComment, faShare, faTimes} from "@fortawesome/free-solid-svg-icons"

class Post extends Component{
    constructor(props){
        super(props);
        this.state = {
           likes: 0,
           myLike:false,
           showModal: false, //Para la vista del modal
           comment:'', //para limpiar el campo después de enviar.
        }
    }
    componentDidMount(){
        if(this.props.postData.data.likes){
            this.setState({
            likes:this.props.postData.data.likes.length,
            myLike: this.props.postData.data.likes.includes(auth.currentUser.email),  
        })
        }
        
    }

    darLike(){
        //Agregar mi usuario a un array de usuario que likearon.
            //Updatear el registro (documento)
        db.collection('posts').doc(this.props.postData.id).update({
            likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
        })
        .then(()=>{
            this.setState({
                likes:this.props.postData.data.likes.length,
                //likes:this.state.likes + 1, //Opción más rápida de respuesta
                myLike: true,
            })
        })
    }
    quitarLike(){
        //Quitar mi usuario a un array de usuario que likearon.
            //Updatear el registro (documento)
        db.collection('posts').doc(this.props.postData.id).update({
            likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
        })
        .then(()=>{
            this.setState({
                likes:this.props.postData.data.likes.length,
                //likes:this.state.likes + 1, //Opción más rápida de respuesta
                myLike: false,
            })
        })
    }
    showModal(){
        this.setState({
            showModal:true,
        })
    }

    hideModal(){
        this.setState({
            showModal:false,
        })
    }

    guardarComentario(){
        let oneComment = {
            createdAt: Date.now(),
            author: auth.currentUser.email,
            comment: this.state.comment, 
        }
        //identifacar el documento que queremos modificar.
         db.collection('posts').doc(this.props.postData.id).update({
           comments:firebase.firestore.FieldValue.arrayUnion(oneComment)
        })

        //Armar el comentario que vamos a guardar.  
            //Conseguir el estado

        //Guardarlo en un colección: modifacer un documento

        //limpiar el estado
    }

    render(){
        return(
            <View style={styles.contanier}>
            <Text style={styles.caption}>{this.props.postData.data.owner} </Text>
            <Image 
            style={{height: 230, marginTop: 17, borderRadius:4}}
            source={{uri: this.props.postData.data.photo}} />
            <Text style={styles.caption}>{this.props.postData.data.texto}</Text>
            <Text style={styles.likes}>{this.state.likes} </Text>
               
            {
                this.state.myLike == false ?
                
                <TouchableOpacity onPress={()=>this.darLike()}>
                    <FontAwesomeIcon icon={faHeart} style={{color:"black", fontSize: 24}}/>
                </TouchableOpacity>  :
                <TouchableOpacity onPress={()=>this.quitarLike()}>
                    <FontAwesomeIcon icon={faHeart} style={{color:"red", fontSize: 24}}/>
                </TouchableOpacity>                       
            }
            {/* Ver modal */}
            <TouchableOpacity onPress={()=>this.showModal()}>
            <FontAwesomeIcon icon={faComment} style={{fontSize: 24}}/>
            </TouchableOpacity>

            {/* Modal para comentarios */}
            {   this.state.showModal ?
                <Modal
                    visible={this.state.showModal}
                    animationType='slide'
                    transparent={false}
                >   
                    <TouchableOpacity onPress={()=>this.hideModal()}>
                    <FontAwesomeIcon icon={faTimes} style={{fontSize: 18}}/>
                    </TouchableOpacity> 
                   

                    {/* Formulario para nuevo comentarios */}
                    <View>
                        <TextInput placeholder="Deja tu comentario!"
                            keyboardType="default"
                            multiline
                            onChangeText={text => this.setState({comment: text})}
                            value={this.state.comment}
                        />
                        <TouchableOpacity onPress={()=>{this.guardarComentario()}}>
                        <FontAwesomeIcon icon={faShare} style={{fontSize: 24}}/>
                        </TouchableOpacity>
                    </View>

                </Modal>    :
                <Text></Text>
            } 


            </View>
        )
    }

}


const styles = StyleSheet.create({
    contanier:{
        marginBottom: 20,
        borderRadius:4,
        borderColor: "#ccc",
        borderWidth: 1,
        padding: 10,
        
    },
    likes:{
        color: "red",
    },
    caption:{
        fontWeight: "bold",
    }
})

export default Post