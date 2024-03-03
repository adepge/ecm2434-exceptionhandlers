// Code to check if the user is logged in or not

import axios from "axios";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";

const cookies = new Cookies();

async function CheckLogin() {

    if (cookies.get('token') === undefined) {
        window.location.href = "/login";
        return false;
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
        return true;
    } catch (error) {
        if (error.response) {
            if (error.response.data.detail === "Invalid token.") {
                cookies.remove('token');
                console.log("not logged in");
                window.location.href = "/login";
                return false
            } else {
                console.log("Response data:", error.response.data);
                console.log("Response status:", error.response.status);
                console.log("Response headers:", error.response.headers);
            }
        }
    }

}

export default CheckLogin;