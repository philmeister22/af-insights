import responseInstagram from './App.js'
import Ajax from 'react-ajax'
var urlmaker;
urlmaker = "https://api.instagram.com/oauth/access_token \ -F client_id=2407132766257141 \ -F client_secret=214000a0bb0c40cc9648de01e82b46af \ -F grant_type=authorization_code \ -F redirect_uri=https://localhost:3000/ \ -F code= " + responseInstagram + "" ; 

function AjaxRequest(){
    return(
    <Ajax 
        url = {urlmaker} 
        onResponse= {console.log("pippo")}
        method = {"POST"}
        type = {"JSON"}
    />
    );
}
export default AjaxRequest;