import React from "react";

const AddSecret = ({ inputText, setInputText, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="addSecret"></label>
        <input
          autoFocus
          id="addSecret"
          className="form-control text-center"
          name="text"
          placeholder="What's your secret?"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
      </div>
      <button
        className="btn btn-dark"
        aria-label="What's your secret?"
        type="submit"
      >
        Submit
      </button>
    </form>
  );
};

export default AddSecret;
