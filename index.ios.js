/**
*/

'use strict';

var React = require('react-native');

//necessary import files
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput
} = React;

/**
  Forecast component to 
  print the forecast details
*/
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

/**
  Main component, which hosts both the UI 
  and also the ForeCast Component
*/
var WeatherProject = React.createClass({

  getInitialState : function() {
      return {
         margin : 25,
         forecast: null
      }
  },

  _handleTextChange: function(event) {
    var zip = event.nativeEvent.text;
    fetch('http://api.openweathermap.org/data/2.5/weather?q='
      + zip + '&units=imperial')
      .then((response) => response.json())
      .then((responseJSON) => {
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
        <TextInput style={{height: 40, borderColor: 'gray', borderWidth: 1, margin: this.state.margin }} placeholder="ZipCode" 
          onSubmitEditing={this._handleTextChange}/>
        {foreCastContent}
      </View>
    );
  }
});

/**
  Stylesheet container for this application
*/
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
  },
  backdrop: {
      flex: 1,
      flexDirection: 'column'
  }
});

AppRegistry.registerComponent('WeatherProject', () => WeatherProject);
