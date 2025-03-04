import { AppContainer, BackButton, PrivateRoute } from "@egovernments/digit-ui-react-components";
import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
// import TradeLicense from "../../pageComponents/TradeLicense";
import MyApplicationsTest from "../../pages/citizen/Applications/Application";
import BGApplications from "./Applications/BGApplications";
import EPApplications from "./Applications/EPApllications";
import SPApplications from "./Applications/SPApplications";
import ASDApplications from "./Applications/ASDApplication";
import SLApplications from "./Applications/SLApplication";
import RLApplication from "./Applications/RLApplication";
import UAApplication from "./Applications/UAApplication";
import TransferLicenceApplications from "./Applications/TLApplication";
import ETCApplication from "./Applications/ETCApplication";
import ECLUApplications from "./Applications/ECLUApplication";
import CompletionApplications from "./Applications/CompletionApplications";
import CBIApplications from "./Applications/CBIApplication";
// import ApplicationDetails from "../../pages/citizen/Applications/ApplicationDetails";
// import CreateTradeLicence from "./Create";
// import EditTrade from "./EditTrade";
// import { TLList } from "./Renewal";
// import RenewTrade from "./Renewal/renewTrade";
// import SearchTradeComponent from "./SearchTrade";

const App = () => {
  const { path, url, ...match } = useRouteMatch();
  let isSuccessScreen = window.location.href.includes("acknowledgement");
  let isCommonPTPropertyScreen = window.location.href.includes("/tl/tradelicence/new-application/property-details");

  const ApplicationDetails = Digit.ComponentRegistryService.getComponent("TLApplicationDetails");
  const CreateTradeLicence = Digit?.ComponentRegistryService?.getComponent("TLCreateTradeLicence");
  const EditTrade = Digit?.ComponentRegistryService?.getComponent("TLEditTrade");
  const RenewTrade = Digit?.ComponentRegistryService?.getComponent("TLRenewTrade");
  const TradeLicense = Digit?.ComponentRegistryService?.getComponent("TradeLicense");
  const TLList = Digit?.ComponentRegistryService?.getComponent("TLList");
  const SearchTradeComponent = Digit?.ComponentRegistryService?.getComponent("TLSearchTradeComponent");
  const MyApplications = Digit?.ComponentRegistryService?.getComponent("MyApplications");

  const getBackPageNumber = () => {
    let goBacktoFromProperty = -1;
    if (
      sessionStorage.getItem("VisitedCommonPTSearch") === "true" &&
      (sessionStorage.getItem("VisitedAccessoriesDetails") === "true" || sessionStorage.getItem("VisitedisAccessories") === "true") &&
      isCommonPTPropertyScreen
    ) {
      goBacktoFromProperty = -4;
      sessionStorage.removeItem("VisitedCommonPTSearch");
      return goBacktoFromProperty;
    }
    return goBacktoFromProperty;
  };

  return (
    <span className={"tl-citizen"}>
      <Switch>
        <AppContainer>
          <BackButton
            /* style={{ position: "fixed", top: "55px" }} */ isCommonPTPropertyScreen={isCommonPTPropertyScreen}
            isSuccessScreen={isSuccessScreen}
            getBackPageNumber={getBackPageNumber}
          >
            Back
          </BackButton>
          <PrivateRoute path={`${path}/tradelicence/new-application`} component={CreateTradeLicence} />
          <PrivateRoute path={`${path}/tradelicence/edit-application/:id/:tenantId`} component={EditTrade} />
          <PrivateRoute path={`${path}/tradelicence/renew-trade/:id/:tenantId`} component={RenewTrade} />
          <PrivateRoute path={`${path}/tradelicence/my-application`} component={MyApplicationsTest} />
          <PrivateRoute path={`${path}/tradelicence/my-bills`} component={() => <MyApplications view="bills" />} />
          <PrivateRoute path={`${path}/tradelicence/tl-info`} component={TradeLicense} />
          <PrivateRoute path={`${path}/tradelicence/application/:id/:tenantId`} component={ApplicationDetails} />
          <PrivateRoute path={`${path}/tradelicence/renewal-list`} component={TLList} />
          <PrivateRoute path={`${path}/tradelicence/trade-search`} component={SearchTradeComponent} />
          <PrivateRoute path={`${path}/servicePlan/my-application`} component={SPApplications} />
          <PrivateRoute path={`${path}/electricPlan/my-application`} component={EPApplications} />
          <PrivateRoute path={`${path}/bankGuarantee/my-application`} component={BGApplications} />
          <PrivateRoute path={`${path}/Standard/my-application`} component={ASDApplications} />
          <PrivateRoute path={`${path}/SurrenderLic/my-application`} component={SLApplications} />
          <PrivateRoute path={`${path}/LayoutPlanClu/my-application`} component={RLApplication} />
          <PrivateRoute path={`${path}/CompositionClu/my-application`} component={UAApplication} />
          <PrivateRoute path={`${path}/TransferLicense/my-applications`} component={TransferLicenceApplications} />
          <PrivateRoute path={`${path}/ExtensionClu/my-application`} component={ECLUApplications} />
           <PrivateRoute path={`${path}/ExtensionCom/my-application`} component={ETCApplication} />
          <PrivateRoute path={`${path}/CompletionLic/my-application`} component={CompletionApplications} />
          <PrivateRoute path={`${path}/Beneficial/my-application`} component={CBIApplications} />
        </AppContainer>
      </Switch>
    </span>
  );
};

export default App;
