import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";

const Adding = () => {
  
  const [input, setInput] = useState("");

    function onChangeHandler(e){
        setInput(e.target.value);
    }

    function addItem(){
        let newList = JSON.parse(localStorage.getItem("List"));
        newList[input] = "ran out";
        localStorage.setItem("List", JSON.stringify(newList));
        window.location.reload(false);
    }

    return (
    <div>
      <Button variant="contained" color="primary" onClick={addItem}>ADD ITEM</Button>
      <TextField value={input} onChange={onChangeHandler}></TextField>
    </div>
  );
};

export default Adding;
