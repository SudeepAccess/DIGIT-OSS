import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Row, Col } from "react-bootstrap";
import { Form } from "react-bootstrap";
import FileUpload from "@mui/icons-material/FileUpload";
import VisibilityIcon from "@mui/icons-material/Visibility";
import TextField from "@mui/material/TextField";
import NumberInput from "../../../../components/NumberInput";

const ResidentialPlottedForm = ({
  register,
  getDocumentData,
  watch,
  getDocShareholding,
  setValue,
  control,
  fields,
  add,
  remove,
  handleWheel,
  setError,
  error,
  setLoader,
}) => {
  const [getABValue, setABValue] = useState("");

  useEffect(() => {
    console.log("error", error);
  }, [error]);

  return (
    <Row className="ml-auto" style={{ marginBottom: 5 }}>
      <Col col-12>
        <h6 className="text-black">
          <b>Residential Plotted</b>
        </h6>
        <h6 className="text-black mt-4">
          <b>Detail of land use</b>
        </h6>
        <Col col-12>
          <Row className="ml-auto mt-4" style={{ marginBottom: 5 }}></Row>
          <Row className="ml-auto mt-4" style={{ marginBottom: 5 }}>
            <Col md={4} xxl lg="4">
              <div>
                <Form.Label>
                  <h2>
                    Total area of the Scheme
                    <span style={{ color: "red" }}>*</span>
                  </h2>
                </Form.Label>
              </div>
            </Col>
            <Col md={4} xxl lg="4">
              <NumberInput disabled control={control} name="totalAreaScheme" customInput={TextField} />
            </Col>
          </Row>
          <Row className="ml-auto mt-4" style={{ marginBottom: 5 }}>
            <Col md={4} xxl lg="4">
              <div>
                <Form.Label>
                  <h2 data-toggle="tooltip" data-placement="top" title="Area under Sector Road & Green Belt">
                    Area under Sector Road
                    <span style={{ color: "red" }}>*</span>
                  </h2>
                </Form.Label>
              </div>
            </Col>
            <Col md={4} xxl lg="4">
              <input
                type="number"
                className="form-control"
                {...register("areaUnderSectorRoad")}
                onWheel={handleWheel}
                onChange={(e) => {
                  if (e?.target?.value?.length) {
                    setValue("balanceAreaAfterDeduction", (watch("totalAreaScheme") - e?.target?.value)?.toFixed(3));
                    setValue("areaUnderSectorAndGreenBelt", (e?.target?.value * 50) / 100);
                  } else {
                    setValue("balanceAreaAfterDeduction", "");
                    setValue("balanceArea", "");
                    setValue("areaUnderSectorAndGreenBelt", "");
                    setValue("netPlannedArea", "");
                    setValue("areaUnderUndetermined", "");
                  }
                }}
              />
            </Col>
          </Row>
          <Row className="ml-auto mt-4" style={{ marginBottom: 5 }}>
            <Col md={4} xxl lg="4">
              <div>
                <Form.Label>
                  <h2 data-toggle="tooltip" data-placement="top" title=" Balance area after deducting area under sector road and Green Belt">
                    Balance area
                    <span style={{ color: "red" }}>*</span>
                  </h2>
                </Form.Label>
              </div>
            </Col>
            <Col md={4} xxl lg="4">
              <input disabled type="number" className="form-control" {...register("balanceAreaAfterDeduction")} />
            </Col>
          </Row>
          <Row className="ml-auto mt-4" style={{ marginBottom: 5 }}>
            <Col md={4} xxl lg="4">
              <div>
                <Form.Label>
                  <h2>
                    Area under undetermined use
                    <span style={{ color: "red" }}>*</span>
                  </h2>
                </Form.Label>
              </div>
            </Col>
            <Col md={4} xxl lg="4">
              <input
                type="number"
                className="form-control"
                {...register("areaUnderUndetermined")}
                onWheel={handleWheel}
                onChange={(e) => {
                  if (e?.target?.value?.length) {
                    setValue("balanceArea", (watch("balanceAreaAfterDeduction") - e?.target?.value)?.toFixed(3));
                    setValue(
                      "netPlannedArea",
                      (watch("balanceAreaAfterDeduction") - e?.target?.value + watch("areaUnderSectorAndGreenBelt"))?.toFixed(3)
                    );
                  } else {
                    setValue("balanceArea", "");
                    setValue("netPlannedArea", "");
                  }
                }}
              />
            </Col>
          </Row>
          <Row className="ml-auto mt-4" style={{ marginBottom: 5 }}>
            <Col md={4} xxl lg="4">
              <div>
                <Form.Label>
                  <h2 data-toggle="tooltip" data-placement="top" title="   Area under G.H. = 10% of the total area of the scheme">
                    Area under G.H. = 10%
                    <span style={{ color: "red" }}>*</span>
                  </h2>
                </Form.Label>
              </div>
            </Col>
            <Col md={4} xxl lg="4">
              <input
                type="number"
                className="form-control"
                {...register("areaUnderGH")}
                onWheel={handleWheel}
                onChange={(e) => {
                  if (e?.target?.value > (watch("totalAreaScheme") * 10) / 100)
                    setError({ ...error, ["areaUnderGH"]: "Area Under GH cannot exceed 10% of Total Area of scheme" });
                  else setError({ ...error, ["areaUnderGH"]: "" });
                }}
              />
              {error?.areaUnderGH && <h6 style={{ fontSize: "12px", color: "red" }}>{error?.areaUnderGH}</h6>}
            </Col>
          </Row>
          <Row className="ml-auto mt-4" style={{ marginBottom: 5 }}>
            <Col md={4} xxl lg="4">
              <div>
                <Form.Label>
                  <h2>
                    Balance area
                    <span style={{ color: "red" }}>*</span>
                  </h2>
                </Form.Label>
              </div>
            </Col>
            <Col md={4} xxl lg="4">
              <input disabled type="number" className="form-control" {...register("balanceArea")} />
            </Col>
          </Row>
          <Row className="ml-auto mt-4" style={{ marginBottom: 5 }}>
            <Col md={4} xxl lg="4">
              <div>
                <Form.Label>
                  <h2 data-toggle="tooltip" data-placement="top" title="  50% of the Area under Sector Road & Green Belt">
                    50% of the Area
                    <span style={{ color: "red" }}>*</span>
                  </h2>
                </Form.Label>
              </div>
            </Col>
            <Col md={4} xxl lg="4">
              <input disabled type="number" className="form-control" {...register("areaUnderSectorAndGreenBelt")} />
            </Col>
          </Row>
          <Row className="ml-auto mt-4" style={{ marginBottom: 5 }}>
            <Col md={4} xxl lg="4">
              <div>
                <Form.Label>
                  <h2>
                    Net planned area (A+B)
                    <span style={{ color: "red" }}>*</span>
                  </h2>
                </Form.Label>
              </div>
            </Col>
            <Col md={4} xxl lg="4">
              <input disabled type="number" className="form-control" {...register("netPlannedArea")} />
            </Col>
          </Row>
        </Col>
        <h6 className="text-black mt-4">
          <b>Detail of the Plots</b>
        </h6>

        <Row className="ml-auto mt-4" style={{ marginBottom: 5 }}>
          <Col md={4} xxl lg="4">
            <div>
              <Form.Label>
                <h2>
                  Total no’s of plots
                  <span style={{ color: "red" }}>*</span>
                </h2>
              </Form.Label>
            </div>
          </Col>
          <Col md={4} xxl lg="4">
            <NumberInput
              control={control}
              name="totalNumberOfPlots"
              customInput={TextField}
              thousandSeparator={false}
              allowNegative={false}
              decimalScale={0}
              onChange={(e) => {
                if (!e?.target?.value?.length) {
                  setValue("generalPlots", "");
                  setValue("requiredNPNLPlots", "");
                  setValue("requiredEWSPlots", "");
                }
              }}
            />
          </Col>
        </Row>
        <Row className="ml-auto mt-4" style={{ marginBottom: 5 }}>
          <Col md={4} xxl lg="4">
            <div>
              <Form.Label>
                <h2>
                  General Plots (55%)
                  <span style={{ color: "red" }}>*</span>
                </h2>
              </Form.Label>
            </div>
          </Col>
          <Col md={4} xxl lg="4">
            <NumberInput
              control={control}
              name="generalPlots"
              customInput={TextField}
              thousandSeparator={false}
              allowNegative={false}
              decimalScale={0}
              onChange={(e) => {
                if (e?.target?.value > (watch("totalNumberOfPlots") * 55) / 100)
                  setError({ ...error, ["generalPlots"]: " Cannot exceed 55% of total number of plots" });
                else setError({ ...error, ["generalPlots"]: "" });
              }}
            />
          </Col>
          <Col md={4} xxl lg="4">
            {error?.generalPlots && <h6 style={{ fontSize: "12px", color: "red" }}>{error?.generalPlots}</h6>}
          </Col>
        </Row>
        <Row className="ml-auto mt-4" style={{ marginBottom: 5 }}>
          <Col md={4} xxl lg="4">
            <div>
              <Form.Label>
                <h2>
                  Required NPNL plots (25 %)
                  <span style={{ color: "red" }}>*</span>
                </h2>
              </Form.Label>
            </div>
          </Col>
          <Col md={4} xxl lg="4">
            <NumberInput
              control={control}
              name="requiredNPNLPlots"
              customInput={TextField}
              thousandSeparator={false}
              allowNegative={false}
              decimalScale={0}
              onChange={(e) => {
                if (e?.target?.value > (watch("totalNumberOfPlots") * 25) / 100)
                  setError({ ...error, ["requiredNPNLPlots"]: " Cannot exceed 25% of total number of plots" });
                else setError({ ...error, ["requiredNPNLPlots"]: "" });
              }}
            />
          </Col>
          <Col md={4} xxl lg="4">
            {error?.requiredNPNLPlots && <h6 style={{ fontSize: "12px", color: "red" }}>{error?.requiredNPNLPlots}</h6>}
          </Col>
        </Row>
        <Row className="ml-auto mt-4" style={{ marginBottom: 5 }}>
          <Col md={4} xxl lg="4">
            <div>
              <Form.Label>
                <h2>
                  Required EWS plots (20%)
                  <span style={{ color: "red" }}>*</span>
                </h2>
              </Form.Label>
            </div>
          </Col>
          <Col md={4} xxl lg="4">
            <NumberInput
              control={control}
              name="requiredEWSPlots"
              customInput={TextField}
              thousandSeparator={false}
              allowNegative={false}
              decimalScale={0}
              onChange={(e) => {
                const val = (parseInt(watch("generalPlots")) + parseInt(watch("requiredNPNLPlots"))) * 18;
                const valA = e?.target?.value * 12;
                setABValue(val + valA);
                console.log("val++", (val + valA) / watch("netPlannedArea"));
                console.log("calc", watch("netPlannedArea"), typeof watch("netPlannedArea"));
                if (e?.target?.value > (watch("totalNumberOfPlots") * 20) / 100)
                  setError({ ...error, ["requiredEWSPlots"]: " Cannot exceed 20% of total number of plots" });
                else {
                  setValue("permissibleDensity", ((val + valA) / watch("netPlannedArea"))?.toFixed(3));
                  setError({ ...error, ["requiredEWSPlots"]: "" });
                }
              }}
            />
          </Col>
          <Col md={4} xxl lg="4">
            {error?.requiredEWSPlots && <h6 style={{ fontSize: "12px", color: "red" }}>{error?.requiredEWSPlots}</h6>}
          </Col>
        </Row>
        <br></br>

        <Row className="ml-auto mt-4" style={{ marginBottom: 5 }}>
          <Col md={4} xxl lg="4">
            <div>
              <Form.Label>
                <h2>
                  Permissible density
                  <span style={{ color: "red" }}>*</span>
                </h2>
              </Form.Label>
            </div>
          </Col>
          <Col md={4} xxl lg="4">
            <input disabled type="number" className="form-control" {...register("permissibleDensity")} />
          </Col>
        </Row>
        <Row className="ml-auto mt-4" style={{ marginBottom: 5 }}>
          <Col md={4} xxl lg="4">
            <div>
              <Form.Label>
                <h2>
                  Permissible Commercial Area
                  <span style={{ color: "red" }}>*</span>
                </h2>
              </Form.Label>
            </div>
          </Col>
          <Col md={4} xxl lg="4">
            <input
              type="number"
              className="form-control"
              {...register("permissibleCommercialArea")}
              onChange={(e) => {
                if (e?.target?.value > (watch("netPlannedArea") * 4) / 100)
                  setError({ ...error, ["permissibleCommercialArea"]: "Permissible Commercial Area  Maximum 4 % of Net planned Area is allowed" });
                else setError({ ...error, ["permissibleCommercialArea"]: "" });
              }}
              onWheel={handleWheel}
            />
          </Col>
          <Col md={4} xxl lg="4">
            {error?.permissibleCommercialArea && <h6 style={{ fontSize: "12px", color: "red" }}>{error?.permissibleCommercialArea}</h6>}
          </Col>
        </Row>
        <Row className="ml-auto mt-4" style={{ marginBottom: 5 }}>
          <Col md={4} xxl lg="4">
            <div>
              <Form.Label>
                <h2>
                  Under Plot
                  <span style={{ color: "red" }}>*</span>
                </h2>
              </Form.Label>
            </div>
          </Col>
          <Col md={4} xxl lg="4">
            <input type="number" className="form-control" {...register("underPlot")} onWheel={handleWheel} />
          </Col>
        </Row>
        <Row className="ml-auto mt-4" style={{ marginBottom: 5 }}>
          <Col md={4} xxl lg="4">
            <div>
              <Form.Label>
                <h2>
                  Commercial
                  <span style={{ color: "red" }}>*</span>
                </h2>
              </Form.Label>
            </div>
          </Col>
          <Col md={4} xxl lg="4">
            <input
              type="number"
              className="form-control"
              {...register("commercial")}
              onWheel={handleWheel}
              onChange={(e) => {
                if (watch("underPlot") + e?.target?.value > (watch("netPlannedArea") * 55) / 100)
                  setError({ ...error, ["permissibleSaleableArea"]: "Cannot exceed 55% of Net planned Area" });
                else {
                  setValue("permissibleSaleableArea", watch("underPlot") + e?.target?.value);
                  setError({ ...error, ["permissibleSaleableArea"]: "" });
                }
              }}
            />
          </Col>
        </Row>
        <br></br>

        <Row className="ml-auto mt-4" style={{ marginBottom: 5 }}>
          <Col md={4} xxl lg="4">
            <div>
              <Form.Label>
                <h2>
                  Permissible saleable area
                  <span style={{ color: "red" }}>*</span>
                </h2>
              </Form.Label>
            </div>
          </Col>
          <Col md={4} xxl lg="4">
            <input type="number" className="form-control" {...register("permissibleSaleableArea")} onWheel={handleWheel} />
          </Col>
          <Col md={4} xxl lg="4">
            {error?.permissibleSaleableArea && <h6 style={{ fontSize: "12px", color: "red" }}>{error?.permissibleSaleableArea}</h6>}
          </Col>
        </Row>
        <Row className="ml-auto mt-4" style={{ marginBottom: 5 }}>
          <Col md={4} xxl lg="4">
            <div>
              <Form.Label>
                <h2 data-toggle="tooltip" data-placement="top" title="  Required green area on applied land">
                  Required green area
                  <span style={{ color: "red" }}>*</span>
                </h2>
              </Form.Label>
            </div>
          </Col>
          <Col md={4} xxl lg="4">
            <input
              type="number"
              className="form-control"
              {...register("requiredGreenArea")}
              onChange={(e) => {
                const checkVal = (getABValue * 2.5) / 4047;
                if (e?.target?.value > checkVal) setError({ ...error, ["requiredGreenArea"]: "2.5 Square meter per person is allowed" });
                else setError({ ...error, ["requiredGreenArea"]: "" });
              }}
              onWheel={handleWheel}
            />
          </Col>
          <Col md={4} xxl lg="4">
            {error?.requiredGreenArea && <h6 style={{ fontSize: "12px", color: "red" }}>{error?.requiredGreenArea}</h6>}
          </Col>
        </Row>

        <br></br>
        <h6 className="text-black">
          <b>Detail of Community sites.</b>
        </h6>
        <br></br>
        {fields?.map((item, index) => {
          return (
            <Row key={item?.id} className="ml-auto mt-4" style={{ marginBottom: 5 }}>
              <Col md={4} xxl lg="4">
                <div>
                  <Form.Label>
                    <h2>
                      Name of Community sites
                      <span style={{ color: "red" }}>*</span>
                    </h2>
                  </Form.Label>
                </div>
              </Col>
              <Col md={4} xxl lg="4">
                <input
                  type="name"
                  className="form-control"
                  {...register(`detailOfCommunitySites.${index}.communitySiteName`)}
                  // {...register("communitySites")}
                  onWheel={handleWheel}
                />
              </Col>

              <Row className="ml-auto mt-4" style={{ marginBottom: 5 }}>
                <Col md={4} xxl lg="4">
                  <div>
                    <Form.Label>
                      <h2>
                        Provided
                        <span style={{ color: "red" }}>*</span>
                      </h2>
                    </Form.Label>
                  </div>
                </Col>
                <Col md={4} xxl lg="4">
                  <input
                    type="name"
                    className="form-control"
                    {...register(`detailOfCommunitySites.${index}.provided`)}
                    // {...register("provided")}
                    onWheel={handleWheel}
                  />
                </Col>
                <Col md={4} xxl lg="4">
                  <button
                    type="button"
                    style={{ float: "right", marginRight: 15 }}
                    className="btn btn-primary"
                    onClick={() => add({ communitySiteName: "", provided: "" })}
                  >
                    Add
                  </button>
                </Col>
                {index > 0 && (
                  <Col style={{ alignSelf: "center" }} md={2} lg="2">
                    <button type="button" className="btn btn-primary" onClick={() => remove(index)}>
                      Delete
                    </button>
                  </Col>
                )}
              </Row>
            </Row>
          );
        })}

        <br></br>
        <h6 className="text-black">
          <b>Documents</b>
        </h6>
        <div className="row ">
          <div className="col col-3">
            <h6 style={{ display: "flex" }} data-toggle="tooltip" data-placement="top">
              Layout Plan in pdf<span style={{ color: "red" }}>*</span>
            </h6>
            <label>
              <FileUpload style={{ cursor: "pointer" }} color="primary" />
              <input
                type="file"
                style={{ display: "none" }}
                onChange={(e) => getDocumentData(e?.target?.files[0], "layoutPlanPdf")}
                accept="application/pdf/jpeg/png"
              />
            </label>
            {watch("layoutPlanPdf") && (
              <a onClick={() => getDocShareholding(watch("layoutPlanPdf"), setLoader)} className="btn btn-sm ">
                <VisibilityIcon color="info" className="icon" />
              </a>
            )}
          </div>
          <div className="col col-3">
            <h6 style={{ display: "flex" }} data-toggle="tooltip" data-placement="top">
              Layout Plan in dxf<span style={{ color: "red" }}>*</span>
            </h6>
            <label>
              <FileUpload style={{ cursor: "pointer" }} color="primary" />
              <input
                type="file"
                style={{ display: "none" }}
                onChange={(e) => getDocumentData(e?.target?.files[0], "layoutPlanDxf")}
                accept="application/pdf/jpeg/png"
              />
            </label>
            {watch("layoutPlanDxf") && (
              <a onClick={() => getDocShareholding(watch("layoutPlanDxf"), setLoader)} className="btn btn-sm ">
                <VisibilityIcon color="info" className="icon" />
              </a>
            )}
          </div>

          <div className="col col-3">
            <h6
              style={{ display: "flex" }}
              data-toggle="tooltip"
              data-placement="top"
              title="Undertaking that no change has been made in the phasing "
            >
              Undertaking.<span style={{ color: "red" }}>*</span>
            </h6>
            <label>
              <FileUpload style={{ cursor: "pointer" }} color="primary" />
              <input
                type="file"
                style={{ display: "none" }}
                onChange={(e) => getDocumentData(e?.target?.files[0], "undertaking")}
                accept="application/pdf/jpeg/png"
              />
            </label>
            {watch("undertaking") && (
              <a onClick={() => getDocShareholding(watch("undertaking"), setLoader)} className="btn btn-sm ">
                <VisibilityIcon color="info" className="icon" />
              </a>
            )}
          </div>
        </div>
      </Col>
    </Row>
  );
};
export default ResidentialPlottedForm;
