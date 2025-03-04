import React, { useState, useEffect } from "react";
import { Card, Row, Col } from "react-bootstrap";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
function RenewNew() {
  const [selects, setSelects] = useState();
  const [showhide, setShowhide] = useState("");
  const [modal, setmodal] = useState(false);
  const [modal1, setmodal1] = useState(false);
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
  } = useForm({});

  const bankRenew = (data) => console.log(data);
  return (
    <form onSubmit={handleSubmit(bankRenew)}>
      <Card style={{ width: "126%", border: "5px solid #1266af" }}>
        <h4 style={{ fontSize: "25px", marginLeft: "21px" }}>Extension of Bank Guarantee</h4>
        <div className="card">
          <Row className="col-12">
            <Col md={4} xxl lg="3">
              <div>
                <Form.Label>
                  <h2>Enter License No. </h2>
                </Form.Label>
              </div>
              <input type="number" className="form-control" placeholder="" {...register("licenceNumber")} />
            </Col>

            <Col md={4} xxl lg="3">
              <div>
                <Form.Label>
                  <h2>Amount (in fig)</h2>
                </Form.Label>
              </div>
              <input type="text" className="form-control" placeholder="" {...register("amountInFig")} disabled />
            </Col>
            <Col md={4} xxl lg="3">
              <div>
                <Form.Label>
                  <h2>Amount (in words)</h2>
                </Form.Label>
              </div>
              <input type="text" className="form-control" disabled placeholder="" {...register("amountInWords")} />
            </Col>
            <Col md={4} xxl lg="3">
              <div>
                <Form.Label>
                  <h2>Previous Memo No. </h2>
                </Form.Label>
              </div>
              <input type="text" className="form-control" placeholder="" {...register("previousMemoNumber")} disabled />
            </Col>
          </Row>
          <br></br>
          <Row className="col-12">
            <Col md={4} xxl lg="3">
              <div>
                <Form.Label>
                  <h2>Validity date </h2>
                </Form.Label>
              </div>
              <input type="date" className="form-control" placeholder="" {...register("validity")} />
            </Col>
            <Col md={4} xxl lg="3">
              <div>
                <Form.Label>
                  <h2>Extended time </h2>
                </Form.Label>
              </div>
              <input type="date" className="form-control" placeholder="" {...register("extendedTime")} />
            </Col>
            <Col md={4} xxl lg="3">
              <div>
                <Form.Label>
                  <h2>Bank Name </h2>
                </Form.Label>
              </div>
              <input type="text" className="form-control" placeholder="" {...register("bankName")} />
            </Col>
            <Col md={4} xxl lg="3">
              <div>
                <Form.Label>
                  <h2>Enter Memo No. </h2>
                </Form.Label>
              </div>
              <input type="text" className="form-control" placeholder="" {...register("memoNumber")} />
            </Col>
          </Row>
          <br></br>
          <Row className="col-12">
            <Col md={4} xxl lg="3">
              <div>
                <Form.Label>
                  <h2>Upload B.G. </h2>
                </Form.Label>
              </div>
              <input type="file" className="form-control" placeholder="" {...register("uploadBg")} />
            </Col>
          </Row>
          <br></br>
          <div className="col col-12 ">
            <div>
              <label>
                Hardcopy Submitted at TCP office.{" "}
                <label htmlFor="hardcopySubmitted">
                  <input {...register("hardcopySubmitted")} type="radio" value="Y" id="hardcopySubmitted" />
                  &nbsp; Yes &nbsp;&nbsp;
                </label>
                <label htmlFor="hardcopySubmitted">
                  <input
                    {...register("hardcopySubmitted")}
                    type="radio"
                    value="N"
                    id="hardcopySubmitted"
                    className="btn btn-primary"
                    onClick={() => setmodal1(true)}
                  />
                  &nbsp; No &nbsp;&nbsp;
                </label>
                <h3 className="error-message" style={{ color: "red" }}>
                  {errors?.hardcopySubmitted && errors?.hardcopySubmitted?.message}
                </h3>
              </label>
            </div>

            {watch("hardcopySubmitted") === "Y" && (
              <div>
                <div className="row">
                  <div className="col col-4">
                    <label>
                      <h2>
                        Upload Receipt of Submission.
                        <span style={{ color: "red" }}>*</span>
                      </h2>
                    </label>
                    <div>
                      <input type="file" placeholder="" className="form-control" {...register("consentLetter")}></input>
                    </div>

                    <h3 className="error-message" style={{ color: "red" }}>
                      {errors?.consentLetter && errors?.consentLetter?.message}
                    </h3>
                  </div>
                </div>
              </div>
            )}
            {watch("hardcopySubmitted") === "N" && (
              <div>
                <Modal
                  size="lg"
                  isOpen={modal1}
                  toggle={() => setmodal(!modal1)}
                  style={{ width: "500px", height: "200px" }}
                  aria-labelledby="contained-modal-title-vcenter"
                  centered
                >
                  <ModalHeader toggle={() => setmodal1(!modal1)}></ModalHeader>
                  <ModalBody style={{ fontSize: 20 }}>
                    <h2> Submit Hardcopy of B.G. at TCP office.</h2>
                  </ModalBody>
                  <ModalFooter toggle={() => setmodal(!modal1)}></ModalFooter>
                </Modal>
              </div>
            )}
          </div>

          <Row className="justify-content-end">
            <Button variant="outline-primary" className="col-md-2 my-2 mx-2" aria-label="right-end">
              Cancel
            </Button>
            <Button variant="outline-primary" className="col-md-2 my-2 mx-2" type="submit" aria-label="right-end">
              Submit
            </Button>
          </Row>
        </div>
      </Card>
    </form>
  );
}

export default RenewNew;
