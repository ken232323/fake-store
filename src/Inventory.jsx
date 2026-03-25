import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Card, Image, SegmentedControl, TextInput, Modal } from "@mantine/core";

const Inventory = () => {
  const [platform, setPlatform] = useState("Personal");
  const [opened, setOpened] = useState(false);


  return (


    <>

    <Button onClick={() => setOpened(true)}>
      check modal
    </Button>

    <Modal
      opened = {opened}
      onClose={() => setOpened(false)}
      title= "register"
    >
      <SegmentedControl
        value ={platform}
        onChange = {(c) => {setPlatform(c)}}
        data= {["Personal", "Company"]}
      />

      <TextInput label="Full name"/>
      <TextInput label="email"/>

      {platform === "Personal" && (
        <>
          <TextInput label="date of birth"/>
          <TextInput label="phone  number"/>
        </>
      )}

      {platform === "Company" && (
        <>
          <TextInput label="company number"/>
          <TextInput label="registration number"/>
        </>
      )}
      
      </Modal>
    </>
  );
};

export default Inventory;