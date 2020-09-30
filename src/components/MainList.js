import React, { useEffect, useState } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import { IconButton, TextareaAutosize } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import InfoIcon from '@material-ui/icons/Info';
import { Button } from "@material-ui/core";

const MainList = () => {
  const [list, setList] = useState(JSON.parse(localStorage.getItem("List")));
  const [textArea, setTextArea] = useState("");
  let isHave;

  function getInfo(field){
    let status = JSON.parse(localStorage.getItem(field));
    let statusText = "";
    status.forEach(element => {
        let elementArray = Object.entries(element);
        console.log(elementArray);
        statusText += elementArray[0][0] + " time " + elementArray[0][1];
    }
    )
    setTextArea(statusText);
  }

  function onlySome(payload) {
    console.log(payload);
    let newObj = Object.entries(
      Object.assign({}, JSON.parse(localStorage.getItem("List")))
    );
    if (payload == "HAVE") {
      let have = newObj.filter((item) => item[1] == "have");
      const obj1 = Object.fromEntries(have);
      setList(obj1);
    } else if (payload == "TO BUY") {
      let ranOut = newObj.filter((item) => item[1] != "have");
      const obj1 = Object.fromEntries(ranOut);
      setList(obj1);
    } else {
        console.log(JSON.parse(localStorage.getItem("List")));
        setList(JSON.parse(localStorage.getItem("List")));
    }
  }

  function sort() {
    let arrayObj = Object.entries(JSON.parse(localStorage.getItem("List")));
    let have = arrayObj.filter((item) => item[1] == "have");
    let ranOut = arrayObj.filter((item) => item[1] != "have");
    have = have.sort(function (a, b) {
      if (a[0] > b[0]) return 1;
      if (a[0] < b[0]) return -1;
      return 0;
    });
    ranOut = ranOut.sort(function (a, b) {
      if (a[0] > b[0]) return 1;
      if (a[0] < b[0]) return -1;
      return 0;
    });
    const obj1 = Object.fromEntries(have);
    const obj = Object.fromEntries(ranOut);
    let newObj = Object.assign({}, obj1, obj);
    localStorage.setItem("List", JSON.stringify(newObj));
    setList(newObj);
  }

  useEffect(() => {
    sort();
  }, []);

  function deleteObject(field) {
    let newList = Object.assign({}, JSON.parse(localStorage.getItem("List")));
    delete newList[field];
    localStorage.removeItem(field);
    localStorage.setItem("List", JSON.stringify(newList));
    setList(newList);
  }
  function changeObject(field, prevState) {
    let newList = Object.assign({}, JSON.parse(localStorage.getItem("List")));
    if (prevState == "have") {
      newList[field] = "ran out";
      let oldDate = JSON.parse(localStorage.getItem(field));
      let date = new Date();
      let storageDate = date.getMonth()+1 + "." + date.getDate() + "/" + date.getHours() + ":" + date.getMinutes();
      oldDate.push({ranOut: storageDate});
      localStorage.setItem(field, JSON.stringify(oldDate));
    } else {
      newList[field] = "have";
      let oldDate = JSON.parse(localStorage.getItem(field));
      let date = new Date();
      let storageDate = date.getMonth()+1 + "." + date.getDate() + "/" + date.getHours() + ":" + date.getMinutes();
      oldDate.push({have: storageDate});
      localStorage.setItem(field, JSON.stringify(oldDate));
    }
    localStorage.setItem("List", JSON.stringify(newList));
    setList(newList);
    sort();
  }

  return (
    <div>
      <List>
        {Object.entries(list).map((singleItem, key) => {
          if (singleItem[1] === "have") {
            isHave = true;
          } else {
            isHave = false;
          }
          return (
            <ListItem key={singleItem[0]} dense button>
              {isHave ? (
                <ListItemText primary={singleItem[0]} />
              ) : (
                <ListItemText secondary={singleItem[0]} />
              )}
              <ListItemSecondaryAction>
                <IconButton>
                  <DeleteIcon
                    onClick={() => {
                      deleteObject(singleItem[0]);
                    }}
                  />
                </IconButton>
                <IconButton>
                  <EditIcon
                    onClick={() => {
                      changeObject(singleItem[0], singleItem[1]);
                    }}
                  />
                </IconButton>
                <IconButton>
                  <InfoIcon
                    onClick={() => {
                      getInfo(singleItem[0]);
                    }}
                  />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          );
        })}
      </List>
      <Button
        variant="contained"
        color="primary"
        onClick={() => onlySome("HAVE")}
      >
        BOUGHT
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={() => onlySome("TO BUY")}
      >
        TO BUY
      </Button>
      <Button variant="contained" color="primary" onClick={() => onlySome("")}>
        RESET
      </Button>
      <div>
      <TextareaAutosize value={textArea} rowsMin={5}/>
      </div>
    </div>
  );
};

export default MainList;
