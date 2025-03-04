import {
  BackButton,
  Card,
  label,
  labelError,
  Toast,
  FormStep,
  Loader,
  Dropdown,
  MobileNumber,
  RadioButtons,
  RadioOrSelect,

  TextInput,
  TextArea,
  CheckBox,
  DatePicker,
} from "@egovernments/digit-ui-react-components";
import React, { useState, useEffect } from "react";
import { Form, Row } from "react-bootstrap";
import { useHistory, useLocation } from "react-router-dom";
import Timeline from "../components/Timeline";
import { convertEpochToDate } from "../utils/index";
import axios from "axios";
import { MenuItem, Select } from "@mui/material";
import { useForm } from "react-hook-form";
import Spinner from "../components/Loader/index";
import { Button, Placeholder } from 'react-bootstrap';
import VisibilityIcon from "@mui/icons-material/Visibility";
import { getDocShareholding } from "../../../tl/src/pages/employee/ScrutinyBasic/ScrutinyDevelopment/docview.helper";

const LicenseDetails = ({ t, config, onSelect, userType, formData, ownerIndex }) => {
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const stateId = Digit.ULBService.getStateId();
  const { pathname: url } = useLocation();
  const userInfo = Digit.UserService.getUser();
  const USERID = userInfo;
  React.useEffect(async () => {
    const uuid = userInfo?.info?.uuid;
    const usersResponse = await Digit.UserService.userSearch(tenantId, { uuid: [uuid] }, {});
    // console.log("USERID",usersResponse?.user[0]?.parentId)
    setParentId(usersResponse?.user[0]?.parentId);
    setGenderMF(usersResponse?.user[0]?.gender);
  }, [userInfo?.info?.uuid]);
  const [loader, setLoading] = useState(false);
  console.log("FORMDATA VAL", formData);
  let validation = {};
  const devRegId = localStorage.getItem("devRegId");
  let isOpenLinkFlow = window.location.href.includes("openlink");
  // const [id,setId] = useState("");

  const { setValue, getValues, watch } = useForm();
  const [Documents, setDocumentsData] = useState({});
  const [LicenseType, setLicenseType] = useState(formData?.LicneseType?.licenceTypeSelected || formData?.formData?.LicneseType?.licenceTypeSelected || "");
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
      const licenseDataList = getDevDetails?.data;
      setTradeType(licenseDataList?.devDetail[0]?.applicantType?.licenceType);
      // console.log("LICENCE DET", getDevDetails?.data.devDetail[0]?.licenceDetails?.email, userInfo);
      setLicenseType(licenseDataList?.devDetail[0]?.applicantType?.licenceTypeSelected);
      setEmail(licenseDataList?.devDetail[0]?.licenceDetails?.email || userInfo.info.emailId);
      setMobileNumber(licenseDataList?.devDetail[0]?.licenceDetails?.mobileNumber || userInfo.info.mobileNumber);
      setDOB(licenseDataList?.devDetail[0]?.licenceDetails?.dob);
      setGender(licenseDataList?.devDetail[0]?.licenceDetails?.gender);
      setPanNumber(licenseDataList?.devDetail[0]?.licenceDetails?.panNumber);
      setPanIsValid(licenseDataList?.devDetail[0]?.licenceDetails?.panNumber ? true : false);
      setBoardResolution(licenseDataList?.devDetail[0]?.licenceDetails.uploadBoardResolution);
      setDigitalSign(licenseDataList?.devDetail[0]?.licenceDetails?.uploadDigitalSignaturePdf);
      setAddressLineOne(licenseDataList?.devDetail[0]?.licenceDetails?.addressLineOne);
      setAddressLineTwo(licenseDataList?.devDetail[0]?.licenceDetails?.addressLineTwo);
      setAddressLineThree(licenseDataList?.devDetail[0]?.licenceDetails?.addressLineThree);
      setAddressLineFour(licenseDataList?.devDetail[0]?.licenceDetails?.addressLineFour);
      setCity(licenseDataList?.devDetail[0]?.licenceDetails?.city);
      setPincode(licenseDataList?.devDetail[0]?.licenceDetails?.pincode);
      setVillage(licenseDataList?.devDetail[0]?.licenceDetails?.village);
      setTehsil(licenseDataList?.devDetail[0]?.licenceDetails?.tehsil);
      setState(licenseDataList?.devDetail[0]?.licenceDetails?.state);
      setDistrict(licenseDataList?.devDetail[0]?.licenceDetails?.district);
      setisAddressSame(licenseDataList?.devDetail[0]?.licenceDetails?.isAddressSame);
      setAddressLineOneCorrespondence(licenseDataList?.devDetail[0]?.licenceDetails?.addressLineOneCorrespondence);
      setAddressLineTwoCorrespondence(licenseDataList?.devDetail[0]?.licenceDetails?.addressLineTwoCorrespondence);
      setAddressLineThreeCorrespondence(licenseDataList?.devDetail[0]?.licenceDetails?.addressLineThreeCorrespondence);
      setAddressLineFourCorrespondence(licenseDataList?.devDetail[0]?.licenceDetails?.addressLineFourCorrespondence);
      setCityCorrespondence(licenseDataList?.devDetail[0]?.licenceDetails?.cityCorrespondence);
      setPincodeCorrespondence(licenseDataList?.devDetail[0]?.licenceDetails?.pincodeCorrespondence);
      setVillageCorrespondence(licenseDataList?.devDetail[0]?.licenceDetails?.villageCorrespondence);
      setTehsilCorrespondence(licenseDataList?.devDetail[0]?.licenceDetails?.tehsilCorrespondence);
      setStateCorrespondence(licenseDataList?.devDetail[0]?.licenceDetails?.stateCorrespondence);
      setDistrictCorrespondence(licenseDataList?.devDetail[0]?.licenceDetails?.districtCorrespondence);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getDeveloperData();
  }, []);
  const onSkip = () => onSelect();
  const [tradeType, setTradeType] = useState("");
  const [genderUser, setGenderMF] = useState(formData?.LicneseDetails?.genderUser || formData?.formData?.LicneseDetails?.genderUser || "");
  const [name, setName] = useState(
    (!isOpenLinkFlow ? userInfo?.info?.name : "") || formData?.LicneseDetails?.name || formData?.formData?.LicneseDetails?.name || ""
  );
  const [email, setEmail] = useState(
    (!isOpenLinkFlow ? userInfo?.info?.emailId : "") || formData?.LicneseDetails?.email || formData?.formData?.LicneseDetails?.email || ""
  );
  const [gender, setGender] = useState(formData?.LicneseDetails?.gender || formData?.formData?.LicneseDetails?.gender);
  const [mobileNumber, setMobileNumber] = useState(
    (!isOpenLinkFlow ? userInfo?.info?.mobileNumber : "") ||
    formData?.LicneseDetails?.mobileNumber ||
    formData?.formData?.LicneseDetails?.mobileNumber ||
    ""
  );
  const [dob, setDOB] = useState(formData?.LicneseDetails?.dob || formData?.formData?.LicneseDetails?.dob || "");
  const [PanNumber, setPanNumber] = useState(formData?.LicneseDetails?.PanNumber || formData?.formData?.LicneseDetails?.PanNumber || "");
  const [uploadBoardResolution, setBoardResolution] = useState(
    formData?.LicneseDetails?.uploadBoardResolution || formData?.formData?.LicneseDetails?.uploadBoardResolution || ""
  );
  const [uploadDigitalSignaturePdf, setDigitalSign] = useState(
    formData?.LicneseDetails?.uploadDigitalSignaturePdf || formData?.formData?.LicneseDetails?.uploadDigitalSignaturePdf || ""
  );
  const [parentId, setParentId] = useState(formData?.LicneseDetails?.parentId || formData?.formData?.LicneseDetails?.parentId);
  const [PermanentAddress, setPermanentAddress] = useState(
    formData?.LicneseDetails?.PermanentAddress || formData?.formData?.LicneseDetails?.PermanentAddress
  );
  const [addressLineOne, setAddressLineOne] = useState(
    formData?.LicneseDetails?.addressLineOne || formData?.formData?.LicneseDetails?.addressLineOne || ""
  );
  const [addressLineTwo, setAddressLineTwo] = useState(
    formData?.LicneseDetails?.addressLineTwo || formData?.formData?.LicneseDetails?.addressLineTwo || ""
  );
  const [addressLineThree, setAddressLineThree] = useState(
    formData?.LicneseDetails?.addressLineThree || formData?.formData?.LicneseDetails?.addressLineThree || ""
  );
  const [addressLineFour, setAddressLineFour] = useState(
    formData?.LicneseDetails?.addressLineFour || formData?.formData?.LicneseDetails?.addressLineFour || ""
  );
  const [city, setCity] = useState(formData?.LicneseDetails?.city || formData?.formData?.LicneseDetails?.city || "");
  const [pincode, setPincode] = useState(formData?.LicneseDetails?.pincode || formData?.formData?.LicneseDetails?.pincode || "");
  const [village, setVillage] = useState(formData?.LicneseDetails?.village || formData?.formData?.LicneseDetails?.village || "");
  const [tehsil, setTehsil] = useState(formData?.LicneseDetails?.tehsil || formData?.formData?.LicneseDetails?.tehsil || "");
  const [state, setState] = useState(formData?.LicneseDetails?.state || formData?.formData?.LicneseDetails?.state || "");
  const [district, setDistrict] = useState(formData?.LicneseDetails?.district || formData?.formData?.LicneseDetails?.district || "");
  const [addressSameAsPermanent, setSelectedChecked] = useState(
    formData?.LicenseDetails?.addressSameAsPermanent || formData?.LicenseDetails?.addressSameAsPermanent || ""
  );
  const [Correspondenceaddress, setCorrespondenceaddress] = useState(
    formData?.Correspondenceaddress || formData?.formData?.Correspondenceaddress || ""
  );
  const [addressLineOneCorrespondence, setAddressLineOneCorrespondence] = useState(
    formData?.addressLineOneCorrespondence || formData?.formData?.addressLineOneCorrespondence || ""
  );
  const [addressLineTwoCorrespondence, setAddressLineTwoCorrespondence] = useState(
    formData?.addressLineTwoCorrespondence || formData?.formData?.addressLineTwoCorrespondence || ""
  );
  const [addressLineThreeCorrespondence, setAddressLineThreeCorrespondence] = useState(
    formData?.addressLineThreeCorrespondence || formData?.formData?.addressLineThreeCorrespondence || ""
  );
  const [addressLineFourCorrespondence, setAddressLineFourCorrespondence] = useState(
    formData?.addressLineFourCorrespondence || formData?.formData?.addressLineFourCorrespondence || ""
  );
  const [cityCorrespondence, setCityCorrespondence] = useState(formData?.cityCorrespondence || formData?.formData?.cityCorrespondence || "");
  const [pincodeCorrespondence, setPincodeCorrespondence] = useState(
    formData?.pincodeCorrespondence || formData?.formData?.pincodeCorrespondence || ""
  );
  const [villageCorrespondence, setVillageCorrespondence] = useState(
    formData?.villageCorrespondence || formData?.formData?.villageCorrespondence || ""
  );
  const [tehsilCorrespondence, setTehsilCorrespondence] = useState(formData?.tehsilCorrespondence || formData?.formData?.tehsilCorrespondence || "");
  const [stateCorrespondence, setStateCorrespondence] = useState(formData?.stateCorrespondence || formData?.formData?.stateCorrespondence || "");
  const [districtCorrespondence, setDistrictCorrespondence] = useState(
    formData?.districtCorrespondence || formData?.formData?.districtCorrespondence || ""
  );
  const [isAddressSame, setisAddressSame] = useState(formData?.isAddressSame || formData?.formData?.isAddressSame || false);
  const [error, setError] = useState(null);
  const [toastError, setToastError] = useState("");
  const [showToast, setShowToast] = useState(null);
  const [showToastError, setShowToastError] = useState(null);
  const [filsArray, setFilesArray] = useState([]);
  const [panIsValid, setPanIsValid] = useState(false);
  const inputs = [
    {
      label: "HR_BIRTH_DATE_LABEL",
      type: "date",
      name: "dob",
      validation: {
        isRequired: true,
        title: t("CORE_COMMON_APPLICANT_NAME_INVALID"),
      },
      isMandatory: false,
    },
  ];

  const getDocumentData = async (file, fieldName, index) => {
    if (getValues("licenceBoardResolution")?.includes(file.name)) {
      setShowToastError({ key: "error" });
      return;
    }
    const formData = new FormData();
    formData.append("file", file);
    formData.append("tenantId", "hr");
    formData.append("module", "property-upload");
    formData.append("tag", "tag-property");
    // setLoader(true);
    try {
      setLoading(true);
      const Resp = await axios.post("/filestore/v1/files", formData, {}).then((response) => {
        return response;
      });

      setLoading(false);
      setShowToast({ key: "success" });
      console.log(Resp?.data?.files);

      // if(formType === "licenceBoardResolution"){

      setValue(fieldName, Resp?.data?.files?.[0]?.fileStoreId);
      // setDocId(Resp?.data?.files?.[0]?.fileStoreId);
      console.log("getValues()=====", getValues(), { ...Documents, ...getValues() }, Documents);
      setDocumentsData({ ...Documents, ...getValues() });
      setBoardResolution(Documents?.uploadBoardResolution);
      setDigitalSign(Documents?.uploadDigitalSignaturePdf);
      // }
    } catch (error) {
      setLoading(false);
      alert(error?.response?.data?.Errors?.[0]?.description);
      console.log(error, error?.body, error?.response?.data?.Errors?.[0]?.description);
    }
  };

  const applicantType = () => {
    resetForm();
  };

  const resetForm = () => {
    setPanValError("");
  };
  const [panValidation, setPanValidation] = useState("");
  const [PanValError, setPanValError] = useState("");
  // function setValue(value, input) {
  //   setDOB(config.key, { ...formData[config.key], [input]: value });
  // }
  const isCitizenUrl = Digit.Utils.browser.isMobile() ? true : false;

  if (isOpenLinkFlow)
    window.onunload = function () {
      sessionStorage.removeItem("Digit.BUILDING_PERMIT");
    };

  const { isLoading, data: genderTypeData } = Digit.Hooks.obps.useMDMS(stateId, "common-masters", ["GenderType"]);

  let menu = [];
  genderTypeData &&
    genderTypeData["common-masters"].GenderType.filter((data) => data.active).map((genderDetails) => {
      menu.push({ i18nKey: `COMMON_GENDER_${genderDetails.code}`, code: `${genderDetails.code}`, value: `${genderDetails.code}` });
    });
  const editScreen = false;
  // if (isLoading) return <Loader />;
  const panVerification = async () => {
    setLoading(true);
    try {
      const panVal = {
        txnId: "f7f1469c-29b0-4325-9dfc-c567200a70f7",
        format: "xml",
        certificateParameters: {
          panno: PanNumber,
          PANFullName: name,
          FullName: name,
          DOB: dob,
          GENDER: gender,
        },
        consentArtifact: {
          consent: {
            consentId: "ea9c43aa-7f5a-4bf3-a0be-e1caa24737ba",
            timestamp: "2022-10-08T06:21:51.321Z",
            dataConsumer: {
              id: "string",
            },
            dataProvider: {
              id: "string",
            },
            purpose: {
              description: "string",
            },
            user: {
              idType: "string",
              idNumber: "string",
              mobile: mobileNumber,
              email: email,
            },
            data: {
              id: "string",
            },
            permission: {
              access: "string",
              dateRange: {
                from: "2022-10-08T06:21:51.321Z",
                to: "2022-10-08T06:21:51.321Z",
              },
              frequency: {
                unit: "string",
                value: 0,
                repeats: 0,
              },
            },
          },
          signature: {
            signature: "string",
          },
        },
      };
      const panResp = await axios.post(`/certificate/v3/pan/pancr`, panVal, {
        headers: {
          "Content-Type": "application/json",
          "X-APISETU-APIKEY": "PDSHazinoV47E18bhNuBVCSEm90pYjEF",
          "X-APISETU-CLIENTID": "in.gov.tcpharyana",
          "Access-Control-Allow-Origin": "*",
        },
      });
      setPanIsValid(true);
      setPanValError("");
      setLoading(false);
      // console.log("PANDET", panResp?.data);
    } catch (error) {
      setLoading(false);
      console.log(error?.response?.data?.errorDescription);
      setPanValError(error?.response?.data?.errorDescription);
    }
  };
  // console.log(panValidation);
  // useEffect(() => {
  //   if (PanNumber.length === 10) {
  //     panVerification;
  //   }
  // }, [PanNumber]);

  function SelectName(e) {
    setName(e.target.value);
    setPanIsValid(false);
  }
  // function selectEmail(e) {
  //   setEmail(e.target.value);
  // }
  function setGenderName(e) {
    console.log("GENDER", e.target.value);
    setGender(e.target.value);
    setPanIsValid(false);
  }

  function setMobileNo(e) {
    setMobileNumber(e.target.value);
    setPanIsValid(false);
  }
  function setDateofBirth(e) {
    setDOB(e.target.value);
    setPanIsValid(false);
  }
  function selectPanNumber(e) {
    // setPanNumber(e.target.value.toUpperCase());
    // if(e.target.value === 10){
    //   panVerification();
    // }
    if (!e.target.value || /^\w+$/.test(e.target.value)) {
      setPanNumber(e.target.value.toUpperCase());
      setPanIsValid(false);
      // if (e.target.value === 10) {
      //   alert("HEY");
      //   panVerification();
      // }
    }
  }
  function selectPermanentAddress(e) {
    setPermanentAddress(e.target.value);
  }
  function selectHouseNumber(e) {
    if (isAddressSame == true) {
      setAddressLineOne(e.target.value);
      setAddressLineOneCorrespondence(e.target.value);
    } else {
      setAddressLineOne(e.target.value);
    }
  }
  function selectColonyName(e) {
    if (isAddressSame == true) {
      setAddressLineTwo(e.target.value);
      setAddressLineTwoCorrespondence(e.target.value);
    } else {
      setAddressLineTwo(e.target.value);
    }
  }
  function selectStreetName(e) {
    if (isAddressSame == true) {
      setAddressLineThree(e.target.value);
      setAddressLineThreeCorrespondence(e.target.value);
    } else {
      setAddressLineThree(e.target.value);
    }
  }
  function selectLocality(e) {
    if (isAddressSame == true) {
      setAddressLineFour(e.target.value);
      setAddressLineFourCorrespondence(e.target.value);
    } else {
      setAddressLineFour(e.target.value);
    }
  }
  function selectCity(e) {
    if (!e.target.value || e.target.value.match("^[a-zA-Z ]*$")) {
      if (isAddressSame == true) {
        setCity(e.target.value);
        setCityCorrespondence(e.target.value);
      } else {
        setCity(e.target.value);
      }
    }
  }
  function selectPincode(e) {
    if (!e.target.value || e.target.value.match("^[1-9][0-9]*$")) {
      if (isAddressSame == true) {
        setPincode(e.target.value);
        setPincodeCorrespondence(e.target.value);
      } else {
        setPincode(e.target.value);
      }
    }
  }
  function selectVillage(e) {
    if (!e.target.value || e.target.value.match("^[a-zA-Z ]*$")) {
      if (isAddressSame == true) {
        setVillage(e.target.value);
        setVillageCorrespondence(e.target.value);
      } else {
        setVillage(e.target.value);
      }
    }
  }
  function selectTehsil(e) {
    if (!e.target.value || e.target.value.match("^[a-zA-Z ]*$")) {
      if (isAddressSame == true) {
        setTehsil(e.target.value);
        setTehsilCorrespondence(e.target.value);
      } else {
        setTehsil(e.target.value);
      }
    }
  }
  function selectDistrict(e) {
    if (!e.target.value || e.target.value.match("^[a-zA-Z ]*$")) {
      if (isAddressSame == true) {
        setDistrict(e.target.value);
        setDistrictCorrespondence(e.target.value);
      } else {
        setDistrict(e.target.value);
      }
    }
  }
  function selectState(e) {
    if (!e.target.value || e.target.value.match("^[a-zA-Z ]*$")) {
      if (isAddressSame == true) {
        setState(e.target.value);
        setStateCorrespondence(e.target.value);
      } else {
        setState(e.target.value);
      }
    }
  }
  function selectChecked(e) {
    if (isAddressSame == false) {
      setisAddressSame(true);
      // setSelectedChecked(formData?.LicenseDetails?.addressSameAsPermanent ? formData?.LicenseDetails?.addressSameAsPermanent : formData?.LicenseDetails?.addressSameAsPermanent)
      setCorrespondenceaddress(
        formData?.LicneseDetails?.PermanentAddress ? formData?.LicneseDetails?.PermanentAddress : formData?.formData?.LicneseDetails?.PermanentAddress
      );
      setAddressLineOneCorrespondence(addressLineOne);
      setAddressLineTwoCorrespondence(addressLineTwo);
      setAddressLineThreeCorrespondence(addressLineThree);
      setAddressLineFourCorrespondence(addressLineFour);
      setCityCorrespondence(city);
      setPincodeCorrespondence(pincode);
      setVillageCorrespondence(village);
      setTehsilCorrespondence(tehsil);
      setStateCorrespondence(state);
      setDistrictCorrespondence(district);
    } else {
      Array.from(document.querySelectorAll("input")).forEach((input) => (input.value = ""));
      setisAddressSame(false);
      setCorrespondenceaddress("");
      setAddressLineOneCorrespondence("");
      setAddressLineTwoCorrespondence("");
      setAddressLineThreeCorrespondence("");
      setAddressLineFourCorrespondence("");
      setCityCorrespondence("");
      setPincodeCorrespondence("");
      setVillageCorrespondence("");
      setTehsilCorrespondence("");
      setStateCorrespondence("");
      setDistrictCorrespondence("");
    }
  }
  function selectCorrespondenceaddress(e) {
    setCorrespondenceaddress(e.target.value);
  }
  function selecthouseNumberCorrespondenceaddress(e) {
    setAddressLineOneCorrespondence(e.target.value);
  }
  function selectColonyNameCorrespondence(e) {
    setAddressLineTwoCorrespondence(e.target.value);
  }
  function selectStreetNameCorrespondence(e) {
    setAddressLineThreeCorrespondence(e.target.value);
  }
  function selectLocalityCorrespondence(e) {
    setAddressLineFourCorrespondence(e.target.value);
  }
  function selectCityCorrespondence(e) {
    if (!e.target.value || e.target.value.match("^[a-zA-Z ]*$")) {
      setCityCorrespondence(e.target.value);
    }
  }
  function selectPincodeCorrespondence(value) {
    setPincodeCorrespondence(value);
  }
  function selectVillageCorrespondence(e) {
    if (!e.target.value || e.target.value.match("^[a-zA-Z ]*$")) {
      setVillageCorrespondence(e.target.value);
    }
  }
  function selectTehsilCorrespondence(e) {
    if (!e.target.value || e.target.value.match("^[a-zA-Z ]*$")) {
      setTehsilCorrespondence(e.target.value);
    }
  }
  function selectStateCorrespondence(e) {
    if (!e.target.value || e.target.value.match("^[a-zA-Z ]*$")) {
      setStateCorrespondence(e.target.value);
    }
  }
  function selectDistrictCorrespondence(e) {
    if (!e.target.value || e.target.value.match("^[a-zA-Z ]*$")) {
      setDistrictCorrespondence(e.target.value);
    }
  }

  const goNext = async () => {
    // if (!(formData?.result && formData?.result?.Licenses[0]?.id)) {

    let userInfo = Digit.UserService.getUser();
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
    let details = getDevDetails?.data?.devDetail?.[0];
    details.licenceDetails = {
      ...details.licenceDetails,
      name: name,
      mobileNumber: mobileNumber,
      gender: gender,
      email: email,
      dob: dob,
      PanNumber: PanNumber,
      uploadBoardResolution: Documents?.uploadBoardResolution,
      uploadDigitalSignaturePdf: Documents?.uploadDigitalSignaturePdf,
      addressLineOne: addressLineOne,
      addressLineTwo: addressLineTwo,
      addressLineThree: addressLineThree,
      addressLineFour: addressLineFour,
      city: city,
      pincode: pincode,
      village: village,
      tehsil: tehsil,
      state: state,
      district: district,
      isAddressSame: isAddressSame,
      addressLineOneCorrespondence: addressLineOneCorrespondence,
      addressLineTwoCorrespondence: addressLineTwoCorrespondence,
      addressLineThreeCorrespondence: addressLineThreeCorrespondence,
      addressLineFourCorrespondence: addressLineFourCorrespondence,
      cityCorrespondence: cityCorrespondence,
      pincodeCorrespondence: pincodeCorrespondence,
      villageCorrespondence: villageCorrespondence,
      tehsilCorrespondence: tehsilCorrespondence,
      stateCorrespondence: stateCorrespondence,
      districtCorrespondence: districtCorrespondence,
      addressSameAsPermanent: addressSameAsPermanent,
    }

    let licenseDet = {
      parentId: userInfo?.info?.id,
      Licenses: [
        {
          applicationType: "NEW",
          tradeLicenseDetail: {
            owners: [
              {
                parentid: userInfo?.info?.id,
                gender: "MALE",
                mobileNumber: userInfo?.info?.mobileNumber,
                name: userInfo?.info?.name,
                dob: null,
                emailId: email,
                permanentAddress: PermanentAddress,
                correspondenceAddress: Correspondenceaddress,
                pan: PanNumber,
                // "permanentPinCode": "143001"
              },
            ],
            subOwnerShipCategory: "INDIVIDUAL",
            tradeType: (LicenseType === "CITIZEN.CLASSA" || LicenseType === "BPA_DEVELOPER") ? tradeType : "TECHNICAL_PROFESSIONAL",

            additionalDetail: [{
              counsilForArchNo: null,
              ...details
            }],
            address: {
              city: "",
              landmark: "",
              pincode: "",
            },
            institution: null,
            applicationDocuments: null,
          },
          licenseType: "PERMANENT",
          businessService: "BPAREG",
          tenantId: stateId,
          action: "NOWORKFLOW",
        },
      ],
    };

    if ((LicenseType !== "CITIZEN.CLASSA" && LicenseType !== "BPA_DEVELOPER")) {
      onSelect(config.key, licenseDet, null, null, "stakeholder-document-details");
    } else {
      onSelect(config.key, licenseDet);
    }
    localStorage.setItem("licenceDetails", JSON.stringify(licenseDet));
    Digit.OBPSService.BPAREGCreate(licenseDet, tenantId)
      .then((result, err) => {
        console.log("FORMDATA...1", result)
        sessionStorage.setItem("TECHNICAL_PROFESSIONAL_APPLICATION_NO", result?.Licenses?.[0]?.applicationNumber)
        setIsDisableForNext(false);
        let data = {
          result: result,
          formData: formData,
          Correspondenceaddress: Correspondenceaddress,
          addressLineOneCorrespondence: addressLineOneCorrespondence,
          addressLineTwoCorrespondence: addressLineTwoCorrespondence,

          isAddressSame: isAddressSame,
        };
        //1, units
        if ((LicenseType !== "CITIZEN.CLASSA" && LicenseType !== "BPA_DEVELOPER")) {
          onSelect("", data, "", true, "stakeholder-document-details");
        } else {
          onSelect("", data, "", true);
        }
      })
      .catch((e) => {
        setIsDisableForNext(false);
        setShowToast({ key: "error" });
        setError(e?.response?.data?.Errors[0]?.message || null);
      });

    const developerRegisterData = {
      "id": userInfo?.info?.id,
      "pageName": "licenceDetails",
      "createdBy": userInfo?.info?.id,
      "updatedBy": userInfo?.info?.id,
      devDetail: {
        licenceDetails: {
          name: name,
          mobileNumber: mobileNumber,
          gender: gender,
          email: email,
          dob: dob,
          PanNumber: PanNumber,
          uploadBoardResolution: Documents?.uploadBoardResolution,
          uploadDigitalSignaturePdf: Documents?.uploadDigitalSignaturePdf,
          addressLineOne: addressLineOne,
          addressLineTwo: addressLineTwo,
          addressLineThree: addressLineThree,
          addressLineFour: addressLineFour,
          city: city,
          pincode: pincode,
          village: village,
          tehsil: tehsil,
          state: state,
          district: district,
          isAddressSame: isAddressSame,
          addressLineOneCorrespondence: addressLineOneCorrespondence,
          addressLineTwoCorrespondence: addressLineTwoCorrespondence,
          addressLineThreeCorrespondence: addressLineThreeCorrespondence,
          addressLineFourCorrespondence: addressLineFourCorrespondence,
          cityCorrespondence: cityCorrespondence,
          pincodeCorrespondence: pincodeCorrespondence,
          villageCorrespondence: villageCorrespondence,
          tehsilCorrespondence: tehsilCorrespondence,
          stateCorrespondence: stateCorrespondence,
          districtCorrespondence: districtCorrespondence,
          addressSameAsPermanent: addressSameAsPermanent,
        },
      },
    };
    console.log("logger123...", LicenseType)

    if ((LicenseType !== "CITIZEN.CLASSA" && LicenseType !== "BPA_DEVELOPER")) {
      onSelect(config.key, developerRegisterData, null, null, "stakeholder-document-details");
    } else {
      onSelect(config.key, developerRegisterData);
    }
    Digit.OBPSService.CREATEDeveloper(developerRegisterData, tenantId)
      .then((result, err) => {
        // console.log("DATA", result?.id);
        console.log("FORMDATA...2", result)
        localStorage.setItem("devRegId", JSON.stringify(result?.id));
        setIsDisableForNext(false);
        let data = {
          result: result,
          formData: formData,
          Correspondenceaddress: Correspondenceaddress,
          addressLineOneCorrespondence: addressLineOneCorrespondence,
          addressLineTwoCorrespondence: addressLineTwoCorrespondence,

          isAddressSame: isAddressSame,
        };
        //1, units
        console.log("logger123...", LicenseType)
        if ((LicenseType !== "CITIZEN.CLASSA" && LicenseType !== "BPA_DEVELOPER")) {
          onSelect("", formData, "", true, "stakeholder-document-details");
        } else {
          onSelect("", formData, "", true);
        }
      })
      .catch((e) => {
        return;
        setIsDisableForNext(true);
        setToastError(e?.response?.data?.Errors?.[0]?.code);
        setError(e?.response?.data?.Errors[0]?.message || null);

      });

    // }
    // else {
    //   // let data = formData?.formData;
    //   formData.name = name;
    //   formData.mobileNumber = mobileNumber;
    //   formData.gender = gender;
    //   formData.email = email;
    //   formData.PanNumber = PanNumber;
    //   formData.Correspondenceaddress = Correspondenceaddress;
    //   formData.addressLineOneCorrespondence = addressLineOneCorrespondence;
    //   formData.addressSameAsPermanent = addressSameAsPermanent;
    //   formData.isAddressSame = isAddressSame;
    //   if(LicenseType === 'ARCHITECT.CLASSA'){
    //     onSelect("", formData,"",true,"stakeholder-document-details");
    //   } else {
    //     onSelect("", formData,"",true);
    //   }
    // }
  };

  const navigate = useHistory();

  const changeStep = (step) => {
    console.log("logger123..", step);
    switch (step) {
      case 1:
        navigate.replace("/digit-ui/citizen/obps/stakeholder/apply/provide-license-type");
        break;
    }
  };

  return (
    <div>
      {loader && <Spinner />}
      <div className={isOpenLinkFlow ? "OpenlinkContainer" : ""}>
        {isOpenLinkFlow && <BackButton style={{ border: "none" }}>{t("CS_COMMON_BACK")}</BackButton>}
        <Timeline
          currentStep={2}
          flow={(LicenseType !== "CITIZEN.CLASSA" && LicenseType !== "BPA_DEVELOPER") ? "ARCHITECT.CLASSA" : "STAKEHOLDER"}
          onChangeStep={changeStep}
          isAPILoaded={LicenseType ? true : false}
        />
        {!isLoading ? (
          <FormStep
            config={config}
            onSelect={goNext}
            onSkip={onSkip}
            t={t}
            isDisabled={
              !name ||
              !mobileNumber ||
              !mobileNumber.match(Digit.Utils.getPattern("MobileNo")) ||
              !gender ||
              !dob ||
              !email ||
              !email.match(Digit.Utils.getPattern("Email")) ||
              !PanNumber ||
              !PanNumber.match(Digit.Utils.getPattern("PAN")) ||
              !panIsValid ||
              !pincode?.match(Digit.Utils.getPattern("Pincode") || !city || !addressLineOne)
            }
          >
            <Card className="mb-3">
              {/* <h4></h4> */}
              <Row className="justify-content-left">
                <Form.Group className="col-md-4 mb-2">
                  <label>
                    {`${t("BPA_APPLICANT_NAME_LABEL")}`}
                    <span class="text-danger font-weight-bold mx-2">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={name}
                    onChange={SelectName}
                    // disabled="disabled"
                    className="form-control"
                  />
                </Form.Group>
                <Form.Group className="col-md-4 mb-2">
                  <label>
                    {`${t("BPA_APPLICANT_GENDER_LABEL")}`}
                    <span class="text-danger font-weight-bold mx-2">*</span>
                  </label>
                  <div className="row">
                    <Select
                      value={gender || ''}
                      onChange={setGenderName}
                      className="w-100 form-control"
                      variant="standard"

                    >
                      {
                        menu?.map((item, index) => (
                          <MenuItem value={item.value} >{item?.code}</MenuItem>
                        ))
                      }
                    </Select>
                  </div>
                </Form.Group>
                <Form.Group className="col-md-4 mb-2">
                  <label>
                    {`${t("BPA_OWNER_MOBILE_NO_LABEL")}`}
                    <span class="text-danger font-weight-bold mx-2">*</span>
                  </label>
                  {/* <MobileNumber
                    value={mobileNumber}
                    name="mobileNumber"
                    onChange={(value) => setMobileNo({ target: { value } })}
                    disable={mobileNumber && !isOpenLinkFlow ? true : false}
                    {...{ required: true, pattern: "[6-9]{1}[0-9]{9}", type: "tel" }}
                  /> */}
                  <input
                    value={mobileNumber}
                    placeholder={mobileNumber}
                    name="mobileNumber"
                    required={true}
                    onChange={(e) => { setMobileNo(e.target.value); setPanIsValid(false); }}
                    disabled
                    className="form-control"
                  />
                </Form.Group>
                {inputs?.map((input, index) => (
                  <Form.Group className="col-md-4 mb-2">
                    <label>
                      {`${"Enter Date of Birth"}`}
                      <span class="text-danger font-weight-bold mx-2">*</span>
                    </label>
                    {/* <DatePicker
                      isMandatory={true}
                      date={dob}
                      onChange={(e) => setDOB(e)}
                      disable={false}
                      max={convertEpochToDate(new Date().setFullYear(new Date().getFullYear() - 18))}
                    /> */}

                    <input
                      type="date"
                      value={dob}
                      date={dob}
                      // onChange={(e) => setDOB(e)}
                      onChange={setDateofBirth}
                      className="form-control"
                      name={dob}
                      max={convertEpochToDate(new Date().setFullYear(new Date().getFullYear() - 18))}
                    />
                  </Form.Group>
                ))}
                <Form.Group className="col-md-4 mb-2">
                  <label>
                    {`${t("BPA_APPLICANT_EMAIL_LABEL")}`}
                    <span class="text-danger font-weight-bold mx-2">*</span>
                  </label>
                  {/* <TextInput
                    t={t}
                    type={"email"}
                    isMandatory={true}
                    optionKey="i18nKey"
                    name="email"
                    value={email}
                    placeholder={email}
                    onChange={(e) => setEmail(e.target.value)}
                  /> */}
                  <input name="email" value={email} placeholder={email} onChange={(e) => setEmail(e.target.value)} class="form-control" />
                  {email && email.length > 0 && !email.match(Digit.Utils.getPattern("Email")) && (
                    <labelError style={{ width: "100%", marginTop: "-15px", fontSize: "16px", marginBottom: "12px", color: "red" }}>
                      {"Invalid Email Address"}
                    </labelError>
                  )}
                </Form.Group>
                <Form.Group className="col-md-4 mb-2">
                  <label>
                    {`${t("BPA_APPLICANT_PAN_NO")}`}
                    <span class="text-danger font-weight-bold mx-2">*</span>
                  </label>
                  <div className="d-flex align-items-baseline">
                    <input
                      type="text"
                      name="PanNumber"
                      required={true}
                      value={PanNumber}
                      className="form-control"
                      onChange={selectPanNumber}
                      max={10}
                      maxlength="10"
                    />
                    <Button className="ml-3" onClick={panVerification}>{panIsValid ? "Verified" : "Verify"}</Button>
                  </div>
                  {PanNumber && PanNumber.length > 0 && !PanNumber.match(Digit.Utils.getPattern("PAN")) && (
                    <labelError style={{ width: "100%", marginTop: "5px", fontSize: "16px", marginBottom: "12px", color: "red" }}>
                      {t("BPA_INVALID_PAN_NO")}
                    </labelError>
                  )}
                  <h3 className="error-message" style={{ color: "red" }}>
                    {PanValError}
                  </h3>
                </Form.Group>
                {/* <Form.Group className="col-md-4 mb-2">
                    <label htmlFor="name" className="text">Upload Board Resolution <span className="text-danger font-weight-bold">*</span></label>
                    <div className="d-flex">
                      <input
                        type="file"
                        name="uploadBoardResolution"
                        accept="application/pdf"
                        placeholder=""
                        class="form-control"
                        onChange={(e) => getDocumentData(e?.target?.files[0], "uploadBoardResolution","licenceBoardResolution")}
                      />
                      <span>
                      {uploadBoardResolution ?
                          <a onClick={() => getDocShareholding(uploadBoardResolution)} className="btn btn-sm col-md-6">
                              <VisibilityIcon color="info" className="icon" />
                          </a> : <p></p>
                      }
                      </span>
                    </div>
                </Form.Group>
                <Form.Group className="col-md-4 mb-2">
                    <label htmlFor="name" className="text">Upload Digital Signature <span className="text-danger font-weight-bold">*</span></label>
                    <div className="d-flex">
                      <input
                        type="file"
                        name="uploadDigitalSignaturePdf"
                        accept="application/pdf"
                        placeholder=""
                        class="form-control"
                        onChange={(e) => getDocumentData(e?.target?.files[0], "uploadDigitalSignaturePdf","licenceBoardResolution")}
                      />
                      <span>
                      {uploadDigitalSignaturePdf ?
                          <a onClick={() => getDocShareholding(uploadDigitalSignaturePdf)} className="btn btn-sm col-md-6">
                              <VisibilityIcon color="info" className="icon" />
                          </a> : <p></p>
                      }
                      </span>
                    </div>
                </Form.Group> */}
              </Row>
            </Card>
            <Card className="mb-3">
              <h4 className="mb-2 fw-bold">Permanent Address</h4>
              <Row className="justify-content-between">
                {/* <Form.Group className="col-md-4 mb-2">
                <label>{`${t("BPA_PERMANANT_ADDRESS_LABEL")}*`}</label>
                <TextArea
                  t={t}
                  isMandatory={false}
                  type={"text"}
                  optionKey="i18nKey"
                  name="PermanentAddress"
                  onChange={selectPermanentAddress}
                  value={PermanentAddress}
                  />
              </Form.Group> */}
                <Form.Group className="col-md-4 mb-2">
                  <label>
                    {`${"Address Line 1"}`}
                    <span class="text-danger font-weight-bold mx-2">*</span>
                  </label>
                  {/* <TextInput
                    t={t}
                    type={"text"}
                    isMandatory={false}
                    optionKey="i18nKey"
                    name="addressLineOne"
                    value={addressLineOne}
                    placeholder={addressLineOne}
                    onChange={selectHouseNumber}
                    {...(validation = {
                      isRequired: true,
                      type: "text",
                      
                    })}
                  /> */}
                  <input type="text" name="addressLineOne" value={addressLineOne} onChange={selectHouseNumber} className="form-control" />
                  {/* <Form.Control type="text" placeholder="N/A" {...register("addressLineOne")}   onChange={(e) => setAddressLineOne(e.target.value)} value={addressLineOne}/>
              <h3 className="error-message"style={{color:"red"}}>{errors?.addressLineOne && errors?.addressLineOne?.message}</h3> */}
                </Form.Group>
                <Form.Group className="col-md-4 mb-2">
                  <label>{`${"Address Line 2"}`}</label>
                  {/* <TextInput
                    t={t}
                    type={"text"}
                    isMandatory={false}
                    optionKey="i18nKey"
                    name="addressLineTwo"
                    value={addressLineTwo}
                    placeholder={addressLineTwo}
                    onChange={selectColonyName}
                  /> */}
                  <input
                    name="addressLineTwo"
                    value={addressLineTwo}
                    placeholder={addressLineTwo}
                    onChange={selectColonyName}
                    className="form-control"
                  />
                </Form.Group>
                <Form.Group className="col-md-4 mb-2">
                  <label>{`${"Address Line 3"}`}</label>
                  {/* <TextInput
                    t={t}
                    type={"text"}
                    isMandatory={false}
                    optionKey="i18nKey"
                    name="addressLineThree"
                    value={addressLineThree}
                    placeholder={addressLineThree}
                    onChange={selectStreetName}
                  /> */}
                  <input
                    name="addressLineThree"
                    value={addressLineThree}
                    placeholder={addressLineThree}
                    onChange={selectStreetName}
                    className="form-control"
                  />
                </Form.Group>
                <Form.Group className="col-md-4 mb-2">
                  <label>{`${"Address Line 4"}`}</label>
                  {/* <TextInput
                    t={t}
                    type={"text"} 
                    isMandatory={false}
                    optionKey="i18nKey"
                    name="addressLineFour"
                    value={addressLineFour}
                    placeholder={addressLineFour}
                    onChange={selectLocality}
                  /> */}
                  <input
                    name="addressLineFour"
                    value={addressLineFour}
                    placeholder={addressLineFour}
                    onChange={selectLocality}
                    className="form-control"
                  />
                </Form.Group>
                <Form.Group className="col-md-4 mb-2">
                  <label>
                    {`${"City"}`}
                    <span class="text-danger font-weight-bold mx-2">*</span>
                  </label>
                  {/* <TextInput
                    t={t}
                    type={"text"}
                    isMandatory={false}
                    optionKey="i18nKey"
                    name="city"
                    value={city}
                    placeholder={city}
                    onChange={selectCity}
                    {...(validation = {
                      isRequired: true,
                      type: "text",
                    })}
                  /> */}
                  <input name="city" value={city} placeholder={city} onChange={selectCity} className="form-control" />
                </Form.Group>
                <Form.Group className="col-md-4 mb-2">
                  <label>{`${"Pincode"}*`} <span class="text-danger font-weight-bold mx-2">*</span></label>
                  {/* <MobileNumber
                    value={pincode}
                    name="pincode"
                    maxlength={"6"}
                    hideSpan="true"
                    onChange={selectPincode}
                    {...{ required: true, pattern: "[1-9][0-9]{5}", type: "tel"}}
                  /> */}
                  <input
                    type="text"
                    value={pincode}
                    name="pincode"
                    maxlength={"6"}
                    max={6}
                    hideSpan="true"
                    onChange={selectPincode}
                    className="form-control"
                  />
                  {pincode && pincode.length > 0 && !pincode.match(Digit.Utils.getPattern("Pincode")) && (
                    <labelError style={{ width: "100%", marginTop: "-15px", fontSize: "16px", marginBottom: "12px", color: "red" }}>
                      {t("Please enter valid Pincode")}
                    </labelError>
                  )}
                </Form.Group>
                <Form.Group className="col-md-4 mb-2">
                  <label>{`${"Village"}`}</label>
                  {/* <TextInput
                    t={t}
                    type={"text"}
                    isMandatory={false}
                    optionKey="i18nKey"
                    name="village"
                    value={village}
                    placeholder={village}
                    onChange={selectVillage}
                    {...(validation = {
                      isRequired: false,
                      type: "text",
                    })}
                  /> */}
                  <input type="text" name="village" value={village} placeholder={village} onChange={selectVillage} className="form-control" />
                </Form.Group>
                <Form.Group className="col-md-4 mb-2">
                  <label>{`${"Tehsil"}`}</label>
                  {/* <TextInput
                    t={t}
                    type={"text"}
                    isMandatory={false}
                    optionKey="i18nKey"
                    name="tehsil"
                    value={tehsil}
                    placeholder={tehsil}
                    onChange={selectTehsil}
                    {...(validation = {
                      isRequired: false,
                      type: "text",
                    })}
                  /> */}
                  <input type="text" name="tehsil" value={tehsil} placeholder={tehsil} onChange={selectTehsil} className="form-control" />
                </Form.Group>
                <Form.Group className="col-md-4 mb-2">
                  <label>{`${"State"}`}</label>
                  {/* <TextInput
                    t={t}
                    type={"text"}
                    isMandatory={false}
                    optionKey="i18nKey"
                    name="state"
                    value={state}
                    placeholder={state}
                    onChange={selectState}
                    {...(validation = {
                      isRequired: false,
                      type: "text",
                    })}
                  /> */}
                  <input type="text" name="state" value={state} placeholder={state} onChange={selectState} className="form-control" />
                </Form.Group>
                <Form.Group className="col-md-4 mb-2">
                  <label>{`${"District"}`}</label>
                  {/* <TextInput
                    t={t}
                    type={"text"}
                    isMandatory={false}
                    optionKey="i18nKey"
                    name="district"
                    value={district}
                    placeholder={district}
                    onChange={selectDistrict}
                    {...(validation = {
                      isRequired: false,
                      type: "text",
                    })}
                  /> */}
                  <input type="text" name="district" value={district} placeholder={district} onChange={selectDistrict} className="form-control" />
                </Form.Group>
              </Row>
            </Card>
            <Card className="mb-3 d-none">
              <h4 className="mb-2 fw-bold">Correspondence Address</h4>
              <Row className="justify-content-between">
                <Form.Group className="col-md-12">
                  <CheckBox
                    label={t("BPA_SAME_AS_PERMANENT_ADDRESS")}
                    onChange={(e) => selectChecked(e)}
                    value={isAddressSame}
                    checked={isAddressSame}
                    name={isAddressSame}
                    style={{ paddingBottom: "10px", paddingTop: "10px" }}
                  />
                </Form.Group>
                <Form.Group className="col-md-4 mb-2">
                  <label>
                    {`${"Address Line 1"}`}
                    <span class="text-danger font-weight-bold mx-2">*</span>
                  </label>
                  {/* <TextInput
                    t={t}
                    type={"text"}
                    isMandatory={true}
                    optionKey="i18nKey"
                    name="addressLineOneCorrespondence"
                    value={addressLineOneCorrespondence}
                    placeholder={addressLineOneCorrespondence}
                    onChange={selecthouseNumberCorrespondenceaddress}
                    disable={isAddressSame}
                  /> */}
                  <input
                    type="text"
                    name="addressLineOneCorrespondence"
                    value={addressLineOneCorrespondence}
                    placeholder={addressLineOneCorrespondence}
                    onChange={selecthouseNumberCorrespondenceaddress}
                    className="form-control"
                    disabled={isAddressSame ? true : false}
                  />
                </Form.Group>
                <Form.Group className="col-md-4 mb-2">
                  <label>{`${"Address Line 2"}`}</label>
                  {/* <TextInput
                    t={t}
                    type={"text"}
                    isMandatory={false}
                    optionKey="i18nKey"
                    name="addressLineTwoCorrespondence"
                    value={addressLineTwoCorrespondence}
                    placeholder={addressLineTwoCorrespondence}
                    onChange={selectColonyNameCorrespondence}
                    disable={isAddressSame}
                  /> */}
                  <input
                    type="text"
                    name="addressLineTwoCorrespondence"
                    value={addressLineTwoCorrespondence}
                    placeholder={addressLineTwoCorrespondence}
                    onChange={selectColonyNameCorrespondence}
                    className="form-control"
                    disabled={isAddressSame ? true : false}
                  />
                </Form.Group>
                <Form.Group className="col-md-4 mb-2">
                  <label>{`${"Address Line 3"}`}</label>
                  {/* <TextInput
                    t={t}
                    type={"text"}
                    isMandatory={false}
                    optionKey="i18nKey"
                    name="addressLineThreeCorrespondence"
                    value={addressLineThreeCorrespondence}
                    placeholder={addressLineThreeCorrespondence}
                    onChange={selectStreetNameCorrespondence}
                    disabled={isAddressSame ? true : false}
                  /> */}
                  <input
                    type="text"
                    name="addressLineThreeCorrespondence"
                    value={addressLineThreeCorrespondence}
                    placeholder={addressLineThreeCorrespondence}
                    onChange={selectStreetNameCorrespondence}
                    className="form-control"
                    disabled={isAddressSame ? true : false}
                  />
                </Form.Group>
                <Form.Group className="col-md-4 mb-2">
                  <label>{`${"Address Line 4"}`}</label>
                  {/* <TextInput
                    t={t}
                    type={"text"}
                    isMandatory={false}
                    optionKey="i18nKey"
                    name="addressLineFourCorrespondence"
                    value={addressLineFourCorrespondence}
                    placeholder={addressLineFourCorrespondence}
                    onChange={selectLocalityCorrespondence}
                    disabled={isAddressSame ? true : false}
                  /> */}
                  <input
                    type="text"
                    name="addressLineFourCorrespondence"
                    value={addressLineFourCorrespondence}
                    placeholder={addressLineFourCorrespondence}
                    onChange={selectLocalityCorrespondence}
                    className="form-control"
                    disabled={isAddressSame ? true : false}
                  />
                </Form.Group>
                <Form.Group className="col-md-4 mb-2">
                  <label>{`${"City"}*`}</label>
                  {/* <TextInput
                    t={t}
                    type={"text"}
                    isMandatory={true}
                    optionKey="i18nKey"
                    name="cityCorrespondence"
                    value={cityCorrespondence}
                    placeholder={cityCorrespondence}
                    onChange={selectCityCorrespondence}
                    disabled={isAddressSame ? true : false}
                  /> */}
                  <input
                    type="text"
                    name="cityCorrespondence"
                    value={cityCorrespondence}
                    placeholder={cityCorrespondence}
                    onChange={selectCityCorrespondence}
                    className="form-control"
                    disabled={isAddressSame ? true : false}
                  />
                </Form.Group>
                <Form.Group className="col-md-4 mb-2">
                  <label>{`${"Pincode"}*`}</label>
                  {/* <MobileNumber
                      value={pincodeCorrespondence}
                      name="pincodeCorrespondence"
                      maxlength={"6"}
                      hideSpan="true"
                      disabled={isAddressSame ? true : false}
                      onChange={selectPincodeCorrespondence}
                      {...{ required: true, pattern: "[1-9][0-9]{5}", type: "tel"}}
                    /> */}
                  <input
                    type="number"
                    name="pincodeCorrespondence"
                    value={pincodeCorrespondence}
                    placeholder={pincodeCorrespondence}
                    onChange={selectPincodeCorrespondence}
                    className="form-control"
                    disabled={isAddressSame ? true : false}
                  />
                </Form.Group>
                <Form.Group className="col-md-4 mb-2">
                  <label>{`${"Village"}`}</label>
                  {/* <TextInput
                    t={t}
                    type={"text"}
                    isMandatory={false}
                    optionKey="i18nKey"
                    name="villageCorrespondence"
                    value={villageCorrespondence}
                    placeholder={villageCorrespondence}
                    onChange={selectVillageCorrespondence}
                    disabled={isAddressSame ? true : false}
                    {...(validation = {
                      isRequired: false,
                      type: "text",
                    })}
                  /> */}
                  <input
                    type="text"
                    name="villageCorrespondence"
                    value={villageCorrespondence}
                    placeholder={villageCorrespondence}
                    onChange={selectVillageCorrespondence}
                    className="form-control"
                    disabled={isAddressSame ? true : false}
                  />
                </Form.Group>
                <Form.Group className="col-md-4 mb-2">
                  <label>{`${"Tehsil"}`}</label>
                  {/* <TextInput
                    t={t}
                    type={"text"}
                    isMandatory={false}
                    optionKey="i18nKey"
                    name="tehsilCorrespondence"
                    value={tehsilCorrespondence}
                    placeholder={tehsilCorrespondence}
                    onChange={selectTehsilCorrespondence}
                    disabled={isAddressSame ? true : false}
                    {...(validation = {
                      isRequired: false,
                      type: "text",
                    })}
                  /> */}
                  <input
                    type="text"
                    name="tehsilCorrespondence"
                    value={tehsilCorrespondence}
                    placeholder={tehsilCorrespondence}
                    onChange={selectTehsilCorrespondence}
                    className="form-control"
                    disabled={isAddressSame ? true : false}
                  />
                </Form.Group>
                <Form.Group className="col-md-4 mb-2">
                  <label>{`${"State"}`}</label>
                  {/* <TextInput
                    t={t}
                    type={"text"}
                    isMandatory={false}
                    optionKey="i18nKey"
                    name="stateCorrespondence"
                    value={stateCorrespondence}
                    placeholder={stateCorrespondence}
                    onChange={selectStateCorrespondence}
                    disabled={isAddressSame ? true : false}
                    {...(validation = {
                      isRequired: false,
                      type: "text",
                    })}
                  /> */}
                  <input
                    type="text"
                    name="stateCorrespondence"
                    value={stateCorrespondence}
                    placeholder={stateCorrespondence}
                    onChange={selectStateCorrespondence}
                    className="form-control"
                    disabled={isAddressSame ? true : false}
                  />
                </Form.Group>
                <Form.Group className="col-md-4 mb-2">
                  <label>{`${"District"}`}</label>
                  {/* <TextInput
                    t={t}
                    type={"text"}
                    isMandatory={false}
                    optionKey="i18nKey"
                    name="districtCorrespondence"
                    value={districtCorrespondence}
                    placeholder={districtCorrespondence}
                    onChange={selectDistrictCorrespondence}
                    disabled={isAddressSame ? true : false}
                    {...(validation = {
                      isRequired: false,
                      type: "text",
                    })}
                  /> */}
                  <input
                    type="text"
                    name="districtCorrespondence"
                    value={districtCorrespondence}
                    placeholder={districtCorrespondence}
                    onChange={selectDistrictCorrespondence}
                    className="form-control"
                    disabled={isAddressSame ? true : false}
                  />
                </Form.Group>
              </Row>
            </Card>
            {toastError && (
              <Toast
                error={"error" ? true : false}
                label={toastError}
                isDleteBtn={true}
                onClose={() => {
                  setToastError(null);

                }}
              />
            )}
            {showToast && (
              <Toast
                success={showToast?.key === "success" ? true : false}
                label="Document Uploaded Successfully"
                isDleteBtn={true}
                onClose={() => {
                  setShowToast(null);
                  setError(null);
                }}
              />
            )}
            {showToastError && (
              <Toast
                error={showToastError?.key === "error" ? true : false}
                label="Duplicate file Selected"
                isDleteBtn={true}
                onClose={() => {
                  setShowToastError(null);
                  setError(null);
                }}
              />
            )}
          </FormStep>
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
};

export default LicenseDetails;
