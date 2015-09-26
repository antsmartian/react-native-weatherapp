/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput
} = React;

var WeatherProject = React.createClass({

  getInitialState : function() {
      return {
         margin : 25
      }
  },

  render: function() {
    return (
      <View style={styles.container}>
        <Text>
          Enter your zip code
        </Text>
        <TextInput style={{height: 40, borderColor: 'gray', borderWidth: 1, margin: this.state.margin }} placeholder="ZipCode" />
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});

AppRegistry.registerComponent('WeatherProject', () => WeatherProject);
