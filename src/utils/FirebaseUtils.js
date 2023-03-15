import { sendEmailVerification, sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase";

export function sendEmail(user) {

    return new Promise(async (resolve, reject) => {
        if (!user) {
            reject("user is undefined")
        }

        sendEmailVerification(user)
            .then(() => {
                console.log("verification email sent")
                resolve("Verification mail sent successfull!");
            }).catch((e) => {
                 
                reject("error occured while sending email!!")
            })

    })


}

export function resetPassword(email){
    return new Promise(async(resolve, reject) => {
        if(!email)
            reject("Not a valid email")
        sendPasswordResetEmail(auth, email)
            .then(() => {
                console.log("password reset email sent")
                resolve("password reset sent successfull!");
            }).catch((e) => {
                console.log("error sending password reset email")
                resolve("error sending password reset email");
            })
    })
}
