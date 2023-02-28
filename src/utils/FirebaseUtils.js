import { sendEmailVerification } from "firebase/auth";

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