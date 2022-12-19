import {
  Card, CardHeader, Header, LinkButton, Row, StatusTable, SubmitBar, Table, CardSectionHeader, OpenLinkContainer, BackButton, EditIcon
} from "@egovernments/digit-ui-react-components";
import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useHistory, useRouteMatch } from "react-router-dom";
import Timeline from "../../../components/Timeline";
import OBPSDocument from "../../../pageComponents/OBPSDocuments";

const CheckPage = ({ onSubmit, value }) => {
  const { t } = useTranslation();
  const history = useHistory();
  const match = useRouteMatch();
  let user = Digit.UserService.getUser()
  // console.log("USER-INFO",user);
  const tenantId = user && user?.info && user?.info?.permanentCity ? user?.info?.permanentCity : Digit.ULBService.getCurrentTenantId();
  const tenant = Digit.ULBService.getStateId();
  let isopenlink = window.location.href.includes("/openlink/");
  const isCitizenUrl = Digit.Utils.browser.isMobile() ? true : false;

  if (isopenlink)
    window.onunload = function () {
      sessionStorage.removeItem("Digit.BUILDING_PERMIT");
    }

  const { result, formData, documents } = value; 
  // console.log("form DATA",value?.formData);
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


  return (
    <React.Fragment>
      <div className={isopenlink ? "OpenlinkContainer" : ""}>
        {/* <div style={isopenlink?{ width:isCitizenUrl?"100%":"70%", marginLeft:"auto",marginRight:"auto"}:{}}> */}
        <div>
          {isopenlink && <BackButton style={{ border: "none" }}>{t("CS_COMMON_BACK")}</BackButton>}
          <Timeline currentStep={6} flow="STAKEHOLDER" />
          <Header styles={{ fontSize: "32px" }}>{t("BPA_STEPPER_SUMMARY_HEADER")}</Header>
          <Card style={{ paddingRight: "16px" }}>
            <StatusTable>
              <Row className="border-none" label={t(`BPA_APPLICATION_NUMBER_LABEL`)} text={result?.Licenses?.[0]?.applicationNumber ? result?.Licenses?.[0]?.applicationNumber : ""} />
            </StatusTable>
          </Card>
          <Card style={{ paddingRight: "16px" }}>
            <CardHeader styles={{ fontSize: "24px" }}>{t(`BPA_LICENSE_DETAILS_LABEL`)}</CardHeader>
            <LinkButton
              label={<EditIcon style={{ marginTop: "-15px", float: "right", position: "relative", bottom: "32px" }} />}
              style={{ width: "100px", display: "inline" }}
              onClick={() => routeTo(`${routeLink}/provide-license-type`)}
            />
            <StatusTable>
              <Row className="border-none" label={t(`BPA_LICENSE_TYPE`)} textStyle={{ paddingLeft: "12px" }} text={t(formData?.LicneseType?.LicenseType?.i18nKey)} />
              {formData?.LicneseType?.LicenseType?.i18nKey.includes("ARCHITECT") && <Row className="border-none" label={t(`BPA_COUNCIL_NUMBER`)} text={formData?.LicneseType?.ArchitectNo} />}
            </StatusTable>
          </Card>
          <Card style={{ paddingRight: "16px" }}>
            <CardHeader styles={{ fontSize: "24px" }}>{t(`BPA_LICENSE_DET_CAPTION`)}</CardHeader>
            <LinkButton
              label={<EditIcon style={{ marginTop: "-15px", float: "right", position: "relative", bottom: "32px" }} />}
              style={{ width: "100px", display: "inline" }}
              onClick={() => routeTo(`${routeLink}/license-details`)}
            />
            <StatusTable>
              <Row className="border-none" label={t(`BPA_APPLICANT_NAME_LABEL`)} textStyle={{ paddingLeft: "12px" }} text={t(formData?.LicneseDetails?.devDetail?.licenceDetails?.name)} />
              {/* <Row className="border-none" label={t(`BPA_APPLICANT_GENDER_LABEL`)} text={t(formData?.LicneseDetails?.gender.i18nKey)} /> */}
              <Row className="border-none" label={t(`BPA_OWNER_MOBILE_NO_LABEL`)} text={formData?.LicneseDetails?.devDetail?.licenceDetails?.mobileNumber} />
              <Row className="border-none" label={t(`BPA_APPLICANT_EMAIL_LABEL`)} text={formData?.LicneseDetails?.devDetail?.licenceDetails?.email || t("CS_NA")} />
              <Row className="border-none" label={t(`BPA_APPLICANT_PAN_NO`)} text={formData?.LicneseDetails?.devDetail?.licenceDetails?.PanNumber || t("CS_NA")} />
              <Row className="border-none" label={`Pin Code`} text={formData?.LicneseDetails?.devDetail?.licenceDetails?.pincode || t("CS_NA")} />
              <Row className="border-none" label={`Date of Birth`} text={formData?.LicneseDetails?.devDetail?.licenceDetails?.dob || t("CS_NA")} />
            </StatusTable>
          </Card>
          <Card style={{ paddingRight: "16px" }}>
            <div style={{ marginRight: "24px" }}>
              <CardHeader styles={{ fontSize: "24px" }}>{`Add Info`}</CardHeader>
            </div>
            <LinkButton
              label={<EditIcon style={{ marginTop: "-15px", float: "right", position: "relative", bottom: "32px" }} />}
              style={{ width: "100px", display: "inline" }}
              onClick={() => routeTo(`${routeLink}/license-add-info`)}
            />
            <StatusTable>
              <Row className="border-none" label={"Developer's type"} text={formData?.LicenseAddInfo?.showDevTypeFields || t("CS_NA")} />
              <Row className="border-none" label={"CIN Number"} text={formData?.LicenseAddInfo?.cin_Number || t("CS_NA")} />
              <Row className="border-none" label={"Company Name"} text={formData?.LicenseAddInfo?.companyName || t("CS_NA")} />
              <Row className="border-none" label={"Email"} text={formData?.LicenseAddInfo?.email || t("CS_NA")} />
              <Row className="border-none" label={"IncorporationDate"} text={formData?.LicenseAddInfo?.incorporationDate || t("CS_NA")} />
              <Row className="border-none" label={"Mobile Number"} text={formData?.LicenseAddInfo?.mobileNumberUser || t("CS_NA")} />
            </StatusTable>
            {/* <Row className="border-none" text={t(formData?.LicneseDetails?.cin_Number)} /> */}
          </Card>
          {/* <Card style={{ paddingRight: "16px" }}>
            <div style={{ marginRight: "24px" }}>
              <CardHeader styles={{ fontSize: "24px" }}>{t(`BPA_COMMUNICATION_ADDRESS_HEADER_DETAILS`)}</CardHeader>
            </div>
            <LinkButton
              label={<EditIcon style={{ marginTop: "-15px", float: "right", position: "relative", bottom: "32px" }} />}
              style={{ width: "100px", display: "inline" }}
              onClick={() => routeTo(`${routeLink}/correspondence-address`)}
            />
            <Row className="border-none" text={t(value?.Correspondenceaddress)} />
          </Card> */}
          <Card style={{ paddingRight: "16px" }}>
            <CardHeader styles={{ fontSize: "24px" }}>{t("BPA_DOC_DETAILS_SUMMARY")}</CardHeader>
            <LinkButton
              label={<EditIcon style={{ marginTop: "-15px", float: "right", position: "relative", bottom: "32px" }} />}
              style={{ width: "100px", display: "inline" }}
              onClick={() => routeTo(`${routeLink}/stakeholder-document-details`)}
            />
            {documents?.documents.map((doc, index) => (
              <div key={index}>
                <CardSectionHeader styles={{ fontSize: "18px" }}>{t(`BPAREG_HEADER_${doc?.documentType?.replace('.', '_')}`)}</CardSectionHeader>
                {doc?.info ? <div style={{ fontSize: "12px", color: "#505A5F", fontWeight: 400, lineHeight: "15px" }}>{`${t(doc?.info)}`}</div> : null}
                <StatusTable>
                  <OBPSDocument value={value} Code={doc?.documentType} index={index} isNOC={false} svgStyles={{}} isStakeHolder={true} />
                  {documents?.documents?.length != index + 1 ? <hr style={{ color: "#cccccc", backgroundColor: "#cccccc", height: "2px", marginTop: "20px", marginBottom: "20px" }} /> : null}
                </StatusTable>
              </div>
            ))}
          </Card>
          <Card style={{ paddingRight: "16px" }}>
            {/* <CardHeader styles={{ fontSize: "24px" }}>{t("BPA_SUMMARY_FEE_EST")}</CardHeader>
            <StatusTable>
              {paymentDetails?.billResponse?.Bill[0]?.billDetails[0]?.billAccountDetails.map((bill, index) => (
                <div key={index}>
                  <Row className="border-none" label={t(`${bill.taxHeadCode}`)} text={`₹ ${bill?.amount}` || t("CS_NA")} />
                </div>
              ))}
              <Row className="border-none" label={t(`BPA_COMMON_TOTAL_AMT`)} text={`₹ ${paymentDetails?.billResponse?.Bill?.[0]?.billDetails[0]?.amount}` || t("CS_NA")} />
            </StatusTable>
            <hr style={{ color: "#cccccc", backgroundColor: "#cccccc", height: "2px", marginTop: "20px", marginBottom: "20px" }} />
            <CardHeader styles={{ fontSize: "24px" }}>{t("BPA_COMMON_TOTAL_AMT")}</CardHeader>
            <CardHeader>₹ {paymentDetails?.billResponse?.Bill?.[0]?.billDetails[0]?.amount}</CardHeader> */}
            {/* <SubmitBar label={t("CS_COMMON_SUBMIT")} onSubmit={onSubmit} /> */}
            <SubmitBar label={t("CS_COMMON_SUBMIT")} onSubmit={onSubmit} disabled={paymentDetails?.billResponse?.Bill?.[0]?.billDetails[0]?.amount ? false : true} />
          </Card>
        </div>
      </div>
    </React.Fragment>
  );
};

export default CheckPage;