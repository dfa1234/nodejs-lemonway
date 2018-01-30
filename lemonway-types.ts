export interface RegisterWalletRequest {
    "wallet": string,//payerWallet ID or receiverWallet ID
    "clientMail": string,
    "clientFirstName": string,
    "clientLastName": string
}

export interface GetWalletDetailsRequest {
    "wallet": string//payerWallet ID or receiverWallet ID
}

export interface GetWalletDetailsByEmailRequest {
    "email": string //payerWallet or receiverWallet + "@lemonway.com"
}

export interface UpdateWalletDetailsRequest {
    "wallet": string,
    "newEmail": string
}

export interface RegisterCardRequest {
    "wallet": string,//payerWallet
    "cardType": string,//"1"
    "cardNumber": string,//"5017670000006700"
    "cardCode": string,//"123"
    "cardDate": string,//"12/2026"
}

export interface MoneyInWithCardIdRequest {
    "wallet": string,//payerWallet
    "cardId": string,//cardId
    "amountTot": string,//"100.00"
    "amountCom": string,//"10.00"
    "comment": string,//"MoneyInWithCardId 100.00€ to Payer"
}

export interface SendPaymentRequest {
    "debitWallet": string,//payerWallet,
    "creditWallet": string,//receiverWallet,
    "amount": string,//"10.00",
    "message": string,//"SendPayment 10.00€ from Payer to Receiver"
}

export interface RegisterIBANRequest{
    "wallet": string,//receiverWallet,
    "holder": string,//"Receiver Receiver",
    "bic": string,//"ABCDEFGHIJK",
    "iban": string,//"FR1420041010050500013M02606",
    "dom1": string,//"UNEBANQUE MONTREUIL",
    "dom2": string,//"56 rue de Lays",
    "comment": string,//"Register IBAN"
}

export interface MoneyOutRequest{
    "wallet": string,//receiverWallet,
    "amountTot": string,//"10.00",
    "message": string,//"Money Out 10.00€",
    "ibanId": string,//ibanId,
    "autoCommission": string,//"1"
}
