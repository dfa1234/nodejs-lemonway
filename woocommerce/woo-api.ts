import  * as OAuth   from 'oauth-1.0a';
import  * as crypto  from 'crypto';
import request = require("request");

const conf = {
    url:'http://XXX',
    wpAPI           : 'wc',
    wpAPIPrefix     : 'wp-json',
    version         : 'v2',
    consumerKey     : 'XXX',
    consumerSecret  : 'XXX',
    isSsl           : false,
    verifySsl       : false,
    queryStringAuth : true
};

conf['isSsl'] = /^https/i.test(conf.url);


import {CoreOptions, OptionsWithUri, OptionsWithUrl, Request, RequestCallback} from "request";


const getOAuth = () => {
    const hash_function = (base_string:string, key:string) => crypto.createHmac('sha256', key).update(base_string).digest('base64');

    const data:any = {
        consumer: {
            key: conf.consumerKey,
            secret: conf.consumerSecret
        },
        signature_method: 'HMAC-SHA256',
        hash_function : hash_function,
        last_ampersand : false
    };

    return new OAuth(data);
};

/*
let OAuth = {
    oauth_consumer_key : "ck_06a185b053ea22819151fc3b81c5cb96286f6547",
        oauth_signature_method : "HMAC-SHA1",
        oauth_timestamp : "1519058922",
        oauth_nonce : "94epm4SxQ8V",
        oauth_version : "1.0",
        oauth_signature : "tOkCiKe4AbsKkFz0ci%2FK6Vpp1xE%3D"
};

let qs =
{ oauth_consumer_key: 'ck_06a185b053ea22819151fc3b81c5cb96286f6547',
    oauth_signature_method: 'HMAC-SHA256',
    oauth_timestamp: 1519059687,
    oauth_nonce: '2f4hPkcoqRPsxyWa2JobTBUjDiTPRecF',
    oauth_version: '1.0',
    oauth_signature: 'PfatZ4+l+ulWHci0rxe4aZycjBdl2pHPr+HslztTY7M=' };
   */


const doRequest = (method:string, endpoint:string, data:any, callback:RequestCallback):Request => {

    let url = `${conf.url}/${conf.wpAPIPrefix}/${conf.wpAPI}/${conf.version}/${endpoint}`;

    const params:OptionsWithUrl = {
        url,
        method,
        encoding: 'utf8',
        timeout: 5000,
        headers: {
            'User-Agent': 'WooCommerce API TYPESCRIPT/ 1.4.2',
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=utf-8'
            //,'Authorization':'OAuth oauth_consumer_key="ck_06a185b053ea22819151fc3b81c5cb96286f6547",oauth_signature_method="HMAC-SHA1",oauth_timestamp="1519058922",oauth_nonce="94epm4SxQ8V",oauth_version="1.0",oauth_signature="tOkCiKe4AbsKkFz0ci%2FK6Vpp1xE%3D"'
        }
    };


    if (conf.isSsl) {
        if (conf.queryStringAuth) {
            params.qs = {
                consumer_key: conf.consumerKey,
                consumer_secret: conf.consumerSecret
            };
        } else {
            params.auth = {
                user: conf.consumerKey,
                pass: conf.consumerSecret
            };
        }

        if (!conf.verifySsl) {
            params.strictSSL = false;
        }
    } else {
        //params.qs = getOAuth().authorize({url, method});
        params.qs = {
            oauth_consumer_key : "XXX",
            oauth_signature_method : "HMAC-SHA1",
            oauth_timestamp : "1519058922",
            oauth_nonce : "94epm4SxQ8V",
            oauth_version : "1.0",
            oauth_signature : "XXX"
        }
    }


    if (data) {
        params.body = JSON.stringify(data);
    }

    if (!callback) {
        return request(params);
    }

    console.log(params);

    return request(params, callback);
};


export default {
    get:(endpoint:string, callback:RequestCallback) => doRequest('GET', endpoint, null, callback),
    post:(endpoint:string, data:{}, callback:RequestCallback) => doRequest('POST', endpoint, data, callback),
    put:(endpoint:string, data:{}, callback:RequestCallback) => doRequest('PUT', endpoint, data, callback),
    del:(endpoint:string, callback:RequestCallback) => doRequest('DELETE', endpoint, null, callback),
    options:(endpoint:string, callback:RequestCallback) => doRequest('OPTIONS', endpoint, null, callback)
};

