import React, {useRef, useState} from "react";
import Grid from "@material-ui/core/Grid";
import {Button, Paper, TextField} from "@material-ui/core";
import SignatureCanvas from "react-signature-canvas";
import {PDFDocument} from "pdf-lib";
function Connect(){
  const [saveSignature, setSaveSignature] = useState(null);
  const [userName, setUserName] = useState("");
  const clearTextPad = useRef(null);
  const clearSignaturePad = () => clearTextPad.current.clear();
  const fillForm = async (type) => {
    const formUrl = "/Kotak_connect.pdf" ;
    console.log(formUrl);
    const formPdfBytes = await fetch(formUrl).then((res) => res.arrayBuffer());
    console.log(formPdfBytes);
    // Load a PDF with form fields
    const pdfDoc = await PDFDocument.load(formPdfBytes);
    // Get the form containing all the fields
    const form = pdfDoc.getForm();
    console.log(pdfDoc);
    // // Get all fields in the PDF by their names
    const dayField = form.getTextField("day");
    const monthField = form.getTextField("month");
    const placeField = form.getTextField("place");
    const nameField = form.getTextField("name");
    const title = form.getTextField("title");
    const date = form.getTextField("date");

    // // Fill in the basic info fields
    dayField.setText("day");
    monthField.setText("month");
    placeField.setText("place");
    nameField.setText("name");
    title.setText("title");
    date.setText("date");

    // // Serialize the PDFDocument to bytes (a Uint8Array)
    const pdfBytes = await pdfDoc.save();

    // // Trigger the browser to download the PDF document
    window.location.download(pdfBytes, "pdf-lib_form_creation_example.pdf", "application/pdf");
  }
  console.log("check new user name", userName);
  return <div>
    <Grid style={{display: "contents"}} container spacing={2} direction="column" justifyContent="center"
          alignItems="flex-start">
      <Grid item xs={12}>
        <TextField id="name" label="Enter full name" variant="filled"
                   fullWidth
                   value={userName}
                   onChange={(e) => setUserName(e.target.value)}/>
      </Grid>
      <Grid item xs={12}>
        <Paper elevation={1}>
          <SignatureCanvas
            penColor="black"
            canvasProps={{width: 400, height: 200, className: "sigCanvas"}}
            ref={clearTextPad}
          />
        </Paper>
      </Grid>
      <Grid item xs container direction="row" justifyContent="space-around" alignItems="stretch" spacing={2}>
        <Grid item xs>
          <Button fullWidth style={{textTransform: "capitalize"}} variant="contained" onClick={clearSignaturePad}>Clear
            Signature</Button>
        </Grid>
        <Grid item xs>
          <Button fullWidth style={{textTransform: "capitalize"}} variant="contained" color="primary"
                  onClick={fillForm}>Download PDF</Button>
        </Grid>
      </Grid>
      <Grid item xs>

      </Grid>
    </Grid>
  </div>
}

export default Connect;