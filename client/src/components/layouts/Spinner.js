import React from "react";
import loading from './loading2.gif'

  export function spinner() {
    return <img
      src={loading}
      alt="loading . . ."
      style={{
        width: "10rem",
        margin: "auto",
        display: "block",
      }} />
}

