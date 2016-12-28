'use strict';
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    ActivityIndicator,
    Platform
} from 'react-native';
export default class SearchBar extends Component {
    render() {
        return (
            <View style={styles.searchBar}>
                <TextInput autoCapitalize='none' autoCorrect={false} onChange={this.props.onSearchChange} placeholder="请输入手机号或者姓名" onFocus={this.props.onFocus} style={styles.searchBarInput}/>
                <ActivityIndicator animating={this.props.isLoading} style={styles.spinner}/>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    searchBar: {
        padding: 3,
        paddingLeft: 8,
        flexDirection: 'row',
        alignItems: 'center'
    },
    searchBarInput: {
        fontSize: 15,
        flex: 1,
        height: 30
    },
    spinner: {
        width: 30
    }
});
