"use server"
import bcrypt from "bcrypt"


export const hashPassword: (password: string) => Promise<string> = async (password: string) => {

    return new Promise((resolve, reject) => {
        bcrypt.hash(password, 10, (err, hash) => {
            if (err) {
                reject(new Error("ERR_HASHING"));
            }
            else {
                resolve(hash);
            }
        })
    })
}



export const comparePassword = async (hashPassword: string, userPassword: string) => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(userPassword, hashPassword, (err, result) => {
            if (err) {
                reject(err)
            }
            else {
                resolve(result)
            }
        })
    })
}