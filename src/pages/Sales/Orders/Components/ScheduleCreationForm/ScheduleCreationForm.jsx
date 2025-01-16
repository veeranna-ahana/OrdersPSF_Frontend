/** @format */

import React, { useEffect, useState, Profiler } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Tab, Table, Tabs, Form } from "react-bootstrap";
import FindOldPart from "./Tabs/FindOldPart/FindOldPart";
import MaterialInfo from "./Tabs/MaterialInfo/MaterialInfo";
import MaterialPlanner from "./Tabs/MaterialPlanner/MaterialPlanner";
import OrderDetails from "./Tabs/OrderDetails/OrderDetails";
import OrderInfo from "./Tabs/OrderInfo/OrderInfo";
import ProductionScheduleCreation from "./Tabs/ProductionScheduleCreation/ProductionScheduleCreation";
import ProfarmaInvoiceList from "./Tabs/ProfarmaInvoiceList/ProfarmaInvoiceList";
import ScheduleList from "./Tabs/ScheduleList/ScheduleList";
import FormHeader from "./FormHeader";
import { endpoints } from "../../../../api/constants";
import { toast } from "react-toastify";
import AlertModal from "../Components/Alert";
import { Helper } from "dxf";
import { Buffer } from "buffer";
import axios from "axios";
const {
  getRequest,
  postRequest,
  getFileRequest,
} = require("../../../../api/apiinstance");
const InputField = ({
  label,
  id,
  value,
  onChangeCallback,
  required,
  disabled,
  style,
  className,
  onCheckboxChange,
  isChecked,
  checkboxIndex,
  showCheckbox,
  Type,
}) => {
  const [isValid, setIsValid] = useState(true);
  const handleInputChange = (e) => {
    const inputValue = e.target.value.replace(/[^0-9.]/g, "");

    onChangeCallback(inputValue);
  };

  return (
    <div className="md-col-4">
      <div className="row">
        <div className="col-md-3">
          <div className="col-md-3">
            {showCheckbox && (
              <input
                type="checkbox"
                className="custom-checkbox in-field"
                onChange={() => onCheckboxChange(checkboxIndex)}
                checked={isChecked}
                required
              />
            )}
          </div>
        </div>
      </div>

      <input
        type="text"
        id={id}
        value={value}
        onChange={handleInputChange}
        disabled={disabled}
        className={className}
        required
      />
    </div>
  );
};
export default function ScheduleCreationForm(props) {
  const location = useLocation();

  const [intSchStatus, setIntSchStatus] = useState(0);
  const [mtrldata, setMtrldata] = useState([]);
  const [procdata, setProcdata] = useState([]);
  const [inspdata, setInspdata] = useState([]);
  const [packdata, setPackdata] = useState([]);
  const [tolerancedata, setTolerancedata] = useState([]);
  const [salesExecdata, setSalesExecdata] = useState([]);
  const [gradeid, setGradeID] = useState("");
  const [material, setMaterial] = useState("");
  const [DwgName, setDwgName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [jwRate, setJwRate] = useState("");
  const [materialRate, setMaterialRate] = useState("");
  const [unitPrice, setUnitPrice] = useState("");
  const [Operation, setOperation] = useState("");
  const [thickness, setThickness] = useState("");
  const [specificwt, setSpecificWt] = useState(0);
  const [grade, setGrade] = useState("");
  const [HasBOM, setHasBOM] = useState(0);
  const [Dwg, setDwg] = useState(0);
  const [newSerial, setNewSerial] = useState({
    DwgName: "",
    material: "",
    strmtrlcode: "",
    Operation: "",
    StrTolerance: "", // NOT USED
    InspLvl: "",
    PkngLvl: "",
    MtrlSrc: "",
    custcode: props.OrderCustData?.Cust_Code,
    OrderNo: 0,
    newOrderSrl: 0,
    quantity: 0.0,
    jwRate: 0.0,
    materialRate: 0.0,
    unitPrice: 0.0,
    Dwg_Code: "",
    dwg: "",
  });
  const [ordrDetailsChange, setordrDetailsChange] = useState({
    custcode: props.OrderCustData?.Cust_Code,
    DwgName: "",
    material: "",
    strmtrlcode: "",
    Operation: "",
    StrTolerance: "", // NOT USED
    InspLvl: "",
    PkngLvl: "",
    MtrlSrc: "",
    quantity: 0.0,
    jwRate: 0.0,
    materialRate: 0.0,
    unitPrice: 0.0,
  });
  const [blkChange, setBlkChange] = useState({
    custcode: props.OrderCustData?.Cust_Code,
    DwgName: "",
    material: "",
    strmtrlcode: "",
    Operation: "",
    StrTolerance: "", // NOT USED
    InspLvl: "",
    PkngLvl: "",
    MtrlSrc: "",
    quantity: 0.0,
    jwRate: 0.0,
    materialRate: 0.0,
    unitPrice: 0.0,
    blkCngCheckBox: false,
  });
  const [imprtDwgObj, setImprtDwgObj] = useState({
    custcode: props.OrderCustData?.Cust_Code,
    material: "",
    strmtrlcode: "",
    Operation: "",
    MtrlSrc: "",
    StrTolerance: "",
    InspLvl: "",
    PkngLvl: "",
    quantity: 0.0,
  });
  let [orderdetailsdata, setOrderDetailsData] = useState([]);
  let [Orderno, setOrderno] = useState(location.state);
  // LOC AND DXF
  // let [lengthOfCut, setLengthOfCut] = useState(0);
  // let [noOfPierces, setNoofPierces] = useState(0);
  // let [partNetArea, setPartNetArea] = useState(0);
  // let [outOpen, setOutOpen] = useState(0);
  // let [complexity, setComplexity] = useState(0);
  // let [hasOpenContour, setHasOpenContour] = useState(0);
  // let [partNetWeight, setPartNetWeight] = useState(0);
  // let [partOutArea, setPartOutArea] = useState(0);
  // let [partOutWeight, setPartOutWeight] = useState(0);
  // let [rectArea, setRectArea] = useState(0);
  // let [rectWeight, setRectWeight] = useState(0);
  // const [orderStatus, setOrderStatus] = useState("Created");
  //IMPORT DWG
  let [strprocess, setStrProcess] = useState("");
  let [strmtrlcode, setStrMtrlCode] = useState("");
  let [strtolerance, setStrTolerance] = useState("");
  let [mtrlcode, setMtrlCode] = useState("");
  let [strMaterial, setStrMaterial] = useState("");
  let [strGrade, setStrGrade] = useState("");
  let [decThick, setDecThick] = useState(0);
  let [dblSpWt, setDblSpWt] = useState(0);
  let [dblCuttingRate, setDblCuttingRate] = useState(0);
  let [dblPierceRate, setDblPierceRate] = useState(0);
  let [strInsp, setStrInsp] = useState("");
  let [strPkng, setStrPkng] = useState("");
  let [strSource, setStrSource] = useState("");
  let [strMtrlGrade, setStrMtrlGrade] = useState("");
  let [Qty, setQty] = useState(0);
  let [FormOk, setFormOk] = useState(false);
  let [valOK, setValOK] = useState(false);
  let [TMd, setTMd] = useState([]);
  let [mtrl, setMtrl] = useState([]);
  let [bolMtrl, setBolMtrl] = useState(false);
  let [bolOperation, setBolOperation] = useState(false);
  let [bolSource, setBolSource] = useState(false);
  let [bolInsp, setBolInsp] = useState(false);
  let [bolPkng, setBolPkng] = useState(false);
  let [bolTolerance, setBolTolerance] = useState(false);
  let [bolQty, setBolQty] = useState(false);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // LOC CACLULATION AND DXF FILE
  let locCalc = async (drwfile, material, grade, thickness, cb) => {
    const formData = new FormData();
    //  window.dxffiles.forEach(async (dfile) => {
    formData.append("file", drwfile); //files[i]);
    formData.append("thickness", thickness);
    formData.append("specficWeight", specificwt); // resp[0].Specific_Wt);
    //  setSpecificWt(resp[0].Specific_Wt);
    // const getCalcReq = await fetch('http://127.0.0.1:21341/getCalc', {
    const getCalcReq = await fetch("http://localhost:21341/getCalc", {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: formData,
    });
    const res = await getCalcReq.json();

    setLengthOfCut(res.data.lengthOfCut);
    setNoofPierces(res.data.noOfPierces);
    setPartNetArea(res.data.partNetArea);
    setOutOpen(res.data.outOpen);
    setComplexity(res.data.complexity);
    setHasOpenContour(res.data.hasOpenContour);
    setPartNetWeight(res.data.partNetWeight);
    setPartOutArea(res.data.partOutArea);
    setPartOutWeight(res.data.partOutWeight);
    setRectArea(res.data.rectArea);
    setRectWeight(res.data.rectWeight);
    cb({
      lengthOfCut: res.data.lengthOfCut,
      noOfPierces: res.data.noOfPierces,
      partNetArea: res.data.partNetArea,
      complexity: res.data.complexity,
      hasOpenContour: res.data.hasOpenContour,
      outOpen: res.data.outOpen,
      partNetWeight: res.data.partNetWeight,
      partOutArea: res.data.partOutArea,
      partOutWeight: res.data.partOutWeight,
      rectArea: res.data.rectArea,
      rectWeight: res.data.rectWeight,
    });
  };

  async function dxfupload(files, destPath, response) {
    const data = new FormData();
    for (let i = 0; i < files.length; i++) {
      data.append("files", files[i]);
    }
    let API = "http://localhost:6001";
    const rawResponse = await fetch(`${API}/file/uploaddxf`, {
      method: "POST",
      headers: {
        Accept: "multipart/form-data",
        destinationPath: destPath,
      },
      body: data,
    });
    const content = await rawResponse.json();
    response(content);
  }

  let importdrawings = async (e) => {
    e.preventDefault();

    if (!(orderStatus === "Created" || orderStatus === "Recorded")) {
      alert("Cannot import after the Order is recorded");
      return;
    }

    let materialcode = strmtrlcode;
    let process = strprocess; //e.target.elements.processdescription.value;
    let quantity = quantity; // e.target.elements.quantity.value;
    let materialsource = strSource; // e.target.elements.materialsource.value;
    let tolerance = strtolerance; // e.target.elements.tolerance.value;
    let insplevel = strInsp; // e.target.elements.insplevel.value;
    let packinglevel = strPkng; // e.target.elements.packinglevel.value;
    let files = e.target.elements.files.files;
    setDblCuttingRate(dblCuttingRate);
    setDblPierceRate(dblPierceRate);

    for (let i = 0; i < files.length; i++) {
      let drwfname = files[i];

      locCalc(drwfname, material, grade, thickness, (output) => {
        let olddata = Object.entries(orderdetailsdata).map(([key, value]) => ({
          key,
          value,
        }));

        if (olddata === null || olddata === undefined) {
          return;
        } else {
          setOrderDetailsData((olddata) => {
            return [
              ...olddata,
              {
                file: files[i],
                operation: process,
                material,
                grade,
                thickness,
                quantity,
                mtrlcode,
                lengthOfCut: output.lengthOfCut,
                noOfPierces: output.noOfPierces,
                partNetArea: output.partNetArea,
                complexity: output.complexity,
                hasOpenContour: output.hasOpenContour,
                outOpen: output.outOpen,
                partNetWeight: output.partNetWeight,
                partOutArea: output.partOutArea,
                partOutWeight: output.partOutWeight,
                rectArea: output.rectArea,
                rectWeight: output.rectWeight,
              },
            ];
          });
        }
      });
    }

    let destPath = `\\Wo\\` + Orderno + "\\DXF\\";
    dxfupload(files, destPath, (res) => {});
    window.dxffiles = files;
    setShow(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    // DWG NAME
    if (name === "newSrlDwgname") {
      setNewSerial((prevState) => ({
        ...prevState,
        DwgName: value,
      }));
    } else if (name === "blkCngDwgname") {
      setBlkChange((prevState) => ({
        ...prevState,
        DwgName: value,
        blkCngCheckBox: true,
      }));
    } else if (name === "odrDtlDwgName") {
      setordrDetailsChange((prevState) => ({
        ...prevState,
        DwgName: value,
      }));
    }
    // MATERIAL
    if (name === "newSrlMaterial") {
      setNewSerial((prevState) => ({
        ...prevState,
        material: value,
      }));
      postRequest(
        endpoints.getmtrldetsbymtrlcode,
        { mtrlcode: e.target.value },
        (mtrldata) => {
          if (mtrldata.length > 0) {
            setThickness(mtrldata[0]["Thickness"]);
            setGradeID(mtrldata[0]["MtrlGradeID"]);
            setMaterial(mtrldata[0]["Mtrl_Type"]);
            setGrade(mtrldata[0]["Grade"]);
            setSpecificWt(mtrldata[0]["Specific_Wt"]);

            locCalc(
              window.dxffile,
              mtrldata[0]["Mtrl_Type"],
              mtrldata[0]["Grade"],
              mtrldata[0]["Thickness"],
              (output) => {}
            );
          }
        }
      );
    } else if (name === "odrDtlMaterial") {
      setordrDetailsChange((prevState) => ({
        ...prevState,
        material: value,
      }));
      postRequest(
        endpoints.getmtrldetsbymtrlcode,
        { mtrlcode: e.target.value },
        (mtrldata) => {
          if (mtrldata.length > 0) {
            setThickness(mtrldata[0]["Thickness"]);
            setGradeID(mtrldata[0]["MtrlGradeID"]);
            setMaterial(mtrldata[0]["Mtrl_Type"]);
            setGrade(mtrldata[0]["Grade"]);
            setSpecificWt(mtrldata[0]["Specific_Wt"]);

            locCalc(
              window.dxffile,
              mtrldata[0]["Mtrl_Type"],
              mtrldata[0]["Grade"],
              mtrldata[0]["Thickness"],
              (output) => {}
            );
          }
        }
      );
    } else if (name === "blkCngMaterial") {
      setBlkChange((prevState) => ({
        ...prevState,
        material: value,
      }));
      postRequest(
        endpoints.getmtrldetsbymtrlcode,
        { mtrlcode: e.target.value },
        (mtrldata) => {
          if (mtrldata.length > 0) {
            setThickness(mtrldata[0]["Thickness"]);
            setGradeID(mtrldata[0]["MtrlGradeID"]);
            setMaterial(mtrldata[0]["Mtrl_Type"]);
            setGrade(mtrldata[0]["Grade"]);
            setSpecificWt(mtrldata[0]["Specific_Wt"]);

            locCalc(
              window.dxffile,
              mtrldata[0]["Mtrl_Type"],
              mtrldata[0]["Grade"],
              mtrldata[0]["Thickness"],
              (output) => {}
            );
          }
        }
      );
    } else if (name === "impDwgMaterial") {
      setImprtDwgObj((prevState) => ({
        ...prevState,
        material: value,
      }));
      postRequest(
        endpoints.getmtrldetsbymtrlcode,
        { mtrlcode: e.target.value },
        (mtrldata) => {
          if (mtrldata.length > 0) {
            setThickness(mtrldata[0]["Thickness"]);
            setGradeID(mtrldata[0]["MtrlGradeID"]);
            setMaterial(mtrldata[0]["Mtrl_Type"]);
            setGrade(mtrldata[0]["Grade"]);
            setSpecificWt(mtrldata[0]["Specific_Wt"]);

            locCalc(
              window.dxffile,
              mtrldata[0]["Mtrl_Type"],
              mtrldata[0]["Grade"],
              mtrldata[0]["Thickness"],
              (output) => {}
            );
          }
        }
      );
    }

    const handleMtrlCodeTypeaheadChange = (selectedOptions) => {
      setSelectedItems(selectedOptions);
      const selectedValue =
        selectedOptions.length > 0 ? selectedOptions[0] : null;
      if (selectedValue) {
        setStrMtrlCode(selectedValue.Mtrl_Code);
      }
    };

    if (name === "newSrlMaterial") {
      setNewSerial((prevState) => ({
        ...prevState,
        strmtrlcode: value,
      }));
    } else if (name === "odrDtlMaterial") {
      setordrDetailsChange((prevState) => ({
        ...prevState,
        strmtrlcode: value,
      }));
    } else if (name === "blkCngMaterial") {
      setBlkChange((prevState) => ({
        ...prevState,
        strmtrlcode: value,
      }));
    } else if (name === "impDwgMaterial") {
      setImprtDwgObj((prevState) => ({
        ...prevState,
        strmtrlcode: value,
      }));
    }

    // PROCESS OR OPERATION
    if (name === "newSrlOperation") {
      setNewSerial((prevState) => ({
        ...prevState,
        Operation: value,
      }));
    } else if (name === "odrDtlOperation") {
      setordrDetailsChange((prevState) => ({
        ...prevState,
        Operation: value,
      }));
    } else if (name === "blkCngOperation") {
      setBlkChange((prevState) => ({
        ...prevState,
        Operation: value,
      }));
    } else if (name === "impDwgProcess") {
      setImprtDwgObj((prevState) => ({
        ...prevState,
        Operation: value,
      }));
    }
    // TOLERENCE
    if (name === "impDwgTolerance") {
      setImprtDwgObj((prevState) => ({
        ...prevState,
        StrTolerance: value,
      }));
    }
    // INSP LVL
    if (name === "newSrlInspLvl") {
      setNewSerial((prevState) => ({
        ...prevState,
        InspLvl: value,
      }));
    } else if (name === "odrDtlInspLvl") {
      setordrDetailsChange((prevState) => ({
        ...prevState,
        InspLvl: value,
      }));
    } else if (name === "blkCngInspLvl") {
      setBlkChange((prevState) => ({
        ...prevState,
        InspLvl: value,
      }));
    } else if (name === "impDwgInspLvl") {
      setImprtDwgObj((prevState) => ({
        ...prevState,
        InspLvl: value,
      }));
    }
    // PKNG LVL
    if (name === "newSrlPkngLvl") {
      setNewSerial((prevState) => ({
        ...prevState,
        PkngLvl: value,
      }));
    } else if (name === "odrDtlPkngLvl") {
      setordrDetailsChange((prevState) => ({
        ...prevState,
        PkngLvl: value,
      }));
    } else if (name === "blkCngPkngLvl") {
      setBlkChange((prevState) => ({
        ...prevState,
        PkngLvl: value,
      }));
    } else if (name === "impDwgPkngLvl") {
      setImprtDwgObj((prevState) => ({
        ...prevState,
        PkngLvl: value,
      }));
    }
    // MATERIAL SOURSE
    if (name === "newSrlMtrlSrc") {
      setNewSerial((prevState) => ({
        ...prevState,
        MtrlSrc: value,
      }));
    } else if (name === "odrDtlMtrlSrc") {
      //console.log("e.target.value---", e.target.value);
      setordrDetailsChange((prevState) => ({
        ...prevState,
        MtrlSrc: value,
      }));
    } else if (name === "blkCngMtrlSrc") {
      setBlkChange((prevState) => ({
        ...prevState,
        MtrlSrc: value,
      }));
    }
    // QUANTITY
    if (name === "newSrlQty") {
      const mvalue = e.target.value.replace(/[^0-9.]/g, "");
      setNewSerial((prevState) => ({
        ...prevState,
        quantity: mvalue,
      }));
    } else if (name === "odrDtlQuantity") {
      const mvalue = e.target.value.replace(/[^0-9.]/g, "");
      setordrDetailsChange((prevState) => ({
        ...prevState,
        quantity: mvalue,
      }));
    } else if (name === "blkCngQty") {
      const mvalue = e.target.value.replace(/[^0-9.]/g, "");
      setBlkChange((prevState) => ({
        ...prevState,
        quantity: mvalue,
      }));
    } else if (name === "impDwgQty") {
      const mvalue = e.target.value.replace(/[^0-9.]/g, "");
      setImprtDwgObj((prevState) => ({
        ...prevState,
        quantity: mvalue,
      }));
    }
    // JW RATE
    if (name === "newSrlJWRate") {
      const mvalue = e.target.value.replace(/[^0-9.]/g, "");
      setNewSerial((prevState) => ({
        ...prevState,
        jwRate: mvalue,
      }));
    } else if (name === "odrDtljwrate") {
      const mvalue = e.target.value.replace(/[^0-9.]/g, "");
      setordrDetailsChange((prevState) => ({
        ...prevState,
        jwRate: mvalue,
      }));
    } else if (name === "blkCngJWRate") {
      const mvalue = e.target.value.replace(/[^0-9.]/g, "");
      setBlkChange((prevState) => ({
        ...prevState,
        jwRate: mvalue,
      }));
    }
    // MTRL RATE
    if (name === "newSrlMaterialRate") {
      const mvalue = e.target.value.replace(/[^0-9.]/g, "");
      setNewSerial((prevState) => ({
        ...prevState,
        materialRate: mvalue,
      }));
    } else if (name === "odrDtlMtrlRate") {
      const mvalue = e.target.value.replace(/[^0-9.]/g, "");
      setordrDetailsChange((prevState) => ({
        ...prevState,
        materialRate: mvalue,
      }));
    } else if (name === "blkCngMrate") {
      const mvalue = e.target.value.replace(/[^0-9.]/g, "");
      setBlkChange((prevState) => ({
        ...prevState,
        materialRate: mvalue,
      }));
    }
    // UNIT PRICE
    if (name === "newSrlUnitPrice") {
      setNewSerial((prevState) => ({
        ...prevState,
        unitPrice: value,
      }));
    } else if (name === "odrDtlUnitPrice") {
      setordrDetailsChange((prevState) => ({
        ...prevState,
        unitPrice: value,
      }));
    } else if (name === "blkCngUnitPrice") {
      setBlkChange((prevState) => ({
        ...prevState,
        unitPrice: value,
      }));
    }
  };
  // order table edit
  // const handleJWMR = async (index, field, value) => {
  // 	console.log("value is", value);
  // 	if (value < 0) {
  // 		toast.error("Please Enter a Positive Number", {
  // 			position: toast.POSITION.TOP_CENTER,
  // 		});
  // 	} else {
  // 		const updatedDwgdata = [...filteredData];
  // 		// const updatedDwgdata = [...ordrDetailsChange];
  // 		// Update the specific item's field with the new value
  // 		updatedDwgdata[index] = {
  // 			...updatedDwgdata[index],
  // 			[field]: value,
  // 		};
  // 		setFilteredData(updatedDwgdata);
  // 		// setordrDetailsChange(updatedDwgdata);
  // 	}

  // 	// Prepare the data for the second update (updateOrderDetails)
  // 	const updateOrderDetailsData = {
  // 		orderNo: OrderData.Order_No,
  // 		filteredData,
  // 	};

  // 	// Call the updateOrderDetails API
  // 	const orderDetailsResponse = await postRequest(
  // 		endpoints.ordertablevaluesupdate,
  // 		updateOrderDetailsData
  // 	);

  // 	if (orderDetailsResponse.success) {
  // 		// toast.success("Order details updated successfully");
  // 		// fetchData(); // Fetch updated data after both updates
  // 	} else {
  // 		// toast.warning("Order details update failed, check once");
  // 	}
  // };
  // const handleJWMR = async (index, field, value) => {
  // 	console.log("value is", value);
  // 	if (value < 0) {
  // 		toast.error("Please Enter a Positive Number", {
  // 			position: toast.POSITION.TOP_CENTER,
  // 		});
  // 	} else {
  // 		// Clone and update the filtered data
  // 		const updatedDwgdata = [...filteredData];
  // 		updatedDwgdata[index] = {
  // 			...updatedDwgdata[index],
  // 			[field]: value,
  // 		};
  // 		// Update the state with the modified data
  // 		setFilteredData(updatedDwgdata);

  // 		// Prepare the data for the update
  // 		const updateOrderDetailsData = {
  // 			orderNo: OrderData.Order_No,
  // 			LastSlctedRow: LastSlctedRow, // Use the updated data directly here
  // 		};

  // 		// Call the updateOrderDetails API
  // 		const orderDetailsResponse = await postRequest(
  // 			endpoints.ordertablevaluesupdate,
  // 			updateOrderDetailsData
  // 		);

  // 		if (orderDetailsResponse.success) {
  // 			toast.success("Order details updated successfully", {
  // 				position: toast.POSITION.TOP_CENTER,
  // 			});
  // 			// Optionally fetch data again to verify the update
  // 			// fetchData();
  // 		} else {
  // 			toast.warning("Order details update failed, check once", {
  // 				position: toast.POSITION.TOP_CENTER,
  // 			});
  // 		}
  // 	}
  // };
  // const formatDate = (dateString) => {
  // 	const date = new Date(dateString);
  // 	const year = date.getFullYear();
  // 	const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Month is zero-based
  // 	const day = date.getDate().toString().padStart(2, "0");
  // 	// Use template literals to format the date
  // 	return `${year}-${month}-${day}`;
  // };
  // const [selectedEngineer, setSelectedEngineer] = useState(
  // 	props.OrderData?.Dealing_Engineer || ""
  // );
  // const [deliveryDate, setDeliveryDate] = useState(formatDate(""));
  // const [orderValue, setOrderValue] = useState(formatDate(""));
  // useEffect(() => {
  // 	if (props.OrderData?.Delivery_Date) {
  // 		setDeliveryDate(formatDate(OrderData?.Delivery_Date));
  // 	}
  // }, [props.OrderData?.Delivery_Date]);
  // useEffect(() => {
  // 	setSelectedEngineer(props.OrderData?.Dealing_Engineer);
  // }, [props.OrderData]);
  // console.log("selectedEngineer", selectedEngineer);

  // const handleChangeOrderInfo = (event) => {
  // 	const { id, value } = event.target;

  // 	if (id === "formDealingEngineer") {
  // 		const [selectedId, selectedName] = value.split(":");
  // 		console.log("Selected ID:", selectedId);
  // 		console.log("Selected Name 1:", selectedName);

  // 		setSelectedEngineer(selectedName);
  // 	} else if (id === "deliveryDate") {
  // 		console.log("value", value);

  // 		setDeliveryDate(value);
  // 	} else if (id === "OrderValue") {
  // 		console.log("value", value);

  // 		setOrderValue(value);
  // 	}
  // 	console.log("Selected Name 2", selectedEngineer);
  // 	// Prepare the data for the second update (updateOrderDetails)
  // 	const updateOrderDetailsData = {
  // 		orderNo: props?.OrderData?.Order_No,
  // 		deliveryDate: deliveryDate,
  // 		delEngr: selectedEngineer,
  // 		// delEngr: selectedName,
  // 	};

  // 	// Call the updateOrderDetails API
  // 	const orderDetailsResponse = postRequest(
  // 		endpoints.updateOrderTblDetails,
  // 		updateOrderDetailsData
  // 	);

  // 	if (orderDetailsResponse.success) {
  // 		// toast.success("Order details updated successfully");
  // 		// fetchData(); // Fetch updated data after both updates
  // 	} else {
  // 		// toast.warning("Order details update failed, check once");
  // 	}
  // };
  // console.log("Selected Name 3", selectedEngineer);
  // console.log("delivery date 1", deliveryDate);
  const handleJWMR = async (index, field, value) => {
    console.log("value is", value);
    if (value < 0) {
      toast.error("Please Enter a Positive Number", {
        position: toast.POSITION.TOP_CENTER,
      });
    } else {
      // Update LastSlctedRow fields directly, keeping it in sync with new value
      const updatedRow = {
        ...LastSlctedRow,
        [field]: value,
      };

      // Reflect LastSlctedRow change back into filteredData at the given index
      const updatedDwgdata = [...filteredData];
      updatedDwgdata[index] = updatedRow;

      // Update filtered data and LastSlctedRow states
      setFilteredData(updatedDwgdata);
      setLastSlctedRow(updatedRow);

      // Prepare data for API call, including the updated row
      const updateOrderDetailsData = {
        orderNo: OrderData.Order_No,
        OrderSrl: selectedSrl,
        LastSlctedRow: updatedRow, // Keeps row selection persistent
      };

      // Call the updateOrderDetails API
      const orderDetailsResponse = await postRequest(
        endpoints.ordertablevaluesupdate,
        updateOrderDetailsData
      );

      if (orderDetailsResponse.success) {
        toast.success("Order details updated successfully", {
          position: toast.POSITION.TOP_CENTER,
        });
        // Optionally fetch data again to verify updates
        // fetchData();
      } else {
        toast.warning("Order details update failed, check once", {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    }
  };

  let updateOrdrData = async () => {
    postRequest(
      endpoints.singleChangeUpdate,
      {
        OrderNo: Orderno,
        custcode: props.OrderCustData?.Cust_Code,
        DwgName: ordrDetailsChange.DwgName,
        MtrlSrc: ordrDetailsChange.MtrlSrc,
        quantity: ordrDetailsChange.quantity,
        OrderSrl: selectedSrl,
        JwCost: ordrDetailsChange.jwRate,
        mtrlcost: ordrDetailsChange.materialRate,

        unitPrice:
          parseFloat(ordrDetailsChange.jwRate) +
          parseFloat(ordrDetailsChange.materialRate),
        Operation: ordrDetailsChange.Operation,
        InspLvl: ordrDetailsChange.InspLvl,
        PkngLvl: ordrDetailsChange.PkngLvl,
        strmtrlcode: LastSlctedRow?.Mtrl_Code,
      },
      async (singleChngData) => {
        if (singleChngData.affectedRows != 0) {
          toast.success("Updated successfully");
          fetchData();
        } else {
          toast.warning("Serial not updated check once");
        }
      }
    );
  };
  // let updateOrdrData = async () => {
  // 	// Prepare the data for the first update (singleChangeUpdate)
  // 	const singleUpdateData = {
  // 		OrderNo: Orderno,
  // 		custcode: props.OrderCustData?.Cust_Code,
  // 		DwgName: ordrDetailsChange.DwgName,
  // 		MtrlSrc: ordrDetailsChange.MtrlSrc,
  // 		quantity: ordrDetailsChange.quantity,
  // 		OrderSrl: selectedSrl,
  // 		JwCost: ordrDetailsChange.jwRate,
  // 		mtrlcost: ordrDetailsChange.materialRate,
  // 		unitPrice:
  // 			parseFloat(ordrDetailsChange.jwRate) +
  // 			parseFloat(ordrDetailsChange.materialRate),
  // 		Operation: ordrDetailsChange.Operation,
  // 		InspLvl: ordrDetailsChange.InspLvl,
  // 		PkngLvl: ordrDetailsChange.PkngLvl,
  // 		strmtrlcode: LastSlctedRow?.Mtrl_Code,
  // 	};

  // 	// Call the singleChangeUpdate API
  // 	const singleChngData = await postRequest(
  // 		endpoints.singleChangeUpdate,
  // 		singleUpdateData
  // 	);

  // 	if (singleChngData.affectedRows !== 0) {
  // 		toast.success(" Updated successful");
  // 	} else {
  // 		toast.warning(" Update failed, check once");
  // 		return; // Exit if the single update fails
  // 	}

  // 	// Prepare the data for the second update (updateOrderDetails)
  // 	const updateOrderDetailsData = {
  // 		orderNo: Orderno,
  // 		// deliveryDate: deliveryDate, // Use the delivery date from your state
  // 		// delEngr: selectedEngineer, // Use the dealing engineer from your state
  // 	};

  // 	// Call the updateOrderDetails API
  // 	const orderDetailsResponse = await postRequest(
  // 		endpoints.updateOrderDetails,
  // 		updateOrderDetailsData
  // 	);

  // 	if (orderDetailsResponse.success) {
  // 		toast.success("Order details updated successfully");
  // 		fetchData(); // Fetch updated data after both updates
  // 	} else {
  // 		toast.warning("Order details update failed, check once");
  // 	}
  // };

  const [orderNo, setorderNo] = useState(location?.state);
  const [OrderData, setOrderData] = useState({});
  const [OrderCustData, setOrderCustData] = useState({});
  const [OrdrDetailsData, setOrdrDetailsData] = useState([]);
  const [BomData, setBomData] = useState([]);
  const [findOldpart, setfindOldpart] = useState();
  //profarmaInvDetail data
  const [profarmaInvMain, setProfarmaInvMain] = useState([]);
  const [profarmaInvDetails, setProfarmaInvDetails] = useState([]);
  // row selection data
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedSrl, setSelectedSrl] = useState([]);
  const [LastSlctedRow, setLastSlctedRow] = useState(null);
  //getScheduleList Table Data
  const [scheduleListData, setScheduleListData] = useState([]);
  const [oldOrderListData, setOldOrderListData] = useState([]);
  const [oldOrderDetailsData, setOldOrderDetailsData] = useState([]);

  // Register button
  const [isButtonDisabled, setButtonDisabled] = useState(false);
  // Alert Modals
  const [alertModal, setAlertModal] = useState(false);
  const [registerOrder, setRegisterOrder] = useState(false);

  const fetchData = () => {
    postRequest(
      endpoints.getOrderDetailsByOrdrNoAndType,
      { orderNo: orderNo, orderType: props.Type },
      (orderData) => {
        setOrderData(orderData?.orderData[0]);
        setOrderCustData(orderData?.custData[0]);

        postRequest(
          endpoints.GetBomData,
          { custcode: orderData?.custData[0]?.Cust_Code },
          (bomdata) => {
            console.log("bomdata", bomdata);
            setBomData(bomdata);
          }
        );
        postRequest(
          endpoints.GetFindOldpartData,
          { custcode: orderData?.custData[0]?.Cust_Code },
          (findOldpartData) => {
            setfindOldpart(findOldpartData);
          }
        );

        postRequest(
          endpoints.PostNewSrlData,
          { custcode: orderData?.custData[0]?.Cust_Code, OrderNo: orderNo },
          (ordrdtlsdata) => {
            setOrdrDetailsData(ordrdtlsdata);
          }
        );

        postRequest(
          endpoints.getOldOrderByCustCodeAndOrderNo,
          {
            Cust_Code: orderData?.orderData[0].Cust_Code,
            Order_No: orderData?.orderData[0].Order_No,
          },

          (oldOrderData) => {
            setOldOrderListData(oldOrderData.orderListData);
            setOldOrderDetailsData(oldOrderData.orderDetailsData);
          }
        );
      }
    );

    postRequest(
      endpoints.getProfarmaMain,
      { OrderNo: orderNo },
      (profarmaMainData) => {
        setProfarmaInvMain(profarmaMainData);
        // setOrdrDetailsData(ordrdtlsdata);
      }
    );
    postRequest(
      endpoints.getProfarmaDetails,
      { OrderNo: orderNo },
      (profarmaDetailsData) => {
        setProfarmaInvDetails(profarmaDetailsData);
        // setOrdrDetailsData(ordrdtlsdata);
      }
    );
    // postRequest(endpoints.getSalesExecLists, (data) => {
    // 	console.log("SalesExecListsData", data);
    // 	setSalesExecdata(data);
    // });

    setSelectedItems([]);
  };

  // useEffect(() => {
  const fetchSalesExecLists = async () => {
    try {
      const response = await axios.post(endpoints.getSalesExecLists);
      console.log("SalesExecListsData", response.data);
      setSalesExecdata(response.data);
    } catch (error) {
      console.error("Error fetching Sales Exec Lists", error);
    }
  };

  // }, []); // Empty dependency array to run once on mount
  console.log("salesExecdata", salesExecdata);
  console.log("setBomData", BomData);
  const calculateMinSrlStatus = () => {
    if (OrdrDetailsData.length === 0) return 0;

    return Math.min(
      ...OrdrDetailsData.map((order) => {
        if (order.Qty_Ordered === 0) return 0;
        else if (order.QtyDelivered >= order.Qty_Ordered) return 8;
        else if (order.QtyDelivered > 0 && order.QtyPacked >= order.Qty_Ordered)
          return 7;
        else if (order.QtyPacked >= order.Qty_Ordered) return 6;
        else if (order.QtyPacked > 0 && order.QtyProduced >= order.Qty_Ordered)
          return 5;
        else if (order.QtyProduced >= order.Qty_Ordered) return 4;
        else if (
          order.QtyProduced > 0 &&
          order.QtyScheduled >= order.Qty_Ordered
        )
          return 5;
        else if (order.QtyScheduled >= order.Qty_Ordered) {
          return 3;
        } else if (order.QtyScheduled > 0) return 2;
        else return 1;
      })
    );
  };

  const updateOrderStatus = () => {
    const status = getStatusText(intSchStatus);
  };

  const getStatusText = (status) => {
    switch (status) {
      case 8:
        return "Dispatched";
      case 7:
        return "Packed";
      case 6:
        return "Packed";
      case 5:
        return "Produced";
      case 4:
        return "Produced";
      case 3:
        return "Processing";
      case 2:
        return "Recorded";
      case 1:
        return "Recorded";
      case 0:
        return "Recorded";
      default:
        return "Confused";
    }
  };

  const setDetailsColour = () => {
    const rows = document.querySelectorAll(".order-details-row");
    rows.forEach((row) => {
      const srlStatus = parseInt(row.getAttribute("data-srlstatus"));
      let backgroundColor = ""; // Define backgroundColor here
      switch (srlStatus) {
        case 0:
          backgroundColor = "lavender";
          break;
        case 1:
          backgroundColor = "lightblue";
          break;
        case 2:
          backgroundColor = "lightcoral";
          break;
        case 3:
          backgroundColor = "lightyellow";
          break;
        case 4:
          backgroundColor = "yellow";
          break;
        case 5:
          backgroundColor = "greenyellow";
          break;
        case 6:
          backgroundColor = "lightgreen";
          break;
        case 7:
          backgroundColor = "orange";
          break;
        case 8:
          backgroundColor = "lightgreen";
          break;
        case 9:
          backgroundColor = "olivedrab";
          break;
        case 10:
          backgroundColor = "green";
          break;
        default:
          backgroundColor = "";
      }
      row.style.backgroundColor = backgroundColor;
    });
  };

  // Assuming you have state variables and setters for the conditions below
  const [messagee, setMessagee] = useState("");
  const [orderDetailsEnabled, setOrderDetailsEnabled] = useState(false);
  const [bulkChangeEnabled, setBulkChangeEnabled] = useState(false);
  const [addSrlVisible, setAddSrlVisible] = useState(false);
  const [bulkChangeVisible, setBulkChangeVisible] = useState(false);
  const [columnsReadOnly, setColumnsReadOnly] = useState({
    Dwg: true,
    Operation: false,
    QtyOrdered: false,
    JWCost: false,
    MtrlCost: false,
  });
  useEffect(() => {
    fetchData();
    setIntSchStatus(calculateMinSrlStatus());
    updateOrderStatus();
    // setDetailsColour();
    fetchSalesExecLists();
    // setOrderDetails();
  }, []);

  //   useEffect(() => {
  //     setOrderData(props.OrersData);
  //   }, [props.OrersData]);

  // alert modals for register and save
  const openModal = (e) => {
    e.preventDefault();
    setAlertModal(true);
  };
  const closeModal = () => {
    setAlertModal(false);
  };
  const openRegisterOrder = (e) => {
    e.preventDefault();
    setRegisterOrder(true);
  };
  const closeRegisterOrder = () => {
    setRegisterOrder(false);
  };

  console.log("Type", OrderData?.Order_Type);
  console.log("Status", OrderData?.Order_Status);
  // message for Register Button
  let message = "";
  switch (OrderData?.Order_Type) {
    case "Completed":
      message =
        "No changes for Quantity, PartName or Rate will be permitted once you register. Proceed?";

      break;
    case "Scheduled":
      message =
        "You can change only Quantity once you Register a Scheduled Order, Continue?";

      break;
    case "Open":
      message =
        "You can add new serials, change Quantity and rates once you Register an Open Order, Continue?";
  }
  // Register Button
  const handleRegisterBtn = () => {
    postRequest(
      endpoints.registerOrder,
      { Order_No: orderNo, Order_Status: "Recorded" },
      (registerOrderData) => {
        setOrderData({ ...OrderData, Order_Status: "Recorded" });
        toast.success("Order Registered Successfully");
        closeRegisterOrder();
      }
    );
    setButtonDisabled(true);
  };
  // Save Button
  const handleSaveBtn = () => {
    toast.success("Order Saved Successfully");
  };

  //ROW SEECTION FOR PROFILE
  const [orderDrawings, setOrderDrawings] = useState({});
  let [dxfFileData, setDxfFileData] = useState([]);
  let [lengthOfCut, setLengthOfCut] = useState(0);
  let [noOfPierces, setNoofPierces] = useState(0);
  let [partNetArea, setPartNetArea] = useState(0);
  let [outOpen, setOutOpen] = useState(0);
  let [complexity, setComplexity] = useState(0);
  let [hasOpenContour, setHasOpenContour] = useState(0);
  let [partNetWeight, setPartNetWeight] = useState(0);
  let [partOutArea, setPartOutArea] = useState(0);
  let [partOutWeight, setPartOutWeight] = useState(0);
  let [rectArea, setRectArea] = useState(0);
  let [rectWeight, setRectWeight] = useState(0);
  const [orderStatus, setOrderStatus] = useState("Created");
  let [Dwglist, setDwgList] = useState([]);
  const drawSvg = (text) => {
    //  console.log(text);
    setDxfFileData(text);
    //   console.log(String(text));
    const helper = new Helper(text);
    let svg = helper.toSVG();
    let svgContainer = document.getElementById("dxf-content-container");
    svgContainer.innerHTML = svg;
  };

  let displaydrawing = (file) => {
    //  console.log(file);
    let reader = new FileReader();
    reader.onload = function (event) {
      let text = event.target.result;
      drawSvg(text);
    };
    //  reader.readAsText(file.asInstanceOf[Blob]);
    reader.readAsText(file);
  };
  const selectedRowItem = (OrdrDetailsItem, imprtDwgObj) => {
    console.log("selectedRowItem entering");
    // console.log(OrdrDetailsData);
    selectItem(OrdrDetailsItem);
    // if (imprtDwgObj.material === "") {

    let srcpath = `\\Wo\\` + Orderno + "\\DXF\\";

    let filename = OrdrDetailsItem.DwgName;
    if (orderDrawings[window.Buffer.from(filename, "base64")]) {
      const drawingFile = new File(
        [orderDrawings[window.Buffer.from(filename, "base64")]],
        filename,
        { type: "plain/text" }
      );
      displaydrawing(drawingFile);
      window.dxffile = drawingFile;
      return;
    }
    console.log("filename", filename);
    getFileRequest(
      `${endpoints.getOrdDxf}?dxfName=${filename}&srcPath=${srcpath}`,
      async (res) => {
        if (res.status !== 200) {
          alert(" Try again Error fetching DXF file");
          return;
        }
        const content = await res.text();
        setOrderDrawings((prevState) => {
          return {
            ...prevState,
            [window.Buffer.from(filename, "base64")]: content,
          };
        });
        const drawingFile = new File([content], filename, {
          type: "plain/text",
        });
        displaydrawing(drawingFile);
        window.dxffile = drawingFile;
        return;
      }
    );
  };

  window.Buffer = Buffer;

  function arrayBufferToString(buffer, encoding, callback) {
    var blob = new Blob([buffer], { type: "text/plain" });
    var reader = new FileReader();
    reader.onload = function (evt) {
      callback(evt.target.result);
    };
    reader.readAsText(blob, encoding);
  }

  // new row
  const [selectedRows, setSelectedRows] = useState([]); // For multiple selections
  const [singleSelectedRow, setSingleSelectedRow] = useState(null); // For single selection

  // Handle multiple row selection (checkbox)
  // const handleMultipleRowSelection = (id) => {
  //   setSelectedRows((prevSelectedRows) => {
  //     if (prevSelectedRows.includes(id)) {
  //       // Deselect the row if already selected
  //       return prevSelectedRows.filter((rowId) => rowId !== id);
  //     } else {
  //       // Select the row
  //       return [...prevSelectedRows, id];
  //     }
  //   });
  // };
  const handleMultipleRowSelection = async (OrdrDetailsItem) => {
    console.log("filename", OrdrDetailsItem.DwgName);

    const isSelected = selectedItems.includes(OrdrDetailsItem);
    setSelectedItems((prevSelectedItems) => {
      const updatedSelectedItems = isSelected
        ? prevSelectedItems.filter((item) => item !== OrdrDetailsItem)
        : [...prevSelectedItems, OrdrDetailsItem];
      const selectedOrderSrl = updatedSelectedItems.map(
        (item) => item.Order_Srl
      );
      console.log("selectedOrderSrl", selectedOrderSrl);
      setDwgList(updatedSelectedItems);
      // setSelectedSrl(selectedOrderSrl);
      const lastSelectedRow =
        updatedSelectedItems[updatedSelectedItems.length - 1];
      console.log("lastselected row", lastSelectedRow);
      setLastSlctedRow(lastSelectedRow);
      setordrDetailsChange((prevState) => ({
        ...prevState,
        DwgName: lastSelectedRow?.DwgName || "",
        MtrlSrc: lastSelectedRow?.Mtrl_Source || "",
        jwRate: lastSelectedRow?.JWCost || "",
        quantity: lastSelectedRow?.Qty_Ordered || "",
        materialRate: lastSelectedRow?.MtrlCost || "",
        unitPrice: lastSelectedRow?.UnitPrice || "",
        Operation: lastSelectedRow?.Operation || "",
        InspLvl: lastSelectedRow?.InspLevel || "",
        PkngLvl: lastSelectedRow?.PackingLevel || "",
        strmtrlcode: lastSelectedRow?.Mtrl_Code || "",
      }));
      setSelectedSrl(selectedOrderSrl);
      return updatedSelectedItems;
    });

    if (props.Type === "Profile") {
      let srcpath = `\\Wo\\` + Orderno + "\\DXF\\";

      let filename = OrdrDetailsItem.DwgName;
      console.log("filename 123", filename);
      if (orderDrawings[window.Buffer.from(filename, "base64")]) {
        const drawingFile = new File(
          [orderDrawings[window.Buffer.from(filename, "base64")]],
          filename,
          { type: "plain/text" }
        );
        console.log("drawingFile", drawingFile);
        displaydrawing(drawingFile);
        window.dxffile = drawingFile;
        return;
      }
      console.log("filename", filename);
      await getFileRequest(
        `${endpoints.getOrdDxf}?dxfName=${filename}&srcPath=${srcpath}`,
        async (res) => {
          if (res.status !== 200) {
            // alert(" Try again Error fetching DXF file");
            toast.error(" Try again Error fetching DXF file");
            return;
          }
          const content = await res.text();
          setOrderDrawings((prevState) => {
            return {
              ...prevState,
              [window.Buffer.from(filename, "base64")]: content,
            };
          });
          const drawingFile = new File([content], filename, {
            type: "plain/text",
          });
          displaydrawing(drawingFile);
          window.dxffile = drawingFile;
          return;
        }
      );
    }
  };
  // Handle single row selection (on row click)
  const handleRowSelection = (OrdrDetailsItem) => {
    // setSingleSelectedRow(id);
    // Clear the multiple selection if any row is selected for single selection
    setSelectedItems([OrdrDetailsItem]); // Only one item should be selected
    setLastSlctedRow(OrdrDetailsItem);

    console.log("Single row selected:", OrdrDetailsItem);
    setSelectedRows([]);
  };

  // Row selection in orderDetails tab
  // const selectItem = async (OrdrDetailsItem) => {
  //   console.log("filename", OrdrDetailsItem.DwgName);

  //   const isSelected = selectedItems.includes(OrdrDetailsItem);
  //   setSelectedItems((prevSelectedItems) => {
  //     const updatedSelectedItems = isSelected
  //       ? prevSelectedItems.filter((item) => item !== OrdrDetailsItem)
  //       : [...prevSelectedItems, OrdrDetailsItem];
  //     const selectedOrderSrl = updatedSelectedItems.map(
  //       (item) => item.Order_Srl
  //     );
  //     console.log("selectedOrderSrl", selectedOrderSrl);
  //     setDwgList(updatedSelectedItems);
  //     // setSelectedSrl(selectedOrderSrl);
  //     const lastSelectedRow =
  //       updatedSelectedItems[updatedSelectedItems.length - 1];
  //     console.log("lastselected row", lastSelectedRow);
  //     setLastSlctedRow(lastSelectedRow);
  //     setordrDetailsChange((prevState) => ({
  //       ...prevState,
  //       DwgName: lastSelectedRow?.DwgName || "",
  //       MtrlSrc: lastSelectedRow?.Mtrl_Source || "",
  //       jwRate: lastSelectedRow?.JWCost || "",
  //       quantity: lastSelectedRow?.Qty_Ordered || "",
  //       materialRate: lastSelectedRow?.MtrlCost || "",
  //       unitPrice: lastSelectedRow?.UnitPrice || "",
  //       Operation: lastSelectedRow?.Operation || "",
  //       InspLvl: lastSelectedRow?.InspLevel || "",
  //       PkngLvl: lastSelectedRow?.PackingLevel || "",
  //       strmtrlcode: lastSelectedRow?.Mtrl_Code || "",
  //     }));
  //     setSelectedSrl(selectedOrderSrl);
  //     return updatedSelectedItems;
  //   });

  //   if (props.Type === "Profile") {
  //     let srcpath = `\\Wo\\` + Orderno + "\\DXF\\";

  //     let filename = OrdrDetailsItem.DwgName;
  //     console.log("filename 123", filename);
  //     if (orderDrawings[window.Buffer.from(filename, "base64")]) {
  //       const drawingFile = new File(
  //         [orderDrawings[window.Buffer.from(filename, "base64")]],
  //         filename,
  //         { type: "plain/text" }
  //       );
  //       console.log("drawingFile", drawingFile);
  //       displaydrawing(drawingFile);
  //       window.dxffile = drawingFile;
  //       return;
  //     }
  //     console.log("filename", filename);
  //     await getFileRequest(
  //       `${endpoints.getOrdDxf}?dxfName=${filename}&srcPath=${srcpath}`,
  //       async (res) => {
  //         if (res.status !== 200) {
  //           // alert(" Try again Error fetching DXF file");
  //           toast.error(" Try again Error fetching DXF file");
  //           return;
  //         }
  //         const content = await res.text();
  //         setOrderDrawings((prevState) => {
  //           return {
  //             ...prevState,
  //             [window.Buffer.from(filename, "base64")]: content,
  //           };
  //         });
  //         const drawingFile = new File([content], filename, {
  //           type: "plain/text",
  //         });
  //         displaydrawing(drawingFile);
  //         window.dxffile = drawingFile;
  //         return;
  //       }
  //     );
  //   }
  // };

  // 15-01-2025 row selection checkbox
  const selectItem = async (OrdrDetailsItem, isCheckboxSelection = false) => {
    console.log("Selected filename:", OrdrDetailsItem.DwgName);

    if (isCheckboxSelection) {
      // Multi-row selection via checkboxes
      const isSelected = selectedItems.includes(OrdrDetailsItem);
      console.log("isSelected", isSelected);

      setSelectedItems((prevSelectedItems) => {
        const updatedSelectedItems = isSelected
          ? prevSelectedItems.filter((item) => item !== OrdrDetailsItem)
          : [...prevSelectedItems, OrdrDetailsItem];

        console.log("Updated selected items:", updatedSelectedItems);

        // Update related states
        const selectedOrderSrl = updatedSelectedItems.map(
          (item) => item.Order_Srl
        );
        setDwgList(updatedSelectedItems);
        setSelectedSrl(selectedOrderSrl);

        return updatedSelectedItems;
      });
    } else {
      // Single-row selection
      setSelectedItems([OrdrDetailsItem]); // Only one item should be selected
      setLastSlctedRow(OrdrDetailsItem);

      console.log("Single row selected:", OrdrDetailsItem);

      // Update related states for single selection
      setordrDetailsChange((prevState) => ({
        ...prevState,
        DwgName: OrdrDetailsItem?.DwgName || "",
        MtrlSrc: OrdrDetailsItem?.Mtrl_Source || "",
        jwRate: OrdrDetailsItem?.JWCost || "",
        quantity: OrdrDetailsItem?.Qty_Ordered || "",
        materialRate: OrdrDetailsItem?.MtrlCost || "",
        unitPrice: OrdrDetailsItem?.UnitPrice || "",
        Operation: OrdrDetailsItem?.Operation || "",
        InspLvl: OrdrDetailsItem?.InspLevel || "",
        PkngLvl: OrdrDetailsItem?.PackingLevel || "",
        strmtrlcode: OrdrDetailsItem?.Mtrl_Code || "",
      }));
    }

    // Handle Profile-specific logic
    if (props.Type === "Profile") {
      const srcPath = `\\Wo\\${Orderno}\\DXF\\`;
      const filename = OrdrDetailsItem.DwgName;

      console.log("Fetching filename:", filename);

      const encodedFilename = window.Buffer.from(filename, "base64");
      if (orderDrawings[encodedFilename]) {
        const cachedFile = new File(
          [orderDrawings[encodedFilename]],
          filename,
          { type: "plain/text" }
        );
        console.log("Using cached drawing file:", cachedFile);
        displaydrawing(cachedFile);
        window.dxffile = cachedFile;
        return;
      }

      await getFileRequest(
        `${endpoints.getOrdDxf}?dxfName=${filename}&srcPath=${srcPath}`,
        async (res) => {
          if (res.status !== 200) {
            console.error("Error fetching DXF file, try again.");
            toast.error("Try again. Error fetching DXF file.");
            return;
          }

          const content = await res.text();
          setOrderDrawings((prevState) => ({
            ...prevState,
            [encodedFilename]: content,
          }));

          const fetchedFile = new File([content], filename, {
            type: "plain/text",
          });
          console.log("Fetched drawing file:", fetchedFile);
          displaydrawing(fetchedFile);
          window.dxffile = fetchedFile;
        }
      );
    }
  };

  //------------
  // const selectItem = async (OrdrDetailsItem, isCheckboxSelection = false) => {
  //   console.log("Selected filename:", OrdrDetailsItem.DwgName);
  //   if (typeof isCheckboxSelection !== "boolean") {
  //     console.error(
  //       "isCheckboxSelection is not a boolean. Value received:",
  //       isCheckboxSelection
  //     );
  //   } else {
  //     console.log("Is checkbox selection:", isCheckboxSelection); // This should now print correctly
  //   }

  //   if (isCheckboxSelection) {
  //     // Multi-row selection via checkboxes (keep as is)
  //     const isSelected = selectedItems.includes(OrdrDetailsItem);

  //     setSelectedItems((prevSelectedItems) => {
  //       const updatedSelectedItems = isSelected
  //         ? prevSelectedItems.filter((item) => item !== OrdrDetailsItem)
  //         : [...prevSelectedItems, OrdrDetailsItem];

  //       console.log("Updated selected items:", updatedSelectedItems);

  //       // Update related states
  //       const selectedOrderSrl = updatedSelectedItems.map(
  //         (item) => item.Order_Srl
  //       );
  //       setDwgList(updatedSelectedItems);
  //       setSelectedSrl(selectedOrderSrl);

  //       return updatedSelectedItems;
  //     });
  //   } else {
  //     // Single-row selection on click
  //     setSelectedItems([OrdrDetailsItem]); // Only one item should be selected
  //     setLastSlctedRow(OrdrDetailsItem);

  //     console.log("Single row selected:", OrdrDetailsItem);

  //     // Update related states for single selection
  //     setordrDetailsChange((prevState) => ({
  //       ...prevState,
  //       DwgName: OrdrDetailsItem?.DwgName || "",
  //       MtrlSrc: OrdrDetailsItem?.Mtrl_Source || "",
  //       jwRate: OrdrDetailsItem?.JWCost || "",
  //       quantity: OrdrDetailsItem?.Qty_Ordered || "",
  //       materialRate: OrdrDetailsItem?.MtrlCost || "",
  //       unitPrice: OrdrDetailsItem?.UnitPrice || "",
  //       Operation: OrdrDetailsItem?.Operation || "",
  //       InspLvl: OrdrDetailsItem?.InspLevel || "",
  //       PkngLvl: OrdrDetailsItem?.PackingLevel || "",
  //       strmtrlcode: OrdrDetailsItem?.Mtrl_Code || "",
  //     }));
  //   }

  //   // Handle Profile-specific logic
  //   if (props.Type === "Profile") {
  //     const srcPath = `\\Wo\\${Orderno}\\DXF\\`;
  //     const filename = OrdrDetailsItem.DwgName;

  //     console.log("Fetching filename:", filename);

  //     const encodedFilename = window.Buffer.from(filename, "base64");
  //     if (orderDrawings[encodedFilename]) {
  //       const cachedFile = new File(
  //         [orderDrawings[encodedFilename]],
  //         filename,
  //         { type: "plain/text" }
  //       );
  //       console.log("Using cached drawing file:", cachedFile);
  //       displaydrawing(cachedFile);
  //       window.dxffile = cachedFile;
  //       return;
  //     }

  //     await getFileRequest(
  //       `${endpoints.getOrdDxf}?dxfName=${filename}&srcPath=${srcPath}`,
  //       async (res) => {
  //         if (res.status !== 200) {
  //           console.error("Error fetching DXF file, try again.");
  //           toast.error("Try again. Error fetching DXF file.");
  //           return;
  //         }

  //         const content = await res.text();
  //         setOrderDrawings((prevState) => ({
  //           ...prevState,
  //           [encodedFilename]: content,
  //         }));

  //         const fetchedFile = new File([content], filename, {
  //           type: "plain/text",
  //         });
  //         console.log("Fetched drawing file:", fetchedFile);
  //         displaydrawing(fetchedFile);
  //         window.dxffile = fetchedFile;
  //       }
  //     );
  //   }
  // };

  //150120251648
  // const selectItem = async (OrdrDetailsItem, isCheckboxSelection = false) => {
  //   console.log("Selected filename:", OrdrDetailsItem.DwgName);
  //   console.log("isCheckboxSelection1", isCheckboxSelection);

  //   if (isCheckboxSelection) {
  //     // Multi-row selection via checkbox
  //     console.log("isCheckboxSelection2", isCheckboxSelection);
  //     setSelectedItems((prevSelectedItems) => {
  //       const isSelected = prevSelectedItems.includes(OrdrDetailsItem);

  //       // If already selected, remove from selectedItems, else add it
  //       const updatedSelectedItems = isSelected
  //         ? prevSelectedItems.filter((item) => item !== OrdrDetailsItem)
  //         : [...prevSelectedItems, OrdrDetailsItem];

  //       console.log("Updated selected items:", updatedSelectedItems);

  //       // Update related states
  //       const selectedOrderSrl = updatedSelectedItems.map(
  //         (item) => item.Order_Srl
  //       );
  //       setDwgList(updatedSelectedItems);
  //       setSelectedSrl(selectedOrderSrl);

  //       return updatedSelectedItems;
  //     });
  //   } else {
  //     // Single-row selection via row click
  //     console.log("isCheckboxSelection3", isCheckboxSelection);
  //     setSelectedItems([OrdrDetailsItem]); // Only one item selected on row click
  //     setLastSlctedRow(OrdrDetailsItem);

  //     console.log("Single row selected:", OrdrDetailsItem);

  //     // Update related states for single selection
  //     setordrDetailsChange((prevState) => ({
  //       ...prevState,
  //       DwgName: OrdrDetailsItem?.DwgName || "",
  //       MtrlSrc: OrdrDetailsItem?.Mtrl_Source || "",
  //       jwRate: OrdrDetailsItem?.JWCost || "",
  //       quantity: OrdrDetailsItem?.Qty_Ordered || "",
  //       materialRate: OrdrDetailsItem?.MtrlCost || "",
  //       unitPrice: OrdrDetailsItem?.UnitPrice || "",
  //       Operation: OrdrDetailsItem?.Operation || "",
  //       InspLvl: OrdrDetailsItem?.InspLevel || "",
  //       PkngLvl: OrdrDetailsItem?.PackingLevel || "",
  //       strmtrlcode: OrdrDetailsItem?.Mtrl_Code || "",
  //     }));
  //   }

  //   // Handle Profile-specific logic
  //   if (props.Type === "Profile") {
  //     const srcPath = `\\Wo\\${Orderno}\\DXF\\`;
  //     const filename = OrdrDetailsItem.DwgName;

  //     console.log("Fetching filename:", filename);

  //     const encodedFilename = window.Buffer.from(filename, "base64");
  //     if (orderDrawings[encodedFilename]) {
  //       const cachedFile = new File(
  //         [orderDrawings[encodedFilename]],
  //         filename,
  //         {
  //           type: "plain/text",
  //         }
  //       );
  //       console.log("Using cached drawing file:", cachedFile);
  //       displaydrawing(cachedFile);
  //       window.dxffile = cachedFile;
  //       return;
  //     }

  //     await getFileRequest(
  //       `${endpoints.getOrdDxf}?dxfName=${filename}&srcPath=${srcPath}`,
  //       async (res) => {
  //         if (res.status !== 200) {
  //           console.error("Error fetching DXF file, try again.");
  //           toast.error("Try again. Error fetching DXF file.");
  //           return;
  //         }

  //         const content = await res.text();
  //         setOrderDrawings((prevState) => ({
  //           ...prevState,
  //           [encodedFilename]: content,
  //         }));

  //         const fetchedFile = new File([content], filename, {
  //           type: "plain/text",
  //         });
  //         console.log("Fetched drawing file:", fetchedFile);
  //         displaydrawing(fetchedFile);
  //         window.dxffile = fetchedFile;
  //       }
  //     );
  //   }
  // };

  // for (let i = 0; i < selectItem.length; i++) {
  // 	// console.log("selectItem", selectItem[i].Order_Srl);
  // }
  // selectAll button
  const handleSelectAll = () => {
    setSelectedItems(OrdrDetailsData);
  };

  console.log("setSelectedItems", selectedItems);
  // reverse Button
  const handleReverseSelection = () => {
    if (selectedItems.length === 0) {
      handleSelectAll();
    } else {
      const newArray = [];

      for (let i = 0; i < OrdrDetailsData.length; i++) {
        const element = OrdrDetailsData[i];
        if (selectedItems.includes(element)) {
        } else {
          newArray.push(element);
        }
      }
      setSelectedItems(newArray);
    }
  };

  //Sales Job Work
  const [scheduleType, setScheduleType] = useState("Job Work");
  const [scheduleOption, setScheduleOption] = useState("Full Order");
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    setFilteredData(OrdrDetailsData);
  }, [OrdrDetailsData]);

  const handleScheduleTypeChange = (event) => {
    const { value } = event.target;
    setScheduleType(value);

    if (value === "Job Work") {
      const JWData = OrdrDetailsData.filter(
        (item) => item.Mtrl_Source.toLowerCase() === "customer"
      );
      setFilteredData(JWData);
    } else if (value === "Sales") {
      const SalesData = OrdrDetailsData.filter(
        (item) => item.Mtrl_Source.toLowerCase() === "magod"
      );

      setFilteredData(SalesData);
    } else {
      setFilteredData(OrdrDetailsData);
    }
  };

  // Handle change for schedule option radio buttons
  const handleScheduleOptionChange = (event) => {
    const { value } = event.target;
    setScheduleOption(value);
    if (value === "Partial Order") {
      toast.warning("Only Selected Serials will be included in the Schedule", {
        position: toast.POSITION.TOP_CENTER,
      });
    } else {
      toast.warning("All Serials will be included in the Schedule", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  return (
    <>
      <div>
        <FormHeader
          OrderData={OrderData}
          OrderCustData={OrderCustData}
          handleRegisterBtn={handleRegisterBtn}
          handleSaveBtn={handleSaveBtn}
          isButtonDisabled={isButtonDisabled}
          openRegisterOrder={openRegisterOrder}
          closeRegisterOrder={closeRegisterOrder}
          openModal={openModal}
          closeModal={closeModal}
          updateOrdrData={updateOrdrData}
        />

        <Tabs className="nav-tabs tab_font">
          <Tab eventKey="orderinfo" title="Order Info">
            <OrderInfo
              OrderData={OrderData}
              salesExecdata={salesExecdata}
              // handleChangeOrderInfo={handleChangeOrderInfo}
              // deliveryDate={deliveryDate}
            />
          </Tab>
          <Tab
            eventKey="productionschedulecreation"
            title="Production Schedule Creation"
          >
            <ProductionScheduleCreation
              OrderData={OrderData}
              selectedItems={selectedItems}
              setScheduleListData={setScheduleListData}
              scheduleType={scheduleType}
              scheduleOption={scheduleOption}
              handleScheduleTypeChange={handleScheduleTypeChange}
              handleScheduleOptionChange={handleScheduleOptionChange}
              OrdrDetailsData={OrdrDetailsData}
            />
          </Tab>
          <Tab eventKey="findoldpart" title="Find Old Part">
            <FindOldPart
              OrderData={OrderData}
              findOldpart={findOldpart}
              setfindOldpart={setfindOldpart}
            />
          </Tab>
          <Tab eventKey="materialinfo" title="Material Info">
            <MaterialInfo OrderData={OrderData} />
          </Tab>
        </Tabs>
        <div className="mt-1">
          <Tabs className="nav-tabs tab_font">
            <Tab eventKey="orderdetails" title="Order Details">
              <OrderDetails
                OrderData={OrderData}
                OrderCustData={OrderCustData}
                OrdrDetailsData={OrdrDetailsData}
                setOrdrDetailsData={setOrdrDetailsData}
                selectedItems={selectedItems}
                setSelectedItems={setSelectedItems}
                selectItem={selectItem}
                selectedRowItem={selectedRowItem}
                LastSlctedRow={LastSlctedRow}
                setLastSlctedRow={setLastSlctedRow}
                // handleBulkCngBtn={handleBulkCngBtn}
                fetchData={fetchData}
                BomData={BomData}
                setBomData={setBomData}
                findOldpart={findOldpart}
                setfindOldpart={setfindOldpart}
                handleSelectAll={handleSelectAll}
                handleReverseSelection={handleReverseSelection}
                selectedSrl={selectedSrl}
                // insertnewsrldata={insertnewsrldata}
                oldOrderListData={oldOrderListData}
                oldOrderDetailsData={oldOrderDetailsData}
                //---------new
                newSerial={newSerial}
                setNewSerial={setNewSerial}
                ordrDetailsChange={ordrDetailsChange}
                setordrDetailsChange={setordrDetailsChange}
                blkChange={blkChange}
                setBlkChange={setBlkChange}
                imprtDwgObj={imprtDwgObj}
                setImprtDwgObj={setImprtDwgObj}
                handleChange={handleChange}
                InputField={InputField}
                setDetailsColour={setDetailsColour}
                calculateMinSrlStatus={calculateMinSrlStatus}
                updateOrderStatus={updateOrderStatus}
                getStatusText={getStatusText}
                scheduleType={scheduleType}
                scheduleOption={scheduleOption}
                filteredData={filteredData}
                setFilteredData={setFilteredData}
                Dwglist={Dwglist}
                // newSerial={newSerial}
                // setNewSerial={setNewSerial}
                handleJWMR={handleJWMR}
                handleRowSelection={handleRowSelection}
                handleMultipleRowSelection={handleMultipleRowSelection}
              />
            </Tab>
            <Tab eventKey="scheduleList" title="Schedule List">
              <ScheduleList
                OrderData={OrderData}
                OrderCustData={OrderCustData}
                scheduleListData={scheduleListData}
                setScheduleListData={setScheduleListData}
                type={props.Type}
                scheduleType={scheduleType}
                OrdrDetailsData={OrdrDetailsData}
              />
            </Tab>
            <Tab eventKey="profarmaInvoiceList" title="Proforma Invoice List">
              <ProfarmaInvoiceList
                OrderData={OrderData}
                OrderCustData={OrderCustData}
                selectedItems={selectedItems}
                profarmaInvMain={profarmaInvMain}
                profarmaInvDetails={profarmaInvDetails}
                fetchData={fetchData}
              />
            </Tab>
            {/* {props.Type === "Profile" ? (
							<Tab
								eventKey="materialPlanner"
								title="Material Planner">
								<MaterialPlanner OrderData={OrderData} />
							</Tab>
						) : null} */}
          </Tabs>
        </div>

        <AlertModal
          show={alertModal}
          onHide={(e) => setAlertModal(e)}
          firstbutton={closeModal}
          title="magod_Order"
          message="Record Saved"
          firstbuttontext="Ok"
        />

        <AlertModal
          show={registerOrder}
          onHide={(e) => setRegisterOrder(e)}
          firstbutton={handleRegisterBtn}
          secondbutton={closeRegisterOrder}
          title="magod_Order"
          message={message}
          firstbuttontext="Yes"
          secondbuttontext="No"
        />
      </div>
    </>
  );
}
