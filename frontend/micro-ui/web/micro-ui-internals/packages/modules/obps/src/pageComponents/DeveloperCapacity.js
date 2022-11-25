import { BackButton, CardLabel, CheckBox, FormStep, TextArea, TextInput, Dropdown, Toast, RemoveIcon, UploadFile } from "@egovernments/digit-ui-react-components";
import React, { useState, useEffect } from "react";
import Timeline from "../components/Timeline";
import { useForm } from "react-hook-form";
import { Button, Form, FormLabel } from "react-bootstrap";
// import { Card, Row, Col } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Modal, ModalHeader, ModalFooter, ModalBody } from 'react-bootstrap';
import axios from "axios";
import { useLocation } from "react-router-dom";
import VisibilityIcon from '@mui/icons-material/Visibility';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import DeleteIcon from '@mui/icons-material/Delete';
const DeveloperCapacity = ({ t, config, onSelect, value, userType, formData }) => {
    const { pathname: url } = useLocation();
    let validation = {};
    const userInfo = Digit.UserService.getUser();
    console.log("USERNAME",userInfo?.info?.name);
    const devRegId = localStorage.getItem('devRegId');
    let isOpenLinkFlow = window.location.href.includes("openlink");
    const tenantId = Digit.ULBService.getCurrentTenantId();
    const stateId = Digit.ULBService.getStateId();
    React.useEffect(async () => {
        const uuid = userInfo?.info?.uuid;
        const usersResponse = await Digit.UserService.userSearch(tenantId, { uuid: [uuid] }, {});
        setParentId(usersResponse?.user[0]?.parentId);
        setGenderMF(usersResponse?.user[0]?.gender);
        console.log("USERID", usersResponse?.user[0]?.gender)
    }, [userInfo?.info?.uuid])

    const { data: optionsArrList } = Digit.Hooks.obps.useMDMS(stateId, "common-masters", ["Purpose"]);

    let arrayDevList = [];
    optionsArrList &&
        optionsArrList["common-masters"].Purpose.map((purposeTypeDetails) => {
            arrayDevList.push({ code: `${purposeTypeDetails.name}`, value: `${purposeTypeDetails.purposeCode}` });
        });

    const {setValue, getValues, watch} = useForm();

    const DevelopersAllData = getValues();
    console.log("DEVEDATAGEGT",DevelopersAllData);
    // const [Documents,getValues] = useState([]);

    const onSkip = () => onSelect();
    const getDeveloperData = async () => {
        try {
            const requestResp = {

                "RequestInfo": {
                    "api_id": "1",
                    "ver": "1",
                    "ts": "",
                    "action": "_getDeveloperById",
                    "did": "",
                    "key": "",
                    "msg_id": "",
                    "requester_id": "",
                    "auth_token": ""
                },
            }
            const getDevDetails = await axios.get(`/user/developer/_getDeveloperById?id=${userInfo?.info?.id}&isAllData=true`, requestResp, {

            });
            const developerDataGet = getDevDetails?.data;
            // console.log(developerDataGet);
            console.log("TECHEXP",developerDataGet?.devDetail[0]?.capacityDevelopAColony?.capacityDevelopColonyHdruAct?.sectorAndDevelopmentPlan);
            setValueHrdu(developerDataGet?.devDetail[0]?.capacityDevelopAColony?.permissionGrantedHRDU);
            setValueTechExpert(developerDataGet?.devDetail[0]?.capacityDevelopAColony?.technicalExpert);
            setValueDesignatedDirectors(developerDataGet?.devDetail[0]?.capacityDevelopAColony?.designatedDirectors);
            setValueAlreadyObtainedLic(developerDataGet?.devDetail[0]?.capacityDevelopAColony?.alreadtObtainedLic);
            setModalCapacityDevelopColonyHdruAct(developerDataGet?.devDetail[0]?.capacityDevelopAColony?.capacityDevelopColonyHdruAct || "");
            setModalDevPlan(developerDataGet?.devDetail[0]?.capacityDevelopAColony?.capacityDevelopColonyHdruAct[1]?.sectorAndDevelopmentPlan || "");
            setModalDevValidity(developerDataGet?.devDetail[0]?.capacityDevelopAColony?.capacityDevelopColonyHdruAct[1]?.validatingLicence || "");
            setCapacityDevelopColonyLawAct(developerDataGet?.devDetail[0]?.capacityDevelopAColony?.capacityDevelopColonyLawAct || "");
            setModalLcNo(developerDataGet?.devDetail[0]?.capacityDevelopAColony?.licenceNumber);
            setEngineerName(developerDataGet?.devDetail[0]?.capacityDevelopAColony?.technicalExpertEngaged[0]?.engineerName)
            setEngineerQualification(developerDataGet?.devDetail[0]?.capacityDevelopAColony?.technicalExpertEngaged[0]?.engineerQualification)
            setEngineerSign(developerDataGet?.devDetail[0]?.capacityDevelopAColony?.technicalExpertEngaged[0]?.engineerSign)
            setEngineerDegree(developerDataGet?.devDetail[0]?.capacityDevelopAColony?.technicalExpertEngaged[0]?.engineerDegree)
            setArchitectName(developerDataGet?.devDetail[0]?.capacityDevelopAColony?.technicalExpertEngaged[0]?.architectName)
            setArchitectQualification(developerDataGet?.devDetail[0]?.capacityDevelopAColony?.technicalExpertEngaged[0]?.architectQualification)
            setArchitectSign(developerDataGet?.devDetail[0]?.capacityDevelopAColony?.technicalExpertEngaged[0]?.architectSign)
            setArchitectDegree(developerDataGet?.devDetail[0]?.capacityDevelopAColony?.technicalExpertEngaged[0]?.architectDegree)
            setTownPlannerName(developerDataGet?.devDetail[0]?.capacityDevelopAColony?.technicalExpertEngaged[0]?.townPlannerName)
            setTownPlannerQualification(developerDataGet?.devDetail[0]?.capacityDevelopAColony?.technicalExpertEngaged[0]?.townPlannerQualification)
            setTownPlannerSign(developerDataGet?.devDetail[0]?.capacityDevelopAColony?.technicalExpertEngaged[0]?.townPlannerSign)
            setTownPlannerDegree(developerDataGet?.devDetail[0]?.capacityDevelopAColony?.technicalExpertEngaged[0]?.townPlannerDegree)
            setExistingDev(developerDataGet?.devDetail[0]?.capacityDevelopAColony?.existingDeveloperAgreement)
            setExistingDevDoc(developerDataGet?.devDetail[0]?.capacityDevelopAColony?.existingDeveloperAgreementDoc)
            setTechnicalCapacity(developerDataGet?.devDetail[0]?.capacityDevelopAColony?.technicalCapacity)
            setTechnicalCapacityDoc(developerDataGet?.devDetail[0]?.capacityDevelopAColony?.technicalCapacityDoc)
            setengineerNameN(developerDataGet?.devDetail[0]?.capacityDevelopAColony?.technicalExpertEngaged?.engineerNameN)
            setEngineerDocN(developerDataGet?.devDetail[0]?.capacityDevelopAColony?.engineerDocN)
            setArchitectNameN(developerDataGet?.devDetail[0]?.capacityDevelopAColony?.architectNameN)
            setArchitectDocN(developerDataGet?.devDetail[0]?.capacityDevelopAColony?.architectDocN)
            setUplaodSpaBoard(developerDataGet?.devDetail[0]?.capacityDevelopAColony?.uplaodSpaBoard)
            setUplaodSpaBoardDoc(developerDataGet?.devDetail[0]?.capacityDevelopAColony?.uplaodSpaBoardDoc)
            setAgreementDoc(developerDataGet?.devDetail[0]?.capacityDevelopAColony?.agreementDoc)
            setBoardDoc(developerDataGet?.devDetail[0]?.capacityDevelopAColony?.boardDoc)
            setRegisteredDoc(developerDataGet?.devDetail[0]?.capacityDevelopAColony?.registeredDoc)
            setBoardDocY(developerDataGet?.devDetail[0]?.capacityDevelopAColony?.boardDocY)
            setEarlierDocY(developerDataGet?.devDetail[0]?.capacityDevelopAColony?.earlierDocY)
            setBoardDocN(developerDataGet?.devDetail[0]?.capacityDevelopAColony?.boardDocN)
            setEarlierDocN(developerDataGet?.devDetail[0]?.capacityDevelopAColony?.earlierDocN)
            setTechnicalAssistanceAgreementDoc(developerDataGet?.devDetail[0]?.capacityDevelopAColony?.technicalAssistanceAgreementDoc)
            setDocuploadData(developerDataGet?.devDetail[0]?.capacityDevelopAColony?.docUpload)
            setFile(developerDataGet?.devDetail[0]?.capacityDevelopAColony?.file)
            setIndividualCertificateCA(developerDataGet?.devDetail[0]?.capacityDevelopAColony?.individualCertificateCA)
            setCompanyBalanceSheet(developerDataGet?.devDetail[0]?.capacityDevelopAColony?.companyBalanceSheet)
            setPaidUpCapital(developerDataGet?.devDetail[0]?.capacityDevelopAColony?.paidUpCapital)
            setNetworthPartners(developerDataGet?.devDetail[0]?.capacityDevelopAColony?.networthPartners)
            setNetworthFirm(developerDataGet?.devDetail[0]?.capacityDevelopAColony?.networthFirm)
            console.log("Developer-Capacity", getDevDetails?.data?.devDetail[0]?.capacityDevelopAColony);
            setPanNumber(developerDataGet?.devDetail[0]?.licenceDetails?.PanNumber);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getDeveloperData()
    }, []);
    const [Documents, setDocumentsData] = useState([]);
    const [genderUser, setGenderMF] = useState(formData?.LicneseDetails?.genderUser || formData?.formData?.LicneseDetails?.genderUser || "");
    const [name, setName] = useState((!isOpenLinkFlow ? userInfo?.info?.name : "") || formData?.LicneseDetails?.name || formData?.formData?.LicneseDetails?.name || "");
    const [email, setEmail] = useState(formData?.LicneseDetails?.email || formData?.formData?.LicneseDetails?.email || "");
    const [mobileNumber, setMobileNumber] = useState((!isOpenLinkFlow ? userInfo?.info?.mobileNumber : "") ||
        formData?.LicneseDetails?.mobileNumber || formData?.formData?.LicneseDetails?.mobileNumber || ""
    );
    const [PermanentAddress, setPermanentAddress] = useState(formData?.LicneseDetails?.PermanentAddress || formData?.formData?.LicneseDetails?.PermanentAddress);
    const [PanNumber, setPanNumber] = useState(
        formData?.LicneseDetails?.PanNumber || formData?.formData?.LicneseDetails?.PanNumber || ""
    );
    const [purposeOfColony, setShowPurposeType] = useState(formData?.LicneseDetails?.purposeOfColony || formData?.formData?.LicneseDetails?.purposeOfColony || "");
    const [Correspondenceaddress, setCorrespondenceaddress] = useState(formData?.LicneseDetails?.Correspondenceaddress || formData?.formData?.LicneseDetails?.Correspondenceaddress || "HR");
    const [isAddressSame, setisAddressSame] = useState(formData?.LicneseDetails?.isAddressSame || formData?.formData?.LicneseDetails?.isAddressSame || false);
    const [error, setError] = useState(null);
    const [showToast, setShowToast] = useState(null);
    const [isDisableForNext, setIsDisableForNext] = useState(false);
    const [isDevType, setIsDevType] = useState(false);
    const [isDevTypeComp, setIsDevTypeComp] = useState(false);
    const [modal, setmodal] = useState(false);
    const [modalColony, setmodalColony] = useState(false);
    const [capacityDevelopColonyHdruAct, setModalCapacityDevelopColonyHdruAct] = useState([]);
    // const [modalColonyDevGrpValuesArray, setModalColonyDevGrpValuesArray] = useState([]);
    const [capacityDevelopColonyLawAct, setCapacityDevelopColonyLawAct] = useState(formData?.LicneseDetails?.capacityDevelopColonyLawAct || []);
    const [capacityDevelopAColony, setcapacityDevelopAColony] = useState([]);

    const [licenceNumber, setModalLcNo] = useState(formData?.LicneseDetails?.licenceNumber || "");
    const [nameOfDeveloper, setModalDevName] = useState(formData?.LicneseDetails?.nameOfDeveloper || "");
    // const [purposeOfColony, setModalPurposeCol] = useState(formData?.LicneseDetails?.purposeOfColony || "");
    const [sectorAndDevelopmentPlan, setModalDevPlan] = useState(formData?.LicneseDetails?.sectorAndDevelopmentPlan || "");
    const [validatingLicence, setModalDevValidity] = useState(formData?.LicneseDetails?.validatingLicence || "");


    const [coloniesDeveloped, setColonyDev] = useState(formData?.LicneseDetails?.coloniesDeveloped || "");
    const [area, setColonyArea] = useState(formData?.LicneseDetails?.area || "");
    const [purpose, setColonyPurpose] = useState(formData?.LicneseDetails?.purpose || "");
    const [statusOfDevelopment, setColonyStatusDev] = useState(formData?.LicneseDetails?.statusOfDevelopment || "");
    const [outstandingDues, setColonyoutstandingDue] = useState(formData?.LicneseDetails?.outstandingDues || "");

    const [engineerName, setEngineerName] = useState(formData?.LicneseDetails?.engineerName || "")
    const [engineerQualification, setEngineerQualification] = useState(formData?.LicneseDetails?.engineerQualification || "")
    const [engineerSign, setEngineerSign] = useState(formData?.LicneseDetails?.engineerSign || DevelopersAllData?.engineerSign || "")
    const [engineerDegree, setEngineerDegree] = useState(formData?.LicneseDetails?.engineerDegree || DevelopersAllData?.engineerDegree || "")
    const [architectName, setArchitectName] = useState(formData?.LicneseDetails?.architectName || "")
    const [architectQualification, setArchitectQualification] = useState(formData?.LicneseDetails?.architectQualification || "")
    const [architectSign, setArchitectSign] = useState(formData?.LicneseDetails?.architectSign || DevelopersAllData?.architectSign || "")
    const [architectDegree, setArchitectDegree] = useState(formData?.LicneseDetails?.architectDegree || DevelopersAllData?.architectDegree || "")
    const [townPlannerName, setTownPlannerName] = useState(formData?.LicneseDetails?.townPlannerName || "")
    const [townPlannerQualification, setTownPlannerQualification] = useState(formData?.LicneseDetails?.townPlannerQualification || "")
    const [townPlannerSign, setTownPlannerSign] = useState(formData?.LicneseDetails?.townPlannerSign || DevelopersAllData?.architectDegree ||  "")
    const [townPlannerDegree, setTownPlannerDegree] = useState(formData?.LicneseDetails?.townPlannerDegree || "")
    const [existingDeveloperAgreement, setExistingDev] = useState(formData?.LicneseDetails?.existingDeveloperAgreement || DevelopersAllData?.existingDeveloperAgreement ||  "")
    const [existingDeveloperAgreementDoc, setExistingDevDoc] = useState(formData?.LicneseDetails?.existingDeveloperAgreementDoc || DevelopersAllData?.existingDeveloperAgreementDoc || "")
    const [technicalCapacity, setTechnicalCapacity] = useState(formData?.LicneseDetails?.technicalCapacity || "")
    const [technicalCapacityDoc, setTechnicalCapacityDoc] = useState(formData?.LicneseDetails?.technicalCapacityDoc || "")
    const [engineerNameN, setengineerNameN] = useState(formData?.LicneseDetails?.engineerNameN || "")
    const [engineerDocN, setEngineerDocN] = useState(formData?.LicneseDetails?.engineerDocN || "")
    const [architectNameN, setArchitectNameN] = useState(formData?.LicneseDetails?.architectNameN || "")
    const [architectDocN, setArchitectDocN] = useState(formData?.LicneseDetails?.architectDocN || "")
    const [uplaodSpaBoard, setUplaodSpaBoard] = useState(formData?.LicneseDetails?.uplaodSpaBoard || "")
    const [uplaodSpaBoardDoc, setUplaodSpaBoardDoc] = useState(formData?.LicneseDetails?.uplaodSpaBoardDoc || "")
    const [agreementDoc, setAgreementDoc] = useState(formData?.LicneseDetails?.agreementDoc || DevelopersAllData?.agreementDoc || "")
    const [boardDoc, setBoardDoc] = useState(formData?.LicneseDetails?.boardDoc || DevelopersAllData?.boardDoc || "")
    const [registeredDoc, setRegisteredDoc] = useState(formData?.LicneseDetails?.registeredDoc || DevelopersAllData?.registeredDoc || "")
    const [boardDocY, setBoardDocY] = useState(formData?.LicneseDetails?.boardDocY || DevelopersAllData?.boardDocY || "")
    const [earlierDocY, setEarlierDocY] = useState(formData?.LicneseDetails?.earlierDocY || DevelopersAllData?.earlierDocY || "")
    const [boardDocN, setBoardDocN] = useState(formData?.LicneseDetails?.boardDocN || DevelopersAllData?.boardDocN || "")
    const [earlierDocN, setEarlierDocN] = useState(formData?.LicneseDetails?.earlierDocN || DevelopersAllData?.earlierDocN || "")
    const [technicalAssistanceAgreementDoc, setTechnicalAssistanceAgreementDoc] = useState(formData?.LicneseDetails?.technicalAssistanceAgreementDoc || DevelopersAllData?.technicalAssistanceAgreementDoc || "")
    const [docUpload, setDocuploadData] = useState("")
    const [file, setFile] = useState("");
    const [filesUp, setFilesUp] = useState(null);
    const [individualCertificateCA, setIndividualCertificateCA] = useState(DevelopersAllData?.individualCertificateCA || "");
    const [companyBalanceSheet, setCompanyBalanceSheet] = useState( DevelopersAllData?.companyBalanceSheet || "");
    const [paidUpCapital, setPaidUpCapital] = useState(DevelopersAllData?.paidUpCapital || "");
    const [networthPartners, setNetworthPartners] = useState(DevelopersAllData?.networthPartners || "");
    const [networthFirm, setNetworthFirm] = useState("");
    const [permissionGrantedHRDU, setValueHrdu] = useState("");
    const [technicalExpert, setValueTechExpert] = useState("");
    const [designatedDirectors, setValueDesignatedDirectors] = useState("");
    const [alreadtObtainedLic, setValueAlreadyObtainedLic] = useState("");
    const [showhide1, setShowhide1] = useState("Y");
    const [showhide0, setShowhide0] = useState("Y");
    const [showhide6, setShowhide6] = useState("no");
    let isopenlink = window.location.href.includes("/openlink/");
    const isCitizenUrl = Digit.Utils.browser.isMobile() ? true : false;
    const [uploadedFile, setUploadedFile] = useState(null);
    const [urlGetForFile, setFIleUrl] = useState("");
    const [urlGetValidateLicFile, setValidateLicUrl] = useState("");
    const [urlGetStatusDevFile, setStatusDevUrl] = useState("");
    const [urlGetOutstandingFile, setOutStandingUrl] = useState("");
    const [urlGetCompanyBalanceSheet, setCompanyBalanceSheetUrl] = useState("");
    const [urlGetPaidUpCapital, setPaidUpCapitalUrl] = useState("");
    const [urlGetIndividualCertificateCA, setIndividualCertificatCAUrl] = useState("");
    const [urlGetEngineerSignUrl, setEngineerSignUrl] = useState("");
    const [urlGetArchitectSignUrl, setArchitectSignUrl] = useState("");
    const [urlGetTownPlannerSignUrl, setTownPlannerSignUrl] = useState("");
    const [urlGetAgreementDocUrl, setAgreementDocUrl] = useState("");
    const [urlGetBoardDocUrl, setBoardDocUrl] = useState("");
    const [urlGetRegisteredDocUrl, setRegisteredDocUrl] = useState("");
    const [urlGetBoardDocYUrl, setBoardDocYUrl] = useState("");
    const [urlGetEarlierDocYUrl, setEarlierDocYUrl] = useState("");
    if (isopenlink)
        window.onunload = function () {
            sessionStorage.removeItem("Digit.BUILDING_PERMIT");
        }

    function selectChecked(e) {
        if (isAddressSame == false) {
            setisAddressSame(true);
            setCorrespondenceaddress(formData?.LicneseDetails?.PermanentAddress ? formData?.LicneseDetails?.PermanentAddress : formData?.formData?.LicneseDetails?.PermanentAddress);
        }
        else {
            Array.from(document.querySelectorAll("input")).forEach((input) => (input.value = ""));
            setisAddressSame(false);
            setCorrespondenceaddress("");
        }
    }
    function selectCorrespondenceaddress(e) {
        setCorrespondenceaddress(e.target.value);
    }
 
    // const formSubmit = (data) => {
    //     console.log("data", data);
    // };

    

    const [AppliedDetailFormSubmitted, SetAppliedDetailFormSubmitted] = useState(false);

    const [showCapacityDevelopColony, setShowCapacityDevelopColony] = useState(false);
    const handleShowCapacityDevelopColony = () => {
        setShowCapacityDevelopColony(true)
        setModalLcNo("");
        setModalDevName("");
        setShowPurposeType("");
        // setAurthorizedEmail("");
        // setAurthorizedDob("");
        // setGender("");
        // setAurthorizedPan("");
    };
    const handleCloseCapacityDevelopColony = () => setShowCapacityDevelopColony(false);

    const [showColoniesDeveloped, setShowColoniesDeveloped] = useState(false);
    const handleShowColoniesDeveloped = () => {
        setShowColoniesDeveloped(true)
        setColonyArea("");
        setColonyPurpose("");
        // setAurthorizedEmail("");
        // setAurthorizedDob("");
        // setGender("");
        // setAurthorizedPan("");
    };
    const handleCloseColoniesDeveloped = () => setShowColoniesDeveloped(false);

    const changeValueHrdu = (e) => {
        console.log(e.target.value);
        setValueHrdu(e.target.value)
    }
    const changeTechnicalExpert = (e) => {
        console.log(e.target.value);
        setValueTechExpert(e.target.value)
    }
    const changeDesignatedDirectors = (e) => {
        console.log(e.target.value);
        setValueDesignatedDirectors(e.target.value)
    }
    const changeAlreadyObtainedLic = (e) => {
        console.log(e.target.value);
        setValueAlreadyObtainedLic(e.target.value)
    }

    const handleshow = (e) => {
        const getshow = e.target.value;
        console.log(getshow)
    };
    const handleshow0 = (e) => {
        const getshow = e.target.value;
        setShowhide0(getshow);
    };
    const handleshow1 = (e) => {
        const getshow = e.target.value;
        setShowhide1(getshow);
    };
    const handleshow6 = (e) => {
        const getshow = e.target.value;
        setShowhide6(getshow);
    };

    const handleChange = (e) => {
        this.setState({ isRadioSelected: true });
    };

    const devTypeFlagVal = localStorage.getItem('devTypeValueFlag');
    // const getDocumentData = async () => {
    //     if (file === null) {
    //         return
    //     }
    //     const formData = new FormData();
    //     formData.append("file", file.file);
    //     formData.append("tenantId", tenantId);
    //     formData.append("module", "property-upload");
    //     try {
    //         const Resp = await axios.post("/filestore/v1/files", formData,
    //             {
    //                 headers: {
    //                     "content-type": "multipart/form-data"
    //                 }
    //             }).then((response) => {
    //                 return response
    //             });
    //         const docValue = Resp.data?.files[0]?.fileStoreId
    //         setModalDevPlan(docValue);
    //     } catch (error) {
    //         console.log(error.message);
    //     }
    //     getDocData();
    // }
    
    const getDocumentData = async (file, fieldName) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("tenantId", "hr");
        formData.append("module", "property-upload");
        formData.append("tag", "tag-property");
        // setLoader(true);
        try {
          const Resp = await axios.post("/filestore/v1/files", formData, {}).then((response) => {
            return response;
          });
          console.log(Resp?.data?.files);
          setValue(fieldName, Resp?.data?.files?.[0]?.fileStoreId);
          // setDocId(Resp?.data?.files?.[0]?.fileStoreId);
          console.log("getValues()=====", getValues());
          setDocumentsData(getValues())
        //   setLoader(false);
        
        } catch (error) {
        //   setLoader(false);
          console.log(error.message);
        }
    };

    const getDocData = async () => {
        if ((Documents?.sectorAndDevelopmentPlan !== null || Documents?.sectorAndDevelopmentPlan !== undefined) && (sectorAndDevelopmentPlan!==null || sectorAndDevelopmentPlan!=="")) {       
            try {
                const response = await axios.get(`/filestore/v1/files/url?tenantId=${tenantId}&fileStoreIds=${Documents?.sectorAndDevelopmentPlan}`, {

                });
                const FILDATA = response.data?.fileStoreIds[0]?.url;
                setFIleUrl(FILDATA)
                console.log("GET DOCUMENT LABEL", FILDATA);
            } catch (error) {
                console.log(error.message);
            }
        }
    }

    useEffect(() => {
        getDocData();
    }, [Documents?.sectorAndDevelopmentPlan]);

    const getDocValidLic = async () => {
        if ((Documents?.validatingLicence !== null || Documents?.validatingLicence !== undefined) && (validatingLicence!==null || validatingLicence!=="")) {
            
            try {
                const response = await axios.get(`/filestore/v1/files/url?tenantId=${tenantId}&fileStoreIds=${Documents?.validatingLicence}`, {

                });
                const FILDATA = response.data?.fileStoreIds[0]?.url;
                setValidateLicUrl(FILDATA)
                console.log("GET VALID LIC", FILDATA);
            } catch (error) {
                console.log(error.message);
            }
        }
    }

    useEffect(() => {
        getDocValidLic();
    }, [Documents?.validatingLicence]);

    // COLONIES DEVELOPED GET UPLOADED DOC
    const getDocStatusDev = async () => {
        if ((Documents?.statusOfDevelopment !== null || Documents?.statusOfDevelopment !== undefined) && (statusOfDevelopment!==null || statusOfDevelopment!=="")) {
            
            try {
                const response = await axios.get(`/filestore/v1/files/url?tenantId=${tenantId}&fileStoreIds=${Documents?.statusOfDevelopment}`, {

                });
                const FILDATA = response.data?.fileStoreIds[0]?.url;
                setStatusDevUrl(FILDATA)
                console.log("GET DOCUMENT LABEL", FILDATA);
            } catch (error) {
                console.log(error.message);
            }
        }
    }

    useEffect(() => {
        getDocStatusDev();
    }, [Documents?.statusOfDevelopment]);


    const getOutstandingDues = async () => {
        if ((Documents?.outstandingDues !== null || Documents?.outstandingDues !== undefined) && (outstandingDues!==null || outstandingDues!=="")) {
            
            try {
                const response = await axios.get(`/filestore/v1/files/url?tenantId=${tenantId}&fileStoreIds=${Documents?.outstandingDues}`, {

                });
                const FILDATA = response.data?.fileStoreIds[0]?.url;
                setOutStandingUrl(FILDATA)
                console.log("GET DOCUMENT LABEL", FILDATA);
            } catch (error) {
                console.log(error.message);
            }
        }
    }

    useEffect(() => {
        getOutstandingDues();
    }, [Documents?.outstandingDues]);

    // PARTICULAR OF DOCUMENTS

    
    const getCompanyBalanceSheet = async () => {
        if ((DevelopersAllData?.companyBalanceSheet !== null || DevelopersAllData?.companyBalanceSheet !== undefined) && (companyBalanceSheet!==null || companyBalanceSheet!=="")) {
            
            try {
                const response = await axios.get(`/filestore/v1/files/url?tenantId=${tenantId}&fileStoreIds=${DevelopersAllData?.companyBalanceSheet}`, {

                });
                const FILDATA = response.data?.fileStoreIds[0]?.url;
                setCompanyBalanceSheetUrl(FILDATA)
            } catch (error) {
                console.log(error.message);
            }
        }
    }

    useEffect(() => {
        getCompanyBalanceSheet();
    }, [DevelopersAllData?.companyBalanceSheet]);
    
    
    const getPaidUpCapital = async () => {
        if ((DevelopersAllData?.paidUpCapital !== null || DevelopersAllData?.paidUpCapital !== undefined) && (paidUpCapital!==null || paidUpCapital!=="")) {
            
            try {
                const response = await axios.get(`/filestore/v1/files/url?tenantId=${tenantId}&fileStoreIds=${DevelopersAllData?.paidUpCapital}`, {

                });
                const FILDATA = response.data?.fileStoreIds[0]?.url;
                setPaidUpCapitalUrl(FILDATA)
            } catch (error) {
                console.log(error.message);
            }
        }
    }

    useEffect(() => {
        getPaidUpCapital();
    }, [DevelopersAllData?.paidUpCapital]);
    
    
    const getIndividualCertificateCA = async () => {
        if ((DevelopersAllData?.individualCertificateCA !== null || DevelopersAllData?.individualCertificateCA !== undefined) && (individualCertificateCA!==null || individualCertificateCA!=="")) {
            
            try {
                const response = await axios.get(`/filestore/v1/files/url?tenantId=${tenantId}&fileStoreIds=${DevelopersAllData?.individualCertificateCA}`, {

                });
                const FILDATA = response.data?.fileStoreIds[0]?.url;
                setIndividualCertificatCAUrl(FILDATA)
            } catch (error) {
                console.log(error.message);
            }
        }
    }

    useEffect(() => {
        getIndividualCertificateCA();
    }, [DevelopersAllData?.individualCertificateCA]);
    
    
    // GET TECHNICAL EXPERTS DOCUMENTS
    const getEngineerSign = async () => {
        if ((DevelopersAllData?.engineerSign !== null || DevelopersAllData?.engineerSign !== undefined) && (engineerSign!==null || engineerSign!=="")) {
            
            try {
                const response = await axios.get(`/filestore/v1/files/url?tenantId=${tenantId}&fileStoreIds=${DevelopersAllData?.engineerSign}`, {

                });
                const FILDATA = response.data?.fileStoreIds[0]?.url;
                setEngineerSignUrl(FILDATA)
            } catch (error) {
                console.log(error.message);
            }
        }
    }

    useEffect(() => {
        getEngineerSign();
    }, [DevelopersAllData?.engineerSign]);
    
    
    const getArchitectSign = async () => {
        if ((DevelopersAllData?.architectSign !== null || DevelopersAllData?.architectSign !== undefined) && (architectSign!==null || architectSign!=="")) {
            
            try {
                const response = await axios.get(`/filestore/v1/files/url?tenantId=${tenantId}&fileStoreIds=${DevelopersAllData?.architectSign}`, {

                });
                const FILDATA = response.data?.fileStoreIds[0]?.url;
                setArchitectSignUrl(FILDATA)
            } catch (error) {
                console.log(error.message);
            }
        }
    }

    useEffect(() => {
        getArchitectSign();
    }, [DevelopersAllData?.architectSign]);
    
    
    const getTownPlannerSign = async () => {
        if ((DevelopersAllData?.townPlannerSign !== null || DevelopersAllData?.townPlannerSign !== undefined) && (townPlannerSign!==null || townPlannerSign!=="")) {
            
            try {
                const response = await axios.get(`/filestore/v1/files/url?tenantId=${tenantId}&fileStoreIds=${DevelopersAllData?.townPlannerSign}`, {

                });
                const FILDATA = response.data?.fileStoreIds[0]?.url;
                setTownPlannerSignUrl(FILDATA)
            } catch (error) {
                console.log(error.message);
            }
        }
    }

    useEffect(() => {
        getTownPlannerSign();
    }, [DevelopersAllData?.townPlannerSign]);
    
    
    const getAgreementDoc = async () => {
        if ((DevelopersAllData?.agreementDoc !== null || DevelopersAllData?.agreementDoc !== undefined) && (agreementDoc!==null || agreementDoc!=="")) {
            
            try {
                const response = await axios.get(`/filestore/v1/files/url?tenantId=${tenantId}&fileStoreIds=${DevelopersAllData?.agreementDoc}`, {

                });
                const FILDATA = response.data?.fileStoreIds[0]?.url;
                setAgreementDocUrl(FILDATA)
            } catch (error) {
                console.log(error.message);
            }
        }
    }

    useEffect(() => {
        getAgreementDoc();
    }, [DevelopersAllData?.agreementDoc]);
    
    
    const getBoardDoc = async () => {
        if ((DevelopersAllData?.boardDoc !== null || DevelopersAllData?.boardDoc !== undefined) && (boardDoc!==null || boardDoc!=="")) {
            
            try {
                const response = await axios.get(`/filestore/v1/files/url?tenantId=${tenantId}&fileStoreIds=${DevelopersAllData?.boardDoc}`, {

                });
                const FILDATA = response.data?.fileStoreIds[0]?.url;
                setBoardDocUrl(FILDATA)
            } catch (error) {
                console.log(error.message);
            }
        }
    }

    useEffect(() => {
        getBoardDoc();
    }, [DevelopersAllData?.boardDoc]);
    
    
    const getRegisteredDoc = async () => {
        if ((DevelopersAllData?.registeredDoc !== null || DevelopersAllData?.registeredDoc !== undefined) && (registeredDoc!==null || registeredDoc!=="")) {
            
            try {
                const response = await axios.get(`/filestore/v1/files/url?tenantId=${tenantId}&fileStoreIds=${DevelopersAllData?.registeredDoc}`, {

                });
                const FILDATA = response.data?.fileStoreIds[0]?.url;
                setRegisteredDocUrl(FILDATA)
            } catch (error) {
                console.log(error.message);
            }
        }
    }

    useEffect(() => {
        getRegisteredDoc();
    }, [DevelopersAllData?.registeredDoc]);
    
    
    
    const getBoardDocY = async () => {
        if ((DevelopersAllData?.boardDocY !== null || DevelopersAllData?.boardDocY !== undefined) && (boardDocY!==null || boardDocY!=="")) {
            
            try {
                const response = await axios.get(`/filestore/v1/files/url?tenantId=${tenantId}&fileStoreIds=${DevelopersAllData?.boardDocY}`, {

                });
                const FILDATA = response.data?.fileStoreIds[0]?.url;
                setBoardDocYUrl(FILDATA)
            } catch (error) {
                console.log(error.message);
            }
        }
    }

    useEffect(() => {
        getBoardDocY();
    }, [DevelopersAllData?.boardDocY]);
    
    
    const getEarlierDocY = async () => {
        if ((DevelopersAllData?.earlierDocY !== null || DevelopersAllData?.earlierDocY !== undefined) && (earlierDocY!==null || earlierDocY!=="")) {
            
            try {
                const response = await axios.get(`/filestore/v1/files/url?tenantId=${tenantId}&fileStoreIds=${DevelopersAllData?.earlierDocY}`, {

                });
                const FILDATA = response.data?.fileStoreIds[0]?.url;
                setEarlierDocYUrl(FILDATA)
            } catch (error) {
                console.log(error.message);
            }
        }
    }

    useEffect(() => {
        getEarlierDocY();
    }, [DevelopersAllData?.earlierDocY]);
    

    const setpurposeType = (data) => {
        const getDevTypeValue = data?.value;
        setShowPurposeType(getDevTypeValue);
    }

    const handleArrayValues = () => {

        if (licenceNumber !== "" && nameOfDeveloper !== "" && purposeOfColony !== "") {

            const values = {

                licenceNumber: licenceNumber,
                nameOfDeveloper: nameOfDeveloper,
                purposeOfColony: purposeOfColony,
                sectorAndDevelopmentPlan: Documents?.sectorAndDevelopmentPlan,
                validatingLicence: Documents?.validatingLicence

            }
            setModalCapacityDevelopColonyHdruAct((prev) => [...prev, values]);
            console.log("WIHT DOC", values);
            getDocData();
            getDocValidLic();
            handleCloseCapacityDevelopColony()
        }
        //   console.log("DevCapacityFirst", capacityDevelopColonyHdruAct);
        localStorage.setItem("DevCapacityDetails", JSON.stringify(capacityDevelopColonyHdruAct))
    }

    const deleteTableRows = (i) => {
        const rows = [...capacityDevelopColonyHdruAct];
        rows.splice(i, 1);
        setModalCapacityDevelopColonyHdruAct(rows);
    }

    const handleColonyDevGrp = () => {
        if (coloniesDeveloped !== "" && area !== "" && purpose !== "") {
            const colonyDevValues = {

                coloniesDeveloped: coloniesDeveloped,
                area: area,
                purpose: purpose,
                statusOfDevelopment: Documents?.statusOfDevelopment,
                outstandingDues: Documents?.outstandingDues


            }
            setCapacityDevelopColonyLawAct((prev) => [...prev, colonyDevValues]);
            getDocStatusDev();
            getOutstandingDues();
            handleCloseColoniesDeveloped();
            console.log("DevCapacityColony", capacityDevelopColonyLawAct);
        }


    }


    const deleteLawActTableRows = (i) => {
        const rows = [...capacityDevelopColonyLawAct];
        rows.splice(i, 1);
        setCapacityDevelopColonyLawAct(rows);
    }

    const goNext = async (e) => {
        if (!(formData?.result && formData?.result?.Licenses[0]?.id)) {

            let payload = {
                "parentId": userInfo?.info?.id,
                "Licenses": [
                    {
                        "applicationType": "NEW",
                        "tradeLicenseDetail": {
                            "owners": [
                                {
                                    "parentid": userInfo?.info?.id,
                                    "gender": "MALE",
                                    "mobileNumber": userInfo?.info?.mobileNumber,
                                    "name": userInfo?.info?.name,
                                    "dob": null,
                                    "emailId": email,
                                    "permanentAddress": PermanentAddress,
                                    "correspondenceAddress": Correspondenceaddress,
                                    "pan": PanNumber,
                                    // "permanentPinCode": "143001"
                                }
                            ],
                            "subOwnerShipCategory": "INDIVIDUAL",
                            "tradeType": "BUILDER.CLASSA",

                            "additionalDetail": {
                                "counsilForArchNo": null,
                            },
                            "address": {
                                "city": "",
                                "landmark": "",
                                "pincode": ""
                            },
                            "institution": null,
                            "applicationDocuments": null
                        },
                        "licenseType": "PERMANENT",
                        "businessService": "BPAREG",
                        "tenantId": stateId,
                        "action": "NOWORKFLOW"
                    }
                ]
            }

            Digit.OBPSService.BPAREGCreate(payload, tenantId)
                .then((result, err) => {
                    setIsDisableForNext(false);
                    let data = { result: result, formData: formData, Correspondenceaddress: Correspondenceaddress, isAddressSame: isAddressSame }
                    //1, units
                    onSelect("", data, "", true);

                })
                .catch((e) => {
                    setIsDisableForNext(false);
                    setShowToast({ key: "error" });
                    setError(e?.response?.data?.Errors[0]?.message || null);
                });


            const developerRegisterData = {
                "id": userInfo?.info?.id,
                "pageName": "capacityDevelopAColony",
                "createdBy": userInfo?.info?.id,
                "updatedBy": userInfo?.info?.id,
                "devDetail": {

                    "capacityDevelopAColony": {
                        "individualCertificateCA": individualCertificateCA,
                        "companyBalanceSheet": companyBalanceSheet,
                        "paidUpCapital": paidUpCapital,
                        "networthPartners": networthPartners,
                        "networthFirm": networthFirm,
                        "permissionGrantedHRDU": permissionGrantedHRDU,
                        "technicalExpert": technicalExpert,
                        "designatedDirectors": designatedDirectors,
                        "alreadtObtainedLic": alreadtObtainedLic,
                        capacityDevelopColonyHdruAct: capacityDevelopColonyHdruAct,
                        capacityDevelopColonyLawAct: capacityDevelopColonyLawAct,
                        technicalExpertEngaged: [{
                            engineerName: engineerName,
                            engineerQualification: engineerQualification,
                            engineerSign: engineerSign,
                            engineerDegree: engineerDegree,
                            architectName: architectName,
                            architectQualification: architectQualification,
                            architectSign: architectSign,
                            architectDegree: architectDegree,
                            townPlannerName: townPlannerName,
                            townPlannerQualification: townPlannerQualification,
                            townPlannerSign: townPlannerSign,
                            townPlannerDegree: townPlannerDegree,
                            existingDeveloperAgreement: existingDeveloperAgreement,
                            existingDeveloperAgreementDoc: existingDeveloperAgreementDoc,
                            technicalCapacity: technicalCapacity,
                            technicalCapacityDoc: technicalCapacityDoc,
                            engineerNameN: engineerNameN,
                            engineerDocN: engineerDocN,
                            architectNameN: architectNameN,
                            architectDocN: architectDocN,
                            uplaodSpaBoard: uplaodSpaBoard,
                            uplaodSpaBoardDoc: uplaodSpaBoardDoc
                        }],
                        designationDirector: [{
                            agreementDoc: agreementDoc,
                            boardDoc: boardDoc
                        }],
                        obtainedLicense: [{
                            registeredDoc: registeredDoc,
                            boardDocY: boardDocY,
                            earlierDocY: earlierDocY,
                            boardDocN: boardDocN,
                            earlierDocN: earlierDocN,
                            technicalAssistanceAgreementDoc: technicalAssistanceAgreementDoc
                        }]
                    }
                }
            }

            Digit.OBPSService.CREATEDeveloper(developerRegisterData, tenantId)
                .then((result, err) => {
                    console.log("DATA", result?.id);
                    // localStorage.setItem('devRegId',JSON.stringify(result?.id));
                    setIsDisableForNext(false);
                    let data = {
                        result: result,
                        formData: formData,
                        Correspondenceaddress: Correspondenceaddress,
                        addressLineOneCorrespondence: addressLineOneCorrespondence,
                        addressLineTwoCorrespondence: addressLineTwoCorrespondence,

                        isAddressSame: isAddressSame
                    }
                    //1, units
                    onSelect("", data, "", true);

                })
                .catch((e) => {
                    setIsDisableForNext(false);
                    setShowToast({ key: "error" });
                    setError(e?.response?.data?.Errors[0]?.message || null);
                });
        }
        else {
            formData.Correspondenceaddress = Correspondenceaddress;
            formData.isAddressSame = isAddressSame;
            onSelect("", formData, "", true);
        }
        // sessionStorage.setItem("CurrentFinancialYear", FY);
        // onSelect(config.key, { TradeName });
    };

    return (
        <React.Fragment>
            <div className={isopenlink ? "OpenlinkContainer" : ""}>

                {isopenlink && <BackButton style={{ border: "none" }}>{t("CS_COMMON_BACK")}</BackButton>}
                <Timeline currentStep={4} flow="STAKEHOLDER" />
                <FormStep
                    config={config}
                    onSelect={goNext}
                    onSkip={onSkip}
                    t={t}
                    isDisabled={isDisableForNext || !permissionGrantedHRDU}
                >
                    {/* <CheckBox
            label={t("BPA_SAME_AS_PERMANENT_ADDRESS")}
            onChange={(e) => selectChecked(e)}
            //value={field.isPrimaryOwner}
            checked={isAddressSame}
            style={{ paddingBottom: "10px", paddingTop: "10px" }}
          />
          <CardLabel>{`${t("BPA_APPLICANT_CORRESPONDENCE_ADDRESS_LABEL")}`}</CardLabel>
          <TextArea
            t={t}
            isMandatory={false}
            type={"text"}
            optionKey="i18nKey"
            name="Correspondenceaddress"
            onChange={selectCorrespondenceaddress}
            value={Correspondenceaddress}
            disable={isAddressSame}
          /> */}

                    {devTypeFlagVal === "Individual" && (
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
                                                <th>Details </th>
                                                <th>Annexure </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td> 1 </td>
                                                <td>
                                                    Net Worth in case of individual certified by
                                                    CA
                                                </td>
                                                <td>
                                                    <input
                                                        type="file"
                                                        name="individualCertificateCA"
                                                        placeholder=""
                                                        class="employee-card-input"
                                                        onChange={(e) => getDocumentData(e?.target?.files[0], "individualCertificateCA")}
                                                    />
                                                </td>
                                                <td align="center" size="large">
                                                    {DevelopersAllData?.individualCertificateCA !== "" ? 
                                                        <a href={urlGetIndividualCertificateCA} target="_blank" className="btn btn-sm col-md-6">
                                                            <VisibilityIcon color="info" className="icon" />
                                                        </a>:<p></p>
                                                    }
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>)}
                    {devTypeFlagVal === "Company" && (
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
                                                <th>Details </th>
                                                <th>Annexure </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td> 1 </td>
                                                <td>Balance sheet of last 3 years </td>
                                                <td>
                                                    <input
                                                        type="file"
                                                        name="companyBalanceSheet"
                                                        placeholder=""
                                                        class="employee-card-input"
                                                        onChange={(e) => getDocumentData(e?.target?.files[0], "companyBalanceSheet")}
                                                    />

                                                </td>
                                                <td align="center" size="large">
                                                    {DevelopersAllData?.companyBalanceSheet !== "" ? 
                                                        <a href={urlGetCompanyBalanceSheet} target="_blank" className="btn btn-sm col-md-6">
                                                            <VisibilityIcon color="info" className="icon" />
                                                        </a>:<p></p>
                                                    }
                                                </td>
                                            </tr>
                                            <tr>
                                                <td> 2 </td>
                                                <td>Ps-3(Representing Paid-UP capital)</td>
                                                <td>
                                                    <input
                                                        type="file"
                                                        name="paidUpCapital"
                                                        placeholder=""
                                                        class="employee-card-input"
                                                        onChange={(e) => getDocumentData(e?.target?.files[0], "paidUpCapital")}
                                                    />
                                                </td>
                                                <td align="center" size="large">
                                                    {DevelopersAllData?.paidUpCapital !== "" ? 
                                                        <a href={urlGetPaidUpCapital} target="_blank" className="btn btn-sm col-md-6">
                                                            <VisibilityIcon color="info" className="icon" />
                                                        </a>:<p></p>
                                                    }
                                                    
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>)}
                    {devTypeFlagVal === "LLP" && (
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
                                                <th>Details </th>
                                                <th>Annexure </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td> 1 </td>
                                                <td>Networth of partners </td>
                                                <td>
                                                    <input
                                                        type="file"
                                                        name="upload"
                                                        placeholder=""
                                                        class="employee-card-input"
                                                        onChange={(e) => setFile({ file: e.target.files[0] })}
                                                    />
                                                </td>
                                                <td align="center" size="large">
                                                    {/* <FileUploadIcon /> */}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td> 2 </td>
                                                <td>Net worth of firm</td>
                                                <td>
                                                    <input
                                                        type="file"
                                                        name="upload"
                                                        placeholder=""
                                                        class="employee-card-input"
                                                        onChange={(e) => setFile({ file: e.target.files[0] })}
                                                    />
                                                </td>
                                                <td align="center" size="large">
                                                    {/* <FileUploadIcon /> */}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>)}
                    {/* <div>
                    <h5 className="card-h">
                    {" "}
                    Capacity of Developer to develop a colony:
                    </h5>
                </div> */}
                    <div className="card-body">
                        <p>
                            1. I/ We hereby submit the following information/ enclose the
                            relevant documents:-
                        </p>
                        <p>
                            &nbsp;&nbsp;&nbsp; (i) Whether the Developer/ group company has
                            earlier been granted permission to set up a colony under HDRU
                            Act, 1975: <span className="text-danger font-weight-bold">*</span>
                        </p>
                        <div className="form-group">
                            <input
                                type="radio"
                                value="Y"
                                id="permissionGrantedHRDU"
                                className="mx-2 mt-1"
                                onChange={changeValueHrdu}
                                name="permissionGrantedHRDU"
                            />
                            <label for="Yes">Yes</label>

                            <input
                                type="radio"
                                value="N"
                                id="permissionGrantedHRDUN"
                                className="mx-2 mt-1"
                                onChange={changeValueHrdu}
                                name="permissionGrantedHRDU"
                            />
                            <label for="No">No</label>
                            {permissionGrantedHRDU === "Y" && (
                                <div className="card-body">
                                    {/* <h5 className="card-h">Add/Remove Authorized Users</h5> */}
                                    <div className="table-bd">
                                        <Table className="table table-bordered">
                                            <thead>
                                                <tr>
                                                    <th>S. no</th>
                                                    <th> Licence No / year and date of grant of licence </th>
                                                    <th>Name of developer *</th>
                                                    <th>Purpose of colony </th>
                                                    <th>Sector and development plan </th>
                                                    <th>Validity of licence including renewals if any</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    (capacityDevelopColonyHdruAct.length > 0) ?
                                                        capacityDevelopColonyHdruAct.map((elementInArray, input) => {
                                                            return (
                                                                <tr>

                                                                    <td>{input + 1}</td>
                                                                    <td>
                                                                        <input
                                                                            type="text"
                                                                            value={elementInArray.licenceNumber}
                                                                            placeholder={elementInArray.licenceNumber}
                                                                            class="employee-card-input"
                                                                        />
                                                                    </td>
                                                                    <td>
                                                                        <input
                                                                            type="text"
                                                                            value={elementInArray.nameOfDeveloper}
                                                                            placeholder={elementInArray.nameOfDeveloper}
                                                                            class="employee-card-input"
                                                                        />
                                                                    </td>
                                                                    <td>
                                                                        <input
                                                                            type="text"
                                                                            value={elementInArray.purposeOfColony}
                                                                            placeholder={elementInArray.purposeOfColony}
                                                                            class="employee-card-input"
                                                                        />
                                                                    </td>
                                                                    <td>
                                                                        <div className="row">
                                                                            {elementInArray.sectorAndDevelopmentPlan !== "" ? 
                                                                                <a href={urlGetForFile} target="_blank" className="btn btn-sm col-md-6">
                                                                                    <VisibilityIcon color="info" className="icon" />
                                                                                </a>:<p></p>
                                                                            }

                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div className="row">
                                                                            {elementInArray.validatingLicence !== "" ? 
                                                                                <a href={urlGetValidateLicFile} target="_blank" className="btn btn-sm col-md-6">
                                                                                    <VisibilityIcon color="info" className="icon" />
                                                                                </a>:<p></p>
                                                                            }
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <button
                                                                            onClick={() => (deleteTableRows(-1))}
                                                                        >
                                                                            <DeleteIcon />
                                                                        </button>
                                                                    </td>
                                                                </tr>
                                                            )
                                                        }) : <p className="d-none">Click on Add more</p>
                                                }
                                            </tbody>
                                        </Table>
                                        <div>
                                            <button
                                                type="button"
                                                style={{
                                                    float: "left",
                                                    backgroundColor: "#0b3629",
                                                    color: "white",
                                                }}
                                                className="btn mt-3"
                                                // onClick={() => setNoOfRows(noofRows + 1)}
                                                onClick={handleShowCapacityDevelopColony}
                                            >
                                                Add More
                                            </button>
                                            <Modal show={showCapacityDevelopColony} onHide={handleCloseCapacityDevelopColony} animation={false}>
                                                <Modal.Header closeButton>
                                                    {/* <Modal.Title>Add Authorised user</Modal.Title> */}
                                                </Modal.Header>
                                                <Modal.Body>
                                                    <form className="text1">
                                                        <Row>
                                                            <Col md={4} xxl lg="4">
                                                                <label htmlFor="name" className="text">Licence No / year of licence</label>
                                                                <input
                                                                    type="text"
                                                                    onChange={(e) => setModalLcNo(e.target.value)}
                                                                    placeholder=""
                                                                    class="employee-card-input"
                                                                    required="required"
                                                                />
                                                            </Col>
                                                            <Col md={4} xxl lg="4">
                                                                <label htmlFor="name" className="text">Name of developer *</label>
                                                                <TextInput
                                                                    type="text"
                                                                    onChange={(e) => setModalDevName(e.target.value)}
                                                                    placeholder=""
                                                                    class="employee-card-input"
                                                                    isMandatory={false}
                                                                    {...(validation = {
                                                                        isRequired: true,
                                                                        title: "Please enter Name"
                                                                    })}
                                                                />
                                                            </Col>
                                                            <Col md={3} xxl lg="4">
                                                                <label htmlFor="name" className="text">{`${t("Purpose of colony")}`}<span class="text-danger font-weight-bold mx-2">*</span></label>
                                                                <Dropdown
                                                                    labels="Select Type"
                                                                    className="form-field"
                                                                    selected={purposeOfColony}
                                                                    option={arrayDevList}
                                                                    select={setpurposeType}
                                                                    value={purposeOfColony}
                                                                    optionKey="code"
                                                                    name={purposeOfColony}
                                                                    placeholder={purposeOfColony}
                                                                    style={{ width: "100%" }}
                                                                    t={t}
                                                                />
                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col md={4} xxl lg="4">
                                                                <label htmlFor="name" className="text">Sector and development plan</label>
                                                                {/* <input
                                                                    type="file"
                                                                    accept=".pdf"
                                                                    // onChange={(e) => setModalDevPlan(e.target.value)}
                                                                    onChange={(e) => setFile({ file: e.target.files[0] })}
                                                                    placeholder=""
                                                                    class="employee-card-input"
                                                                /> */}
                                                                <input
                                                                    type="file"
                                                                    className="form-control"
                                                                    name="sectorAndDevelopmentPlan"
                                                                    // {...register("thirdPartyDoc")}
                                                                    onChange={(e) => getDocumentData(e?.target?.files[0], "sectorAndDevelopmentPlan")}
                                                                />
                                                            </Col>
                                                            <Col md={4} xxl lg="4">
                                                                <label htmlFor="name" className="text">Validity of licence </label>
                                                                <input
                                                                    type="file"
                                                                    accept=".pdf"
                                                                    name="validatingLicence"
                                                                    // onChange={(e) => setModalDevValidity(e.target.value)}
                                                                    // onChange={(e) => setFile({ file: e.target.files[0] })}
                                                                    onChange={(e) => getDocumentData(e?.target?.files[0], "validatingLicence")}
                                                                    placeholder=""
                                                                    class="employee-card-input"
                                                                />
                                                                
                                                            </Col>

                                                        </Row>
                                                    </form>
                                                </Modal.Body>
                                                <Modal.Footer>
                                                    <Button variant="secondary" onClick={handleCloseCapacityDevelopColony}>
                                                        Close
                                                    </Button>
                                                    <Button variant="primary" onClick={handleArrayValues}>
                                                        Submit
                                                    </Button>
                                                </Modal.Footer>
                                            </Modal>

                                        </div>

                                        <br></br>
                                        <br></br>
                                    </div>

                                </div>
                            )}
                        </div>

                        <div className="hl"></div>
                        <p>
                            &nbsp;&nbsp;&nbsp;(ii) Licences/permissions granted to
                            Developer/ group company for development of colony under any
                            other law/Act as .
                        </p>
                        <div>
                            <div className="card-body">
                                {/* <h5 className="card-h">Add/Remove Authorized Users</h5> */}
                                <div className="table-bd">
                                    <Table className="table table-bordered">
                                        <thead>
                                            <tr>
                                                {/* <th>Add More</th> */}
                                                <th>S.No</th>
                                                <th>Colonies developed</th>
                                                <th>Area</th>
                                                <th>Purpose</th>
                                                <th>Status of development</th>
                                                <th>Outstanding Dues</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                (capacityDevelopColonyLawAct.length > 0) ?
                                                    capacityDevelopColonyLawAct.map((elementInArray, input) => {
                                                        return (
                                                            <tr>
                                                                <td>{input + 1}</td>
                                                                <td>
                                                                    <input
                                                                        type="text"
                                                                        value={elementInArray.coloniesDeveloped}
                                                                        placeholder={elementInArray.coloniesDeveloped}
                                                                        class="employee-card-input"
                                                                    />
                                                                </td>
                                                                <td>
                                                                    <input
                                                                        type="text"
                                                                        value={elementInArray.area}
                                                                        placeholder={elementInArray.area}
                                                                        class="employee-card-input"
                                                                    />
                                                                </td>
                                                                <td>
                                                                    <input
                                                                        type="text"
                                                                        value={elementInArray.purpose}
                                                                        placeholder={elementInArray.purpose}
                                                                        class="employee-card-input"
                                                                    />
                                                                </td>
                                                                <td>
                                                                    <div className="row">
                                                                        {elementInArray.statusOfDevelopment !== "" ? 
                                                                            <a href={urlGetStatusDevFile} target="_blank" className="btn btn-sm col-md-6">
                                                                                <VisibilityIcon color="info" className="icon" />
                                                                            </a>:<p></p>
                                                                        }
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <div className="row">
                                                                        {elementInArray.outstandingDues !== "" ? 
                                                                            <a href={urlGetOutstandingFile} target="_blank" className="btn btn-sm col-md-6">
                                                                                <VisibilityIcon color="info" className="icon" />
                                                                            </a>:<p></p>
                                                                        }

                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <button
                                                                        onClick={() => (deleteLawActTableRows(-1))}
                                                                    >
                                                                        <DeleteIcon />
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                        )
                                                    }
                                                    ) : <p className="d-none">Click on add more</p>
                                            }
                                        </tbody>
                                    </Table>
                                    <div>
                                        <button
                                            type="button"
                                            style={{
                                                float: "left",
                                                backgroundColor: "#0b3629",
                                                color: "white",
                                            }}
                                            className="btn mt-3"
                                            // onClick={() => setNoOfRows(noofRows + 1)}
                                            onClick={handleShowColoniesDeveloped}
                                        >
                                            Add More
                                        </button>
                                        <Modal show={showColoniesDeveloped} onHide={handleCloseColoniesDeveloped} animation={false}>
                                            <Modal.Header closeButton>
                                                {/* <Modal.Title>Add Authorised user</Modal.Title> */}
                                            </Modal.Header>
                                            <Modal.Body>

                                                <form className="text1">
                                                    <Row>
                                                        <Col md={4} xxl lg="4">
                                                            <label htmlFor="name" className="text">Colonies developed</label>
                                                            <input
                                                                type="text"
                                                                onChange={(e) => setColonyDev(e.target.value)}
                                                                placeholder=""
                                                                class="employee-card-input"
                                                            />
                                                        </Col>
                                                        <Col md={4} xxl lg="4">
                                                            <label htmlFor="name" className="text">Area</label>
                                                            <input
                                                                type="number"
                                                                onChange={(e) => setColonyArea(e.target.value)}
                                                                placeholder=""
                                                                class="employee-card-input"
                                                            />
                                                        </Col>
                                                        <Col md={4} xxl lg="4">
                                                            <label htmlFor="name" className="text">Purpose</label>
                                                            <input
                                                                type="text"
                                                                onChange={(e) => setColonyPurpose(e.target.value)}
                                                                placeholder=""
                                                                class="employee-card-input"
                                                            />
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col md={4} xxl lg="4">
                                                            <label htmlFor="name" className="text">Status of development</label>
                                                            <input
                                                                type="file"
                                                                // onChange={(e) => setColonyStatusDev(e.target.value)}
                                                                
                                                                onChange={(e) => getDocumentData(e.target.files[0],"statusOfDevelopment" )}
                                                                placeholder=""
                                                                class="employee-card-input"
                                                            />
                                                        </Col>
                                                        <Col md={4} xxl lg="4">
                                                            <label htmlFor="name" className="text">Outstanding Dues</label>
                                                            <input
                                                                type="file"
                                                                // onChange={(e) => setColonyoutstandingDue(e.target.value)}
                                                                onChange={(e) => getDocumentData(e.target.files[0],"outstandingDues" )}
                                                                placeholder=""
                                                                class="employee-card-input"
                                                            />
                                                        </Col>

                                                    </Row>
                                                </form>
                                            </Modal.Body>
                                            <Modal.Footer>
                                                <Button variant="secondary" onClick={handleCloseColoniesDeveloped}>
                                                    Close
                                                </Button>
                                                <Button variant="primary" onClick={handleColonyDevGrp}>
                                                    Submit
                                                </Button>
                                            </Modal.Footer>
                                        </Modal>
                                    </div>
                                    <br></br>
                                    <br></br>
                                </div>
                            </div>
                        </div>

                        <div className="mb-3"></div>
                        <p>&nbsp;&nbsp;&nbsp;(iii) Whether any technical expert(s) engaged</p>

                        <div className="form-group">
                            <input
                                type="radio"
                                value="Y"
                                id="technicalExpert"
                                className="mx-2 mt-1"
                                onChange={changeTechnicalExpert}
                                name="technicalExpert"
                            />
                            <label for="Yes">Yes</label>

                            <input
                                type="radio"
                                value="N"
                                id="technicalExpertN"
                                className="mx-2 mt-1"
                                onChange={changeTechnicalExpert}
                                name="technicalExpert"
                            />
                            <label for="No">No</label>
                            {technicalExpert === "Y" && (
                                <div className="row ">
                                    <div className="form-group row">
                                        <div className="col-sm-12">
                                            <div className="table-bd">
                                                <Table className="table table-bordered">
                                                    <thead>
                                                        <tr>
                                                            <th>S.No</th>
                                                            <th>Professional </th>
                                                            <th>Qualification</th>
                                                            <th>Signature</th>
                                                            <th>Annexure</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td>1</td>
                                                            <td>
                                                                <input
                                                                    typr="text"
                                                                    onChange={(e) => setEngineerName(e.target.value)}
                                                                    value={engineerName}
                                                                    placeholder="Name of Engineer"
                                                                    class="employee-card-input"
                                                                />
                                                            </td>
                                                            <td>
                                                                <input
                                                                    type="text"
                                                                    onChange={(e) => setEngineerQualification(e.target.value)}
                                                                    value={engineerQualification}
                                                                    placeholder=""
                                                                    class="employee-card-input"
                                                                />
                                                            </td>

                                                            <td>
                                                                <input
                                                                    type="file"
                                                                    name="engineerSign"
                                                                    // onChange={(e) => setEngineerSign(e.target.value)}
                                                                    onChange={(e) => getDocumentData(e?.target?.files[0], "engineerSign" )}
                                                                    placeholder=""
                                                                    class="employee-card-input"
                                                                />
                                                            </td>
                                                            <td align="center" size="large">
                                                                {DevelopersAllData?.engineerSign !== "" ? 
                                                                    <a href={urlGetEngineerSignUrl} target="_blank" className="btn btn-sm col-md-6">
                                                                        <VisibilityIcon color="info" className="icon" />
                                                                    </a>:<p></p>
                                                                }
                                                            </td>
                                                        </tr>

                                                        <tr>
                                                            <td>2</td>
                                                            <td>
                                                                <input
                                                                    typr="text"
                                                                    onChange={(e) => setArchitectName(e.target.value)}
                                                                    value={architectName}
                                                                    placeholder="Name of Architect"
                                                                    class="employee-card-input"
                                                                />
                                                            </td>
                                                            <td>
                                                                <input
                                                                    type="text"
                                                                    onChange={((e) => setArchitectQualification(e.target.value))}
                                                                    value={architectQualification}
                                                                    placeholder=""
                                                                    class="employee-card-input"
                                                                />
                                                            </td>

                                                            <td>
                                                                <input
                                                                    type="file"
                                                                    // onChange={((e) => setArchitectSign(e.target.value))}
                                                                    onChange={(e) => getDocumentData(e?.target?.files[0], "architectSign" )}
                                                                    placeholder=""
                                                                    class="employee-card-input"
                                                                />
                                                            </td>
                                                            <td align="center" size="large">
                                                                {DevelopersAllData?.architectSign !== "" ? 
                                                                    <a href={urlGetArchitectSignUrl} target="_blank" className="btn btn-sm col-md-6">
                                                                        <VisibilityIcon color="info" className="icon" />
                                                                    </a>:<p></p>
                                                                }
                                                            </td>
                                                        </tr>

                                                        <tr>
                                                            <td>3</td>
                                                            <td>
                                                                <input
                                                                    type="text"
                                                                    onChange={((e) => setTownPlannerName(e.target.value))}
                                                                    value={townPlannerName}
                                                                    placeholder="Name of Town Planner"
                                                                    class="employee-card-input"
                                                                />
                                                            </td>
                                                            <td>
                                                                <input
                                                                    type="text"
                                                                    onChange={((e) => setTownPlannerQualification(e.target.value))}
                                                                    value={townPlannerQualification}
                                                                    placeholder=""
                                                                    class="employee-card-input"
                                                                />
                                                            </td>

                                                            <td>
                                                                <input
                                                                    type="file"
                                                                    // onChange={((e) => setTownPlannerSign(e.target.value))}
                                                                    onChange={(e) => getDocumentData(e?.target?.files[0], "townPlannerSign" )}
                                                                    placeholder=""
                                                                    class="employee-card-input"
                                                                />
                                                            </td>
                                                            <td align="center" size="large">
                                                                {DevelopersAllData?.townPlannerSign !== "" ? 
                                                                    <a href={urlGetTownPlannerSignUrl} target="_blank" className="btn btn-sm col-md-6">
                                                                        <VisibilityIcon color="info" className="icon" />
                                                                    </a>:<p></p>
                                                                }
                                                            </td>
                                                        </tr>

                                                    </tbody>
                                                </Table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            {technicalExpert === "N" && (
                                <div className="row ">
                                    <div className="form-group row">
                                        {/* <label className="col-sm-3 col-form-label">Company</label> */}
                                        <div className="col-sm-12">
                                            <div className="table-bd">
                                                <Table className="table table-bordered" size="sm">
                                                    <thead>
                                                        <tr>
                                                            <th>S.No.</th>
                                                            <th>Professional </th>
                                                            <th> Annexure</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td> 1 &nbsp;&nbsp;</td>
                                                            <td>
                                                                {" "}
                                                                Agreement with existing colonizer/developer
                                                                who has already developed a colony
                                                                {/* <input
                                            type="text"
                                            onChange={((e) => setExistingDev(e.target.value))}
                                            placeholder=""
                                            /> */}
                                                            </td>
                                                            <td align="center" size="large">
                                                                <input
                                                                    type="file"
                                                                    onChange={((e) => setExistingDevDoc(e.target.value))}
                                                                    placeholder=""
                                                                    class="employee-card-input"
                                                                />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td> 2&nbsp;&nbsp; </td>
                                                            <td>
                                                                <input
                                                                    type="text"
                                                                    onChange={((e) => setTechnicalCapacity(e.target.value))}
                                                                    placeholder="Technical Capacity"
                                                                    value={technicalCapacity}
                                                                    class="employee-card-input"
                                                                />
                                                            </td>
                                                            <td align="center" size="large">
                                                                <input
                                                                    type="file"
                                                                    onChange={((e) => setTechnicalCapacityDoc(e.target.value))}
                                                                    placeholder=""
                                                                    class="employee-card-input"
                                                                />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td> 3 &nbsp;&nbsp;</td>
                                                            {/* <td colSpan={2}>Larry the Bird</td> */}
                                                            <td>
                                                                <input
                                                                    type="text"
                                                                    placeholder="Name of Engineer"
                                                                    onChange={((e) => setengineerNameN(e.target.value))}
                                                                    value={engineerNameN}
                                                                    class="employee-card-input"
                                                                />
                                                            </td>
                                                            <td align="center" size="large">
                                                                <input
                                                                    type="file"
                                                                    // onChange={((e) => setEngineerDocN(e.target.value))}
                                                                    onChange={(e) => setFile({ file: e.target.files[0] })}
                                                                    placeholder=""
                                                                    class="employee-card-input"
                                                                />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td> 4&nbsp;&nbsp; </td>
                                                            <td>
                                                                <input
                                                                    type="text"
                                                                    placeholder="Name of Architect"
                                                                    onChange={((e) => setArchitectNameN(e.target.value))}
                                                                    value={architectNameN}
                                                                    class="employee-card-input"
                                                                />
                                                            </td>
                                                            <td align="center" size="large">
                                                                <input
                                                                    type="file"
                                                                    // onChange={((e) => setArchitectDocN(e.target.value))}
                                                                    onChange={(e) => setFile({ file: e.target.files[0] })}
                                                                    placeholder=""
                                                                    class="employee-card-input"
                                                                />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td> 5&nbsp;&nbsp; </td>
                                                            <td>
                                                                {/* <input
                                            type="text"
                                            onChange={((e) => setUplaodSpaBoard(e.target.value))} 
                                            placeholder=""
                                            class="employee-card-input"
                                            /> */}
                                                                Upload SPA/GPA/ Board Resolution to sign
                                                                collaboration agreement on behalf of land
                                                                owner(s)
                                                            </td>
                                                            <td align="center" size="large">
                                                                <input
                                                                    type="file"
                                                                    class="employee-card-input"
                                                                    // onChange={((e)=> setUplaodSpaBoardDoc(e.target.value))}
                                                                    onChange={(e) => setFile({ file: e.target.files[0] })}
                                                                />
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </Table>
                                            </div>
                                        </div>
                                    </div>

                                    {/* <input type="text" className="employee-card-input" /> */}
                                </div>
                            )}
                        </div>

                        <div className="hl"></div>
                        <p>
                            &nbsp;&nbsp;&nbsp;(iv) If director/partner of the proposed
                            developer company/firm also holds designation of
                            director/partner in any other company/firm who has already
                            obtained license(s) under act of 1975:
                        </p>

                        <div className="form-group">
                            <input
                                type="radio"
                                value="Y"
                                id="designatedDirectors"
                                className="mx-2 mt-1"
                                onChange={changeDesignatedDirectors}
                                name="designatedDirectors"
                            />
                            <label for="Yes">Yes</label>

                            <input
                                type="radio"
                                value="N"
                                id="designatedDirectorsN"
                                className="mx-2 mt-1"
                                onChange={changeDesignatedDirectors}
                                name="designatedDirectors"
                            />
                            <label for="No">No</label>
                            {designatedDirectors === "Y" && (
                                <div className="row ">
                                    <div className="form-group row">
                                        <div className="col-sm-12">
                                            <Col xs="12" md="12" sm="12">
                                                <Table className="table table-bordered" size="sm">
                                                    <thead>
                                                        <tr>
                                                            <th>S.No.</th>
                                                            <th>Professional </th>
                                                            <th> Upload Documents</th>
                                                            <th> Annexure</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td> 1 &nbsp;&nbsp;</td>
                                                            <td>
                                                                {" "}
                                                                Agreement between the entities to provide
                                                                technical assistance
                                                            </td>
                                                            <td align="center" size="large">
                                                                <input
                                                                    type="file"
                                                                    accept=".pdf/"
                                                                    name="agreementDoc"
                                                                    onChange={(e) => getDocumentData(e?.target?.files[0], "agreementDoc" )}
                                                                    class="employee-card-input"
                                                                />
                                                            </td>
                                                            <td>
                                                                {DevelopersAllData?.agreementDoc !== "" ? 
                                                                    <a href={urlGetAgreementDocUrl} target="_blank" className="btn btn-sm col-md-6">
                                                                        <VisibilityIcon color="info" className="icon" />
                                                                    </a>:<p></p>
                                                                }
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td> 2&nbsp;&nbsp; </td>
                                                            <td>
                                                                Board resolutions of authorized signatory of
                                                                firm/company provided technical assistance
                                                            </td>
                                                            <td align="center" size="large">
                                                                <input
                                                                    type="file"
                                                                    name="boardDoc"
                                                                    onChange={(e) => getDocumentData(e?.target?.files[0], "boardDoc" )}
                                                                    class="employee-card-input"
                                                                />
                                                            </td>
                                                            <td>
                                                                {DevelopersAllData?.boardDoc !== "" ? 
                                                                    <a href={urlGetBoardDocUrl} target="_blank" className="btn btn-sm col-md-6">
                                                                        <VisibilityIcon color="info" className="icon" />
                                                                    </a>:<p></p>
                                                                }
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </Table>
                                            </Col>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="hl"></div>
                        <p>
                            2. In case of technical capacity sought from another
                            company/firm who has already obtained license(s) under act of
                            1975 or outside Haryana:
                        </p>
                        <div className="form-group">
                            <input
                                type="radio"
                                value="Y"
                                id="alreadtObtainedLic"
                                className="mx-2 mt-1"
                                onChange={changeAlreadyObtainedLic}
                                name="alreadtObtainedLic"
                            />
                            <label for="Yes">Yes</label>

                            <input
                                type="radio"
                                value="N"
                                id="alreadtObtainedLicN"
                                className="mx-2 mt-1"
                                onChange={changeAlreadyObtainedLic}
                                name="alreadtObtainedLic"
                                onClick={handleshow6}
                            />
                            <label for="No">No</label>
                            {alreadtObtainedLic === "Y" && (
                                <div className="row ">
                                    <div className="form-group row">
                                        <div className="col-sm-12">
                                            <Col xs="12" md="12" sm="12">
                                                <div>
                                                    <Table className="table table-bordered" size="sm">
                                                        <thead>
                                                            <tr>
                                                                <th>S.No.</th>
                                                                <th>Agreement*</th>
                                                                <th>Upload Document </th>
                                                                <th>Annexure </th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <td> 1 </td>
                                                                <td> Registered and Irrevocable Agreement</td>
                                                                <td align="center" size="large">
                                                                    <input
                                                                        type="file"
                                                                        name="registeredDoc"
                                                                        // onChange={((e)=> setRegisteredDoc(e.target.value))}
                                                                        onChange={(e) => getDocumentData(e?.target?.files[0], "registeredDoc")}
                                                                        class="employee-card-input"
                                                                    />
                                                                </td>
                                                                <td>
                                                                    {DevelopersAllData?.registeredDoc !== "" ? 
                                                                    <a href={urlGetRegisteredDocUrl} target="_blank" >
                                                                        <VisibilityIcon />
                                                                    </a>:<p></p>
                                                                    }
                                                                </td>
                                                            </tr>

                                                            <tr>
                                                                <td> 2 </td>
                                                                <td>
                                                                    Board resolutions of authorized signatory of
                                                                    firm/company provided technical assistance
                                                                </td>
                                                                <td align="center" size="large">
                                                                    <input
                                                                        type="file"
                                                                        // onChange={((e)=> setBoardDocY(e.target.value))}
                                                                        onChange={(e) => getDocumentData(e?.target?.files[0], "boardDocY")}
                                                                        class="employee-card-input"
                                                                    />
                                                                </td>
                                                                <td>
                                                                    {DevelopersAllData?.boardDocY !== "" ? 
                                                                    <a href={urlGetBoardDocYUrl} target="_blank" >
                                                                        <VisibilityIcon />
                                                                    </a>:<p></p>
                                                                    }
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td> 3 </td>

                                                                <td>
                                                                    Auto populate details of earlier license(s)
                                                                    granted to existing developer company/firm
                                                                    to set up a colony under act of 1975.
                                                                </td>
                                                                <td align="center" size="large">
                                                                    <input
                                                                        type="file"
                                                                        name="earlierDocY"
                                                                        // onChange={((e)=> setEarlierDocY(e.target.value))}
                                                                        onChange={(e) => getDocumentData(e?.target?.files[0], "earlierDocY")}
                                                                        class="employee-card-input"
                                                                    />
                                                                </td>
                                                                <td>
                                                                    {DevelopersAllData?.earlierDocY !== "" ? 
                                                                    <a href={urlGetEarlierDocYUrl} target="_blank" >
                                                                        <VisibilityIcon />
                                                                    </a>:<p></p>
                                                                    }
                                                                </td>
                                                            </tr>
                                                        </tbody>{" "}
                                                    </Table>
                                                </div>
                                            </Col>
                                        </div>
                                    </div>
                                </div>
                            )}
                            {alreadtObtainedLic === "N" && (
                                <div className="row ">
                                    <div className="form-group row">
                                        <div className="col-sm-12">
                                            <div>
                                                <Table className="table table-bordered" size="sm">
                                                    <thead>
                                                        <tr>
                                                            <th>S.No.</th>
                                                            <th>Agreement*</th>
                                                            <th>Annexure </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td> 1 </td>
                                                            <td>
                                                                Agreement between the entities to provide
                                                                technical assistance
                                                            </td>
                                                            <td align="center" size="large">
                                                                <input
                                                                    type="file"
                                                                    // onChange={((e)=> setTechnicalAssistanceAgreementDoc(e.target.value))}
                                                                    onChange={(e) => setFile({ file: e.target.files[0] })}
                                                                    class="employee-card-input"
                                                                />
                                                            </td>
                                                        </tr>

                                                        <tr>
                                                            <td> 2 </td>
                                                            <td>
                                                                Board resolutions of authorized signatory of
                                                                firm/company provided technical assistance
                                                            </td>
                                                            <td align="center" size="large">
                                                                <input
                                                                    type="file"
                                                                    // onChange={((e)=> setBoardDocN(e.target.value))}
                                                                    onChange={(e) => setFile({ file: e.target.files[0] })}
                                                                    class="employee-card-input"
                                                                />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td> 3 </td>

                                                            <td>
                                                                Auto populate details of earlier license(s)
                                                                granted to existing developer company/firm to
                                                                set up a colony under act of 1975.
                                                            </td>
                                                            <td align="center" size="large">
                                                                <input
                                                                    type="file"
                                                                    // onChange={((e)=> setEarlierDocN(e.target.value))}
                                                                    onChange={(e) => setFile({ file: e.target.files[0] })}
                                                                    class="employee-card-input"
                                                                />
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </Table>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            )}
                        </div>
                        {/* </Col> */}
                    </div>
                    {/* <div className="form-group col-md2 mt-4">
                    <button 
                        className="btn btn-success" 
                        style={{ float: "right" }} 
                        >
                    Submit
                    </button>
                </div> */}

                </FormStep>
            </div>
            <div style={{ disabled: "true", height: "30px", width: "100%", fontSize: "14px" }}></div>
            {showToast && <Toast error={showToast?.key === "error" ? true : false} label={error} isDleteBtn={true} onClose={() => { setShowToast(null); setError(null); }} />}
        </React.Fragment>
    );
};

export default DeveloperCapacity;