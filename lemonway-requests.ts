import request = require("request");
import {
    GetWalletDetailsByEmailRequest,
    GetWalletDetailsRequest, MoneyInWithCardIdRequest, MoneyOutRequest, RegisterCardRequest, RegisterIBANRequest,
    RegisterWalletRequest,
    SendPaymentRequest,
    UpdateWalletDetailsRequest
} from "./lemonway-types";
import {Response} from "request";
import config from "./config";

const lemonRequest = (methodName:string, versionNumber:string, postData:any) => {

    const urlDirectkit = "https://sandbox-api.lemonway.fr/mb/demo/dev/directkitjson2/Service.asmx/";
    const commonParams:any = config.walletLemonWay;
    commonParams.version = versionNumber;

    for (let param of Object.keys(commonParams)) {
        postData[param] = commonParams[param];
    }

    const options = {
        url: urlDirectkit + methodName,
        method: "POST",
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        },
        json: { "p": postData }
    };

    return new Promise((resolve, reject) => {
        request(options, (error:any, response:Response, body:any) => {
            if(error) {
                reject("Request error"+error);
            } else if (response.statusCode != 200) {
                reject("HTTP error  " + response.statusCode + ": " + body.Message)
            } else {
                if (body.d.E) {
                    reject("API error" +JSON.stringify(body.d.E))
                } else {
                    resolve(body.d);
                }
            }
        });
    }).catch(e => {
        console.log('CATCHED:',e)
    })

};


export const RegisterWallet = (params:RegisterWalletRequest) => lemonRequest("RegisterWallet","1.1", params);

export const GetWalletDetails = (params:GetWalletDetailsRequest|GetWalletDetailsByEmailRequest) => lemonRequest("GetWalletDetails","2.0", params);

export const UpdateWalletDetails = (params:UpdateWalletDetailsRequest) => lemonRequest("UpdateWalletDetails", "1.0", params);

export const RegisterCard = (params:RegisterCardRequest) => lemonRequest("RegisterCard","1.2", params);

export const MoneyInWithCardId = (params:MoneyInWithCardIdRequest) => lemonRequest("MoneyInWithCardId","1.1", params);

export const SendPayment = (params:SendPaymentRequest) => lemonRequest("SendPayment","1.0", params);

export const RegisterIBAN = (params:RegisterIBANRequest) => lemonRequest("RegisterIBAN","1.1", params);

export const MoneyOut = (params:MoneyOutRequest) => lemonRequest("MoneyOut","1.3", params);