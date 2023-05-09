import "./input.css";
import SignatureCanvas from "react-signature-canvas";
import {PDFDocument} from "pdf-lib";
import {Button, Container, Paper, TextField} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import {useRef, useState} from "react";
import {Route, Routes} from "react-router-dom";
import Connect from "./components /Connect";
import Fundexpert from "./components /Fundexpert";

function App() {
  return (
    <Container maxWidth="xs">
      <br/>
      <Routes>
        <Route exact path="/connect" element={<Connect/>}/>
        <Route exact path="/fundexpert" element={<Fundexpert/>}/>
      </Routes>

    </Container>
  );
}

export default App;
