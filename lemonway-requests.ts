import request = require("request");
import {
    GetWalletDetailsByEmailRequest,
    GetWalletDetailsRequest, MoneyInWithCardIdRequest, MoneyOutRequest, RegisterCardRequest, RegisterIBANRequest,
    RegisterWalletRequest,
    SendPaymentRequest,
    UpdateWalletDetailsRequest
} from "./lemonway-types";
import {Response} from "request";

const lemonRequest = (methodName:string, versionNumber:string, postData:any) => {

    const urlDirectkit = "https://sandbox-api.lemonway.fr/mb/demo/dev/directkitjson2/Service.asmx/";
    const commonParams:any = {
        "wlLogin":  "society",
        "wlPass":   "123456",
        "language": "en",
        "walletIp": "1.1.1.1",
        "walletUa": "Node.js Typescript Tutorial",
        "version": versionNumber
    };

    for (let param of Object.keys(commonParams)) {
        postData[param] = commonParams[param];
    }

    let options = {
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
                //console.log("Request error"+error);
                reject("Request error"+error);
            } else if (response.statusCode != 200) {
                //console.log("HTTP error " + response.statusCode + ": " + body.Message);
                reject("HTTP error  " + response.statusCode + ": " + body.Message)
            } else {
                if (body.d.E) {
                    //console.log("API error" +body.d.E);
                    reject("API error" +body.d.E)
                } else {
                    resolve(body.d);
                }
            }
        });
    });

};


export const RegisterWallet = (params:RegisterWalletRequest) => lemonRequest("RegisterWallet","1.1", params);

export const GetWalletDetails = (params:GetWalletDetailsRequest|GetWalletDetailsByEmailRequest) => lemonRequest("GetWalletDetails","2.0", params);

export const UpdateWalletDetails = (params:UpdateWalletDetailsRequest) => lemonRequest("UpdateWalletDetails", "1.0", params);

export const RegisterCard = (params:RegisterCardRequest) => lemonRequest("RegisterCard","1.2", params);

export const MoneyInWithCardId = (params:MoneyInWithCardIdRequest) => lemonRequest("MoneyInWithCardId","1.1", params);

export const SendPayment = (params:SendPaymentRequest) => lemonRequest("SendPayment","1.0", params);

export const RegisterIBAN = (params:RegisterIBANRequest) => lemonRequest("RegisterIBAN","1.1", params);

export const MoneyOut = (params:MoneyOutRequest) => lemonRequest("MoneyOut","1.3", params);