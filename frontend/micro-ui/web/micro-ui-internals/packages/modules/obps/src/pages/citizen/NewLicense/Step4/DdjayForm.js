import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Row, Col } from "react-bootstrap";
import { Form } from "react-bootstrap";
import FileUpload from "@mui/icons-material/FileUpload";
import VisibilityIcon from "@mui/icons-material/Visibility";
import TextField from "@mui/material/TextField";
import NumberInput from "../../../../components/NumberInput";

const DDJAYForm = ({ register, getDocumentData, watch, getDocShareholding, setLoader, setValue, control, handleWheel, setError, error }) => {
  return (
    <Row className="ml-auto" style={{ marginBottom: 5 }}>
      <Col col-12>
        <h6 className="text-black">
          <b>Deen Dayal Jan Awas Yojna (DDJAY)</b>
        </h6>
        <h6 className="text-black mt-4">
          <b>Detail of land use</b>
        </h6>
        <Col col-12>
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
                  <h2 data-toggle="tooltip" data-placement="top" title="50% of the Area under Sector Road & Green Belt">
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

        <Row className="ml-auto mt-4" style={{ marginBottom: 5 }}>
          <Col md={4} xxl lg="4">
            <div>
              <Form.Label>
                <h2>
                  Max area of plots ( in sqm)
                  <span style={{ color: "red" }}>*</span>
                </h2>
              </Form.Label>
            </div>
          </Col>
          <Col md={4} xxl lg="4">
            <input
              type="number"
              className="form-control"
              {...register("maxAreaPlots")}
              onChange={(e) => {
                if (e?.target?.value > 150) setError({ ...error, ["maxAreaPlots"]: "Max area of plots Cannot exceed 150 sqm" });
                else setError({ ...error, ["maxAreaPlots"]: "" });
              }}
              onWheel={handleWheel}
            />
          </Col>
          <Col md={4} xxl lg="4">
            {error?.maxAreaPlots && <h6 style={{ fontSize: "12px", color: "red" }}>{error?.maxAreaPlots}</h6>}
          </Col>
        </Row>
        <Row className="ml-auto mt-4" style={{ marginBottom: 5 }}>
          <Col md={4} xxl lg="4">
            <div>
              <h2>
                Size of plot ( in sqm)
                <span style={{ color: "red" }}>*</span>
              </h2>
            </div>
          </Col>
        </Row>
        <Row className="ml-auto mt-4" style={{ marginBottom: 5 }}>
          <Col md={4} xxl lg="4">
            <label>Minimum</label>
          </Col>
          <Col md={4} xxl lg="4">
            <input type="number" className="form-control" {...register("minPlotSize")} onWheel={handleWheel} />
          </Col>
        </Row>
        <Row className="ml-auto mt-4" style={{ marginBottom: 5 }}>
          <Col md={4} xxl lg="4">
            <label>Maximum</label>
          </Col>
          <Col md={4} xxl lg="4">
            <input
              type="number"
              className="form-control"
              {...register("maxPlotSize")}
              onChange={(e) => {
                if (e?.target?.value > watch("maxAreaPlots"))
                  setError({ ...error, ["maxPlotSize"]: "Maximum Cannot be more than Max area of plots" });
                else setError({ ...error, ["maxPlotSize"]: "" });
              }}
              onWheel={handleWheel}
            />
            {error?.maxPlotSize && <h6 style={{ fontSize: "12px", color: "red" }}>{error?.maxPlotSize}</h6>}
          </Col>
        </Row>

        <Row className="ml-auto mt-4" style={{ marginBottom: 5 }}>
          <Col md={4} xxl lg="4">
            <div>
              <Form.Label>
                <h2>
                  Total Nos. of Plots
                  <span style={{ color: "red" }}>*</span>
                </h2>
              </Form.Label>
            </div>
          </Col>
          <Col md={4} xxl lg="4">
            <NumberInput
              control={control}
              name="totalNoOfPlots"
              customInput={TextField}
              thousandSeparator={false}
              allowNegative={false}
              decimalScale={0}
              onChange={(e) => {
                const val = e?.target?.value * 18;
                const final = val / watch("netPlannedArea");
                console.log("final", final);
                if (final > 400 || final < 240)
                  setError({ ...error, ["permissibleDensity"]: "Permissible density range should be between 240 and 400 (PPA)only" });
                else {
                  setValue("permissibleDensity", final?.toFixed(3));
                  setError({ ...error, ["permissibleDensity"]: "" });
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
                  Permissible density
                  <span style={{ color: "red" }}>*</span>
                </h2>
              </Form.Label>
            </div>
          </Col>
          <Col md={4} xxl lg="4">
            <input type="number" className="form-control" {...register("permissibleDensity")} />
          </Col>
          <Col md={4} xxl lg="4">
            {error?.permissibleDensity && <h6 style={{ fontSize: "12px", color: "red" }}>{error?.permissibleDensity}</h6>}
          </Col>
        </Row>

        <Row className="ml-auto mt-4" style={{ marginBottom: 5 }}>
          <Col md={4} xxl lg="4">
            <div>
              <Form.Label>
                <h2>
                  Residential & Commercial Plots
                  <span style={{ color: "red" }}>*</span>
                </h2>
              </Form.Label>
            </div>
          </Col>
          <Col md={4} xxl lg="4">
            <input
              type="number"
              className="form-control"
              {...register("residentialAndCommercialPlots")}
              onWheel={handleWheel}
              onChange={(e) => {
                if (e?.target?.value > (watch("totalAreaScheme") * 65) / 100) {
                  setError({ ...error, ["residentialAndCommercialPlots"]: "Cannot exceed 65% of Total area of the Scheme" });
                } else setError({ ...error, ["residentialAndCommercialPlots"]: "" });
              }}
            />
          </Col>
          <Col md={4} xxl lg="4">
            {error?.residentialAndCommercialPlots && <h6 style={{ fontSize: "12px", color: "red" }}>{error?.residentialAndCommercialPlots}</h6>}
          </Col>
        </Row>
        <br></br>
        <Row className="ml-auto" style={{ marginBottom: 5 }}>
          <Col md={4} xxl lg="4">
            <div>
              <Form.Label>
                <h2>
                  Area under Residential Use
                  <span style={{ color: "red" }}>*</span>
                </h2>
              </Form.Label>
            </div>
          </Col>
          <Col md={4} xxl lg="4">
            <input
              type="number"
              className="form-control"
              {...register("areaUnderResidentialUse")}
              onWheel={handleWheel}
              onChange={(e) => {
                if (e?.target?.value > (watch("totalAreaScheme") * 61) / 100) {
                  setError({ ...error, ["areaUnderResidentialUse"]: "Cannot exceed 61% of Total area of the Scheme" });
                } else setError({ ...error, ["areaUnderResidentialUse"]: "" });
              }}
            />
          </Col>
          <Col md={4} xxl lg="4">
            {error?.areaUnderResidentialUse && <h6 style={{ fontSize: "12px", color: "red" }}>{error?.areaUnderResidentialUse}</h6>}
          </Col>
        </Row>
        <Row className="ml-auto" style={{ marginBottom: 5 }}>
          <Col md={4} xxl lg="4">
            <div>
              <Form.Label>
                <h2>
                  Area under Commercial Use
                  <span style={{ color: "red" }}>*</span>
                </h2>
              </Form.Label>
            </div>
          </Col>
          <Col md={4} xxl lg="4">
            <input
              type="number"
              className="form-control"
              {...register("areaUnderCommercialUse")}
              onWheel={handleWheel}
              onChange={(e) => {
                if (e?.target?.value > (watch("totalAreaScheme") * 4) / 100) {
                  setError({ ...error, ["areaUnderCommercialUse"]: "Cannot exceed 4% of Total area of the Scheme" });
                } else setError({ ...error, ["areaUnderCommercialUse"]: "" });
              }}
            />
          </Col>
          <Col md={4} xxl lg="4">
            {error?.areaUnderCommercialUse && <h6 style={{ fontSize: "12px", color: "red" }}>{error?.areaUnderCommercialUse}</h6>}
          </Col>
        </Row>
        <Row className="ml-auto" style={{ marginBottom: 5 }}>
          <Col md={4} xxl lg="4">
            <div>
              <Form.Label>
                <h2 data-toggle="tooltip" data-placement="top" title="  Width of Internal roads in the colony (in meters)">
                  Width of Internal roads
                  <span style={{ color: "red" }}>*</span>
                </h2>
              </Form.Label>
            </div>
          </Col>
          <Col md={4} xxl lg="4">
            <input
              type="number"
              className="form-control"
              {...register("widthOfInternalRoads")}
              onWheel={handleWheel}
              onChange={(e) => {
                if (e?.target?.value < 9) {
                  setError({ ...error, ["widthOfInternalRoads"]: "Minimum Width of Internal roads in the colony cannot be less than 9 meters" });
                } else setError({ ...error, ["widthOfInternalRoads"]: "" });
              }}
            />
          </Col>
          <Col md={4} xxl lg="4">
            {error?.widthOfInternalRoads && <h6 style={{ fontSize: "12px", color: "red" }}>{error?.widthOfInternalRoads}</h6>}
          </Col>
        </Row>
        <Row className="ml-auto" style={{ marginBottom: 5 }}>
          <Col md={4} xxl lg="4">
            <div>
              <Form.Label>
                <h2 data-toggle="tooltip" data-placement="top" title="   Area under organized Open Space (in acres)">
                  Area under organized Space
                  <span style={{ color: "red" }}>*</span>
                </h2>
              </Form.Label>
            </div>
          </Col>
          <Col md={4} xxl lg="4">
            <input
              type="number"
              className="form-control"
              {...register("AreaUnderOrganizedSpace")}
              onWheel={handleWheel}
              onChange={(e) => {
                if (e?.target?.value < (watch("totalAreaScheme") * 7.5) / 100) {
                  setError({
                    ...error,
                    ["AreaUnderOrganizedSpace"]:
                      "Minimum Area under organized Open Space (in acres) cannot be less than 7.5% of Total area of the Scheme",
                  });
                } else setError({ ...error, ["AreaUnderOrganizedSpace"]: "" });
              }}
            />
          </Col>
          <Col md={4} xxl lg="4">
            {error?.AreaUnderOrganizedSpace && <h6 style={{ fontSize: "12px", color: "red" }}>{error?.AreaUnderOrganizedSpace}</h6>}
          </Col>
        </Row>
        <br></br>
        <Row className="ml-auto" style={{ marginBottom: 5 }}>
          <Col md={4} xxl lg="4">
            <div>
              <label>
                <h2
                  data-toggle="tooltip"
                  data-placement="top"
                  title="The owner will transfer 10% area of the licenced colony free of cost to the Government for provision of community facilities. "
                >
                  Area Transferred to Government.
                </h2>
              </label>
            </div>
          </Col>
          <Col md={4} xxl lg="4">
            <input
              type="number"
              className="form-control"
              {...register("transferredArea")}
              onWheel={handleWheel}
              onChange={(e) => {
                if (e?.target?.value < (watch("totalAreaScheme") * 10) / 100) {
                  setError({
                    ...error,
                    ["transferredArea"]: "Minimum Area Transferred to Government for community facilities should be 10% of Total area of the Scheme ",
                  });
                } else setError({ ...error, ["transferredArea"]: "" });
              }}
            />
            {error?.transferredArea && <h6 style={{ fontSize: "12px", color: "red" }}>{error?.transferredArea}</h6>}
          </Col>
        </Row>
        <h6 className="text-black mt-4">
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
              <div>
                <a onClick={() => getDocShareholding(watch("layoutPlanPdf"), setLoader)} className="btn btn-sm ">
                  <VisibilityIcon color="info" className="icon" />
                </a>
                {/* <h3>{watch("layoutPlanPdf")}</h3> */}
              </div>
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
        </div>
      </Col>
    </Row>
  );
};

export default DDJAYForm;
