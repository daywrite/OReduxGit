import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity
} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import Customer from '../customer/index';
import CustomerHeader from '../customer/header';
import Personal from '../personal/index';
import PersonalHeader from '../personal/header';
const CUSTOMER = 'home';
const CUSTOMER_NORMAL = require('../../imgs/tabs/home_normal.png');
const CUSTOMER_FOCUS = require('../../imgs/tabs/home_focus.png');
const PERSONAL = 'personal';
const PERSONAL_NORMAL = require('../../imgs/tabs/personal_normal.png');
const PERSONAL_FOCUS = require('../../imgs/tabs/personal_focus.png');
export default class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: CUSTOMER
        }
    }
    static _createChildView(tag) {
        return (
            <View style={{
                flex: 1,
                backgroundColor: '#00baff',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <Text style={{
                    fontSize: 22
                }}>{tag}</Text>
            </View>
        )
    }
    /**
     * 底部菜单生成
     */
    _renderTabItem(img, selectedImg, tag, childView) {
        return (
            <TabNavigator.Item selected={this.state.selectedTab === tag} renderIcon={() => <Image style={styles.tabIcon} source={img}/>} renderSelectedIcon={() => <Image style={styles.tabIcon} source={selectedImg}/>} onPress={() => this.setState({selectedTab: tag})}>
                {childView}
            </TabNavigator.Item>
        );
    }
    /**
     * 每个菜单页面的顶部
     */
    _renderHeader() {
        if (this.state.selectedTab === CUSTOMER) {
            return (<CustomerHeader navigator={this.props.navigator}/>);
        } else if (this.state.selectedTab === PERSONAL) {
            return (<PersonalHeader/>);
        } else {
            return null;
        }
    }
    render() {
        return (
            <View style={styles.container}>
                {this._renderHeader()}
                <TabNavigator hidesTabTouch={true} tabBarStyle={styles.tab}>
                    {this._renderTabItem(CUSTOMER_NORMAL, CUSTOMER_FOCUS, CUSTOMER, < Customer navigator = {
                        this.props.navigator
                    } />)}
                    {this._renderTabItem(PERSONAL_NORMAL, PERSONAL_FOCUS, PERSONAL, < Personal navigator = {
                        this.props.navigator
                    } />)}
                </TabNavigator>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    tab: {
        height: 52,
        backgroundColor: '#303030',
        alignItems: 'center'
    },
    tabIcon: {
        width: 30,
        height: 35,
        resizeMode: 'stretch',
        marginTop: 12.5
    }
});
