import {NextFunction, Request, Response} from "express";
import {Pool} from "mysql";

export const queryGetCustomer = (connection:Pool,email:string): Promise<any> =>{
    return new Promise((resolve,reject)=>{
        connection.query(`SELECT * FROM \`user\` WHERE email = '${email}'`, (error, results, fields)=>{
            if(error) return reject(error);

            if(results && results.length){
                return resolve(results[0]);
            }else{
                return reject("user not found");
            }
        });
    })
};

export default (pool:Pool) => (req:Request,res:Response,next:NextFunction) => {
    queryGetCustomer(pool,req.params.email).then(
        result => res.json(result),
        err => res.json(err)
    )
}
