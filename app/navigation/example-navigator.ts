import { createStackNavigator } from "react-navigation"
import { YoutubeScreen } from "../screens/youtube-screen"
import { FirstExampleScreen } from "../screens/first-example-screen"
import { SecondExampleScreen } from "../screens/second-example-screen"

export const ExampleNavigator = createStackNavigator({
  youtubeScreen: { screen: YoutubeScreen },
  secondExample: { screen: SecondExampleScreen },
  firstExample: { screen: FirstExampleScreen },
},
{
  headerMode: "none",
  initialRouteName: "youtubeScreen"
  // initialRouteName: "youtube"
})
