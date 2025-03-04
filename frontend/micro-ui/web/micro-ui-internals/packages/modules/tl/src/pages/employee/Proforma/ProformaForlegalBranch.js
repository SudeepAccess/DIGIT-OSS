import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useForm } from "react-hook-form";
import { Card } from "react-bootstrap";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

import Collapse from "react-bootstrap/Collapse";
//////////////////////////////////////////////////////////
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useTranslation } from "react-i18next";

function ProformaForlegalBranch() {
  const userRoles = Digit.UserService.getUser()?.info?.roles.map((item) => item.code)  || [];
  const showActionButton = userRoles.includes("DA_HQ")
  const showActionButton1 = userRoles.includes("ADA_HQ")

  const {t} = useTranslation();

  const [selects, setSelects] = useState();
  const [showhide, setShowhide] = useState("");
  const { register, handleSubmit } = useForm();
  const layoutPlan = (data) => console.log(data);

  const handleshowhide = (event) => {
    const getuser = event.target.value;

    setShowhide(getuser);
  };
  const [open2, setOpen2] = useState(false);

  return (
    <form onSubmit={handleSubmit(ProformaForlegalBranch)}>
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
          alignContent: "left",
        }}
      >
        <span style={{ color: "#817f7f" }} className="">
        PROFORMA FOR SCRUTINY (BY LEGAL CELL)
        </span>
        {open2 ? <RemoveIcon></RemoveIcon> : <AddIcon></AddIcon>}
      </div>
      <Collapse in={open2}>
        <div id="example-collapse-text">
      <Card style={{ width: "126%", marginLeft: "-2px", paddingRight: "10px", marginTop: "20px", marginBottom: "52px" }}>
        <h4 style={{ fontSize: "20px", marginLeft: "5px" }}>PROFORMA FOR SCRUTINY (BY LEGAL CELL)</h4>
        <div className="card">
          <Form> 
            <TableContainer >
			<Table aria-label="simple table">
				<TableHead>
					<TableRow>
						<TableCell>
							Sr.No
						</TableCell>
						<TableCell align="left">
                        Description
						</TableCell>
						<TableCell align="right">
						Action
						</TableCell>
						<TableCell align="right">
						Reamrks
						</TableCell>
						
					</TableRow>
				</TableHead>
				<TableBody>
<TableRow
						
							sx={{ '&:last-child td, &:last-child th':
								{ border: 0 } }}
						>
                            <TableCell >
							1
							</TableCell>
							<TableCell  align="left">
                            <h2>
                            {/* Whether registered and irrevocable collaboration agreement by and between land owners/ land owning company and collaborator company of all the land mentioned in schedule of land submitted.  */}
                            {`${t("NWL_PROFORMA_TOTAL_LEGAL_WHETHER_REGISTERED_IRREVOCABLE_COLLABORATION")}`}
                    &nbsp;&nbsp;
                  </h2>
							</TableCell>
							<TableCell align="left">
                           
                            <FormControl>
                            <div className="row">  
                            {/* <div class="col-md-4 text-right"> */}
                        <div className="d-flex flex-row align-items-center my-1">
                          
                          <label htmlFor="approachFromProposedSector">
                          <input {...register("approachFromProposedSector")} type="radio" disabled={!showActionButton && !showActionButton1} value="Y" id="approachFromProposedSector" />
                          &nbsp;&nbsp; &nbsp; Yes &nbsp;&nbsp;
                        </label>
                        <label htmlFor="approachFromProposedSector">
                          <input {...register("approachFromProposedSector")} type="radio" disabled={!showActionButton && !showActionButton1} value="N" id="approachFromProposedSector" />
                          &nbsp;&nbsp; &nbsp; No &nbsp;&nbsp;
                        </label>
                        </div>
                        {/* </div> */}
                </div>
                </FormControl>
                
							</TableCell>
                            <TableCell align="left">
                                    <textarea
          class="form-control"
          id="exampleFormControlTextarea1"
          placeholder="Enter your Remarks"
          autoFocus
        //   onChange={(e) => {
        //     setDeveloperRemarks({ data: e.target.value });
        //     setRemarksEntered(e.target.value);
        //   }}
          rows="3"
        //   value={RemarksDeveloper.data}
        />
                                    </TableCell>
                            
							
						</TableRow>
                        <TableRow
						
							sx={{ '&:last-child td, &:last-child th':
								{ border: 0 } }}
						>
                            <TableCell >
							2
							</TableCell>
							<TableCell  align="left">
                            <h2>
                            {/* GPA/SPA in favour of the developer/ applicant submitted is in order or not. */}
                            {/* Whether applied khasra nos. correctly / accurately incorporated in collaboration agreement.  */}
                            {`${t("NWL_PROFORMA_TOTAL_LEGAL_WHETHER_APPLIED_KHASRA_NOS_CORRECTLY")}`}
                    &nbsp;&nbsp;
                  </h2>
							</TableCell>
							<TableCell align="left">
                           
                            <FormControl>
                            <div className="row">  
                            {/* <div class="col-md-4 text-right"> */}
                        <div className="d-flex flex-row align-items-center my-1">
                         
                          <label htmlFor="licencefeedeposited">
                          <input {...register("licencefeedeposited")} type="radio" disabled={!showActionButton && !showActionButton1} value="Y" id="licencefeedeposited" />
                          &nbsp;&nbsp;&nbsp; Yes &nbsp;&nbsp;
                        </label>
                        <label htmlFor="licencefeedeposited">
                          <input {...register("licencefeedeposited")} type="radio" disabled={!showActionButton && !showActionButton1} value="N" id="licencefeedeposited" />
                          &nbsp;&nbsp;&nbsp; No &nbsp;&nbsp;
                        </label>
                        </div></div>
                {/* </div> */}
    
                </FormControl>
                
							</TableCell>
                            <TableCell align="left">
                                    <textarea
          class="form-control"
          id="exampleFormControlTextarea2"
          placeholder="Enter your Remarks"
          autoFocus
        //   onChange={(e) => {
        //     setDeveloperRemarks({ data: e.target.value });
        //     setRemarksEntered(e.target.value);
        //   }}
          rows="3"
        //   value={RemarksDeveloper.data}
        />
                                    </TableCell>
                            
							
						</TableRow>
					{/* ))} */}
                    
                        <TableRow
						
							sx={{ '&:last-child td, &:last-child th':
								{ border: 0 } }}
						>
                            <TableCell >
							3
							</TableCell>
							<TableCell  align="left">
                            <h2>
                            {/* Whether GPA/SPA in favour of the developer/ applicant submitted */}
                            {`${t("NWL_PROFORMA_TOTAL_LEGAL_WHETHER_GPASPA_FAVOUR_DEVELOPER_APPLICANT")}`}
                            {/* LLP agreement submitted, in case of firm is in order or not.  */}
                    &nbsp;&nbsp;
                  </h2>
							</TableCell>
							<TableCell align="left">
                          
                            <FormControl>
                            <div className="row">  
                            {/* <div class="col-md-4 text-right"> */}
                        <div className="d-flex flex-row align-items-center my-1">
                          
                          <label htmlFor="applicantdeveloper">
                          <input {...register("applicantdeveloper")} type="radio" disabled={!showActionButton && !showActionButton1} value="Y" id="applicantdeveloper" />
                          &nbsp;&nbsp;&nbsp; Yes &nbsp;&nbsp;
                        </label>
                        <label htmlFor="applicantdeveloper">
                          <input {...register("applicantdeveloper")} type="radio" disabled={!showActionButton && !showActionButton1} value="N" id="applicantdeveloper" />
                          &nbsp;&nbsp;&nbsp; No &nbsp;&nbsp;
                        </label>
                        </div></div>
                {/* </div> */}
    
                </FormControl>
                
							</TableCell>
                          
                        <TableCell align="left">
                                    <textarea
          class="form-control"
          id="exampleFormControlTextarea3"
          placeholder="Enter your Remarks"
          autoFocus
        //   onChange={(e) => {
        //     setDeveloperRemarks({ data: e.target.value });
        //     setRemarksEntered(e.target.value);
        //   }}
          rows="3"
        //   value={RemarksDeveloper.data}
        />
                                    </TableCell>
                        
                        
                    </TableRow>
                    <TableRow
						
            sx={{ '&:last-child td, &:last-child th':
              { border: 0 } }}
          >
                          <TableCell >
            4
            </TableCell>
            <TableCell  align="left">
                          <h2>
                          {/* Whether applied khasra nos. correctly / accurately incorporated in GPA/SPA.  */}
                          {`${t("NWL_PROFORMA_TOTAL_LEGAL_WHETHER_APPLIIED_KHASRA_NOS_CORRECTLY")}`}
                          {/* LLP agreement submitted, in case of firm is in order or not.  */}
                  &nbsp;&nbsp;
                </h2>
            </TableCell>
            <TableCell align="left">
                        
                          <FormControl>
                          <div className="row">  
                          {/* <div class="col-md-4 text-right"> */}
                      <div className="d-flex flex-row align-items-center my-1">
                        
                        <label htmlFor="applicantdeveloper">
                        <input {...register("appiiedKhasra")} type="radio" disabled={!showActionButton && !showActionButton1} value="Y" id="applicantdeveloper" />
                        &nbsp;&nbsp;&nbsp; Yes &nbsp;&nbsp;
                      </label>
                      <label htmlFor="applicantdeveloper">
                        <input {...register("appiiedKhasra")} type="radio" disabled={!showActionButton && !showActionButton1} value="N" id="applicantdeveloper" />
                        &nbsp;&nbsp;&nbsp; No &nbsp;&nbsp;
                      </label>
                      </div></div>
              {/* </div> */}
  
              </FormControl>
              
            </TableCell>
                        
                      <TableCell align="left">
                                  <textarea
        class="form-control"
        id="exampleFormControlTextarea3"
        placeholder="Enter your Remarks"
        autoFocus
      //   onChange={(e) => {
      //     setDeveloperRemarks({ data: e.target.value });
      //     setRemarksEntered(e.target.value);
      //   }}
        rows="3"
      //   value={RemarksDeveloper.data}
      />
                                  </TableCell>
                      
                      
                  </TableRow>
                  <TableRow
						
            sx={{ '&:last-child td, &:last-child th':
              { border: 0 } }}
          >
                          <TableCell >
            5
            </TableCell>
            <TableCell  align="left">
                          <h2>
                          {/* Whether Board resolution in favour of authorized signatory for applying for licence and related work alongwith signatures of signatory duly verified in the board resolution submitted. */}
                          {`${t("NWL_PROFORMA_TOTAL_LEGAL_WHETHER_BOARD_RESOLUTION_FAVOUR_AUTHORIZED")}`}
                          {/* LLP agreement submitted, in case of firm is in order or not.  */}
                  &nbsp;&nbsp;
                </h2>
            </TableCell>
            <TableCell align="left">
                        
                          <FormControl>
                          <div className="row">  
                          {/* <div class="col-md-4 text-right"> */}
                      <div className="d-flex flex-row align-items-center my-1">
                        
                        <label htmlFor="applicantdeveloper">
                        <input {...register("applicantdeveloper")} type="radio" disabled={!showActionButton && !showActionButton1} value="Y" id="applicantdeveloper" />
                        &nbsp;&nbsp;&nbsp; Yes &nbsp;&nbsp;
                      </label>
                      <label htmlFor="applicantdeveloper">
                        <input {...register("applicantdeveloper")} type="radio" disabled={!showActionButton && !showActionButton1} value="N" id="applicantdeveloper" />
                        &nbsp;&nbsp;&nbsp; No &nbsp;&nbsp;
                      </label>
                      </div></div>
              {/* </div> */}
  
              </FormControl>
              
            </TableCell>
                        
                      <TableCell align="left">
                                  <textarea
        class="form-control"
        id="exampleFormControlTextarea3"
        placeholder="Enter your Remarks"
        autoFocus
      //   onChange={(e) => {
      //     setDeveloperRemarks({ data: e.target.value });
      //     setRemarksEntered(e.target.value);
      //   }}
        rows="3"
      //   value={RemarksDeveloper.data}
      />
                                  </TableCell>
                      
                      
                  </TableRow>
                  <TableRow
						
            sx={{ '&:last-child td, &:last-child th':
              { border: 0 } }}
          >
                          <TableCell >
            6
            </TableCell>
            <TableCell  align="left">
                          <h2>
                          {/* Whether Indemnity bond indemnifying DTCP from any loss, if occurs due to any dispute on the applied land submitted. */}
                          {`${t("NWL_PROFORMA_TOTAL_LEGAL_WHETHER_INDEMNITY_BOND_INDEMNIFYING_DTCP")}`}
                          {/* LLP agreement submitted, in case of firm is in order or not.  */}
                  &nbsp;&nbsp;
                </h2>
            </TableCell>
            <TableCell align="left">
                        
                          <FormControl>
                          <div className="row">  
                          {/* <div class="col-md-4 text-right"> */}
                      <div className="d-flex flex-row align-items-center my-1">
                        
                        <label htmlFor="applicantdeveloper">
                        <input {...register("applicantdeveloper")} type="radio" disabled={!showActionButton && !showActionButton1} value="Y" id="applicantdeveloper" />
                        &nbsp;&nbsp;&nbsp; Yes &nbsp;&nbsp;
                      </label>
                      <label htmlFor="applicantdeveloper">
                        <input {...register("applicantdeveloper")} type="radio" disabled={!showActionButton && !showActionButton1} value="N" id="applicantdeveloper" />
                        &nbsp;&nbsp;&nbsp; No &nbsp;&nbsp;
                      </label>
                      </div></div>
              {/* </div> */}
  
              </FormControl>
              
            </TableCell>
                        
                      <TableCell align="left">
                                  <textarea
        class="form-control"
        id="exampleFormControlTextarea3"
        placeholder="Enter your Remarks"
        autoFocus
      //   onChange={(e) => {
      //     setDeveloperRemarks({ data: e.target.value });
      //     setRemarksEntered(e.target.value);
      //   }}
        rows="3"
      //   value={RemarksDeveloper.data}
      />
                                  </TableCell>
                      
                      
                  </TableRow>
                            
							
				
                        
				</TableBody>
			</Table>
		</TableContainer>
          
          </Form>
          
          </div>
        
      </Card>
      </div>
      </Collapse>
    </form>
  );
}

export default ProformaForlegalBranch;
