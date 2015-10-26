/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var AsyncStorage = require('react-native').AsyncStorage;
var _ = require("lodash");

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
                {this.props.main}
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

  componentDidMount : function() {
      AsyncStorage.multiGet(['pincode'], (err,val) => {
          var obj = _.zipObject(val)
          var input = this.refs.pincode
          this.setState({
              pincode : obj['pincode']
          })
      })
  },

  getInitialState : function() {
      return {
         margin : 25,
         forecast: null, 
         pincode : null
      }
  },

    _handleTextChange: function(event) {
    var zip = event.nativeEvent.text;
    //http://api.openweathermap.org/data/2.5/weather?APPID=b222d50e3930d42b59b15b28f38553e2&q=600002
    fetch('http://api.openweathermap.org/data/2.5/weather?APPID=b222d50e3930d42b59b15b28f38553e2&q='
      + zip + '&units=imperial')
      .then((response) => response.json())
      .then((responseJSON) => {
        AsyncStorage.multiSet([
            ['pincode',zip]
        ],(err) => {
          if(err)
            throw err;
        })
        this.setState({
          forecast: {
            main: responseJSON.weather[0].main,
            description: responseJSON.weather[0].description,
            temp: responseJSON.main.temp
          }
        });
      })
      .catch((error) => {
        console.warn(error);
      });
  },

  render: function() {

    var foreCastContent = null

    if(this.state.forecast !=null)
      foreCastContent = <ForeCast main={this.state.forecast.main}
                  description={this.state.forecast.description}
                  temp={this.state.forecast.temp}/>;

    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Enter your zip code
        </Text>
        <TextInput ref="pincode" value={this.state.pincode} onChangeText={(text) => this.setState({ pincode: text })} style={{height: 40, borderColor: 'gray', borderWidth: 1, margin: this.state.margin }} placeholder="ZipCode" 
          onSubmitEditing={this._handleTextChange}/>
        {foreCastContent}
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
