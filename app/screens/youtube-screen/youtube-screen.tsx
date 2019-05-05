import * as React from "react"
import { observer } from "mobx-react"
import { ViewStyle } from "react-native"
import { Text } from "../../components/text"
import { Screen } from "../../components/screen"
import { color } from "../../theme"
import { NavigationScreenProps } from "react-navigation"
import { TextInput, Button, View, TouchableOpacity } from 'react-native'
import config from '../../../config.json'

export interface YoutubeScreenProps extends NavigationScreenProps<{}> {
}

const ROOT: ViewStyle = {
  backgroundColor: color.palette.black,
  padding: '1%'
}

// @inject("mobxstuff")
@observer
export class YoutubeScreen extends React.Component<YoutubeScreenProps, {}> {

  constructor(props) {
    super(props);
    this.state = { text: '', data: [] };

    this.onGo = this.onGo.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  onGo() {
    console.log('[[[[[[[[[[[[[[[[[[[[[[[[[[[[[go]]]]]]]]]]]]]]]]]]]]]]]]]]]]]');

    fetch('https://www.googleapis.com/youtube/v3/search/?key=' + config.googleApiKey
      + '&q=' + encodeURI(this.state.text)
      + '&part=snippet,id&order=viewCount&maxResults=20')
    .then(res => {
      // console.log('[[[[[[res]]]]]]');
      // console.log(res);
      return res.json();
    })
    .then(res => {

      const videoId = []

      if (res.items) {

        res.items.forEach(item => {
          videoId.push(item)
        })
        this.setState({
          data: videoId
        })
      }
    })
    .catch(error => {
      console.error(error)
    })
  }

  handleKeyDown(e) {
    console.log('[[[[e.nativeEvent.key]]]]');
    console.log(e.nativeEvent.key);
    if(e.nativeEvent.key == "Enter"){
      dismissKeyboard();
      this.onGo();
    }
  };

  render () {
    return (
      <Screen style={ROOT} preset="fixedCenter">
        <Text preset="header" tx="youtubeScreen.header" />
        <View style={{flex: 1, flexDirection: 'row'}}>
          <TextInput style={{
            color: 'white',
            height: 40, width:'90%', borderColor: 'gray', borderWidth: 1, alignSelf: 'stretch'
          }} onChangeText={(text) => this.setState({text})}
          	value={this.state.text}
            onSubmitEditing={this.onGo}
          />
{/*
          <View style={{height: 40, width:'10%'}}>
            <Button
              onPress={this.onGo}
              title="GO!"
              color="#841584"
              accessibilityLabel="GO!"
            />
          </View>
*/}

          <TouchableOpacity style={{ height: 40, width:'10%', paddingHorizontal: 5, paddingVertical: 10, color:"#841584"}}
            onPress={this.onGo}
          >
            <Text color="#841584">GO!</Text>
          </TouchableOpacity>
        </View>

        {
          this.state.data.map((el, index) => {
            console.log('[[[[[[el.snippet.title]]]]]]')
            console.log(el)
            console.log('[[[[[[el.snippet.title]]]]]]')
            return (
              <Text key={index + ':' + el.id}
                style={{borderColor: 'gray', borderWidth: 1, alignSelf: 'stretch'}}
                onPress={() => {
                  Linking.openURL('http://google.com')
                }}
              >
                {el.snippet.title}
              </Text>
            )
          })
        }
      </Screen>
    )
  }
}
