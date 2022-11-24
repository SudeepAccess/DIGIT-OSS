import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Card, Row, Col } from "react-bootstrap";
// import {AiFillCheckCircle, AiFillCloseCircle} from "react-icons/ai";
import Modal from "react-bootstrap/Modal";
// import TextField from '@mui/material/TextField';
// import CalculateIcon from '@mui/icons-material/Calculate';
// import InfoIcon from '@mui/icons-material/Info';
// import * as Icon from "react-bootstrap-icons";
// import { XCircleFill } from "react-bootstrap-icons";
// import { CheckCircleFill } from "react-bootstrap-icons";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

import Collapse from "react-bootstrap/Collapse";
import ModalChild from "./Remarks/ModalChild";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import { useStyles } from "./css/personalInfoChild.style";

const Genarelinfo = (props) => {
  const [showhide1, setShowhide1] = useState("No");
  const [uncheckedValue, setUncheckedVlue] = useState([]);
  const [checkValue, setCheckedVAlue] = useState([]);
  // const [fieldValue, setFieldValue] = useState("");

  const genarelinfo = props.genarelinfo;
  const dataIcons = props.dataForIcons;

  const applicantInfoPersonal = props.ApiResponseData;
  console.log("personal info applicant data1", applicantInfoPersonal);

  const handleshow1 = (e) => {
    const getshow = e.target.value;
    setShowhide1(getshow);
  };
  const handleChange = (e) => {
    this.setState({ isRadioSelected: true });
  };

  const [showhide2, setShowhide2] = useState("No");
  const [open, setOpen] = useState(false);

  const handleshow2 = (e) => {
    const getshow = e.target.value;
    setShowhide2(getshow);
  };
  const [purpose, setPurpose] = useState("");
  const handleChangesetPurpose = (e) => {
    setPurpose(e.target.value);
    localStorage.setItem("Purpose", e.target.value);
    props.passUncheckedList({ data: uncheckedValue, purpose: e?.target?.value });
  };

  const [form, setForm] = useState([]);
  const [open2, setOpen2] = useState(false);
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const [showhide, setShowhide] = useState("No");

  // const [purpose, setPurpose] = useState("");
  // const handleChangesetPurpose = (e) => {
  //   setPurpose(e.target.value);
  //   localStorage.setItem("Purpose", e.target.value);
  // };

  const handleshow = (e) => {
    const getshow = e.target.value;
    setShowhide(getshow);
  };
  const [noChecked, setNochecked] = useState(true);
  const [warningOrred, setwarningOrred] = useState("#ffcf33");

  const [smShow2, setSmShow2] = useState(false);
  const [smShow3, setSmShow3] = useState(false);

  const [color, setColor] = useState({ yes: false, no: false });

  const [modaldData, setmodaldData] = useState({ label: "", Remarks: "" });
  const [isyesOrNochecked, setYesorNochecked] = useState(true);



  const handleYesOrNochecked = (data) => {
    setYesorNochecked(data.data);
  };
  const handlemodalsubmit = () => {
    console.log("here");
    const filteredObj = uncheckedValue.filter((obj) => {
      return obj.label == modaldData.label;
    });
    const filteredObjCheked = checkValue.filter((obj) => {
      return obj.label == modaldData.label;
    });
    if (filteredObj.length !== 0) {
      const removedList = uncheckedValue.filter((obj) => {
        return obj.label !== modaldData.label;
      });
      setUncheckedVlue(removedList);
    }
    if (filteredObjCheked.length !== 0) {
      const removedList = checkValue.filter((obj) => {
        return obj.label !== modaldData.label;
      });
      setCheckedVAlue(removedList);
    }

    if (isyesOrNochecked === false) {
      if (modaldData.label !== "" || modaldData.Remarks !== "") {
        if (filteredObj.length === 0) {
          setUncheckedVlue((prev) => [...prev, modaldData]);
        }
      }
    } else {
      if (modaldData.label !== "" || modaldData.Remarks !== "") {
        if (filteredObjCheked.length === 0) {
          setCheckedVAlue((prev) => [...prev, modaldData]);
        }
      }
    }
  };
  useEffect(() => {
    console.log("called");
    handlemodalsubmit();
  }, [modaldData.Remarks]);
  useEffect(() => {
    props.passUncheckedList({ data: uncheckedValue });
  }, [uncheckedValue]);

  useEffect(() => {
    props.passCheckedList({ data: checkValue });
  }, [checkValue]);
  console.log("unchecked values", uncheckedValue);

  console.log(uncheckedValue.indexOf("developer"));

  const developerInputFiledColor = uncheckedValue.filter((obj) => {
    return obj.label === "Purpose Of License";
  });
  const developerInputCheckedFiledColor = checkValue.filter((obj) => {
    return obj.label === "Purpose Of License";
  });
  console.log("color from array", developerInputFiledColor);

  const developerInputFiledColor1 = uncheckedValue.filter((obj) => {
    return obj.label === "Potential Zone";
  });
  const developerInputCheckedFiledColor1 = checkValue.filter((obj) => {
    return obj.label === "Potential Zone";
  });
  const developerInputFiledColor2 = uncheckedValue.filter((obj) => {
    return obj.label === "district";
  });
  const developerInputCheckedFiledColor2 = checkValue.filter((obj) => {
    return obj.label === "district";
  });
  const developerInputFiledColor3 = uncheckedValue.filter((obj) => {
    return obj.label === "State";
  });
  const developerInputCheckedFiledColor3 = checkValue.filter((obj) => {
    return obj.label === "State";
  });
  const developerInputFiledColor4 = uncheckedValue.filter((obj) => {
    return obj.label === "Tehsil";
  });
  const developerInputCheckedFiledColor4 = checkValue.filter((obj) => {
    return obj.label === "Tehsil";
  });
  const developerInputFiledColor5 = uncheckedValue.filter((obj) => {
    return obj.label === "Revenue estate";
  });
  const developerInputCheckedFiledColor5 = checkValue.filter((obj) => {
    return obj.label === "Revenue estate";
  });
  const developerInputFiledColor6 = uncheckedValue.filter((obj) => {
    return obj.label === "Rectangle No.";
  });
  const developerInputCheckedFiledColor6 = checkValue.filter((obj) => {
    return obj.label === "Rectangle No.";
  });
  const developerInputFiledColor7 = uncheckedValue.filter((obj) => {
    return obj.label === "Killa";
  });
  const developerInputCheckedFiledColor7 = checkValue.filter((obj) => {
    return obj.label === "Killa";
  });
  const developerInputFiledColor8 = uncheckedValue.filter((obj) => {
    return obj.label === "Land owner";
  });
  const developerInputCheckedFiledColor8 = checkValue.filter((obj) => {
    return obj.label === "Land owner";
  });

  const developerInputFiledColor10 = uncheckedValue.filter((obj) => {
    return obj.label === "Consolidation Type";
  });
  const developerInputCheckedFiledColor10 = checkValue.filter((obj) => {
    return obj.label === "Consolidation Type";
  });
  const developerInputFiledColor11 = uncheckedValue.filter((obj) => {
    return obj.label === "Kanal/Bigha";
  });
  const developerInputCheckedFiledColor11 = checkValue.filter((obj) => {
    return obj.label === "Kanal/Bigha";
  });
  const developerInputFiledColor12 = uncheckedValue.filter((obj) => {
    return obj.label === "Marla/Biswa";
  });
  const developerInputCheckedFiledColor12 = checkValue.filter((obj) => {
    return obj.label === "Marla/Biswa";
  });
  const developerInputFiledColor13 = uncheckedValue.filter((obj) => {
    return obj.label === "Khewat";
  });
  const developerInputCheckedFiledColor13 = checkValue.filter((obj) => {
    return obj.label === "Khewat";
  });

  console.log("color for the deeloper", developerInputFiledColor);

  const classes = useStyles();

  const [smShow, setSmShow] = useState(false);
  const [labelValue, setLabelValue] = useState("");
  const Colors = {
    approved: "#09cb3d",
    disapproved: "#ff0000",
    info: "#FFB602"
  }
  const [selectedFieldData, setSelectedFieldData] = useState();
  const [fieldValue, setFieldValue] = useState("");
  const [openedModal, setOpennedModal] = useState("")
  const [fieldIconColors, setFieldIconColors] = useState({
    purpose: Colors.info,
    potential: Colors.info,
    district: Colors.info,
    state: Colors.info,
    tehsil: Colors.info,
    revenue: Colors.info,
    rectangleNo: Colors.info,
    killa: Colors.info,
    landOwner: Colors.info,
    consolidationType: Colors.info,
    bigha: Colors.info,
    biswa: Colors.info,
    khewat: Colors.info,
  })

  const fieldIdList = [{ label: "Purpose Of License", key: "purpose" }, { label: "Potential Zone", key: "potential" }, { label: "District", key: "district" }, { label: "State", key: "state" }, { label: "Tehsil", key: "tehsil" }, { label: "Revenue estate", key: "revenue" }, { label: "Rectangle No.", key: "rectangleNo" }, { label: "Killa", key: "killa" }, { label: "Land Owner", key: "landOwner" }, { label: "Consolidation Type", key: "consolidationType" }, { label: "Bigha", key: "bigha" }, { label: "Biswa", key: "biswa" }, { label: "Khewat", key: "khewat" }];


  const getColorofFieldIcon = () => {
    let tempFieldColorState = fieldIconColors;
    fieldIdList.forEach((item) => {
      if (dataIcons !== null && dataIcons !== undefined) {
        console.log("color method called");
        const fieldPresent = dataIcons?.egScrutiny?.filter(ele => (ele.fieldIdL === item.label));
        console.log("filteration value111", fieldPresent, fieldPresent[0]?.isApproved);
        if (fieldPresent && fieldPresent.length) {
          console.log("filteration value111", fieldPresent, fieldPresent[0]?.isApproved);
          tempFieldColorState = { ...tempFieldColorState, [item.key]: fieldPresent[0].isApproved ? Colors.approved : Colors.disapproved }

        }
      }
    })

    setFieldIconColors(tempFieldColorState);

  };


  useEffect(() => {
    getColorofFieldIcon();
    console.log("repeating1...",)
  }, [dataIcons])

  useEffect(() => {
    if (labelValue) {
      const fieldPresent = dataIcons?.egScrutiny?.filter(ele => (ele.fieldIdL === labelValue));
      setSelectedFieldData(fieldPresent[0]);
    } else {
      setSelectedFieldData(null);
    }
  }, [labelValue])



  const currentRemarks = (data) => {
    props.showTable({ data: data.data });
  };

  const handlemodaldData = (data) => {
    // setmodaldData(data.data);
    setSmShow(false);
    console.log("here", openedModal, data);
    if (openedModal && data) {
      setFieldIconColors({ ...fieldIconColors, [openedModal]: data.data.isApproved ? Colors.approved : Colors.disapproved })
    }
    setOpennedModal("");
    setLabelValue("");
  };

  return (
    <Form ref={props.generalInfoRef}>
      <ModalChild
        labelmodal={labelValue}
        passmodalData={handlemodaldData}
        displaymodal={smShow}
        onClose={() => setSmShow(false)}
        selectedFieldData={selectedFieldData}
        fieldValue={fieldValue}
        remarksUpdate={currentRemarks}
      ></ModalChild>
      <div
        className="collapse-header"
        onClick={() => setOpen2(!open2)}
        aria-controls="example-collapse-text"
        aria-expanded={open2}
        style={{
          background: "#f1f1f1",
          padding: "0.25rem 1.25rem",
          borderRadius: "0.25rem",
          fontWeight: "600",
          display: "flex",
          cursor: "pointer",
          color: "#817f7f",
          justifyContent: "space-between",
          alignContent: "center",
        }}
      >
        <span style={{ color: "#817f7f" }} className="">
          Application Purpose
        </span>
        {open2 ? <RemoveIcon></RemoveIcon> : <AddIcon></AddIcon>}
      </div>
      <Collapse in={open2}>
        <div id="example-collapse-text">
          <Form.Group className="justify-content-center" controlId="formBasicEmail" style={{ border: "2px solid #e9ecef", margin: 10, padding: 20 }}>
            <Row className="ml-auto" style={{ marginBottom: 5 }}>
              <Col md={4} xxl lg="3">
                <Form.Label>
                  {/* <b></b>  */}
                  <h5 className={classes.formLabel}>
                    Purpose Of License  <span style={{ color: "red" }}>*</span>
                  </h5>
                </Form.Label>

                <div className="d-flex flex-row  align-items-center">
                  <Form.Control
                    type="text"
                    placeholder={applicantInfoPersonal !== null ? applicantInfoPersonal?.purpose : null}
                    // onChange={handleChangesetPurpose}
                    height={30}
                    style={{ maxWidth: 200, marginRight: 5 }}
                    disabled
                  >
                    {/* <select className="form-control" id="Puropse" name="potential" placeholder="Puropse" onChange={handleChangesetPurpose} readOnly> */}
                    {/* <option value="">--Purpose--</option>
                    <option value="01">Plotted Commercial</option>
                    <option value="02">Group Housing Commercial</option>
                    <option value="03">AGH </option>
                    <option value="04">Commercial Integrated </option>
                    <option value="05">Commercial Plotted</option>
                    <option value="06">Industrial Colony Commercial</option>
                    <option value="07">IT Colony Commercial</option>
                    <option value="08">DDJAY</option>
                    <option value="12">TOD Group housing</option> */}
                    {/* </select> */}
                  </Form.Control>
                  <ReportProblemIcon
                    style={{
                      color: fieldIconColors.purpose
                    }}
                    onClick={() => {
                      setOpennedModal("purpose")
                      setLabelValue("Purpose Of License"),
                        setSmShow(true),
                        console.log("modal open"),
                        setFieldValue(applicantInfoPersonal !== null ? applicantInfoPersonal?.purpose : null);
                    }}
                  ></ReportProblemIcon>
                  {/* <ModalChild
                    labelmodal={labelValue}
                    passmodalData={handlemodaldData}
                    isYesorNoChecked={handleYesOrNochecked}
                    displaymodal={smShow}
                  ></ModalChild> */}
                  {/* <ModalChild
                    labelmodal={labelValue}
                    passmodalData={handlemodaldData}
                    isYesorNoChecked={handleYesOrNochecked}
                    displaymodal={smShow}
                    setColor={setColor}
                    // fieldValue={labelValue}
                    fieldValue={fieldValue}
                  // remarksUpdate={currentRemarks}
                  ></ModalChild> */}
                </div>
              </Col>
              <div className="col col-3">
                <label htmlFor="potential">
                  <h5 className={classes.formLabel}>
                    Potential Zone:<span style={{ color: "red" }}>*</span>
                  </h5>
                </label>
                  
                <div className="d-flex flex-row  align-items-center">
                  <Form.Control
                    height={30}
                    style={{ maxWidth: 200, marginRight: 5 }}
                    placeholder={applicantInfoPersonal !== null ? applicantInfoPersonal?.potential : null}
                    className="form-control"
                    id="potential"
                    name="potential"
                    disabled
                  >
                    {/* // <option value=""></option>
                    // <option value="K.Mishra">Hyper</option>
                    // <option value="potential 1">High I</option>
                    // <option value="potential 2">High II</option>
                    // <option value="potential 2">Medium</option>
                    // <option value="potential 2">Low I</option>
                    // <option value="potential 2">Low II</option> */}
                  </Form.Control>
                  {/* <Form.Control height={30} style={{ maxWidth: 200, marginRight: 5 }} readOnly></Form.Control> */}
                  <ReportProblemIcon
                    style={{
                      color: fieldIconColors.potential
                    }}
                    onClick={() => {
                      setLabelValue("Potential Zone"),
                      setOpennedModal("potential")
                        setSmShow(true),
                        console.log("modal open"),
                        setFieldValue(applicantInfoPersonal !== null ? applicantInfoPersonal?.potential : null);
                    }}
                  ></ReportProblemIcon>
                </div>
              </div>
              <Col md={4} xxl lg="3">
                <div>
                  <Form.Label>
                    <h5 className={classes.formLabel}>
                      District:  <span style={{ color: "red" }}>*</span>
                    </h5>
                    {/* <span style={{ color: "red" }}>*</span> */}
                  </Form.Label>
                  
                </div>
                <div>
                  <div className="d-flex flex-row  align-items-center">
                    <Form.Control
                      height={30}
                      style={{ maxWidth: 200, marginRight: 5 }}
                      placeholder={applicantInfoPersonal !== null ? applicantInfoPersonal?.district : null}
                      disabled
                    >
                      {/* <option value="1">no district</option> */}
                    </Form.Control>
                    <ReportProblemIcon
                      style={{
                        color: fieldIconColors.district
                      }}
                      onClick={() => {
                        setLabelValue("District"),
                        setOpennedModal("district")
                          setSmShow(true),
                          console.log("modal open"),
                          setFieldValue(applicantInfoPersonal !== null ? applicantInfoPersonal?.district : null);
                      }}
                    ></ReportProblemIcon>
                  </div>
                </div>
              </Col>
              <Col md={4} xxl lg="3">
                <div>
                  <Form.Label>
                    <h5 className={classes.formLabel}>
                      State  <span style={{ color: "red" }}>*</span>
                    </h5>
                    {/* <span style={{ color: "red" }}>*</span> */}
                  </Form.Label>
                      
                </div>
                <div>
                  <div className="d-flex flex-row  align-items-center">
                    <Form.Control
                      height={30}
                      style={{ maxWidth: 200, marginRight: 5 }}
                      placeholder={applicantInfoPersonal !== null ? applicantInfoPersonal?.state : null}
                      disabled
                    ></Form.Control>
                    <ReportProblemIcon
                      style={{
                        color: fieldIconColors.state
                      }}
                      onClick={() => {
                        setLabelValue("State"),
                        setOpennedModal("state")
                          setSmShow(true),
                          console.log("modal open"),
                          setFieldValue(applicantInfoPersonal !== null ? applicantInfoPersonal?.state : null);
                      }}
                    ></ReportProblemIcon>
                  </div>
                </div>
                {/* <Form.Control type="text" defaultValue="Haryana" disabled></Form.Control> */}
              </Col>
            </Row>
            {/* <Collapse in={open}>
        <div id="example-collapse-text"> */}
            <div className="ml-auto" style={{ marginTop: 20 }}>
              <h2 style={{ fontSize: 24 }}>2. Details of applied land:</h2>
              <p className="ml-3 mt-1">
                Note: The term “Collaboration agreement" shall include all Development agreements/ Joint Venture agreements/ Joint Development
                agreements/ Memorandum of Understanding etc. and similar agreements registered with competent authority.
              </p>
              <p className="ml-3 mt-1">
                <b>(i) Khasra-wise information to be provided in the following format:</b> 
              </p>
            </div>
            {/* <div className="ml-auto"></div> */}
            <br></br>

            <div>
              <table className="table table-bordered">
                <thead>
                  <tr className="border-bottom-0">
                    <th class="fw-normal pb-0 border-bottom-0 align-top">
                      Tehsil    
                      {/* <div className="d-flex flex-row  align-items-center"> */}
                      {/* <Form.Control height={30} style={{ maxWidth: 120, marginRight: 5 }} disabled></Form.Control> */}
                      {/* </div> */}
                    </th>
                    <th class="fw-normal pb-0 border-bottom-0 align-top">
                      Revenue estate    
                      {/* <div className="d-flex flex-row  align-items-center"> */}
                      {/* <Form.Control height={30} style={{ maxWidth: 120, marginRight: 5 }} disabled></Form.Control> */}
                      {/* </div> */}
                    </th>
                    <th class="fw-normal pb-0 border-bottom-0 align-top">
                      Rectangle No.   
                      {/* <div className="d-flex flex-row  align-items-center"> */}
                      {/* <Form.Control height={30} style={{ maxWidth: 120, marginRight: 5 }} disabled></Form.Control> */}
                      {/* </div> */}
                    </th>
                    <th class="fw-normal pb-0 border-bottom-0 align-top">
                      Killa  
                      {/* <div className="d-flex flex-row  align-items-center"> */}
                      {/* <Form.Control height={30} style={{ maxWidth: 120, marginRight: 5 }} disabled></Form.Control> */}
                      {/* </div> */}
                    </th>
                    <th class="fw-normal pb-0 border-bottom-0 align-top">
                      Land owner  
                      {/* <div className="d-flex flex-row  align-items-center"> */}
                      {/* <Form.Control height={30} style={{ maxWidth: 120, marginRight: 5 }} disabled></Form.Control> */}
                      {/* </div> */}
                    </th>
                    <th class="fw-normal pb-0 border-bottom-0 align-top">
                      Consolidation Type  
                      {/* <div className="d-flex flex-row  align-items-center"> */}
                      {/* <Form.Control height={30} style={{ maxWidth: 120, marginRight: 5 }} disabled></Form.Control> */}
                      {/* </div> */}
                    </th>
                    <th class="fw-normal pb-0 border-bottom-0 align-top">
                      Kanal/Bigha  
                      {/* <div className="d-flex flex-row  align-items-center"> */}
                      {/* <Form.Control height={30} style={{ maxWidth: 120, marginRight: 5 }} disabled></Form.Control> */}
                      {/* </div> */}
                    </th>
                    <th class="fw-normal pb-0 border-bottom-0 align-top">
                      Marla/Biswa  
                      {/* <div className="d-flex flex-row  align-items-center"> */}
                      {/* <Form.Control height={30} style={{ maxWidth: 120, marginRight: 5 }} disabled></Form.Control> */}
                      {/* </div> */}
                    </th>

                    {/* <th>Sarsai</th>
                <th>Bigha</th>
                <th>Biswa</th>
                <th>Biswansi</th>
                <th>Area  </th> */}
                    <th class="fw-normal pb-0 border-bottom-0 align-top">
                      {" "}
                      {/* <h6 data-toggle="tooltip" data-placement="top" title="Whether collaboration agreement entered for the Khasra?(yes/no)"> */}
                      Khewat  
                      {/* <div className="d-flex flex-row  align-items-center"> */}
                      {/* <Form.Control height={30} style={{ maxWidth: 120, marginRight: 5 }} disabled></Form.Control> */}
                      
                      {/* </div> */}
                      {/* <InfoIcon style={{color:"blue"}}/>  */}

                      {/* </h6> */}
                    </th>
                  </tr>
                  <tr className="border-top-0">
                    <th class="fw-normal py-0 border-top-0">
                      {/* <div className="d-flex flex-row  align-items-center"> */}
                      {/* <Form.Control height={30} style={{ maxWidth: 120, marginRight: 5 }} disabled></Form.Control> */}
                      <ReportProblemIcon
                        style={{
                          color: fieldIconColors.tehsil
                        }}
                        onClick={() => {
                          setLabelValue("Tehsil"),
                          setOpennedModal("tehsil")
                          setSmShow(true),
                          console.log("modal open"),
                          setFieldValue(applicantInfoPersonal?.AppliedLandDetails[0] !== null ? applicantInfoPersonal?.AppliedLandDetails[0].tehsil : null);
                        }}
                      ></ReportProblemIcon>
                      {/* </div> */}
                    </th>
                    <th class="fw-normal py-0 border-top-0">
                      {/* <div className="d-flex flex-row  align-items-center"> */}
                      {/* <Form.Control height={30} style={{ maxWidth: 120, marginRight: 5 }} disabled></Form.Control> */}
                      <ReportProblemIcon
                        style={{
                          color: fieldIconColors.revenue
                        }}
                        onClick={() => {
                          setLabelValue("Revenue estate"),
                          setOpennedModal("revenue")
                          setSmShow(true),
                          console.log("modal open"),
                          setFieldValue(applicantInfoPersonal?.AppliedLandDetails[0] !== null ? applicantInfoPersonal?.AppliedLandDetails[0]?.revenueEstate : null);
                        }}
                      ></ReportProblemIcon>
                      {/* </div> */}
                    </th>
                    <th class="fw-normal py-0 border-top-0">
                      {/* <div className="d-flex flex-row  align-items-center"> */}
                      {/* <Form.Control height={30} style={{ maxWidth: 120, marginRight: 5 }} disabled></Form.Control> */}
                      <ReportProblemIcon
                        style={{
                          color: fieldIconColors.rectangleNo
                        }}
                        onClick={() => {
                          setLabelValue("Rectangle No."),
                          setOpennedModal("rectangeNo")
                          setSmShow(true),
                          console.log("modal open"),
                          setFieldValue(applicantInfoPersonal?.AppliedLandDetails[0] !== null ? applicantInfoPersonal?.AppliedLandDetails[0]?.tehsil : null);
                        }}
                      ></ReportProblemIcon>
                      {/* </div> */}
                    </th>
                    <th class="fw-normal py-0 border-top-0">
                      {/* <div className="d-flex flex-row  align-items-center"> */}
                      {/* <Form.Control height={30} style={{ maxWidth: 120, marginRight: 5 }} disabled></Form.Control> */}
                      <ReportProblemIcon
                        style={{
                          color: fieldIconColors.killa
                        }}
                        onClick={() => {
                          setLabelValue("Killa"),
                          setOpennedModal("killa")
                          setSmShow(true),
                          console.log("modal open"),
                          setFieldValue(applicantInfoPersonal?.AppliedLandDetails[0] !== null ? applicantInfoPersonal?.AppliedLandDetails[0]?.tehsil : null);
                        }}
                      ></ReportProblemIcon>
                      {/* </div> */}
                    </th>
                    <th class="fw-normal py-0 border-top-0">
                      {/* <div className="d-flex flex-row  align-items-center"> */}
                      {/* <Form.Control height={30} style={{ maxWidth: 120, marginRight: 5 }} disabled></Form.Control> */}
                      <ReportProblemIcon
                        style={{
                          color: fieldIconColors.landOwner
                        }}
                        onClick={() => {
                          setLabelValue("Land owner"),
                          setOpennedModal("landOwner")
                          setSmShow(true),
                          console.log("modal open"),
                          setFieldValue(applicantInfoPersonal?.AppliedLandDetails[0] !== null ? applicantInfoPersonal?.AppliedLandDetails[0]?.tehsil : null);
                        }}
                      ></ReportProblemIcon>
                      {/* </div> */}
                    </th>
                    <th class="fw-normal py-0 border-top-0">
                      {/* <div className="d-flex flex-row  align-items-center"> */}
                      {/* <Form.Control height={30} style={{ maxWidth: 120, marginRight: 5 }} disabled></Form.Control> */}
                      <ReportProblemIcon
                        style={{
                          color: fieldIconColors.consolidationType
                        }}
                        onClick={() => {
                          setLabelValue("Consolidation Type"),
                          setOpennedModal("consolidationType")
                          setSmShow(true),
                          console.log("modal open"),
                          setFieldValue(applicantInfoPersonal?.AppliedLandDetails[0] !== null ? applicantInfoPersonal?.AppliedLandDetails[0]?.tehsil : null);
                        }}
                      ></ReportProblemIcon>
                      {/* </div> */}
                    </th>
                    <th class="fw-normal py-0 border-top-0">
                      {/* <div className="d-flex flex-row  align-items-center"> */}
                      {/* <Form.Control height={30} style={{ maxWidth: 120, marginRight: 5 }} disabled></Form.Control> */}
                      <ReportProblemIcon
                        style={{
                          color: fieldIconColors.bigha
                        }}
                        onClick={() => {
                          setLabelValue("Bigha"),
                          setOpennedModal("bigha")
                          setSmShow(true),
                          console.log("modal open"),
                          setFieldValue(applicantInfoPersonal?.AppliedLandDetails[0] !== null ? applicantInfoPersonal?.AppliedLandDetails[0]?.bigha : null);
                        }}
                      ></ReportProblemIcon>
                      {/* </div> */}
                    </th>
                    <th class="fw-normal py-0 border-top-0">
                      {/* <div className="d-flex flex-row  align-items-center"> */}
                      {/* <Form.Control height={30} style={{ maxWidth: 120, marginRight: 5 }} disabled></Form.Control> */}
                      <ReportProblemIcon
                        style={{
                          color: fieldIconColors.biswa
                        }}
                        onClick={() => {
                          setLabelValue("Biswa"),
                          setOpennedModal("biswa")
                          setSmShow(true),
                          console.log("modal open"),
                          setFieldValue(applicantInfoPersonal?.AppliedLandDetails[0] !== null ? applicantInfoPersonal?.AppliedLandDetails[0]?.biswa : null);
                        }}
                      ></ReportProblemIcon>
                      {/* </div> */}
                    </th>

                    {/* <th>Sarsai</th>
                <th>Bigha</th>
                <th>Biswa</th>
                <th>Biswansi</th>
                <th>Area  </th> */}
                    <th class="fw-normal py-0 border-top-0">
                      {" "}
                      {/* <h6 data-toggle="tooltip" data-placement="top" title="Whether collaboration agreement entered for the Khasra?(yes/no)"> */}
                      
                      {/* <div className="d-flex flex-row  align-items-center"> */}
                      {/* <Form.Control height={30} style={{ maxWidth: 120, marginRight: 5 }} disabled></Form.Control> */}
                      <ReportProblemIcon
                        style={{
                          color: fieldIconColors.khewat
                        }}
                        onClick={() => {
                          setLabelValue("Khewat"),
                          setOpennedModal("khewat")
                          setSmShow(true),
                          console.log("modal open"),
                          setFieldValue(applicantInfoPersonal?.AppliedLandDetails[0] !== null ? applicantInfoPersonal?.AppliedLandDetails[0]?.khewat : null);
                        }}
                      ></ReportProblemIcon>
                      {/* </div> */}
                      {/* <InfoIcon style={{color:"blue"}}/>  */}

                      {/* </h6> */}
                    </th>
                  </tr>
                </thead>
                <tbody>
                {
                    applicantInfoPersonal?.AppliedLandDetails?.map((item,index)=>(
                      
                  <tr key={index}>
                    <td>
                      <input type="text" className="form-control" disabled />
                    </td>
                    <td>
                      <input type="text" className="form-control" disabled />
                    </td>
                    <td>
                      <input type="text" className="form-control" disabled />
                    </td>
                    <td class="text-center">
                      <input type="text" className="form-control" disabled />
                    </td>
                    <td class="text-center">
                      <input type="text" className="form-control" disabled />
                    </td>
                    <td class="text-center">
                      {" "}
                      <input type="text" className="form-control" disabled />{" "}
                    </td>
                    <td class="text-center">
                      <input type="text" className="form-control" disabled />
                    </td>
                    <td class="text-center">
                      <input type="text" className="form-control" disabled />
                    </td>
                    {/* <td class="text-center">
                  <input type="text" className="form-control" disabled />
                </td>
                <td class="text-center">
                  <input type="text" className="form-control" disabled />
                </td>
                <td class="text-center">
                  <input type="text" className="form-control" disabled />
                </td>
                <td class="text-center">
                  <input type="text" className="form-control" disabled />
                </td>
                <td class="text-center">
                  <input type="text" className="form-control" disabled />
                </td> */}
                    <td class="text-center">
                      {" "}
                      <input type="text" className="form-control" disabled />
                    </td>
                  </tr>
                    ))
                  }
                </tbody>
              </table>
            </div>
            {/* </div>
      </Collapse> */}
            {/* <div style={{ position: "relative", marginBottom: 40 }}>
              <Button onClick={() => props.passUncheckedList({ data: uncheckedValue, purpose: purpose })}>Submit</Button>
            </div> */}
          </Form.Group>
          <br></br>

          {/* <hr></hr> */}
        </div>
      </Collapse>
      {/* </Card> */}
    </Form>
  );
};

export default Genarelinfo;
