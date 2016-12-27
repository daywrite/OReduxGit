import React from 'react';
import {
    StyleSheet,
    Navigator,
    StatusBar,
    BackAndroid,
    View,
    Platform,
    Text,
    NavigatorIOS
} from 'react-native';
import Splash from './pages/Splash';
const defaultRoute = {
    title: 'Splash',
    name: 'Splash',
    component: Splash,
    navigationBarHidden: true
}
class App extends React.Component {
    renderScene(route, navigator) {
        let Component = route.component;
        //_navigator = navigator;
        return (<Component navigator={navigator} {...route.passProps}/>);
    }
    configureScene(route, routeStack) {
        return Navigator.SceneConfigs.PushFromRight;
    }
    render() {
        return (
            <View style={styles.container}>
                <StatusBar style={styles.statusBar} barStyle='light-content' backgroundColor='transparent'/>
                <NavigatorIOS style={styles.navigator} initialRoute={defaultRoute} configureScene={this.configureScene} renderScene={this.renderScene}/>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    statusBar: {
        height: Platform.OS === 'ios'
            ? 20
            : 25
    },
    navigator: {
        flex: 1
    }
});
export default App;
