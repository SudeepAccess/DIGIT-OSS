import { PrivateRoute, BreadCrumb, BackButton } from "@egovernments/digit-ui-react-components";
import React, { Fragment } from "react";
import { Switch, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
// import ApplicationDetail from "./ApplicationDetail";
// import BpaApplicationDetail from "./BpaApplicationDetails";
import Search from "./Search";
import OBPSResponse from "./OBPSResponse";
import StakeholderResponse from "./StakeholderResponse";
import ServicePlanInbox from "./ServicePlan/Inbox";
import ElectricalPlanInbox from "./ElectricPlan/Inbox";
import BankGuaranteePlan from "./BankGuarantee/Inbox";
import TechnicalProfessionalInbox from "./TechnicalProfessionals/Inbox";
import LowMediumInbox from "./LowMedium/Inbox"
// import TechnicalProfessionalCard from "./TechnicalProfessionals/TechnicalProfessionalCard";
import { ScrutinyRemarksProvider } from "../../context/remarks-data-context";
import TechnicalProfessionalCard from "./TechnicalProfessionals/TechnicalProfessionalCard";
import HighRiskInbox from "./HighRisk/Inbox";
import LowMediumCard from "./LowMedium/LowMediumCard";


// import ScrutinyFormcontainer from "../citizen/NewLicense/ScrutinyContainer";
const OBPSBreadCrumbs = ({ location }) => {
  const { t } = useTranslation();
  const crumbs = [
    {
      path: "/digit-ui/employee",
      content: t("ES_COMMON_HOME"),
      show: true,
    },
    {
      path: "/digit-ui/employee/obps/inbox",
      content: t("ES_COMMON_OBPS_INBOX_LABEL"),
      show: location.pathname.includes("obps/inbox") ? true : false,
    },
    {
      path: "/digit-ui/employee/obps/stakeholder-inbox",
      content: t("ES_COMMON_STAKEHOLDER_INBOX_LABEL"),
      show: location.pathname.includes("obps/stakeholder-inbox") ? true : false,
    },
    {
      path: "/digit-ui/employee/obps/inbox/bpa/:id",
      content: t("ES_OBPS_SEARCH_BPA"),
      show: location.pathname.includes("obps/inbox/bpa") ? true : false,
    },
    {
      path: "/digit-ui/employee/obps/inbox/stakeholder/:id",
      content: t("ES_OBPS_SEARCH_BPA"),
      show: location.pathname.includes("obps/stakeholder-inbox/stakeholder") ? true : false,
    },
    {
      path: "/digit-ui/employee/obps/search/application",
      content: t("ES_OBPS_SEARCH"),
      show: location.pathname.includes("/obps/search/application") ? true : false,
    },
    {
      path: "/digit-ui/employee/obps/search/application/bpa/:id",
      content: t("ES_OBPS_SEARCH_BPA"),
      show: location.pathname.includes("/obps/search/application/bpa") ? true : false,
    },
    {
      path: "/digit-ui/employee/obps/search/application/stakeholder/:id",
      content: t("ES_OBPS_SEARCH_BPA"),
      show: location.pathname.includes("/obps/search/application/stakeholder/") ? true : false,
    },
    {
      path: "/digit-ui/employee/obps/TechnicalProfessionalInbox",
      content: t("ES_OBPS_SEARCH_BPA"),
      show: location.pathname.includes("/obps/TechnicalProfessionalInbox") ? true : false,
    },
    {
      path: "/digit-ui/employee/obps/LowMediumInbox",
      content: t("ES_OBPS_SEARCH_BPA"),
      show: location.pathname.includes("/obps/LowMediumInbox") ? true : false,
    },
    {
      path: "/digit-ui/employee/obps/TechnicalProfessionalscrutiny/:id",
      content: t("ES_OBPS_SEARCH_BPA"),
      show: location.pathname.includes("/obps/TechnicalProfessionalscrutiny/") ? true : false,
    },
  ];

  return <BreadCrumb crumbs={crumbs} />;
}

const EmployeeApp = ({ path }) => {
  const location = useLocation()
  const { t } = useTranslation();
  const Inbox = Digit.ComponentRegistryService.getComponent("BPAInbox");
  const StakeholderInbox = Digit.ComponentRegistryService.getComponent("StakeholderInbox");
  const ApplicationDetail = Digit.ComponentRegistryService.getComponent("ObpsEmpApplicationDetail");
  const BpaApplicationDetail = Digit.ComponentRegistryService.getComponent("ObpsEmployeeBpaApplicationDetail");
  const isLocation = window.location.href.includes("bpa") || window.location.href.includes("stakeholder-inbox/stakeholder") || window.location.href.includes("application");
  const isFromNoc = window.location.href.includes("digit-ui/employee/obps/bpa/");
  const isRes = window.location.href.includes("obps/response") || window.location.href.includes("obps/stakeholder-response");
  return (
    <ScrutinyRemarksProvider>
    <Fragment>
      {!isFromNoc && !isRes ? <div style={isLocation ? {marginLeft: "10px"} : {}}><OBPSBreadCrumbs location={location} /></div> : null}
      {isFromNoc ? <BackButton style={{ border: "none", margin: "0", padding: "0" }}>{t("CS_COMMON_BACK")}</BackButton>: null}
      <Switch>
        <PrivateRoute path={`${path}/stakeholder-inbox/stakeholder/:id`} component={ApplicationDetail} />
        <PrivateRoute path={`${path}/search/application/stakeholder/:id`} component={ApplicationDetail} />
        <PrivateRoute path={`${path}/search/application/bpa/:id`} component={BpaApplicationDetail} />
        <PrivateRoute path={`${path}/search/application`} component={(props) => <Search {...props} parentRoute={path} />} />
        <PrivateRoute path={`${path}/inbox/bpa/:id`} component={BpaApplicationDetail} />
        <PrivateRoute path={`${path}/inbox`} component={(props) => <Inbox {...props} parentRoute={path} />} />
        {/* <PrivateRoute path={`${path}/servicePlanInbox`} component={(props) => <ServicePlanInbox parentRoute={path} businessService="SERVICE_PLAN" filterComponent="TL_INBOX_FILTER" initialStates={{}} isInbox={true} /> } /> 
        <PrivateRoute path={`${path}/electricPlanInbox`} component={(props) => <ElectricalPlanInbox parentRoute={path} businessService="ELECTRICAL_PLAN" filterComponent="TL_INBOX_FILTER" initialStates={{}} isInbox={true} /> } /> 
        <PrivateRoute path={`${path}/bankGuaranteeInbox`} component={(props) => <BankGuaranteePlan parentRoute={path} businessService="BG_NEW" filterComponent="TL_INBOX_FILTER" initialStates={{}} isInbox={true} /> } />  */}
        <PrivateRoute path={`${path}/stakeholder-inbox`} component={(props) => <StakeholderInbox {...props} parentRoute={path} />} />
        <PrivateRoute path={`${path}/bpa/:id`} component={BpaApplicationDetail} />
        <PrivateRoute path={`${path}/bpa/:id`} component={BpaApplicationDetail} />
        <PrivateRoute path={`${path}/response`} component={OBPSResponse} />
        <PrivateRoute path={`${path}/stakeholder-response`} component={StakeholderResponse} />
        <PrivateRoute path={`${path}/TechnicalProfessionalscrutiny/:id`} component={TechnicalProfessionalCard} />
        <PrivateRoute path={`${path}/LowMediumscrutiny/:id`} component={LowMediumCard} />
        {/* <PrivateRoute path={`${path}/scrutiny`} component={ScrutinyFormcontainer} /> */}
        <PrivateRoute
              path={`${path}/TechnicalProfessionalInbox`}
              component={(props) => (
                <TechnicalProfessionalInbox
                  parentRoute={path}
                  businessService={["TECHNICAL_PROFESSIONAL"]}
                  filterComponent="TL_INBOX_FILTER"
                  initialStates={{}}
                  isInbox={true}
                />
              )}
            />
            <PrivateRoute
              path={`${path}/LowMediumInbox`}
              component={(props) => (
                <LowMediumInbox
                  parentRoute={path}
                  businessService={["BPA_LOW"]}
                  filterComponent="TL_INBOX_FILTER"
                  initialStates={{}}
                  isInbox={true}
                />
              )}
            />
            <PrivateRoute
              path={`${path}/HighRiskInbox`}
              component={(props) => (
                <HighRiskInbox
                  parentRoute={path}
                  businessService={["HIGH_RISK"]}
                  filterComponent="TL_INBOX_FILTER"
                  initialStates={{}}
                  isInbox={true}
                />
              )}
            />
      </Switch>
    </Fragment>
    </ScrutinyRemarksProvider>
  )
}

export default EmployeeApp;