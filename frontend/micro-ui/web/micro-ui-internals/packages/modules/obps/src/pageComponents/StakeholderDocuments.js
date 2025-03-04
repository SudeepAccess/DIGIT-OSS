import React, { useEffect, useState } from "react";
import {
  CardLabel,
  Dropdown,
  UploadFile,
  Toast,
  Loader,
  FormStep,
  CitizenInfoLabel,
  OpenLinkContainer,
  BackButton,
} from "@egovernments/digit-ui-react-components";
import Timeline from "../components/Timeline";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import { getDocShareholding } from "../../../tl/src/pages/employee/ScrutinyBasic/ScrutinyDevelopment/docview.helper";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Button, Placeholder } from "react-bootstrap";
import Spinner from "../components/Loader/index";
import CusToaster from "../components/Toaster";
const StakeholderDocuments = ({ t, config, onSelect, userType, formData, setError: setFormError, clearErrors: clearFormErrors, formState }) => {
  console.log("FORMDATA...",formData)
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const stateId = Digit.ULBService.getStateId();
  const userInfo = Digit.UserService.getUser();
  const [documentsUploadList, setDocumentsList] = useState([]);
  const [documents, setDocuments] = useState(formData?.documents?.documents || []);
  const [tradeType, setTradeType] = useState("");
  const [error, setError] = useState(null);
  const [bpaTaxDocuments, setBpaTaxDocuments] = useState([]);
  const [enableSubmit, setEnableSubmit] = useState(true);
  const [checkRequiredFields, setCheckRequiredFields] = useState(false);
  const isCitizenUrl = Digit.Utils.browser.isMobile() ? true : false;
  let isopenlink = window.location.href.includes("/openlink/");
  const [isRequiredField, setRequiredField] = useState(true);
  const [articlesOfAssociation, setArticlesOfAssociation] = useState("");
  // documents?.filter((item) => item?.documentType?.includes(doc?.code))[0]
  const [memorandumOfArticles, setMemorandumOfArticles] = useState("");
  const [registeredIrrevocablePaternshipDeed, setRegisteredIrrevocablePaternshipDeed] = useState("");
  const [affidavitAndPancard, setAffidavitAndPancard] = useState("");
  const [anyOtherDoc, setAnyOtherDoc] = useState("");
  const [qualificationCertificate,setQualificationCertificate] = useState();
  const [experienceCertificate,setExperienceCertificate] = useState();
  const [coaLetter,setCoaLetter] = useState();
  const [identifyProof,setIdentifyProof] = useState();


  // const [docList, setDocList] = useState({});
  if (isopenlink)
    window.onunload = function () {
      sessionStorage.removeItem("Digit.BUILDING_PERMIT");
    };

  const { data, isLoading } = Digit.Hooks.obps.useMDMS(stateId, "StakeholderRegistraition", "TradeTypetoRoleMapping");

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
      const developerDataGet = getDevDetails?.data;
      setTradeType(developerDataGet?.devDetail[0]?.applicantType?.licenceTypeSelected);
      setDocumentsList(developerDataGet?.devDetail[0]?.licensesDoc);
      // console.log("TRADETYPE", documentsUploadList);

      let filtredBpaDocs = [];
      if (data?.StakeholderRegistraition?.TradeTypetoRoleMapping) {
        console.log("logger4....", data, getDevDetails.data)
        filtredBpaDocs = data?.StakeholderRegistraition?.TradeTypetoRoleMapping?.filter(
          (ob) => ob.tradeType === developerDataGet?.devDetail[0]?.applicantType?.licenceTypeSelected
        );
      }


      if( getDevDetails.data.devDetail[0].applicantType.licenceTypeSelected === "CITIZEN.CLASSA" || getDevDetails.data.devDetail[0].applicantType.licenceTypeSelected === "BPA_DEVELOPER"){
        let documentsList = [];
        filtredBpaDocs?.[0]?.docTypes?.forEach((doc) => {
          documentsList.push(doc);
        });
        setBpaTaxDocuments(documentsList);
      } else {
        const requestBody = {
          "RequestInfo": {
            "apiId": "Rainmaker",
            "ver": "v1",
            "ts": 0,
            "action": "_search",
            "did": "",
            "key": "",
            "msgId": "090909",
            "requesterId": "",
            "authToken": "408de886-cb18-487c-8e68-d171a5006b23",
            "userInfo": {
              "id": 1964,
              "uuid": "ac14890e-ad92-42f8-b262-722773390672",
              "userName": "8888854328",
              "name": "Manik lal",
              "mobileNumber": "8888854328",
              "emailId": "manikl@gmail.com",
              "locale": null,
              "type": "CITIZEN",
              "roles": [
                {
                  "name": "Developer",
                  "code": "BPA_DEVELOPER",
                  "tenantId": "hr"
                },
                {
                  "name": "Builder",
                  "code": "BPA_BUILDER",
                  "tenantId": "hr"
                },
                {
                  "name": "Citizen",
                  "code": "CITIZEN",
                  "tenantId": "hr"
                }
              ],
              "active": true,
              "tenantId": "hr",
              "permanentCity": null
            }
          },
          "MdmsCriteria": {
            "tenantId": "hr",
            "moduleDetails": [
              {
                "moduleName": "common-masters",
                "tenantId": "hr",
                "masterDetails": [
                  {
                    "name": "technicalProfessionalDocuments"
                  }
                ]
              }
            ]
          }
        }
  
        const response = await axios.post("/egov-mdms-service/v1/_search", requestBody);
        console.log("TRADETYPE", response.data, response.data.MdmsRes["common-masters"].technicalProfessionalDocuments);
        console.log("TRADETYPE", filtredBpaDocs, data?.StakeholderRegistraition?.TradeTypetoRoleMapping, developerDataGet?.devDetail[0]?.applicantType?.licenceTypeSelected);
  
        setBpaTaxDocuments(response.data.MdmsRes["common-masters"].technicalProfessionalDocuments.map(e => ({ code: e.documents, required: e?.required || true, info: e.documents })));

      }

    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getDeveloperData();
  }, [!isLoading]);
  // useEffect(() => {

  // }, );
  // console.log("+_+_+_+", documents);
  // console.log("-=-=-=-=", articlesOfAssociation);
  // console.log("()()()()()", memorandumOfArticles);
  const handleSubmit = () => {

    // if ((tradeType === "CITIZEN.CLASSA" || tradeType === "BPA_DEVELOPER")) {
      let document = formData.documents;
  
      // setArticlesOfAssociation(documents[0]?.documentUid);
  
      let documentStep;
      let regularDocs = [];
      bpaTaxDocuments &&
        documents &&
        documents !== null &&
        bpaTaxDocuments.map((initialob, index) => {
          let docobject = documents.find((ob) => ob && ob !== null && ob.documentType === initialob.code);
          if (docobject) regularDocs.push(docobject);
        });
      documentStep = { ...document, documents: regularDocs };
  
      let allDocs = [];
  
      bpaTaxDocuments.map((items, index) => {
        let fstDoc = documents.find((obd) => obd.documentType == "ARTICLES_OF_ASSOCIATION");
        if (fstDoc) allDocs.push(fstDoc?.fileStoreId);
        let articlesOfAss = allDocs[0];
      });
  
      const docList = [
        {
          articlesOfAssociation: articlesOfAssociation,
          memorandumOfArticles: memorandumOfArticles,
          registeredIrrevocablePaternshipDeed: registeredIrrevocablePaternshipDeed,
          affidavitAndPancard: affidavitAndPancard,
          anyOtherDoc: anyOtherDoc,
          qualificationCertificate,
          experienceCertificate,
          coaLetter,
          identityProof:identifyProof
        },
      ];
  
      console.log("RTGT", articlesOfAssociation,docList);
      const developerRegisterData = {
        id: userInfo?.info?.id,
        pageName: "licensesDoc",
        createdBy: userInfo?.info?.id,
        updatedBy: userInfo?.info?.id,
        devDetail: {
          licensesDoc: docList,
        },
      };
      Digit.OBPSService.CREATEDeveloper(developerRegisterData, tenantId)
        .then((result, err) => {
          // localStorage.setItem('devRegId',JSON.stringify(result?.id));
          setIsDisableForNext(false);
          let data = {
            result: result,
            formData: formData,
          };
          //1, units
          onSelect("", data, "", true);
        })
        .catch((e) => {
          setIsDisableForNext(false);
          setShowToast({ key: "error" });
          setError(e?.response?.data?.Errors[0]?.message || null);
        });
      onSelect(config.key, documentStep);

    // } 
    // else {
    //   let documentObj = {
        // qualificationCertificate,
        // experienceCertificate,
        // coaLetter,
        // identifyProof
    //   }

    //   let documentStep;
    //   let regularDocs = [];
    //   bpaTaxDocuments &&
    //     documents &&
    //     documents !== null &&
    //     bpaTaxDocuments.map((initialob, index) => {
    //       let docobject = documents.find((ob) => ob && ob !== null && ob.documentType === initialob.code);
    //       if (docobject) regularDocs.push(docobject);
    //     });
    //   documentStep = { ...document, documents: regularDocs };

    //   console.log("logger123....",documentObj,documentStep)
    //   sessionStorage.setItem("TECHINCAL_PROFESSIONAL_DOCUMENTS",JSON.stringify(documentObj));
    //   onSelect(config.key, documentStep);
    // }
  };
  const onSkip = () => onSelect();
  function onAdd() { }

  useEffect(() => {
    let count = 0;
    // console.log("DEVC", documents);
    bpaTaxDocuments?.map((doc) => {
      let isRequired = false;

      documents?.map((data) => {
        // if (doc.required == true && data !== null && doc.code == `${data.documentType.split(".")[0]}.${data.documentType.split(".")[1]}`) {
        //   isRequired = true;
        // }
        // if (doc.required && doc.code == `${data.documentType.split(".")[0]}.${data.documentType.split(".")[1]}`) {
        // }
        // console.log("ALLOW", data);

        if (doc?.required == true && data !== null && doc?.code == data?.documentType) {
          isRequired = true;
        }
        console.log("logggger123......",data)
        if (data.documentType === "ARTICLES_OF_ASSOCIATION") {
          setArticlesOfAssociation(data?.documentUid);
        } else if (data.documentType === "MEMORANDUM_OF_ARTICLES") {
          setMemorandumOfArticles(data?.documentUid);
        } else if (data.documentType === "REGISTERED_IRREVOCABLE_PARTNERSHIP_DEED") {
          setRegisteredIrrevocablePaternshipDeed(data?.documentUid);
        } else if (data.documentType === "AFFIDAVIT_AND_PANCARD") {
          setAffidavitAndPancard(data?.documentUid);
        } else if (data.documentType === "APPL.BPAREG_OTHERS") {
          setAnyOtherDoc(data?.documentUid);
        } else if (data.documentType === "QULAIFICATION_CERTIFICATES") {
          setQualificationCertificate(data?.documentUid);
        } else if (data.documentType === "EXPERIENCE_CERTIFICATES") {
          setExperienceCertificate(data?.documentUid);
        } else if (data.documentType === "COA_LETTER") {
          setCoaLetter(data?.documentUid);
        } else if (data.documentType === "IDENTITY_PROOF") {
          setIdentifyProof(data?.documentUid);
        } 
        
        console.log("logger12345....",data?.documentUid,data.documentType,data.documentType === "IDENTITY_PROOF");
        // if (doc.required == false && doc.code === "APPL.BPAREG_OTHERS") {
        //   setEnableSubmit(false);
        // }
      });

      if (!isRequired && doc.required == true) {
        count = count + 1;
        // console.log("+_+_+_+", count);
      }
    });
    if (((count == "0" || count == 0 || count < 1) && documents?.length > 0) || documentsUploadList?.length > 0) {
      setEnableSubmit(false);
    } else if (count < 1 || count == 0) {
      setEnableSubmit(false);
    } else {
      setEnableSubmit(true);
    }
  }, [documents, checkRequiredFields]);
  const navigate = useHistory();

  const changeStep = (step) => {
    if ((tradeType !== "CITIZEN.CLASSA" && tradeType !== "BPA_DEVELOPER")) {
      switch (step) {
        case 1:
          navigate.replace("/digit-ui/citizen/obps/stakeholder/apply/provide-license-type");
          break;
        case 2:
          navigate.replace("/digit-ui/citizen/obps/stakeholder/apply/license-details");
          break;
        case 3:
          navigate.replace("/digit-ui/citizen/obps/stakeholder/apply/stakeholder-document-details");
          break;
      }
    } else {
      switch (step) {
        case 1:
          navigate.replace("/digit-ui/citizen/obps/stakeholder/apply/provide-license-type");
          break;
        case 2:
          navigate.replace("/digit-ui/citizen/obps/stakeholder/apply/license-add-info");
          break;
        case 3:
          navigate.replace("/digit-ui/citizen/obps/stakeholder/apply/add-authorized-user");
          break;
        case 4:
          navigate.replace("/digit-ui/citizen/obps/stakeholder/apply/developer-capacity");
          break;
      }
    }
  };

  return (
    <div>
      <div className={isopenlink ? "OpenlinkContainer" : ""}>
        {isopenlink && <BackButton style={{ border: "none" }}>{t("CS_COMMON_BACK")}</BackButton>}
        <Timeline
          currentStep={(tradeType !== "CITIZEN.CLASSA" && tradeType !== "BPA_DEVELOPER") ? 3 : 5}
          flow={(tradeType !== "CITIZEN.CLASSA" && tradeType !== "BPA_DEVELOPER") ? "ARCHITECT.CLASSA" : "STAKEHOLDER"}
          onChangeStep={changeStep}
          isAPILoaded={tradeType ? true : false}
        />
        {!isLoading ? (
          <FormStep
            t={t}
            config={config}
            onSelect={handleSubmit}
            onSkip={onSkip}
            isDisabled={enableSubmit}
            onAdd={onAdd}
            cardStyle={{ paddingRight: "16px" }}
          >
            <div className="happy">
              <div className="card">
                {/* {JSON.stringify(documents)} */}
                {bpaTaxDocuments?.map((document, index) => {
                  return (
                    <SelectDocument
                      key={index}
                      document={document}
                      t={t}
                      error={error}
                      setError={setError}
                      setDocuments={setDocuments}
                      documentsUploadList={documentsUploadList}
                      documents={documents}
                      setCheckRequiredFields={setCheckRequiredFields}
                      isCitizenUrl={isCitizenUrl}
                    />
                  );
                })}
              </div>
            </div>

            {error && <Toast label={error} isDleteBtn={true} onClose={() => setError(null)} error />}
          </FormStep>
        ) : (
          <Loader />
        )}
        {!formData?.initiationFlow && (
          <CitizenInfoLabel
            info={t("CS_FILE_APPLICATION_INFO_LABEL")}
            text={`${t("BPA_APPLICATION_NUMBER_LABEL")} ${formData?.result?.Licenses?.[0]?.applicationNumber} ${t("BPA_DOCS_INFORMATION")}`}
            className={"info-banner-wrap-citizen-override"}
          />
        )}
      </div>
    </div>
    // </div>
  );
};

function SelectDocument({ t, document: doc, setDocuments, documentsUploadList, error, setError, documents, setCheckRequiredFields, isCitizenUrl }) {
  const [loader, setLoading] = useState(false);
  // const docData = documents?.map((docs, index) => {
  //   setDocList(docs.documentUid);
  // });
  
  const [showToastError, setShowToastError] = useState({ label: "", error: false, success: false });
  
  // setDocList(documents);
  const { setValue, getValues, watch } = useForm();
  // const [docList, setDocList] = useState({});
  const filteredDocument = documents?.filter((item) => item?.documentType?.includes(doc?.code))[0];
  
  const tenantId = Digit.ULBService.getCurrentTenantId();
  
  const [selectedDocument, setSelectedDocument] = useState(
    filteredDocument
    ? { ...filteredDocument, active: true, code: filteredDocument?.documentType, i18nKey: filteredDocument?.documentType }
    : doc?.dropdownData?.length === 1
    ? doc?.dropdownData[0]
    : {}
    );
    
    const [file, setFile] = useState(null);
    const [uploadedFile, setUploadedFile] = useState(() => filteredDocument?.fileStoreId || null);
    // setValue("finalDocList", filteredDocument?.fileStoreId);
    // return null
  // setArticlesOfAssociation(uploadedFile);
  // console.log("FILTEREDDOC", doc);

  // console.log("HGHGHG", docList);
  const handleSelectDocument = (value) => setSelectedDocument(value);

  function selectfile(e) {
    setFile(e.target.files[0]);
  }
  useEffect(() => {
    setDocuments((prev) => {
      const filteredDocumentsByDocumentType = prev?.filter((item) => item?.documentType !== doc?.code);

      if (uploadedFile?.length === 0 || uploadedFile === null) {
        return filteredDocumentsByDocumentType;
      }

      const filteredDocumentsByFileStoreId = filteredDocumentsByDocumentType?.filter((item) => item?.fileStoreId !== uploadedFile);
      return [
        ...filteredDocumentsByFileStoreId,
        {
          documentType: doc?.code,
          fileStoreId: uploadedFile,
          documentUid: uploadedFile,
          fileName: file?.name || "",
          info: doc?.info || "",
        },
      ];
    });
  }, [uploadedFile, file]);

  // useEffect(()=>{
  //   console.log("efregergergerg",documents,doc)
  // },[documents,doc])

  useEffect(() => {
    (async () => {
      setError(null);
      if (file) {
        const allowedFileTypesRegex = /(.*?)(jpg|jpeg|png|image|pdf)$/i;
        if (file.size >= 5242880) {
          setError(t("CS_MAXIMUM_UPLOAD_SIZE_EXCEEDED"));
        } else if (file?.type && !allowedFileTypesRegex.test(file?.type)) {
          setError(t(`NOT_SUPPORTED_FILE_TYPE`));
        } else {
          try {
            setLoading(true);
            setUploadedFile(null);
            const response = await Digit.UploadServices.Filestorage("PT", file, tenantId?.split(".")[0]);
            setLoading(false);
            if (response?.data?.files?.length > 0) {
              setUploadedFile(response?.data?.files[0]?.fileStoreId);
              setShowToastError({ label: "File Uploaded Successfully", error: false, success: true });
            } else {
              setShowToastError({ label: t("CS_FILE_UPLOAD_ERROR"), error: true, success: false });
              // setError(t("CS_FILE_UPLOAD_ERROR"));
            }
          } catch (err) {
            setLoading(false);
            setShowToastError({ label: t("CS_FILE_UPLOAD_ERROR"), error: true, success: false });
          }
        }
      }
    })();
  }, [file]);


  const getUploadedDocId = (type) => {
    console.log("wefwefwefewfewfef",documents,type)
    return documents.find((ele)=>ele.documentType === type)?.fileStoreId;
  }

  return (
    <div>
      {loader && <Spinner />}

      <div className="doc-upload-field" style={{ marginBottom: "24px" }}>
        <CardLabel style={{ marginBottom: "10px" }}>
          {doc?.required ? `${t(`BPAREG_HEADER_${doc?.code?.replace(".", "_")}`)} *` : `${t(`BPAREG_HEADER_${doc?.code?.replace(".", "_")}`)}`}
        </CardLabel>
        {/* {doc?.info ? (
          <div style={{ fontSize: "12px", color: "#505A5F", fontWeight: 400, lineHeight: "15px", marginBottom: "10px" }}>{`${t(doc?.info)}`}</div>
        ) : null} */}
        {/* {JSON.stringify(doc?.code)} */}

        <div className="" style={{ display: "flex", alignItems: "center" }}>
          <UploadFile
            extraStyleName={"OBPS"}
            accept="image/*, .pdf, .png, .jpeg, .jpg"
            onUpload={selectfile}
            onDelete={() => {
              setUploadedFile(null);
              setCheckRequiredFields(true);
            }}
            message={uploadedFile ? `1 ${t(`CS_ACTION_FILEUPLOADED`)}` : t(``)}
            iserror={error}
          />
          {/* {JSON.stringify(documentsUploadList?.[0])} */}
          {
            <div className="col-md-4">
              {doc?.code === "ARTICLES_OF_ASSOCIATION" && (getUploadedDocId("ARTICLES_OF_ASSOCIATION") ||documentsUploadList[0]?.articlesOfAssociation) ? (
                <button
                  type="button"
                  title="View Document"
                  onClick={() => getDocShareholding(getUploadedDocId("ARTICLES_OF_ASSOCIATION") ||documentsUploadList[0]?.articlesOfAssociation)}
                  className="btn btn-sm btn-info"
                >
                  <VisibilityIcon fill="#fff" className="icon" /> View Uploaded Document4
                </button>
              ) : doc?.code === "REGISTERED_IRREVOCABLE_PARTNERSHIP_DEED" && (getUploadedDocId("REGISTERED_IRREVOCABLE_PARTNERSHIP_DEED") || documentsUploadList[0]?.registeredIrrevocablePaternshipDeed) ? (
                <button
                  type="button"
                  title="View Document"
                  onClick={() => getDocShareholding(getUploadedDocId("REGISTERED_IRREVOCABLE_PARTNERSHIP_DEED") || documentsUploadList[0]?.registeredIrrevocablePaternshipDeed)}
                  className="btn btn-sm btn-info"
                >
                  <VisibilityIcon fill="#fff" className="icon" /> View Uploaded Document3
                </button>
              ) : doc?.code === "AFFIDAVIT_AND_PANCARD" && (getUploadedDocId("AFFIDAVIT_AND_PANCARD") || documentsUploadList[0]?.affidavitAndPancard) ? (
                <button
                  type="button"
                  title="View Document"
                  onClick={() => getDocShareholding(getUploadedDocId("AFFIDAVIT_AND_PANCARD") || documentsUploadList[0]?.affidavitAndPancard)}
                  className="btn btn-sm btn-info"
                >
                  <VisibilityIcon fill="#fff" className="icon" /> View Uploaded Document2
                </button>
              ) : doc?.code === "MEMORANDUM_OF_ARTICLES" && (getUploadedDocId("MEMORANDUM_OF_ARTICLES") || documentsUploadList[0]?.memorandumOfArticles) ? (
                <button
                  type="button"
                  title="View Document"
                  onClick={() => getDocShareholding(getUploadedDocId("MEMORANDUM_OF_ARTICLES") || documentsUploadList[0]?.memorandumOfArticles)}
                  className="btn btn-sm btn-info"
                >
                  <VisibilityIcon fill="#fff" className="icon" /> View Uploaded Document1
                </button>
              ) : doc?.code === "APPL.BPAREG_OTHERS" && (getUploadedDocId("APPL.BPAREG_OTHERS") ||documentsUploadList?.[0]?.anyOtherDoc) ? (
                <button
                  type="button"
                  title="View Document"
                  onClick={() => getDocShareholding(getUploadedDocId("APPL.BPAREG_OTHERS") ||documentsUploadList[0]?.anyOtherDoc)}
                  className="btn btn-sm btn-info"
                >
                  <VisibilityIcon fill="#fff" className="icon" /> View Uploaded Document
                </button>
              ) : (
                ""
              )}
            </div>
          }
        </div>
      </div>
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

export default StakeholderDocuments;
