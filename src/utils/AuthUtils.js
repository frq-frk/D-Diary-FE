import axios from 'axios'

export const emailValidator = (email) => {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
}

export const passwordValidator = (password) => {
    var re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return re.test(password);
}

export function createProfile(token){
    console.log(`in create profile function ${token}`)
    axios.post('http://3.26.97.225/api/v1/user/create-profile',{}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => {
        console.log(res)
        if(res.statusCode === 200)
          console.log("successfully created the profile")
        return true;
      }).catch(e => {
        console.log("error creating profiles")
        return false
      })
}