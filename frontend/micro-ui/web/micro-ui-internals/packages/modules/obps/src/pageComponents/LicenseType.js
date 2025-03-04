import {
  CardLabel,
  Dropdown,
  FormStep,
  RadioOrSelect,
  TextInput,
  OpenLinkContainer,
  CardLabelError,
  BackButton,
  MuiRadio,
  Link,
} from "@egovernments/digit-ui-react-components";
import React, { Fragment, useEffect, useState } from "react";
import { stringReplaceAll } from "../utils";
import Timeline from "../components/Timeline";
import { Form, Row } from "react-bootstrap";
import { MenuItem, Select } from "@mui/material";
import axios from "axios";
import { newConfig } from "../config/stakeholderConfig";
import Spinner from "../components/Loader/index";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { OutlinedInput } from "@material-ui/core";

const LicenseType = ({ t, config, onSelect, userType, formData }) => {
  const userInfo = Digit.UserService.getUser();
  // const { t } = useTranslation();
  const [loader, setLoading] = useState(false);

  const getDeveloperData = async () => {
    setLoading(true);
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
      setLoading(false);
      const developerDataGet = getDevDetails?.data;
      setShowDevTypeFields(developerDataGet?.devDetail[0]?.applicantType?.developerType || devType);
      // setLicenseType(developerDataGet?.devDetail[0]?.applicantType?.licenceType);
      setLicenseTypeSelected(developerDataGet?.devDetail[0]?.applicantType?.licenceTypeSelected);
      setLicenseTypeCom(developerDataGet?.devDetail[0]?.applicantType?.licenceType);
    } catch (error) {
      setLoading(false);
      return error;
    }
  };
  useEffect(() => {
    getDeveloperData();
  }, []);

  if (JSON.parse(sessionStorage.getItem("BPAREGintermediateValue")) !== null) {
    formData = JSON.parse(sessionStorage.getItem("BPAREGintermediateValue"));
    sessionStorage.setItem("BPAREGintermediateValue", null);
  } else formData = formData;

  let index = window.location.href.split("/").pop();
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const stateId = Digit.ULBService.getStateId();

  const [LicenseType, setLicenseType] = useState(formData?.LicneseType?.LicenseType || formData?.formData?.LicneseType?.LicenseType || "");
  const [licenceTypeSelected, setLicenseTypeSelected] = useState(
    formData?.LicneseType?.licenceTypeSelected || formData?.formData?.LicneseType?.licenceTypeSelected || ""
  );
  const [ArchitectNo, setArchitectNo] = useState(formData?.LicneseType?.ArchitectNo || formData?.formData?.LicneseType?.ArchitectNo || null);
  const [ArchitectValidityDate, setArchitectValidityDate] = useState(formData?.LicneseType?.ArchitectValidityDate || formData?.formData?.LicneseType?.ArchitectValidityDate || null);
  const [showDevTypeFields, setShowDevTypeFields] = useState(
    formData?.LicneseType?.showDevTypeFields || formData?.formData?.LicneseType?.showDevTypeFields || ""
  );
  const [licenceTypeCombined, setLicenseTypeCom] = useState("");
  const { data, isLoading } = Digit.Hooks.obps.useMDMS(stateId, "StakeholderRegistraition", "TradeTypetoRoleMapping");
  let isopenlink = window.location.href?.includes("/openlink/");
  const isCitizenUrl = Digit.Utils.browser.isMobile() ? true : false;

  const { data: optionsArrList } = Digit.Hooks.obps.useMDMS(stateId, "Developer-type", ["DeveloperType"]);
  let arrayDevList = [];
  optionsArrList &&
    optionsArrList["Developer-type"].DeveloperType.map((devTypeDetails) => {
      arrayDevList.push({ code: `${devTypeDetails.code}`, value: `${devTypeDetails.code}` });
    });

  if (isopenlink)
    window.onunload = function () {
      sessionStorage.removeItem("Digit.BUILDING_PERMIT");
    };

  function getLicenseType() {
    console.log("logger Trade LIC .....",data?.StakeholderRegistraition?.TradeTypetoRoleMapping )
    let list = [];
    let found = false;
    data?.StakeholderRegistraition?.TradeTypetoRoleMapping.map((ob) => {
      found = list.some((el) => el.i18nKey?.includes(ob.tradeType.split(".")[0]));
      if (!found) list.push({ role: ob.role, i18nKey: `TRADELICENSE_TRADETYPE_${ob.tradeType.split(".")[0]}`, tradeType: ob.tradeType });
    });
    console.log("DATAList", list);
    return list;
  }

  const onSkip = () => onSelect();

  const selectLicenseType = (e) => {
    setLicenseTypeSelected(e.target.value);
    // console.log("log123", licenceTypeSelected);
  };

  const setDevType = (e) => {
    const getDevTypeValue = e.target.value;
    setLicenseTypeCom(`${licenceTypeSelected}.${getDevTypeValue}`);
    setShowDevTypeFields(e.target.value);
    // setValue(getDevTypeValue);
    // console.log("DEVTYPE", licenceTypeCombined);
    localStorage.setItem("devTypeValueFlag", getDevTypeValue);

    // alert(licenceTypeCombined);
  };

  function selectArchitectNo(e) {
    setArchitectNo(e.target.value.toUpperCase());
  }
  function selectArchitectValidityDate(e) {
    setArchitectValidityDate(e.target.value);
  }

  // console.log("++++",`${LicenseType?.tradeType}.${showDevTypeFields}`);

  function goNext() {
    // if (!(formData?.result && formData?.result?.Licenses[0]?.id)){

    // console.log("log1234...",config,formData,LicenseType?.tradeType);
    setLoading(true);
    let applicantType = {
      licenceType: licenceTypeCombined,
      licenceTypeSelected: licenceTypeSelected,
      developerType: showDevTypeFields,
      architectNo: ArchitectNo,
      architectValidityDate: ArchitectValidityDate
    };
    const developerRegisterData = {
      id: userInfo?.info?.id,
      pageName: "applicantType",
      createdBy: userInfo?.info?.id,
      updatedBy: userInfo?.info?.id,
      devDetail: {
        applicantType: applicantType,
      },
    };

    // console.log("logger123",config,applicantType);
    if ((licenceTypeSelected !== "CITIZEN.CLASSA" && licenceTypeSelected !== "BPA_DEVELOPER")) {
      onSelect(config.key, applicantType);
    } else {
      onSelect(config.key, applicantType, null, null, "license-add-info");
    }

    Digit.OBPSService.CREATEDeveloper(developerRegisterData, tenantId)
      .then((result, err) => {
        // console.log("DATA",result?.id);
        // localStorage.setItem('devRegId',JSON.stringify(result?.id));
        // setIsDisableForNext(false);
        let data = {
          result: result,
          formData: formData,
          licenceType: licenceType,
          developerType: developerType,
        };
        //1, units
        if ((licenceTypeSelected !== "CITIZEN.CLASSA" && licenceTypeSelected !== "BPA_DEVELOPER")) {
          onSelect("", data, "", true);
        } else {
          onSelect("", data, "", true, "license-add-info");
        }
        setLoading(false);
      })

      .catch((e) => {
        // setIsDisableForNext(false);
        // setShowToast({ key: "error" });
        setLoading(false);
        setError(e?.response?.data?.Errors[0]?.message || null);
      });
    // }
  }

  return (
    <div>
      {loader && <Spinner />}
      <div className={isopenlink ? "OpenlinkContainer" : ""}>
        {isopenlink && <BackButton style={{ border: "none" }}>{t("CS_COMMON_BACK")}</BackButton>}
        <Timeline currentStep={1} flow={(licenceTypeSelected !== "CITIZEN.CLASSA" && licenceTypeSelected !== "BPA_DEVELOPER") ? "ARCHITECT.CLASSA" : "STAKEHOLDER"} />
        <FormStep
          t={t}
          config={config}
          onSelect={goNext}
          onSkip={onSkip}
          isDisabled={
            licenceTypeSelected && licenceTypeSelected?.includes("ARCHITECT")
              ? !licenceTypeSelected || !ArchitectNo
              : licenceTypeSelected?.includes("CITIZEN")
          }
        >
          <div className="happy">
            <div className="card mb-3">
              <Row className="justify-content-between">

              <Form.Group className="col-md-6">
                  <CardLabel>
                  {t("BPA_LICENSE_TYPE_TEXT")} <span className="font-weight-bold text-danger">*</span>
                  </CardLabel>
                  <select value={licenceTypeSelected || ""} onChange={selectLicenseType} className="w-100 form-control" variant="standard">
                  <option value={""}>{t("BPA_LICENSE_TYPE_TEXT")}</option>
                    {getLicenseType()?.map((item, index) => (
                      <option value={item?.tradeType}>{t(item?.i18nKey)}</option>
                    ))}
                  </select>
                </Form.Group>

                {licenceTypeSelected && licenceTypeSelected?.includes("ARCHITECT") && (
                    <Fragment>
                      <Form.Group className="col-md-6">
                      <CardLabel>
                        {`${t("BPA_COUNCIL_NUMBER")}`} <span className="font-weight-bold text-danger">*</span>
                      </CardLabel>
                      <input
                        t={t}
                        className={"form-control"}
                        type={"text"}
                        isMandatory={false}
                        optionKey="i18nKey"
                        name="ArchitectNo"
                        value={ArchitectNo}
                        onChange={selectArchitectNo}
                        maxlength={"15"}
                      />
                      {ArchitectNo && ArchitectNo.length > 0 && !ArchitectNo.match(Digit.Utils.getPattern("architectNumber")) && (
                        <CardLabelError style={{ width: "100%", fontSize: "16px", marginBottom: "12px", color: "red" }}>
                          {t("Invalid Architect Number")}
                        </CardLabelError>
                      )}
                    </Form.Group>

                    <Form.Group className="col-md-6">
                      <CardLabel>
                        {`${t("BPA_COUNCIL_ARCHITECT_VALIDITY_DATE")}`} <span className="font-weight-bold text-danger">*</span>
                      </CardLabel>
                      <input
                        t={t}
                        className={"form-control"}
                        type={"date"}
                        isMandatory={false}
                        optionKey="i18nKey"
                        name="ArchitectNo"
                        value={ArchitectValidityDate}
                        onChange={selectArchitectValidityDate}
                        // maxlength={"15"}
                      />
                      {/* {ArchitectNo && ArchitectNo.length > 0 && !ArchitectNo.match(Digit.Utils.getPattern("architectNumber")) && (
                        <CardLabelError style={{ width: "100%", marginTop: "-15px", fontSize: "16px", marginBottom: "12px", color: "red" }}>
                          {t("Invalid Architect Number")}
                        </CardLabelError>
                      )} */}
                    </Form.Group>
                    </Fragment>
                  )}

                <Form.Group className="col-md-6">
                  {licenceTypeSelected && licenceTypeSelected?.includes("DEVELOPER") && (
                    <div className="col-md-6">
                      <CardLabel>
                        {`${t("BPA_DEVELOPER_TYPE_TEXT")}`} <span className="font-weight-bold text-danger">*</span>
                      </CardLabel>
                      <Select value={showDevTypeFields || ""} onChange={setDevType} className="w-100 form-control" variant="standard">
                        {arrayDevList?.map((item, index) => (
                          <MenuItem value={item.value}>{item?.code}</MenuItem>
                        ))}
                      </Select>
                    </div>
                  )}

                  {licenceTypeSelected && licenceTypeSelected?.includes("CITIZEN") && (
                    <div className="col-md-6">
                      <a className="btn btn-primary btn-sm" href="/digit-ui/citizen">
                        Licencing Services
                      </a>
                    </div>
                  )}
                </Form.Group>
                {/* {LicenseType && LicenseType?.i18nKey?.includes("CITIZEN") && <a className="submit-bar col-md-4" onClick={() => history.push("/digit-ui/citizen")}>Submit</a>} */}
              </Row>
            </div>
          </div>
        </FormStep>
      </div>
    </div>
  );
};

export default LicenseType;
