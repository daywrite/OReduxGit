import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    NavigatorIOS,
    AlertIOS,
    ListView,
    Platform,
    ActivityIndicator,
    TouchableOpacity,
    AsyncStorage
} from 'react-native';
import SearchBar from './searchbar';
import Nocustomers from './nocustomers';
import Customercell from './customercell';
import CustomerDetail from './customerdetail';
import {BASE_URL} from '../../common/Config';
var resultsCache = {
    dataForQuery: {},
    nextPageNumberForQuery: {},
    totalForQuery: {}
};
var LOADING = {};
var userId = '0';
export default class Customer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            isLoadingTail: false,
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2
            }),
            filter: '',
            queryNumber: 0
        };
    }
    /**
     * 待dom加载完成开始执行
     */
    componentDidMount() {
        //用Id－查询内容
        console.log('获取authId');
        AsyncStorage.getItem('authId').then((data, error) => {
            userId = data;
            console.log(userId);
            this.searchCustomers(userId, '')
        });
    }
    /**
     * 真正的客户搜索方法
     */
    getDataSource(customers) : ListView.DataSource {return this.state.dataSource.cloneWithRows(customers);}
    searchCustomers(userid, query) {
        //设置查询字符更新customerContent
        this.setState({filter: query});
        // var cachedResultsForQuery = resultsCache.dataForQuery[query];
        // if (cachedResultsForQuery) {
        //     if (!LOADING[query]) {
        //         this.setState({dataSource: this.getDataSource(cachedResultsForQuery), isLoading: false});
        //     } else {
        //         this.setState({isLoading: true});
        //     }
        //     return;
        // }
        LOADING[query] = true;
        resultsCache.dataForQuery[query] = null;
        this.setState({
            isLoading: true,
            queryNumber: this.state.queryNumber + 1,
            isLoadingTail: false
        });
        //网络请求
        //console.log(this.urlForQueryAndPage(userid, 1, query));
        fetch(this.urlForQueryAndPage(userid, 1, query)).then((r) => r.json()).catch((error) => {
            LOADING[query] = false;
            resultsCache.dataForQuery[query] = undefined;
            this.setState({dataSource: this.getDataSource([]), isLoading: false});
        }).then((rj) => {
            LOADING[query] = false;
            console.log(rj);
            resultsCache.totalForQuery[query] = rj.result.total;
            resultsCache.dataForQuery[query] = rj.result.customers;
            resultsCache.nextPageNumberForQuery[query] = 2;
            if (this.state.filter !== query) {
                // do not update state if the query is stale
                return;
            }
            this.setState({
                isLoading: false,
                dataSource: this.getDataSource(rj.result.customers)
            });
        }).done();
    }
    /**
     * 搜索框输入变化事件
     */
    onSearchChange(event) {
        var filter = event.nativeEvent.text.toLowerCase();
        this.timer && clearTimeout(this.timer);
        this.timer = setTimeout(() => this.searchCustomers(userId, filter), 500);
    }
    renderFooter() {
        if (!this.hasMore() || !this.state.isLoadingTail) {
            return <View style={styles.scrollSpinner}/>;
        }
        return <ActivityIndicator style={styles.scrollSpinner}/>;
    }
    hasMore() {
        var query = this.state.filter;
        if (!resultsCache.dataForQuery[query]) {
            return true;
        }
        return (resultsCache.totalForQuery[query] !== resultsCache.dataForQuery[query].length);
    }
    onEndReached() {
        var query = this.state.filter;
        var userid = userId;
        if (!this.hasMore() || this.state.isLoadingTail) {
            // We're already fetching or have all the elements so noop
            return;
        }
        if (LOADING[query]) {
            return;
        }
        LOADING[query] = true;
        this.setState({
            queryNumber: this.state.queryNumber + 1,
            isLoadingTail: true
        });
        var page = resultsCache.nextPageNumberForQuery[query];
        //(page != null, 'Next page number for "%s" is missing', query);
        //console.log(this.urlForQueryAndPage(userid, query, page));
        fetch(this.urlForQueryAndPage(userid, page, query)).then((response) => response.json()).catch((error) => {
            console.error(error);
            LOADING[query] = false;
            this.setState({isLoadingTail: false});
        }).then((responseData) => {
            var moviesForQuery = resultsCache.dataForQuery[query].slice();
            LOADING[query] = false;
            // We reached the end of the list before the expected number of results
            if (!responseData.result.customers) {
                resultsCache.totalForQuery[query] = moviesForQuery.length;
            } else {
                for (var i in responseData.result.customers) {
                    moviesForQuery.push(responseData.result.customers[i]);
                }
                resultsCache.dataForQuery[query] = moviesForQuery;
                resultsCache.nextPageNumberForQuery[query] += 1;
            }
            if (this.state.filter !== query) {
                // do not update state if the query is stale
                return;
            }
            this.setState({
                isLoadingTail: false,
                dataSource: this.getDataSource(resultsCache.dataForQuery[query])
            });
        }).done();
    }
    renderSeparator(sectionID, rowID, adjacentRowHighlighted) {
        var style = styles.rowSeparator;
        if (adjacentRowHighlighted) {
            style = [style, styles.rowSeparatorHide];
        }
        return (<View key={'SEP_' + sectionID + '_' + rowID} style={style}/>);
    }
    /**
     * 查询到的主体客户内容
     */
    customerContent() {
        if (this.state.dataSource.getRowCount() === 0) {
            return (<Nocustomers filter={this.state.filter} isLoading={this.state.isLoading}/>);
        } else {
            return (
                <ListView ref="listview" renderSeparator={this.renderSeparator.bind(this)} dataSource={this.state.dataSource} renderFooter={this.renderFooter.bind(this)} renderRow={this.renderRow.bind(this)} onEndReached={this.onEndReached.bind(this)} automaticallyAdjustContentInsets={false} keyboardDismissMode="on-drag" keyboardShouldPersistTaps={true} showsVerticalScrollIndicator={false}></ListView>
            );
        }
    }
    /**
     * customerContent内容获取的url地址
     */
    urlForQueryAndPage(userId, pageNumber, query) {
        return (BASE_URL + 'customer/query/' + userId + '/' + pageNumber + '/' + encodeURIComponent(query));
    }
    /**
     * ListView每一行数据展示
     */
    renderRow(rowData, sectionID, rowID, highlightRow) {
        return (<Customercell model={rowData} onSelect={() => this.selectCustomer(rowData)} onHighlight={() => highlightRow(sectionID, rowID)} onUnhighlight={() => highlightRow(null, null)}/>);
    }
    selectCustomer(model) {
        const {navigator} = this.props;
        if (navigator) {
            navigator.push({title: model.Name, component: CustomerDetail, navigationBarHidden: true, passProps: {
                    model
                }});
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <SearchBar onSearchChange={this.onSearchChange.bind(this)} isLoading={this.state.isLoading} onFocus={() => this.refs.listview && this.refs.listview.getScrollResponder().scrollTo({x: 0, y: 0})}/>
                <View style={styles.separator}></View>
                {this.customerContent()}
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    separator: {
        height: 1,
        backgroundColor: '#eeeeee'
    },
    rowSeparator: {
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        height: 1,
        marginLeft: 4
    },
    rowSeparatorHide: {
        opacity: 0.0
    }
});
