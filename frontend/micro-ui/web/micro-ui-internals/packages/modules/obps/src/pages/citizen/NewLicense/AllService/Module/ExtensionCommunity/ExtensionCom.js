import React, { useEffect, useState } from "react";
import { Button } from "@material-ui/core";
import FormControl from "@mui/material/FormControl";
import { useForm } from "react-hook-form";
import OutlinedInput from "@mui/material/OutlinedInput";
import SearchLicenceComp from "../../../../../../components/SearchLicence";
import ReactMultiSelect from "../../../../../../../../../react-components/src/atoms/ReactMultiSelect";
import axios from "axios";
import FileUpload from "@mui/icons-material/FileUpload";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { getDocShareholding } from "../../../docView/docView.help";
import CusToaster from "../../../../../../components/Toaster";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Dialog } from "@mui/material";
import { styled } from "@mui/material/styles";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useTranslation } from "react-i18next";

const selectTypeData = [
  { label: "Licensee", value: "1" },
  { label: "Other than Licensee/Developer", value: "2" },
];
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));
function ExtensionCom() {
  const [selects, setSelects] = useState();
  const [showhide, setShowhide] = useState("");
  const [loader, setLoader] = useState(false);
  const [showToastError, setShowToastError] = useState({ label: "", error: false, success: false });
  const [fileStoreId, setFileStoreId] = useState({});
  const [selectedFiles, setSelectedFiles] = useState([]);
  const params = new URLSearchParams(location.search);
  const [applicationNumber, setApplicationNumber] = useState();
  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);
  const [licenseData, setLicenseData] = useState();
  const {t}= useTranslation();
  const handleshowhide = (event) => {
    const getuser = event.target.value;

    setShowhide(getuser);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    watch,
    setValue,
    resetField,
  } = useForm({});
   const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClickOpen1 = () => {
    setOpen1(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleClose1 = () => {
    setOpen1(false);
    
  };
   const getDocumentData = async (file, fieldName) => {
    if (selectedFiles.includes(file.name)) {
      setShowToastError({ label: "Duplicate file Selected", error: true, success: false });
      return;
    }
    const formData = new FormData();
    formData.append("file", file);
    formData.append("tenantId", "hr");
    formData.append("module", "property-upload");
    formData.append("tag", "tag-property");
    setLoader(true);
    try {
      const Resp = await axios.post("/filestore/v1/files", formData, {});
      setValue(fieldName, Resp?.data?.files?.[0]?.fileStoreId);
      setFileStoreId({ ...fileStoreId, [fieldName]: Resp?.data?.files?.[0]?.fileStoreId });
      setSelectedFiles([...selectedFiles, file.name]);
      setLoader(false);
      setShowToastError({ label: "File Uploaded Successfully", error: false, success: true });
    } catch (error) {
      setLoader(false);
      return error.message;
    }
  };

    const ExtensionCom = async (data) => {
    console.log("data", data);
    setLoader(true);
    const token = window?.localStorage?.getItem("token");
    const userInfo = Digit.UserService.getUser()?.info || {};
    const numberLic = data?.licenceNo;
    const postDistrict = {
      RequestInfo: {
          apiId: "Rainmaker",
          ver: "v1",
          ts: 0,
          action: "_search",
          did: "",
         key: "",
         msgId: "090909",
         requesterId: "",
         authToken: token,
        userInfo: userInfo,
   },
      constructionOfCommunity: [
        {
          ...data,
          appliedBy:data?.appliedBy?.label,
          licenseNumber: numberLic,
           newAdditionalDetails:{
                  selectLicence: data?.selectLicence?.label,
                  validUpto: data?.validUpto,
                  colonizerName: data?.colonizerName,
                  colonyType: data?.colonyType,
                  areaAcres: data?.areaAcres,
                  sectorNo: data?.sectorNo,
                  revenueEstate: data?.revenueEstate,
                  developmentPlan: data?.developmentPlan,
                  tehsil: data?.tehsil,
                  district: data?.district,
           }
          }
      ]
    };

    try {
      const Resp = await axios.post("/tl-services/construction/_create", postDistrict);
      setLoader(false);
      setApplicationNumber(Resp?.data?.constructionOfCommunity?.[0]?.applicationNumber);
      console.log("Resp=====", Resp?.data?.constructionOfCommunity?.[0]?.applicationNumber);
      setOpen(true);
    } catch (error) {
      setError(error?.response?.data?.Errors[0]?.message);
      setLoader(false);
    }
  };

   const UpdateExtensionInConstruction = async (data) => {
   const token = window?.localStorage?.getItem("token");
    const userInfo = Digit.UserService.getUser()?.info || {};
     const numberLic = data?.licenceNo;
    console.log("REQUEST LOG1 ====> ", data, JSON.stringify(data));
    try {
      setLoader(true);
      const body = {
        RequestInfo: {
          apiId: "Rainmaker",
          msgId: "1669293303096|en_IN",
         authToken: token,
        userInfo: userInfo,
        },
        "constructionOfCommunity": [
          {
            ...licenseData,
             licenseNumber: numberLic,
            appliedBy: data?.appliedBy,
            areaInAcers: data?.areaInAcers,
            validUpTo: data?.validUpTo,
            applyedForExtentionPerioud: data?.applyedForExtentionPerioud,
            typeOfCommunitySite: data?.typeOfCommunitySite,
            copyOfBoardResolution: data?.copyOfBoardResolution,
            justificationForExtention: data?.justificationForExtention,
            proofOfOwnershipOfCommunity: data?.proofOfOwnershipOfCommunity,
            proofOfOnlinePaymentOfExtention: data?.proofOfOnlinePaymentOfExtention,
            uploadRenewalLicenseCopy: data?.uploadRenewalLicenseCopy,
            explonatoryNotForExtention: data?.explonatoryNotForExtention,
            locationOfApplied: data?.locationOfApplied,
            anyOtherDocumentByDirector: data?.anyOtherDocumentByDirector
          },
        ],
      };

      const response = await axios.post("/tl-services/construction/_update", body);

      console.log("Update Response ====> ", response);

      setLoader(false);
      setApplicationNumber(response?.data?.constructionOfCommunity?.[0]?.applicationNumber);
    } catch (err) {
      console.log("Update Error ====> ", err.message);
      setLoader(false);
      setShowToastError({ label: err.message, error: true, success: false });
    }
  };

  const extensionComSiteLic = (data) => {
    if (params.get("id")) {
      UpdateExtensionInConstruction(data);
    } else {
      ExtensionCom(data);
    }
  };

   const getLicenseData = async () => {
      const token = window?.localStorage?.getItem("token");
    const userInfo = Digit.UserService.getUser()?.info || {};
    try {
      let id = params.get("id");
      setLoader(true);

      const requestData = {
        RequestInfo: {
          apiId: "Rainmaker",
          authToken: token,
        userInfo: userInfo,
          msgId: "1669293303096|en_IN"
        },
      };
      const response = await axios.post(`/tl-services/construction/_get?applicationNumber=${id}`, requestData);
      console.log("Response ====> ", response);
      setLicenseData(response?.data?.constructionOfCommunity?.[0]);
      const details = response?.data?.constructionOfCommunity?.[0];
      setValue("licenceNo", details?.newAdditionalDetails?.licenseNo);
      setValue("appliedBy", details?.appliedBy);
      setValue("outstandingDues", details?.outstandingDues);
      setValue("typeOfCommunitySite", details?.typeOfCommunitySite);
      setValue("licenceRenewd", details?.licenceRenewd);
      setValue("areaInAcers", details?.areaInAcers);
      setValue("validUpTo", details?.validUpTo);
      setValue("applyedForExtentionPerioud", details?.applyedForExtentionPerioud);
      setValue("amount", details?.amount);
      setValue("copyOfBoardResolution", details?.copyOfBoardResolution);
      setValue("justificationForExtention", details?.justificationForExtention);
      setValue("proofOfOwnershipOfCommunity", details?.proofOfOwnershipOfCommunity);
      setValue("proofOfOnlinePaymentOfExtention", details?.proofOfOnlinePaymentOfExtention);
      setValue("explonatoryNotForExtention", details?.explonatoryNotForExtention);
      setValue("uploadRenewalLicenseCopy", details?.uploadRenewalLicenseCopy);
      setValue("locationOfApplied", details?.locationOfApplied);
      setValue("anyOtherDocumentByDirector", details?.anyOtherDocumentByDirector);
      setValue("areaAcres", details?.newAdditionalDetails?.areaAcres);
      setValue("licenceGrantDate", details?.newAdditionalDetails?.licenceGrantDate);
      setValue("colonizerName", details?.newAdditionalDetails?.colonizerName);
      setValue("colonyType", details?.newAdditionalDetails?.colonyType);
      setValue("developmentPlan", details?.newAdditionalDetails?.developmentPlan);
      setValue("district", details?.newAdditionalDetails?.district);
      setValue("periodOfRenewal", details?.newAdditionalDetails?.periodOfRenewal);
      setValue("renewalRequiredUpto", details?.newAdditionalDetails?.renewalRequiredUpto);
      setValue("revenueEstate", details?.newAdditionalDetails?.revenueEstate);
      setValue("sectorNo", details?.newAdditionalDetails?.sectorNo);
      setValue("selectLicence", details?.newAdditionalDetails?.selectLicence);
      setValue("tehsil", details?.newAdditionalDetails?.tehsil);
      setValue("validUpto", details?.newAdditionalDetails?.validUpto);

      setLoader(false);
    } catch (error) {
      console.log("Get Error ====> ", error.message);
      setLoader(false);
      setShowToastError({ label: error.message, error: true, success: false });
    }
  };

   useEffect(() => {
    getLicenseData();
  }, []);

  return (
    <div>
    <form onSubmit={handleSubmit(extensionComSiteLic)}>
      <div className="card" style={{ width: "126%", border: "5px solid #1266af" }}>
        <h4 style={{ fontSize: "25px", marginLeft: "21px" }}>{t("EXTENSION _COMMUNITY_SITE_HEADING")}
        {/* Extension (construction in community site) */}
        </h4>
        <div className="card">
          <div className="row-12">
            <div className="row gy-3">
              <SearchLicenceComp
                watch={watch}
                register={register}
                control={control}
                setLoader={setLoader}
                errors={errors}
                setValue={setValue}
                resetField={resetField}
              />
            </div>
            </div>
              &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
              <div className="row-12">
                  <div className="col md={4} xxl lg-4">
              <FormControl>
                <h2 className="FormLable">
                  {" "}{t("EXTENSION _COMMUNITY_SITE_APPLIED_BY")}
                  {/*   */}
                   <span style={{ color: "red" }}>*</span>
                </h2>
                <ReactMultiSelect control={control} name="appliedBy" placeholder="Select Type" data={selectTypeData} labels="" />
                {/* <select className="Inputcontrol" class="form-control" placeholder="" {...register("appliedBy")} onChange={(e) => handleshowhide(e)}>
                  <option value=" ">----Select value-----</option>
                  <option value="1">Licensee</option>
                  <option value="2">Other than Licensee/Developer</option>
                </select> */}
             </FormControl>
          
              &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
              <FormControl>
                <h2 className="FormLable">
                  {" "}{t("EXTENSION _COMMUNITY_SITE_OUTSTANDING_DUES")}
                  {/* Outstanding dues if any */}
                   <span style={{ color: "red" }}>*</span>
                </h2>

                <OutlinedInput type="number" className="Inputcontrol" placeholder="" {...register("outstandingDues")} />
              </FormControl>
              &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
              <FormControl>
                <h2 className="FormLable">
                  {" "}{t("EXTENSION _COMMUNITY_SITE_TYPE")}
                  {/* Type of community site */}
                  <span style={{ color: "red" }}>*</span>
                </h2>

                <OutlinedInput type="text" className="Inputcontrol" placeholder="" {...register("typeOfCommunitySite")} />
              </FormControl>
               &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
                {watch("appliedBy")?.value == "1" && (
               <FormControl className="col col-md:4 col-lg-4 ">
                    <h2 className="FormLable">
                     Licensed renewed Upto 
                      <span style={{ color: "red" }}>*</span>
                    </h2>
                    <OutlinedInput type="date" placeholder=""  className="Inputcontrol" {...register("licenceRenewd")} />
                  </FormControl>
               
              )}
               
               </div>
               </div>
                 
            
          <br></br>
          <div className="row-12">
            <div className="col md={4} xxl lg-4">
              <FormControl>
                <h2 className="FormLable">
                  {" "}{t("EXTENSION _COMMUNITY_SITE_AREA_IN_ACRES")}
                  {/* Area in Acres */}
                  <span style={{ color: "red" }}>*</span>
                </h2>
                <OutlinedInput type="number" className="Inputcontrol" placeholder="" {...register("areaInAcers")} />
              </FormControl>
              &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
              <FormControl>
                <h2 className="FormLable">
                  {" "}{t("EXTENSION _COMMUNITY_SITE_VALID_UPTO")}
                  {/* Community site valid up to  */}
                  <span style={{ color: "red" }}>*</span>{" "}
                </h2>
                <OutlinedInput type="date" className="Inputcontrol" placeholder="" {...register("validUpTo")} />
              </FormControl>
              &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
              <FormControl>
                <h2
                  className="FormLable"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="Apply for an Extension of time for construction of the
                  community site (in years)"
                >
                  {" "}{t("EXTENSION _COMMUNITY_SITE_TIME")}
                   {/* Extension of time   */}
                  <span style={{ color: "red" }}>*</span>
                </h2>

                <OutlinedInput type="date" className="Inputcontrol" placeholder="" {...register("applyedForExtentionPerioud")} />
              </FormControl>
              &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
              <FormControl>
                <h2 className="FormLable">
                  {" "}{t("EXTENSION _COMMUNITY_SITE_AMOUNT")}
                  {/* Amount (Rs.) */}
                   <span style={{ color: "red" }}>*</span>
                </h2>

                <OutlinedInput type="number" className="Inputcontrol" placeholder="" {...register("amount")} />
              </FormControl>
            </div>
          </div>
        </div>
 &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
        <div>
              <div className="table table-bordered table-responsive">
                <thead>
                  <tr>
                    <th style={{ textAlign: "center" }}>{t("EXTENSION _COMMUNITY_SITE_SR_NO")}
                    {/* Sr.No */}
                    </th>
                    <th style={{ textAlign: "center" }}>{t("EXTENSION _COMMUNITY_SITE_FIELD_NAME")}
                    {/* Field Name */}
                    </th>
                    <th style={{ textAlign: "center" }}>{t("EXTENSION _COMMUNITY_SITE_UPLOAD_DOC")}
                    {/* Upload Documents */}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">1</th>
                    <td>{t("EXTENSION _COMMUNITY_SITE_BOARD_RESOLUTION_AUTHORIZE_SIGNATORY")}
                      {/* Copy of Board resolution in favour of authorized signatory, applying for case (if applicable) */}
                      <span style={{ color: "red" }}>*</span>
                    </td>
                    <td>
                       <div>
                                    <label>
                                      <FileUpload style={{ cursor: "pointer" }} color="primary" />
                                      <input
                                        type="file"
                                        style={{ display: "none" }}
                                        accept="application/pdf/jpeg/png"
                                        onChange={(e) => getDocumentData(e?.target?.files[0], "copyOfBoardResolution")}
                                      />
                                    </label>
                                    {watch("copyOfBoardResolution") && (
                                      <a onClick={() => getDocShareholding(watch("copyOfBoardResolution"), setLoader)} className="btn btn-sm ">
                                        <VisibilityIcon color="info" className="icon" />
                                      </a>
                                    )}
                                  </div>
                      {/* <input type="file" className="form-control" placeholder="" {...register("copyBoardResolution")}></input> */}
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">2</th>
                    <td>
                      {" "}{t("EXTENSION _COMMUNITY_SITE_JUSTIFICATION_TIME_PERIOD")}
                      {/* Justification for extension in time period for construction of community site  */}
                      <span style={{ color: "red" }}>*</span>
                    </td>
                    <td>
                       <div>
                                    <label>
                                      <FileUpload style={{ cursor: "pointer" }} color="primary" />
                                      <input
                                        type="file"
                                        style={{ display: "none" }}
                                        accept="application/pdf/jpeg/png"
                                        onChange={(e) => getDocumentData(e?.target?.files[0], "justificationForExtention")}
                                      />
                                    </label>
                                    {watch("justificationForExtention") && (
                                      <a onClick={() => getDocShareholding(watch("justificationForExtention"), setLoader)} className="btn btn-sm ">
                                        <VisibilityIcon color="info" className="icon" />
                                      </a>
                                    )}
                                  </div>
                      {/* <input type="file" className="form-control" placeholder="" {...register("justificationExtension")}></input> */}
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">3</th>
                    <td>
                      {" "}{t("EXTENSION _COMMUNITY_SITE_PROOF_OWNERSHIP")}
                      {/* Proof of ownership of community site (in case of the extension is sought by an applicant other than the licensee) .{" "} */}
                      <span style={{ color: "red" }}>*</span>
                    </td>
                    <td>
                       <div>
                                    <label>
                                      <FileUpload style={{ cursor: "pointer" }} color="primary" />
                                      <input
                                        type="file"
                                        style={{ display: "none" }}
                                        accept="application/pdf/jpeg/png"
                                        onChange={(e) => getDocumentData(e?.target?.files[0], "proofOfOwnershipOfCommunity")}
                                      />
                                    </label>
                                    {watch("proofOfOwnershipOfCommunity") && (
                                      <a onClick={() => getDocShareholding(watch("proofOfOwnershipOfCommunity"), setLoader)} className="btn btn-sm ">
                                        <VisibilityIcon color="info" className="icon" />
                                      </a>
                                    )}
                                  </div>
                      {/* <input type="file" className="form-control" placeholder="" {...register("proofOwnership")}></input> */}
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">4</th>
                    <td>
                      {" "}{t("EXTENSION _COMMUNITY_SITE_PROOF_ONLINE_PAYMENT")}
                      {/* Proof of online payment of extension fees at the rates provided in Schedule-C to these Rules.{" "} */}
                      <span style={{ color: "red" }}>*</span>
                    </td>
                    <td>
                       <div>
                                    <label>
                                      <FileUpload style={{ cursor: "pointer" }} color="primary" />
                                      <input
                                        type="file"
                                        style={{ display: "none" }}
                                        accept="application/pdf/jpeg/png"
                                        onChange={(e) => getDocumentData(e?.target?.files[0], "proofOfOnlinePaymentOfExtention")}
                                      />
                                    </label>
                                    {watch("proofOfOnlinePaymentOfExtention") && (
                                      <a onClick={() => getDocShareholding(watch("proofOfOnlinePaymentOfExtention"), setLoader)} className="btn btn-sm ">
                                        <VisibilityIcon color="info" className="icon" />
                                      </a>
                                    )}
                                  </div>
                      {/* <input type="file" className="form-control" placeholder="" {...register("proofOnlinePayment")}></input> */}
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">5</th>
                    <td>
                      {" "}{t("EXTENSION _COMMUNITY_SITE_EXPLANATORY_NOTE_DETAILS")}
                      {/* An explanatory note indicating the details of progress made about the construction of such a community site{" "} */}
                      <span style={{ color: "red" }}>*</span>
                    </td>
                    <td>
                       <div>
                                    <label>
                                      <FileUpload style={{ cursor: "pointer" }} color="primary" />
                                      <input
                                        type="file"
                                        style={{ display: "none" }}
                                        accept="application/pdf/jpeg/png"
                                        onChange={(e) => getDocumentData(e?.target?.files[0], "explonatoryNotForExtention")}
                                      />
                                    </label>
                                    {watch("explonatoryNotForExtention") && (
                                      <a onClick={() => getDocShareholding(watch("explonatoryNotForExtention"), setLoader)} className="btn btn-sm ">
                                        <VisibilityIcon color="info" className="icon" />
                                      </a>
                                    )}
                                  </div>
                      {/* <input type="file" className="form-control" placeholder="" {...register("explanatoryNote")}></input> */}
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">6</th>
                    <td>
                      {" "}{t("EXTENSION _COMMUNITY_SITE_UPLOAD_RENEWED_LICENCE")}
                      {/* In case of other than licensee/developer, upload renewed license copy. */}
                      <span style={{ color: "red" }}>*</span>
                    </td>
                    <td>
                       <div>
                                    <label>
                                      <FileUpload style={{ cursor: "pointer" }} color="primary" />
                                      <input
                                        type="file"
                                        style={{ display: "none" }}
                                        accept="application/pdf/jpeg/png"
                                        onChange={(e) => getDocumentData(e?.target?.files[0], "uploadRenewalLicenseCopy")}
                                      />
                                    </label>
                                    {watch("uploadRenewalLicenseCopy") && (
                                      <a onClick={() => getDocShareholding(watch("uploadRenewalLicenseCopy"), setLoader)} className="btn btn-sm ">
                                        <VisibilityIcon color="info" className="icon" />
                                      </a>
                                    )}
                                  </div>
                      {/* <input type="file" className="form-control" placeholder="" {...register("uploadRenewalLicense")}></input> */}
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">7</th>
                    <td>
                      {" "}{t("EXTENSION _COMMUNITY_SITE_LOCATION_APPLIED_COMMUNITY")}
                     {/* Location of applied community site on the plan. */}
                     <span style={{ color: "red" }}>*</span>
                    </td>
                    <td>
                        <div>
                                    <label>
                                      <FileUpload style={{ cursor: "pointer" }} color="primary" />
                                      <input
                                        type="file"
                                        style={{ display: "none" }}
                                        accept="application/pdf/jpeg/png"
                                        onChange={(e) => getDocumentData(e?.target?.files[0], "locationOfApplied")}
                                      />
                                    </label>
                                    {watch("locationOfApplied") && (
                                      <a onClick={() => getDocShareholding(watch("locationOfApplied"), setLoader)} className="btn btn-sm ">
                                        <VisibilityIcon color="info" className="icon" />
                                      </a>
                                    )}
                                  </div>
                      {/* <input type="file" className="form-control" placeholder="" {...register("directorDemanded")}></input> */}
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">8</th>
                    <td>
                      {" "}{t("EXTENSION _COMMUNITY_SITE_ANY_OTHER_DOC_DIRECTOR")}
                      {/* Any other document which the director may require for the said purpose. */}
                       <span style={{ color: "red" }}>*</span>
                    </td>
                    <td>
                        <div>
                                    <label>
                                      <FileUpload style={{ cursor: "pointer" }} color="primary" />
                                      <input
                                        type="file"
                                        style={{ display: "none" }}
                                        accept="application/pdf/jpeg/png"
                                        onChange={(e) => getDocumentData(e?.target?.files[0], "anyOtherDocumentByDirector")}
                                      />
                                    </label>
                                    {watch("anyOtherDocumentByDirector") && (
                                      <a onClick={() => getDocShareholding(watch("anyOtherDocumentByDirector"), setLoader)} className="btn btn-sm ">
                                        <VisibilityIcon color="info" className="icon" />
                                      </a>
                                    )}
                                  </div>
                      {/* <input type="file" className="form-control" placeholder="" {...register("documentdirector")}></input> */}
                    </td>
                  </tr>
                </tbody>
              </div>
        </div>

        {/* <div>
          {showhide === "1" && (
            <div className="card">
              <div className="table table-bordered table-responsive">
                <thead>
                  <tr>
                    <th style={{ textAlign: "center" }}>Sr.No</th>
                    <th style={{ textAlign: "center" }}>Field Name</th>
                    <th style={{ textAlign: "center" }}>Upload Documents</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">1</th>
                    <td>
                      Copy of Board resolution in favour of authorized signatory, applying for case (if applicable)
                      <span style={{ color: "red" }}>*</span>
                    </td>
                    <td>
                      <input type="file" className="form-control" placeholder="" {...register("boardResolutionSignatory")}></input>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">2</th>
                    <td>
                      {" "}
                      Justification for extension in time period for construction of community site <span style={{ color: "red" }}>*</span>
                    </td>
                    <td>
                      <input type="file" className="form-control" placeholder="" {...register("extensionTimePeriod")}></input>
                    </td>
                  </tr>
                 
                  <tr>
                    <th scope="row">3</th>
                    <td>
                      {" "}
                      Proof of online payment of extension fees at the rates provided in Schedule-C to these Rules.{" "}
                      <span style={{ color: "red" }}>*</span>
                    </td>
                    <td>
                      <input type="file" className="form-control" placeholder="" {...register("onlinePaymentExtensionFee")}></input>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">4</th>
                    <td>
                      {" "}
                      An explanatory note indicating the details of progress made about the construction of such a community site{" "}
                      <span style={{ color: "red" }}>*</span>
                    </td>
                    <td>
                      <input type="file" className="form-control" placeholder="" {...register("indicatingProgress")}></input>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">5</th>
                    <td>
                      {" "}
                      In case of other than licensee/developer, upload renewed license copy.
                      <span style={{ color: "red" }}>*</span>
                    </td>
                    <td>
                      <input type="file" className="form-control" placeholder="" {...register("uploadRenewd")}></input>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">6</th>
                    <td>
                      {" "}
                      Any other document as demanded by Director at any time.<span style={{ color: "red" }}>*</span>
                    </td>
                    <td>
                      <input type="file" className="form-control" placeholder="" {...register("demandedDirector")}></input>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">7</th>
                    <td>
                      {" "}
                      Any other document which the director may require for the said purpose. <span style={{ color: "red" }}>*</span>
                    </td>
                    <td>
                      <input type="file" className="form-control" placeholder="" {...register("documenteddDirector")}></input>
                    </td>
                  </tr>
                </tbody>
              </div>
            </div>
          )}
        </div> */}

        <div class="row">
          <div class="col-sm-12 text-right">
            <button type="submit" id="btnSearch" onClick={handleClickOpen1} class="btn btn-primary btn-md center-block">
              Submit
            </button>
          </div>
          <div class="col-sm-12 text-right">
            <button id="btnSearch" class="btn btn-primary btn-md center-block" style={{ marginTop: "-58px", marginRight: "97px" }}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </form>
       <Dialog open={open1} onClose={handleClose1} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">Extension of construction in community site Submission</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <p>
              Your Extension of construction in community site is submitted successfully{" "}
              <span>
                <CheckCircleOutlineIcon style={{ color: "blue", variant: "filled" }} />
              </span>
            </p>
            <p>
              Please Note down your Application Number <span style={{ padding: "5px", color: "blue" }}>{applicationNumber}</span> for further
              assistance
            </p>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose1} autoFocus>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    {showToastError && (
        <CusToaster
          label={showToastError?.label}
          success={showToastError?.success}
          error={showToastError?.error}
          onClose={() => {
            setShowToastError({ label: "", success: false, error: false });
          }}
        />
      )}
      </div>
  );
}

export default ExtensionCom;
