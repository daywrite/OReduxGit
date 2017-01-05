import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
    TextInput,
    TouchableOpacity,
    Platform
} from 'react-native';
var winHeight = Dimensions.get('window').height;
import ForgetPassWordHeader from './forgetpasswordheader';
class ForgetPassword extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <View style={styles.container}>
                <ForgetPassWordHeader navigator={this.props.navigator}/>
                <View style={styles.hr}></View>
                <View style={styles.connect}>
                    <View style={styles.connectcontent}>
                        <View style={styles.admin}>
                            <Text style={{
                                fontWeight: '500'
                            }}>请联系管理员</Text>
                        </View>
                        <Text>
                            1.请拨打<Text style={styles.phone}>13301160072</Text>
                        </Text>
                        <Text>
                            2.请加微信<Text style={styles.phone}>582956443</Text>，注明［客户通］
                        </Text>
                    </View>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        height: winHeight,
        //backgroundColor: 'green'
    },
    admin: {
        borderBottomColor: '#d74047',
        borderBottomWidth: 1,
        paddingBottom: 10
    },
    hr: {
        height: 20,
        backgroundColor: '#f5f5f5'
    },
    connect: {
        height: 100,
        //backgroundColor: 'red'
    },
    phone: {
        color: '#2e8b57'
    },
    connectcontent: {
        height: 100,
        marginLeft: 15,
        marginRight: 15,
        //backgroundColor: 'orange',
        flex: 1,
        justifyContent: 'space-around'
    }
});
export default ForgetPassword
