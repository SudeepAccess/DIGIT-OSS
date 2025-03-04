import React, { useState, useEffect } from "react";
import FormControl from "@mui/material/FormControl";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useLocation, useHistory } from "react-router-dom";
import Spinner from "../../../../components/Loader";
import { getDocShareholding } from "../docView/docView.help";
import { VALIDATION_SCHEMA } from "../../../../utils/schema/step1";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CusToaster from "../../../../components/Toaster";
import FileUpload from "@mui/icons-material/FileUpload";
import { useTranslation } from "react-i18next";

const ApllicantFormStep1 = (props) => {
  const { t } = useTranslation();
  const history = useHistory();
  const location = useLocation();
  const userInfo = Digit.UserService.getUser()?.info || {};
  const tenant = Digit.ULBService.getCurrentTenantId();
  const [developerDataLabel, setDeveloperDataLabel] = useState([]);
  const [loader, setLoader] = useState(false);
  const [getData, setData] = useState({ caseNumber: "", dairyNumber: "" });
  // const [getAppliantInfoData, setAppliantInfoData] = useState(null);
  const [applicantId, setApplicantId] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [fileStoreId, setFileStoreId] = useState({});
  const [showToastError, setShowToastError] = useState({ label: "", error: false, success: false });
  const [getDisable, setDisable] = useState(true);
  const [getAuthUserData, setAuthUserData] = useState(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    control,
    setValue,
  } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
    resolver: yupResolver(VALIDATION_SCHEMA),
    shouldFocusError: true,
  });
  const token = window?.localStorage?.getItem("token");
  const ApplicantFormSubmitHandlerForm = async (data) => {
    delete data?.developerName;
    delete data?.developerNameA;
    delete data?.developerAddress;
    delete data?.developerEmail;
    delete data?.developerType;
    delete data?.developerCinNo;
    delete data?.developerPanNo;
    delete data?.developerGstNo;
    delete data?.developerLlpNo;
    delete data?.directorDinNo;
    delete data?.directorName;
    delete data?.directorContactNumber;
    delete data?.directorDoc;
    delete data?.shareholdingName;
    delete data?.shareholdingDesignition;
    delete data?.shareholdingPercentage;
    delete data?.shareholdingDoc;
    delete data?.authorizedName;
    delete data?.authorizedMobile;
    delete data?.authorizedEmail;
    delete data?.authorizedPan;
    delete data?.authorizedAddress;

    const testingData = developerDataLabel;
    const postDistrict = {
      pageName: "ApplicantInfo",
      action: "INITIATE",
      applicationNumber: applicantId,
      createdBy: userInfo?.id,
      updatedBy: userInfo?.id,

      LicenseDetails: {
        ApplicantInfo: {
          ...data,
          devDetail: {
            ...testingData,
            aurthorizedUserInfoArray: testingData?.aurthorizedUserInfoArray?.filter((item) => item?.emailId === userInfo?.emailId),
          },
        },
      },
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
    };
    try {
      const Resp = await axios.post("/tl-services/new/_create", postDistrict);
      const licData = Resp?.data?.LicenseServiceResponseInfo?.[0]?.LicenseDetails?.[0];
      history.push({
        pathname: window.location.pathname,
        search: `?id=${Resp?.data?.LicenseServiceResponseInfo?.[0]?.applicationNumber}`,
      });
      props.Step1Continue(Resp?.data?.LicenseServiceResponseInfo?.[0]?.applicationNumber, userInfo, licData);
    } catch (error) {
      return error;
    }
  };

  const getUserInfo = async () => {
    const uuid = userInfo?.uuid;
    if (uuid) {
      try {
        const usersResponse = await Digit.UserService.userSearch(tenant, { uuid: [uuid] }, {});
        const userData = usersResponse?.user[0];
        getDeveloperDataLabel(userData?.parentId);
      } catch (error) {
        return error;
      }
    }
  };

  const getDeveloperDataLabel = async (id) => {
    try {
      const Resp = await axios.get(`http://103.166.62.118:80/user/developer/_getDeveloperById?id=${id}&isAllData=false`);
      setDeveloperDataLabel(Resp?.data?.devDetail?.[0]);
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  useEffect(() => {
    if (userInfo) {
      const data = developerDataLabel?.aurthorizedUserInfoArray?.filter((item) => item?.emailId === userInfo?.emailId);
      setAuthUserData(data);
      setValue("authorizedName", data?.[0]?.name);
      setValue("authorizedMobile", data?.[0]?.mobileNumber);
      setValue("authorizedEmail", data?.[0]?.emailId);
      setValue("authorizedPan", data?.[0]?.pan);
    }
  }, [developerDataLabel]);

  useEffect(() => {
    if (developerDataLabel) {
      setValue("developerName", developerDataLabel?.addInfo?.companyName);
      setValue("developerNameA", developerDataLabel?.addInfo?.name);
      setValue("developerAddress", developerDataLabel?.addInfo?.registeredAddress);
      setValue("developerEmail", developerDataLabel?.addInfo?.emailId);
      setValue("developerType", developerDataLabel?.addInfo?.showDevTypeFields);
      setValue("developerCinNo", developerDataLabel?.addInfo?.cin_Number);
      setValue("developerPanNo", developerDataLabel?.addInfo?.PanNumber);
      setValue("developerGstNo", developerDataLabel?.addInfo?.gst_Number);
      setValue("developerLlpNo", developerDataLabel?.addInfo?.llp_Number);
      setValue("authorizedAddress", developerDataLabel?.aurthorizedUserInfoArray?.[0]?.permaneneAddress);
      setValue(
        "permanentAddress",
        `${developerDataLabel?.licenceDetails?.addressLineOne} ${developerDataLabel?.licenceDetails?.addressLineTwo} ${developerDataLabel?.licenceDetails?.addressLineThree}`
      );
      setValue("email", developerDataLabel?.addInfo?.email);
    }
  }, [developerDataLabel]);

  const getApplicantUserData = async (id) => {
    const token = window?.localStorage?.getItem("token");
    const payload = {
      RequestInfo: {
        apiId: "Rainmaker",
        msgId: "1669293303096|en_IN",
        authToken: token,
      },
    };
    try {
      const Resp = await axios.post(`/tl-services/new/licenses/object/_getByApplicationNumber?applicationNumber=${id}`, payload);
      const userData = Resp?.data;
      setData({ caseNumber: userData?.caseNumber, dairyNumber: userData?.dairyNumber });
      // setStepData(userData);
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    const search = location?.search;
    const params = new URLSearchParams(search);
    const id = params.get("id");
    setApplicantId(id?.toString());
    if (id) getApplicantUserData(id);
  }, []);

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
      // if (fieldName === "registeringAuthorityDoc") {
      //   setValue("registeringAuthorityDocFileName", file.name);
      // }
      setSelectedFiles([...selectedFiles, file.name]);
      setLoader(false);
      setShowToastError({ label: "File Uploaded Successfully", error: false, success: true });
    } catch (error) {
      setLoader(false);
      return error.message;
    }
  };

  return (
    <div>
      {loader && <Spinner />}
      <form onSubmit={handleSubmit(ApplicantFormSubmitHandlerForm)}>
        <div className="card" style={{ width: "126%", border: "5px solid #1266af" }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h4 style={{ fontSize: "25px", marginLeft: "21px" }}>
              {`${t("NWL_NEW_LICENCE_APPLICATION")}`}
              {/* New Licence Application  */}
            </h4>
            {applicantId && <h6 style={{ display: "flex", alignItems: "center" }}>Application No: {applicantId}</h6>}
          </div>
          {getData?.caseNumber && (
            <div>
              <h6 className="mt-1" style={{ marginLeft: "21px" }}>
                Case No: {getData?.caseNumber.slice(0, 7)}
              </h6>
              <h6 className="mt-1" style={{ marginLeft: "21px" }}>
                Diary No: {getData?.dairyNumber}
              </h6>
            </div>
          )}
          <div className="card" style={{ width: "126%", marginLeft: "-2px", paddingRight: "10px", marginTop: "40px", marginBottom: "10px" }}>
            <h5 className="card-title fw-bold">
              {`${t("NWL_DEVELOPER_INFORMATION")}`}
              {/* Developer Information */}
            </h5>
            <div style={{ rowGap: "18px" }} className="row">
              {developerDataLabel?.addInfo?.showDevTypeFields == "Individual" ||
              developerDataLabel?.addInfo?.showDevTypeFields == "Proprietorship Firm" ||
              developerDataLabel?.addInfo?.showDevTypeFields == "Hindu Undivided Family" ? (
                <div className="col col-lg-4 col-md-6 col-sm-6 mb-2">
                  <FormControl>
                    <h2>
                      {`${t("NWL_APPLICANT_DEVELOPER_NAME")}`}
                      {/* Name  */}
                      <span style={{ color: "red" }}>*</span>
                    </h2>
                    <input
                      type="text"
                      className="Inputcontrol"
                      class="form-control"
                      id="standard-disabled"
                      label="Disabled"
                      placeholder="N/A"
                      readOnly
                      {...register("developerNameA")}
                    />
                  </FormControl>
                </div>
              ) : (
                <div className="col col-lg-4 col-md-6 col-sm-6 mb-2">
                  <FormControl>
                    <h2>
                      {`${t("NWL_APPLICANT_DEVELOPER_NAME")}`}
                      {/* Name  */}
                      <span style={{ color: "red" }}>*</span>
                    </h2>
                    <input
                      type="text"
                      className="Inputcontrol"
                      class="form-control"
                      id="standard-disabled"
                      label="Disabled"
                      placeholder="N/A"
                      readOnly
                      {...register("developerName")}
                    />
                  </FormControl>
                </div>
              )}
              <div className="col col-lg-4 col-md-6 col-sm-6 mb-2">
                <FormControl>
                  <h2>
                    {`${t("NWL_APPLICANT_DEVELOPER_ADDRESS")}`}
                    {/* Address */}
                    <span style={{ color: "red" }}>*</span>
                  </h2>

                  <Controller
                    control={control}
                    name="developerAddress"
                    render={({ field: { onChange, value } }) => (
                      <input
                        type="text"
                        className="Inputcontrol"
                        class="form-control"
                        id="standard-disabled"
                        label="Disabled"
                        placeholder="N/A"
                        readOnly
                        value={value}
                        name="developerAddress"
                      />
                    )}
                  />
                  <h3 className="error-message" style={{ color: "red" }}>
                    {errors?.developerAddress && errors?.developerAddress?.message}
                  </h3>
                </FormControl>
              </div>
              <div className="col col-lg-4 col-md-6 col-sm-6 mb-2">
                <FormControl>
                  <h2>
                    {`${t("NWL_APPLICANT_DEVELOPER_EMAILID")}`}
                    {/* EmailId */}
                    <span style={{ color: "red" }}>*</span>
                  </h2>

                  <Controller
                    control={control}
                    name="developerEmail"
                    render={({ field: { onChange, value } }) => (
                      <input
                        type="text"
                        className="Inputcontrol"
                        class="form-control"
                        id="standard-disabled"
                        label="Disabled"
                        placeholder="N/A"
                        readOnly
                        value={value}
                        name="developerEmail"
                      />
                    )}
                  />
                  <h3 className="error-message" style={{ color: "red" }}>
                    {errors?.developerEmail && errors?.developerEmail?.message}
                  </h3>
                </FormControl>
              </div>
              <div className="col col-lg-4 col-md-6 col-sm-6 mb-2">
                <FormControl>
                  <h2>
                    {`${t("NWL_APPLICANT_DEVELOPER_TYPE")}`}
                    {/* Developer Type */}
                  </h2>

                  <Controller
                    control={control}
                    name="developerType"
                    render={({ field: { onChange, value } }) => (
                      <input
                        type="text"
                        className="Inputcontrol"
                        class="form-control"
                        id="standard-disabled"
                        label="Disabled"
                        placeholder="N/A"
                        readOnly
                        value={value}
                        name="developerType"
                      />
                    )}
                  />
                  <h3 className="error-message" style={{ color: "red" }}>
                    {errors?.developerType && errors?.developerType?.message}
                  </h3>
                </FormControl>
              </div>
              {developerDataLabel?.addInfo?.showDevTypeFields != "Individual" &&
                developerDataLabel?.addInfo?.showDevTypeFields != "Limited Liability Partnership" &&
                developerDataLabel?.addInfo?.showDevTypeFields != "Hindu Undivided Family" &&
                developerDataLabel?.addInfo?.showDevTypeFields != "Proprietorship Firm" && (
                  <div className="col col-lg-4 col-md-6 col-sm-6 mb-2">
                    <FormControl>
                      <h2>
                        {`${t("NWL_APPLICANT_CIN_NUMBER")}`}
                        {/* CIN Number */}
                        <span style={{ color: "red" }}>*</span>
                      </h2>

                      <Controller
                        control={control}
                        name="developerCinNo"
                        render={({ field: { onChange, value } }) => (
                          <input
                            type="text"
                            value={value}
                            className="Inputcontrol"
                            class="form-control"
                            placeholder="N/A"
                            disabled
                            name="developerCinNo"
                          />
                        )}
                      />
                      <h3 className="error-message" style={{ color: "red" }}>
                        {errors?.developerCinNo && errors?.developerCinNo?.message}
                      </h3>
                    </FormControl>
                  </div>
                )}
              {developerDataLabel?.addInfo?.showDevTypeFields != "Company" &&
                developerDataLabel?.addInfo?.showDevTypeFields != "Limited Liability Partnership" &&
                developerDataLabel?.addInfo?.showDevTypeFields != "Partnership Firm" && (
                  <div className="col col-lg-4 col-md-6 col-sm-6 mb-2">
                    <FormControl>
                      <h2>
                        {`${t("NWL_APPLICANT_PAN_NUMBER")}`}
                        {/* PAN Number */}
                        <span style={{ color: "red" }}>*</span>
                      </h2>

                      <Controller
                        control={control}
                        name="developerPanNo"
                        render={({ field: { onChange, value } }) => (
                          <input
                            type="text"
                            value={value}
                            className="Inputcontrol"
                            class="form-control"
                            placeholder="N/A"
                            disabled
                            name="developerPanNo"
                          />
                        )}
                      />
                      <h3 className="error-message" style={{ color: "red" }}>
                        {errors?.developerPanNo && errors?.developerPanNo?.message}
                      </h3>
                    </FormControl>
                  </div>
                )}
              {developerDataLabel?.addInfo?.showDevTypeFields != "Company" && (
                <div className="col col-lg-4 col-md-6 col-sm-6 mb-2">
                  <FormControl>
                    <h2>
                      {`${t("NWL_APPLICANT_GST_NUMBER")}`}
                      {/* GST Number */}
                      <span style={{ color: "red" }}>*</span>
                    </h2>

                    <Controller
                      control={control}
                      name="developerGstNo"
                      render={({ field: { onChange, value } }) => (
                        <input
                          type="text"
                          value={value}
                          className="Inputcontrol"
                          class="form-control"
                          placeholder="N/A"
                          disabled
                          name="developerGstNo"
                        />
                      )}
                    />
                    <h3 className="error-message" style={{ color: "red" }}>
                      {errors?.developerGstNo && errors?.developerGstNo?.message}
                    </h3>
                  </FormControl>
                </div>
              )}
              {developerDataLabel?.addInfo?.showDevTypeFields != "Individual" &&
                developerDataLabel?.addInfo?.showDevTypeFields != "Company" &&
                developerDataLabel?.addInfo?.showDevTypeFields != "Hindu Undivided Family" &&
                developerDataLabel?.addInfo?.showDevTypeFields != "Proprietorship Firm" &&
                developerDataLabel?.addInfo?.showDevTypeFields != "Partnership Firm" && (
                  <div className="col col-lg-4 col-md-6 col-sm-6 mb-2">
                    <FormControl>
                      <h2>
                        {`${t("NWL_APPLICANT_LLP_NUMBER")}`}
                        {/* LLP Number */}
                        <span style={{ color: "red" }}>*</span>
                      </h2>

                      <Controller
                        control={control}
                        name="developerLlpNo"
                        render={({ field: { onChange, value } }) => (
                          <input
                            type="text"
                            value={value}
                            className="Inputcontrol"
                            class="form-control"
                            placeholder="N/A"
                            disabled
                            name="developerLlpNo"
                          />
                        )}
                      />
                      <h3 className="error-message" style={{ color: "red" }}>
                        {errors?.developerLlpNo && errors?.developerLlpNo?.message}
                      </h3>
                    </FormControl>
                  </div>
                )}
            </div>
            {developerDataLabel?.addInfo?.showDevTypeFields != "Individual" &&
              developerDataLabel?.addInfo?.showDevTypeFields != "Limited Liability Partnership" &&
              developerDataLabel?.addInfo?.showDevTypeFields != "Hindu Undivided Family" &&
              developerDataLabel?.addInfo?.showDevTypeFields != "Partnership Firm" &&
              developerDataLabel?.addInfo?.showDevTypeFields != "Proprietorship Firm" && (
                <div className="mt-5">
                  <h5 className="card-title fw-bold">
                    {`${t("NWL_APPLICANT_1_DIRECTOR_INFOMATION_AS_PER_MCA")}`}

                    {/* Director Information as per MCA */}
                  </h5>
                  <div className="card-body">
                    <div className="table-bd">
                      <table className="table table-bordered">
                        <thead>
                          <tr>
                            <th>Sr. No</th>
                            <th>DIN Number</th>
                            <th>Name</th>
                            <th>Contact Number</th>
                          </tr>
                        </thead>
                        <tbody>
                          {developerDataLabel?.addInfo?.DirectorsInformationMCA?.length &&
                            developerDataLabel?.addInfo?.DirectorsInformationMCA?.map((item, index) => {
                              return (
                                <tr>
                                  <td>{index + 1}</td>
                                  <td>{item?.din}</td>
                                  <td>{item?.name}</td>
                                  <td>{item?.contactNumber}</td>
                                </tr>
                              );
                            })}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <h5 className="card-title fw-bold">
                    {`${t("NWL_APPLICANT_1_DIRECTOR_INFOMATION_AS_PER_DEVELOPER")}`}
                    {/* Directors Information as per developer */}
                  </h5>
                  <div className="card-body">
                    <div className="table-bd">
                      <table className="table table-bordered">
                        <thead>
                          <tr>
                            <th>Sr. No</th>
                            <th>DIN Number</th>
                            <th>Name</th>
                            <th>Contact Number</th>
                            <th>View Document</th>
                          </tr>
                        </thead>
                        <tbody>
                          {developerDataLabel?.addInfo?.DirectorsInformation?.length &&
                            developerDataLabel?.addInfo?.DirectorsInformation?.map((item, index) => {
                              return (
                                <tr>
                                  <td>{index + 1}</td>
                                  <td>{item?.din}</td>
                                  <td>{item?.name}</td>
                                  <td>{item?.contactNumber}</td>
                                  <td
                                    style={{
                                      color: " #1266af",
                                      fontSize: " 12px",
                                      fontWeight: "bold",
                                      cursor: "pointer",
                                      textDecorationLine: "underline",
                                    }}
                                    onClick={() => {
                                      if (item?.uploadPdf) getDocShareholding(item?.uploadPdf, setLoader);
                                    }}
                                  >
                                    {item?.uploadPdf && <VisibilityIcon color="info" className="icon" />}
                                  </td>
                                </tr>
                              );
                            })}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <h5 className="card-title fw-bold">
                    {`${t("NWL_APPLICANT_SHAREHOLDING_PATTERNS")}`}
                    {/* Shareholding Patterns */}
                  </h5>
                  <div className="card-body">
                    <div className="table-bd">
                      <table className="table table-bordered">
                        <thead>
                          <tr>
                            <th>Sr. No</th>
                            <th>Name</th>
                            <th>Designition</th>
                            <th>Percentage</th>
                            <th>View Document</th>
                          </tr>
                        </thead>
                        <tbody>
                          {developerDataLabel?.addInfo?.shareHoldingPatterens?.length &&
                            developerDataLabel?.addInfo?.shareHoldingPatterens?.map((it, ind) => {
                              return (
                                <tr>
                                  <td>{ind + 1}</td>
                                  <td>{it?.name}</td>
                                  <td>{it?.designition}</td>

                                  <td>{it?.percentage}</td>
                                  <td
                                    style={{
                                      color: " #1266af",
                                      fontSize: " 12px",
                                      fontWeight: "bold",
                                      cursor: "pointer",
                                      textDecorationLine: "underline",
                                    }}
                                    onClick={() => {
                                      if (it?.uploadPdf) getDocShareholding(it?.uploadPdf, setLoader);
                                    }}
                                  >
                                    {it?.uploadPdf && <VisibilityIcon color="info" className="icon" />}
                                  </td>
                                </tr>
                              );
                            })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}
          </div>

          <div classname="card" style={{ marginLeft: "-2px", paddingRight: "10px", marginTop: "5px", marginBottom: "52px" }}>
            <h5 className="card-title fw-bold">
              {`${t("NWL_AUTHORIZED_PERSON_INFORMATION")}`}
              {/* Authorized Person Information */}
            </h5>
            <div className="row-12">
              <div className="col md={3} xxl lg-3">
                <FormControl>
                  <h2>
                    {`${t("NWL_APPLICANT_AUTHORIZED_NAME")}`}
                    {/* Name  */}
                    <span style={{ color: "red" }}>*</span>
                  </h2>

                  <input type="text" className="form-control" placeholder="N/A" disabled {...register("authorizedName")} />
                  <h3 className="error-message" style={{ color: "red" }}>
                    {errors?.authorizedName && errors?.authorizedName?.message}
                  </h3>
                </FormControl>
                &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;
                <FormControl>
                  <h2>
                    {`${t("NWL_APPLICANT_AUTHORIZED_MOBILE_NO")}`}
                    {/* Mobile No. */}
                    <span style={{ color: "red" }}>*</span>
                  </h2>

                  <Controller
                    control={control}
                    name="authorizedPerson"
                    render={({ field: { onChange, value } }) => (
                      <input
                        type="text"
                        className="Inputcontrol"
                        class="form-control"
                        id="standard-disabled"
                        label="Disabled"
                        placeholder="N/A"
                        value={value}
                        readOnly
                        {...register("authorizedMobile")}
                      />
                      // <input type="text" value={value} className="form-control" placeholder="N/A" disabled {...register("authorizedMobile")} />
                    )}
                  />
                  <h3 className="error-message" style={{ color: "red" }}>
                    {errors?.authorizedMobile && errors?.authorizedMobile?.message}
                  </h3>
                </FormControl>
                &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;
                <FormControl>
                  <h2>
                    {`${t("NWL_APPLICANT_EMAILID_FOR_AUTHORIZED_SINGNATORY")}`}
                    {/* Emailid for Authorized Signatory */}
                    <span style={{ color: "red" }}>*</span>
                  </h2>

                  <Controller
                    control={control}
                    name="authorizedEmail"
                    render={({ field: { onChange, value } }) => (
                      <input
                        type="text"
                        className="Inputcontrol"
                        class="form-control"
                        id="standard-disabled"
                        label="Disabled"
                        placeholder="N/A"
                        value={value}
                        readOnly
                        {...register("authorizedEmail")}
                      />
                      // <input type="text" value={value} className="form-control" placeholder="N/A" disabled name="authorizedEmail" />
                    )}
                  />
                  <h3 className="error-message" style={{ color: "red" }}>
                    {errors?.authorizedEmail && errors?.authorizedEmail?.message}
                  </h3>
                </FormControl>
                &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;
                <FormControl>
                  <h2>
                    {`${t("NWL_APPLICANT_AUTHORIZED_PAN_NUMBER")}`}
                    {/* Pan No. */}
                  </h2>

                  <Controller
                    control={control}
                    name="authorizedPan"
                    render={({ field: { onChange, value } }) => (
                      <input
                        type="text"
                        className="Inputcontrol"
                        class="form-control"
                        id="standard-disabled"
                        label="Disabled"
                        placeholder="N/A"
                        value={value}
                        readOnly
                        {...register("authorizedPan")}
                      />
                      // <input type="text" value={value} className="form-control" placeholder="N/A" disabled name="authorizedPan" />
                    )}
                  />
                  <h3 className="error-message" style={{ color: "red" }}>
                    {errors?.authorizedPan && errors?.authorizedPan?.message}
                  </h3>
                </FormControl>
              </div>
            </div>
          </div>
          <br></br>
          <div className="row-12">
            <div className="col md={4} xxl lg-4">
              <FormControl>
                <div
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    if (getAuthUserData?.[0]?.uploadDigitalSignaturePdf)
                      getDocShareholding(getAuthUserData?.[0]?.uploadDigitalSignaturePdf, setLoader);
                  }}
                  id="btnSearch"
                  class=""
                >
                  {`${t("NWL_VIEW_UPLOAD_DIGITAL_SIGNATURE")}`}
                  {/* View Upload Digital Signature  */}
                  {getAuthUserData?.[0]?.uploadDigitalSignaturePdf && <VisibilityIcon color="info" className="icon" />}
                </div>
              </FormControl>
              &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;
              <FormControl>
                <div
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    if (getAuthUserData?.[0]?.uploadBoardResolution) getDocShareholding(getAuthUserData?.[0]?.uploadBoardResolution, setLoader);
                  }}
                  id="btnSearch"
                  class=""
                >
                  {`${t("NWL_VIEW_UPLOAD_BOARD_RESOLUTION")}`}
                  {/* View Upload Board Resolution */}
                  {getAuthUserData?.[0]?.uploadBoardResolution && <VisibilityIcon color="info" className="icon" />}
                </div>
              </FormControl>
              &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;
              {developerDataLabel?.addInfo?.showDevTypeFields == "Company" &&
                developerDataLabel?.addInfo?.showDevTypeFields == "Trust" &&
                developerDataLabel?.addInfo?.showDevTypeFields == "Limited Liability Partnership" &&
                developerDataLabel?.addInfo?.showDevTypeFields == "Firm" &&
                developerDataLabel?.addInfo?.showDevTypeFields == "Institution" && (
                  <FormControl>
                    {developerDataLabel?.licensesDoc?.[0]?.memorandumOfArticles && (
                      <div
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          if (developerDataLabel?.licensesDoc?.[0]?.memorandumOfArticles)
                            getDocShareholding(developerDataLabel?.licensesDoc?.[0]?.memorandumOfArticles, setLoader);
                        }}
                        id="btnSearch"
                        class=""
                      >
                        {`${t("NWL_VIEW_MOA_DOCUMENT")}`}
                        {/* View MOA Document  */}
                        {developerDataLabel?.licensesDoc?.[0]?.memorandumOfArticles && <VisibilityIcon color="info" className="icon" />}
                      </div>
                    )}
                  </FormControl>
                )}
            </div>
          </div>
          <div className="row mt-4">
            <div className="col col-4">
              <h2 style={{ display: "flex" }}>
                {`${t("NWL_UPLOAD_BOARD_RESOLUTION")}`}
                {/* Upload Board resolution  */}
              </h2>

              <label>
                <FileUpload style={{ cursor: "pointer" }} color="primary" />
                <input
                  type="file"
                  style={{ display: "none" }}
                  accept="application/pdf/jpeg/png"
                  onChange={(e) => getDocumentData(e?.target?.files[0], "boardResolutionDoc")}
                />
              </label>
              {watch("boardResolutionDoc") && (
                <a onClick={() => getDocShareholding(watch("boardResolutionDoc"), setLoader)} className="btn btn-sm ">
                  <VisibilityIcon color="info" className="icon" />
                </a>
              )}
            </div>
            <div className="col col-4">
              <h2 style={{ display: "flex" }}>
                {`${t("NWL_CONSENT_OF_ARCHITECT_ALONG")}`}
                {/* Consent of Architect along with Qualification documents */}
              </h2>
              <label>
                <FileUpload style={{ cursor: "pointer" }} color="primary" />
                <input
                  type="file"
                  style={{ display: "none" }}
                  accept="application/pdf/jpeg/png"
                  onChange={(e) => getDocumentData(e?.target?.files[0], "architectDegreeCertificate")}
                />
              </label>

              {watch("architectDegreeCertificate") && (
                <a onClick={() => getDocShareholding(watch("architectDegreeCertificate"), setLoader)} className="btn btn-sm ">
                  <VisibilityIcon color="info" className="icon" />
                </a>
              )}
            </div>
            <div className="col col-4">
              <h2 style={{ display: "flex" }}>
                {`${t("NWL_CONSENT_OF_ENGINEER")}`}
                {/* Consent of Engineer along with Qualification documents */}
              </h2>
              <label>
                <FileUpload style={{ cursor: "pointer" }} color="primary" />
                <input
                  type="file"
                  style={{ display: "none" }}
                  accept="application/pdf/jpeg/png"
                  onChange={(e) => getDocumentData(e?.target?.files[0], "engineerDegreeCertificate")}
                />
              </label>

              {watch("engineerDegreeCertificate") && (
                <a onClick={() => getDocShareholding(watch("engineerDegreeCertificate"), setLoader)} className="btn btn-sm ">
                  <VisibilityIcon color="info" className="icon" />
                </a>
              )}
            </div>
          </div>

          <div className="">
            <div className="form-check">
              <input
                onClick={(e) => {
                  if (e.target.checked) {
                    setDisable(false);
                  } else {
                    setDisable(true);
                  }
                  // setDisable(e.target.checked);
                }}
                className="form-check-input"
                formControlName="agreeCheck"
                type="checkbox"
                name="developerRegistration"
                value=""
                id="flexCheckDefault"
              />
              <label className="checkbox" for="flexCheckDefault">
                {`${t("NWL_THE_INFORMATION_FETCHED")}`}
                {/* The information fetched from developer registration is updated */}
                <span className="text-danger">
                  <b>*</b>
                </span>
              </label>
            </div>
          </div>

          <div class="row">
            <div class="col-sm-12 text-right">
              <button disabled={getDisable} type="submit" id="btnSearch" class="btn btn-primary btn-md center-block">
                {`${t("NWL_SAVE_AND_CONTINUE")}`}
                {/* Save and Continue */}
              </button>
            </div>
          </div>
        </div>
      </form>
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
};

export default ApllicantFormStep1;
