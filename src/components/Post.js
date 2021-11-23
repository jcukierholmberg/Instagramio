import React, { Component } from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Modal, TextInput, Image, FlatList, ScrollView} from 'react-native';
import { db, auth } from '../firebase/config';
import firebase from 'firebase';
import {FontAwesomeIcon, fontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeart, faComment, faTimes, faTrash, faChevronRight, faUserCircle} from "@fortawesome/free-solid-svg-icons"


class Post extends Component{
    constructor(props){
        super(props);
        this.state = {
           likes: 0,
           myLike:false,
           showModal: false, //Para la vista del modal
           comment:'', //para limpiar el campo después de enviar.
        }
        console.log(this.props.postData.comment)
    }
    componentDidMount(){
        if(this.props.postData.data.likes){
            this.setState({
            likes:this.props.postData.data.likes.length,
            myLike: this.props.postData.data.likes.includes(auth.currentUser.email),  
        })
        }
        console.log(this.props.postData.data.comments)
    }

    darLike(){
        //Agregar mi usuario a un array de usuario que likearon.
            //Updatear el registro (documento)
        db.collection('posts').doc(this.props.postData.id).update({
            likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
        })
        .then(()=>{
            this.setState({
                likes:this.state.likes + 1,
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
         db.collection('posts').doc(this.props.postData.id).update({
           comments:firebase.firestore.FieldValue.arrayUnion(oneComment)
        })
        .then(()=>{
            this.setState({
                comment: ''
            })
        })
    }

    borrarPost(){
        db.collection('posts').doc(this.props.postData.id).delete()
            .then(() => {
                console.log('Posteo borrado')
            })
            .catch(error => console.log(error))
    }

    render(){
        return(
            <View style={styles.container}>
            <View style={styles.usuario}>
                <FontAwesomeIcon icon={faUserCircle} style={{color:"black", fontSize: 20, flex:1, paddingRight:8 }}/>
                <Text style={styles.user}>{this.props.postData.data.owner} </Text>
                { auth.currentUser.email === this.props.postData.data.owner ?
                <TouchableOpacity onPress={()=>this.borrarPost()}><FontAwesomeIcon icon={faTrash} style={{color:"black", fontSize: 20, flex:1}}/></TouchableOpacity> :
                ""
            }
            </View>
            
            
            <Image 
            style={{height: 230, marginTop: 17, marginBottom: 15, borderRadius:4}}
            source={{uri: this.props.postData.data.photo}} 
            resizeMode= 'contain'/>
            <View style={styles.ordenar}>
            {
                this.state.myLike == false ?
                
                <TouchableOpacity onPress={()=>this.darLike()}>
                    <FontAwesomeIcon icon={faHeart} style={{color:"black", fontSize: 24}}/>
                </TouchableOpacity>  :
                <TouchableOpacity onPress={()=>this.quitarLike()}>
                    <FontAwesomeIcon icon={faHeart} style={{color:"red", fontSize: 24}}/>
                </TouchableOpacity>                       
            }
                <TouchableOpacity onPress={()=>this.showModal()}>
                <FontAwesomeIcon icon={faComment} style={{paddingLeft:10, color:"black", fontSize: 24}}/>
                </TouchableOpacity>
            </View>
            

            <Text>{this.state.likes} Me gusta </Text>
            <Text style={styles.caption}>{this.props.postData.data.texto}</Text>
            

            {/* Modal para comentarios */}
            {   this.state.showModal ?
                <Modal style={styles.modal}
                    visible={this.state.showModal}
                    animationType='slide'
                    transparent={false}
                >   
                    <TouchableOpacity onPress={()=>this.hideModal()}>
                    <FontAwesomeIcon icon={faTimes} style={{color:"black", fontSize: 24}}/>
                    </TouchableOpacity> 
                    <ScrollView>
                        { this.props.postData.data.comments ?
                                <FlatList
                                data={this.props.postData.data.comments}
                                initialNumToRender={this.props.postData.data.comments.length}
                                keyExtractor={item => item.createdAt}
                                renderItem = {({item}) => <Text> <strong>{item.author}</strong> {item.comment}</Text> }
                                /> :
                                <Text>Aún no hay comentarios. Sé el primero en opinar.</Text>
                        }
                    </ScrollView>

                    {/* Formulario para nuevo comentarios */}
                    <View style={styles.comentario}>
                        <TextInput style={{flex:4}} placeholder="Deja tu comentario!"
                            keyboardType="default"
                            multiline
                            onChangeText={text => this.setState({comment: text})}
                            value={this.state.comment}
                        />
                        { this.state.comment == ''?
                        <Text></Text> :
                        <TouchableOpacity style={{flex:1, paddingLeft:15}} onPress={()=>{this.guardarComentario()}}>
                        <FontAwesomeIcon icon={faChevronRight} style={{fontSize: 24}}/>
                        </TouchableOpacity>
                    }
                    </View>

                </Modal>    :
                <Text></Text>
            } 


            </View>
        )
    }

}


const styles = StyleSheet.create({
    container:{
        marginTop: 20,
        marginBottom: 20,
        borderRadius:4,
        padding: 10,
        backgroundColor: "white"
        
    },
    caption:{
        fontWeight: "bold",
    },
    user:{
        flex:12,
        fontWeight: "bold",
    },
    modal:{
        borderColor: "white",
    },
    ordenar:{
        flexDirection: "row",
    },
    comentario:{
    flexDirection: "row"
    },
    usuario:{
        flexDirection:"row",
        alignItems: "center",

    },
})

export default Post