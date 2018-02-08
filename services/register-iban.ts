import {NextFunction, Request, Response} from "express";
import {Pool} from "mysql";

const registerIban = (connection:Pool): Promise<boolean> =>{
    return new Promise((resolve,reject)=>{
        return resolve(true);
    })
};

export default (pool:Pool) => (req:Request,res:Response,next:NextFunction) => {
    //TODO
}
