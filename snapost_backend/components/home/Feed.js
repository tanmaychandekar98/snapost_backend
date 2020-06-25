// const backend_api = 'https://nameless-retreat-29732.herokuapp.com'


import React, { Fragment, Component } from 'react';
import ImagePicker from 'react-native-image-picker';
import * as Constants from '../../constants/Constants.js';
import DoubleClick from 'react-native-double-tap';
import FastImage from 'react-native-fast-image';
import UploadImage from './UploadImage.js';
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
		refreshing : false
	};
  }

  fetchImageUrls() {
	fetch(Constants.BACKEND_API + '/images/urls')
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

  likeImage(imgUrl) {
  	console.log('Image', imgUrl, 'liked !')
  	
  	fetch(Constants.BACKEND_API + '/image/like', {
	  method: 'POST',
	  headers: {
	    Accept: 'application/json',
	    'Content-Type': 'application/json',
	  },
	  body: JSON.stringify({
	    imgName: imgUrl
	  }),
	})
	.then(response => response.json())
	.then(json => {
		console.log(json.msg);
		this.fetchImageUrls();
	})
	.catch(error => console.log(error));
  }

  onRefresh() {
  	this.setState({ refreshing: true });
  	wait(2000).then(() => {this.setState({ refreshing: false});})
  	this.fetchImageUrls();
  }

  handleAccountClick(userId) {
  	console.log('User -', userId);
  }

  componentDidMount() {
	this.fetchImageUrls();

  }

  render() {
	const img_url_static = Constants.BACKEND_API + '/uploads/'
	return (
		this.state.isFetched ?
	  <View style={styles.container}>
	  	<StatusBar barStyle="light-content" backgroundColor="#614181" />
		<FlatList
		  	data={this.state.images}
		  	keyExtractor={(item) => item.imgName}
		  	refreshControl={
	          <RefreshControl refreshing={this.state.refreshing} onRefresh={this.state.onRefresh} />
	        }
		  	renderItem={({item}) =>
		  		<DoubleClick 
			        doubleTap={() => {
			          this.likeImage(item.imgName);
			        }}
			        delay={200}

		        >
		  			<FastImage
		  				style={styles.image}
		  				source={{ uri: img_url_static + item.imgName}}
		  			>
			  				<TouchableOpacity
			  					style={styles.accountBtn}
			  					onPress={() => this.props.navigation.navigate('ProfilePage', {
			  						userId: item.userId,
			  					})}
			  				>
				  				<Text style={styles.inlineTextLeft}>
				  					<Text style={{fontSize: 10,}}> Post by </Text>
				  					{item.userId}
				  				</Text>
			  				</TouchableOpacity>

			  				<Text style={styles.inlineTextRight}>
			  					{item.likes} {item.likes > 1 ? 'Likes!' : 'Like!'}
			  				</Text>


		  			</FastImage>
		  		</DoubleClick>
			}

		/>
		<UploadImage style={styles.uploadBtn} fetchImageUrls={this.fetchImageUrls.bind(this)}/>
	  </View>
	  :
	  	<View style={[styles.container, styles.horizontal]}>
	  		<ActivityIndicator size="large" color="#EC426B" />
		</View>
  
	);
  }
}



const styles = StyleSheet.create({
  container: {
   flex: 1,
   justifyContent: 'center',
   // alignItems: 'center',s
   backgroundColor: 'black'
   // paddingTop: 5,
  },
  image: {
  	// flex: 1,
  	flexDirection: 'row',
  	// justifyContent: 'center',
        alignContent: 'stretch',
  	opacity: 0.8,
	marginTop : 5,
	paddingTop: 10,
	height: 400,
	paddingTop: 3
  },
  uploadBtn: {
  	marginTop: -5
  },
  inlineTextLeft: {
  	flex:1,
  	// height:'8%',
  	// borderWidth:5,
  	fontSize: 20,
    fontWeight: '600',
  	color: 'white',
  	fontWeight: '500',
  	fontFamily: "Cochin",
  	paddingLeft: 10,
  	borderBottomWidth: 2,
  	borderBottomColor: 'white',
  	backfaceVisibility: 'visible',
  	textAlign: 'center',
  	// paddingBottom: 10,

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
  accountBtn: {
  	flex:1,
  	// zIndex: 1,
  	height:'8%',
  	// borderWidth:5,
  	
  	// textAlign: 'center',
  	// paddingBottom: 10,

  },
  imgContainer: {
  	flex:1,
  	flexDirection: 'row'
  }
})


