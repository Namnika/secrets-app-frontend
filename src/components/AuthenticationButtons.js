import { FcGoogle } from "react-icons/fc";
import { AiFillFacebook } from "react-icons/ai";
import { AiFillGithub } from "react-icons/ai";

const AuthenticationButtons = () => {

  return (
    <div class="container-fluid">
      <div class="row">
	  <hr />
        <div class="col-sm-9">
          <button className="btn-google">
            <FcGoogle size={28} style={{marginRight: "30px"}} />
            Sign Up with Google
          </button>
        </div>

		<div class="col-sm-9">
          <button className="btn-facebook">
            <AiFillFacebook size={28} style={{marginRight: "30px", color: "#3AB4F2"}} />
            Sign Up with Facebook
          </button>
        </div>

		<div class="col-sm-9">
          <button className="btn-github">
            <AiFillGithub size={28} style={{marginRight: "30px"}} />
            Sign Up with Facebook
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthenticationButtons;
