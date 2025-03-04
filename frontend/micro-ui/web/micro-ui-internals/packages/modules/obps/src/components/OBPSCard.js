// import { EmployeeModuleCard, DocumentIconSolid , LicencingIcon} from "@egovernments/digit-ui-react-components";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  EmployeeModuleCard, 
  DocumentIconSolid ,
  Calender,
  CardBasedOptions,
  ServiceCardOptions,
  CaseIcon,
  ComplaintIcon,
  DocumentIcon,
  HomeIcon,
  BPAHomeIcon,
  BPAIco,
  Loader,
  OBPSIcon,
  PTIcon,
  StandaloneSearchBar,
  WhatsNewCard,
  BannerAllCard,
  LicencingIcon,
  ServicePlanIcon,
  ElectricPlanIcon,
  BankGuaranteeIcon,
  RenewLic,
  LabTabs,
  TransferLic,
  SurrenderLic,
  StandardDesign,
} from "@egovernments/digit-ui-react-components";


const OBPSCard = () => {
    sessionStorage.setItem("breadCrumbUrl", "home");
    const userRoles = Digit.SessionStorage.get('User')?.info?.roles
    const { t } = useTranslation();
    const tenantId = Digit.ULBService.getCurrentTenantId();
    const BgRole = ["SO_HQ", "AO_HQ", "CAO_HQ", "DTCP_HR", "DTP_HQ", "AD_HQ", "JD_HQ", "Patwari_HQ", "ATP_HQ", "NAYAB_TEHSILDAR"]
    const SP_Role = ["CTP_HR", "AO_HQ", "AD_HQ", "JD_HQ", "SD_HQ", "DTCP_HR", "DTP_HQ", "JE_HQ", "STP_HQ", "ASST_JE_HQ", "CE_HQ", "HSVP", "GMDA", "FMDA", "PMDA"]
    const EP_Role = ["CTP_HR","AO_HQ", "JD_HQ", "SD_HQ","DTCP_HR", "DTP_HQ", "JE_HQ", "STP_HQ", "ASST_JE_HQ", "EE_HQ", "PUD"]
    const TOL_Role = ["CTP_HR","AO_HQ", "JD_HQ", "SD_HQ","DTCP_HR", "DTP_HQ", "JE_HQ", "STP_HQ", "ASST_JE_HQ", "EE_HQ", "PUD"]
    const SL_Role = ["CTP_HR","AO_HQ", "JD_HQ", "SD_HQ","DTCP_HR", "DTP_HQ", "JE_HQ", "STP_HQ", "ASST_JE_HQ", "EE_HQ", "PUD"]
    const ARLP_Role = ["CTP_HR","AO_HQ", "JD_HQ", "SD_HQ","DTCP_HR", "DTP_HQ", "JE_HQ", "STP_HQ", "ASST_JE_HQ", "EE_HQ", "PUD"]
    const CBI_Role = ["CTP_HR","AO_HQ", "JD_HQ", "SD_HQ","DTCP_HR", "DTP_HQ", "JE_HQ", "STP_HQ", "ASST_JE_HQ", "EE_HQ", "PUD"]
    const ROL_Role = ["CTP_HR","AO_HQ", "JD_HQ", "SD_HQ","DTCP_HR", "DTP_HQ", "JE_HQ", "STP_HQ", "ASST_JE_HQ", "EE_HQ", "PUD"]
    const AOSD_Role = ["CTP_HR","AO_HQ", "JD_HQ", "SD_HQ","DTCP_HR", "DTP_HQ", "JE_HQ", "STP_HQ", "ASST_JE_HQ", "EE_HQ", "PUD"]
    const CC_Role = ["CTP_HR","AO_HQ", "JD_HQ", "SD_HQ","DTCP_HR", "DTP_HQ", "JE_HQ", "STP_HQ", "ASST_JE_HQ", "EE_HQ", "PUD"]
    const CICS_Role = ["CTP_HR","AO_HQ", "JD_HQ", "SD_HQ","DTCP_HR", "DTP_HQ", "JE_HQ", "STP_HQ", "ASST_JE_HQ", "EE_HQ", "PUD"]
    const EOCP_Role = ["CTP_HR","AO_HQ", "JD_HQ", "SD_HQ","DTCP_HR", "DTP_HQ", "JE_HQ", "STP_HQ", "ASST_JE_HQ", "EE_HQ", "PUD"]
    
    
    function isBankGuarrantee(){
        let isGuarantee = false
        for(let i=0; i<userRoles.length; i++){
          if(BgRole.includes(userRoles[i].code)){
            isGuarantee = true
          }
        }
        return isGuarantee
      }

      function isServiceEmp(){
        let isSP = false
        for(let i=0; i<userRoles.length; i++){
          if(SP_Role.includes(userRoles[i].code)){
            isSP = true
          }
        }
        return isSP
      }

      function isElectricEmp(){
        let isEP = false
        for(let i=0; i<userRoles.length; i++){
          if(EP_Role.includes(userRoles[i].code)){
            isEP = true
          }
        }
        return isEP
      }
      function isTRANSFEREmp(){
        let isTOL = false
        for(let i=0; i<userRoles.length; i++){
          if(TOL_Role.includes(userRoles[i].code)){
            isTOL = true
          }
        }
        return isTOL
      }
      function isSURRENDEmp(){
        let isSL = false
        for(let i=0; i<userRoles.length; i++){
          if(SL_Role.includes(userRoles[i].code)){
            isSL = true
          }
        }
        return isSL
      }
      function isREVISEDEmp(){
        let isARLP = false
        for(let i=0; i<userRoles.length; i++){
          if(ARLP_Role.includes(userRoles[i].code)){
            isARLP = true
          }
        }
        return isARLP
      }
      function isRENEWALEmp(){
        let isROL = false
        for(let i=0; i<userRoles.length; i++){
          if(ROL_Role.includes(userRoles[i].code)){
            isROL = true
          }
        }
        return isROL
      }
      function isCHANGEEmp(){
        let isCBI = false
        for(let i=0; i<userRoles.length; i++){
          if(CBI_Role.includes(userRoles[i].code)){
            isCBI = true
          }
        }
        return isCBI
      }
      function isSTANDARDEmp(){
        let isAOSD = false
        for(let i=0; i<userRoles.length; i++){
          if(AOSD_Role.includes(userRoles[i].code)){
            isAOSD = true
          }
        }
        return isAOSD
      }
      function isCopletionEmp(){
        let isCC = false
        for(let i=0; i<userRoles.length; i++){
          if(CC_Role.includes(userRoles[i].code)){
            isCC = true
          }
        }
        return isCC
      }
      function isCommiunitySiteEmp(){
        let isCICS= false
        for(let i=0; i<userRoles.length; i++){
          if(CICS_Role.includes(userRoles[i].code)){
            isCICS = true
          }
        }
        return isCICS
      }
      function isEXTENTIONSiteEmp(){
        let isEOCP= false
        for(let i=0; i<userRoles.length; i++){
          if(EOCP_Role.includes(userRoles[i].code)){
            isEOCP = true
          }
        }
        return isEOCP
      }
        
    const [isStateLocalisation, setIsStateLocalisation] = useState(true);

    useEffect(() => {
        if (tenantId && isStateLocalisation) {
            setIsStateLocalisation(false);
            Digit.LocalizationService.getLocale({ modules: [`rainmaker-${tenantId}`], locale: Digit.StoreData.getCurrentLanguage(), tenantId: `${tenantId}` });
        }
    }, [tenantId]);

    const propsForServiceModuleCard = {
        Icon: <ServicePlanIcon className="fill-path-primary-main"/>,
        moduleName: t("SERVICE_PLAN_CARD"),
        kpis: [
          {
            count: "-",
            label: t("SERVICE_PLAN_CARD"),
            link: `/digit-ui/employee/tl/servicePlanInbox`,
          },
        ],
        links: [
          {
            count: "-",
            label: t("ES_TITLE_INBOX"),
            link: `/digit-ui/employee/tl/servicePlanInbox`,
          }
        ],
      };

      const propsForElectricModuleCard = {
        Icon: <ElectricPlanIcon className="fill-path-primary-main" />,
        moduleName: t("ELECTRIC_PLAN_CARD"),
        kpis: [
          {
            count: "-",
            label: t("ELECTRIC_PLAN_CARD"),
            link: `/digit-ui/employee/tl/electricPlanInbox`,
          },
        ],
        links: [
          {
            count: "-",
            label: t("ES_TITLE_INBOX"),
            link: `/digit-ui/employee/tl/electricPlanInbox`,
          }
        ],
      };

      const propsForBankModuleCard = {
        Icon: <BankGuaranteeIcon className="fill-path-primary-main"/>,
        moduleName: t("BANK_GUARANTEE_PLAN"),
        kpis: [
          {
            count: "-",
            label: t("BANK_GUARANTEE_PLAN"),
            link: `/digit-ui/employee/tl/bankGuaranteeInbox`,
          },
        ],
        links: [
          {
            count: "-",
            label: t("ES_TITLE_INBOX"),
            link: `/digit-ui/employee/tl/bankGuaranteeInbox`,
          },
        ],
      };
      const propsForTranserModuleCard = {
        Icon: <TransferLic className="fill-path-primary-main" />,
        moduleName: t("TRANSFER_LICIENCE_CARD"),
        kpis: [
          {
            count: "-",
            label: t("TRANSFER_LICIENCE_CARD"),
            link: `/digit-ui/employee/tl/TranferInbox`,
          },
        ],
        links: [
          {
            count: "-",
            label: t("ES_TITLE_INBOX"),
            link: `/digit-ui/employee/tl/TranferInbox`,
          }
        ],
      };
      const propsForSURRENDModuleCard = {
        Icon: <SurrenderLic className="fill-path-primary-main" />,
        moduleName: t("SURREND_OF_LICENSE_CARD"),
        kpis: [
          {
            count: "-",
            label: t("SURREND_OF_LICENSE_CARD"),
            link: `/digit-ui/employee/tl/SurrenderInbox`,
          },
        ],
        links: [
          {
            count: "-",
            label: t("ES_TITLE_INBOX"),
            link: `/digit-ui/employee/tl/SurrenderInbox`,
          }
        ],
      };
      const propsForREVISEDModuleCard = {
        Icon: <DocumentIconSolid />,
        moduleName: t("REVISED_LAYOUT_PLAN_CARD"),
        kpis: [
          {
            count: "-",
            label: t("REVISED_LAYOUT_PLAN_CARD"),
            link: `/digit-ui/employee/tl/LayoutPlanInbox`,
          },
        ],
        links: [
          {
            count: "-",
            label: t("ES_TITLE_INBOX"),
            link: `/digit-ui/employee/tl/LayoutPlanInbox`,
          }
        ],
      };
      const propsForCHANGEModuleCard = {
        Icon: <DocumentIconSolid />,
        moduleName: t("CHANGE_OF_BENEFICIAL_CARD"),
        kpis: [
          {
            count: "-",
            label: t("CHANGE_OF_BENEFICIAL_CARD"),
            link: `/digit-ui/employee/tl/BeneficialInbox`,
          },
        ],
        links: [
          {
            count: "-",
            label: t("ES_TITLE_INBOX"),
            link: `/digit-ui/employee/tl/BeneficialInbox`,
          }
        ],
      };
      const propsForRENEWALModuleCard = {
        Icon: <DocumentIconSolid />,
        moduleName: t("RENWAL_OF_LICIENCE_CARD"),
        kpis: [
          {
            count: "-",
            label: t("RENWAL_OF_LICIENCE_CARD"),
            link: `/digit-ui/employee/tl/RenewalInbox`,
          },
        ],
        links: [
          {
            count: "-",
            label: t("ES_TITLE_INBOX"),
            link: `/digit-ui/employee/tl/RenewalInbox`,
          }
        ],
      };
      
      const propsForSTANDARDModuleCard = {
        Icon: <StandardDesign className="fill-path-primary-main"/>,
        moduleName: t("APPROVAL_OF_STANDARD_CARD"),
        kpis: [
          {
            count: "-",
            label: t("APPROVAL_OF_STANDARD_CARD"),
            link: `/digit-ui/employee/tl/StandardInbox`,
          },
        ],
        links: [
          {
            count: "-",
            label: t("ES_TITLE_INBOX"),
            link: `/digit-ui/employee/tl/StandardInbox`,
          }
        ],
      };
      const propsForCommiunitySiteoduleCard = {
        Icon: <DocumentIconSolid />,
        moduleName: t("CONSTRUCTION_OF_COMMUNITY_CARD"),
        kpis: [
          {
            count: "-",
            label: t("CONSTRUCTION_OF_COMMUNITY_CARD"),
            link: `/digit-ui/employee/tl/CommunityInbox`,
          },
        ],
        links: [
          {
            count: "-",
            label: t("ES_TITLE_INBOX"),
            link: `/digit-ui/employee/tl/CommunityInbox`,
          }
        ],
      };
      const propsForTechnicalProfessionalModuleCard = {
        Icon: <DocumentIconSolid />,
        moduleName: t("TECHNICAL_PROFESSIONAL"),
        kpis: [
          {
            count: "-",
            label: t("CONSTRUCTION_OF_COMMUNITY_CARD"),
            link: `/digit-ui/employee/obps/TechnicalProfessionalInbox`,
          },
        ],
        links: [
          {
            count: "-",
            label: t("ES_TITLE_INBOX"),
            link: `/digit-ui/employee/obps/TechnicalProfessionalInbox`,
          }
        ],
      };
      const propsForLowMediumModuleCard = {
        Icon: <DocumentIconSolid />,
        moduleName: t("LOW_MEDIUM_RISK_BUILDINGS"),
        kpis: [
          {
            count: "-",
            label: t("CONSTRUCTION_OF_COMMUNITY_CARD"),
            link: `/digit-ui/employee/obps/LowMediumInbox`,
          },
        ],
        links: [
          {
            count: "-",
            label: t("ES_TITLE_INBOX"),
            link: `/digit-ui/employee/obps/LowMediumInbox`,
          }
        ],
      };
      const propsForHighRiskModuleCard = {
        Icon: <DocumentIconSolid />,
        moduleName: t("HIGH_RISK_BUILDINGS"),
        kpis: [
          {
            count: "-",
            label: t("CONSTRUCTION_OF_COMMUNITY_CARD"),
            link: `/digit-ui/employee/obps/HighRiskInbox`,
          },
        ],
        links: [
          {
            count: "-",
            label: t("ES_TITLE_INBOX"),
            link: `/digit-ui/employee/obps/HighRiskInbox`,
          }
        ],
      };
      const propsForCopletionModuleCard = {
        Icon: <DocumentIconSolid />,
        moduleName: t("COMPLETION_CERTIFICATE_CARD"),
        kpis: [
          {
            count: "-",
            label: t("COMPLETION_CERTIFICATE_CARD"),
            link: `/digit-ui/employee/tl/CompletionInbox`,
          },
        ],
        links: [
          {
            count: "-",
            label: t("ES_TITLE_INBOX"),
            link: `/digit-ui/employee/tl/CompletionInbox`,
          }
        ],
      };
      const propsForExtentionModuleCard = {
        Icon: <DocumentIconSolid />,
        moduleName: t("EXTENTION_OF_CLU_PERMISSION_CARD"),
        kpis: [
          {
            count: "-",
            label: t("EXTENTION_OF_CLU_PERMISSION_CARD"),
            link: `/digit-ui/employee/tl/ExtensionInbox`,
          },
        ],
        links: [
          {
            count: "-",
            label: t("ES_TITLE_INBOX"),
            link: `/digit-ui/employee/tl/ExtensionInbox`,
          }
        ],
      };
      

      const obpsSubModuleProps = []

        // if(isBankGuarrantee()){
        //     obpsSubModuleProps.push(propsForBankModuleCard)
        // }
    
      //   if((Digit.Utils.tlAccess() || isServiceEmp())){
      //       obpsSubModuleProps.push(propsForServiceModuleCard)
      //   }
      //   if((Digit.Utils.tlAccess() || isElectricEmp())){
      //     obpsSubModuleProps.push(propsForElectricModuleCard)
      // }
      obpsSubModuleProps.push(propsForServiceModuleCard)
      obpsSubModuleProps.push(propsForElectricModuleCard)
      obpsSubModuleProps.push(propsForBankModuleCard)
      obpsSubModuleProps.push(propsForTranserModuleCard)
      obpsSubModuleProps.push(propsForSURRENDModuleCard)
      obpsSubModuleProps.push(propsForREVISEDModuleCard)
      obpsSubModuleProps.push(propsForCHANGEModuleCard)
      obpsSubModuleProps.push(propsForSTANDARDModuleCard)
      obpsSubModuleProps.push(propsForRENEWALModuleCard)
      obpsSubModuleProps.push(propsForCommiunitySiteoduleCard)
      obpsSubModuleProps.push(propsForCopletionModuleCard)
      obpsSubModuleProps.push(propsForExtentionModuleCard)
      obpsSubModuleProps.push(propsForTechnicalProfessionalModuleCard)
      obpsSubModuleProps.push(propsForLowMediumModuleCard);
      obpsSubModuleProps.push(propsForHighRiskModuleCard)
        return (
        <React.Fragment>
        {
        obpsSubModuleProps.map((propsForModuleCard, index) => <EmployeeModuleCard key={index} {...propsForModuleCard} />)
        }
        </React.Fragment>
    )
};

export default OBPSCard;

