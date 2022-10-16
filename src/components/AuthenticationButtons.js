import { FcGoogle } from "react-icons/fc";
import { AiFillFacebook } from "react-icons/ai";
import { AiFillGithub } from "react-icons/ai";

const AuthenticationButtons = (props) => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="center">
          <hr className="orline" />
          <div className="or">OR</div>
        </div>

        <div className="col-sm-9">
          <button className="btn-google" type="submit" formAction={props.path}>
            <FcGoogle size={28} style={{ marginRight: "30px" }} />
            Sign Up with Google
          </button>
        </div>

        <div className="col-sm-9">
          <button className="btn-facebook">
            <AiFillFacebook
              size={28}
              style={{ marginRight: "17px", color: "#3AB4F2" }}
            />
            Sign Up with Facebook
          </button>
        </div>

        <div className="col-sm-9">
          <button className="btn-github">
            <AiFillGithub size={28} style={{ marginRight: "30px" }} />
            Sign Up with Github
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthenticationButtons;
