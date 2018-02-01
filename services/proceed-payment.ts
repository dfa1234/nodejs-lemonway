import {NextFunction, Request, Response} from "express";
import {Pool} from "mysql";

const proceedPayment = (connection:Pool): Promise<boolean> =>{
    return new Promise((resolve,reject)=>{
        return resolve(true);
    })
};

export default (pool:Pool) => (req:Request,res:Response,next:NextFunction) => {
    //TODO
}
