import { Header, CitizenHomeCard, CaseIcon, HomeLink, DocumentIconSolid } from "@egovernments/digit-ui-react-components";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useRouteMatch } from "react-router-dom";
import TradeLicense from "../src/pageComponents/TradeLicense";
import TLSelectGeolocation from "../src/pageComponents/TLSelectGeolocation";
import TLSelectAddress from "./pageComponents/TLSelectAddress";
import TLSelectPincode from "./pageComponents/TLSelectPincode";
import Proof from "./pageComponents/Proof";
import SelectOwnerShipDetails from "./pageComponents/SelectOwnerShipDetails";
import SelectOwnerDetails from "./pageComponents/SelectOwnerDetails";
import SelectOwnerAddress from "./pageComponents/SelectOwnerAddress";
import SelectProofIdentity from "./pageComponents/SelectProofIdentity";
import SelectOwnershipProof from "./pageComponents/SelectOwnershipProof";
import SelectTradeName from "./pageComponents/SelectTradeName";
import SelectStructureType from "./pageComponents/SelectStructureType";
import SelectVehicleType from "./pageComponents/SelectVehicleType";
import SelectBuildingType from "./pageComponents/SelectBuildingType";
import SelectCommencementDate from "./pageComponents/SelectCommencementDate";
import SelectTradeUnits from "./pageComponents/SelectTradeUnits";
import SelectAccessories from "./pageComponents/SelectAccessories";
import SelectAccessoriesDetails from "./pageComponents/SelectAccessoriesDetails";
import TLCheckPage from "./pages/citizen/Create/CheckPage";
import TLDocument from "./pageComponents/TLDocumets";
import TLAcknowledgement from "./pages/citizen/Create/TLAcknowledgement";
import MyApplications from "./pages/citizen/Applications/Application";
import TradeLicenseList  from "./pages/citizen/Renewal/TradeLicenseList";
import TLWFApplicationTimeline from "./pageComponents/TLWFApplicationTimeline";
import SPApplications from "./pages/citizen/Applications/SPApplications";
import EPApplications from "./pages/citizen/Applications/EPApllications";
import BGApplications from "./pages/citizen/Applications/BGApplications";

import TLOwnerDetailsEmployee from "./pageComponents/TLOwnerDetailsEmployee";
import TLTradeDetailsEmployee from "./pageComponents/TLTradeDetailsEmployee";
import TLTradeUnitsEmployee from "./pageComponents/TLTradeUnitsEmployee";
import TLAccessoriesEmployee from "./pageComponents/TLAccessoriesEmployee";
import TLDocumentsEmployee from "./pageComponents/TLDocumentsEmployee";
import TLCard from "./components/TLCard";
import TLInfoLabel from "./pageComponents/TLInfoLabel";
import SearchApplication from "./components/SearchApplication"
import SearchLicense from "./components/SearchLicense"
import TL_INBOX_FILTER from "./components/inbox/InboxFilter";
import NewApplication from "./pages/employee/NewApplication";
import ReNewApplication from "./pages/employee/ReNewApplication";
import Search from "./pages/employee/Search";
import Response from "./pages/Response";

import TLApplicationDetails from "./pages/citizen/Applications/ApplicationDetails"
import CreateTradeLicence from "./pages/citizen/Create";
import EditTrade from "./pages/citizen/EditTrade";
import { TLList } from "./pages/citizen/Renewal";
import RenewTrade from "./pages/citizen/Renewal/renewTrade";
import SearchTradeComponent from "./pages/citizen/SearchTrade";

import CitizenApp from "./pages/citizen";
import EmployeeApp from "./pages/employee";

export const TLModule = ({ stateCode, userType, tenants }) => {
  const { path, url } = useRouteMatch();

  const moduleCode = "TL";
  const language = Digit.StoreData.getCurrentLanguage();
  const { isLoading, data: store } = Digit.Services.useStore({ stateCode, moduleCode, language });

  //addComponentsToRegistry();
  Digit.SessionStorage.set("TL_TENANTS", tenants);

  if (userType === "employee") {
    return <EmployeeApp path={path} url={url} userType={userType} />;
  } else return <CitizenApp />;
};

export const TLLinks = ({ matchPath, userType }) => {
  const { t } = useTranslation();
  const [params, setParams, clearParams] = Digit.Hooks.useSessionStorage("PT_CREATE_TRADE", {});

  useEffect(() => {
    clearParams();
  }, []);


  const propsForTLModule = {
    header: t("ACTION_TEST_TRADE_LICENSE"),
    links: [
      {
        link: `${matchPath}/tradelicence/new-application`,
        i18nKey: t("TL_CREATE_TRADE"),
      },
      {
        link: `${matchPath}/tradelicence/renewal-list`,
        i18nKey: t("TL_RENEWAL_HEADER"),
      },
      {
        link: `${matchPath}/tradelicence/my-application`,
        i18nKey: t("TL_MY_APPLICATIONS_HEADER"),
      },
    ],
    // Icon: <CaseIcon />
  }  

  const propsForServiceModuleCard = {
    header: t("SERVICE_PLAN_CARD"),
    links:[
      {
        link: `obps/servicePlan`,
        i18nKey: t("SP_CREATE_TRADE"),
      },
      {
        link: `${matchPath}/servicePlan/my-application`,
        i18nKey: t("TL_MY_APPLICATIONS_HEADER"),
      },
    ],
    // Icon: <DocumentIconSolid />
  };

  const propsForElectricModuleCard = {
    header: t("ELECTRIC_PLAN_CARD"),
   links: [
    {
      link: `obps/electricalPlan`,
      i18nKey: t("EP_CREATE_TRADE"),
    },
    {
      link: `${matchPath}/electricPlan/my-application`,
      i18nKey: t("TL_MY_APPLICATIONS_HEADER"),
    },
   ],
  //  Icon: <DocumentIconSolid />,
  };

  const propsForBankModuleCard = {
    header: t("BANK_GUARANTEE_PLAN"),
    links: [
      {
        link: `obps/SubmitNew`,
        i18nKey: t("BG_CREATE_TRADE"),
      },
      {
        link: `${matchPath}/bankGuarantee/my-application`,
        i18nKey: t("TL_MY_APPLICATIONS_HEADER"),
      },
     ],
    //  Icon: <DocumentIconSolid />,
  };

  const tlModuleProps = [propsForTLModule, propsForServiceModuleCard, propsForElectricModuleCard, propsForBankModuleCard]
  

  return (
    <React.Fragment>
      {
        tlModuleProps.map((propsForModuleCard, index) => <CitizenHomeCard key={index} Icon={() => <CaseIcon className="fill-path-primary-main" />} {...propsForModuleCard} />)
      }
      {/* <CitizenHomeCard header={t("ACTION_TEST_TRADE_LICENSE")} links={links} Icon={() => <CaseIcon className="fill-path-primary-main" />} />; */}
    </React.Fragment>

  )
  
  // <CitizenHomeCard header={t("ACTION_TEST_TRADE_LICENSE")} links={links} Icon={() => <CaseIcon className="fill-path-primary-main" />} />;
};

const componentsToRegister = {
  TLModule,
  TLLinks,
  TLCard,
  TradeLicense,
  SelectTradeName,
  SelectStructureType,
  SelectVehicleType,
  SelectBuildingType,
  SelectCommencementDate,
  SelectTradeUnits,
  SelectAccessories,
  SelectAccessoriesDetails,
  TLSelectGeolocation,
  TLSelectAddress,
  TLSelectPincode,
  Proof,
  SelectOwnerShipDetails,
  SelectOwnerDetails,
  SelectOwnerAddress,
  SelectProofIdentity,
  SelectOwnershipProof,
  TLCheckPage,
  TLDocument,
  TLAcknowledgement,
  TradeLicenseList,
  MyApplications,
  SPApplications,
  EPApplications,
  BGApplications,
  TLOwnerDetailsEmployee,
  TLTradeDetailsEmployee,
  TLTradeUnitsEmployee,
  TLAccessoriesEmployee,
  TLDocumentsEmployee,
  SearchApplication,
  SearchLicense,
  TL_INBOX_FILTER,
  TLInfoLabel,
  TLWFApplicationTimeline,
  TLApplicationDetails,
  TLCreateTradeLicence : CreateTradeLicence,
  TLEditTrade : EditTrade,
  TLList,
  TLRenewTrade : RenewTrade,
  TLSearchTradeComponent : SearchTradeComponent,
  TLNewApplication : NewApplication,
  TLReNewApplication : ReNewApplication,
  TLSearch : Search,
  TLResponse : Response,
};

export const initTLComponents = () => {
  Object.entries(componentsToRegister).forEach(([key, value]) => {
    Digit.ComponentRegistryService.setComponent(key, value);
  });
};
