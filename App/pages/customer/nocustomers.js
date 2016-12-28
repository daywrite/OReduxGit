import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    NavigatorIOS,
    Navigator
} from 'react-native';
export default class nocustomers extends Component {
    render() {
        let showText = '';
        if (this.props.filter) {
            showText = `没有找到 "${this.props.filter}"相关客户`;
        } else if (!this.props.isLoading) {
            // If we're looking at the latest movies, aren't currently loading, and
            // still have no results, show a message
            showText = '没有找到客户';
        }
        return (
            <View style={[styles.container, styles.centerText]}>
                <Text style={styles.noMoviesText}>{showText}</Text>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    centerText: {
        alignItems: 'center'
    },
    noMoviesText: {
        marginTop: 80,
        color: '#888888'
    }
});
