import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image, TextInput, TouchableOpacityBase} from 'react-native';
import {Camera} from 'expo-camera';
import {db, storage} from '../firebase/config';

class MyCamera extends Component{
    constructor(props){
        super(props);
        this.state = {
            permission: false, //Permisos de la cámara en el dispositivo
            photo: '', //Guardar la url/ uri de la foto.
            showCamera: true,
        }
        this.camera //la referencia a esta cámara.
    }

    componentDidMount(){
        Camera.requestCameraPermissionsAsync()
            .then(()=>{
                this.setState({
                    permission: true,
                })
            })
            .catch( error => console.log(error))
        //Investigar
       // console.log(Camera);
       // console.log(this.camera);
    }

    takePicture(){
        this.camera.takePictureAsync()
            .then((photo)=>{
                this.setState({
                    photo: photo.uri, //La ruta interna temporal a la foto.
                    showCamera:false
                })

            })
            .catch( error => console.log(error))
    }

    savePhoto(){
        //Tiene que buscar la foto de la uri temporal y subirla al storage.
        fetch(this.state.photo)
            .then( res => res.blob())
            .then( image =>{
                //Vamos a guardar la foto en storage y obtener la url pública.
                //Crear el nombre del archivo de la foto.    
                const ref = storage.ref(`photos/${Date.now()}.jpg`)
                ref.put(image)
                    .then(()=>{
                        ref.getDownloadURL()
                            .then( url => {
                                this.props.onImageUpload(url);
                                this.setState({
                                    photo:'',
                                })
                            })
                            .catch(error=>console.log(error))
                    })
                    .catch( error => console.log(error))
            })
            .catch(error => console.log(error));

    }

    clear(){
        //cambiar el estado de photo a ''
        //cambiar showCamera a true.
    }


    render(){
        return(
            <View style={styles.container}>
            {
                this.state.permission ?
                    this.state.showCamera === false ?
                    //Render del preview
                    <React.Fragment>
                        <Image 
                            style={styles.cameraBody}
                            source={{uri:this.state.photo}}
                        /> 
                        <View>
                            <TouchableOpacity onPress={()=>this.savePhoto()}>
                                <Text>Aceptar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>this.clear()}>
                                <Text>Rechazar</Text> 
                            </TouchableOpacity>
                        </View>
                    </React.Fragment>
                    :
                    //render de la cámara
                    <View style={styles.container}>
                        <Camera
                            style={styles.cameraBody}
                            type={Camera.Constants.Type.back}
                            ref={ reference => this.camera = reference }
                        />
                        <TouchableOpacity style={styles.button} onPress={()=>this.takePicture()}>
                            <Text>Sacar Foto</Text>
                        </TouchableOpacity>
                    </View> 
                :
                //render mensaje
                <Text>No tienes permisos para usar la cámara</Text>

            }
            </View>

        )
    }

    
}

const styles=StyleSheet.create({
    container:{
        flex:1,
    },
    cameraBody:{
        flex:7,
    },
    button:{
        flex:1,
        justifyContent: 'center',
    }
})

export default MyCamera;