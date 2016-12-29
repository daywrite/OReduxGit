import React from 'react';
import {Dimensions, Image, InteractionManager, View, Text} from 'react-native';
var {height, width} = Dimensions.get('window');
import AppMain from './AppMain';
class Splash extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        const {navigator} = this.props;
        this.timer = setTimeout(() => {
            navigator.resetTo({component: AppMain, name: 'AppMain', navigationBarHidden: true});
        }, 2500);
    }
    componentWillUnmount() {
        this.timer && clearTimeout(this.timer);
    }
    render() {
        return (
            <View style={{
                flex: 1
            }}>
                <Image style={{
                    flex: 1,
                    width: width,
                    height: height
                }} source={require('../imgs/ic_welcome.jpg')}/>
            </View>
        );
    }
}
export default Splash;
