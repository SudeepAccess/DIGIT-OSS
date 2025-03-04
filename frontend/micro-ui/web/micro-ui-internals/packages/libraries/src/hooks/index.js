import { useInitStore } from "./store";
import useWorkflowDetails from "./workflow";
import useSessionStorage from "./useSessionStorage";
import useQueryParams from "./useQueryParams";
import useDocumentSearch from "./useDocumentSearch";
import useClickOutside from "./useClickOutside";
import {
  useFetchPayment,
  usePaymentUpdate,
  useFetchCitizenBillsForBuissnessService,
  useFetchBillsForBuissnessService,
  useGetPaymentRulesForBusinessServices,
  useDemandSearch,
  useRecieptSearch,
} from "./payment";
import { useUserSearch } from "./userSearch";
import { useApplicationsForBusinessServiceSearch } from "./useApplicationForBillSearch";
import useBoundaryLocalities from "./useLocalities";
import useCommonMDMS from "./useMDMS";
import useInboxGeneral from "./useInboxGeneral/useInboxGeneral";
import useApplicationStatusGeneral from "./useStatusGeneral";
import useModuleTenants from "./useModuleTenants";
import useStore from "./useStore";
import { useTenants } from "./useTenants";
import useInbox from "./useInbox";
import { useEvents, useClearNotifications, useNotificationCount } from "./events";
import useCreateEvent from "./events/useCreateEvent";
import useUpdateEvent from "./events/useUpdateEvent";
import useNewInboxGeneral from "./useInboxGeneral/useNewInbox";

import useComplaintDetails from "./pgr/useComplaintDetails";
import { useComplaintsList, useComplaintsListByMobile } from "./pgr/useComplaintList";
import useComplaintStatus from "./pgr/useComplaintStatus";
import useComplaintTable from "./pgr/useComplaintTable";
import useComplaintTypes from "./pgr/useComplaintTypes";
import useEmployeeFilter from "./pgr/useEmployeeFilter";
import useInboxData from "./pgr/useInboxData";
import useLocalities from "./pgr/useLocalities";
import useServiceDefs from "./pgr/useServiceDefs";
import usePGRTenants from "./pgr/useTenants";
import useComplaintSubType from "./pgr/useComplaintSubType";
import useComplaintStatusCount from "./pgr/useComplaintStatusWithCount";

import useTenantsFSM from "./fsm/useTenants";
import useDesludging from "./fsm/useDesludging";
import useApplicationStatus from "./fsm/useApplicationStatus";
import useMDMS from "./fsm/useMDMS";
import useSearch from "./fsm/useSearch";
import useSearchAll from "./fsm/useSearchAll";
import useVehicleSearch from "./fsm/useVehicleSearch";
import useVehicleUpdate from "./fsm/useVehicleUpdate";
import useFSMInbox from "./fsm/useInbox";
import useApplicationUpdate from "./fsm/useApplicationUpdate";
import useWorkflowData from "./fsm/useWorkflowData";
import useRouteSubscription from "./fsm/useRouteSubscription";
import useDsoSearch from "./fsm/useDsoSearch";
import usePropertySearch from "./pt/usePropertySearch";
import usePropertySearchWithDue from "./pt/usePropertySearchWithDue";
import usePropertyPayment from "./pt/usePropertyPayment";
import useApplicationDetail from "./fsm/useApplicationDetail";
import useApplicationActions from "./fsm/useApplicationActions";
import useApplicationAudit from "./fsm/useApplicationAudit";
import useSearchForAuditData from "./fsm/useSearchForAudit";
import useVehiclesSearch from "./fsm/useVehiclesSearch";
import useConfig from "./fsm/useConfig";
import useVendorDetail from "./fsm/useVendorDetail";
import useSlum from "./fsm/useSlum";
import usePaymentHistory from "./fsm/usePaymentHistory";

import useEmployeeSearch from "./useEmployeeSearch";

import usePropertyMDMS from "./pt/usePropertyMDMS";
import usePropertyAPI from "./pt/usePropertyAPI";
import usePropertyCreateNUpdateAPI from "./pt/usePropertyCreateNUpdateAPI";
import usePropertyDocumentSearch from "./pt/usePropertyDocumentSearch";
import useTenantsPT from "./pt/useTenants";
import usePtApplicationDetail from "./pt/useApplicationDetail";
import usePtApplicationActions from "./pt/useApplicationActions";
import usePtMDMS from "./pt/useMDMS";
import usePropertyAssessment from "./pt/usePropertyAssessment";
import usePtCalculationEstimate from "./pt/usePtCalculationEstimate";
import useGenderMDMS from "./pt/useGenderMDMS";
import usePTGenderMDMS from "./pt/usePTGenderMDMS";
import useMyPropertyPayments from "./pt/useMyPropertyPayments";
import useGenericViewProperty from "./pt/useGenericViewProperty";

import useDssMdms from "./dss/useMDMS";
import useDashboardConfig from "./dss/useDashboardConfig";
import useDSSDashboard from "./dss/useDSSDashboard";
import useGetChart from "./dss/useGetChart";

import useMCollectMDMS from "./mcollect/useMCollectMDMS";
import useMCollectSearch from "./mcollect/useMCollectSearch";
import useMcollectSearchBill from "./mcollect/useMcollectSearchBill";
import usemcollectTenants from "./mcollect/useTenants";
import useMCollectCount from "./mcollect/useMCollectCount";
import useMCollectCategory from "./mcollect/useMcollectCategory";
import useMCollectCategoryTypes from './mcollect/useMcollectCategoryTypes';
import useMCollectTaxHeads from "./mcollect/useMcollectTaxHeads";
import useMcollectFormConfig from "./mcollect/useMcollectFormConfig";

import useTenantsTL from "./tl/useTenants";
import useTradeLicenseMDMS from "./tl/useTradeLicenseMDMS";
import useTLDocumentSearch from "./tl/useTLDocumentSearch";
import useTradeLicenseAPI from "./tl/useTradeLicenseAPI";
import useTradeLicenseSearch from "./tl/useTradeLicenseSearch";
import { useTLSearchApplication, useTLApplicationDetails } from "./tl/useTLsearchApplication";
import useTLPaymentHistory from "./tl/userPaymentHistory";
import useTLApplicationDetail from "./tl/useApplicationDetail";
import useTLApplicationActions from "./tl/useApplicationActions";
import useTLFetchBill from "./tl/useFetchBill";

import useTLGenderMDMS from "./tl/useTLGenderMDMS";
import useTLInbox from "./tl/useInbox";
import useTradeLicenseBillingslab from "./tl/useTradeLicenseBillingslab";
import useTLMDMS from "./tl/useMDMS";
import useTLSearch from "./tl/useSearch";

import useHRMSSearch from "./hrms/useHRMSsearch";
import useHrmsMDMS from "./hrms/useHRMSMDMS";
import useHRMSCreate from "./hrms/useHRMScreate";
import useHRMSUpdate from "./hrms/useHRMSUpdate";
import useHRMSCount from "./hrms/useHRMSCount";
import useHRMSGenderMDMS from "./hrms/useHRMSGender";

import useReceiptsSearch from "./receipts/useReceiptsSearch";
import useReceiptsMDMS from "./receipts/useReceiptsMDMS";
import useReceiptsUpdate from "./receipts/useReceiptsUpdate";

import SearchMdmsTypes from "./obps/SearchMdmsTypes";
import useOBPSMDMS from "./obps/useMDMS";
import useOBPSSearch from "./obps/useOBPSSearch";
import useScrutinyDetails from "./obps/useScrutinyDetails";
import useTenantsOBPS from "./obps/useTenants";
import useNocDetails from "./obps/useNocDetails";
import useNOCApplicationActions from "./noc/useNOCApplicationActions";
import useOBPSDocumentSearch from "./obps/useOBPSDocumentSearch";
import useObpsAPI from "./obps/useObpsAPI";
import useBPADetails from "./obps/useBPADetails";
import useBPASearch from "./obps/useBPASearch";
import { useBPAREGgetbill } from "./obps/useBPAREGgetbill";
import useStakeholderAPI from "./obps/useStakeholderAPI";
import useOCEdcrSearch from "./obps/useOCEdcrSearch";
import useLicenseDetails from "./obps/useLicenseDetails";
import useBPAREGApplicationActions from "./obps/useBPAREGApplicationActions";
import useBPADetailsPage from "./obps/useBPADetailsPage";
import useBPAInbox from "./obps/useBPAInbox";
import useEDCRInbox from "./obps/useEDCRInbox";
import useBPAApplicationActions from "./obps/useApplicationActions"
import useArchitectInbox from "./obps/useArchitectInbox";
import useBPAREGSearch from "./obps/useBPAREGSearch";
import useEmpBPAREGSearch from "./obps/useEmpBPAREGSearch";
import useServiceTypeFromApplicationType from "./obps/useServiceTypeFromApplicationType"
import useBusinessServiceBasedOnServiceType from "./obps/useBusinessServiceBasedOnServiceType"
import useBusinessServiceData from "./obps/useBusinessServiceData";
import useBPATaxDocuments from "./obps/useBPATaxDocuments";
import useSPInbox from "./obps/useSPInbox";
import useEPInbox from "./obps/useEPInbox";
import useBGInbox from "./obps/useBGInbox";
import useTOLInbox from "./obps/useTOLInbox";
import useSLInbox from "./obps/useSLInbox";
import useTPInbox from "./obps/useTPInbox";
import useLPInbox from "./obps/useLPInbox";
import useCBIInbox from "./obps/useCBIInbox";
import useAOSInbox from "./obps/useAOSInbox";
import useROLInbox from "./obps/useROLInbox";
import useCCInbox from "./obps/useCCInbox";
import useECOCSInbox from "./obps/useECOCSInbox";
import useEOCPInbox from "./obps/useEOCPInbox"
import useCCLUInbox from "./obps/useCCLUInbox"



import useEventInbox from "./events/useEventInbox";
import useEventDetails from "./events/useEventDetails";
import { useEngagementMDMS } from "./engagement/useMdms";
import useDocSearch from "./engagement/useSearch";
import useDocCreate from "./engagement/useCreate";
import useDocUpdate from "./engagement/useUpdate";
import useDocDelete from "./engagement/useDelete";

import useSurveyCreate from "./surveys/useCreate";
import useSurveyDelete from "./surveys/useDelete";
import useSurveyUpdate from "./surveys/useUpdate";
import useSurveySearch from "./surveys/useSearch";
import useSurveyShowResults from "./surveys/useShowResults";
import useSurveySubmitResponse from "./surveys/useSubmitResponse";
import useSurveyInbox from "./surveys/useSurveyInbox";

import useNOCDetails from "./noc/useNOCDetails";
import useNOCInbox from "./noc/useInbox";
import useNOCSearchApplication from "./noc/useSearchApplications";

import WSSearchMdmsTypes from "./ws/WSSearchMdmsTypes";
import usewsTenants from "./ws/useTenants";
import useWaterSearch from "./ws/useWaterSearch";
import useSewarageSearch from "./ws/useSewarageSearch";
import useBPALowInbox from "./obps/useBPALowInbox";

const pgr = {
  useComplaintDetails,
  useComplaintsList,
  useComplaintsListByMobile,
  useComplaintStatus,
  useComplaintTable,
  useComplaintTypes,
  useEmployeeFilter,
  useInboxData,
  useLocalities,
  useServiceDefs,
  useTenants: usePGRTenants,
  useComplaintSubType,
  usePropertyMDMS,
  useComplaintStatusCount,
  useTradeLicenseBillingslab,
};

const fsm = {
  useTenants: useTenantsFSM,
  useDesludging: useDesludging,
  useMDMS: useMDMS,
  useSearch,
  useRouteSubscription,
  useSearchAll,
  useInbox: useFSMInbox,
  useApplicationUpdate,
  useApplicationStatus,
  useWorkflowData,
  useDsoSearch,
  useApplicationDetail,
  useApplicationActions,
  useApplicationAudit,
  useSearchForAuditData,
  useVehicleSearch,
  useVehicleUpdate,
  useVendorDetail,
  useVehiclesSearch,
  useConfig,
  useSlum,
  usePaymentHistory,
};

const pt = {
  usePropertySearch,
  usePropertyPayment,
  usePropertyMDMS,
  usePropertySearchWithDue,
  usePropertyAPI,
  usePropertyCreateNUpdateAPI,
  usePropertyDocumentSearch,
  useTenants: useTenantsPT,
  useApplicationDetail: usePtApplicationDetail,
  useApplicationActions: usePtApplicationActions,
  useMDMS: usePtMDMS,
  usePropertyAssessment,
  usePtCalculationEstimate,
  useGenderMDMS,
  usePTGenderMDMS,
  useMyPropertyPayments,
  useGenericViewProperty
};

const dss = {
  useMDMS: useDssMdms,
  useDashboardConfig,
  useDSSDashboard,
  useGetChart,
};

const mcollect = {
  useCommonMDMS,
  useMCollectMDMS,
  useMCollectSearch,
  useMcollectSearchBill,
  usemcollectTenants,
  useMCollectCount,
  useMCollectCategory,
  useMCollectCategoryTypes,
  useMCollectTaxHeads,
  useMcollectFormConfig,
};

const hrms = {
  useHRMSSearch,
  useHrmsMDMS,
  useHRMSCreate,
  useHRMSUpdate,
  useHRMSCount,
  useHRMSGenderMDMS,
};
const tl = {
  useTenants: useTenantsTL,
  useTradeLicenseMDMS,
  useTLDocumentSearch,
  useTradeLicenseAPI,
  useTLSearchApplication,
  useTLPaymentHistory,
  useTradeLicenseSearch,
  useTLGenderMDMS,
  useTradeLicenseBillingslab,
  useInbox: useTLInbox,
  useMDMS: useTLMDMS,
  useSearch: useTLSearch,
  useApplicationDetail: useTLApplicationDetail,
  useApplicationActions: useTLApplicationActions,
  useFetchBill: useTLFetchBill,
  useTLApplicationDetails,
};

const receipts = {
  useReceiptsMDMS,
  useReceiptsSearch,
  useReceiptsUpdate,
};

const obps = {
  useMDMS: useOBPSMDMS,
  useScrutinyDetails,
  useTenants: useTenantsOBPS,
  useNocDetails: useNocDetails,
  useOBPSDocumentSearch,
  useObpsAPI,
  useTPInbox,
  useBPADetails,
  useBPASearch,
  useBPAREGgetbill,
  useStakeholderAPI,
  useBPAREGSearch,
  useOCEdcrSearch,
  useLicenseDetails,
  useBPAREGApplicationActions,
  useBPADetailsPage,
  useEmpBPAREGSearch,
  useBPAInbox,
  useEDCRInbox,
  useArchitectInbox,
  SearchMdmsTypes,
  useServiceTypeFromApplicationType,
  useApplicationActions: useBPAApplicationActions,
  useOBPSSearch,
  useBusinessServiceBasedOnServiceType,
  useBusinessServiceData,
  useBPATaxDocuments,
  useSPInbox,
  useEPInbox,
  useBGInbox,
  useTOLInbox,
  useCCLUInbox,
  useSLInbox,
  useLPInbox,
  useCBIInbox,
  useAOSInbox,
  useROLInbox,
  useCCInbox,
  useECOCSInbox,
  useEOCPInbox,
  useBPALowInbox
};

const events = {
  useInbox: useEventInbox,
  useCreateEvent,
  useEventDetails,
  useUpdateEvent
};

const engagement = {
  useMDMS: useEngagementMDMS,
  useDocCreate,
  useDocSearch,
  useDocDelete,
  useDocUpdate,
};

const survey = {
  useCreate: useSurveyCreate,
  useUpdate: useSurveyUpdate,
  useDelete: useSurveyDelete,
  useSearch: useSurveySearch,
  useSubmitResponse: useSurveySubmitResponse,
  useShowResults: useSurveyShowResults,
  useSurveyInbox,
}

const noc = {
  useNOCDetails,
  useNOCApplicationActions,
  useInbox: useNOCInbox,
  useNOCSearchApplication
}

const ws = {
  WSSearchMdmsTypes,
  usewsTenants,
  useWaterSearch,
  useSewarageSearch
}

const Hooks = {
  useSessionStorage,
  useQueryParams,
  useFetchPayment,
  usePaymentUpdate,
  useFetchCitizenBillsForBuissnessService,
  useFetchBillsForBuissnessService,
  useGetPaymentRulesForBusinessServices,
  useWorkflowDetails,
  useInitStore,
  useClickOutside,
  useUserSearch, 
  useApplicationsForBusinessServiceSearch,
  useDemandSearch,
  useInboxGeneral,
  useEmployeeSearch,
  useBoundaryLocalities,
  useCommonMDMS,
  useApplicationStatusGeneral,
  useModuleTenants, 
  useRecieptSearch,
  useNewInboxGeneral,
  useEvents,
  useClearNotifications,
  useNotificationCount,
  useStore,
  useDocumentSearch,
  useTenants,
  useInbox: useTLInbox,
  pgr,
  fsm,
  pt,
  dss,
  mcollect,
  hrms,
  tl,
  receipts,
  obps,
  events,
  engagement,
  survey,
  noc,
  ws
};

export default Hooks;
