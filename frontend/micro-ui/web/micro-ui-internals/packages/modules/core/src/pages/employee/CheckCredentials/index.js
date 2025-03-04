// import { CircularProgress } from "@mui/material"
import { Loader } from "@egovernments/digit-ui-react-components";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";


const setEmployeeDetail = (userObject, token) => {
    let locale = JSON.parse(sessionStorage.getItem("Digit.locale"))?.value || "en_IN";
    localStorage.setItem("Employee.tenant-id", userObject?.tenantId);
    localStorage.setItem("tenant-id", userObject?.tenantId);
    localStorage.setItem("citizen.userRequestObject", JSON.stringify(userObject));
    localStorage.setItem("locale", locale);
    localStorage.setItem("Employee.locale", locale);
    localStorage.setItem("token", token);
    localStorage.setItem("Employee.token", token);
    localStorage.setItem("user-info", JSON.stringify(userObject));
    localStorage.setItem("Employee.user-info", JSON.stringify(userObject));
};

export default function CheckCredentials() {
    const location = useLocation();
    const history = useHistory();
    const [user, setUser] = useState(null);
    const queryParameters = new URLSearchParams(window.location.search);
    useEffect(() => {
        if (!user) {
            return; 
        }
        Digit.SessionStorage.set("citizen.userRequestObject", user);
        const filteredRoles = user?.info?.roles?.filter((role) => role.tenantId === Digit.SessionStorage.get("Employee.tenantId"));
        if (user?.info?.roles?.length > 0) user.info.roles = filteredRoles;
        Digit.UserService.setUser(user);
        setEmployeeDetail(user?.info, user?.access_token); 
        let redirectPath = "/digit-ui/employee";
    
        history.replace(redirectPath);
    }, [user]);
    const checkCrednetials = async () => {
        
       let body =  {
            "SsoEmployee":{
            "applicantName":queryParameters.get("applicantName"),
            "mobileNumber":queryParameters.get("MobileNo"),
            "uid":queryParameters.get("uid"),
            "userName":queryParameters.get("username"),
            "email":queryParameters.get("email"),
            "rtnUrl":queryParameters.get("rtnUrl"),
            "ssoDashboardURL":queryParameters.get("ssoDashboardURL"),
            "tokenId":queryParameters.get("TokenId"),
            "designationID":queryParameters.get("DesignationID"),
            // "designation":"STP_Circle",
            "designation":queryParameters.get("Designation"),
            "officeID":queryParameters.get("OfficeID"),
            "officeName":queryParameters.get("OfficeName")
            // "officeName":"STP Office-Gurugram"
            }
        }
        const resp = await axios.post("/egov-hrms/employees/_ssoEmployee",body)
        // localStorage.setItem("access_token",response?.data?.access_token || response?.data?.TokenId);
        // localStorage.setItem("token",response?.data?.access_token || response?.data?.TokenId);
        const info = resp?.data?.token?.UserRequest;
        Digit.SessionStorage.set("Employee.tenantId", info?.tenantId);
        // const { ResponseInfo, UserRequest: info, ...tokens } = await Digit.UserService.ssoUser(body);
        console.log("REINfo",info, resp);
        localStorage.setItem("ssoDashboardURL",resp?.data?.ssoDashboardURL);
        setUser({ info, ...resp?.data?.token });
        // console.log("_ssoCitizen response ",response.data) 
        // window.open(response.data.ReturnUrl,"_self");

    }
    useEffect(()=>{
        console.log("LOGIEMP");
        checkCrednetials();
    },[])
    return(
        <div style={{height:"100%",width:"100%",display:"flex",justifyContent:"center",alignItems:"center"}} >
            <Loader/>
        </div>
    )
}
