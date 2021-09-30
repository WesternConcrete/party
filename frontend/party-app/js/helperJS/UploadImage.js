import React from 'react';
import { Image, View, Platform, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux'
import {store} from "../redux/store"

import * as ImagePicker from 'expo-image-picker'

import { API_HOME, changeImage } from "./api"
import { changeProfileImage } from "../redux/actions.js"


const imageLink = "https://www.eguardtech.com/wp-content/uploads/2018/08/Network-Profile.png"

class UploadImage extends React.Component {

    

    addImage = async () =>  {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          console.log('Permission to access camera roll was denied');
          return
        }
        let _image = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4,3],
          quality: 1,
        });
        if (_image.cancelled === true){
            return null
        }
        const new_image = await changeImage(_image, this.props.username)
        this.props.changeProfileImage(new_image.image)

      };

    render(){
        return (
            <View style={{elevation:2,height:200,width:200,position:'relative',alignItems: 'center',overflow:'hidden',}}>
            <View style={imageUploaderStyles.container}>
                {
                    this.props.image  && <Image source={{ uri: this.props.image === imageLink? this.props.image: API_HOME + this.props.image, cache: 'reload' }} style={{ width: 200, height: 200 }} />
                }
                    
                    {/*<View style={imageUploaderStyles.uploadBtnContainer}>
                        <TouchableOpacity style={imageUploaderStyles.uploadBtn} >
                            <Text>{this.props.image === imageLink? 'Upload' : 'Change'} Image</Text>
                            <Ionicons name="camera" size={20} color="black" />
                        </TouchableOpacity>
                    </View>*/}
              
            </View>
                <TouchableOpacity style={{borderRadius:999, backgroundColor: '#515151', position: 'absolute', width: 50, height: 50, bottom: '0%', right: '5%', opacity: .8, justifyContent: 'center', alignItems: 'center'}} onPress={this.addImage}>
                    <Ionicons style={{width: '100%', position: 'absolute', top: '7%', left: '13%'}} name={"add-circle-outline"} color={'white'} size={40} />
                </TouchableOpacity>
            </View>
        );
    }
}

const mapStateToProps = state => ({
  username: state.user.user,
})

export default connect(mapStateToProps, {changeProfileImage})(UploadImage)

const imageUploaderStyles=StyleSheet.create({
    container:{
        elevation:2,
        height:200,
        width:200, 
        backgroundColor:'#efefef',
        position:'relative',
        borderRadius:999,
        overflow:'hidden',
    },
    uploadBtnContainer:{
        opacity:0.3,
        position:'absolute',
        right:0,
        bottom:0,
        backgroundColor:'lightgrey',
        width:'100%',
        height:'26%',
    },
    uploadBtn:{
        display:'flex',
        alignItems:"center",
        justifyContent:'center'
    }
})