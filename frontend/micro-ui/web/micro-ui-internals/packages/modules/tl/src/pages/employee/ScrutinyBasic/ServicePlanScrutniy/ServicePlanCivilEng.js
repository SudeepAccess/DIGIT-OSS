// import React, { useState, useEffect, useContext } from "react";
// import { Card, Row, Col, Form, Button } from "react-bootstrap";
// const ServicePlanCivil = () => 
// { 
//     const userRoles = Digit.UserService.getUser()?.info?.roles.map((item) => item.code)  || [];
//     const showActionButton = userRoles.includes("CE_HQ")
//     console.log("logg123" ,userRoles, showActionButton );
//     return (
//     <Card style={{ width: "126%", marginLeft: "-2px", paddingRight: "10px", marginTop: "40px", marginBottom: "52px" }}>
//               <Row>
//                     <Col className="col-4">
//                   <Form.Label>
//                     <div>
//                       <label>
//                         <h2 data-toggle="tooltip" data-placement="top" title=" Is the uploaded Service Plan in accordance to the Standard designs?">
//                           Uploaded Service Plan <span style={{ color: "red" }}>*</span>
//                         </h2>
//                       </label>
//                     </div>

//                     <div className="d-flex flex-row">
//                       <input
//                         type="radio"
//                         disabled={!showActionButton}
//                         value="Yes"
//                         //  checked={apiResponse?.selfCertifiedDrawingsFromCharetedEng === "Y" ? true : false}
//                       />
//                       <label className="m-0  mx-2" for="Yes">
//                         Yes
//                       </label>
//                       <input
//                         type="radio"
//                         disabled={!showActionButton}
//                         value="No"
//                         //  checked={apiResponse?.selfCertifiedDrawingsFromCharetedEng === "N" ? true : false}
//                       />
//                       <label className="m-0 mx-2" for="No">
//                         No
//                       </label>
//                       {/* <ReportProblemIcon
//                         style={{
//                           color: fieldIconColors.selfCertifiedDrawingsFromCharetedEng,
//                         }}
//                         onClick={() => {
//                           setOpennedModal("selfCertifiedDrawingsFromCharetedEng");
//                           setLabelValue("Uploaded Service Plan"),
//                             setSmShow(true),
//                             console.log("modal open"),
//                             setFieldValue(apiResponse !== null ? apiResponse.selfCertifiedDrawingsFromCharetedEng : null);
//                         }}
//                       ></ReportProblemIcon> */}
//                     </div>
//                   </Form.Label>
//                 </Col>
//               </Row>
// </Card>
//     );
// };
// export default ServicePlanCivil;










///////////////////////////////////////////////////////////////////

import React, { useState, useEffect } from "react";
import { Card, Row, Col, Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
// import axios from "axios";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Dialog } from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';

// const ServicePlanCivil = () => {
    function ServicePlanCivil() {

    const userRoles = Digit.UserService.getUser()?.info?.roles.map((item) => item.code)  || [];
    const showActionButton = userRoles.includes("CE_HQ")
    // console.log("logg123" ,userRoles, showActionButton );
    const [selects, setSelects] = useState();
    const [showhide, setShowhide] = useState("");
   
  
    const handleshowhide = (event) => {
      const getuser = event.target.value;
  
      setShowhide(getuser);
    };
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
  const [open, setOpen] = useState(false)
  const [applicationNumber, setApplicationNumber] = useState()

  const [developerDataLabel, setDeveloperDataLabel] = useState([]);

  const servicePlan = (data) => console.log("tcp18" ,data);

  const handleClose = () => {
    setOpen(false)
    window.location.href = `/digit-ui/employee`
  }
 
  return (
    <React.Fragment>

    <form onSubmit={handleSubmit(servicePlan)}>
      {/* <Card > */}
        {/* <h4 style={{ fontSize: "25px", marginLeft: "21px" }}>Electrical Plan </h4> */}
        <Card style={{ width: "126%", marginLeft: "-2px", paddingRight: "10px", marginTop: "20px", marginBottom: "52px" }}>
          <Row className="ml-auto" style={{ marginBottom: 3 }}>
           
            <Col md={6} xxl lg="6">
              <div>
                <Form.Label>
                  <h2>
                  As per the approved layout plan/building plans 
                    &nbsp;&nbsp;
                  </h2>
                  {/* <Tooltip title="As per the approved layout plan/building plans">
                  
                     <h2> plan/building plans 
                         </h2> 
                         
                         </Tooltip> */}
                </Form.Label>
                <br></br>
                <Form.Check
                  onChange={(e) => console.log(e)}
                  value="Y"
                  type="radio"
                  id="default-radio"
                  label="Yes"
                  name="true"
                //   disabled={!}
                  disabled={!showActionButton}
                  {...register("electricInfra")}
                  inline
                ></Form.Check>
                <Form.Check
                  onChange={(e) => console.log(e)}
                  value="N"
                  type="radio"
                  id="default-radio"
                  label="No"
                  name="false"
                  disabled={!showActionButton}
                  {...register("electricInfra")}
                  inline
                ></Form.Check>
              </div>
            </Col>
            <Col  md={6} xxl lg="6">
              <div>
                <Form.Label>
                Level of stormwater and sewer line in conformity with approved EDC infrastructure works{" "}
                  <span style={{ color: "red" }}>*</span>
                  {/* <Tooltip title="Level of stormwater and sewer line in conformity with approved EDC infrastructure works">
                     <h2>approved EDC infrastructure works</h2> </Tooltip> */}
                </Form.Label>
              </div>
              <Form.Check
                onChange={(e) => console.log(e)}
                value="Y"
                type="radio"
                id="default-radio"
                label="Yes"
                name="true"
                disabled={!showActionButton}
                {...register("electricDistribution")}
                inline
              ></Form.Check>
              <Form.Check
                onChange={(e) => console.log(e)}
                value="N"
                type="radio"
                id="default-radio"
                label="No"
                name="false"
                disabled={!showActionButton}
                {...register("electricDistribution")}
                inline
              ></Form.Check>
            </Col>
            <br></br>
            <Col  md={6} xxl lg="6">
              <div>
                <Form.Label>
                Showing the location of the sewer line, and stormwater line to connect the trunk water supply network <span style={{ color: "red" }}>*</span> &nbsp;&nbsp;

                </Form.Label>
              </div>
              <Form.Check
                onChange={(e) => console.log(e)}
                value="Y"
                type="radio"
                id="default-radio"
                label="Yes"
                name="true"
                disabled={!showActionButton}
                {...register("electricalCapacity")}
                inline
              ></Form.Check>
              <Form.Check
                onChange={(e) => console.log(e)}
                value="N"
                type="radio"
                id="default-radio"
                label="No"
                name="false"
                disabled={!showActionButton}
                {...register("electricalCapacity")}
                inline
              ></Form.Check>
            </Col>
            
            <Col  md={6} xxl lg="6">
              <div>
                <Form.Label>
                Water supply, sewer, and stormwater network connected with proposed/existing master services
                  <span style={{ color: "red" }}>*</span>
                </Form.Label>
              </div>
              <Form.Check
                onChange={(e) => console.log(e)}
                value="Y"
                type="radio"
                id="default-radio"
                label="Yes"
                name="true"
                disabled={!showActionButton}
                {...register("switchingStation")}
                inline
              ></Form.Check>
              <Form.Check
                onChange={(e) => console.log(e)}
                value="N"
                type="radio"
                id="default-radio"
                label="No"
                name="false"
                disabled={!showActionButton}
                {...register("switchingStation")}
                inline
              ></Form.Check>
            </Col>
            <br></br>
            <Col  md={6} xxl lg="6">
              <div>
                <Form.Label>
                Proposed source of water supply <span style={{ color: "red" }}>*</span> 
                </Form.Label>
              </div>
              <Form.Check
                onChange={(e) => console.log(e)}
                value="Y"
                type="radio"
                id="default-radio"
                label="Yes"
                name="true"
                disabled={!showActionButton}
                {...register("LoadSancation")}
                inline
              ></Form.Check>
              <Form.Check
                onChange={(e) => console.log(e)}
                value="N"
                type="radio"
                id="default-radio"
                label="No"
                name="false"
                disabled={!showActionButton}
                {...register("LoadSancation")}
                inline
              ></Form.Check>
            </Col>
            <Col  md={6} xxl lg="6">
              <div>
                <Form.Label>
                The capacity of UGT as per population norms <span style={{ color: "red" }}>*</span> 
                </Form.Label>
              </div>
              <Form.Check
                onChange={(e) => console.log(e)}
                value="Y"
                type="radio"
                id="default-radio"
                label="Yes"
                name="true"
                disabled={!showActionButton}
                {...register("ugt")}
                inline
              ></Form.Check>
              <Form.Check
                onChange={(e) => console.log(e)}
                value="N"
                type="radio"
                id="default-radio"
                label="No"
                name="false"
                disabled={!showActionButton}
                {...register("ugt")}
                inline
              ></Form.Check>
            </Col>
            <br></br>
            <Col  md={6} xxl lg="6">
              <div>
                <Form.Label>
                The capacity of STP as per population norms <span style={{ color: "red" }}>*</span> &nbsp;&nbsp;
                </Form.Label>
              </div>
              <Form.Check
                onChange={(e) => console.log(e)}
                value="Y"
                type="radio"
                id="default-radio"
                label="Yes"
                name="true"
                disabled={!showActionButton}
                {...register("stp")}
                inline
              ></Form.Check>
              <Form.Check
                onChange={(e) => console.log(e)}
                value="N"
                type="radio"
                id="default-radio"
                label="No"
                name="false"
                disabled={!showActionButton}
                {...register("stp")}
                inline
              ></Form.Check>
            </Col>
            <Col md={6} xxl lg="6">
              <div>
                <Form.Label>
                  <h2>
                  Specifications of the public health department <span style={{ color: "red" }}>*</span>
                  </h2>
                </Form.Label>
              </div>
              <input type="number" className="form-control"  disabled={!showActionButton} placeholder="" {...register("loiNumber")} />
            </Col>
            <br></br>
            <Col  md={6} xxl lg="6">
              <div>
                <Form.Label>
                Water supply network <span style={{ color: "red" }}>*</span> 
                </Form.Label>
              </div>
              <Form.Check
                onChange={(e) => console.log(e)}
                value="Y"
                type="radio"
                id="default-radio"
                label="Yes"
                name="true"
                disabled={!showActionButton}
                {...register("supply")}
                inline
              ></Form.Check>
              <Form.Check
                onChange={(e) => console.log(e)}
                value="N"
                type="radio"
                id="default-radio"
                label="No"
                name="false"
                disabled={!showActionButton}
                {...register("supply")}
                inline
              ></Form.Check>
            </Col>
            
            <Col  md={6} xxl lg="6">
              <div>
                <Form.Label>
                Sewer network <span style={{ color: "red" }}>*</span> 
                </Form.Label>
              </div>
              <Form.Check
                onChange={(e) => console.log(e)}
                value="Y"
                type="radio"
                id="default-radio"
                label="Yes"
                name="true"
                disabled={!showActionButton}
                {...register("sewer")}
                inline
              ></Form.Check>
              <Form.Check
                onChange={(e) => console.log(e)}
                value="N"
                type="radio"
                id="default-radio"
                label="No"
                name="false"
                {...register("sewer")}
                inline
              ></Form.Check>
            </Col>
            <br></br>
            <Col  md={6} xxl lg="6">
              <div>
                <Form.Label>
                Stormwater drainage <span style={{ color: "red" }}>*</span> 
                </Form.Label>
              </div>
              <Form.Check
                onChange={(e) => console.log(e)}
                value="Y"
                type="radio"
                id="default-radio"
                label="Yes"
                name="true"
                disabled={!showActionButton}
                {...register("stormwater")}
                inline
              ></Form.Check>
              <Form.Check
                onChange={(e) => console.log(e)}
                value="N"
                type="radio"
                id="default-radio"
                label="No"
                name="false"
                disabled={!showActionButton}
                {...register("stormwater")}
                inline
              ></Form.Check>
            </Col>
           
            <Col  md={6} xxl lg="6">
              <div>
                <Form.Label>
                Roads network <span style={{ color: "red" }}>*</span> 
                </Form.Label>
              </div>
              <Form.Check
                onChange={(e) => console.log(e)}
                value="Y"
                type="radio"
                id="default-radio"
                label="Yes"
                name="true"
                disabled={!showActionButton}
                {...register("ugt")}
                inline
              ></Form.Check>
              <Form.Check
                onChange={(e) => console.log(e)}
                value="N"
                type="radio"
                id="default-radio"
                label="No"
                name="false"
                disabled={!showActionButton}
                {...register("ugt")}
                inline
              ></Form.Check>
            </Col>
            <br></br>
            <Col  md={6} xxl lg="6">
              <div>
                <Form.Label>
                Horticulture <span style={{ color: "red" }}>*</span> 
                </Form.Label>
              </div>
              <Form.Check
                onChange={(e) => console.log(e)}
                value="Y"
                type="radio"
                id="default-radio"
                label="Yes"
                name="true"
                disabled={!showActionButton}
                {...register("horticlture")}
                inline
              ></Form.Check>
              <Form.Check
                onCh
                ange={(e) => console.log(e)}
                value="N"
                type="radio"
                id="default-radio"
                label="No"
                name="false"
                disabled={!showActionButton}
                {...register("horticlture")}
                inline
              ></Form.Check>
            </Col>
           
            <Col  md={6} xxl lg="6">
              <div>
                <Form.Label>
                Street Lightening <span style={{ color: "red" }}>*</span> 
                </Form.Label>
              </div>
              <Form.Check
                onChange={(e) => console.log(e)}
                value="Y"
                type="radio"
                id="default-radio"
                label="Yes"
                name="true"
                disabled={!showActionButton}
                {...register("street")}
                inline
              ></Form.Check>
              <Form.Check
                onChange={(e) => console.log(e)}
                value="N"
                type="radio"
                id="default-radio"
                label="No"
                name="false"
                disabled={!showActionButton}
                {...register("street")}
                inline
              ></Form.Check>
            </Col>
            {/* <Col  md={6} xxl lg="6">
              <div>
                <Form.Label>
                Per acre cost of internal development works <span style={{ color: "red" }}>*</span> &nbsp;&nbsp;
                </Form.Label>
              </div>
              <Form.Check
                onChange={(e) => console.log(e)}
                value="Y"
                type="radio"
                id="default-radio"
                label="Yes"
                name="true"
                {...register("ugt")}
                inline
              ></Form.Check>
              <Form.Check
                onChange={(e) => console.log(e)}
                value="N"
                type="radio"
                id="default-radio"
                label="No"
                name="false"
                {...register("ugt")}
                inline
              ></Form.Check>
            </Col> */}
             <br></br>
            <Col md={6} xxl lg="6">
              <div>
                <Form.Label>
                  <h2>
                  Per acre cost of internal development works <span style={{ color: "red" }}>*</span>
                  </h2>
                </Form.Label>
              </div>
              <input type="number" className="form-control"  disabled={!showActionButton} placeholder="" {...register("acreCost")} />
            </Col>
            <Col  md={6} xxl lg="6">
              <div>
                <Form.Label>
                Self-certified drawings from chartered engineers that it is by the standard approved template <span style={{ color: "red" }}>*</span> 
                </Form.Label>
              </div>
              <Form.Check
                onChange={(e) => console.log(e)}
                value="Y"
                type="radio"
                id="default-radio"
                label="Yes"
                name="true"
                disabled={!showActionButton}
                {...register("selfCertified")}
                inline
              ></Form.Check>
              <Form.Check
                onChange={(e) => console.log(e)}
                value="N"
                type="radio"
                id="default-radio"
                label="No"
                name="false"
                disabled={!showActionButton}
                {...register("selfCertified")}
                inline
              ></Form.Check>
            </Col>
           
            <br></br>
            
           
          </Row>
          <br></br>
          

         

          <div class="row">
            <div class="col-sm-12 text-right">
              <button type="submit" id="btnSearch" class="btn btn-primary btn-md center-block">
                Submit
              </button>
            </div>
          </div>
          {/* <Row className="justify-content-end">
            <Button variant="outline-primary" className="col-md-2 my-2 mx-2" type="save" aria-label="right-end">
              Save as Draft
            </Button>
            <Button variant="outline-primary" className="col-md-2 my-2 mx-2" type="submit" aria-label="right-end">
              Submit
            </Button>
          </Row> */}
        </Card>
      {/* </Card> */}
    </form>
    <Dialog
    open={open}
    onClose={handleClose}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
    >
    <DialogTitle id="alert-dialog-title">
        Electric Plan Submission
    </DialogTitle>
    <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <p>Your Electric Plan is submitted successfully <span><CheckCircleOutlineIcon style={{color: 'blue', variant: 'filled'}}/></span></p>
            <p>Please Note down your Application Number <span style={{padding: '5px', color: 'blue'}}>
                {/* {applicationNumber} */}
            </span> for further assistance</p>
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

export default ServicePlanCivil;
