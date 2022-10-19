import React from "react";

const SecretPost = (props) => {
  return (
    <div>
      <p className="secret-text">{props.post}</p>
    </div>
  );
};

export default SecretPost;
