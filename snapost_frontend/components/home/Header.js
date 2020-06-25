/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 * @format
 */

import type {Node} from 'react';
import {Text, StyleSheet, ImageBackground} from 'react-native';
import React from 'react';
import {
  Colors
} from 'react-native/Libraries/NewAppScreen';


const Header = (): Node => (
  <ImageBackground
    accessibilityRole={'image'}
    source={require('./background_header.jpg')}
    style={styles.background}
    imageStyle={styles.logo}>
    <Text style={styles.text}>SNAPOST</Text>
  </ImageBackground>
);

const styles = StyleSheet.create({
  background: {
    paddingBottom: 10,
    paddingTop: 12,
    paddingHorizontal: 32,
    backgroundColor: Colors.lighter,
  },
  logo: {
    opacity: 0.8,
    overflow: 'visible',
    resizeMode: 'cover',
    /*
     * These negative margins allow the image to be offset similarly across screen sizes and component sizes.
     *
     * The source logo.png image is 512x512px, so as such, these margins attempt to be relative to the
     * source image's size.
     */
    // marginBottom: -10,
    marginLeft: -128,
  },
  text: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'right',
    color: Colors.white,
    fontFamily: 'monospace'
  },
});

export default Header;
