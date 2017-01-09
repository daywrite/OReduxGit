'use strict';
import React, {Component} from 'react';
import {
    Image,
    Platform,
    StyleSheet,
    Text,
    TouchableHighlight,
    TouchableNativeFeedback,
    View
} from 'react-native';
import CustomerDetailHeader from './customerdetailheader';
const HOUSE = require('../../imgs/commom/Create.png');
import {BASE_URL} from '../../common/Config';
export default class customerdetail extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        console.log(BASE_URL + 'pic/' + this.props.model.PicUrl);
        return (
            <View>
                <CustomerDetailHeader navigator={this.props.navigator} model={this.props.model}/>
                <View style={styles.pic}>
                    <Image source={{
                        uri: BASE_URL + 'pic/' + this.props.model.PicUrl
                    }} style={styles.cellImage}/>
                </View>
                <View style={styles.content}>
                    <View>
                        <Text>姓名：<Text style={styles.text}>{this.props.model.Name}</Text>
                        </Text>
                    </View>
                    <View style={styles.telphone}>
                        <Text>电话：<Text style={styles.text}>{this.props.model.TelPhone}</Text>
                        </Text>
                    </View>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    pic: {
        height: 200,
        //backgroundColor: '#dddddd',
        alignItems: 'center',
        justifyContent: 'center'
    },
    content: {
        marginTop: 20,
        marginLeft: 20,
        marginRight: 20,
        borderTopWidth: 1,
        borderTopColor: '#d74047',
        paddingTop: 20
    },
    telphone: {
        marginTop: 20
    },
    text: {
        color: '#2e8b57'
    },
    cellImage: {
        backgroundColor: '#dddddd',
        height: 120,
        marginRight: 10,
        width: 90
    }
});
