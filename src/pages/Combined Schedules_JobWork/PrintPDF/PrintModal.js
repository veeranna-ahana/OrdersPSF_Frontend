import React, { useState, Fragment } from "react";
import Modal from "react-bootstrap/Modal";
// import ProfileJobWorkPrint from '../Profile_JobWork/ProfileJobWorkPrint';

import {
  PDFDownloadLink,
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFViewer,
  pdf
} from "@react-pdf/renderer";
import PrintPDF from "./PrintPDF";
import axios from "axios";
import { baseURL } from "../../../api/baseUrl";
import { toast } from "react-toastify";

export default function PrintModal({
  setServiceOpen,
  serviceOpen,
  setOpenPrintModal,
  selectedRow,
}) {
  // console.log("in Print Modal",selectedWeek)

  const [fullscreen, setFullscreen] = useState(true);
  console.log("selectedRow is", selectedRow);

  const savePdfToServer = async () => {

    try {
      const adjustment = "CombinedScheduleForm"; // Replace with the actual name you want to send

      // Step 1: Call the API to set the adjustment name
      await axios.post(baseURL + `/PDF/set-adjustment-name`, { adjustment });
      const blob = await pdf(
        <PrintPDF formdata={selectedRow} />
      ).toBlob();

      const file = new File([blob], "GeneratedPDF.pdf", {
        type: "application/pdf",
      });

      const formData = new FormData();

      formData.append("file", file);

      const response = await axios.post(baseURL + `/PDF/save-pdf`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status === 200) {
        toast.success("PDF saved successfully!");
      }
    } catch (error) {
      console.error("Error saving PDF to server:", error);
    }
  };

  return (
    <div>
      <Modal
        show={serviceOpen}
        fullscreen={fullscreen}
        onHide={() => setServiceOpen(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Service</Modal.Title>
          <button
            style={{ marginLeft: "70%" }}
            className="button-style group-button"
            onClick={savePdfToServer}
          >
            Save to server
          </button>
        </Modal.Header>
        <Modal.Body>
          <Fragment>
            <PDFViewer width="1200" height="600" filename="somename.pdf">
              <PrintPDF formdata={selectedRow} />
            </PDFViewer>
          </Fragment>
        </Modal.Body>
      </Modal>
    </div>
  );
}
