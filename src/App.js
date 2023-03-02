import "./input.css";
import SignatureCanvas from "react-signature-canvas";
import {Button, Container, Paper, TextField} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import {useRef, useState} from "react";
import { PDFDocument } from 'pdf-lib';
import {baseEncodedString} from "./baseEncodedString";
import SignatureDialog from "./SignatureDialog";
import Alert from '@material-ui/lab/Alert';

function App() {
    const [userName, setUserName] = useState("");
    const [openDialog, setOpenDialog] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const signaturePad = useRef(null);
    const clearSignaturePad = () => {
        signaturePad.current.clear();
    };
    function Download(arrayBuffer, type) {
        var blob = new Blob([arrayBuffer], { type: type });
        var url = URL.createObjectURL(blob);
        window.open(url);
    }
    const fillForm = async () => {
        if(signaturePad.current.isEmpty()){
            setErrorMessage("Enter your signature!");
            return;
        }
        console.log('outside');
        // converting the pdf in base encoded string and loading the document in PDFDocument.load call from pdf-lib
        // const formPdfBytes = await fetch(formUrl).then((res) => res.arrayBuffer());
        // Load a PDF with form fields
        const pdfDoc = await PDFDocument.load(baseEncodedString);
        const pngImage = await pdfDoc.embedPng(signaturePad.current.toDataURL('image/png'));
        const jpgDims = pngImage.scale(0.25);
        // Get the form containing all the fields
        const form = pdfDoc.getForm();
        const pages = pdfDoc.getPages();
        const firstPage = pages[7];
        firstPage.drawImage(pngImage, {
            x: 390,
            y: 530,
            width: jpgDims.width,
            height: jpgDims.height,
        });

        // // Get all fields in the PDF by their names
         const nameField = form.getTextField("name");
        nameField.enableReadOnly();
        // const characterImageField = form.getSignature('Initials-mJpseoLNbq');
        // characterImageField.enableReadOnly();
        // Fill in the basic info fields
        nameField.setText(userName);

        // Serialize the PDFDocument to bytes (a Uint8Array)
        const pdfBytes = await pdfDoc.save();
        // Trigger the browser to download the PDF document
        // window.open(pdfBytes, "pdf-lib_form_creation_example.pdf", "application/pdf");
        Download(pdfBytes, "application/pdf");
    }


    const openSignatureDialog  = () => {
        setOpenDialog(true);
    }
    return (
    <Container maxWidth="xs">
        <br/>
      <Grid style={{display: "contents"}} container spacing={2} direction="column" justifyContent="center" alignItems="flex-start">
        <Grid item xs={12}>
            <TextField id="name" label="Enter your full name as per PAN" variant="filled"
                       fullWidth
                       value={userName}
                       onChange={(e) => setUserName(e.target.value)}/>
        </Grid>
        <Grid item xs={12}>
           {/* <Button fullWidth style={{textTransform : "capitalize"}} variant="contained" onClick={openSignatureDialog}>
                Add Signature
            </Button>*/}
          <Paper elevation={1}>
              <SignatureCanvas
                  penColor="black"
                  canvasProps={{ width: 400, height: 200, className: "sigCanvas" }}
                  ref={signaturePad}
              />
          </Paper>
          <br/>
        </Grid>
        <Grid item xs>
            {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
        </Grid>
        <Grid item xs container direction="row" justifyContent="space-around" alignItems="stretch" spacing={2}>
            <Grid item xs>
                <Button fullWidth style={{textTransform : "capitalize"}} variant="contained" onClick={clearSignaturePad}>Clear Signature</Button>
            </Grid>
            <Grid item xs>
                <Button disabled={userName===""} fullWidth style={{textTransform : "capitalize"}} variant="contained" color="primary" onClick={fillForm}>Download PDF</Button>
            </Grid>
        </Grid>
        <Grid item xs>

        </Grid>
      </Grid>
        <SignatureDialog openDialog={openDialog} setOpenDialog={setOpenDialog} SignatureCanvas={<SignatureCanvas
            canvasProps={{ width: 400, height: 200 }}
            penColor="black"
            ref={signaturePad}
        />} clearSignaturePad={clearSignaturePad}/>
    </Container>
  );
}

export default App;
