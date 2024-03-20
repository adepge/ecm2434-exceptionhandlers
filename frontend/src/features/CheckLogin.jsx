// Code to check if the user is logged in or not

import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const CheckLogin = async (redirect = true, navigate) => {

    // cookies.remove('token');

    if (cookies.get('token') === undefined) {
        console.log("not logged in");
        console.log("redirecting")
        console.log(redirect);
        if (redirect) {
            navigate("/login");
            return false;
        }
    }

    try {
        const response = await axios.get(
            "https://api.post-i-tivity.me/api/getUser/"
            ,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Token ${cookies.get('token')}`, // Assuming postData.username is the token
                },
            }
        );
        return response;
    } catch (error) {
        if (error.response) {
            if (error.response.data.detail === "Invalid token.") {
                cookies.remove('token');
                console.log("not logged in");
                if (redirect) {
                    console.log("redirecting")
                    navigate("/login");
                    return false
                }
            } else {
                console.log("Response data:", error.response.data);
                console.log("Response status:", error.response.status);
                console.log("Response headers:", error.response.headers);
                alert("Internal server error");
            }
        } else {
            console.log(error)
            alert("Cannot connect to the server");
        }
        return false
    }

}

export default CheckLogin;