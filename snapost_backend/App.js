/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React, { Fragment, Component } from 'react';
import ImagePicker from 'react-native-image-picker';
import Feed from './components/home/Feed.js';
import ProfilePage from './components/profile/ProfilePage.js';
import Header from './components/home/Header.js';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as Constants from './constants/Constants.js'

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
  TouchableOpacity
} from 'react-native';

import {
	Colors
} from 'react-native/Libraries/NewAppScreen';

const Stack = createStackNavigator();

const App: () => React$Node = () => {
	return (
		<>
			<NavigationContainer>
				<Stack.Navigator>
        	<Stack.Screen
        		name="Feed"
        		component={Feed}
        		options={{
		          title: 'Snapost',
		          headerStyle: {
		            backgroundColor: '#614181',
		          },
		          headerTintColor: '#fff',
		          headerTitleStyle: {
		            fontWeight: 'bold',
		          },
		        }}
        		/>
        	<Stack.Screen name="ProfilePage" component={ProfilePage} />
      	</Stack.Navigator>
			</NavigationContainer>
			
			
		</>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'black',
	}
});

export default App;
