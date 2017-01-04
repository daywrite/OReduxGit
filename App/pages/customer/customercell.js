'use strict';
import React, {Component} from 'react';
import {
    Image,
    Platform,
    StyleSheet,
    Text,
    TouchableHighlight,
    TouchableNativeFeedback,
    View,
    TouchableOpacity
} from 'react-native';
const HOUSE = require('../../imgs/commom/Create.png');
import {SwipeListView, SwipeRow} from 'react-native-swipe-list-view';
export default class customercell extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        var TouchableElement = TouchableHighlight;
        if (Platform.OS === 'android') {
            TouchableElement = TouchableNativeFeedback;
        }
        return (
            <View style={styles.container}>
                <SwipeRow disableRightSwipe={true} leftOpenValue={75} rightOpenValue={-75}>
                    <View style={styles.standaloneRowBack}>
                        <Text style={styles.backTextWhite}>Left</Text>
                        {/* <View style={[styles.backRightBtn, styles.backRightBtnLeft]}>
                            <Text style={styles.backTextWhite}>编辑</Text>
                        </View> */}
                        <TouchableOpacity style={[styles.backRightBtn, styles.backRightBtnRight]} onPress={this.props.onDelete}>
                            <Text style={styles.backTextWhite}>删除</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableElement onPress={this.props.onSelect} delayLongPress={2000} onLongPress={() => {
                            alert(1)
                        }} onShowUnderlay={this.props.onHighlight} onHideUnderlay={this.props.onUnhighlight}>
                            <View style={styles.row}>
                                <Image source={HOUSE} style={styles.cellImage}/>
                                <View style={styles.textContainer}>
                                    <Text style={styles.movieTitle} numberOfLines={2}>
                                        {this.props.model.Name}
                                    </Text>
                                    <Text style={styles.movieYear} numberOfLines={1}>
                                        {this.props.model.TelPhone}
                                    </Text>
                                </View>
                            </View>
                        </TouchableElement>
                    </View>
                </SwipeRow>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1
    },
    standaloneRowFront: {
        alignItems: 'center',
        backgroundColor: '#CCC',
        justifyContent: 'center',
        height: 50
    },
    standaloneRowBack: {
        alignItems: 'center',
        backgroundColor: '#8BC645',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 15
    },
    backTextWhite: {
        color: '#FFF'
    },
    textContainer: {
        flex: 1
    },
    movieTitle: {
        flex: 1,
        fontSize: 16,
        fontWeight: '500',
        marginBottom: 2
    },
    movieYear: {
        color: '#999999',
        fontSize: 12
    },
    row: {
        alignItems: 'center',
        backgroundColor: 'white',
        flexDirection: 'row',
        padding: 5
    },
    cellImage: {
        backgroundColor: '#dddddd',
        height: 93,
        marginRight: 10,
        width: 75
    },
    cellBorder: {
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        height: StyleSheet.hairlineWidth,
        marginLeft: 4
    },
    backRightBtn: {
        alignItems: 'center',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: 75
    },
    backRightBtnLeft: {
        backgroundColor: 'green',
        right: 75
    },
    backRightBtnRight: {
        backgroundColor: '#d74047',
        right: 0
    }
});
