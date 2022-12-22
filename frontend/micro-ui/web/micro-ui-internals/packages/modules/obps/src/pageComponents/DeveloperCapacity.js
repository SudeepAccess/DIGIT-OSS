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
import FileUpload from '@mui/icons-material/FileUpload';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import DeleteIcon from '@mui/icons-material/Delete';
import { getDocShareholding } from "../../../tl/src/pages/employee/ScrutinyBasic/ScrutinyDevelopment/docview.helper";
import { MenuItem, Select } from "@mui/material";
const DeveloperCapacity = ({ t, config, onSelect, value, userType, formData }) => {
    const { pathname: url } = useLocation();
    let validation = {};
    const userInfo = Digit.UserService.getUser();
    console.log("USERNAME", userInfo?.info?.name);
    const devRegId = localStorage.getItem('devRegId');
    let isOpenLinkFlow = window.location.href.includes("openlink");
    const tenantId = Digit.ULBService.getCurrentTenantId();
    const stateId = Digit.ULBService.getStateId();
    const [data, setData] = useState();

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

    const { setValue, getValues, watch } = useForm();

    const DevelopersAllData = getValues();
    console.log("DEVEDATAGEGT", DevelopersAllData);
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
            console.log("log123ergergreg", developerDataGet);
            setData(developerDataGet);
            console.log("TECHEXP", developerDataGet?.devDetail[0]?.capacityDevelopAColony?.capacityDevelopColonyHdruAct?.sectorAndDevelopmentPlan);
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
            setTechnicalCapacityOutsideHaryana(developerDataGet?.devDetail[0]?.capacityDevelopAColony?.technicalCapacityOutsideHaryana);
            setTechnicalCapacityOutsideHaryanaDetails(developerDataGet?.devDetail[0]?.capacityDevelopAColony?.technicalCapacityOutsideHaryanaDetails || technicalCapacityOutsideHaryanaDetails)
            setTechnicalCapacitySoughtFromAnyColonizer({
                licNo: developerDataGet?.devDetail[0]?.capacityDevelopAColony?.obtainedLicense[0]?.licNo || "",
                dateOfGrantingLic: developerDataGet?.devDetail[0]?.capacityDevelopAColony?.obtainedLicense[0]?.dateOfGrantingLic || "",
                licValidity: developerDataGet?.devDetail[0]?.capacityDevelopAColony?.obtainedLicense[0]?.licValidity || "",
                purpose: developerDataGet?.devDetail[0]?.capacityDevelopAColony?.obtainedLicense[0]?.purpose || ""
            })
            setDocumentsData(developerDataGet?.devDetail[0]?.capacityDevelopAColony?.documents)
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getDeveloperData()
    }, []);

    const [Documents, setDocumentsData] = useState();
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
    const [townPlannerSign, setTownPlannerSign] = useState(formData?.LicneseDetails?.townPlannerSign || DevelopersAllData?.architectDegree || "")
    const [townPlannerDegree, setTownPlannerDegree] = useState(formData?.LicneseDetails?.townPlannerDegree || "")
    const [existingDeveloperAgreement, setExistingDev] = useState(formData?.LicneseDetails?.existingDeveloperAgreement || DevelopersAllData?.existingDeveloperAgreement || "")
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
    const [companyBalanceSheet, setCompanyBalanceSheet] = useState(DevelopersAllData?.companyBalanceSheet || "");
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
    const [hrduModalData, setHrduModalData] = useState({
        licNo: "",
        dateOfGrantingLic: "",
        purposeOfColony: "",
        licValidity: "",
        technicalExpertEngaged: "",
        engineerDegree: "",
        architectDegree: "",
        townPlannerDegree: "",
    })
    const [technicalCapacityOutsideHaryana, setTechnicalCapacityOutsideHaryana] = useState()
    const [technicalCapacityOutsideHaryanaDetails, setTechnicalCapacityOutsideHaryanaDetails] = useState({
        project: "",
        authority: "",
        statusOfDevelopment: ""
    })
    const [purposeOptions, setPurposeOptions] = useState({ data: [], isLoading: true });
    const [technicalCapacitySoughtFromAnyColonizer, setTechnicalCapacitySoughtFromAnyColonizer] = useState({
        licNo: "",
        dateOfGrantingLic: "",
        licValidity: "",
        purpose: ""
    })

    // console.log("LIC NO...",technicalCapacitySoughtFromAnyColonizer.licNo)
    const { data: PurposeType } = Digit.Hooks.obps.useMDMS(stateId, "common-masters", ["Purpose"]);

    useEffect(() => {
        const purpose = PurposeType?.["common-masters"]?.Purpose?.map(function (data) {
            return { value: data?.purposeCode, label: data?.name };
        });
        console.log("log123", purpose)
        setPurposeOptions({ data: purpose, isLoading: false });
    }, [PurposeType])

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
            console.log("getValues()=====", getValues(),{...Documents,...getValues()},Documents);
            setDocumentsData({...Documents,...getValues()});
            //   setLoader(false);

        } catch (error) {
            //   setLoader(false);
            console.log(error.message);
        }
    };

    const getDocData = async () => {
        if ((Documents?.sectorAndDevelopmentPlan !== null || Documents?.sectorAndDevelopmentPlan !== undefined) && (sectorAndDevelopmentPlan !== null || sectorAndDevelopmentPlan !== "")) {
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
        if ((Documents?.validatingLicence !== null || Documents?.validatingLicence !== undefined) && (validatingLicence !== null || validatingLicence !== "")) {

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
        if ((Documents?.statusOfDevelopment !== null || Documents?.statusOfDevelopment !== undefined) && (statusOfDevelopment !== null || statusOfDevelopment !== "")) {

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
        if ((Documents?.outstandingDues !== null || Documents?.outstandingDues !== undefined) && (outstandingDues !== null || outstandingDues !== "")) {

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
        if ((DevelopersAllData?.companyBalanceSheet !== null || DevelopersAllData?.companyBalanceSheet !== undefined) && (companyBalanceSheet !== null || companyBalanceSheet !== "")) {

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
        if ((DevelopersAllData?.paidUpCapital !== null || DevelopersAllData?.paidUpCapital !== undefined) && (paidUpCapital !== null || paidUpCapital !== "")) {

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
        if ((DevelopersAllData?.individualCertificateCA !== null || DevelopersAllData?.individualCertificateCA !== undefined) && (individualCertificateCA !== null || individualCertificateCA !== "")) {

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
        if ((DevelopersAllData?.engineerSign !== null || DevelopersAllData?.engineerSign !== undefined) && (engineerSign !== null || engineerSign !== "")) {

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
        if ((DevelopersAllData?.architectSign !== null || DevelopersAllData?.architectSign !== undefined) && (architectSign !== null || architectSign !== "")) {

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
        if ((DevelopersAllData?.townPlannerSign !== null || DevelopersAllData?.townPlannerSign !== undefined) && (townPlannerSign !== null || townPlannerSign !== "")) {

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
        if ((DevelopersAllData?.agreementDoc !== null || DevelopersAllData?.agreementDoc !== undefined) && (agreementDoc !== null || agreementDoc !== "")) {

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
        if ((DevelopersAllData?.boardDoc !== null || DevelopersAllData?.boardDoc !== undefined) && (boardDoc !== null || boardDoc !== "")) {

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
        if ((DevelopersAllData?.registeredDoc !== null || DevelopersAllData?.registeredDoc !== undefined) && (registeredDoc !== null || registeredDoc !== "")) {

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
        if ((DevelopersAllData?.boardDocY !== null || DevelopersAllData?.boardDocY !== undefined) && (boardDocY !== null || boardDocY !== "")) {

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
        if ((DevelopersAllData?.earlierDocY !== null || DevelopersAllData?.earlierDocY !== undefined) && (earlierDocY !== null || earlierDocY !== "")) {

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

        if (hrduModalData.licNo && hrduModalData.licValidity && hrduModalData.dateOfGrantingLic && purposeOfColony && hrduModalData.technicalExpertEngaged) {

            const values = {

                licenceNumber: hrduModalData.licNo,
                dateOfGrantingLic: hrduModalData.dateOfGrantingLic,
                purposeOfColony: purposeOfColony,
                // sectorAndDevelopmentPlan: Documents?.sectorAndDevelopmentPlan,
                licValidity: hrduModalData.licValidity,
                technicalExpertEngaged: hrduModalData.technicalExpertEngaged,
                engineerDegree: Documents?.engineerDegree,
                architectDegree: Documents?.architectDegree,
                townPlannerDegree: Documents?.townPlannerDegree

            }
            setModalCapacityDevelopColonyHdruAct((prev) => [...prev, values]);
            console.log("WIHT DOC", values);
            getDocData();
            getDocValidLic();
            handleCloseCapacityDevelopColony()
            setHrduModalData({
                licNo: "",
                dateOfGrantingLic: "",
                purposeOfColony: "",
                licValidity: "",
                technicalExpertEngaged: "",
                engineerDegree: "",
                architectDegree: "",
                townPlannerDegree: ""
            })
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
                        // capacityDevelopColonyLawAct: capacityDevelopColonyLawAct,
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
                            technicalAssistanceAgreementDoc: technicalAssistanceAgreementDoc,
                            licNo: technicalCapacitySoughtFromAnyColonizer.licNo,
                            dateOfGrantingLic: technicalCapacitySoughtFromAnyColonizer.dateOfGrantingLic,
                            licValidity: technicalCapacitySoughtFromAnyColonizer.licValidity,
                            purpose: technicalCapacitySoughtFromAnyColonizer.purpose
                        }],
                        technicalCapacityOutsideHaryana: technicalCapacityOutsideHaryana,
                        technicalCapacityOutsideHaryanaDetails: technicalCapacityOutsideHaryanaDetails,
                        documents: Documents
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
                {/* {JSON.stringify(data?.devDetail[0]?.addInfo?.showDevTypeFields)}efwefewfewf
                {JSON.stringify(data)}efewfewf */}
                {isopenlink && <BackButton style={{ border: "none" }}>{t("CS_COMMON_BACK")}</BackButton>}
                <Timeline currentStep={4} flow="STAKEHOLDER" />
                <FormStep
                    config={config}
                    onSelect={goNext}
                    onSkip={onSkip}
                    t={t}
                    isDisabled={
                        ((data?.devDetail[0]?.addInfo?.showDevTypeFields === "Individual" || data?.devDetail[0]?.addInfo?.showDevTypeFields === "Proprietorship Firm") ? (!Documents?.companyBalanceSheet || !Documents?.individualCertificateCA) : (data?.devDetail[0]?.addInfo?.showDevTypeFields === "Company" || data?.devDetail[0]?.addInfo?.showDevTypeFields === "Society" || data?.devDetail[0]?.addInfo?.showDevTypeFields === "Trust" || data?.devDetail[0]?.addInfo?.showDevTypeFields === "Institution") ? (!Documents?.companyBalanceSheet || !Documents?.paidUpCapital) : (data?.devDetail[0]?.addInfo?.showDevTypeFields === "Limited Liability Partnership" || data?.devDetail[0]?.addInfo?.showDevTypeFields === "Firm" || data?.devDetail[0]?.addInfo?.showDevTypeFields === "Partnership Firm") ? (!Documents?.netWorthOfPartners || !Documents?.netWorthOfFirm) : true) || ((permissionGrantedHRDU === "Y" && capacityDevelopColonyHdruAct.length) ? false : permissionGrantedHRDU === "N" ? false : true) || ((technicalCapacityOutsideHaryana === "Y" && technicalCapacityOutsideHaryanaDetails.authority && technicalCapacityOutsideHaryanaDetails.project && technicalCapacityOutsideHaryanaDetails.statusOfDevelopment) ? false : technicalCapacityOutsideHaryana === "N" ? false : true) ||  ((technicalExpert === "Y" && engineerName && engineerQualification && architectName && architectQualification && townPlannerName && townPlannerQualification) ? false : true || (!Documents?.engineerSign && !Documents?.architectSign && !Documents?.townPlannerSign ? true : false) || ( technicalExpert === "N" ? false : true))
                    }
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

                    {(data?.devDetail[0]?.addInfo?.showDevTypeFields === "Individual" || data?.devDetail[0]?.addInfo?.showDevTypeFields === "Proprietorship Firm") && (
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
                                                    Net Worth in case of individual certified by CA/ Or Income tax return in case of an individual (for the last three years) <span className="text-danger font-weight-bold">*</span>
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
                                                        {Documents?.individualCertificateCA ?
                                                            <a onClick={() => getDocShareholding(Documents?.individualCertificateCA)} className="btn btn-sm col-md-6">
                                                                <VisibilityIcon color="info" className="icon" />
                                                            </a> : <p></p>
                                                        }
                                                        <div className="btn btn-sm col-md-6">
                                                            <label for="individualCertificateCA"> <FileUpload color="primary" /></label>
                                                            <input
                                                                id="individualCertificateCA"
                                                                type="file"
                                                                // accept="application/pdf"
                                                                style={{ display: "none" }}
                                                                onChange={(e) => getDocumentData(e?.target?.files[0], "individualCertificateCA")}
                                                            />
                                                        </div>
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
                                                        {Documents?.companyBalanceSheet ?
                                                            <a onClick={() => getDocShareholding(Documents?.companyBalanceSheet)} className="btn btn-sm col-md-6">
                                                                <VisibilityIcon color="info" className="icon" />
                                                            </a> : <p></p>
                                                        }
                                                        <div className="btn btn-sm col-md-6">
                                                            <label for="companyBalanceSheet"> <FileUpload color="primary" /></label>
                                                            <input
                                                                id="companyBalanceSheet"
                                                                type="file"
                                                                accept="addplication/pdf"
                                                                style={{ display: "none" }}
                                                                onChange={(e) => getDocumentData(e?.target?.files[0], "companyBalanceSheet")}
                                                            />
                                                        </div>
                                                    </div>

                                                </td>
                                            </tr>

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>)}
                    {(data?.devDetail[0]?.addInfo?.showDevTypeFields === "Company" || data?.devDetail[0]?.addInfo?.showDevTypeFields === "Society" || data?.devDetail[0]?.addInfo?.showDevTypeFields === "Trust" || data?.devDetail[0]?.addInfo?.showDevTypeFields === "Institution") && (
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

                                            {/* <tr>
                                                <td> 1 </td>
                                                <td>Copy of memorandum/Articles of Association/ any other document of developer (if other than an individual)</td>
                                                
                                                <td align="center" size="large">

                                                    <div className="row">
                                                        {Documents?.copyOfMemorandum ?
                                                            <button type="button" onClick={()=>getDocShareholding(Documents?.copyOfMemorandum)} className="btn btn-sm col-md-6">
                                                                <VisibilityIcon color="info" className="icon" />
                                                            </button> : <p></p>
                                                        }
                                                        <div className="btn btn-sm col-md-6">
                                                            <label for="copyOfMemorandum"> <FileUpload color="primary" /></label>
                                                            <input
                                                                id="copyOfMemorandum"
                                                                type="file"
                                                                accept="application/pdf"
                                                                style={{ display: "none" }}
                                                                onChange={(e) => getDocumentData(e?.target?.files[0], "copyOfMemorandum")}
                                                            />
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>

                                            <tr>
                                                <td> 2 </td>
                                                <td>In the case of the firm/LLP, a copy of the registered irrevocable partnership deed </td>
                                                
                                                <td align="center" size="large">

                                                    <div className="row">
                                                        {Documents?.registeredIrrevocablePartnershipDeed ?
                                                            <button type="button" onClick={()=>getDocShareholding(Documents?.registeredIrrevocablePartnershipDeed)} className="btn btn-sm col-md-6">
                                                                <VisibilityIcon color="info" className="icon" />
                                                            </button> : <p></p>
                                                        }
                                                        <div className="btn btn-sm col-md-6">
                                                            <label for="registeredIrrevocablePartnershipDeed"> <FileUpload color="primary" /></label>
                                                            <input
                                                                id="registeredIrrevocablePartnershipDeed"
                                                                type="file"
                                                                accept="application/pdf"
                                                                style={{ display: "none" }}
                                                                onChange={(e) => getDocumentData(e?.target?.files[0], "registeredIrrevocablePartnershipDeed")}
                                                            />
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>

                                            <tr>
                                                <td> 3 </td>
                                                <td>In the case of HUF, a copy of the affidavit and a copy of the PAN card </td>
                                                
                                                <td align="center" size="large">

                                                    <div className="row">
                                                        {Documents?.copyOfAffidavitAndPAN ?
                                                            <button type="button" onClick={()=>getDocShareholding(Documents?.copyOfAffidavitAndPAN)} className="btn btn-sm col-md-6">
                                                                <VisibilityIcon color="info" className="icon" />
                                                            </button> : <p></p>
                                                        }
                                                        <div className="btn btn-sm col-md-6">
                                                            <label for="copyOfAffidavitAndPAN"> <FileUpload color="primary" /></label>
                                                            <input
                                                                id="copyOfAffidavitAndPAN"
                                                                type="file"
                                                                accept="application/pdf"
                                                                style={{ display: "none" }}
                                                                onChange={(e) => getDocumentData(e?.target?.files[0], "copyOfAffidavitAndPAN")}
                                                            />
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>

                                            <tr>
                                                <td> 4 </td>
                                                <td>In case of technical capacity sought from another company/firm who has already obtained a license(s) under the act of 1975 </td>
                                                
                                                <td align="center" size="large">

                                                    <div className="row">
                                                        {Documents?.companyBalanceSheet ?
                                                            <button type="button" onClick={()=>getDocShareholding(Documents?.companyBalanceSheet)} className="btn btn-sm col-md-6">
                                                                <VisibilityIcon color="info" className="icon" />
                                                            </button> : <p></p>
                                                        }
                                                        <div className="btn btn-sm col-md-6">
                                                            <label for="uploadBalanceDoc"> <FileUpload color="primary" /></label>
                                                            <input
                                                                id="uploadBalanceDoc"
                                                                type="file"
                                                                accept="application/pdf"
                                                                style={{ display: "none" }}
                                                                onChange={(e) => getDocumentData(e?.target?.files[0], "companyBalanceSheet")}
                                                            />
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr> */}

                                            {/* <tr>
                                                <td> 1 </td>
                                                <td>Balance sheet of last 3 years </td>
                                               
                                                <td align="center" size="large">

                                                    <div className="row">
                                                        {Documents?.companyBalanceSheet ?
                                                            <button type="button" onClick={()=>getDocShareholding(Documents?.companyBalanceSheet)} className="btn btn-sm col-md-6">
                                                                <VisibilityIcon color="info" className="icon" />
                                                            </button> : <p></p>
                                                        }
                                                        <div className="btn btn-sm col-md-6">
                                                            <label for="uploadBalanceDoc"> <FileUpload color="primary" /></label>
                                                            <input
                                                                id="uploadBalanceDoc"
                                                                type="file"
                                                                accept="application/pdf"
                                                                style={{ display: "none" }}
                                                                onChange={(e) => getDocumentData(e?.target?.files[0], "companyBalanceSheet")}
                                                            />
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr> */}

                                            {/* <tr>
                                                <td> 1 </td>
                                                <td>Balance sheet of last 3 years </td>
                                               
                                                <td align="center" size="large">

                                                    <div className="row">
                                                        {Documents?.companyBalanceSheet ?
                                                            <button type="button" onClick={()=>getDocShareholding(Documents?.companyBalanceSheet)} className="btn btn-sm col-md-6">
                                                                <VisibilityIcon color="info" className="icon" />
                                                            </button> : <p></p>
                                                        }
                                                        <div className="btn btn-sm col-md-6">
                                                            <label for="uploadBalanceDoc"> <FileUpload color="primary" /></label>
                                                            <input
                                                                id="uploadBalanceDoc"
                                                                type="file"
                                                                accept="application/pdf"
                                                                style={{ display: "none" }}
                                                                onChange={(e) => getDocumentData(e?.target?.files[0], "companyBalanceSheet")}
                                                            />
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr> */}


                                            <tr>
                                                <td> 1 </td>
                                                <td>Balance sheet of last 3 years <span className="text-danger font-weight-bold">*</span></td>
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
                                                        {Documents?.companyBalanceSheet ?
                                                            <a  onClick={() => getDocShareholding(Documents?.companyBalanceSheet)} className="btn btn-sm col-md-6">
                                                                <VisibilityIcon color="info" className="icon" />
                                                            </a> : <p></p>
                                                        }
                                                        <div className="btn btn-sm col-md-6">
                                                            <label for="uploadBalanceDoc"> <FileUpload color="primary" /></label>
                                                            <input
                                                                id="uploadBalanceDoc"
                                                                type="file"
                                                                accept="application/pdf"
                                                                style={{ display: "none" }}
                                                                onChange={(e) => getDocumentData(e?.target?.files[0], "companyBalanceSheet")}
                                                            />
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td> 2 </td>
                                                <td>Ps-3(Representing Paid-UP capital) <span className="text-danger font-weight-bold">*</span></td>
                                                {/* <td>
                                                    <input
                                                        type="file"
                                                        name="paidUpCapital"
                                                        placeholder=""
                                                        class="employee-card-input"
                                                        onChange={(e) => getDocumentData(e?.target?.files[0], "paidUpCapital")}
                                                    />
                                                </td> */}
                                                <td align="center" size="large">
                                                    <div className="row">

                                                        {Documents?.paidUpCapital ?
                                                            <a onClick={() => getDocShareholding(Documents?.paidUpCapital)} className="btn btn-sm col-md-6">
                                                                <VisibilityIcon color="info" className="icon" />
                                                            </a> : <p></p>
                                                        }
                                                        <div className="btn btn-sm col-md-6">
                                                            <label for="uploadPaidUpDoc"> <FileUpload color="primary" /></label>
                                                            <input
                                                                id="uploadPaidUpDoc"
                                                                type="file"
                                                                accept="application/pdf"
                                                                style={{ display: "none" }}
                                                                onChange={(e) => getDocumentData(e?.target?.files[0], "paidUpCapital")}
                                                            />
                                                        </div>
                                                    </div>

                                                </td>
                                            </tr>

                                            <tr>
                                                <td> 3 </td>
                                                <td>Reserves and surpluses <span className="text-danger font-weight-bold">*</span></td>
                                                {/* <td>
                                                    <input
                                                        type="file"
                                                        name="paidUpCapital"
                                                        placeholder=""
                                                        class="employee-card-input"
                                                        onChange={(e) => getDocumentData(e?.target?.files[0], "paidUpCapital")}
                                                    />
                                                </td> */}
                                                <td align="center" size="large">
                                                    <div className="row">

                                                        {Documents?.reservesAndSurplus ?
                                                            <a onClick={() => getDocShareholding(Documents?.reservesAndSurplus)} className="btn btn-sm col-md-6">
                                                                <VisibilityIcon color="info" className="icon" />
                                                            </a> : <p></p>
                                                        }
                                                        <div className="btn btn-sm col-md-6">
                                                            <label for="reservesAndSurplus"> <FileUpload color="primary" /></label>
                                                            <input
                                                                id="reservesAndSurplus"
                                                                type="file"
                                                                accept="application/pdf"
                                                                style={{ display: "none" }}
                                                                onChange={(e) => getDocumentData(e?.target?.files[0], "reservesAndSurplus")}
                                                            />
                                                        </div>
                                                    </div>

                                                </td>
                                            </tr>

                                            <tr>
                                                <td> 4 </td>
                                                <td>Any other documents (in the case of the company) <span className="text-danger font-weight-bold">*</span></td>
                                                {/* <td>
                                                    <input
                                                        type="file"
                                                        name="paidUpCapital"
                                                        placeholder=""
                                                        class="employee-card-input"
                                                        onChange={(e) => getDocumentData(e?.target?.files[0], "paidUpCapital")}
                                                    />
                                                </td> */}
                                                <td align="center" size="large">
                                                    <div className="row">

                                                        {Documents?.anyOtherDoc ?
                                                            <a onClick={() => getDocShareholding(Documents?.anyOtherDoc)} className="btn btn-sm col-md-6">
                                                                <VisibilityIcon color="info" className="icon" />
                                                            </a> : <p></p>
                                                        }
                                                        <div className="btn btn-sm col-md-6">
                                                            <label for="anyOtherDoc"> <FileUpload color="primary" /></label>
                                                            <input
                                                                id="anyOtherDoc"
                                                                type="file"
                                                                accept="application/pdf"
                                                                style={{ display: "none" }}
                                                                onChange={(e) => getDocumentData(e?.target?.files[0], "anyOtherDoc")}
                                                            />
                                                        </div>
                                                    </div>

                                                </td>
                                            </tr>


                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>)}
                    {(data?.devDetail[0]?.addInfo?.showDevTypeFields === "Limited Liability Partnership" || data?.devDetail[0]?.addInfo?.showDevTypeFields === "Firm" || data?.devDetail[0]?.addInfo?.showDevTypeFields === "Partnership Firm") && (
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
                                                <td>Networth of partners <span className="text-danger font-weight-bold">*</span></td>
                                                <td align="center" size="large">
                                                    <div className="row">

                                                        {Documents?.netWorthOfPartners ?
                                                            <a onClick={() => getDocShareholding(Documents?.netWorthOfPartners)} className="btn btn-sm col-md-6">
                                                                <VisibilityIcon color="info" className="icon" />
                                                            </a> : <p></p>
                                                        }
                                                        <div className="btn btn-sm col-md-6">
                                                            <label for="netWorthOfPartners"> <FileUpload color="primary" /></label>
                                                            <input
                                                                id="netWorthOfPartners"
                                                                type="file"
                                                                accept="application/pdf"
                                                                style={{ display: "none" }}
                                                                onChange={(e) => getDocumentData(e?.target?.files[0], "netWorthOfPartners")}
                                                            />
                                                        </div>
                                                    </div>

                                                </td>
                                            </tr>
                                            <tr>
                                                <td> 2 </td>
                                                <td>Net worth of firm <span className="text-danger font-weight-bold">*</span></td>
                                                <td align="center" size="large">
                                                    <div className="row">

                                                        {Documents?.netWorthOfFirm ?
                                                            <a onClick={() => getDocShareholding(Documents?.netWorthOfFirm)} className="btn btn-sm col-md-6">
                                                                <VisibilityIcon color="info" className="icon" />
                                                            </a> : <p></p>
                                                        }
                                                        <div className="btn btn-sm col-md-6">
                                                            <label for="netWorthOfFirm"> <FileUpload color="primary" /></label>
                                                            <input
                                                                id="netWorthOfFirm"
                                                                type="file"
                                                                accept="application/pdf"
                                                                style={{ display: "none" }}
                                                                onChange={(e) => getDocumentData(e?.target?.files[0], "netWorthOfFirm")}
                                                            />
                                                        </div>
                                                    </div>

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
                        {(data?.devDetail[0]?.addInfo?.showDevTypeFields === "Individual" || data?.devDetail[0]?.addInfo?.showDevTypeFields === "Proprietorship Firm") && (
                        <p className="ml-1">(i) Whether the Developer has
                            earlier been granted permission to set up a colony under HDRU
                            Act, 1975: <span className="text-danger font-weight-bold">*</span>
                        </p>)}
                        {(data?.devDetail[0]?.addInfo?.showDevTypeFields === "Company" || data?.devDetail[0]?.addInfo?.showDevTypeFields === "Society" || data?.devDetail[0]?.addInfo?.showDevTypeFields === "Trust" || data?.devDetail[0]?.addInfo?.showDevTypeFields === "Institution" || data?.devDetail[0]?.addInfo?.showDevTypeFields === "Limited Liability Partnership" || data?.devDetail[0]?.addInfo?.showDevTypeFields === "Firm" || data?.devDetail[0]?.addInfo?.showDevTypeFields === "Partnership Firm") && (
                        <p className="ml-1">(i) Whether the Developer/ group company has
                            earlier been granted permission to set up a colony under HDRU
                            Act, 1975: <span className="text-danger font-weight-bold">*</span>
                        </p>)}
                        <div className="form-group ml-1">
                            <input
                                type="radio"
                                value="Y"
                                checked={permissionGrantedHRDU === "Y" ? true : false}
                                id="permissionGrantedHRDU"
                                className="mx-2 mt-1"
                                onChange={changeValueHrdu}
                                name="permissionGrantedHRDU"
                            />
                            <label for="Yes">Yes</label>

                            <input
                                type="radio"
                                value="N"
                                checked={permissionGrantedHRDU === "N" ? true : false}
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
                                                    <th> Licence No. </th>
                                                    <th>Date of grant of license</th>
                                                    <th>Purpose of colony</th>
                                                    <th>Validity of Licence</th>
                                                    <th>Technical Expert Engaged</th>
                                                    <th>Degrees of Engineer</th>
                                                    <th>Degrees of Architect</th>
                                                    <th>Degrees of Town Planner</th>
                                                    <th>Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    (capacityDevelopColonyHdruAct.length > 0) ?
                                                        capacityDevelopColonyHdruAct?.map((elementInArray, input) => {
                                                            return (
                                                                <tr>

                                                                    <td>{input + 1}</td>
                                                                    <td>
                                                                        <input
                                                                            type="text"
                                                                            value={elementInArray?.licenceNumber}
                                                                            placeholder={elementInArray?.licenceNumber}
                                                                            class="employee-card-input"
                                                                        />
                                                                    </td>
                                                                    <td>
                                                                        <input
                                                                            type="text"
                                                                            value={elementInArray?.dateOfGrantingLic}
                                                                            placeholder={elementInArray?.dateOfGrantingLic}
                                                                            class="employee-card-input"
                                                                        />
                                                                    </td>
                                                                    <td>
                                                                        <input
                                                                            type="text"
                                                                            value={elementInArray?.purposeOfColony}
                                                                            placeholder={elementInArray?.purposeOfColony}
                                                                            class="employee-card-input"
                                                                        />
                                                                    </td>
                                                                    <td>
                                                                        <input
                                                                            type="text"
                                                                            value={elementInArray?.licValidity}
                                                                            placeholder={elementInArray?.licValidity}
                                                                            class="employee-card-input"
                                                                        />
                                                                    </td>
                                                                    <td>
                                                                        <p>{elementInArray?.technicalExpertEngaged === "Y" ? "Yes" : "No"}</p>
                                                                    </td>
                                                                    <td>
                                                                        <div className="row">
                                                                            {elementInArray.engineerDegree ?
                                                                                <a 
                                                                                    onClick={() => getDocShareholding(elementInArray.engineerDegree)}
                                                                                    className="btn btn-sm col-md-6">
                                                                                    <VisibilityIcon color="info" className="icon" />
                                                                                </a> : <p></p>
                                                                            }

                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div className="row">
                                                                            {elementInArray.architectDegree ?
                                                                                <a 
                                                                                    onClick={() => getDocShareholding(elementInArray.architectDegree)}
                                                                                    className="btn btn-sm col-md-6">
                                                                                    <VisibilityIcon color="info" className="icon" />
                                                                                </a> : <p></p>
                                                                            }

                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div className="row">
                                                                            {elementInArray.townPlannerDegree ?
                                                                                <a 
                                                                                    onClick={() => getDocShareholding(elementInArray.townPlannerDegree)} className="btn btn-sm col-md-6">
                                                                                    <VisibilityIcon color="info" className="icon" />
                                                                                </a> : <p></p>
                                                                            }

                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <button type="button"
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
                                            <button type="button"
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
                                                    <Modal.Title>Add</Modal.Title>
                                                </Modal.Header>
                                                <Modal.Body>
                                                    <form className="text1">
                                                        <Row>
                                                            <Col md={4} xxl lg="4">
                                                                <label htmlFor="name" className="text">Licence No.</label>
                                                                <input
                                                                    type="text"
                                                                    value={hrduModalData.licNo}
                                                                    onChange={(e) => setHrduModalData({ ...hrduModalData, licNo: e.target.value })}
                                                                    placeholder=""
                                                                    class="employee-card-input"
                                                                    required="required"
                                                                />
                                                            </Col>
                                                            <Col md={4} xxl lg="4">
                                                                <label htmlFor="name" className="text">Date of grant of a license</label>
                                                                <input
                                                                    type="date"
                                                                    value={hrduModalData.dateOfGrantingLic}
                                                                    onChange={(e) => setHrduModalData({ ...hrduModalData, dateOfGrantingLic: e.target.value })}
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
                                                                {/* <Dropdown
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
                                                                /> */}
                                                                <Select
                                                                    value={purposeOfColony}
                                                                    onChange={(e) => setShowPurposeType(e.target.value)}
                                                                    className="w-100"
                                                                    variant="standard"
                                                                >
                                                                    {
                                                                        purposeOptions?.data?.map((item, index) => (
                                                                            <MenuItem value={item.value} >{item?.label}</MenuItem>
                                                                        ))
                                                                    }
                                                                </Select>
                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                            {/* <Col md={4} xxl lg="4">
                                                                <label htmlFor="name" className="text">Sector and development plan</label> */}
                                                            {/* <input
                                                                    type="file"
                                                                    accept="application/pdf"
                                                                    // onChange={(e) => setModalDevPlan(e.target.value)}
                                                                    onChange={(e) => setFile({ file: e.target.files[0] })}
                                                                    placeholder=""
                                                                    class="employee-card-input"
                                                                /> */}
                                                            {/* <input
                                                                    type="file"
                                                                    className="form-control"
                                                                    name="sectorAndDevelopmentPlan"
                                                                    // {...register("thirdPartyDoc")}
                                                                    onChange={(e) => getDocumentData(e?.target?.files[0], "sectorAndDevelopmentPlan")}
                                                                />
                                                            </Col> */}
                                                            <Col md={4} xxl lg="4">
                                                                <label htmlFor="name" className="text">Validity of licence </label>
                                                                <input
                                                                    type="date"
                                                                    name="validatingLicence"
                                                                    value={hrduModalData.licValidity}
                                                                    onChange={(e) => setHrduModalData({ ...hrduModalData, licValidity: e.target.value })}
                                                                    placeholder=""
                                                                    class="employee-card-input"
                                                                />

                                                            </Col>

                                                        </Row>

                                                        <p>(iii) Whether any technical expert(s) engaged</p>

                                                        <div className="form-group">
                                                            <input
                                                                type="radio"
                                                                value="Y"
                                                                id="technicalExpert"
                                                                className="mx-2 mt-1"
                                                                onChange={(e) => setHrduModalData({ ...hrduModalData, technicalExpertEngaged: e.target.value })}
                                                                name="technicalExpert"
                                                            />
                                                            <label for="Yes">Yes</label>

                                                            <input
                                                                type="radio"
                                                                value="N"
                                                                id="technicalExpertN"
                                                                className="mx-2 mt-1"
                                                                onChange={(e) => setHrduModalData({ ...hrduModalData, technicalExpertEngaged: e.target.value })}
                                                                name="technicalExpert"
                                                            />
                                                            <label for="No">No</label>
                                                        </div>

                                                        {
                                                            hrduModalData.technicalExpertEngaged === "Y" &&
                                                            <Row>
                                                                <Col md={4} xxl lg="4">
                                                                    <label htmlFor="name" className="text"> Copy of degree of engineer </label>
                                                                    <input
                                                                        type="file"
                                                                        accept="application/pdf"
                                                                        name="validatingLicence"
                                                                        onChange={(e) => getDocumentData(e?.target?.files[0], "engineerDegree")}
                                                                        placeholder=""
                                                                        class="employee-card-input"
                                                                    />

                                                                </Col>
                                                                <Col md={4} xxl lg="4">
                                                                    <label htmlFor="name" className="text"> Copy of degree of architect </label>
                                                                    <input
                                                                        type="file"
                                                                        accept="application/pdf"
                                                                        name="validatingLicence"
                                                                        onChange={(e) => getDocumentData(e?.target?.files[0], "architectDegree")}
                                                                        placeholder=""
                                                                        class="employee-card-input"
                                                                    />

                                                                </Col>
                                                                <Col md={4} xxl lg="4">
                                                                    <label htmlFor="name" className="text"> Copy of degree of Town planer </label>
                                                                    <input
                                                                        type="file"
                                                                        accept="application/pdf"
                                                                        name="validatingLicence"
                                                                        onChange={(e) => getDocumentData(e?.target?.files[0], "townPlannerDegree")}
                                                                        placeholder=""
                                                                        class="employee-card-input"
                                                                    />

                                                                </Col>
                                                            </Row>
                                                        }

                                                    </form>
                                                </Modal.Body>
                                                <Modal.Footer>
                                                    <Button variant="secondary" onClick={handleCloseCapacityDevelopColony}>
                                                        Close
                                                    </Button>
                                                    <Button
                                                        disabled={!(hrduModalData.licNo && hrduModalData.licValidity && hrduModalData.dateOfGrantingLic && purposeOfColony && hrduModalData.technicalExpertEngaged)}
                                                        variant="primary" onClick={handleArrayValues}>
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

                        {(permissionGrantedHRDU === "N" ) && (
                        <div>
                            {(data?.devDetail[0]?.addInfo?.showDevTypeFields === "Individual" || data?.devDetail[0]?.addInfo?.showDevTypeFields === "Proprietorship Firm") && (
                            <p>
                                (ii) Whether you hold designation of
                                director/partner in any other company/firm who has already
                                obtained license(s) under act of 1975: <span className="text-danger font-weight-bold">*</span>
                            </p>)}
                            {(data?.devDetail[0]?.addInfo?.showDevTypeFields === "Company" || data?.devDetail[0]?.addInfo?.showDevTypeFields === "Society" || data?.devDetail[0]?.addInfo?.showDevTypeFields === "Trust" || data?.devDetail[0]?.addInfo?.showDevTypeFields === "Institution" || data?.devDetail[0]?.addInfo?.showDevTypeFields === "Limited Liability Partnership" || data?.devDetail[0]?.addInfo?.showDevTypeFields === "Firm" || data?.devDetail[0]?.addInfo?.showDevTypeFields === "Partnership Firm") && (
                            <p>
                                (ii) If director/partner of the proposed
                                developer company/firm also holds designation of
                                director/partner in any other company/firm who has already
                                obtained license(s) under act of 1975: <span className="text-danger font-weight-bold">*</span>
                            </p>)}

                            <div className="form-group">
                                <input
                                    type="radio"
                                    value="Y"
                                    checked={designatedDirectors === "Y" ? true : false}
                                    id="designatedDirectors"
                                    className="mx-2 mt-1"
                                    onChange={changeDesignatedDirectors}
                                    name="designatedDirectors"
                                />
                                <label for="Yes">Yes</label>

                                <input
                                    type="radio"
                                    value="N"
                                    checked={designatedDirectors === "N" ? true : false}
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
                                                                    <label for="agreementDocId"> <FileUpload color="primary" /></label>
                                                                    <input
                                                                        id="agreementDocId"
                                                                        type="file"
                                                                        name="agreementDoc"
                                                                        // accept="addplication/pdf"
                                                                        style={{ display: "none" }}
                                                                        onChange={(e) => getDocumentData(e?.target?.files[0], "agreementDoc")}
                                                                    />
                                                                    {/* <input
                                                                        type="file"
                                                                        name="agreementDoc"
                                                                        onChange={(e) => getDocumentData(e?.target?.files[0], "agreementDoc")}
                                                                        class="employee-card-input"
                                                                    /> */}
                                                                </td>
                                                                <td>
                                                                    {Documents?.agreementDoc ?
                                                                        <a  onClick={() => getDocShareholding(Documents?.agreementDoc)} className="btn btn-sm col-md-6">
                                                                            <VisibilityIcon color="info" className="icon" />
                                                                        </a> : <p></p>
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
                                                                    <label for="boardDocId"> <FileUpload color="primary" /></label>
                                                                    <input
                                                                        id="boardDocId"
                                                                        type="file"
                                                                        name="boardDoc"
                                                                        // accept="addplication/pdf"
                                                                        style={{ display: "none" }}
                                                                        onChange={(e) => getDocumentData(e?.target?.files[0], "boardDoc")}
                                                                    />
                                                                    {/* <input
                                                                        type="file"
                                                                        name="boardDoc"
                                                                        onChange={(e) => getDocumentData(e?.target?.files[0], "boardDoc")}
                                                                        class="employee-card-input"
                                                                    /> */}
                                                                </td>
                                                                <td>
                                                                    {Documents?.boardDoc ?
                                                                        <a  onClick={() => getDocShareholding(Documents?.boardDoc)} className="btn btn-sm col-md-6">
                                                                            <VisibilityIcon color="info" className="icon" />
                                                                        </a> : <p></p>
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
                        </div>
                        )}

                        <div className="hl"></div>
                        {(data?.devDetail[0]?.addInfo?.showDevTypeFields === "Individual" || data?.devDetail[0]?.addInfo?.showDevTypeFields === "Proprietorship Firm") && (
                        <p>
                            (iii) Have you developed project in case of technical capacity of company/firm developed projects outside Haryana:- <span className="text-danger font-weight-bold">*</span>
                        </p>)}
                        {(data?.devDetail[0]?.addInfo?.showDevTypeFields === "Company" || data?.devDetail[0]?.addInfo?.showDevTypeFields === "Society" || data?.devDetail[0]?.addInfo?.showDevTypeFields === "Trust" || data?.devDetail[0]?.addInfo?.showDevTypeFields === "Institution" || data?.devDetail[0]?.addInfo?.showDevTypeFields === "Limited Liability Partnership" || data?.devDetail[0]?.addInfo?.showDevTypeFields === "Firm" || data?.devDetail[0]?.addInfo?.showDevTypeFields === "Partnership Firm") && (
                        <p>
                            (iii) In case of technical capacity of company/firm developed projects outside Haryana:- <span className="text-danger font-weight-bold">*</span>
                        </p>)}

                        <div className="form-group">
                            <input
                                type="radio"
                                value="Y"
                                checked={technicalCapacityOutsideHaryana === "Y" ? true : false}
                                id="technicalCapacityOutsideHaryana"
                                className="mx-2 mt-1"
                                onChange={(e) => setTechnicalCapacityOutsideHaryana(e.target.value)}
                                name="technicalCapacityOutsideHaryana"
                            />
                            <label for="Yes">Yes</label>

                            <input
                                type="radio"
                                value="N"
                                checked={technicalCapacityOutsideHaryana === "N" ? true : false}
                                id="technicalCapacityOutsideHaryanaN"
                                className="mx-2 mt-1"
                                onChange={(e) => setTechnicalCapacityOutsideHaryana(e.target.value)}
                                name="technicalCapacityOutsideHaryana"
                            />
                            <label for="No">No</label>
                            {technicalCapacityOutsideHaryana === "Y" && (
                                <Row>
                                    <Col md={4} xxl lg="4">
                                        <label htmlFor="project" className="text"> Project <span className="text-danger font-weight-bold">*</span></label>
                                        <input
                                            type="text"
                                            name="project"
                                            value={technicalCapacityOutsideHaryanaDetails.project}
                                            onChange={(e) => setTechnicalCapacityOutsideHaryanaDetails({ ...technicalCapacityOutsideHaryanaDetails, project: e.target.value })}
                                            placeholder=""
                                            class="employee-card-input"
                                        />

                                    </Col>

                                    <Col md={4} xxl lg="4">
                                        <label htmlFor="authority" className="text"> Authority <span className="text-danger font-weight-bold">*</span></label>
                                        <input
                                            type="text"
                                            name="authority"
                                            value={technicalCapacityOutsideHaryanaDetails.authority}
                                            onChange={(e) => setTechnicalCapacityOutsideHaryanaDetails({ ...technicalCapacityOutsideHaryanaDetails, authority: e.target.value })}
                                            placeholder=""
                                            class="employee-card-input"
                                        />

                                    </Col>

                                    <Col md={4} xxl lg="4">
                                        <label htmlFor="statusOfDevelopment" className="text">Status of Development <span className="text-danger font-weight-bold">*</span></label>
                                        <input
                                            type="text"
                                            name="statusOfDevelopment"
                                            value={technicalCapacityOutsideHaryanaDetails.statusOfDevelopment}
                                            onChange={(e) => setTechnicalCapacityOutsideHaryanaDetails({ ...technicalCapacityOutsideHaryanaDetails, statusOfDevelopment: e.target.value })}
                                            placeholder=""
                                            class="employee-card-input"
                                        />

                                    </Col>
                                </Row>
                            )}
                        </div>

                        <div className="hl"></div>
                        {(data?.devDetail[0]?.addInfo?.showDevTypeFields === "Company" || data?.devDetail[0]?.addInfo?.showDevTypeFields === "Society" || data?.devDetail[0]?.addInfo?.showDevTypeFields === "Trust" || data?.devDetail[0]?.addInfo?.showDevTypeFields === "Institution" || data?.devDetail[0]?.addInfo?.showDevTypeFields === "Limited Liability Partnership" || data?.devDetail[0]?.addInfo?.showDevTypeFields === "Firm" || data?.devDetail[0]?.addInfo?.showDevTypeFields === "Partnership Firm") && (
                        <div>

                        
                            <p>
                                (iv). In case of technical capacity sought from another
                                company/firm who has already obtained license(s) under act of
                                1975 or outside Haryana:<span className="text-danger font-weight-bold">*</span>
                            </p>
                            
                            <div className="form-group">
                                <input
                                    type="radio"
                                    value="Y"
                                    checked={alreadtObtainedLic === "Y" ? true : false}
                                    id="alreadtObtainedLic"
                                    className="mx-2 mt-1"
                                    onChange={changeAlreadyObtainedLic}
                                    name="alreadtObtainedLic"
                                />
                                <label for="Yes">Yes</label>

                                <input
                                    type="radio"
                                    value="N"
                                    checked={alreadtObtainedLic === "N" ? true : false}
                                    id="alreadtObtainedLicN"
                                    className="mx-2 mt-1"
                                    onChange={changeAlreadyObtainedLic}
                                    name="alreadtObtainedLic"
                                    onClick={handleshow6}
                                />
                                <label for="No">No</label>
                                {alreadtObtainedLic === "Y" && (
                                    <div>
                                        <div className="row ">
                                            <div className="form-group row">
                                                <div className="col-sm-12">
                                                    <Col xs="12" md="12" sm="12">
                                                        <div>
                                                            <Table className="table table-bordered" size="sm">
                                                                <thead>
                                                                    <tr>
                                                                        <th>S.No.</th>
                                                                        <th>Agreement </th>
                                                                        <th>Upload Document </th>
                                                                        <th>Annexure </th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    <tr>
                                                                        <td> 1 </td>

                                                                        <td>
                                                                            Agreement between the proposed developer and existing colonizer <span className="text-danger font-weight-bold">*</span>
                                                                        </td>
                                                                        <td align="center" size="large">
                                                                            <label for="agreementDocYId"> <FileUpload color="primary" /></label>
                                                                            <input
                                                                                id="agreementDocYId"
                                                                                type="file"
                                                                                name="agreementDocY"
                                                                                // accept="addplication/pdf"
                                                                                style={{ display: "none" }}
                                                                                onChange={(e) => getDocumentData(e?.target?.files[0], "agreementDocY")}
                                                                            />
                                                                            {/* <input
                                                                                type="file"
                                                                                name="agreementDocY"
                                                                                onChange={(e) => getDocumentData(e?.target?.files[0], "agreementDocY")}
                                                                                class="employee-card-input"
                                                                            /> */}
                                                                        </td>
                                                                        <td>
                                                                            {Documents?.agreementDocY ?
                                                                                <a
                                                                                    onClick={() => getDocShareholding(Documents?.agreementDocY)}
                                                                                >
                                                                                    <VisibilityIcon color="info" className="icon" />
                                                                                </a> : <p></p>
                                                                            }
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td> 2 </td>

                                                                        <td>
                                                                            Board resolution of authorised signatory of the existing colonizer <span className="text-danger font-weight-bold">*</span>
                                                                        </td>
                                                                        <td align="center" size="large">
                                                                            <label for="boardDocXId"> <FileUpload color="primary" /></label>
                                                                            <input
                                                                                id="boardDocXId"
                                                                                type="file"
                                                                                name="boardDocX"
                                                                                // accept="addplication/pdf"
                                                                                style={{ display: "none" }}
                                                                                onChange={(e) => getDocumentData(e?.target?.files[0], "boardDocX")}
                                                                            />
                                                                            {/* <input
                                                                                type="file"
                                                                                name="boardDocX"
                                                                                onChange={(e) => getDocumentData(e?.target?.files[0], "boardDocX")}
                                                                                class="employee-card-input"
                                                                            /> */}
                                                                        </td>
                                                                        <td>
                                                                            {Documents?.boardDocX ?
                                                                                <a
                                                                                    onClick={() => getDocShareholding(Documents?.boardDocX)}
                                                                                >
                                                                                    <VisibilityIcon color="info" className="icon" />
                                                                                </a> : <p></p>
                                                                            }
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td> 3 </td>
                                                                        <td> Registered and Irrevocable Agreement <span className="text-danger font-weight-bold">*</span></td>
                                                                        <td align="center" size="large">
                                                                            <label for="registeredDocId"> <FileUpload color="primary" /></label>
                                                                            <input
                                                                                id="registeredDocId"
                                                                                type="file"
                                                                                name="registeredDoc"
                                                                                // accept="addplication/pdf"
                                                                                style={{ display: "none" }}
                                                                                onChange={(e) => getDocumentData(e?.target?.files[0], "registeredDoc")}
                                                                            />
                                                                            {/* <input
                                                                                type="file"
                                                                                name="registeredDoc"
                                                                                onChange={(e) => getDocumentData(e?.target?.files[0], "registeredDoc")}
                                                                                class="employee-card-input"
                                                                            /> */}
                                                                        </td>
                                                                        <td>
                                                                            {Documents?.registeredDoc ?
                                                                                <a 
                                                                                    onClick={() => getDocShareholding(Documents?.registeredDoc)} >
                                                                                    <VisibilityIcon color="info" className="icon" />
                                                                                </a> : <p></p>
                                                                            }
                                                                        </td>
                                                                    </tr>

                                                                    <tr>
                                                                        <td> 4 </td>
                                                                        <td>
                                                                            Board resolutions of authorized signatory of
                                                                            firm/company provided technical assistance <span className="text-danger font-weight-bold">*</span>
                                                                        </td>
                                                                        <td align="center" size="large">
                                                                            <label for="boardDocYId"> <FileUpload color="primary" /></label>
                                                                            <input
                                                                                id="boardDocYId"
                                                                                type="file"
                                                                                name="boardDocY"
                                                                                // accept="addplication/pdf"
                                                                                style={{ display: "none" }}
                                                                                onChange={(e) => getDocumentData(e?.target?.files[0], "boardDocY")}
                                                                            />
                                                                            {/* <input
                                                                                type="file"
                                                                                onChange={(e) => getDocumentData(e?.target?.files[0], "boardDocY")}
                                                                                class="employee-card-input"
                                                                            /> */}
                                                                        </td>
                                                                        <td>
                                                                            {Documents?.boardDocY ?
                                                                                <a 
                                                                                    onClick={() => getDocShareholding(Documents?.boardDocY)}  >
                                                                                    <VisibilityIcon color="info" className="icon" />
                                                                                </a> : <p></p>
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

                                        <div className="row mx-1">
                                            <div className="col col-4">
                                                <div className="form-group">
                                                    <label htmlFor="licNo">License No. <span className="text-danger font-weight-bold">*</span></label>
                                                    <input
                                                        type="text"
                                                        name="licNo"
                                                        value={technicalCapacitySoughtFromAnyColonizer.licNo}
                                                        onChange={(e) => setTechnicalCapacitySoughtFromAnyColonizer({ ...technicalCapacitySoughtFromAnyColonizer, licNo: e.target.value })}
                                                        className="employee-card-input"
                                                        maxLength={10}
                                                    />
                                                </div>
                                            </div>

                                            <div className="col col-4">
                                                <div className="form-group">
                                                    <label htmlFor="licDate">Date <span className="text-danger font-weight-bold">*</span></label>
                                                    <input
                                                        type="date"
                                                        name="licDate"
                                                        value={technicalCapacitySoughtFromAnyColonizer.dateOfGrantingLic}
                                                        onChange={(e) => setTechnicalCapacitySoughtFromAnyColonizer({ ...technicalCapacitySoughtFromAnyColonizer, dateOfGrantingLic: e.target.value })}
                                                        className="employee-card-input"
                                                        maxLength={10}
                                                    />
                                                </div>
                                            </div>

                                            <div className="col col-4">
                                                <div className="form-group">
                                                    <label htmlFor="licValidity">Validity <span className="text-danger font-weight-bold">*</span></label>
                                                    <input
                                                        type="date"
                                                        name="licValidity"
                                                        value={technicalCapacitySoughtFromAnyColonizer.licValidity}
                                                        onChange={(e) => setTechnicalCapacitySoughtFromAnyColonizer({ ...technicalCapacitySoughtFromAnyColonizer, licValidity: e.target.value })}
                                                        className="employee-card-input"
                                                    // maxLength={10}
                                                    />
                                                </div>
                                            </div>

                                            <div className="col col-4">
                                                <div className="form-group">
                                                    <label htmlFor="licValidity">Purpose <span className="text-danger font-weight-bold">*</span></label>
                                                    <Select
                                                        value={technicalCapacitySoughtFromAnyColonizer.purpose}
                                                        onChange={(e) => setTechnicalCapacitySoughtFromAnyColonizer({ ...technicalCapacitySoughtFromAnyColonizer, purpose: e.target.value })}
                                                        className="w-100"
                                                        variant="standard"
                                                    >
                                                        {
                                                            purposeOptions?.data?.map((item, index) => (
                                                                <MenuItem value={item.value} >{item?.label}</MenuItem>
                                                            ))
                                                        }
                                                    </Select>

                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                )}
                            </div>
                        </div>
                        )}
                        <div className="mb-3"></div>
                        {(data?.devDetail[0]?.addInfo?.showDevTypeFields === "Individual" || data?.devDetail[0]?.addInfo?.showDevTypeFields === "Proprietorship Firm") && (
                        <p>(iv) Whether any technical expert(s) engaged <span className="text-danger font-weight-bold">*</span></p>
                        )}

                        {(data?.devDetail[0]?.addInfo?.showDevTypeFields === "Company" || data?.devDetail[0]?.addInfo?.showDevTypeFields === "Society" || data?.devDetail[0]?.addInfo?.showDevTypeFields === "Trust" || data?.devDetail[0]?.addInfo?.showDevTypeFields === "Institution" || data?.devDetail[0]?.addInfo?.showDevTypeFields === "Limited Liability Partnership" || data?.devDetail[0]?.addInfo?.showDevTypeFields === "Firm" || data?.devDetail[0]?.addInfo?.showDevTypeFields === "Partnership Firm") && (
                            <p>(v) Whether any technical expert(s) engaged <span className="text-danger font-weight-bold">*</span></p>
                        )}

                        <div className="form-group">
                            <input
                                type="radio"
                                value="Y"
                                checked={technicalExpert === "Y" ? true : false}
                                id="technicalExpert"
                                className="mx-2 mt-1"
                                onChange={changeTechnicalExpert}
                                name="technicalExpert"
                            />
                            <label for="Yes">Yes</label>

                            <input
                                type="radio"
                                value="N"
                                checked={technicalExpert === "N" ? true : false}
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
                                                            <th>Professional <span className="text-danger font-weight-bold">*</span> </th>
                                                            <th>Qualification <span className="text-danger font-weight-bold">*</span></th>
                                                            <th>Signature <span className="text-danger font-weight-bold">*</span></th>
                                                            <th>Annexure <span className="text-danger font-weight-bold">*</span></th>
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
                                                                <label for="engineerSignId"> <FileUpload color="primary" /></label>
                                                                <input
                                                                    id="engineerSignId"
                                                                    type="file"
                                                                    name="engineerSign"
                                                                    style={{ display: "none" }}
                                                                    onChange={(e) => getDocumentData(e?.target?.files[0], "engineerSign")}
                                                                />
                                                                {/* <input
                                                                    type="file"
                                                                    name="engineerSign"
                                                                    onChange={(e) => getDocumentData(e?.target?.files[0], "engineerSign")}
                                                                    placeholder=""
                                                                    class="employee-card-input"
                                                                /> */}
                                                            </td>
                                                            <td align="center" size="large">
                                                                {Documents?.engineerSign ?
                                                                    <a onClick={() => getDocShareholding(Documents?.engineerSign)} className="btn btn-sm col-md-6">
                                                                        <VisibilityIcon color="info" className="icon" />
                                                                    </a> : <p></p>
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
                                                                <label for="architectSignId"> <FileUpload color="primary" /></label>
                                                                <input
                                                                    id="architectSignId"
                                                                    type="file"
                                                                    name="architectSign"
                                                                    style={{ display: "none" }}
                                                                    onChange={(e) => getDocumentData(e?.target?.files[0], "architectSign")}
                                                                />
                                                                {/* <input
                                                                    type="file"
                                                                    onChange={(e) => getDocumentData(e?.target?.files[0], "architectSign")}
                                                                    placeholder=""
                                                                    class="employee-card-input"
                                                                /> */}
                                                            </td>
                                                            <td align="center" size="large">
                                                                {Documents?.architectSign ?
                                                                    <a onClick={() => getDocShareholding(Documents?.architectSign)} className="btn btn-sm col-md-6">
                                                                        <VisibilityIcon color="info" className="icon" />
                                                                    </a> : <p></p>
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
                                                                <label for="townPlannerSignId"> <FileUpload color="primary" /></label>
                                                                <input
                                                                    id="townPlannerSignId"
                                                                    type="file"
                                                                    name="townPlannerSign"
                                                                    style={{ display: "none" }}
                                                                    onChange={(e) => getDocumentData(e?.target?.files[0], "townPlannerSign")}
                                                                />
                                                                {/* <input
                                                                    type="file"
                                                                    onChange={(e) => getDocumentData(e?.target?.files[0], "townPlannerSign")}
                                                                    placeholder=""
                                                                    class="employee-card-input"
                                                                /> */}
                                                            </td>
                                                            <td align="center" size="large">
                                                                {Documents?.townPlannerSign ?
                                                                    <a onClick={() => getDocShareholding(Documents?.townPlannerSign)} className="btn btn-sm col-md-6">
                                                                        <VisibilityIcon color="info" className="icon" />
                                                                    </a> : <p></p>
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
                            {/* {technicalExpert === "N" && (
                                <div className="row ">
                                    <div className="form-group row">
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
                                                               
                                                            </td>
                                                            <td align="center" size="large">

                                                                <div className="row">
                                                                    {Documents?.existingDeveloperAgreementDoc ?
                                                                        <button type="button" onClick={() => getDocShareholding(Documents?.existingDeveloperAgreementDoc)} className="btn btn-sm col-md-6">
                                                                            <VisibilityIcon color="info" className="icon" />
                                                                        </button> : <p></p>
                                                                    }
                                                                    <div className="btn btn-sm col-md-6">
                                                                        <label for="existingDeveloperAgreementDoc"> <FileUpload color="primary" /></label>
                                                                        <input
                                                                            id="existingDeveloperAgreementDoc"
                                                                            type="file"
                                                                            accept="addplication/pdf"
                                                                            style={{ display: "none" }}
                                                                            onChange={(e) => getDocumentData(e?.target?.files[0], "existingDeveloperAgreementDoc")}
                                                                        />
                                                                    </div>
                                                                </div>

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
                                                                <div className="row">
                                                                    {Documents?.technicalCapacityDoc ?
                                                                        <button type="button" onClick={() => getDocShareholding(Documents?.technicalCapacityDoc)} className="btn btn-sm col-md-6">
                                                                            <VisibilityIcon color="info" className="icon" />
                                                                        </button> : <p></p>
                                                                    }
                                                                    <div className="btn btn-sm col-md-6">
                                                                        <label for="technicalCapacityDoc"> <FileUpload color="primary" /></label>
                                                                        <input
                                                                            id="technicalCapacityDoc"
                                                                            type="file"
                                                                            accept="addplication/pdf"
                                                                            style={{ display: "none" }}
                                                                            onChange={(e) => getDocumentData(e?.target?.files[0], "technicalCapacityDoc")}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td> 3 &nbsp;&nbsp;</td>
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
                                                                <div className="row">
                                                                    {Documents?.engineerDocN ?
                                                                        <button type="button" onClick={() => getDocShareholding(Documents?.engineerDocN)} className="btn btn-sm col-md-6">
                                                                            <VisibilityIcon color="info" className="icon" />
                                                                        </button> : <p></p>
                                                                    }
                                                                    <div className="btn btn-sm col-md-6">
                                                                        <label for="engineerDocN"> <FileUpload color="primary" /></label>
                                                                        <input
                                                                            id="engineerDocN"
                                                                            type="file"
                                                                            accept="addplication/pdf"
                                                                            style={{ display: "none" }}
                                                                            onChange={(e) => getDocumentData(e?.target?.files[0], "engineerDocN")}
                                                                        />
                                                                    </div>
                                                                </div>
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
                                                            <div className="row">
                                                                    {Documents?.architectDocN ?
                                                                        <button type="button" onClick={() => getDocShareholding(Documents?.architectDocN)} className="btn btn-sm col-md-6">
                                                                            <VisibilityIcon color="info" className="icon" />
                                                                        </button> : <p></p>
                                                                    }
                                                                    <div className="btn btn-sm col-md-6">
                                                                        <label for="architectDocN"> <FileUpload color="primary" /></label>
                                                                        <input
                                                                            id="architectDocN"
                                                                            type="file"
                                                                            accept="addplication/pdf"
                                                                            style={{ display: "none" }}
                                                                            onChange={(e) => getDocumentData(e?.target?.files[0], "architectDocN")}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td> 5&nbsp;&nbsp; </td>
                                                            <td>
                                                                Upload SPA/GPA/ Board Resolution to sign
                                                                collaboration agreement on behalf of land
                                                                owner(s)
                                                            </td>
                                                            <td align="center" size="large">
                                                            <div className="row">
                                                                    {Documents?.collabAgreement ?
                                                                        <button type="button" onClick={() => getDocShareholding(Documents?.collabAgreement)} className="btn btn-sm col-md-6">
                                                                            <VisibilityIcon color="info" className="icon" />
                                                                        </button> : <p></p>
                                                                    }
                                                                    <div className="btn btn-sm col-md-6">
                                                                        <label for="collabAgreement"> <FileUpload color="primary" /></label>
                                                                        <input
                                                                            id="collabAgreement"
                                                                            type="file"
                                                                            accept="addplication/pdf"
                                                                            style={{ display: "none" }}
                                                                            onChange={(e) => getDocumentData(e?.target?.files[0], "collabAgreement")}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </Table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )} */}
                        </div>


                        {/* <div className="hl"></div>
                        <p>
                            (vi) Licences/permissions granted to
                            Developer/ group company for development of colony under any
                            other law/Act as .
                        </p>
                        <div>
                            <div className="card-body">
                                <div className="table-bd">
                                    <Table className="table table-bordered">
                                        <thead>
                                            <tr>
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
                                                                            </a> : <p></p>
                                                                        }
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <div className="row">
                                                                        {elementInArray.outstandingDues !== "" ?
                                                                            <a href={urlGetOutstandingFile} target="_blank" className="btn btn-sm col-md-6">
                                                                                <VisibilityIcon color="info" className="icon" />
                                                                            </a> : <p></p>
                                                                        }

                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <button type="button"
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
                                        <button type="button"
                                            style={{
                                                float: "left",
                                                backgroundColor: "#0b3629",
                                                color: "white",
                                            }}
                                            className="btn mt-3"
                                            onClick={handleShowColoniesDeveloped}
                                        >
                                            Add More
                                        </button>
                                        <Modal show={showColoniesDeveloped} onHide={handleCloseColoniesDeveloped} animation={false}>
                                            <Modal.Header closeButton>
                                                <Modal.Title>Add</Modal.Title>
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
                                                                onChange={(e) => getDocumentData(e.target.files[0], "statusOfDevelopment")}
                                                                placeholder=""
                                                                class="employee-card-input"
                                                            />
                                                        </Col>
                                                        <Col md={4} xxl lg="4">
                                                            <label htmlFor="name" className="text">Outstanding Dues</label>
                                                            <input
                                                                type="file"
                                                                onChange={(e) => getDocumentData(e.target.files[0], "outstandingDues")}
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
                        </div> */}




                        {/* </Col> */}
                    </div>
                    {/* <div className="form-group col-md2 mt-4">
                    <button type="button" 
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
