import UrlConst from "../resources/Urls.js";
import General from "../resources/General.js";
import axios from "axios";
import { useState, useEffect } from "react";
import { useCookies } from 'react-cookie';

const Profile = () =>{
  const [cookies, setCookie] = useCookies(['user']);

  const [profile, setProfile] = useState(null);

  useEffect(() =>{
    axios({
      method: 'get',
      url: UrlConst.PROFILE,
      headers: {'Authorization': "Token " + cookies['token']},
    }).then((res) => {
      setProfile(res.data)
    }).catch((err) => {
      console.log("error in profile")
    })
  }, []);

  return(
    <>
      <div className="profile-container">
        <div className="title-profile">{General.PROFILE}</div>
        <div>Username :</div>
        <div>
          <input 
            className="profile-input" 
            value={profile !== null && (profile.user.username)}
            disabled = "disabled"
          />
        </div>
        <div>E-mail :</div>
        <div>
          <input
            className="profile-input"
            value={profile !== null && (profile.user.email)}
            disabled = "disabled"
          />
        </div>
      </div>
    </>
  )
}

export default Profile