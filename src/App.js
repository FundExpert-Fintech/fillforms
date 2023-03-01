import "./input.css";
import SignatureCanvas from "react-signature-canvas";
import {Button, Container, Paper, TextField} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import {useRef, useState} from "react";
import { PDFDocument } from 'pdf-lib';
import {baseEncodedString} from "./baseEncodedString";
import {btoa} from "buffer";


function App() {
    const [saveSignature, setSaveSignature] = useState(null);
    const [userName, setUserName] = useState("");
    const signaturePad = useRef(null);

    const clearSignaturePad = () => {
        signaturePad.current.clear();
        setSaveSignature(null);
    };
    function Download(arrayBuffer, type) {
        var blob = new Blob([arrayBuffer], { type: type });
        var url = URL.createObjectURL(blob);
        window.open(url);
    }

    function _base64ToArrayBuffer(base64) {
        var binary_string = window.btoa(base64);
        var len = binary_string.length;
        var bytes = new Uint8Array(len);
        for (var i = 0; i < len; i++) {
            bytes[i] = binary_string.charCodeAt(i);
        }
        return bytes.buffer;
    }
    const fillForm = async () => {
        setSaveSignature(_base64ToArrayBuffer(signaturePad.current.toDataURL('image/png')));
        // converting the pdf in base encoded string and loading the document in PDFDocument.load call from pdf-lib
        // const formPdfBytes = await fetch(formUrl).then((res) => res.arrayBuffer());
        // Load a PDF with form fields




        const pdfDoc = await PDFDocument.load(baseEncodedString);
        const pngImage = await pdfDoc.embedPng(saveSignature);
        console.log('pngImage - - -', pngImage);
        const jpgDims = pngImage.scale(0.25);

        // Get the form containing all the fields
        const form = pdfDoc.getForm();
        const pages = pdfDoc.getPages();
        const firstPage = pages[7];
        firstPage.drawImage(pngImage, {
            x: firstPage.getWidth() / 1 - jpgDims.width / 1,
            y: firstPage.getHeight() / 1 - jpgDims.height / 1,
            width: jpgDims.width,
            height: jpgDims.height,
        });



        // // Get all fields in the PDF by their names
        const dayField = form.getTextField("day");
        dayField.enableReadOnly();
        const monthField = form.getTextField("month");
        monthField.enableReadOnly();
        const placeField = form.getTextField("place");
        placeField.enableReadOnly();
        const nameField = form.getTextField("name");
        nameField.enableReadOnly();
        const title = form.getTextField("title");
        title.enableReadOnly();
        const date = form.getTextField("date");
        date.enableReadOnly();
        const characterImageField = form.getSignature('Initials-mJpseoLNbq');
        characterImageField.enableReadOnly();

        // // Fill in the basic info fields
        dayField.setText("day");
        monthField.setText("month");
        placeField.setText("place");
        nameField.setText(userName);
        title.setText("title");
        date.setText("date");

        // // Serialize the PDFDocument to bytes (a Uint8Array)
        const pdfBytes = await pdfDoc.save();
        console.log('pdfBytes- - - ',pdfBytes);
        // // Trigger the browser to download the PDF document
        // window.open(pdfBytes, "pdf-lib_form_creation_example.pdf", "application/pdf");
        Download(pdfBytes, "application/pdf");
    }


    return (
    <Container maxWidth="xs">
        <br/>
      <Grid style={{display: "contents"}} container spacing={2} direction="column" justifyContent="center" alignItems="flex-start">
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
                  canvasProps={{ width: 400, height: 200, className: "sigCanvas" }}
                  ref={signaturePad}
              />
          </Paper>
        </Grid>
        <Grid item xs container direction="row" justifyContent="space-around" alignItems="stretch" spacing={2}>
            <Grid item xs>
                <Button fullWidth style={{textTransform : "capitalize"}} variant="contained" onClick={clearSignaturePad}>Clear Signature</Button>
            </Grid>
            <Grid item xs>
                <Button fullWidth style={{textTransform : "capitalize"}} variant="contained" color="primary" onClick={fillForm}>Download PDF</Button>
            </Grid>
        </Grid>
        <Grid item xs>
          
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
