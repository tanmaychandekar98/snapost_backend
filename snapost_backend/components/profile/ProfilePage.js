// const backend_api = 'https://nameless-retreat-29732.herokuapp.com'


import React, { Fragment, Component } from 'react';
import * as Constants from '../../constants/Constants.js';
import FastImage from 'react-native-fast-image';

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
  ActivityIndicator,
  RefreshControl
} from 'react-native';


export default class Feed extends Component {
  constructor(props){
  	super(props);
  	this.state = {
  		images : [],
  		isFetched : false,
  		refreshing : false,
      likesTotal : 0
  	};
  }

  fetchUserImageUrls() {
  fetch(Constants.BACKEND_API + '/images/urls/' + this.props.route.params.userId)
    .then((response) => response.json())
    .then((json) => {

      let images_arr = json.images;
      images_arr.sort((a,b) => b.likes - a.likes);
    this.setState({ images: images_arr });

    })
    .catch((error) => console.error(error))
    .finally(() => {
    this.setState({ isFetched : true });
    console.log('Image list fetch successful !')
    });
  }
  
  totalLikes() {
    let totalUserLikes = 0;
    let ratio = 0
    if(this.state.isFetched) {
      this.state.images.forEach((img) => totalUserLikes += img.likes);
      ratio = totalUserLikes/this.state.images.length;
      ratio = Math.round((ratio + Number.EPSILON) * 100) / 100
    }
    return <Text> {totalUserLikes} Likes! .. {ratio} Likes per Post </Text>;
  }

   componentDidMount() {
  this.fetchUserImageUrls();

  }

  render() {
    const img_url_static = Constants.BACKEND_API + '/uploads/'
	return (

		<View style={styles.container}>

      <StatusBar barStyle="dark-content" backgroundColor="white" />

      <View style={styles.headerContainer}>
          <Text style={styles.inlineTextLeft}>
            {this.props.route.params.userId}
          </Text>
          
            {this.totalLikes()}
        
      </View>


      <FlatList
        data={this.state.images}
        keyExtractor={(item) => item.imgName}
        renderItem={({item}) =>
          <TouchableOpacity onLongPress={() => alert('long press')} activeOpacity={0.9} >
            <FastImage
              style={styles.image}
              source={{ uri: img_url_static + item.imgName}}
            >

                <Text style={styles.inlineTextRight}>
                  {item.likes} {item.likes > 1 ? 'Likes!' : 'Like!'}
                </Text>

            </FastImage>
          </TouchableOpacity>
      }

    />
    </View>
  
	);
  }
}



const styles = StyleSheet.create({
  container: {
   flex: 1,
   // alignItems: 'center',
   justifyContent: 'center',
   // backgroundColor: 'black'
   // paddingTop: 5,
  },
  image: {
    // flex: 1,
    flexDirection: 'row',
    // justifyContent: 'center',
    alignContent: 'stretch',
    // opacity: 0.8,
    marginTop : 5,
    paddingTop: 10,
    height: 400,
    paddingTop: 3
  },
  headerContainer: {
    // flex:1,
    flexDirection: 'row',
  },
  inlineTextRight: {
    flex:1,
    height:'10%',
    justifyContent:'center',
    // borderWidth:5,
    // borderBottomWidth: 2,
    // borderBottomColor: 'white',
    fontSize: 20,
    fontWeight: '600',
    color: 'white',
    fontWeight: '500',
    textAlign: 'right',
    paddingRight: 10,
    fontFamily: "Roboto",

  },
  inlineTextLeft: {
    flex:1,
    // height:'8%',
    // borderWidth:5,
    fontSize: 20,
    fontWeight: '600',
    // color: 'white',
    fontWeight: '500',
    // fontFamily: "Cochin",
    paddingLeft: 10,
    // borderBottomWidth: 2,
    // borderBottomColor: 'white',
    // backfaceVisibility: 'visible',
    // textAlign: 'center',
    // paddingBottom: 10,

  },
})


