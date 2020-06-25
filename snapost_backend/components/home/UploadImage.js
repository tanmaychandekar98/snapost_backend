import React, { Fragment, Component } from 'react';
import ImagePicker from 'react-native-image-picker';
import ImageCropPicker from 'react-native-image-crop-picker';
import * as Constants from '../../constants/Constants.js';
import {
	SafeAreaView,
	StyleSheet,
	ScrollView,
	View,
	Text,
	StatusBar,
	Image,
  Button,
  Dimensions,
  TouchableOpacity,
  FlatList,
  ActivityIndicator
} from 'react-native';



export default class UploadImage extends Component {
  constructor(props){
  	super(props);
  	
  }

  chooseImage = () => {
    let options = {
      title: 'Select Image',
      customButtons: [
        // { name: 'customOptionKey', title: 'Choose Photo from Custom Option' },
      ],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.showImagePicker(options, (response) => {

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        const source = { uri: response.uri };

        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
        // alert(JSON.stringify(response));s
        // console.log('response', JSON.stringify(response.full));

        ImageCropPicker.openCropper({
          path: response.uri,
          width: 400,
          height: 400
        }).then(image => {

            const data = new FormData();
             data.append('userId', 'tanmay');
             data.append('selectedImage', {
              uri : image.path,
              type: image.mime,
              name: response.fileName
             });
             const config = {
              method: 'POST',
              headers: {
               'Accept': 'application/json',
               'Content-Type': 'multipart/form-data',
              },
              body: data,
             };

            fetch(Constants.BACKEND_API + '/image/upload', config)
             .then((response)=> response.json())
             .then((json) => {
              alert(json.msg);
              console.log(json.msg);

              ImageCropPicker.clean().then(() => {
                  console.log('removed all tmp images from tmp directory');
                }).catch(e => {
                  alert(e);
                });

              this.props.fetchImageUrls();
            }).catch((err)=>{console.error('Image upload error ! ',err)});

         });

      }
    });
  }

  render() {
    return (
    	
        <TouchableOpacity onPress={this.chooseImage} style={styles.btnSection}  >
          <Text style={styles.btnText}>Post Picture !</Text>
        </TouchableOpacity>
      
  
    );
  }
}



const styles = StyleSheet.create({

  btnParentSection: {
    alignItems: 'center',
    backgroundColor: 'gray',
    paddingTop:10
  },
  btnSection: {
    height: 45,
    backgroundColor: '#614181',
    // opacity: 0.7,
    alignItems: 'center',
    justifyContent: 'center',
    // borderRadius: 1000,
    borderWidth: 1,
    borderColor: 'gray'

  },
  btnText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 14,
    fontWeight:'bold'
  }
})


