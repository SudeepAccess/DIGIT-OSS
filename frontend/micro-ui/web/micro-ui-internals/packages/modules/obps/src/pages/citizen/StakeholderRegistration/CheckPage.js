import {
  Card,
  CardHeader,
  Header,
  LinkButton,
  Row,
  StatusTable,
  SubmitBar,
  Table,
  CardSectionHeader,
  OpenLinkContainer,
  BackButton,
  EditIcon,
} from "@egovernments/digit-ui-react-components";
import React, { useMemo, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory, useRouteMatch } from "react-router-dom";
import Timeline from "../../../components/Timeline";
import OBPSDocument from "../../../pageComponents/OBPSDocuments";
import axios from "axios";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { getDocShareholding } from "../../../../../tl/src/pages/employee/ScrutinyBasic/ScrutinyDevelopment/docview.helper";

const CheckPage = ({ onSubmit, value }) => {
  const { t } = useTranslation();
  const history = useHistory();
  const match = useRouteMatch();
  let user = Digit.UserService.getUser();
  const userInfo = Digit.UserService.getUser();
  // console.log("USER-INFO",user);
  const tenantId = user && user?.info && user?.info?.permanentCity ? user?.info?.permanentCity : Digit.ULBService.getCurrentTenantId();
  const tenant = Digit.ULBService.getStateId();
  let isopenlink = window.location.href.includes("/openlink/");
  const isCitizenUrl = Digit.Utils.browser.isMobile() ? true : false;
  const applicationNumber = sessionStorage.getItem("TECHNICAL_PROFESSIONAL_APPLICATION_NO");

  // if (isopenlink)
  //   window.onunload = function () {
  //     sessionStorage.removeItem("Digit.BUILDING_PERMIT");
  //   };

  const getDeveloperData = async () => {
    try {
      const requestResp = {
        RequestInfo: {
          api_id: "1",
          ver: "1",
          ts: "",
          action: "_getDeveloperById",
          did: "",
          key: "",
          msg_id: "",
          requester_id: "",
          auth_token: "",
        },
      };
      const getDevDetails = await axios.get(`/user/developer/_getDeveloperById?id=${userInfo?.info?.id}&isAllData=true`, requestResp, {});
      const developerDataGet = getDevDetails?.data;
      setDevData(getDevDetails?.data?.devDetail[0]?.addInfo ||  getDevDetails?.data?.devDetail[0]?.applicantType);
      setDevDataFinancialCapacity(getDevDetails?.data?.devDetail[0]?.capacityDevelopAColony?.documents);
      setShowDevTypeFields(developerDataGet?.devDetail[0]?.applicantType?.developerType);
      setShowLicenceType(developerDataGet?.devDetail[0]?.applicantType?.licenceTypeSelected);
      setPersonalData(developerDataGet?.devDetail[0]?.licenceDetails);
      console.log("LOLO", developerDataGet?.devDetail[0]?.licenceDetails);
      setAurthorizedUserInfoArray(developerDataGet?.devDetail[0]?.aurthorizedUserInfoArray);
      // setDocumentsData(developerDataGet?.devDetail[0]?.capacityDevelopAColony?.documents);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getDeveloperData();
  }, []);

  const [showDevTypeFields, setShowDevTypeFields] = useState("");
  const [showLicenceType, setShowLicenceType] = useState("");
  const [aurthorizedUserInfoArray, setAurthorizedUserInfoArray] = useState([]);
  const [getDevData, setDevData] = useState();
  const [getPersonalData, setPersonalData] = useState([]);
  const [getDevDataFinancialCapacity, setDevDataFinancialCapacity] = useState([]);

  // console.log(":::::", getDevData);

  const { result, formData, documents } = value;
  console.log("form DATA", formData,result,getDevData,documents);
  let consumerCode = value?.result?.Licenses[0].applicationNumber;
  const fetchBillParams = { consumerCode };

  const { data: paymentDetails } = Digit.Hooks.obps.useBPAREGgetbill(
    { businessService: "BPAREG", ...fetchBillParams, tenantId: tenant ? tenant : tenantId.split(".")[0] },
    {
      enabled: consumerCode ? true : false,
      retry: false,
    }
  );

  let routeLink = isopenlink ? `/digit-ui/citizen/obps/openlink/stakeholder/apply` : `/digit-ui/citizen/obps/stakeholder/apply`;

  function routeTo(jumpTo) {
    history.push(jumpTo);
  }

  const navigate = useHistory();

  const changeStep = (step) => {
    console.log("logger6...",step,value)
    if ((value?.LicneseType?.licenceTypeSelected !== "CITIZEN.CLASSA" && value?.LicneseType?.licenceTypeSelected !== "BPA_DEVELOPER")) {
      switch (step) {
        case 1:
          navigate.replace("/digit-ui/citizen/obps/stakeholder/apply/provide-license-type");
          break;
        case 2:
          navigate.replace("/digit-ui/citizen/obps/stakeholder/apply/license-details");
          break;
        case 3:
          navigate.replace("/digit-ui/citizen/obps/stakeholder/apply/stakeholder-document-details");
          break;
      }
    } else {
      switch (step) {
        case 1:
          navigate.replace("/digit-ui/citizen/obps/stakeholder/apply/provide-license-type");
          break;
        case 2:
          navigate.replace("/digit-ui/citizen/obps/stakeholder/apply/license-add-info");
          break;
        case 3:
          navigate.replace("/digit-ui/citizen/obps/stakeholder/apply/add-authorized-user");
          break;
        case 4:
          navigate.replace("/digit-ui/citizen/obps/stakeholder/apply/developer-capacity");
          break;
        case 5:
          navigate.replace("/digit-ui/citizen/obps/stakeholder/apply/stakeholder-document-details");
          break;
      }
    }
  };

  return (
    <React.Fragment>
      <div className={isopenlink ? "OpenlinkContainer" : ""}>
        {/* <div style={isopenlink?{ width:isCitizenUrl?"100%":"70%", marginLeft:"auto",marginRight:"auto"}:{}}> */}
        <div className="summary-page">
          {isopenlink && <BackButton style={{ border: "none" }}>{t("CS_COMMON_BACK")}</BackButton>}
          <Timeline
            currentStep={(value?.LicneseType?.licenceTypeSelected !== "CITIZEN.CLASSA" && value?.LicneseType?.licenceTypeSelected !== "BPA_DEVELOPER") ? 4 : 6}
            flow={(value?.LicneseType?.licenceTypeSelected !== "CITIZEN.CLASSA" && value?.LicneseType?.licenceTypeSelected !== "BPA_DEVELOPER") ? "ARCHITECT.CLASSA" : "STAKEHOLDER"}
            onChangeStep={changeStep}
            isAPILoaded={value?.LicneseType?.licenceTypeSelected ? true : false}
          />  
          <Header styles={{ fontSize: "32px" }}>{t("BPA_STEPPER_SUMMARY_HEADER")}</Header>
          <Card>
            <StatusTable>
              <Row
                className="border-none"
                label={t(`BPA_APPLICATION_NUMBER_LABEL`)}
                text={result?.Licenses?.[0]?.applicationNumber ? result?.Licenses?.[0]?.applicationNumber : applicationNumber}
              />
            </StatusTable>
          </Card>
          <Card>
            <CardHeader>
              {t(`BPA_LICENSE_TYPE`)}{" "}
              <span onClick={() => routeTo(`${routeLink}/provide-license-type`)}>
                <EditIcon />
              </span>{" "}
            </CardHeader>
            {/* <LinkButton
              label={<EditIcon style={{ marginTop: "-15px", float: "right", position: "relative", bottom: "32px" }} />}
              style={{ width: "100px", display: "inline" }}
              onClick={() => routeTo(`${routeLink}/provide-license-type`)}
            /> */}
            <StatusTable>
              <Row
                className="border-none"
                label={t(`BPA_LICENSE_TYPE`)}
                textStyle={{ paddingLeft: "12px" }}
                text={t(showLicenceType || getDevData?.showDevTypeFields)}
              />
              {formData?.LicneseType?.LicenseType?.i18nKey.includes("ARCHITECT") && (
                <Row className="border-none" label={t(`BPA_COUNCIL_NUMBER`)} text={formData?.LicneseType?.ArchitectNo} />
              )}
            </StatusTable>
          </Card>
          {(showLicenceType !== "CITIZEN.CLASSA" && showLicenceType !== "BPA_DEVELOPER") && ( 
            <Card>
              <CardHeader>
                {t("Peronal Details")}{" "}
                <span onClick={() => routeTo(`${routeLink}/license-details`)}>
                  <EditIcon />
                </span>
              </CardHeader>
              {/* <LinkButton
                label={<EditIcon style={{ marginTop: "-15px", float: "right", position: "relative", bottom: "32px" }} />}
                style={{ width: "100px", display: "inline" }}
                onClick={() => routeTo(`${routeLink}/license-details`)}
              /> */}
              <StatusTable>
                <Row className="border-none" label={t(`BPA_APPLICANT_NAME_LABEL`)} textStyle={{ paddingLeft: "12px" }} text={getPersonalData?.name} />
                {/* <Row className="border-none" label={t(`BPA_APPLICANT_GENDER_LABEL`)} text={t(formData?.LicneseDetails?.gender.i18nKey)} /> */}
                <Row className="border-none" label={t(`BPA_OWNER_MOBILE_NO_LABEL`)} text={getPersonalData?.mobileNumber} />
                <Row className="border-none" label={t(`BPA_APPLICANT_EMAIL_LABEL`)} text={getPersonalData?.email || t("CS_NA")} />
                <Row className="border-none" label={t(`BPA_APPLICANT_PAN_NO`)} text={getPersonalData?.panNumber || t("CS_NA")} />
                {/* <Row className="border-none" label={`Pin Code`} text={formData?.LicneseDetails?.devDetail?.licenceDetails?.pincode || t("CS_NA")} /> */}
                <Row className="border-none" label={`Date of Birth`} text={getPersonalData?.dob || t("CS_NA")} />
              </StatusTable>
            </Card>
          )}

          {(showLicenceType === "CITIZEN.CLASSA" || showLicenceType === "BPA_DEVELOPER") && (
            <Card>
              <CardHeader>
                {t(`BPA_ADD_INFO_LABEL`)}{" "}
                <span onClick={() => routeTo(`${routeLink}/license-add-info`)}>
                  <EditIcon />
                </span>
              </CardHeader>
              {/* <LinkButton
                label={<EditIcon style={{ marginTop: "-15px", float: "right", position: "relative", bottom: "32px" }} />}
                style={{ width: "100px", display: "inline" }}
                onClick={() => routeTo(`${routeLink}/license-add-info`)}
              /> */}

              <StatusTable>
                <Row className="border-none" label={"Developer's type"} text={getDevData?.showDevTypeFields || t("CS_NA")} />
                {getDevData?.showDevTypeFields == "Trust" ? (
                  <Row className="border-none" label={"CSR Number"} text={getDevData?.csr_Number || t("CS_NA")} /> && (
                    <Row className="border-none" label={"Trust Name"} text={getDevData?.companyName || t("CS_NA")} />
                  ) && <Row className="border-none" label={"IncorporationDate"} text={getDevData?.incorporationDate || t("CS_NA")} />
                ) : getDevData?.showDevTypeFields == "Company" ? (
                  <Row className="border-none" label={"CIN Number"} text={getDevData?.cin_Number || t("CS_NA")} /> && (
                    <Row className="border-none" label={"Company Name"} text={getDevData?.companyName || t("CS_NA")} />
                  ) && <Row className="border-none" label={"IncorporationDate"} text={getDevData?.incorporationDate || t("CS_NA")} />
                ) : getDevData?.showDevTypeFields == "Limited Liability Partnership" ? (
                  <Row className="border-none" label={"LLP Number"} text={getDevData?.llp_Number || t("CS_NA")} /> && (
                    <Row className="border-none" label={"IncorporationDate"} text={getDevData?.incorporationDate || t("CS_NA")} />
                  )
                ) : getDevData?.showDevTypeFields == "Individual" ? (
                  <Row className="border-none" label={"Email"} text={getDevData?.emailId || t("CS_NA")} /> && (
                    <Row className="border-none" label={"PAN Number"} text={getDevData?.PanNumber || t("CS_NA")} />
                  )
                ) : (
                  <Row className="border-none" label={"Email"} text={getDevData?.email || t("CS_NA")} />
                )}

                <Row className="border-none" label={"GST Number"} text={getDevData?.gst_Number || t("CS_NA")} />

                {/* <Row className="border-none" label={"IncorporationDate"} text={getDevData?.incorporationDate || t("CS_NA")} /> */}
                <Row className="border-none" label={"Mobile Number"} text={getDevData?.mobileNumberUser || t("CS_NA")} />
              </StatusTable>
              {/* <Row className="border-none" text={t(formData?.LicneseDetails?.cin_Number)} /> */}
            </Card>
          )}
          {(showLicenceType === "CITIZEN.CLASSA" || showLicenceType === "BPA_DEVELOPER") && (
            <Card>
              <CardHeader>
                {t(`BPA_AUTHORIZED_USER_LABEL`)}{" "}
                <span onClick={() => routeTo(`${routeLink}/add-authorized-user`)}>
                  <EditIcon />
                </span>
              </CardHeader>
              {/* <LinkButton
                label={<EditIcon style={{ marginTop: "-15px", float: "right", position: "relative", bottom: "32px" }} />}
                style={{ width: "100px", display: "inline" }}
                onClick={() => routeTo(`${routeLink}/add-authorized-user`)}
              /> */}
              <StatusTable>
                <table className="table table-bordered table-striped table-responsive">
                  <thead>
                    <tr>
                      <th>Sr. No.</th>
                      <th>Name</th>
                      <th>Mobile No.</th>
                      <th>Email</th>
                      <th>Gender</th>
                      <th>PAN No.</th>
                    </tr>
                  </thead>
                  <tbody>
                    {aurthorizedUserInfoArray?.length > 0 ? (
                      aurthorizedUserInfoArray.map((elementInArray, input) => {
                        return (
                          <tr key={elementInArray.id}>
                            <td>{input + 1}</td>
                            <td>{elementInArray.name}</td>
                            <td>{elementInArray.mobileNumber}</td>
                            <td>{elementInArray.emailId}</td>
                            <td>{elementInArray.gender}</td>
                            <td>{elementInArray.pan}</td>
                          </tr>
                        );
                      })
                    ) : (
                      <div className="d-none"></div>
                    )}
                  </tbody>
                </table>
              </StatusTable>
            </Card>
          )}
          {(showLicenceType === "CITIZEN.CLASSA" || showLicenceType === "BPA_DEVELOPER") && (
            <Card>
              <CardHeader>
                {t("Financial Capacity Document")}{" "}
                <span onClick={() => routeTo(`${routeLink}/developer-capacity`)}>
                  <EditIcon />
                </span>
              </CardHeader>
              {/* <LinkButton
                label={<EditIcon style={{ marginTop: "-15px", float: "right", position: "relative", bottom: "32px" }} />}
                style={{ width: "100px", display: "inline" }}
                onClick={() => routeTo(`${routeLink}/developer-capacity`)}
              /> */}
              <StatusTable>
                {/* {(getDevDataFinancialCapacity === "Individual") ? () : ()} */}
                {(getDevData?.showDevTypeFields === "Individual" ||
                  getDevData?.showDevTypeFields === "Proprietorship Firm" ||
                  getDevData?.showDevTypeFields === "Hindu Undivided Family") && (
                  <div className="card-body">
                    <div className="form-group row mb-12">
                      {/* <label className="col-sm-3 col-form-label">Individual</label> */}
                      <div className="col-sm-12">
                        {/* <textarea type="text" className="employee-card-input" id="details" placeholder="Enter Details" /> */}
                        <table className="table table-bordered" size="sm">
                          <thead>
                            <tr>
                              <th>S.No.</th>
                              <th>Particulars of document</th>
                              {/* <th>Details </th> */}
                              <th>Annexure </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td> 1 </td>
                              <td>
                                Net Worth in case of individual certified by CA/ Or Income tax return in case of an individual (for the last three
                                years) <span className="text-danger font-weight-bold">*</span>
                              </td>
                              {/* <td>
                          <input
                              type="file"
                              name="individualCertificateCA"
                              placeholder=""
                              class="employee-card-input"
                              onChange={(e) => getDocumentData(e?.target?.files[0], "individualCertificateCA")}
                          />
                      </td> */}
                              <td align="center" size="large">
                                <div className="row">
                                  {getDevDataFinancialCapacity?.individualCertificateCA ? (
                                    <a
                                      onClick={() => getDocShareholding(getDevDataFinancialCapacity?.individualCertificateCA)}
                                      className="btn btn-sm col-md-6"
                                    >
                                      <VisibilityIcon color="info" className="icon" />
                                    </a>
                                  ) : (
                                    <p></p>
                                  )}
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td> 2 </td>
                              <td>
                                Bank statement for the last 3 years <span className="text-danger font-weight-bold">*</span>
                              </td>
                              {/* <td>
                          <input
                              type="file"
                              name="companyBalanceSheet"
                              placeholder=""
                              class="employee-card-input"
                              onChange={(e) => getDocumentData(e?.target?.files[0], "companyBalanceSheet")}
                          />
                      </td> */}
                              <td align="center" size="large">
                                <div className="row">
                                  {getDevDataFinancialCapacity?.companyBalanceSheet ? (
                                    <a
                                      onClick={() => getDocShareholding(getDevDataFinancialCapacity?.companyBalanceSheet)}
                                      className="btn btn-sm col-md-6"
                                    >
                                      <VisibilityIcon color="info" className="icon" />
                                    </a>
                                  ) : (
                                    <p></p>
                                  )}
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}
                {(getDevData?.showDevTypeFields === "Company" ||
                  getDevData?.showDevTypeFields === "Society" ||
                  getDevData?.showDevTypeFields === "Trust" ||
                  getDevData?.showDevTypeFields === "Institution") && (
                  <div className="card-body">
                    <div className="form-group row">
                      {/* <label className="col-sm-3 col-form-label">Company</label> */}
                      <div className="col-sm-12">
                        {/* <input type="text" className="employee-card-input" id="Email" placeholder="Enter Email" /> */}
                        <table className="table table-bordered" size="sm">
                          <thead>
                            <tr>
                              <th>S.No.</th>
                              <th>Particulars of document</th>
                              {/* <th>Details </th> */}
                              <th>Annexure </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td> 1 </td>
                              <td>
                                Balance sheet of last 3 years <span className="text-danger font-weight-bold">*</span>
                              </td>
                              {/* <td>
                          <input
                              type="file"
                              name="companyBalanceSheet"
                              placeholder=""
                              class="employee-card-input"
                              onChange={(e) => getDocumentData(e?.target?.files[0], "companyBalanceSheet")}
                          />

                      </td> */}
                              <td align="center" size="large">
                                <div className="row">
                                  {getDevDataFinancialCapacity?.companyBalanceSheet ? (
                                    <a
                                      onClick={() => getDocShareholding(getDevDataFinancialCapacity?.companyBalanceSheet)}
                                      className="btn btn-sm col-md-6"
                                    >
                                      <VisibilityIcon color="info" className="icon" />
                                    </a>
                                  ) : (
                                    <p></p>
                                  )}
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td> 2 </td>
                              <td>
                                Ps-3(Representing Paid-UP capital) <span className="text-danger font-weight-bold">*</span>
                              </td>

                              <td align="center" size="large">
                                <div className="row">
                                  {getDevDataFinancialCapacity?.paidUpCapital ? (
                                    <a onClick={() => getDocShareholding(getDevDataFinancialCapacity?.paidUpCapital)} className="btn btn-sm col-md-6">
                                      <VisibilityIcon color="info" className="icon" />
                                    </a>
                                  ) : (
                                    <p></p>
                                  )}
                                </div>
                              </td>
                            </tr>

                            <tr>
                              <td> 3 </td>
                              <td>
                                Reserves and surpluses <span className="text-danger font-weight-bold">*</span>
                              </td>
                              <td align="center" size="large">
                                <div className="row">
                                  {getDevDataFinancialCapacity?.reservesAndSurplus ? (
                                    <a
                                      onClick={() => getDocShareholding(getDevDataFinancialCapacity?.reservesAndSurplus)}
                                      className="btn btn-sm col-md-6"
                                    >
                                      <VisibilityIcon color="info" className="icon" />
                                    </a>
                                  ) : (
                                    <p></p>
                                  )}
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td> 4 </td>
                              <td>Fully Convertible Debenture </td>
                              <td align="center" size="large">
                                <div className="row">
                                  {getDevDataFinancialCapacity?.fullyConvertibleDebenture ? (
                                    <a
                                      onClick={() => getDocShareholding(getDevDataFinancialCapacity?.fullyConvertibleDebenture)}
                                      className="btn btn-sm col-md-6"
                                    >
                                      <VisibilityIcon color="info" className="icon" />
                                    </a>
                                  ) : (
                                    <p></p>
                                  )}
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td> 5 </td>
                              <td>Any other documents</td>
                              <td align="center" size="large">
                                <div className="row">
                                  {getDevDataFinancialCapacity?.anyOtherDoc ? (
                                    <a onClick={() => getDocShareholding(getDevDataFinancialCapacity?.anyOtherDoc)} className="btn btn-sm col-md-6">
                                      <VisibilityIcon color="info" className="icon" />
                                    </a>
                                  ) : (
                                    <p></p>
                                  )}
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}
                {(getDevData?.showDevTypeFields === "Limited Liability Partnership" ||
                  getDevData?.showDevTypeFields === "Firm" ||
                  getDevData?.showDevTypeFields === "Partnership Firm") && (
                  <div className="card-body">
                    <div className="form-group row">
                      {/* <label className="col-sm-3 col-form-label">LLP</label> */}
                      <div className="col-sm-12">
                        {/* <input type="text" className="employee-card-input" id="llp" placeholder="Enter Email" /> */}
                        <table className="table table-bordered" size="sm">
                          <thead>
                            <tr>
                              <th>S.No.</th>
                              <th>Particulars of document</th>
                              {/* <th>Details </th> */}
                              <th>Annexure </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td> 1 </td>
                              <td>
                                Networth of partners <span className="text-danger font-weight-bold">*</span>
                              </td>
                              <td align="center" size="large">
                                <div className="row">
                                  {getDevDataFinancialCapacity?.networthPartners ? (
                                    <a
                                      onClick={() => getDocShareholding(getDevDataFinancialCapacity?.networthPartners)}
                                      className="btn btn-sm col-md-6"
                                    >
                                      <VisibilityIcon color="info" className="icon" />
                                    </a>
                                  ) : (
                                    <p></p>
                                  )}
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td> 2 </td>
                              <td>
                                Net worth of firm <span className="text-danger font-weight-bold">*</span>
                              </td>
                              <td align="center" size="large">
                                <div className="row">
                                  {getDevDataFinancialCapacity?.networthFirm ? (
                                    <a onClick={() => getDocShareholding(getDevDataFinancialCapacity?.networthFirm)} className="btn btn-sm col-md-6">
                                      <VisibilityIcon color="info" className="icon" />
                                    </a>
                                  ) : (
                                    <p></p>
                                  )}
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td> 3 </td>
                              <td>
                                Upload Fully Convertible Debenture <span className="text-danger font-weight-bold">*</span>
                              </td>
                              <td align="center" size="large">
                                <div className="row">
                                  {getDevDataFinancialCapacity?.fullyConvertibleDebenture ? (
                                    <a
                                      onClick={() => getDocShareholding(getDevDataFinancialCapacity?.fullyConvertibleDebenture)}
                                      className="btn btn-sm col-md-6"
                                    >
                                      <VisibilityIcon color="info" className="icon" />
                                    </a>
                                  ) : (
                                    <p></p>
                                  )}
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}
              </StatusTable>
            </Card>
          )}
          <Card>
            <CardHeader>
              {t("BPA_DOC_DETAILS_SUMMARY")}{" "}
              <span onClick={() => routeTo(`${routeLink}/stakeholder-document-details`)}>
                <EditIcon />
              </span>
            </CardHeader>
            {/* <LinkButton
              label={<EditIcon style={{ marginTop: "-15px", float: "right", position: "relative", bottom: "32px" }} />}
              style={{ width: "100px", display: "inline" }}
              onClick={() => routeTo(`${routeLink}/stakeholder-document-details`)}
            /> */}
            {documents?.documents?.map((doc, index) => (
              <div key={index}>
                <CardSectionHeader styles={{ fontSize: "18px" }}>{t(`BPAREG_HEADER_${doc?.documentType?.replace(".", "_")}`)}</CardSectionHeader>
                {doc?.info ? (
                  <div style={{ fontSize: "12px", color: "#505A5F", fontWeight: 400, lineHeight: "15px", marginBottom: "0.7rem" }}>{`${t(
                    doc?.info
                  )}`}</div>
                ) : null}
                <StatusTable>
                  <OBPSDocument value={value} Code={doc?.documentType} index={index} isNOC={false} svgStyles={{}} isStakeHolder={true} />
                  {documents?.documents?.length != index + 1 ? (
                    <hr style={{ color: "#cccccc", backgroundColor: "#cccccc", height: "2px", marginTop: "20px", marginBottom: "20px" }} />
                  ) : null}
                </StatusTable>
              </div>
            ))}
          </Card>
          <Card style={{ display: "none" }}>
            <CardHeader>{t("BPA_SUMMARY_FEE_EST")} </CardHeader>
            <StatusTable>
              {paymentDetails?.billResponse?.Bill[0]?.billDetails[0]?.billAccountDetails.map((bill, index) => (
                <div key={index}>
                  <Row className="border-none" label={t(`${bill.taxHeadCode}`)} text={`₹ ${bill?.amount}` || t("CS_NA")} />
                </div>
              ))}
              <Row
                className="border-none"
                label={t(`BPA_COMMON_TOTAL_AMT`)}
                text={`₹ ${paymentDetails?.billResponse?.Bill?.[0]?.billDetails[0]?.amount}` || t("CS_NA")}
              />
            </StatusTable>
            <hr style={{ color: "#cccccc", backgroundColor: "#cccccc", height: "2px", marginTop: "20px", marginBottom: "20px" }} />
            <CardHeader styles={{ fontSize: "24px" }}>{t("BPA_COMMON_TOTAL_AMT")}</CardHeader>
            <CardHeader>₹ {paymentDetails?.billResponse?.Bill?.[0]?.billDetails[0]?.amount}</CardHeader>
            <SubmitBar label={t("CS_COMMON_SUBMIT")} onSubmit={onSubmit} />
          </Card>
          <SubmitBar label={t("CS_COMMON_SUBMIT")} onSubmit={onSubmit} />
          {/* <SubmitBar label={t("CS_COMMON_SUBMIT")} onSubmit={onSubmit} disabled={paymentDetails?.billResponse?.Bill?.[0]?.billDetails[0]?.amount ? false : true} /> */}
        </div>
      </div>
    </React.Fragment>
  );
};

export default CheckPage;
