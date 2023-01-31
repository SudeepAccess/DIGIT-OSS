import React, { useState, useEffect } from "react";
import { Card, Row, Col, Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import axios from "axios";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Dialog } from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import FileUploadIcon from '@mui/icons-material/FileUpload';

const ServicePlanService = () => {
  const [file, setFile] = useState(null);
  const [LOCNumber, setLOCNumber] = useState("");
  const [submitDataLabel, setSubmitDataLabel] = useState([]);
  const [ServicePlanDataLabel, setServicePlanDataLabel] = useState([]);
  const [docUpload, setDocuploadData] = useState([]);
  const [open, setOpen] = useState(false)
  const [applicationNumber, setApplicationNumber] = useState()
  const [valid, setValid] = useState("")
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    watch,
  } = useForm({
    mode: "onChange",

    shouldFocusError: true,
  });
  const userInfo = Digit.UserService.getUser();
  const servicePlan = async (data) => {
    const token = window?.localStorage?.getItem("token");
    const tenantId = Digit.ULBService.getCurrentTenantId();
    console.log(data, "service-service");
    try {
      const postDistrict = {
        requestInfo: {
          api_id: "Rainmaker",
          ver: "1",
          ts: null,
          action: "create",
          did: "",
          key: "",
          msg_id: "",
          requester_id: "",
          authToken: token,
          "userInfo": userInfo.info
        },

        ServicePlanRequest: [{
          ...data,
          "action": "APPLY",
          "tenantId":  tenantId,
          "businessService": "SERVICE_PLAN",
          "workflowCode": "SERVICE_PLAN",
          "comment": "",
          "assignee": null
        }],
      };
      const Resp = await axios.post("/tl-services/serviceplan/_create", postDistrict);
      setServicePlanDataLabel(Resp.data);
      setOpen(true)
      setApplicationNumber(Resp.data.servicePlanResponse[0].applicationNumber)

    } catch (error) {
      console.log(error.message);
    }
  };
  const [fileStoreId, setFileStoreId] = useState({});

  const checkDuplicates = (arr) => {
    let count = {}
    for(let i=0; i<arr.length; i++){
      count[arr[i]] = (count[arr[i]] || 0) + 1
    }
    const arr1 = Object.values(count)
    console.log({count, arr1});
    if(arr1.some((e) => e > 1)) {
      return true
    }
    return false
  }
  
  const viewDocument = async (documentId) => {
    try {
      const response = await axios.get(`/filestore/v1/files/url?tenantId=hr&fileStoreIds=${documentId}`, {});
      const FILDATA = response.data?.fileStoreIds[0]?.url;
      window.open(FILDATA);
    } catch (error) {
      console.log(error);
    }
  }

  const getDocumentData = async (file, fieldName) => {
    setValid((arr) => [...arr, file.name])
    const formData = new FormData();
    formData.append("file", file);
    formData.append("tenantId", "hr");
    formData.append("module", "property-upload");
    formData.append("tag", "tag-property");
    // setLoader(true);
    try {
      const Resp = await axios.post("/filestore/v1/files", formData, {});
      setValue(fieldName, Resp?.data?.files?.[0]?.fileStoreId);
      setFileStoreId({ ...fileStoreId, [fieldName]: Resp?.data?.files?.[0]?.fileStoreId });
      // setDocId(Resp?.data?.files?.[0]?.fileStoreId);
      // console.log("getval======", getValues());
      // setLoader(false);
    } catch (error) {
      // setLoader(false);
      console.log(error.message);
    }
  };

  const closeModal = () => {
    setOpen(false)
    window.location.href = `/digit-ui/citizen`
  }

  // const getSubmitDataLabel = async () => {
  //   try {
  //     const postDistrict = {
  //       requestInfo: {
  //         api_id: "1",
  //         ver: "1",
  //         ts: null,
  //         action: "create",
  //         did: "",
  //         key: "",
  //         msg_id: "",
  //         requester_id: "",
  //         auth_token: null,
  //       },
  //     };

  //     const Resp = await axios.post(`http://10.1.1.18:80/land-services/serviceplan/_get?loiNumber=123`, postDistrict);
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // };
  // useEffect(() => {
  //   getSubmitDataLabel();
  // }, []);

  return (
    <React.Fragment>
    <form onSubmit={handleSubmit(servicePlan)}>
      <Card style={{ width: "126%", border: "5px solid #1266af" }}>
        <h4 style={{ fontSize: "25px", marginLeft: "21px" }}>Service Plan </h4>
        <Card style={{ width: "126%", marginLeft: "-2px", paddingRight: "10px", marginTop: "40px", marginBottom: "52px" }}>
          <Row>
            <Col className="col-4">
              <div>
                <label>
                  <h2>
                    LOI Number <span style={{ color: "red" }}>*</span>
                  </h2>
                </label>
              </div>
              <input
                type="number"
                className="form-control"
                {...register("loiNumber")}
                onChange={(e) => setLOCNumber(e.target.value)}
                value={LOCNumber}
              />
            </Col>
            {/* <Col className="col-4">
              <div>
                <label>
                  <h2 data-toggle="tooltip" data-placement="top" title=" Is the uploaded Service Plan in accordance to the Standard designs?">
                    Uploaded Service Plan <span style={{ color: "red" }}>*</span>
                  </h2>
                </label>
              </div>
              <Form.Check
                value="Y"
                type="radio"
                id="default-radio"
                label="Yes"
                name="true"
                {...register("selfCertifiedDrawingsFromCharetedEng")}
                inline
              ></Form.Check>
              <Form.Check
                value="N"
                type="radio"
                id="default-radio"
                label="No"
                name="false"
                {...register("selfCertifiedDrawingsFromCharetedEng")}
                inline
              ></Form.Check>
            </Col> */}
            {/* <Col className="col-4">
              <div>
                <label>
                  <h2>Undertaking</h2>
                </label>
              </div>
              <Form.Check value="Y" type="radio" id="default-radio" label="Yes" name="true" {...register("undertaking")} inline></Form.Check>
              <Form.Check value="N" type="radio" id="default-radio" label="No" name="false" {...register("undertaking")} inline></Form.Check>
            </Col> */}
          </Row>
          <br></br>
          <div className="table table-bordered table-responsive">
            <thead>
              <tr>
                <td style={{ textAlign: "center" }}> Sr.No.</td>
                <td style={{ textAlign: "center" }}>Type Of Map/Plan</td>
                <td style={{ textAlign: "center" }}>Annexure</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div className="px-2">
                    <p className="mb-2">1.</p>
                  </div>
                </td>
                <td component="th" scope="row">
                  <h2>Self-certified drawings from empanelled/certified architects that conform to the standard approved template as per the TCP layout plan / Site plan.</h2>
                </td>
                <td component="th" scope="row">
                  <label for='file-input-1'>
                    <FileUploadIcon 
                    color="primary"
                    />
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    id="file-input-1"
                    onChange={(e) => getDocumentData(e?.target?.files[0], "selfCertifiedDrawingFromEmpaneledDoc")}
                    style={{display: "none"}}
                  />
                    
                  {fileStoreId?.selfCertifiedDrawingFromEmpaneledDoc ? 
                  <VisibilityIcon color="primary" onClick={() => viewDocument(fileStoreId?.selfCertifiedDrawingFromEmpaneledDoc)}>
                    {" "}
                  </VisibilityIcon>
                  : "" }
                </td>
              </tr>
              <tr>
                <td>
                  <div className="px-2">
                    <p className="mb-2">2.</p>
                  </div>
                </td>
                <td component="th" scope="row">
                  <h2>Environmental Clearance.</h2>
                </td>
                <td component="th" scope="row">
                <label for='file-input-2'>
                    <FileUploadIcon 
                    color="primary"
                    />
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    id="file-input-2"
                    // {...register("environmentalClearance")}
                    onChange={(e) => getDocumentData(e?.target?.files[0], "environmentalClearance")}
                    style={{display: "none"}}
                  />
                  {fileStoreId?.environmentalClearance ? 
                  <VisibilityIcon color="primary" onClick={() => viewDocument(fileStoreId?.environmentalClearance)}>
                    {" "}
                  </VisibilityIcon>
                  : ""}
                </td>
              </tr>
              <tr>
                <td>
                  <div className="px-2">
                    <p className="mb-2">3.</p>
                  </div>
                </td>
                <td component="th" scope="row">
                  <h2>Service plan in PDF (OCR Compatible) + GIS format.</h2>
                </td>
                <td component="th" scope="row">
                <label for='file-input-3'>
                    <FileUploadIcon 
                    color="primary"
                    />
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    // {...register("shapeFileAsPerTemplate")}
                    id="file-input-3"
                    onChange={(e) => getDocumentData(e?.target?.files[0], "shapeFileAsPerTemplate")}
                    style={{display: "none"}}
                  />
                  {fileStoreId?.shapeFileAsPerTemplate ? 
                  <VisibilityIcon color="primary" onClick={() => viewDocument(fileStoreId?.shapeFileAsPerTemplate)}>
                    {" "}
                  </VisibilityIcon>
                    : ""}
                </td>
              </tr>
              <tr>
                <td>
                  <div className="px-2">
                    <p className="mb-2">4.</p>
                  </div>
                </td>
                <td component="th" scope="row">
                  <h2>Service plan in AutoCAD (DXF) file.</h2>
                </td>
                <td component="th" scope="row">
                <label for='file-input-4'>
                    <FileUploadIcon 
                    color="primary"
                    />
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    id="file-input-4"
                    // {...register("autoCadFile")}
                    onChange={(e) => getDocumentData(e?.target?.files[0], "autoCadFile")}
                    style={{display: "none"}}
                  />
                  {fileStoreId?.autoCadFile ? 
                  <VisibilityIcon color="primary" onClick={() => viewDocument(fileStoreId?.autoCadFile)}>
                    {" "}
                  </VisibilityIcon>
                  : "" }
                </td>
              </tr>
              <tr>
                <td>
                  <div className="px-2">
                    <p className="mb-2">5.</p>
                  </div>
                </td>
                <td component="th" scope="row">
                  <h2>Certified copy of the Service plan verified by a third party.</h2>
                </td>
                <td component="th" scope="row">
                <label for='file-input-5'>
                    <FileUploadIcon 
                    color="primary"
                    />
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    // {...register("certifieadCopyOfThePlan")}
                    id="file-input-5"
                    onChange={(e) => getDocumentData(e?.target?.files[0], "certifieadCopyOfThePlan")}
                    style={{display: "none"}}
                  />
                  {fileStoreId?.certifieadCopyOfThePlan ? 
                  <VisibilityIcon color="primary" onClick={() => viewDocument(fileStoreId?.certifieadCopyOfThePlan)}>
                    {" "}
                  </VisibilityIcon>
                  : "" }
                </td>
              </tr>
            </tbody>
          </div>

          <div class="row">
            <div class="col-sm-12 text-right">
              <button type="submit" id="btnSearch" class="btn btn-primary btn-md center-block">
                Submit
              </button>
            </div>
          </div>
        </Card>
      </Card>
    </form>
    <Dialog
    open={open}
    onClose={handleClose}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
    >
    <DialogTitle id="alert-dialog-title">
        Service Plan Submission
    </DialogTitle>
    <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <p>Your Service Plan is submitted successfully <span><CheckCircleOutlineIcon style={{color: 'blue', variant: 'filled'}}/></span></p>
            <p>Please Note down your Application Number <span style={{padding: '5px', color: 'blue'}}>{applicationNumber}</span> for further assistance</p>
          </DialogContentText>
    </DialogContent>
    <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Ok
          </Button>
    </DialogActions>

    </Dialog>
    </React.Fragment>
  );
};

export default ServicePlanService;
