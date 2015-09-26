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

var ForeCast = React.createClass({
    render : function() {
        return (
            <View>
              <Text>
                ForeCast Details {this.props.main}
              </Text>
              <Text>
                Current Conditions {this.props.description}
              </Text>
              <Text>
                 {this.props.temp} °F
              </Text>
            </View>
        )
    }
})

var WeatherProject = React.createClass({

  getInitialState : function() {
      return {
         margin : 25,
         forecast: {
            main : "Main details",
            description : "dummy",
            temp : "35"
         }
      }
  },

  render: function() {

    var foreCastContent = <ForeCast main={this.state.forecast.main}
                  description={this.state.forecast.description}
                  temp={this.state.forecast.temp}/>;

    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Enter your zip code
        </Text>
        <TextInput style={{height: 40, borderColor: 'gray', borderWidth: 1, margin: this.state.margin }} placeholder="ZipCode" />
        {foreCastContent}
      </View>
    );
  }
});

var styles = StyleSheet.create({
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
    container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 60
  }
});

AppRegistry.registerComponent('WeatherProject', () => WeatherProject);
