import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Card, Row, Col } from "react-bootstrap";
// import {AiFillCheckCircle, AiFillCloseCircle} from "react-icons/ai";
// import CalculateIcon from '@mui/icons-material/Calculate';
// import InfoIcon from '@mui/icons-material/Info';
// import * as Icon from "react-bootstrap-icons";
// import { XCircleFill } from "react-bootstrap-icons";
// import { CheckCircleFill } from "react-bootstrap-icons";
// import { ArrowDownCircleFill } from "react-bootstrap-icons";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";
import Collapse from "react-bootstrap/Collapse";
import AddIcon from "@mui/icons-material/Add";
import ModalChild from "./Remarks/ModalChild";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import RemoveIcon from "@mui/icons-material/Remove";
import { useStyles } from "./css/personalInfoChild.style";
import { IconButton } from "@mui/material";
import { getDocShareholding } from "./ScrutinyDevelopment/docview.helper";
import CommercialColonyInResidential from "../ScrutinyBasic/PuropseStep3/CommercialColonyResidential";
import CommercialLicense from "./PuropseStep3/CommercialLicense";
import LowDensityEco from "./PuropseStep3/LowDensityEco";
import CyberPark from "./PuropseStep3/CyberPark";
import RetirementHousing from "./PuropseStep3/RetirementHousing";
// import CommercialPlottedForm from "./Puropse/CommercialPlottedForm";

const Developerinfo = (props) => {

  const dataIcons = props.dataForIcons;
  const landScheduleData = props.ApiResponseData;
  const Purpose = props.purpose;
  let user = Digit.UserService.getUser();
  const userRoles = user?.info?.roles?.map((e) => e.code) || [];
  const hideRemarks = userRoles.some((item) => item === "CTP_HR" || item === "CTP_HQ" || item === "DTP_HR" || item === "DTP_HQ")
  const hideRemarksPatwari = userRoles.some((item) => item === "Patwari_HQ")
  const hideRemarksJE = userRoles.some((item) => item === "JE_HQ" || item === "JE_HR")


  const [vacant, setVacant] = useState("");
  const [construction, setConstruction] = useState("");
  const [typeCons, setTypeCons] = useState("");
  const [ht, setHt] = useState("");
  const [htRemark, setHtRemark] = useState("");
  const [gas, setGas] = useState("");
  const [gasRemark, setGasRemark] = useState("");
  const [nallah, setNallah] = useState("");
  const [nallahRemark, setNallahremark] = useState("");
  const [road, setRoad] = useState("");
  const [roadWidth, setRoadwidth] = useState("");
  const [land, setLand] = useState("");
  const [landRemark, setLandRemark] = useState("");
  const [layoutPlan, setLayoutPlan] = useState("");


  const [open, setOpen] = useState(false);
  const handleChange = (e) => {
    this.setState({ isRadioSelected: true });
  };

  // const [fieldValue, setFieldValue] = useState("");

  const [showhide1, setShowhide1] = useState("No");
  const [showhide2, setShowhide2] = useState("No");
  const [showhide3, setShowhide3] = useState("No");
  const [showhide4, setShowhide4] = useState("No");
  const [showhide5, setShowhide5] = useState("No");
  const [showhide6, setShowhide6] = useState("No");
  const [showhide7, setShowhide7] = useState("No");
  const [showhide8, setShowhide8] = useState("No");
  const [showhide9, setShowhide9] = useState("No");
  const [showhide0, setShowhide0] = useState("No");
  const [showhide13, setShowhide13] = useState("No");
  const [showhide18, setShowhide18] = useState("No");
  const [showhide16, setShowhide16] = useState("No");
  const [showhide17, setShowhide17] = useState("No");




  const [open2, setOpen2] = useState(false);
  const handleshow = (e) => {
    const getshow = e.target.value;
    setShowhide1(getshow);
  };
  const handleshow1 = (e) => {
    const getshow = e.target.value;
    setShowhide2(getshow);
  };
  const handleshow2 = (e) => {
    const getshow = e.target.value;
    setShowhide3(getshow);
  };
  const handleshow3 = (e) => {
    const getshow = e.target.value;
    setShowhide4(getshow);
  };
  const handleshow4 = (e) => {
    const getshow = e.target.value;
    setShowhide4(getshow);
  };
  const handleshow5 = (e) => {
    const getshow = e.target.value;
    setShowhide5(getshow);
  };
  const handleshow6 = (e) => {
    const getshow = e.target.value;
    setShowhide6(getshow);
  };
  const handleshow7 = (e) => {
    const getshow = e.target.value;
    setShowhide7(getshow);
  };
  const handleshow8 = (e) => {
    const getshow = e.target.value;
    setShowhide8(getshow);
  };
  const handleshow9 = (e) => {
    const getshow = e.target.value;
    setShowhide9(getshow);
  };
  const handleshow0 = (e) => {
    const getshow = e.target.value;
    setShowhide0(getshow);
  };
  const handleshow13 = (e) => {
    const getshow = e.target.value;
    setShowhide13(getshow);
  };
  const handleshow18 = (e) => {
    const getshow = e.target.value;
    setShowhide18(getshow);
  };
  const handleshow16 = (e) => {
    const getshow = e.target.value;
    setShowhide16(getshow);
  };
  const handleshow17 = (e) => {
    const getshow = e.target.value;
    setShowhide17(getshow);
  };
  const [uncheckedValue, setUncheckedVlue] = useState([]);
  console.log(uncheckedValue);
  const [color, setColor] = useState({ yes: false, no: false });

  const [smShow2, setSmShow2] = useState(false);
  const [smShow3, setSmShow3] = useState(false);
  const [modaldData, setmodaldData] = useState({ label: "", Remarks: "" });
  const [isyesOrNochecked, setYesorNochecked] = useState(true);
  const [checkValue, setCheckedVAlue] = useState([]);

  const handleYesOrNochecked = (data) => {
    setYesorNochecked(data.data);
  };
  const handlemodalsubmit = () => {
    console.log("here");
    const filteredObj = uncheckedValue.filter((obj) => {
      return obj.label == modaldData.label;
    });
    const filteredObjCheked = checkValue.filter((obj) => {
      return obj.label == modaldData.label;
    });
    if (filteredObj.length !== 0) {
      const removedList = uncheckedValue.filter((obj) => {
        return obj.label !== modaldData.label;
      });
      setUncheckedVlue(removedList);
    }
    if (filteredObjCheked.length !== 0) {
      const removedList = checkValue.filter((obj) => {
        return obj.label !== modaldData.label;
      });
      setCheckedVAlue(removedList);
    }

    if (isyesOrNochecked === false) {
      if (modaldData.label !== "" || modaldData.Remarks !== "") {
        if (filteredObj.length === 0) {
          setUncheckedVlue((prev) => [...prev, modaldData]);
        }
      }
    } else {
      if (modaldData.label !== "" || modaldData.Remarks !== "") {
        if (filteredObjCheked.length === 0) {
          setCheckedVAlue((prev) => [...prev, modaldData]);
        }
      }
    }
  };
  useEffect(() => {
    console.log("called");
    handlemodalsubmit();
  }, [modaldData.Remarks]);
  useEffect(() => {
    props.passUncheckedList({ data: uncheckedValue });
  }, [uncheckedValue]);

  useEffect(() => {
    props.passCheckedList({ data: checkValue });
  }, [checkValue]);
  console.log("unchecked values", uncheckedValue);

  console.log(uncheckedValue.indexOf("developer"));

  const developerInputFiledColor = uncheckedValue.filter((obj) => {
    return obj.label === "Whether licence applied for additional area ?";
  });
  const developerInputCheckedFiledColor = checkValue.filter((obj) => {
    return obj.label === "Whether licence applied for additional area ?";
  });
  // console.log("color from array", developerInputFiledColor);

  const developerInputFiledColor1 = uncheckedValue.filter((obj) => {
    return obj.label === "License No. of Parent License";
  });
  const developerInputCheckedFiledColor1 = checkValue.filter((obj) => {
    return obj.label === "License No. of Parent License";
  });
  const developerInputFiledColor2 = uncheckedValue.filter((obj) => {
    return obj.label === "Potential Zone:";
  });
  const developerInputCheckedFiledColor2 = checkValue.filter((obj) => {
    return obj.label === "Potential Zone:";
  });
  const developerInputFiledColor3 = uncheckedValue.filter((obj) => {
    return obj.label === "Site Location Purpose";
  });
  const developerInputCheckedFiledColor3 = checkValue.filter((obj) => {
    return obj.label === "Site Location Purpose";
  });
  const developerInputFiledColor4 = uncheckedValue.filter((obj) => {
    return obj.label === "Approach Type (Type of Policy)";
  });
  const developerInputCheckedFiledColor4 = checkValue.filter((obj) => {
    return obj.label === "Approach Type (Type of Policy)";
  });
  const developerInputFiledColor5 = uncheckedValue.filter((obj) => {
    return obj.label === "Approach Road Width";
  });
  const developerInputCheckedFiledColor5 = checkValue.filter((obj) => {
    return obj.label === "Approach Road Width";
  });
  const developerInputFiledColor6 = uncheckedValue.filter((obj) => {
    return obj.label === "Specify Other";
  });
  const developerInputCheckedFiledColor6 = checkValue.filter((obj) => {
    return obj.label === "Specify Other";
  });
  const developerInputFiledColor7 = uncheckedValue.filter((obj) => {
    return obj.label === "Type of land";
  });
  const developerInputCheckedFiledColor7 = checkValue.filter((obj) => {
    return obj.label === "Type of land";
  });
  const developerInputFiledColor8 = uncheckedValue.filter((obj) => {
    return obj.label === "Third-party right created";
  });
  const developerInputCheckedFiledColor8 = checkValue.filter((obj) => {
    return obj.label === "Third-party right created";
  });
  const developerInputFiledColor9 = uncheckedValue.filter((obj) => {
    return obj.label === "(ii)Whether licence applied under Migration policy?";
  });
  const developerInputCheckedFiledColor9 = checkValue.filter((obj) => {
    return obj.label === "(ii)Whether licence applied under Migration policy?";
  });
  const developerInputFiledColor10 = uncheckedValue.filter((obj) => {
    return obj.label === "2. Any encumbrance with respect to following";
  });
  const developerInputCheckedFiledColor10 = checkValue.filter((obj) => {
    return obj.label === "2. Any encumbrance with respect to following";
  });
  const developerInputFiledColor11 = uncheckedValue.filter((obj) => {
    return obj.label === "(ii) Existing litigation, if any, concerning applied land including co-sharers and collaborator";
  });
  const developerInputCheckedFiledColor11 = checkValue.filter((obj) => {
    return obj.label === "(ii) Existing litigation, if any, concerning applied land including co-sharers and collaborator";
  });
  const developerInputFiledColor12 = uncheckedValue.filter((obj) => {
    return obj.label === "(iii) Court orders, if any, affecting applied land";
  });
  const developerInputCheckedFiledColor12 = checkValue.filter((obj) => {
    return obj.label === "(iii) Court orders, if any, affecting applied land";
  });
  const developerInputFiledColor13 = uncheckedValue.filter((obj) => {
    return obj.label === "(iv) Any insolvency/liquidation proceedings against the land owner(s)/ collaborating developed ";
  });
  const developerInputCheckedFiledColor13 = checkValue.filter((obj) => {
    return obj.label === "(iv) Any insolvency/liquidation proceedings against the land owner(s)/ collaborating developed ";
  });
  const developerInputFiledColor14 = uncheckedValue.filter((obj) => {
    return obj.label === "(a)As per applied land (Yes/No)";
  });
  const developerInputCheckedFiledColor14 = checkValue.filter((obj) => {
    return obj.label === "(a)As per applied land (Yes/No)";
  });
  const developerInputFiledColor15 = uncheckedValue.filter((obj) => {
    return obj.label === "Revenue rasta";
  });
  const developerInputCheckedFiledColor15 = checkValue.filter((obj) => {
    return obj.label === "Revenue rasta";
  });
  const developerInputFiledColor16 = uncheckedValue.filter((obj) => {
    return obj.label === "Watercourse running";
  });
  const developerInputCheckedFiledColor16 = checkValue.filter((obj) => {
    return obj.label === "Watercourse running";
  });
  const developerInputFiledColor17 = uncheckedValue.filter((obj) => {
    return obj.label === "(d)Whether in Compact Block (Yes/No)";
  });
  const developerInputCheckedFiledColor17 = checkValue.filter((obj) => {
    return obj.label === "(d)Whether in Compact Block (Yes/No)";
  });
  const developerInputFiledColor18 = uncheckedValue.filter((obj) => {
    return obj.label === "Land Sandwiched";
  });
  const developerInputCheckedFiledColor18 = checkValue.filter((obj) => {
    return obj.label === "Land Sandwiched";
  });
  const developerInputFiledColor19 = uncheckedValue.filter((obj) => {
    return obj.label === "(f)Acquisition status (Yes/No)";
  });
  const developerInputCheckedFiledColor19 = checkValue.filter((obj) => {
    return obj.label === "(f)Acquisition status (Yes/No)";
  });
  const developerInputFiledColor20 = uncheckedValue.filter((obj) => {
    return obj.label === "Date of section 6 notification";
  });
  const developerInputCheckedFiledColor20 = checkValue.filter((obj) => {
    return obj.label === "Date of section 6 notification";
  });
  const developerInputFiledColor21 = uncheckedValue.filter((obj) => {
    return obj.label === "Orders Upload";
  });
  const developerInputCheckedFiledColor21 = checkValue.filter((obj) => {
    return obj.label === "Orders Upload";
  });
  const developerInputFiledColor22 = uncheckedValue.filter((obj) => {
    return obj.label === "(h) Whether land compensation received";
  });
  const developerInputCheckedFiledColor22 = checkValue.filter((obj) => {
    return obj.label === "(h) Whether land compensation received";
  });
  const developerInputFiledColor23 = uncheckedValue.filter((obj) => {
    return obj.label === "Status of release";
  });
  const developerInputCheckedFiledColor23 = checkValue.filter((obj) => {
    return obj.label === "Status of release";
  });
  const developerInputFiledColor24 = uncheckedValue.filter((obj) => {
    return obj.label === "Date of Award";
  });
  const developerInputCheckedFiledColor24 = checkValue.filter((obj) => {
    return obj.label === "Date of Award";
  });
  const developerInputFiledColor25 = uncheckedValue.filter((obj) => {
    return obj.label === "Date of Release";
  });
  const developerInputCheckedFiledColor25 = checkValue.filter((obj) => {
    return obj.label === "Date of Release";
  });
  const developerInputFiledColor26 = uncheckedValue.filter((obj) => {
    return obj.label === "Site Details";
  });
  const developerInputCheckedFiledColor26 = checkValue.filter((obj) => {
    return obj.label === "Site Details";
  });
  const developerInputFiledColor27 = uncheckedValue.filter((obj) => {
    return (
      obj.label === "whether the applied site is approachable from the proposed 18/24 m internal sectoral plan road/sector dividing road. (yes/no)"
    );
  });
  const developerInputCheckedFiledColor27 = checkValue.filter((obj) => {
    return (
      obj.label === "whether the applied site is approachable from the proposed 18/24 m internal sectoral plan road/sector dividing road. (yes/no)"
    );
  });
  const developerInputFiledColor28 = uncheckedValue.filter((obj) => {
    return obj.label === "(a)vacant: (Yes/No)";
  });
  const developerInputCheckedFiledColor28 = checkValue.filter((obj) => {
    return obj.label === "(a)vacant: (Yes/No)";
  });
  const developerInputFiledColor29 = uncheckedValue.filter((obj) => {
    return obj.label === "(b)Construction: (Yes/No)";
  });
  const developerInputCheckedFiledColor29 = checkValue.filter((obj) => {
    return obj.label === "(b)Construction: (Yes/No)";
  });
  const developerInputFiledColor30 = uncheckedValue.filter((obj) => {
    return obj.label === "(c)HT line";
  });
  const developerInputCheckedFiledColor30 = checkValue.filter((obj) => {
    return obj.label === "(c)HT line";
  });
  const developerInputFiledColor31 = uncheckedValue.filter((obj) => {
    return obj.label === "(d) IOC Gas Pipeline";
  });
  const developerInputCheckedFiledColor31 = checkValue.filter((obj) => {
    return obj.label === "(d) IOC Gas Pipeline";
  });
  const developerInputFiledColor32 = uncheckedValue.filter((obj) => {
    return obj.label === "(e)Nallah";
  });
  const developerInputCheckedFiledColor32 = checkValue.filter((obj) => {
    return obj.label === "(e)Nallah";
  });
  const developerInputFiledColor33 = uncheckedValue.filter((obj) => {
    return obj.label === "(f)Any revenue rasta/road";
  });
  const developerInputCheckedFiledColor33 = checkValue.filter((obj) => {
    return obj.label === "(f)Any revenue rasta/road";
  });
  const developerInputFiledColor34 = uncheckedValue.filter((obj) => {
    return obj.label === "(g)Any marginal land";
  });
  const developerInputCheckedFiledColor34 = checkValue.filter((obj) => {
    return obj.label === "(g)Any marginal land";
  });
  const developerInputFiledColor35 = uncheckedValue.filter((obj) => {
    return obj.label === "Utility Line";
  });
  const developerInputCheckedFiledColor35 = checkValue.filter((obj) => {
    return obj.label === "Utility Line";
  });
  const developerInputFiledColor36 = uncheckedValue.filter((obj) => {
    return obj.label === "5. Enclose the following documents as Annexures";
  });
  const developerInputCheckedFiledColor36 = checkValue.filter((obj) => {
    return obj.label === "5. Enclose the following documents as Annexures";
  });
  const developerInputFiledColor37 = uncheckedValue.filter((obj) => {
    return obj.label === "Land schedule";
  });
  const developerInputCheckedFiledColor37 = checkValue.filter((obj) => {
    return obj.label === "Land schedule";
  });
  const developerInputFiledColor38 = uncheckedValue.filter((obj) => {
    return obj.label === "Copy of Mutation";
  });
  const developerInputCheckedFiledColor38 = checkValue.filter((obj) => {
    return obj.label === "Copy of Mutation";
  });
  const developerInputFiledColor39 = uncheckedValue.filter((obj) => {
    return obj.label === "Copy of Jamabandi";
  });
  const developerInputCheckedFiledColor39 = checkValue.filter((obj) => {
    return obj.label === "Copy of Jamabandi";
  });
  const developerInputFiledColor40 = uncheckedValue.filter((obj) => {
    return obj.label === "Details of lease / patta, if any";
  });
  const developerInputCheckedFiledColor40 = checkValue.filter((obj) => {
    return obj.label === "Details of lease / patta, if any";
  });
  const developerInputFiledColor41 = uncheckedValue.filter((obj) => {
    return obj.label === "Approved Layout of Plan/ Site plan for(GH)Showing Area(s)/Proposed migration";
  });
  const developerInputCheckedFiledColor41 = checkValue.filter((obj) => {
    return obj.label === "Approved Layout of Plan/ Site plan for(GH)Showing Area(s)/Proposed migration";
  });
  const developerInputFiledColor42 = uncheckedValue.filter((obj) => {
    return obj.label === "Proposed Layout of Plan /site plan for area applied for migration.";
  });
  const developerInputCheckedFiledColor42 = checkValue.filter((obj) => {
    return obj.label === "Proposed Layout of Plan /site plan for area applied for migration.";
  });
  const developerInputFiledColor43 = uncheckedValue.filter((obj) => {
    return obj.label === "Revised Land Schedule";
  });
  const developerInputCheckedFiledColor43 = checkValue.filter((obj) => {
    return obj.label === "Revised Land Schedule";
  });

  console.log("Akash1", Purpose);


  const classes = useStyles();

  const [smShow, setSmShow] = useState(false);
  const [labelValue, setLabelValue] = useState("");
  const Colors = {
    approved: "#09cb3d",
    disapproved: "#ff0000",
    info: "#FFB602"
  }
  const [selectedFieldData, setSelectedFieldData] = useState();
  const [fieldValue, setFieldValue] = useState("");
  const [openedModal, setOpennedModal] = useState("")
  const [fieldIconColors, setFieldIconColors] = useState({
    licenceApplied: Colors.info,
    licenceNo: Colors.info,
    potentialZone: Colors.info,
    siteLocationPurpose: Colors.info,
    approachType: Colors.info,
    approachRoadWidth: Colors.info,
    specifyOthers: Colors.info,
    typeOfLand: Colors.info,
    thirdPartyRightCreated: Colors.info,
    migrationPolicy: Colors.info,
    encumbrance: Colors.info,
    existinglitigation: Colors.info,
    courtOrders: Colors.info,
    anyInsolvency: Colors.info,
    asPerAppliedLand: Colors.info,
    revenueRasta: Colors.info,
    waterCourseRunning: Colors.info,
    whetherInCompactBlock: Colors.info,
    landSandwiche: Colors.info,
    acquisitionStatus: Colors.info,
    dateOfSection4Notification: Colors.info,
    dateOfSection6Notification: Colors.info,
    ordersUpload: Colors.info,
    internalSectoralPlan: Colors.info,
    vacant: Colors.info,
    construction: Colors.info,
    htLine: Colors.info,
    iocGasPipeline: Colors.info,
    nallah: Colors.info,
    anyRevenueRasta: Colors.info,
    anyMarginalLand: Colors.info,
    utilityLine: Colors.info,
    documentsAsAnnexures: Colors.info,
    landSchedule: Colors.info,
    copyOfMutation: Colors.info,
    copyOfJamabandi: Colors.info,
    detailsOfLease: Colors.info,
    addSalesDeed: Colors.info,
    copyofSpaBoard: Colors.info,
    revisedLansSchedule: Colors.info,
    copyOfShajraPlan: Colors.info,
    areaAppliedUnderMigration: Colors.info,
    purposeOfParentLicence: Colors.info,
    licenceNo: Colors.info,
    areaOfParentLicence: Colors.info,
    validityOfParentLicence: Colors.info,
    approvedLayoutOfPlan: Colors.info,
    proposedLayoutOfPlan: Colors.info,
    uploadPreviouslyLayoutPlan: Colors.info,
    landCompensationReceived: Colors.info,
    statusOfRelease: Colors.info,
    dateOfAward: Colors.info,
    dateOfRelease: Colors.info,
    siteDetails: Colors.info,
    areaOfParentLicence: Colors.info
  })

  const fieldIdList = [{ label: "Whether licence applied for additional area", key: "licenceApplied" }, { label: "License No. of Parent License", key: "licenceNo" }, { label: "Potential Zone", key: "potentialZone" }, { label: "Site Location Purpose", key: "siteLocationPurpose" }, { label: "Approach Type (Type of Policy)", key: "approachType" }, { label: "Approach Road Width", key: "approachRoadWidth" }, { label: "Specify Others", key: "specifyOthers" }, { label: "Type of land", key: "typeOfLand" }, { label: "Third-party right created ", key: "thirdPartyRightCreated" }, { label: "Whether licence applied under Migration policy", key: "migrationPolicy" }, { label: "Any encumbrance with respect to following", key: "encumbrance" }, { label: "Existing litigation, if any, concerning applied land including co-sharers and collaborator", key: "existinglitigation" }, { label: "Court orders, if any, affecting applied land", key: "courtOrders" }, { label: "Any insolvency/liquidation proceedings against the land owner(s)/ collaborating developed", key: "anyInsolvency" }, { label: "As per applied land", key: "asPerAppliedLand" }, { label: "Revenue rasta", key: "revenueRasta" }, { label: "Watercourse running", key: "waterCourseRunning" }, { label: "Whether in Compact Block", key: "whetherInCompactBlock" }, { label: "Land Sandwiched", key: "landSandwiche" }, { label: "Acquisition status", key: "acquisitionStatus" }, { label: "Date of section 4 notification", key: "dateOfSection4Notification" }, { label: "Date of section 6 notification", key: "dateOfSection6Notification" }, { label: "Orders Upload", key: "ordersUpload" }, { label: "whether the applied site is approachable from the proposed 18/24 m internal sectoral plan road/sector dividing road", key: "internalSectoralPlan" }, { label: "vacant", key: "vacant" }, { label: "Construction", key: "construction" }, { label: "HT line", key: "htLine" }, { label: "IOC Gas Pipeline", key: "iocGasPipeline" }, { label: "Nallah", key: "nallah" }, { label: "Any revenue rasta/road", key: "anyRevenueRasta" }, { label: "Any marginal land", key: "anyMarginalLand" }, { label: "Utility Line", key: "utilityLine" }, { label: "Enclose the following documents as Annexures", key: "documentsAsAnnexures" }, { label: "Land schedule", key: "landSchedule" }, { label: "Copy of Mutation", key: "copyOfMutation" }, { label: "Copy of Jamabandi", key: "copyOfJamabandi" }, { label: "Details of lease / patta, if any", key: "detailsOfLease" }, { label: "Add Sales/deed/exchange", key: "addSalesDeed" }, { label: "Copy of spa/GPA/board resolution", key: "copyofSpaBoard" }, { label: "Revised Land Schedule", key: "revisedLansSchedule" }, { label: "Copy of Shajra Plan", key: "copyOfShajraPlan" }, { label: "Area Applied under Migration", key: "areaAppliedUnderMigration" }, { label: "Purpose of Parent Licence", key: "purposeOfParentLicence" }, { label: "Licence No.", key: "licenceNo" }, { label: "Area of Parent Licence", key: "areaOfParentLicence" }, { label: "Proposed Layout of Plan /site plan for area applied for migration.", key: "proposedLayoutOfPlan" }, { label: "Download Previously approved Layout Plan", key: "uploadPreviouslyLayoutPlan" }, { label: "Validity of Parent Licence", key: "validityOfParentLicence" }, { label: "Approved Layout of Plan/ Site plan for(GH)Showing Area(s)/Proposed migration", key: "approvedLayoutOfPlan" }, { label: "Whether land compensation received", key: "landCompensationReceived" }, { label: "Status of release", key: "statusOfRelease" }, { label: "Date of Award", key: "dateOfAward" }, { label: "Date of Release", key: "dateOfRelease" }, { label: "Site Details", key: "siteDetails" }, { label: "Area of Parent Licence", key: "areaOfParentLicence" },];


  const getColorofFieldIcon = () => {
    let tempFieldColorState = fieldIconColors;
    fieldIdList.forEach((item) => {
      if (dataIcons !== null && dataIcons !== undefined) {
        console.log("color method called");
        const fieldPresent = dataIcons.egScrutiny.filter(ele => (ele.fieldIdL === item.label));
        console.log("filteration value111", fieldPresent, fieldPresent[0]?.isApproved);
        if (fieldPresent && fieldPresent.length) {
          console.log("filteration value111", fieldPresent, fieldPresent[0]?.isApproved);
          tempFieldColorState = { ...tempFieldColorState, [item.key]: fieldPresent[0].isApproved ? Colors.approved : Colors.disapproved }

        }
      }
    })

    setFieldIconColors(tempFieldColorState);

  };


  useEffect(() => {
    getColorofFieldIcon();
    console.log("repeating1...",)
  }, [dataIcons])

  useEffect(() => {
    if (labelValue) {
      const fieldPresent = dataIcons.egScrutiny.filter(ele => (ele.fieldIdL === labelValue));
      setSelectedFieldData(fieldPresent[0]);
    } else {
      setSelectedFieldData(null);
    }
  }, [labelValue])



  const currentRemarks = (data) => {
    props.showTable({ data: data.data });
  };

  const handlemodaldData = (data) => {

    setSmShow(false);
    console.log("here", openedModal, data);
    if (openedModal && data) {
      setFieldIconColors({ ...fieldIconColors, [openedModal]: data.data.isApproved ? Colors.approved : Colors.disapproved })
    }
    setOpennedModal("");
    setLabelValue("");
  };


  return (
    <Form
      ref={props.developerInfoRef}
    >
      <ModalChild
        labelmodal={labelValue}
        passmodalData={handlemodaldData}
        displaymodal={smShow}
        onClose={() => setSmShow(false)}
        selectedFieldData={selectedFieldData}
        fieldValue={fieldValue}
        remarksUpdate={currentRemarks}
      ></ModalChild>

      <div
        className="collapse-header"
        onClick={() => setOpen(!open)}
        aria-controls="example-collapse-text"
        aria-expanded={open}
        style={{
          background: "#f1f1f1",
          padding: "0.25rem 1.25rem",
          borderRadius: "0.25rem",
          fontWeight: "600",
          display: "flex",
          cursor: "pointer",
          color: "#817f7f",
          justifyContent: "space-between",
          alignContent: "center",
        }}
      >
        <span style={{ color: "#817f7f" }} className="">
          Land Schedule
        </span>
        {open ? <RemoveIcon></RemoveIcon> : <AddIcon></AddIcon>}
      </div>
      <Collapse in={open}>
        <div id="example-collapse-text">
          <Form.Group
            style={{ display: props.displayGeneral, border: "2px solid #e9ecef", margin: 15, padding: 15 }}
            className={`justify-content-center ${classes.formLabel}`}
          >
            <Row className={classes.formLabel}>
              <Col md={4} xxl lg="12">
                <Form.Label >
                  {/* {JSON.stringify(userRoles)}
                    {JSON.stringify(hideRemarks)} */}
                  (i)Whether licence applied for additional area ?
                </Form.Label>
                <div className="d-flex flex-row">
                  <input type="radio" disabled value="Yes" checked={landScheduleData?.licenseApplied === "Y" ? true : false} />
                  <label className="m-0  mx-2" for="Yes">Yes</label>
                  <input type="radio" disabled value="No" checked={landScheduleData?.licenseApplied === "N" ? true : false} />
                  <label className="m-0 mx-2" for="No">No</label>
                  <ReportProblemIcon
                    style={{
                      display: hideRemarks ? "none" : "block",
                      color: fieldIconColors.licenceApplied
                    }}
                    onClick={() => {
                      setLabelValue("Whether licence applied for additional area"),
                        setOpennedModal("licenceApplied")
                      setSmShow(true),
                        console.log("modal open"),
                        setFieldValue(landScheduleData?.licenseApplied === "Y" ? "Yes" : landScheduleData?.licenseApplied === "N" ? "No" : null);
                    }}
                  ></ReportProblemIcon>
                </div>
              </Col>
            </Row>

            {
              landScheduleData?.licenseApplied === "Y" && (

                <div>
                  <Row className={classes.formLabel} style={{ marginBottom: 15 }} >
                    <Col className="ms-auto" md={4} xxl lg="4">
                      <label>
                        <h5>Licence No. of Parent Licence &nbsp;</h5>
                      </label>
                      <div className="d-flex flex-row align-items-center my-1 ">
                        <Form.Control
                          placeholder={landScheduleData !== null ? landScheduleData?.licenseNumber : null}
                          disabled
                        ></Form.Control>
                        <ReportProblemIcon
                          style={{
                            display: hideRemarks ? "none" : "block",

                            color: fieldIconColors.licenceNo
                          }}
                          onClick={() => {
                            setLabelValue("Licence No. of Parent Licence"),
                              setOpennedModal("licenceNo")
                            setSmShow(true),
                              console.log("modal open"),
                              setFieldValue(landScheduleData !== null ? landScheduleData?.licenseNumber : null);
                          }}
                        ></ReportProblemIcon>
                      </div>

                    </Col>
                    <Col className="ms-auto" md={4} xxl lg="4">
                      <label htmlFor="potential">
                        <h6>
                          {/* Potential Zone: */}
                          <h5>Development Plan &nbsp;</h5>
                        </h6>
                      </label>

                      <div className="d-flex flex-row  align-items-center">
                        <Form.Control

                          placeholder={landScheduleData !== null ? landScheduleData?.potential : null}
                          disabled
                        ></Form.Control>
                        <ReportProblemIcon
                          style={{
                            display: hideRemarks ? "none" : "block",
                            // display: hideRemarksPatwari?"none":"block",
                            color: fieldIconColors.potentialZone
                          }}
                          onClick={() => {
                            setLabelValue("Potential Zone"),
                              setOpennedModal("potentialZone")
                            setSmShow(true),
                              console.log("modal open"),
                              setFieldValue(landScheduleData !== null ? landScheduleData?.potential : null);
                          }}
                        ></ReportProblemIcon>
                      </div>
                    </Col>
                    <Col className="ms-auto" md={4} xxl lg="4">
                      <label>

                        <h5>Type of colony  &nbsp;</h5>
                      </label>
                      <div className="d-flex flex-row  align-items-center">
                        <Form.Control placeholder={landScheduleData !== null ? landScheduleData?.siteLoc : null} disabled></Form.Control>
                        <ReportProblemIcon
                          style={{
                            display: hideRemarks ? "none" : "block",
                            // display: hideRemarksPatwari?"none":"block",
                            color: fieldIconColors.siteLocationPurpose
                          }}
                          onClick={() => {
                            setLabelValue("Site Location Purpose"),
                              setOpennedModal("siteLocationPurpose")
                            setSmShow(true),
                              console.log("modal open"),
                              setFieldValue(landScheduleData !== null ? landScheduleData?.siteLoc : null);
                          }}
                        ></ReportProblemIcon>
                      </div>
                    </Col>
                  </Row>
                  <Row className="ms-auto" style={{ marginBottom: 15 }}>

                    <Col md={6} xxl lg="12">
                      {
                        {
                          'DDJAY_APHP': <div>
                            <CommercialColonyInResidential dataForIcons={dataIcons} ></CommercialColonyInResidential>
                          </div>,
                          'RPL': <div>
                            <CommercialColonyInResidential dataForIcons={dataIcons} ></CommercialColonyInResidential>
                          </div>,
                          "NILPC": <div>
                            <CommercialColonyInResidential dataForIcons={dataIcons} ></CommercialColonyInResidential>
                          </div>,
                          "AHP": <div>
                            <CommercialColonyInResidential dataForIcons={dataIcons} ></CommercialColonyInResidential>
                          </div>,
                          "CIC": <div>
                            <CommercialLicense dataForIcons={dataIcons} ></CommercialLicense>
                          </div>,
                          "LDEF": <div>
                            <LowDensityEco dataForIcons={dataIcons} ></LowDensityEco>
                          </div>,
                          "IPL": <div>
                            <CyberPark dataForIcons={dataIcons} ></CyberPark>
                          </div>,
                          "ITP": <div>
                            <CyberPark dataForIcons={dataIcons} ></CyberPark>
                          </div>,
                          "ITC": <div>
                            <CyberPark dataForIcons={dataIcons} ></CyberPark>
                          </div>,
                          "RHP": <div>
                            <RetirementHousing dataForIcons={dataIcons} ></RetirementHousing>
                          </div>,
                        }[Purpose]
                      }
                    </Col>

                  </Row >
                  <Row className={classes.formLabel} style={{ marginBottom: 15 }}>
                    <Col className="ms-auto" md={4} xxl lg="4">
                      <label>
                        <h6>Area of parent licence in acres </h6>{" "}

                      </label>
                      <div className="d-flex flex-row  align-items-center">
                        <Form.Control placeholder={landScheduleData !== null ? landScheduleData?.areaOfParentLicence : null} disabled></Form.Control>
                        <ReportProblemIcon
                          style={{
                            display: hideRemarks ? "none" : "block",
                            // display: hideRemarksPatwari?"none":"block",
                            color: fieldIconColors.approachRoadWidth
                          }}
                          onClick={() => {
                            setLabelValue("Area of Parent Licence"),
                              setOpennedModal("approachRoadWidth")
                            setSmShow(true),
                              console.log("modal open"),
                              setFieldValue(landScheduleData !== null ? landScheduleData?.areaOfParentLicence : null);
                          }}
                        ></ReportProblemIcon>
                      </div>
                    </Col>
                    <Col className="ms-auto" md={4} xxl lg="4">
                      <label>
                        <h6>Specify Others</h6>
                      </label>
                      <div className="d-flex flex-row  align-items-center">
                        <Form.Control placeholder={landScheduleData !== null ? landScheduleData?.specify : null} disabled></Form.Control>
                        <ReportProblemIcon
                          style={{
                            display: hideRemarks ? "none" : "block",
                            // display: hideRemarksPatwari?"none":"block",
                            color: fieldIconColors.specifyOthers
                          }}
                          onClick={() => {
                            setLabelValue("Specify Others"),
                              setOpennedModal("specifyOthers")
                            setSmShow(true),
                              console.log("modal open"),
                              setFieldValue(landScheduleData !== null ? landScheduleData?.specify : null);
                          }}
                        ></ReportProblemIcon>
                      </div>
                    </Col>
                    <Col className="ms-auto" md={4} xxl lg="4">
                      {/* <div className="col col-4"> */}
                      <h6>Third-party right created&nbsp; </h6>

                      <div className="d-flex flex-row align-items-center my-1 ">
                        <input type="radio" disabled value="Yes" checked={landScheduleData?.thirdParty === "Y" ? true : false} />
                        &nbsp;&nbsp;
                        <label className="m-0 mx-2" for="Yes">
                          Yes
                        </label>
                        &nbsp;&nbsp;
                        <input type="radio" disabled value="No" checked={landScheduleData?.thirdParty === "N" ? true : false} />
                        &nbsp;&nbsp;
                        <label className="m-0 mx-2" for="No">
                          No
                        </label>
                        <ReportProblemIcon
                          style={{
                            display: hideRemarks ? "none" : "block",
                            // display: hideRemarksPatwari?"none":"block",
                            color: fieldIconColors.thirdPartyRightCreated
                          }}
                          onClick={() => {
                            setLabelValue("Third-party right created"),
                              setOpennedModal("thirdPartyRightCreated")
                            setSmShow(true),
                              console.log("modal open"),
                              setFieldValue(landScheduleData?.thirdParty === "Y" ? "Yes" : "No");
                          }}
                        ></ReportProblemIcon>

                      </div>
                      {/* </div> */}
                      {/* <div className="col col-8">
                      
                    </div> */}
                      {/* <div className="col col-4">
                      {landScheduleData?.thirdParty === "N" && (
                        <div className="row ">
                          <div className="col col-4">
                            <label> Document Download </label>
                            <IconButton onClick={() => getDocShareholding(landScheduleData?.thirdPartyDoc)}>
                              <DownloadForOfflineIcon color="primary" className="mx-1" />
                            </IconButton>
                          </div>
                        </div>
                      )}
                    </div> */}
                    </Col>
                    <Col className="ms-auto" md={6} xxl lg="12">
                      {landScheduleData?.thirdParty === "N" && (
                        <div>
                          <div className="col col-4">

                            <label> Remark </label>
                            <Form.Control placeholder={landScheduleData !== null ? landScheduleData?.thirdPartyRemark : null}
                              // height={30} style={{ maxWidth: 200, marginRight: 5 }} 
                              className={classes.formLabel}
                              disabled></Form.Control>
                          </div>
                          <div className="col col-4">
                            <label> Document Download </label>

                            <IconButton onClick={() => getDocShareholding(landScheduleData?.thirdPartyDoc)}>
                              <DownloadForOfflineIcon color="primary" className="mx-1" />
                            </IconButton>

                          </div>
                        </div>
                      )}
                    </Col>
                  </Row>
                </div>
              )}

            <Row className={classes.formLabel}>
              <Col className="ms-auto" md={4} xxl lg="12">
                <Form.Label> (ii)Whether licence applied under Migration Policy ?</Form.Label>
                &nbsp;&nbsp;
                <div className="d-flex flex-row align-items-center my-1 ">

                  <input type="radio" disabled value="Yes" checked={landScheduleData?.migrationLic === "Y" ? true : false} />
                  <label className="m-0  mx-2" for="Yes">Yes</label>&nbsp;&nbsp;
                  <input type="radio" disabled value="No" checked={landScheduleData?.migrationLic === "N" ? true : false} />
                  <label className="m-0 mx-2" for="No">No</label>
                  <ReportProblemIcon
                    style={{
                      display: hideRemarks ? "none" : "block",

                      color: fieldIconColors.migrationPolicy
                    }}
                    onClick={() => {
                      setLabelValue("Whether licence applied under Migration policy"),
                        setOpennedModal("migrationPolicy")
                      setSmShow(true),
                        console.log("modal open"),
                        setFieldValue(landScheduleData?.migrationLic === "Y" ? "Yes" : "No");
                    }}
                  ></ReportProblemIcon>
                </div>
              </Col>
            </Row>

            <Row className={classes.formLabel}>
              <Col md={4} xxl lg="12">
                {
                  landScheduleData?.migrationLic === "Y" &&

                  <div>
                    <div style={{ overflow: "scroll" }}>
                      <table className="table table-bordered">
                        <thead>

                          <tr className="border-bottom-0">
                            <th class="fw-normal pb-0 border-bottom-0 align-top">
                              Previous Licence Number
                            </th>
                            <th class="fw-normal pb-0 border-bottom-0 align-top">
                              Area of parent licence
                            </th>
                            <th class="fw-normal pb-0 border-bottom-0 align-top">
                              Purpose of parent licence
                            </th>
                            <th class="fw-normal pb-0 border-bottom-0 align-top">
                              Validity of parent licence
                            </th>
                            <th class="fw-normal pb-0 border-bottom-0 align-top">
                              Date
                            </th>
                            <th class="fw-normal pb-0 border-bottom-0 align-top">
                              Area applied under migration in acres
                            </th>
                            <th class="fw-normal pb-0 border-bottom-0 align-top">
                              Applied Khasra number
                            </th>
                            <th class="fw-normal pb-0 border-bottom-0 align-top">
                              Area
                            </th>
                            <th class="fw-normal pb-0 border-bottom-0 align-top">
                              Balance of Parent Licence
                            </th>

                          </tr>
                          <tr className="border-top-0">
                            <th class="fw-normal py-0 border-top-0">
                              <ReportProblemIcon
                                style={{
                                  display: hideRemarks ? "none" : "block",
                                  color: fieldIconColors.licenceNo
                                }}
                                onClick={() => {
                                  setLabelValue("Licence No."),
                                    setOpennedModal("licenceNo")
                                  setSmShow(true),
                                    console.log("modal open"),
                                    setFieldValue(landScheduleData !== null ? landScheduleData?.licNo : null);
                                }}
                              ></ReportProblemIcon>
                            </th>
                            <th class="fw-normal py-0 border-top-0">
                              <ReportProblemIcon
                                style={{
                                  display: hideRemarks ? "none" : "block",
                                  color: fieldIconColors.areaOfParentLicence
                                }}
                                onClick={() => {
                                  setLabelValue("Area of Parent Licence"),
                                    setOpennedModal("areaOfParentLicence")
                                  setSmShow(true),
                                    console.log("modal open"),
                                    setFieldValue(landScheduleData !== null ? landScheduleData?.parentLicArea : null);
                                }}
                              ></ReportProblemIcon>
                            </th>
                            <th class="fw-normal py-0 border-top-0">
                              <ReportProblemIcon
                                style={{
                                  display: hideRemarks ? "none" : "block",
                                  color: fieldIconColors.purposeOfParentLicence
                                }}
                                onClick={() => {
                                  setLabelValue("Purpose of Parent Licence"),
                                    setOpennedModal("purposeOfParentLicence")
                                  setSmShow(true),
                                    console.log("modal open"),
                                    setFieldValue(landScheduleData !== null ? landScheduleData?.parentLicPurpose : null);
                                }}
                              ></ReportProblemIcon>
                            </th>
                            <th class="fw-normal py-0 border-top-0">
                              <ReportProblemIcon
                                style={{
                                  display: hideRemarks ? "none" : "block",
                                  color: fieldIconColors.validityOfParentLicence
                                }}
                                onClick={() => {
                                  setLabelValue("Validity of Parent Licence")
                                  setOpennedModal("validityOfParentLicence")
                                  setSmShow(true),
                                    console.log("modal open"),
                                    setFieldValue(landScheduleData?.validityOfParentLic === "Y" ? "Yes" : landScheduleData?.validityOfParentLic === "N" ? "No" : null);
                                }}
                              ></ReportProblemIcon>
                            </th>
                            <th class="fw-normal py-0 border-top-0">
                              <ReportProblemIcon
                                style={{
                                  display: hideRemarks ? "none" : "block",
                                  color: fieldIconColors.areaAppliedUnderMigration
                                }}
                                onClick={() => {
                                  setLabelValue("Area Applied under Migration"),
                                    setOpennedModal("areaAppliedUnderMigration")
                                  setSmShow(true),
                                    console.log("modal open"),
                                    setFieldValue(landScheduleData !== null ? landScheduleData?.areaAppliedUnderMigration : null);
                                }}
                              ></ReportProblemIcon>
                            </th>
                            <th class="fw-normal py-0 border-top-0">
                              <ReportProblemIcon
                                style={{
                                  display: hideRemarks ? "none" : "block",
                                  color: fieldIconColors.areaAppliedUnderMigration
                                }}
                                onClick={() => {
                                  setLabelValue("Area Applied under Migration"),
                                    setOpennedModal("areaAppliedUnderMigration")
                                  setSmShow(true),
                                    console.log("modal open"),
                                    setFieldValue(landScheduleData !== null ? landScheduleData?.areaAppliedUnderMigration : null);
                                }}
                              ></ReportProblemIcon>
                            </th>
                            <th class="fw-normal py-0 border-top-0">
                              <ReportProblemIcon
                                style={{
                                  display: hideRemarks ? "none" : "block",
                                  color: fieldIconColors.areaAppliedUnderMigration
                                }}
                                onClick={() => {
                                  setLabelValue("Area Applied under Migration"),
                                    setOpennedModal("areaAppliedUnderMigration")
                                  setSmShow(true),
                                    console.log("modal open"),
                                    setFieldValue(landScheduleData !== null ? landScheduleData?.areaAppliedUnderMigration : null);
                                }}
                              ></ReportProblemIcon>
                            </th>
                            <th class="fw-normal py-0 border-top-0">
                              <ReportProblemIcon
                                style={{
                                  display: hideRemarks ? "none" : "block",
                                  color: fieldIconColors.areaAppliedUnderMigration
                                }}
                                onClick={() => {
                                  setLabelValue("Area Applied under Migration"),
                                    setOpennedModal("areaAppliedUnderMigration")
                                  setSmShow(true),
                                    console.log("modal open"),
                                    setFieldValue(landScheduleData !== null ? landScheduleData?.areaAppliedUnderMigration : null);
                                }}
                              ></ReportProblemIcon>
                            </th>
                            <th class="fw-normal py-0 border-top-0">
                              <ReportProblemIcon
                                style={{
                                  display: hideRemarks ? "none" : "block",
                                  color: fieldIconColors.areaAppliedUnderMigration
                                }}
                                onClick={() => {
                                  setLabelValue("Area Applied under Migration"),
                                    setOpennedModal("areaAppliedUnderMigration")
                                  setSmShow(true),
                                    console.log("modal open"),
                                    setFieldValue(landScheduleData !== null ? landScheduleData?.areaAppliedUnderMigration : null);
                                }}
                              ></ReportProblemIcon>
                            </th>

                          </tr>
                        </thead>
                        <tbody>
                          {
                            landScheduleData?.LandScheduleDetails?.map((item, index) => (

                              <tr
                                key={index}
                              >
                                <td>
                                  <input type="text" className="form-control"
                                    placeholder={item?.previousLicensenumber}
                                    disabled />
                                </td>
                                <td>
                                  <input type="text" className="form-control"
                                    placeholder={item?.areaOfParentLicence}
                                    disabled />
                                </td>
                                <td>
                                  <input type="text" className="form-control"
                                    placeholder={item?.purposeOfParentLicence}
                                    disabled />
                                </td>
                                <td>
                                  <input type="text" className="form-control"
                                    placeholder={item?.validity}
                                    disabled />
                                </td>
                                <td>
                                  <input type="text" className="form-control"
                                    placeholder={item?.date}
                                    disabled />
                                </td>
                                <td>
                                  <input type="text" className="form-control"
                                    placeholder={item?.areaAppliedmigration}
                                    disabled />
                                </td>
                                <td>
                                  <input type="text" className="form-control"
                                    placeholder={item?.khasraNumber}
                                    disabled />
                                </td>
                                <td>
                                  <input type="text" className="form-control"
                                    placeholder={item?.area}
                                    disabled />
                                </td>
                                <td>
                                  <input type="text" className="form-control"
                                    placeholder={item?.balanceOfParentLicence}
                                    disabled />
                                </td>

                                {/* <td class="text-center">
                    <div className="btn btn-sm col-md-6">
                                    <IconButton onClick={()=>getDocShareholding(item?.registeringAuthorityDoc)}>
                                      <Visibility color="info" className="icon" /></IconButton>
                                  
                                  </div>
                                  <div className="btn btn-sm col-md-6">
                                    <IconButton onClick={()=>getDocShareholding(item?.registeringAuthorityDoc)}>
                                <FileDownload color="primary" className="mx-1" />
                        </IconButton>
                        </div>
                      <input type="text" className="form-control" title={item?.registeringAuthorityDoc} placeholder={item?.registeringAuthorityDoc} disabled />
                    </td>
                    */}

                              </tr>
                            ))
                          }
                        </tbody>
                      </table>
                    </div>
                    {/* <Row className={classes.formLabel} style={{ marginBottom: 20 }}> */}
                    {/* <Col className="ms-auto" md={4} xxl lg="4">
                        <label>
                      
                          <h5>Area Applied under Migration</h5>
                        </label>

                        <div className="d-flex flex-row align-items-center my-1 ">
                          <Form.Control
                           
                            placeholder={landScheduleData !== null ? landScheduleData?.areaUnderMigration : null}
                            disabled
                          ></Form.Control>
                          <ReportProblemIcon
                            style={{
                              display: hideRemarks?"none":"block",
                              color: fieldIconColors.areaAppliedUnderMigration
                            }}
                            onClick={() => {
                              setLabelValue("Area Applied under Migration"),
                                setOpennedModal("areaAppliedUnderMigration")
                              setSmShow(true),
                                console.log("modal open"),
                         setFieldValue(landScheduleData !== null ? landScheduleData?.areaAppliedUnderMigration : null);
                            }}
                          ></ReportProblemIcon>
                        </div>
                        
                      </Col>
                      <Col className="ms-auto" md={4} xxl lg="4">
                        <label htmlFor="potential">
                          <h6>
                         
                            <h5>Purpose of Parent Licence</h5>
                          </h6>
                        </label>

                        <div className="d-flex flex-row  align-items-center">
                          <Form.Control
                            
                            placeholder={landScheduleData !== null ? landScheduleData?.purposeParentLic : null}
                            disabled
                          ></Form.Control>
                          <ReportProblemIcon
                            style={{
                              display: hideRemarks?"none":"block",
                              color: fieldIconColors.purposeOfParentLicence
                            }}
                            onClick={() => {
                              setLabelValue("Purpose of Parent Licence"),
                                setOpennedModal("purposeOfParentLicence")
                              setSmShow(true),
                                console.log("modal open"),
                                setFieldValue(landScheduleData !== null ? landScheduleData?.parentLicPurpose : null);
                            }}
                          ></ReportProblemIcon>
                        </div>
                      </Col>
                      <Col className="ms-auto" md={4} xxl lg="4">
                        <label>
                          
                          <h5>Licence No.</h5>
                        </label>
                        <div className="d-flex flex-row  align-items-center">
                          <Form.Control placeholder={landScheduleData !== null ? landScheduleData?.licNo : null} 
                        
                          disabled></Form.Control>
                          <ReportProblemIcon
                            style={{
                              display: hideRemarks?"none":"block",
                              color: fieldIconColors.licenceNo
                            }}
                            onClick={() => {
                              setLabelValue("Licence No."),
                                setOpennedModal("licenceNo")
                              setSmShow(true),
                                console.log("modal open"),
                                setFieldValue(landScheduleData !== null ? landScheduleData?.licNo : null);
                            }}
                          ></ReportProblemIcon>
                        </div>
                      </Col> */}

                    {/* <Col className="ms-auto" md={4} xxl lg="4">
                        <label>
                         
                          <h5>Area of Parent Licence</h5>
                        </label>

                        <div className="d-flex flex-row  align-items-center">
                          <Form.Control placeholder={landScheduleData !== null ? landScheduleData?.areaofParentLic : null}
                          
                           disabled></Form.Control>
                          <ReportProblemIcon
                            style={{
                              display: hideRemarks?"none":"block",
                              color: fieldIconColors.areaOfParentLicence
                            }}
                            onClick={() => {
                              setLabelValue("Area of Parent Licence"),
                                setOpennedModal("areaOfParentLicence")
                              setSmShow(true),
                                console.log("modal open"),
                                setFieldValue(landScheduleData !== null ? landScheduleData?.parentLicArea : null);
                            }}
                          ></ReportProblemIcon>
                        </div>
                      </Col> */}
                    {/* <Col className="ms-auto" md={4} xxl lg="4">
                        <label>
                          <h6>Validity of Parent Licence</h6>
                        </label>
                        <div className="d-flex flex-row align-items-center my-1 ">
                          
                          <input type="radio" disabled value="Yes" checked={landScheduleData?.validityOfParentLic === "Y" ? true : false} />
                          <label className="m-0  mx-2" for="Yes">Yes</label>&nbsp;&nbsp;
                          <input type="radio" disabled value="No" checked={landScheduleData?.validityOfParentLic === "N" ? true : false} />
                          <label className="m-0 mx-2" for="No">No</label>
                          <ReportProblemIcon
                            style={{
                              display: hideRemarks?"none":"block",
                              color: fieldIconColors.validityOfParentLicence
                            }}
                            onClick={() => {
                              setLabelValue("Validity of Parent Licence")
                              setOpennedModal("validityOfParentLicence")
                              setSmShow(true),
                                console.log("modal open"),
                                setFieldValue(landScheduleData?.validityOfParentLic === "Y" ? "Yes" : landScheduleData?.validityOfParentLic === "N" ? "No" : null);
                            }}
                          ></ReportProblemIcon>
                        </div>
                      </Col>  */}
                    {/* <Col className="ms-auto" md={4} xxl lg="4">
                     
                      <h6>Type of land</h6>{" "}
                      <div className="d-flex flex-row  align-items-center">
                        <Form.Control placeholder={landScheduleData !== null ? landScheduleData?.typeLand : null} 
                         
                        disabled></Form.Control>
                        <ReportProblemIcon
                          style={{
                            display: hideRemarks?"none":"block",
                            color: fieldIconColors.typeOfLand
                          }}
                          onClick={() => {
                            setLabelValue("Type of land"),
                              setOpennedModal("typeOfLand")
                            setSmShow(true),
                              console.log("modal open"),
                              setFieldValue(landScheduleData !== null ? landScheduleData?.typeLand : null);
                          }}
                        ></ReportProblemIcon>
                      </div>
                  
                      </Col>
                      <Col className="ms-auto" md={4} xxl lg="4">
                      <label>
                        <h6>Approach Road Width&nbsp;&nbsp;</h6>{" "}
                      </label>
                      <div className="d-flex flex-row  align-items-center">
                        <Form.Control placeholder={landScheduleData !== null ? landScheduleData?.approachRoadWidth : null} 
                       
                         disabled></Form.Control>
                        <ReportProblemIcon
                          style={{
                            display: hideRemarks?"none":"block",
                            color: fieldIconColors.approachRoadWidth
                          }}
                          onClick={() => {
                            setLabelValue("Approach Road Width"),
                              setOpennedModal("approachRoadWidth")
                            setSmShow(true),
                              console.log("modal open"),
                              setFieldValue(landScheduleData !== null ? landScheduleData?.approachRoadWidth : null);
                          }}
                        ></ReportProblemIcon>
                      </div>
                    </Col>
                    <Col className="ms-auto" md={4} xxl lg="4">
                      <label>
                        <h6>Area other than Licence&nbsp;&nbsp;</h6>{" "}
                      </label>
                      <div className="d-flex flex-row  align-items-center">
                        <Form.Control placeholder={landScheduleData !== null ? landScheduleData?.approachRoadWidth : null} 
                        
                        disabled></Form.Control>
                        <ReportProblemIcon
                          style={{
                            display: hideRemarks?"none":"block",
                            color: fieldIconColors.approachRoadWidth
                          }}
                          onClick={() => {
                            setLabelValue("Approach Road Width"),
                              setOpennedModal("approachRoadWidth")
                            setSmShow(true),
                              console.log("modal open"),
                              setFieldValue(landScheduleData !== null ? landScheduleData?.approachRoadWidth : null);
                          }}
                        ></ReportProblemIcon>
                      </div>
                    </Col>
                      <Col className="ms-auto" md={4} xxl lg="4">
                        <h6>Approved Layout of Plan/ Site plan for(GH)Showing Area(s)/Proposed migration</h6>
                       
                        <div className="d-flex flex-row align-items-center my-1 ">
                          <IconButton onClick={() => getDocShareholding(landScheduleData?.approvedLayoutPlan)}>
                            <DownloadForOfflineIcon color="primary" className="mx-1" />
                          </IconButton>

                          <ReportProblemIcon
                            style={{
                              display: hideRemarks?"none":"block",
                              color: fieldIconColors.approvedLayoutOfPlan
                            }}
                            onClick={() => {
                              setLabelValue("Approved Layout of Plan/ Site plan for(GH)Showing Area(s)/Proposed migration"),
                                setOpennedModal("approvedLayoutOfPlan")
                              setSmShow(true),
                                console.log("modal open"),
                                setFieldValue("");
                            }}
                          ></ReportProblemIcon>
                        </div>
                      </Col> */}
                    {/* </Row> */}
                    {/* <Row className="ms-auto" style={{ marginBottom: 20 }}>
                      <div className="col col-4">
                        <h6>Proposed Layout of Plan /site plan for area applied for migration.</h6>
                        
                        <div className="d-flex flex-row align-items-center my-1 ">

                          <IconButton onClick={() => getDocShareholding(landScheduleData?.proposedLayoutPlan)}>
                            <DownloadForOfflineIcon color="primary" className="mx-1" />
                          </IconButton>

                          <ReportProblemIcon
                            style={{
                              display: hideRemarks?"none":"block",
                              color: fieldIconColors.proposedLayoutOfPlan
                            }}
                            onClick={() => {
                              setLabelValue("Proposed Layout of Plan /site plan for area applied for migration."),
                                setOpennedModal("proposedLayoutOfPlan")
                              setSmShow(true),
                                console.log("modal open"),
                                setFieldValue("");
                            }}
                          ></ReportProblemIcon>
                        </div>
                      </div>

                      <div className="col col-4">
                        <h6>Download Previously approved Layout Plan</h6>
                        
                        <div className="d-flex flex-row align-items-center my-1 ">

                          <IconButton onClick={() => getDocShareholding(landScheduleData?.uploadPreviouslyLayoutPlan)}>
                            <DownloadForOfflineIcon color="primary" className="mx-1" />
                          </IconButton>

                          <ReportProblemIcon
                            style={{
                              display: hideRemarks?"none":"block",
                              color: fieldIconColors.uploadPreviouslyLayoutPlan
                            }}
                            onClick={() => {
                              setLabelValue("Download Previously approved Layout Plan"),
                                setOpennedModal("uploadPreviouslyLayoutPlan")
                              setSmShow(true),
                                console.log("modal open"),
                                setFieldValue("");
                            }}
                          ></ReportProblemIcon>
                        </div>
                      </div>
                    </Row> */}
                  </div>
                }
              </Col>
            </Row>

            <hr className="mb-3"></hr>
            <Row className={classes.formLabel}>
              <h5>
                2. Any encumbrance with respect to following :&nbsp;&nbsp;
              </h5>
              <div className="d-flex mt-2 align-items-center">
                <input type="radio" disabled value="rehan/mortage" name="rehan/mortage" checked={landScheduleData?.encumburance === "rehan/mortage" ? true : false} />
                <label className="m-0 mx-2" htmlFor="rehan/mortage">Rehan / Mortgage</label>
                <input type="radio" disabled value="patta/lease" name="patta/lease" checked={landScheduleData?.encumburance === "patta/lease" ? true : false} />
                <label className="m-0 mx-2" htmlFor="patta/lease">Patta/Lease</label>

                <input type="radio" disabled value="gair/marusi" name="gair/marusi" checked={landScheduleData?.encumburance === "gair/marusi" ? true : false} />
                <label className="m-0 mx-2" htmlFor="gair/marusi">Gair/Marusi</label>
                <input type="radio" disabled value="anyOther" name="anyOther" checked={landScheduleData?.encumburance === "anyOther" ? true : false} />
                <label className="m-0 mx-2" htmlFor="anyOther">Any Other</label>
                <input type="radio" disabled value="none" name="none" checked={landScheduleData?.encumburance === "none" ? true : false} />
                <label className="m-0 mx-2" htmlFor="none">none</label>
                <ReportProblemIcon
                  className="m-0 mx-2"
                  style={{
                    display: hideRemarks ? "none" : "block",
                    color: fieldIconColors.encumbrance
                  }}
                  onClick={() => {
                    setLabelValue("Any encumbrance with respect to following"),
                      setOpennedModal("encumbrance")
                    setSmShow(true),
                      console.log("modal open"),
                      setFieldValue(landScheduleData !== null ? landScheduleData?.encumburance : null);
                  }}
                ></ReportProblemIcon>
              </div>


              {landScheduleData?.encumburance === "rehan/mortage" && "patta/lease" && "anyOther" && "gair/marusi" && (
                <div className="row ml-3 mb-3">
                  <div className="col col-4 m-0 p-0">
                    <label htmlFor="npnl">
                      <h6>Rehan/Mortgage Remarks</h6>
                    </label>
                    <Form.Control placeholder={landScheduleData !== null ? landScheduleData?.anyOtherRemark : null}
                      // height={30} style={{ maxWidth: 200, marginRight: 5 }}
                      className={classes.formLabel}
                      disabled></Form.Control>
                  </div>
                </div>
              )}
            </Row>
            {/* { landScheduleData?.encumburance === "patta/lease" &&
              <div className="row ml-3 mb-3">
              <div className="col col-4 m-0 p-0">
                <label htmlFor="npnl">
                  <h6>Patta/Lease Remarks</h6>
                </label>
                <Form.Control placeholder={landScheduleData !== null ? landScheduleData?.anyOtherRemark : null} height={30} style={{ maxWidth: 200, marginRight: 5 }} disabled></Form.Control>
                     </div>
            </div>
            }
             { landScheduleData?.encumburance === "gair/marusi" &&
              <div className="row ml-3 mb-3">
              <div className="col col-4 m-0 p-0">
                <label htmlFor="npnl">
                  <h6>Gair/Marusi Remarks</h6>
                </label>
                <Form.Control placeholder={landScheduleData !== null ? landScheduleData?.anyOtherRemark : null} height={30} style={{ maxWidth: 200, marginRight: 5 }} disabled></Form.Control>
                     </div>
            </div>
            }
             { landScheduleData?.encumburance === "anyOther" &&
              <div className="row ml-3 mb-3">
              <div className="col col-4 m-0 p-0">
                <label htmlFor="npnl">
                  <h6>Any other Remarks</h6>
                </label>
                <Form.Control placeholder={landScheduleData !== null ? landScheduleData?.anyOtherRemark : null} height={30} style={{ maxWidth: 200, marginRight: 5 }} disabled></Form.Control>
                     </div>
            </div>
            }
            { landScheduleData?.encumburance === "none" &&
              <div className="row ml-3 mb-3">
              <div className="col col-4 m-0 p-0">
                <label htmlFor="npnl">
                  <h6>None Remarks</h6>
                </label>
                <Form.Control placeholder={landScheduleData !== null ? landScheduleData?.anyOtherRemark : null} height={30} style={{ maxWidth: 200, marginRight: 5 }} disabled></Form.Control>
                     </div>
            </div>
            } */}
            <hr className="mb-3" />
            <Row className={classes.formLabel}>
              <h6 >
                (ii) Existing litigation, if any, concerning applied land including co-sharers and collaborator.
              </h6>
              <div className="d-flex mt-2">
                <input type="radio" disabled value="Yes" checked={landScheduleData?.litigation === "Y" ? true : false} />
                <label className="m-0  mx-2" for="Yes">Yes</label>&nbsp;&nbsp;
                <input type="radio" disabled value="No" checked={landScheduleData?.litigation === "N" ? true : false} />
                <label className="m-0 mx-2" for="No">No</label>
                <ReportProblemIcon
                  style={{
                    display: hideRemarks ? "none" : "block",
                    color: fieldIconColors.existinglitigation
                  }}
                  onClick={() => {
                    setLabelValue("Existing litigation, if any, concerning applied land including co-sharers and collaborator"),
                      setOpennedModal("existinglitigation")
                    setSmShow(true),
                      console.log("modal open"),
                      setFieldValue(landScheduleData?.litigation === "Y" ? "Yes" : landScheduleData?.litigation === "N" ? "No" : null);
                  }}
                ></ReportProblemIcon>
              </div>
            </Row>

            

            <Row className={classes.formLabel}>
              <Col md={4} xxl lg="12">
                {
                  landScheduleData?.litigation === "Y" && (
                      
                    <div >
                      <hr className="mb-3" />
                      <h6 > Court orders, if any, affecting applied land   </h6>

                      <input type="radio" disabled value="Yes" checked={landScheduleData?.court === "Y" ? true : false} />
                      <label className="m-0  mx-2" for="Yes">Yes</label>&nbsp;&nbsp;
                      <input type="radio" disabled value="No" checked={landScheduleData?.court === "N" ? true : false} />
                      <label className="m-0 mx-2" for="No">No</label>
                      <ReportProblemIcon
                        style={{
                          display: hideRemarks ? "none" : "block",
                          color: fieldIconColors.courtOrders
                        }}
                        onClick={() => {
                          setLabelValue("Court orders, if any, affecting applied land"),
                            setOpennedModal("courtOrders")
                          setSmShow(true),
                            console.log("modal open"),
                            setFieldValue(landScheduleData?.court === "Y" ? "Yes" : landScheduleData?.court === "N" ? "No" : null);
                        }}
                      ></ReportProblemIcon>
                    </div>
                  )}
              </Col>
            </Row>


            <Row className={classes.formLabel}>

              {
                landScheduleData?.court === "Y" && (
                  <div className="row" >
                    <Col className="ms-auto" md={4} xxl lg="4">
                      <label>

                        <h5>Remark/Case No.</h5>
                      </label>
                      <Form.Control
                        placeholder={landScheduleData !== null ? landScheduleData?.courtyCaseNo : null}

                        className={classes.formLabel}
                        disabled>
                      </Form.Control>
                    </Col>
                    <Col className="ms-auto" md={4} xxl lg="4">
                      <h6>Download Document</h6>
                      <IconButton onClick={() => getDocShareholding(landScheduleData?.courtDoc)}>
                        <DownloadForOfflineIcon color="primary" className="mx-1" />
                      </IconButton>

                    </Col>
                    <Col className="ms-auto" md={4} xxl lg="4">

                    </Col>
                  </div>

                )}

            </Row>


            <hr className="mb-3" />

            <Row className={classes.formLabel}>
              <Col md={4} xxl lg="12">
                <h6 >
                  (iii) Any insolvency/liquidation proceedings against the Land Owing Company/Develping Company :
                </h6>
                <div className="d-flex mt-2">

                  <input type="radio" disabled value="Yes" checked={landScheduleData?.insolvency === "Y" ? true : false} />
                  <label className="m-0  mx-2" for="Yes">Yes</label>&nbsp;&nbsp;
                  <input type="radio" disabled value="No" checked={landScheduleData?.insolvency === "N" ? true : false} />
                  <label className="m-0 mx-2" for="No">No</label>
                  <ReportProblemIcon
                    style={{
                      display: hideRemarks ? "none" : "block",
                      color: fieldIconColors.anyInsolvency
                    }}
                    onClick={() => {
                      setLabelValue("Any insolvency/liquidation proceedings against the land owner(s)/ collaborating developed"),
                        setOpennedModal("anyInsolvency")
                      setSmShow(true),
                        console.log("modal open"),
                        setFieldValue(landScheduleData !== null ? landScheduleData?.typeLand : null);
                    }}
                  ></ReportProblemIcon>
                </div>
              </Col>
            </Row>

            <Row className={classes.formLabel}>
              {
                landScheduleData?.insolvency === "Y" && (
                  <div className="row" >
                    <Col className="ms-auto" md={4} xxl lg="4">
                      <label>

                        <h5>Remark</h5>
                      </label>
                      <Form.Control
                        placeholder={landScheduleData !== null ? landScheduleData?.insolvencyRemark : null}

                        className={classes.formLabel}
                        disabled></Form.Control>

                    </Col>
                    <Col className="ms-auto" md={4} xxl lg="4">

                      <h6>Download Document</h6>
                      {/* &nbsp;&nbsp; */}

                      <IconButton onClick={() => getDocShareholding(landScheduleData?.insolvencyDoc)}>
                        <DownloadForOfflineIcon color="primary" className="mx-1" />
                      </IconButton>
                    </Col>
                    <Col className="ms-auto" md={4} xxl lg="4">

                    </Col>
                  </div>

                )}

            </Row>

            <hr className="mb-3" />
            {/* <Row className={classes.formLabel}></Row> */}
            <h5 className="text-black ml-2 mb-2">3.Shajra Plan</h5>
            <div className="row mx-1">
              <div className="col col-4 p-1">
                <h6>
                  (a) As per applied land

                  <div className="d-flex flex-row align-items-center my-1 ">
                    &nbsp;
                    <input type="radio" disabled value="Yes" checked={landScheduleData?.appliedLand === "Y" ? true : false} />
                    <label className="m-0  mx-2" for="Yes">Yes</label>&nbsp;&nbsp;
                    <input type="radio" disabled value="No" checked={landScheduleData?.appliedLand === "N" ? true : false} />
                    <label className="m-0 mx-2" for="No">No</label>
                    <ReportProblemIcon
                      style={{
                        display: hideRemarks ? "none" : "block",
                        color: fieldIconColors.asPerAppliedLand
                      }}
                      onClick={() => {
                        setLabelValue("As per applied land"),
                          setOpennedModal("asPerAppliedLand")
                        setSmShow(true),
                          console.log("modal open"),
                          setFieldValue(landScheduleData?.appliedLand === "Y" ? "Yes" : landScheduleData?.appliedLand === "N" ? "NO" : null);
                      }}
                    ></ReportProblemIcon>
                  </div>
                </h6>

                {
                  landScheduleData?.appliedLand === "N" &&
                  <div className="row ml-1 mr-2">
                    <div className="col  p-1" >
                      <h6>Download Document</h6>

                      <div className="d-flex flex-row align-items-center my-1 ">
                        <IconButton onClick={() => getDocShareholding(landScheduleData?.appliedLand)}>
                          <DownloadForOfflineIcon color="primary" className="mx-1" />
                        </IconButton>
                      </div>
                    </div>
                  </div>

                }

              </div>

              <div className="col col-4 p-1">
                <h6 data-toggle="tooltip" data-placement="top" title="If any revenue rasta abuts to the applied site ?">
                  (b) Revenue rasta
                </h6>
                <div className="d-flex flex-row align-items-center my-1 ">
                  <input type="radio" disabled value="Yes" checked={landScheduleData?.revenueRasta === "Y" ? true : false} />
                  <label className="m-0  mx-2" for="Yes">Yes</label>&nbsp;&nbsp;
                  <input type="radio" disabled value="No" checked={landScheduleData?.revenueRasta === "N" ? true : false} />
                  <label className="m-0 mx-2" for="No">No</label>
                  <ReportProblemIcon
                    style={{
                      display: hideRemarks ? "none" : "block",
                      color: fieldIconColors.revenueRasta
                    }}
                    onClick={() => {
                      setLabelValue("Revenue rasta"),
                        setOpennedModal("revenueRasta")
                      setSmShow(true),
                        console.log("modal open"),
                        setFieldValue(landScheduleData?.revenueRasta === "Y" ? "Yes" : landScheduleData?.revenueRasta === "N" ? "No" : null);
                    }}
                  ></ReportProblemIcon>
                </div>
                {landScheduleData?.revenueRasta === "Y" && (
                  <div className="row ml-1 mr-2">
                    <div className="col col p-1">
                      <label> Width of revenue rasta </label>
                      <Form.Control placeholder={landScheduleData?.revenueRastaWidth}
                        //  height={30} style={{ maxWidth: 200, marginRight: 5 }}
                        className={classes.formLabel}
                        disabled></Form.Control>

                    </div>
                  </div>
                )}
              </div>

              <div className="col col-4 p-1">
                <h6 data-toggle="tooltip" data-placement="top" title="Watercourse running along boundary through the applied site ?">
                  (c) Watercourse
                </h6>

                <div className="d-flex flex-row align-items-center my-1 ">

                  <input type="radio" disabled value="Yes" checked={landScheduleData?.waterCourse === "Y" ? true : false} />
                  <label className="m-0  mx-2" for="Yes">Yes</label>&nbsp;&nbsp;
                  <input type="radio" disabled value="No" checked={landScheduleData?.waterCourse === "N" ? true : false} />
                  <label className="m-0 mx-2" for="No">No</label>
                  <ReportProblemIcon
                    style={{
                      display: hideRemarks ? "none" : "block",
                      color: fieldIconColors.waterCourseRunning
                    }}
                    onClick={() => {
                      setLabelValue("Watercourse running"),
                        setOpennedModal("waterCourseRunning")
                      setSmShow(true),
                        console.log("modal open"),
                        setFieldValue(landScheduleData?.waterCourse === "Y" ? "Yes" : landScheduleData?.waterCourse === "N" ? "No" : null);
                    }}
                  ></ReportProblemIcon>
                </div>


                {landScheduleData?.waterCourse === "Y" && (
                  <div className="row ml-1 mr-2">
                    <div className="col col p-1">
                      <label> Remark </label>
                      <input type="number" className="form-control" disabled placeholder={landScheduleData?.waterCourseRemark} />
                    </div>
                  </div>
                )}
              </div>
              <div className="col col-4 p-1">
                <h6>
                  (d)&nbsp;Whether in Compact Block
                </h6>
                <div className="d-flex flex-row align-items-center my-1 ">

                  <input type="radio" disabled value="Yes" checked={landScheduleData?.compactBlock === "Y" ? true : false} />
                  <label className="m-0  mx-2" for="Yes">Yes</label>&nbsp;&nbsp;
                  <input type="radio" disabled value="No" checked={landScheduleData?.compactBlock === "N" ? true : false} />
                  <label className="m-0 mx-2" for="No">No</label>
                  <ReportProblemIcon
                    style={{
                      display: hideRemarks ? "none" : "block",
                      color: fieldIconColors.whetherInCompactBlock
                    }}
                    onClick={() => {
                      setLabelValue("Whether in Compact Block"),
                        setOpennedModal("whetherInCompactBlock")
                      setSmShow(true),
                        console.log("modal open"),
                        setFieldValue(landScheduleData?.compactBlock === "Y" ? "Yes" : landScheduleData?.compactBlock === "N" ? "No" : null);
                    }}
                  ></ReportProblemIcon>
                </div>


                {landScheduleData?.compactBlock === "Y" && (
                  <div className="row ml-1 mr-2">
                    <div className="col col p-1">
                      <label> Remark </label>

                      <Form.Control placeholder={landScheduleData?.compactBlockRemark}
                        // height={30} style={{ maxWidth: 200, marginRight: 5 }} 
                        className={classes.formLabel}
                        disabled></Form.Control>
                    </div>
                  </div>
                )}


              </div>

              {/* <br></br> */}

              <div className="col col-4 p-1">
                <h6 data-toggle="tooltip" data-placement="top" title="If any other owners' land is sandwiched within applied land.">
                  (e) Whether Others Land fall within Applied Land
                </h6>
                <div className="d-flex flex-row align-items-center my-1 ">
                  <input type="radio" disabled value="Yes" checked={landScheduleData?.landSandwiched === "Y" ? true : false} />
                  <label className="m-0  mx-2" for="Yes">Yes</label>&nbsp;&nbsp;
                  <input type="radio" disabled value="No" checked={landScheduleData?.landSandwiched === "N" ? true : false} />
                  <label className="m-0 mx-2" for="No">No</label>
                  <ReportProblemIcon
                    style={{
                      display: hideRemarks ? "none" : "block",
                      color: fieldIconColors.landSandwiche
                    }}
                    onClick={() => {
                      setLabelValue("Land Sandwiched"),
                        setOpennedModal("landSandwiche")
                      setSmShow(true),
                        console.log("modal open"),
                        setFieldValue(landScheduleData?.landSandwiched === "Y" ? "Yes" : landScheduleData?.landSandwiched === "N" ? "No" : null);
                    }}
                  ></ReportProblemIcon>
                </div>

                {landScheduleData?.landSandwiched === "Y" && (
                  <div className="row ml-1 mr-2">
                    <div className="col col p-1">
                      <label> Remark </label>

                      <Form.Control placeholder={landScheduleData?.landSandwichedRemark}
                        // height={30} style={{ maxWidth: 200, marginRight: 5 }} 
                        className={classes.formLabel}
                        disabled></Form.Control>
                    </div>
                  </div>
                )}

              </div>
              <div className="col col-4 p-1">
                <h6>
                  (f) Acquisition status
                </h6>
                <div className="d-flex flex-row align-items-center my-1 ">
                  <input type="radio" disabled value="Yes" checked={landScheduleData?.acquistion === "Y" ? true : false} />
                  <label className="m-0  mx-2" for="Yes">Yes</label>&nbsp;&nbsp;
                  <input type="radio" disabled value="No" checked={landScheduleData?.acquistion === "N" ? true : false} />
                  <label className="m-0 mx-2" for="No">No</label>
                  <ReportProblemIcon
                    style={{
                      display: hideRemarks ? "none" : "block",
                      color: fieldIconColors.acquisitionStatus
                    }}
                    onClick={() => {
                      setLabelValue("Acquisition status"),
                        setOpennedModal("acquisitionStatus")
                      setSmShow(true),
                        console.log("modal open"),
                        setFieldValue(landScheduleData?.acquistion === "Y" ? "Yes" : landScheduleData?.acquistion === "N" ? "No" : null);
                    }}
                  ></ReportProblemIcon>
                </div>
                {landScheduleData?.acquistion === "Y" && (
                <div >
                <div className="row mx-1">
                  <div className="col col-12">
                    <div>
                      <label className="m-0">Date of section 4 notification </label>
                      <div className="d-flex flex-row align-items-center my-1 ">
                        <Form.Control
                          // height={30} style={{ maxWidth: 200, marginRight: 5 }}
                          className={classes.formLabel}
                          disabled placeholder={landScheduleData?.sectionFour} ></Form.Control>
                        <ReportProblemIcon
                          style={{
                            display: hideRemarks ? "none" : "block",
                            color: fieldIconColors.dateOfSection4Notification
                          }}
                          onClick={() => {
                            setLabelValue("Date of section 4 notification"),
                              setOpennedModal("dateOfSection4Notification")
                            setSmShow(true),
                              console.log("modal open"),
                              setFieldValue(landScheduleData !== null ? landScheduleData?.sectionFour : null);
                          }}
                        ></ReportProblemIcon>
                      </div>

                    </div>
                  </div>
                  </div>
                  <div className="row mx-1">
                  <div className="col col-12">
                    <div>
                      <label className="m-0">Date of section 6 notification</label>
                      <div className="d-flex flex-row align-items-center my-1 ">
                        <Form.Control
                          // height={30} style={{ maxWidth: 200, marginRight: 5 }} 
                          className={classes.formLabel}
                          disabled placeholder={landScheduleData?.sectionSix} ></Form.Control>
                        <ReportProblemIcon
                          style={{
                            display: hideRemarks ? "none" : "block",
                            color: fieldIconColors.dateOfSection6Notification
                          }}
                          onClick={() => {
                            setLabelValue("Date of section 6 notification"),
                              setOpennedModal("dateOfSection6Notification")
                            setSmShow(true),
                              console.log("modal open"),
                              setFieldValue(landScheduleData !== null ? landScheduleData?.sectionSix : null);
                          }}
                        ></ReportProblemIcon>
                      </div>
                      {/* <Form.Control style={{ maxWidth: 200, marginTop: 10 }} disabled></Form.Control> */}
                    </div>
                  </div>
                  </div>
                  </div>
              )}

              </div>
             

            </div>

            {landScheduleData?.acquistion === "Y" && (
              <div >
                <div className="row mx-1">
                  <div className="col col-12 p-1">
                    <h6 data-toggle="tooltip" data-placement="top" title="Whether details/orders of release/exclusion of land uploaded.">
                      (g)  Whether Land Released/Excluded from aqusition proceeding.
                    </h6>
                    {/* <InfoIcon style={{color:"blue"}}/>  */}
                    <div className="d-flex flex-row align-items-center my-1 ">

                      <input type="radio" disabled value="Yes" checked={landScheduleData?.orderUpload === "Y" ? true : false} />
                      <label className="m-0  mx-2" for="Yes">Yes</label>&nbsp;&nbsp;
                      <input type="radio" disabled value="No" checked={landScheduleData?.orderUpload === "N" ? true : false} />
                      <label className="m-0 mx-2" for="No">No</label>
                      <ReportProblemIcon
                        style={{
                          display: hideRemarks ? "none" : "block",
                          color: fieldIconColors.ordersUpload
                        }}
                        onClick={() => {
                          setLabelValue("Orders Upload"),
                            setOpennedModal("ordersUpload")
                          setSmShow(true),
                            console.log("modal open"),
                            setFieldValue(landScheduleData?.orderUpload === "Y" ? "Yes" : landScheduleData?.orderUpload === "N" ? "No" : null);
                        }}
                      ></ReportProblemIcon>
                    </div>

<br></br>

                    {landScheduleData?.orderUpload === "Y" && (
                      <div className="row m-0 mt-2">
                        <div className="col col-4 p-1">
                          <h6 data-toggle="tooltip" data-placement="top" title="Whether details/orders of release/exclusion of land uploaded.">
                            Whether land compensation
                          </h6>
                          {/* <InfoIcon style={{color:"blue"}}/>  */}
                          <div className="d-flex flex-row align-items-center my-1 ">
                            {/* <Form.Control height={30} style={{ maxWidth: 200, marginRight: 5 }} disabled></Form.Control> */}
                            <input type="radio" disabled value="Yes" checked={landScheduleData?.landCompensation === "Y" ? true : false} />
                            <label className="m-0  mx-2" for="Yes">Yes</label>&nbsp;&nbsp;
                            <input type="radio" disabled value="No" checked={landScheduleData?.landCompensation === "N" ? true : false} />
                            <label className="m-0 mx-2" for="No">No</label>

                            <ReportProblemIcon
                              style={{
                                display: hideRemarks ? "none" : "block",
                                color: fieldIconColors.landCompensationReceived
                              }}
                              onClick={() => {
                                setLabelValue("Whether land compensation received"),
                                  setOpennedModal("landCompensationReceived")
                                setSmShow(true),
                                  console.log("modal open"),
                                  setFieldValue(landScheduleData?.compensationReceived === "Y" ? "Yes" : landScheduleData?.compensationReceived === "N" ? "No" : null);
                              }}
                            ></ReportProblemIcon>

                          </div>

                        </div>
                        <div className="col col-4 p-1">
                          <div className="form-group">
                            <label htmlFor="releasestatus">
                              <h6 style={{ fontWeight: "initial" }} data-toggle="tooltip" data-placement="top" title="Status of release" >Status of release</h6>
                            </label>

                            <div className="d-flex flex-row align-items-center my-1 ">
                              <Form.Control
                                className={classes.formLabel}
                                disabled
                                placeholder={landScheduleData?.releaseStatus}
                              ></Form.Control>

                              <ReportProblemIcon
                                style={{
                                  display: hideRemarks ? "none" : "block",
                                  color: fieldIconColors.statusOfRelease
                                }}
                                onClick={() => {
                                  setLabelValue("Status of release"),
                                    setOpennedModal("statusOfRelease")
                                  setSmShow(true),
                                    console.log("modal open"),
                                    setFieldValue(landScheduleData?.statusOfRelease);
                                }}
                              ></ReportProblemIcon>

                            </div>
                          </div>
                        </div>
                        <div className="col col-4 p-1">
                          <div className="form-group ">
                            <label htmlFor="awarddate">
                              <h6 style={{ fontWeight: "initial" }} data-toggle="tooltip" data-placement="top" title="Date of Award">Date of Award</h6>
                            </label>
                            <div className="d-flex flex-row align-items-center my-1 ">
                              <Form.Control

                                className={classes.formLabel}
                                disabled placeholder={landScheduleData?.awardDate}></Form.Control>
                              <ReportProblemIcon
                                style={{
                                  display: hideRemarks ? "none" : "block",
                                  color: fieldIconColors.dateOfAward
                                }}
                                onClick={() => {
                                  setLabelValue("Date of Award"),
                                    setOpennedModal("dateOfAward")
                                  setSmShow(true),
                                    console.log("modal open"),
                                    setFieldValue(landScheduleData?.dateOfAward);
                                }}
                              ></ReportProblemIcon>
                            </div>
                            {/* comment by me */}
                          </div>
                        </div>
                        <div className="col col-4 p-1">
                          <div className="form-group ">
                            <label htmlFor="releasedate">
                              <h6 style={{ fontWeight: "initial" }} data-toggle="tooltip" data-placement="top" title="Date of Release">Date of Release</h6>{" "}
                            </label>

                            <div className="d-flex flex-row align-items-center my-1 ">
                              <Form.Control
                                // height={30} style={{ maxWidth: 200, marginRight: 5 }} 
                                className={classes.formLabel}
                                disabled placeholder={landScheduleData?.releaseDate}></Form.Control>
                              <ReportProblemIcon
                                style={{
                                  display: hideRemarks ? "none" : "block",
                                  color: fieldIconColors.dateOfRelease
                                }}
                                onClick={() => {
                                  setLabelValue("Date of Release"),
                                    setOpennedModal("dateOfRelease")
                                  setSmShow(true),
                                    console.log("modal open"),
                                    setFieldValue(landScheduleData?.dateOfRelease);
                                }}
                              ></ReportProblemIcon>
                            </div>
                          </div>
                        </div>
                        <div className="col col-4 p-1">
                          <div className="form-group ">
                            <label htmlFor="sitedetails">
                              <h6 style={{ fontWeight: "initial" }} data-toggle="tooltip" data-placement="top" title="Site Details">Site Details</h6>
                            </label>
                            <div className="d-flex flex-row align-items-center my-1 ">
                              <Form.Control
                                // height={30} style={{ maxWidth: 200, marginRight: 5 }} 
                                className={classes.formLabel}
                                disabled placeholder={landScheduleData?.siteDetail}></Form.Control>
                              <ReportProblemIcon
                                style={{
                                  display: hideRemarks ? "none" : "block",
                                  color: fieldIconColors.siteDetails
                                }}
                                onClick={() => {
                                  setLabelValue("Site Details"),
                                    setOpennedModal("siteDetails")
                                  setSmShow(true),
                                    console.log("modal open"),
                                    setFieldValue(landScheduleData?.siteDetails);
                                }}
                              ></ReportProblemIcon>
                            </div>


                            {/* comment by me */}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            <div className="row mx-1">
              <div className="col col-12 p-1">
                <h6
                // data-toggle="tooltip" data-placement="top" title="Whether details/orders of release/exclusion of land uploaded."
                >
                  (h)  Details of existing approach as per policy dated 20-10-20.
                </h6>
                <div className="d-flex flex-row align-items-center my-1 ">
                  <input type="radio" disabled value="Yes" checked={landScheduleData?.siteApproachable === "Y" ? true : false} />
                  <label className="m-0  mx-2" for="Yes">Category-I approach</label>&nbsp;&nbsp;
                  <input type="radio" disabled value="No" checked={landScheduleData?.siteApproachable === "N" ? true : false} />
                  <label className="m-0 mx-2" for="No">Category-II approach</label>
                  <ReportProblemIcon
                    style={{
                      display: hideRemarks ? "none" : "block",
                      color: fieldIconColors.ordersUpload
                    }}
                    onClick={() => {
                      setLabelValue("Orders Upload"),
                        setOpennedModal("ordersUpload")
                      setSmShow(true),
                        console.log("modal open"),
                        setFieldValue(landScheduleData?.orderUpload === "Y" ? "Yes" : landScheduleData?.orderUpload === "N" ? "No" : null);
                    }}
                  ></ReportProblemIcon>
                </div>
                {landScheduleData?.siteApproachable === "Y" && (
                  <div className="my-2 mx-2">
                    <h6>(a)  Approach available from minimum 4 karam (22 ft) wide revenue rasta</h6>
                    <div className="d-flex flex-row align-items-center my-1 ">
                      &nbsp;&nbsp;
                      <input type="radio" disabled value="Yes" checked={landScheduleData?.minimumApproachFour === "Y" ? true : false} />
                      <label className="m-0  mx-2" for="Yes">Yes</label>&nbsp;&nbsp;
                      <input type="radio" disabled value="No" checked={landScheduleData?.minimumApproachFour === "N" ? true : false} />
                      <label className="m-0 mx-2" for="No">No</label>
                      <ReportProblemIcon
                        style={{
                          display: hideRemarks ? "none" : "block",
                          color: fieldIconColors.ordersUpload
                        }}
                        onClick={() => {
                          setLabelValue("Orders Upload"),
                            setOpennedModal("ordersUpload")
                          setSmShow(true),
                            console.log("modal open"),
                            setFieldValue(landScheduleData?.orderUpload === "Y" ? "Yes" : landScheduleData?.orderUpload === "N" ? "No" : null);
                        }}
                      ></ReportProblemIcon>
                    </div>

                    <h6>(b)  Approach available from minimum 11 feet wide revenue rasta and applied site abuts acquired alignment of the sector road and there is no stay regarding construction on the land falling under the abutting sector road</h6>
                    <div className="d-flex flex-row align-items-center my-1 ">
                      &nbsp;&nbsp;
                      <input type="radio" disabled value="Yes" checked={landScheduleData?.minimumApproachEleven === "Y" ? true : false} />
                      <label className="m-0  mx-2" for="Yes">Yes</label>&nbsp;&nbsp;
                      <input type="radio" disabled value="No" checked={landScheduleData?.minimumApproachEleven === "N" ? true : false} />
                      <label className="m-0 mx-2" for="No">No</label>
                      <ReportProblemIcon
                        style={{
                          display: hideRemarks ? "none" : "block",
                          color: fieldIconColors.ordersUpload
                        }}
                        onClick={() => {
                          setLabelValue("Orders Upload"),
                            setOpennedModal("ordersUpload")
                          setSmShow(true),
                            console.log("modal open"),
                            setFieldValue(landScheduleData?.orderUpload === "Y" ? "Yes" : landScheduleData?.orderUpload === "N" ? "No" : null);
                        }}
                      ></ReportProblemIcon>
                    </div>

                    <h6>(c)  Applied site abouts already constructed sector road or internal circulation road of approved sectoral plan (of min. 18m/24m width as the case may be) provided its entire stretch required for approach is licenced and is further leading upto atleast 4 karam wide revenue rasta.</h6>
                    <div className="d-flex flex-row align-items-center my-1 ">
                      &nbsp;&nbsp;
                      <input type="radio" disabled value="Yes" checked={landScheduleData?.alreadyConstructedSector === "Y" ? true : false} />
                      <label className="m-0  mx-2" for="Yes">Yes</label>&nbsp;&nbsp;
                      <input type="radio" disabled value="No" checked={landScheduleData?.alreadyConstructedSector === "N" ? true : false} />
                      <label className="m-0 mx-2" for="No">No</label>
                      <ReportProblemIcon
                        style={{
                          display: hideRemarks ? "none" : "block",
                          color: fieldIconColors.ordersUpload
                        }}
                        onClick={() => {
                          setLabelValue("Orders Upload"),
                            setOpennedModal("ordersUpload")
                          setSmShow(true),
                            console.log("modal open"),
                            setFieldValue(landScheduleData?.orderUpload === "Y" ? "Yes" : landScheduleData?.orderUpload === "N" ? "No" : null);
                        }}
                      ></ReportProblemIcon>
                    </div>

                    <h6>(d)  Applied land is accessible from a minimum 4 karam wide rasta through adjoining own land of the applicant (but not applied for licence).</h6>
                    <div className="d-flex flex-row align-items-center my-1 ">
                      &nbsp;&nbsp;
                      <input type="radio" disabled value="Yes" checked={landScheduleData?.adjoiningOwnLand === "Y" ? true : false} />
                      <label className="m-0  mx-2" for="Yes">Yes</label>&nbsp;&nbsp;
                      <input type="radio" disabled value="No" checked={landScheduleData?.adjoiningOwnLand === "N" ? true : false} />
                      <label className="m-0 mx-2" for="No">No</label>
                      <ReportProblemIcon
                        style={{
                          display: hideRemarks ? "none" : "block",
                          color: fieldIconColors.ordersUpload
                        }}
                        onClick={() => {
                          setLabelValue("Orders Upload"),
                            setOpennedModal("ordersUpload")
                          setSmShow(true),
                            console.log("modal open"),
                            setFieldValue(landScheduleData?.orderUpload === "Y" ? "Yes" : landScheduleData?.orderUpload === "N" ? "No" : null);
                        }}
                      ></ReportProblemIcon>
                    </div>

                    {landScheduleData?.adjoiningOwnLand === "Y" && (
                      <div className="my-2 mx-2">
                        <h6>(d1)  If applicable, whether the applicant has donated at least 4 karam wide strip from its adjoining own land in favour of the Gram Panchayat/Municipality, in order to connect the applied site to existing 4 karam rasta?</h6>
                        <div className="d-flex flex-row align-items-center my-1 ">
                          &nbsp;&nbsp;
                          <input type="radio" disabled value="Yes" checked={landScheduleData?.applicantHasDonated === "Y" ? true : false} />
                          <label className="m-0  mx-2" for="Yes">Yes</label>&nbsp;&nbsp;
                          <input type="radio" disabled value="No" checked={landScheduleData?.applicantHasDonated === "N" ? true : false} />
                          <label className="m-0 mx-2" for="No">NO</label>
                          <ReportProblemIcon
                            style={{
                              display: hideRemarks ? "none" : "block",
                              color: fieldIconColors.ordersUpload
                            }}
                            onClick={() => {
                              setLabelValue("Orders Upload"),
                                setOpennedModal("ordersUpload")
                              setSmShow(true),
                                console.log("modal open"),
                                setFieldValue(landScheduleData?.orderUpload === "Y" ? "Yes" : landScheduleData?.orderUpload === "N" ? "No" : null);
                            }}
                          ></ReportProblemIcon>
                        </div>
                        {landScheduleData?.applicantHasDonated === "Y" && (
                          <div className="col col-3 p-1">

                            <h6>Upload copy of Gift Deed/ Hibbanama</h6>
                            <div className="d-flex flex-row align-items-center my-1 ">
                              &nbsp;&nbsp;
                              <IconButton onClick={() => getDocShareholding(landScheduleData?.giftDeedHibbanama)}>
                                <DownloadForOfflineIcon color="primary" className="mx-1" />
                              </IconButton>
                              <ReportProblemIcon
                                style={{
                                  display: hideRemarks ? "none" : "block",
                                  color: fieldIconColors.copyOfShajraPlan
                                }}
                                onClick={() => {
                                  setLabelValue("Copy of Shajra Plan"),
                                    setOpennedModal("copyOfShajraPlan")
                                  setSmShow(true),
                                    console.log("modal open"),
                                    setFieldValue(landScheduleData !== null ? landScheduleData?.copyOfShajraPlan : null);
                                }}
                              ></ReportProblemIcon>
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    <h6>(e)  Applied land is accessible from a minimum 4 karam wide rasta through adjoining other’s land</h6>
                    <div className="d-flex flex-row align-items-center my-1 ">
                      &nbsp;&nbsp;
                      <input type="radio" disabled value="Yes" checked={landScheduleData?.adjoiningOthersLand === "Y" ? true : false} />
                      <label className="m-0  mx-2" for="Yes">Yes</label>&nbsp;&nbsp;
                      <input type="radio" disabled value="No" checked={landScheduleData?.adjoiningOthersLand === "N" ? true : false} />
                      <label className="m-0 mx-2" for="No">NO</label>
                      <ReportProblemIcon
                        style={{
                          display: hideRemarks ? "none" : "block",
                          color: fieldIconColors.ordersUpload
                        }}
                        onClick={() => {
                          setLabelValue("Orders Upload"),
                            setOpennedModal("ordersUpload")
                          setSmShow(true),
                            console.log("modal open"),
                            setFieldValue(landScheduleData?.orderUpload === "Y" ? "Yes" : landScheduleData?.orderUpload === "N" ? "No" : null);
                        }}
                      ></ReportProblemIcon>
                    </div>
                    {landScheduleData?.adjoiningOthersLand === "Y" && (
                      <div>
                        <h6>(e1)  whether the land-owner of the adjoining land has donated at least 4 karam wide strip of land to the Gram Panchayat/Municipality, in a manner that the applied site gets connected to existing public rasta of atleast 4 karam width?</h6>
                        <div className="d-flex flex-row align-items-center my-1 ">
                          &nbsp;&nbsp;
                          <input type="radio" disabled value="Yes" checked={landScheduleData?.landOwnerDonated === "Y" ? true : false} />
                          <label className="m-0  mx-2" for="Yes">Yes</label>&nbsp;&nbsp;
                          <input type="radio" disabled value="No" checked={landScheduleData?.landOwnerDonated === "N" ? true : false} />
                          <label className="m-0 mx-2" for="No">NO</label>
                          <ReportProblemIcon
                            style={{
                              display: hideRemarks ? "none" : "block",
                              color: fieldIconColors.ordersUpload
                            }}
                            onClick={() => {
                              setLabelValue("Orders Upload"),
                                setOpennedModal("ordersUpload")
                              setSmShow(true),
                                console.log("modal open"),
                                setFieldValue(landScheduleData?.orderUpload === "Y" ? "Yes" : landScheduleData?.orderUpload === "N" ? "No" : null);
                            }}
                          ></ReportProblemIcon>
                        </div>
                      </div>
                    )}
                    {landScheduleData?.landOwnerDonated === "Y" && (
                      <div className="col col-3 p-1">

                        <h6>Upload copy of Gift Deed/ Hibbanama</h6>
                        <div className="d-flex flex-row align-items-center my-1 ">

                          <IconButton onClick={() => getDocShareholding(landScheduleData?.giftDeedHibbanama)}>
                            <DownloadForOfflineIcon color="primary" className="mx-1" />
                          </IconButton>
                          <ReportProblemIcon
                            style={{
                              display: hideRemarks ? "none" : "block",
                              color: fieldIconColors.copyOfShajraPlan
                            }}
                            onClick={() => {
                              setLabelValue("Copy of Shajra Plan"),
                                setOpennedModal("copyOfShajraPlan")
                              setSmShow(true),
                                console.log("modal open"),
                                setFieldValue(landScheduleData !== null ? landScheduleData?.copyOfShajraPlan : null);
                            }}
                          ></ReportProblemIcon>
                        </div>
                      </div>
                    )}

                  </div>
                )}

                {landScheduleData?.siteApproachable === "N" && (

                  <div >
                    <h5 className="text-black  mb-2">(i)  Details of proposed approach.</h5>
                    <div className="my-2 mx-2">
                    <div className="d-flex flex-row align-items-center my-2 ">
                      <h6>(1)   Site approachable from proposed sector road/ Development Plan Road</h6>
                      &nbsp;&nbsp;
                      <input type="radio" disabled value="Yes" checked={landScheduleData?.approachFromProposedSector === "Y" ? true : false} />
                      <label className="m-0  mx-2" for="Yes">Yes</label>&nbsp;&nbsp;
                      <input type="radio" disabled value="No" checked={landScheduleData?.approachFromProposedSector === "N" ? true : false} />
                      <label className="m-0 mx-2" for="No">No</label>
                      <ReportProblemIcon
                        style={{
                          display: hideRemarks ? "none" : "block",
                          color: fieldIconColors.ordersUpload
                        }}
                        onClick={() => {
                          setLabelValue("Orders Upload"),
                            setOpennedModal("ordersUpload")
                          setSmShow(true),
                            console.log("modal open"),
                            setFieldValue(landScheduleData?.orderUpload === "Y" ? "Yes" : landScheduleData?.orderUpload === "N" ? "No" : null);
                        }}
                      ></ReportProblemIcon>
                    </div>

                    {landScheduleData?.approachFromProposedSector === "Y" && (

                      <div >
                        <h6>(a) Width of Constructed ROW of plotted licenced colony (In meters)</h6>
                        <div className="my-2 mx-2">
                        <div className="col col-6 p-1 d-flex align-items-center my-1 " >
                          <Form.Control
                            className={classes.formLabel}

                            disabled
                            placeholder={landScheduleData?.awardDate}
                          ></Form.Control>
                          <ReportProblemIcon
                            style={{
                              display: hideRemarks ? "none" : "block",
                              color: fieldIconColors.ordersUpload
                            }}
                            onClick={() => {
                              setLabelValue("Orders Upload"),
                                setOpennedModal("ordersUpload")
                              setSmShow(true),
                                console.log("modal open"),
                                setFieldValue(landScheduleData?.orderUpload === "Y" ? "Yes" : landScheduleData?.orderUpload === "N" ? "No" : null);
                            }}
                          ></ReportProblemIcon>
                        </div>

                        {/* <div className="col col-6 p-1 d-flex align-items-center my-3 " >

                          <h6>(a)  Width of Constructed ROW of plotted licenced colony (In meters)</h6>
                          <Form.Control
                            className={classes.formLabel}

                            disabled
                            placeholder={landScheduleData?.awardDate}
                          ></Form.Control>
                        
                          <ReportProblemIcon
                            style={{
                              display: hideRemarks ? "none" : "block",
                              color: fieldIconColors.ordersUpload
                            }}
                            onClick={() => {
                              setLabelValue("Orders Upload"),
                                setOpennedModal("ordersUpload")
                              setSmShow(true),
                                console.log("modal open"),
                                setFieldValue(landScheduleData?.orderUpload === "Y" ? "Yes" : landScheduleData?.orderUpload === "N" ? "No" : null);
                            }}
                          ></ReportProblemIcon>
                        </div> */}

                        <div className="d-flex flex-row align-items-center my-3 ">
                          <h6>(b)  Whether acquired?  </h6>
                          &nbsp;&nbsp;
                          <input type="radio" disabled value="Yes" checked={landScheduleData?.whetherAcquired === "Y" ? true : false} />
                          <label className="m-0  mx-2" for="Yes">Yes</label>&nbsp;&nbsp;
                          <input type="radio" disabled value="No" checked={landScheduleData?.whetherAcquired === "N" ? true : false} />
                          <label className="m-0 mx-2" for="No">No</label>
                          <ReportProblemIcon
                            style={{
                              display: hideRemarks ? "none" : "block",
                              color: fieldIconColors.ordersUpload
                            }}
                            onClick={() => {
                              setLabelValue("Orders Upload"),
                                setOpennedModal("ordersUpload")
                              setSmShow(true),
                                console.log("modal open"),
                                setFieldValue(landScheduleData?.orderUpload === "Y" ? "Yes" : landScheduleData?.orderUpload === "N" ? "No" : null);
                            }}
                          ></ReportProblemIcon>
                        </div>

                        <div className="d-flex flex-row align-items-center my-3 ">
                          <h6>(c)  Whether constructed?  </h6>
                          &nbsp;&nbsp;
                          <input type="radio" disabled value="Yes" checked={landScheduleData?.whetherConstructed === "Y" ? true : false} />
                          <label className="m-0  mx-2" for="Yes">Yes</label>&nbsp;&nbsp;
                          <input type="radio" disabled value="No" checked={landScheduleData?.whetherConstructed === "N" ? true : false} />
                          <label className="m-0 mx-2" for="No">No</label>
                          <ReportProblemIcon
                            style={{
                              display: hideRemarks ? "none" : "block",
                              color: fieldIconColors.ordersUpload
                            }}
                            onClick={() => {
                              setLabelValue("Orders Upload"),
                                setOpennedModal("ordersUpload")
                              setSmShow(true),
                                console.log("modal open"),
                                setFieldValue(landScheduleData?.orderUpload === "Y" ? "Yes" : landScheduleData?.orderUpload === "N" ? "No" : null);
                            }}
                          ></ReportProblemIcon>
                        </div>

                        <div className="d-flex flex-row align-items-center my-3 ">
                          <h6>(d)  Whether Service road along sector road acquired?</h6>
                          &nbsp;&nbsp;
                          <input type="radio" disabled value="Yes" checked={landScheduleData?.serviceSectorRoadAcquired === "Y" ? true : false} />
                          <label className="m-0  mx-2" for="Yes">Yes</label>&nbsp;&nbsp;
                          <input type="radio" disabled value="No" checked={landScheduleData?.serviceSectorRoadAcquired === "N" ? true : false} />
                          <label className="m-0 mx-2" for="No">No</label>
                          <ReportProblemIcon
                            style={{
                              display: hideRemarks ? "none" : "block",
                              color: fieldIconColors.ordersUpload
                            }}
                            onClick={() => {
                              setLabelValue("Orders Upload"),
                                setOpennedModal("ordersUpload")
                              setSmShow(true),
                                console.log("modal open"),
                                setFieldValue(landScheduleData?.orderUpload === "Y" ? "Yes" : landScheduleData?.orderUpload === "N" ? "No" : null);
                            }}
                          ></ReportProblemIcon>
                        </div>

                        <div className="d-flex flex-row align-items-center my-3 ">
                          <h6>(e)  Whether Service road along sector road constructed?  </h6>
                          &nbsp;&nbsp;
                          <input type="radio" disabled value="Yes" checked={landScheduleData?.serviceSectorRoadConstructed === "Y" ? true : false} />
                          <label className="m-0  mx-2" for="Yes">Yes</label>&nbsp;&nbsp;
                          <input type="radio" disabled value="No" checked={landScheduleData?.serviceSectorRoadConstructed === "N" ? true : false} />
                          <label className="m-0 mx-2" for="No">No</label>
                          <ReportProblemIcon
                            style={{
                              display: hideRemarks ? "none" : "block",
                              color: fieldIconColors.ordersUpload
                            }}
                            onClick={() => {
                              setLabelValue("Orders Upload"),
                                setOpennedModal("ordersUpload")
                              setSmShow(true),
                                console.log("modal open"),
                                setFieldValue(landScheduleData?.orderUpload === "Y" ? "Yes" : landScheduleData?.orderUpload === "N" ? "No" : null);
                            }}
                          ></ReportProblemIcon>
                        </div>

                      </div>
                      </div>

                    )}
                    <h6>(2)  Site approachable from internal circulation / sectoral plan road.</h6>
                    <div className="d-flex flex-row align-items-center my-2 ">
                      &nbsp;&nbsp;
                      <input type="radio" disabled value="Yes" checked={landScheduleData?.approachFromInternalCirculation === "Y" ? true : false} />
                      <label className="m-0  mx-2" for="Yes">Yes</label>&nbsp;&nbsp;
                      <input type="radio" disabled value="No" checked={landScheduleData?.approachFromInternalCirculation === "N" ? true : false} />
                      <label className="m-0 mx-2" for="No">No</label>
                      <ReportProblemIcon
                        style={{
                          display: hideRemarks ? "none" : "block",
                          color: fieldIconColors.ordersUpload
                        }}
                        onClick={() => {
                          setLabelValue("Orders Upload"),
                            setOpennedModal("ordersUpload")
                          setSmShow(true),
                            console.log("modal open"),
                            setFieldValue(landScheduleData?.orderUpload === "Y" ? "Yes" : landScheduleData?.orderUpload === "N" ? "No" : null);
                        }}
                      ></ReportProblemIcon>
                    </div>
                    {landScheduleData?.approachFromInternalCirculation === "Y" && (

                      <div>
                        <h6>(a)  Width of internal circulation / sectoral plan road (In meters)</h6>
                        <div className="my-2 mx-2">
                        <div className="col col-6 p-1 d-flex align-items-center my-1 " >
                          <Form.Control
                            className={classes.formLabel}

                            disabled
                            placeholder={landScheduleData?.sectorAndDevelopmentWidth}
                          ></Form.Control>
                          <ReportProblemIcon
                            style={{
                              display: hideRemarks ? "none" : "block",
                              color: fieldIconColors.ordersUpload
                            }}
                            onClick={() => {
                              setLabelValue("Orders Upload"),
                                setOpennedModal("ordersUpload")
                              setSmShow(true),
                                console.log("modal open"),
                                setFieldValue(landScheduleData?.orderUpload === "Y" ? "Yes" : landScheduleData?.orderUpload === "N" ? "No" : null);
                            }}
                          ></ReportProblemIcon>
                        </div>
                        <h6>(b)  Whether acquired? </h6>
                        <div className="d-flex flex-row align-items-center my-1 ">
                          <input type="radio" disabled value="Yes" checked={landScheduleData?.sectorAndDevelopmentWidth === "Y" ? true : false} />
                          <label className="m-0  mx-2" for="Yes">Yes</label>&nbsp;&nbsp;
                          <input type="radio" disabled value="No" checked={landScheduleData?.sectorAndDevelopmentWidth === "N" ? true : false} />
                          <label className="m-0 mx-2" for="No">No</label>
                          <ReportProblemIcon
                            style={{
                              display: hideRemarks ? "none" : "block",
                              color: fieldIconColors.ordersUpload
                            }}
                            onClick={() => {
                              setLabelValue("Orders Upload"),
                                setOpennedModal("ordersUpload")
                              setSmShow(true),
                                console.log("modal open"),
                                setFieldValue(landScheduleData?.orderUpload === "Y" ? "Yes" : landScheduleData?.orderUpload === "N" ? "No" : null);
                            }}
                          ></ReportProblemIcon>
                        </div>
                        <h6>(c)  Whether constructed?  </h6>
                        <div className="d-flex flex-row align-items-center my-1 ">
                          <input type="radio" disabled value="Yes" checked={landScheduleData?.sectorAndDevelopmentWidth === "Y" ? true : false} />
                          <label className="m-0  mx-2" for="Yes">Yes</label>&nbsp;&nbsp;
                          <input type="radio" disabled value="No" checked={landScheduleData?.sectorAndDevelopmentWidth === "N" ? true : false} />
                          <label className="m-0 mx-2" for="No">No</label>
                          <ReportProblemIcon
                            style={{
                              display: hideRemarks ? "none" : "block",
                              color: fieldIconColors.ordersUpload
                            }}
                            onClick={() => {
                              setLabelValue("Orders Upload"),
                                setOpennedModal("ordersUpload")
                              setSmShow(true),
                                console.log("modal open"),
                                setFieldValue(landScheduleData?.orderUpload === "Y" ? "Yes" : landScheduleData?.orderUpload === "N" ? "No" : null);
                            }}
                          ></ReportProblemIcon>
                        </div>

                      </div>
                      </div>

                    )}
                  </div>
                  </div>

                )}

                {landScheduleData?.orderUpload === "Y" && (
                  <div className="row m-0 mt-2">
                    <div className="col col-4 p-1">
                      <h6 data-toggle="tooltip" data-placement="top" title="Whether details/orders of release/exclusion of land uploaded.">
                        (h) Whether land compensation received
                        {/* <InfoIcon style={{color:"blue"}}/>  */}
                        <div className="d-flex flex-row align-items-center my-1 ">
                          {/* <Form.Control height={30} style={{ maxWidth: 200, marginRight: 5 }} disabled></Form.Control> */}
                          <input type="radio" disabled value="Yes" checked={landScheduleData?.landCompensation === "Y" ? true : false} />
                          <label className="m-0  mx-2" for="Yes">Yes</label>&nbsp;&nbsp;
                          <input type="radio" disabled value="No" checked={landScheduleData?.landCompensation === "N" ? true : false} />
                          <label className="m-0 mx-2" for="No">No</label>

                          <ReportProblemIcon
                            style={{
                              display: hideRemarks ? "none" : "block",
                              color: fieldIconColors.landCompensationReceived
                            }}
                            onClick={() => {
                              setLabelValue("Whether land compensation received"),
                                setOpennedModal("landCompensationReceived")
                              setSmShow(true),
                                console.log("modal open"),
                                setFieldValue(landScheduleData?.compensationReceived === "Y" ? "Yes" : landScheduleData?.compensationReceived === "N" ? "No" : null);
                            }}
                          ></ReportProblemIcon>

                        </div>
                      </h6>
                    </div>
                    <div className="col col-4 p-1">
                      <div className="form-group">
                        <label htmlFor="releasestatus">
                          <h6 style={{ fontWeight: "initial" }} data-toggle="tooltip" data-placement="top" title="Status of release">Status of release</h6>
                        </label>

                        <div className="d-flex flex-row align-items-center my-1 ">
                          <Form.Control
                            //  height={30} style={{ maxWidth: 200, marginRight: 5 }} 
                            className={classes.formLabel}
                            disabled placeholder={landScheduleData?.releaseStatus}></Form.Control>

                          <ReportProblemIcon
                            style={{
                              display: hideRemarks ? "none" : "block",
                              color: fieldIconColors.statusOfRelease
                            }}
                            onClick={() => {
                              setLabelValue("Status of release"),
                                setOpennedModal("statusOfRelease")
                              setSmShow(true),
                                console.log("modal open"),
                                setFieldValue(landScheduleData?.statusOfRelease);
                            }}
                          ></ReportProblemIcon>

                        </div>
                      </div>
                    </div>
                    <div className="col col-4 p-1">
                      <div className="form-group ">
                        <label htmlFor="awarddate">
                          <h6 style={{ fontWeight: "initial" }} data-toggle="tooltip" data-placement="top" title="Date of Award">Date of Award</h6>
                        </label>
                        <div className="d-flex flex-row align-items-center my-1 ">
                          <Form.Control
                            //  height={30} style={{ maxWidth: 200, marginRight: 5 }} 
                            className={classes.formLabel}
                            disabled placeholder={landScheduleData?.awardDate}></Form.Control>
                          <ReportProblemIcon
                            style={{
                              display: hideRemarks ? "none" : "block",
                              color: fieldIconColors.dateOfAward
                            }}
                            onClick={() => {
                              setLabelValue("Date of Award"),
                                setOpennedModal("dateOfAward")
                              setSmShow(true),
                                console.log("modal open"),
                                setFieldValue(landScheduleData?.dateOfAward);
                            }}
                          ></ReportProblemIcon>
                        </div>
                        {/* comment by me */}
                      </div>
                    </div>
                    <div className="col col-4 p-1">
                      <div className="form-group ">
                        <label htmlFor="releasedate">
                          <h6 style={{ fontWeight: "initial" }} data-toggle="tooltip" data-placement="top" title="Date of Release">Date of Release</h6>{" "}
                        </label>

                        <div className="d-flex flex-row align-items-center my-1 ">
                          <Form.Control
                            //  height={30} style={{ maxWidth: 200, marginRight: 5 }} 
                            className={classes.formLabel}
                            disabled placeholder={landScheduleData?.releaseDate}></Form.Control>
                          <ReportProblemIcon
                            style={{
                              display: hideRemarks ? "none" : "block",
                              color: fieldIconColors.dateOfRelease
                            }}
                            onClick={() => {
                              setLabelValue("Date of Release"),
                                setOpennedModal("dateOfRelease")
                              setSmShow(true),
                                console.log("modal open"),
                                setFieldValue(landScheduleData?.dateOfRelease);
                            }}
                          ></ReportProblemIcon>
                        </div>
                      </div>
                    </div>
                    <div className="col col-4 p-1">
                      <div className="form-group ">
                        <label htmlFor="sitedetails">
                          <h6 style={{ fontWeight: "initial" }} data-toggle="tooltip" data-placement="top" title="Site Details">Site Details</h6>
                        </label>
                        <div className="d-flex flex-row align-items-center my-1 ">
                          <Form.Control
                            // height={30} style={{ maxWidth: 200, marginRight: 5 }} 
                            className={classes.formLabel}
                            disabled placeholder={landScheduleData?.siteDetail}></Form.Control>
                          <ReportProblemIcon
                            style={{
                              display: hideRemarks ? "none" : "block",
                              color: fieldIconColors.siteDetails
                            }}
                            onClick={() => {
                              setLabelValue("Site Details"),
                                setOpennedModal("siteDetails")
                              setSmShow(true),
                                console.log("modal open"),
                                setFieldValue(landScheduleData?.siteDetails);
                            }}
                          ></ReportProblemIcon>
                        </div>


                        {/* comment by me */}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <br></br>
            <div className="row mx-1">
              <div className="col col-12 p-1">
                <h6 style={{ fontWeight: "initial" }} >
                  whether the applied site is approachable from the proposed 18/24 m internal sectoral plan road/sector dividing road.
                  <div className="d-flex flex-row align-items-center my-1 ">
                   
                    <input type="radio" disabled value="Yes" checked={landScheduleData?.siteApproachable === "Y" ? true : false} />
                    <label className="m-0  mx-2" for="Yes">Yes</label>&nbsp;&nbsp;
                    <input type="radio" disabled value="No" checked={landScheduleData?.siteApproachable === "N" ? true : false} />
                    <label className="m-0 mx-2" for="No">No</label>
                    <ReportProblemIcon
                      style={{
                        display: hideRemarks ? "none" : "block",
                        color: fieldIconColors.internalSectoralPlan
                      }}
                      onClick={() => {
                        setLabelValue("whether the applied site is approachable from the proposed 18/24 m internal sectoral plan road/sector dividing road"),
                          setOpennedModal("internalSectoralPlan")
                        setSmShow(true),
                          console.log("modal open"),
                          setFieldValue(landScheduleData?.siteApproachable === "Y" ? "Yes" : landScheduleData?.siteApproachable === "N" ? "No" : null);
                      }}
                    ></ReportProblemIcon>
                  </div>
                </h6>
                
              </div>
            </div>
            <hr className="my-3" />
            <h5 className="text-black ml-2 mb-2">4. Site condition</h5>
            <div className="row mx-1">
              <div className="col col-4 p-1">
                <h6>
                  (a) vacant: (Yes/No){" "}</h6>
                <div className="d-flex flex-row align-items-center my-1 ">
                  {/* <Form.Control height={30} style={{ maxWidth: 200, marginRight: 5 }} disabled></Form.Control> */}
                  <input type="radio" disabled value="Yes" checked={landScheduleData?.vacant === "Y" ? true : false} />
                  <label className="m-0  mx-2" for="Yes">Yes</label>&nbsp;&nbsp;
                  <input type="radio" disabled value="No" checked={landScheduleData?.vacant === "N" ? true : false} />
                  <label className="m-0 mx-2" for="No">No</label>
                  <ReportProblemIcon
                    style={{
                      display: hideRemarks || hideRemarksPatwari ? "none" : "block",
                      color: fieldIconColors.vacant
                    }}
                    onClick={() => {
                      setLabelValue("vacant"),
                        setOpennedModal("vacant")
                      setSmShow(true),
                        console.log("modal open"),
                        setFieldValue(landScheduleData?.vacant === "Y" ? "Yes" : landScheduleData?.vacant === "N" ? "No" : null);
                    }}
                  ></ReportProblemIcon>
                </div>

                {landScheduleData?.vacant === "Y" && (
                  <div className="row ml-1 mr-2">
                    <div className="col col p-1">
                      <label> Vacant Remark </label>
                      {/* <input type="number" className="form-control" disabled placeholder={landScheduleData?.vacantRemark} /> */}
                      <Form.Control placeholder={landScheduleData?.vacantRemark}
                        className={classes.formLabel}
                        disabled></Form.Control>
                    </div>
                  </div>
                )}
                {landScheduleData?.vacant === "N" && (
                  <div className="row ml-1 mr-2">
                    <div className="col col p-1">
                      <label> Construction Remark </label>
                      {/* <input type="number" className="form-control" disabled placeholder={landScheduleData?.vacantRemark} /> */}
                      <Form.Control
                        placeholder={landScheduleData?.vacantRemark}
                        className={classes.formLabel}
                        disabled></Form.Control>
                    </div>
                  </div>
                )}

              </div>

              {/* {landScheduleData?.vacant === "N" && (
                
                  <div className="col col-3 p-1">
                <h6 onChange={(e) => setConstruction(e.target.value)} value={construction}>
                  (b) Construction: (Yes/No)
                </h6>

                <div className="d-flex flex-row align-items-center my-1 ">
                  
                  <input type="radio" disabled value="Yes" checked={landScheduleData?.construction === "Y" ? true : false} />
                  <label className="m-0  mx-2" for="Yes">Yes</label>&nbsp;&nbsp;
                  <input type="radio" disabled value="No" checked={landScheduleData?.construction === "N" ? true : false} />
                  <label className="m-0 mx-2" for="No">No</label>
                  <ReportProblemIcon
                    style={{
                      display: hideRemarks?"none":"block",
                      color: fieldIconColors.construction
                    }}
                    onClick={() => {
                      setLabelValue("Construction"),
                        setOpennedModal("construction")
                      setSmShow(true),
                        console.log("modal open"),
                        setFieldValue(landScheduleData?.construction === "Y" ? "Yes" : landScheduleData?.construction === "N" ? "No" : null);
                    }}
                  ></ReportProblemIcon>
                </div>

                {landScheduleData?.construction === "Y" && (
                  <div className="row ">
                    <div className="col col">
                      <label>Type of Construction</label>
  
                      <Form.Control placeholder={landScheduleData?.typeOfConstruction} height={30} style={{ maxWidth: 200, marginRight: 5 }} disabled></Form.Control>
                    </div>
                  </div>
                )}
                {landScheduleData?.construction === "N" && (
                  <div className="row ">
                    <div className="col col">
                      <label>Remark</label>
      
                      <Form.Control placeholder={landScheduleData?.constructionRemark} height={30} style={{ maxWidth: 200, marginRight: 5 }} disabled></Form.Control>
                    </div>
                  </div>
                )}
              </div>
                )} */}

              <div className="col col-4 p-1">
                <h6 >
                  (b) HT line
                </h6>
                <div className="d-flex flex-row align-items-center my-1 ">

                  <input type="radio" disabled value="Yes" checked={landScheduleData?.ht === "Y" ? true : false} />
                  <label className="m-0  mx-2" for="Yes">Yes</label>&nbsp;&nbsp;
                  <input type="radio" disabled value="No" checked={landScheduleData?.ht === "N" ? true : false} />
                  <label className="m-0 mx-2" for="No">No</label>
                  <ReportProblemIcon
                    style={{
                      display: hideRemarks || hideRemarksPatwari ? "none" : "block",
                      color: fieldIconColors.htLine
                    }}
                    onClick={() => {
                      setLabelValue("HT line"),
                        setOpennedModal("htLine")
                      setSmShow(true),
                        console.log("modal open"),
                        setFieldValue(landScheduleData?.ht === "Y" ? "Yes" : landScheduleData?.ht === "N" ? "No" : null);
                    }}
                  ></ReportProblemIcon>
                </div>

                {landScheduleData?.ht === "Y" && (
                  <div className="row ">
                    <div className="col col">
                      <label>HT Remarks</label>

                      <Form.Control
                        placeholder={landScheduleData?.htRemark}
                        className={classes.formLabel}
                        disabled></Form.Control>
                    </div>
                  </div>
                )}
                {landScheduleData?.ht === "N" && (
                  <div className="row ">
                    <div className="col col">
                      <label>HT Remarks</label>

                      <Form.Control
                        placeholder={landScheduleData?.htRemark}
                        className={classes.formLabel}
                        disabled></Form.Control>
                    </div>
                  </div>
                )}
              </div>
              <div className="col col-4 p-1">
                <h6 >
                  (C) IOC Gas Pipeline
                </h6>

                <div className="d-flex flex-row align-items-center my-1 ">
                  <input type="radio" disabled value="Yes" checked={landScheduleData?.gas === "Y" ? true : false} />
                  <label className="m-0  mx-2" for="Yes">Yes</label>&nbsp;&nbsp;
                  <input type="radio" disabled value="No" checked={landScheduleData?.gas === "N" ? true : false} />
                  <label className="m-0 mx-2" for="No">No</label>
                  <ReportProblemIcon
                    style={{
                      display: hideRemarks || hideRemarksPatwari ? "none" : "block",
                      color: fieldIconColors.iocGasPipeline
                    }}
                    onClick={() => {
                      setLabelValue("IOC Gas Pipeline"),
                        setOpennedModal("iocGasPipeline")
                      setSmShow(true),
                        console.log("modal open"),
                        setFieldValue(landScheduleData?.gas === "Y" ? "Yes" : landScheduleData?.gas === "N" ? "No" : null);
                    }}
                  ></ReportProblemIcon>
                </div>

                {landScheduleData?.gas === "Y" && (
                  <div className="row ">
                    <div className="col col">
                      <label>IOC Remark</label>

                      <Form.Control
                        placeholder={landScheduleData?.gasRemark}
                        className={classes.formLabel}
                        disabled></Form.Control>
                    </div>
                  </div>
                )}
                {landScheduleData?.gas === "N" && (
                  <div className="row ">
                    <div className={classes.formLabel} >
                      <label>IOC Remark</label>
                      <input type="text" className="form-control" disabled placeholder={landScheduleData?.gasRemark} />
                      {/* <Form.Control
                       placeholder={landScheduleData?.gasRemark}
                       className={classes.formLabel}
                        disabled>

                        </Form.Control> */}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="row mx-1">
              <div className="col col-4 p-1">
                <h6 >
                  (d) Nallah{" "}
                </h6>

                <div className="d-flex flex-row align-items-center my-1 ">
                  <input type="radio" disabled value="Yes" checked={landScheduleData?.nallah === "Y" ? true : false} />
                  <label className="m-0  mx-2" for="Yes">Yes</label>&nbsp;&nbsp;
                  <input type="radio" disabled value="No" checked={landScheduleData?.nallah === "N" ? true : false} />
                  <label className="m-0 mx-2" for="No">No</label>
                  <ReportProblemIcon
                    style={{
                      display: hideRemarks || hideRemarksPatwari ? "none" : "block",
                      color: fieldIconColors.nallah
                    }}
                    onClick={() => {
                      setLabelValue("Nallah"),
                        setOpennedModal("nallah")
                      setSmShow(true),
                        console.log("modal open"),
                        setFieldValue(landScheduleData?.nallah === "Y" ? "Yes" : landScheduleData?.nallah === "N" ? "No" : null);
                    }}
                  ></ReportProblemIcon>
                </div>

                {landScheduleData?.nallah === "Y" && (
                  <div className="row ">
                    <div className="col col">
                      <label>Nallah Remarks</label>
                      {/* <input type="text" className="form-control" disabled placeholder={landScheduleData?.nallahRemark} /> */}
                      <Form.Control placeholder={landScheduleData?.nallahRemark}
                        // height={30} style={{ maxWidth: 200, marginRight: 5 }}
                        className={classes.formLabel}
                        disabled></Form.Control>
                    </div>
                  </div>
                )}
                {landScheduleData?.nallah === "N" && (
                  <div className="row ">
                    <div className="col col">
                      <label>Nallah Remarks</label>
                      {/* <input type="text" className="form-control" disabled placeholder={landScheduleData?.nallahRemark} /> */}
                      <Form.Control placeholder={landScheduleData?.nallahRemark}
                        // height={30} style={{ maxWidth: 200, marginRight: 5 }} 
                        className={classes.formLabel}
                        disabled></Form.Control>
                    </div>
                  </div>
                )}
              </div>
              <div className="col col-4 p-1">
                <h6>
                  (e)  Any revenue rasta/road passing through proposed site
                </h6>
                <div className="d-flex flex-row align-items-center my-1 ">
                  <input type="radio" disabled value="Yes" checked={landScheduleData?.road === "Y" ? true : false} />
                  <label className="m-0  mx-2" for="Yes">Yes</label>&nbsp;&nbsp;
                  <input type="radio" disabled value="No" checked={landScheduleData?.road === "N" ? true : false} />
                  <label className="m-0 mx-2" for="No">No</label>
                  <ReportProblemIcon
                    style={{
                      display: hideRemarks || hideRemarksPatwari ? "none" : "block",
                      color: fieldIconColors.anyRevenueRasta
                    }}
                    onClick={() => {
                      setLabelValue("Any revenue rasta/road"),
                        setOpennedModal("anyRevenueRasta")
                      setSmShow(true),
                        console.log("modal open"),
                        setFieldValue(landScheduleData?.road === "Y" ? "Yes" : landScheduleData?.road === "N" ? "No" : null);
                    }}
                  ></ReportProblemIcon>
                </div>
                {landScheduleData?.road === "Y" && (
                  <div className="row ">
                    <div className="col col-12">
                      <label>Width of Revenue rasta/road (in ft.)</label>
                      {/* <input type="text" className="form-control" disabled placeholder={landScheduleData?.roadWidth} /> */}
                      <Form.Control
                        placeholder={landScheduleData?.roadWidth}
                        className={classes.formLabel}
                        disabled></Form.Control>
                    </div>
                    <div className="col col-12">
                      <label>Remark</label>
                      <Form.Control
                        placeholder={landScheduleData?.roadRemark}
                        className={classes.formLabel}
                        disabled></Form.Control>
                      {/* <input type="text" className="form-control" disabled placeholder={landScheduleData?.roadRemark} /> */}
                    </div>
                  </div>
                )}
                {landScheduleData?.road === "N" && (
                  <div className="row ">
                    <div className="col col-12">
                      <label>Remark</label>
                      {/* <input type="text" className="form-control" disabled placeholder={landScheduleData?.roadRemark} /> */}
                      <Form.Control
                        placeholder={landScheduleData?.roadRemark}
                        className={classes.formLabel}
                        disabled></Form.Control>
                    </div>
                  </div>
                )}
              </div>
              <div className="col col-4 p-1">
                <h6 onChange={(e) => setLand(e.target.value)} value={land}>
                (f) Utility/Permit Line
                </h6>{" "}
                <div className="d-flex flex-row align-items-center my-1 ">
                  <input type="radio" disabled value="Yes" checked={landScheduleData?.utilityLine === "Y" ? true : false} />
                  <label className="m-0  mx-2" for="Yes">Yes</label>&nbsp;&nbsp;
                  <input type="radio" disabled value="No" checked={landScheduleData?.utilityLine === "N" ? true : false} />
                  <label className="m-0 mx-2" for="No">No</label>
                  <ReportProblemIcon
                    style={{
                      display: hideRemarks || hideRemarksPatwari ? "none" : "block",
                      color: fieldIconColors.utilityLine
                    }}
                    onClick={() => {
                      setLabelValue("Any marginal land"),
                        setOpennedModal("anyMarginalLand")
                      setSmShow(true),
                        console.log("modal open"),
                        setFieldValue(landScheduleData?.land === "Y" ? "Yes" : landScheduleData?.land === "N" ? "No" : null);
                    }}
                  ></ReportProblemIcon>
                </div>
                {landScheduleData?.utilityLine === "Y" && (
                  <div className="row ">
                    <div className="col col">
                      <label>Width of ROW (in ft.) </label>
                      {/* <input type="text" className="form-control" disabled placeholder={landScheduleData?.marginalLandRemark} /> */}
                      <Form.Control
                        placeholder={landScheduleData?.utilityWidth}
                        className={classes.formLabel}
                        disabled></Form.Control>
                    </div>
                  </div>
                )}
                {landScheduleData?.utilityLine === "N" && (
                  <div className="row ">
                    <div className="col col">
                      <label>Remark </label>
                      {/* <input type="text" className="form-control" disabled placeholder={landScheduleData?.marginalLandRemark} /> */}
                      <Form.Control
                        placeholder={landScheduleData?.utilityWidth}
                        className={classes.formLabel}
                        disabled></Form.Control>
                    </div>
                  </div>
                )}
              </div>
              {/* <div className="col col-4 p-1">
                <h6
                  data-toggle="tooltip"
                  data-placement="top"
                  title="Whether any utility line passing through the site is incorporated/adjusted in the layout plan (Yes/No)"
                >
                  (h)&nbsp;Utility Line &nbsp;
                </h6>

                <div className="d-flex flex-row align-items-center my-1 ">
                  <input type="radio" disabled value="Yes" checked={landScheduleData?.utilityLine === "Y" ? true : false} />
                  <label className="m-0  mx-2" for="Yes">Yes</label>&nbsp;&nbsp;
                  <input type="radio" disabled value="No" checked={landScheduleData?.utilityLine === "N" ? true : false} />
                  <label className="m-0 mx-2" for="No">No</label>
                  <ReportProblemIcon
                    style={{
                      display: hideRemarks || hideRemarksPatwari ? "none" : "block",
                      color: fieldIconColors.utilityLine
                    }}
                    onClick={() => {
                      setLabelValue("Utility Line"),
                        setOpennedModal("utilityLine")
                      setSmShow(true),
                        console.log("modal open"),
                        setFieldValue(landScheduleData?.utilityLine === "Y" ? "Yes" : landScheduleData?.utilityLine === "N" ? "No" : null);
                    }}
                  ></ReportProblemIcon>
                </div>

                {landScheduleData?.utilityLine === "Y" && (
                  <div className="row ">
                   <div className="col col-12">
                      <label>Width of row</label>
             
                      <Form.Control placeholder={landScheduleData?.utilityWidth}
                    
                        className={classes.formLabel}
                        disabled></Form.Control>
                    </div>
                    <div className="col col-12">
                      <label>Remark </label>
                   
                      <Form.Control placeholder={landScheduleData?.utilityRemark}
                      
                        className={classes.formLabel}
                        disabled></Form.Control>
                    </div>
                  </div>
                )}
                {landScheduleData?.utilityLine === "N" && (
                  <div className="col col">
                    <label>Remark </label>
            
                    <Form.Control placeholder={landScheduleData?.utilityRemark}
                
                      className={classes.formLabel}
                      disabled></Form.Control>
                  </div>

                )}
              </div> */}
            </div>
            <hr className="my-3" />
            <h5 className={`text-black ml-2 mb-2 ${classes.formLabel}`}>
              5. Enclose the following documents as Annexures&nbsp;&nbsp;
              <div className="d-flex flex-row align-items-center my-1 ">
                {/* <Form.Control height={30} style={{ maxWidth: 200, marginRight: 5 }} disabled placeholder={landScheduleData?.documentsAsAnnexures}></Form.Control> */}
                <ReportProblemIcon
                  style={{
                    display: hideRemarks || hideRemarksPatwari ? "none" : "block",
                    color: fieldIconColors.documentsAsAnnexures
                  }}
                  onClick={() => {
                    setLabelValue("Enclose the following documents as Annexures"),
                      setOpennedModal("documentsAsAnnexures")
                    setSmShow(true),
                      console.log("modal open"),
                      setFieldValue(landScheduleData !== null ? landScheduleData?.documentsAsAnnexures : null);
                  }}
                ></ReportProblemIcon>
              </div>
            </h5>
            <div className="row mx-1">
              <div className="col col-3 p-1">
                <h6>Land schedule</h6>
                <div className="d-flex flex-row align-items-center my-1 ">
                  <IconButton onClick={() => getDocShareholding(landScheduleData?.landSchedule)}>
                    <DownloadForOfflineIcon color="primary" className="mx-1" />
                  </IconButton>
                  <ReportProblemIcon
                    style={{
                      display: hideRemarks ? "none" : "block",
                      color: fieldIconColors.landSchedule
                    }}
                    onClick={() => {
                      setLabelValue("Land schedule"),
                        setOpennedModal("landSchedule")
                      setSmShow(true),
                        console.log("modal open"),
                        setFieldValue(landScheduleData !== null ? landScheduleData?.landSchedule : null);
                    }}
                  ></ReportProblemIcon>
                </div>
              </div>
              <div className="col col-3 p-1">
                <h6>Copy of Mutation</h6>
                <div className="d-flex flex-row align-items-center my-1 ">
                  <IconButton onClick={() => getDocShareholding(landScheduleData?.mutation)}>
                    <DownloadForOfflineIcon color="primary" className="mx-1" />
                  </IconButton>
                  <ReportProblemIcon
                    style={{
                      display: hideRemarks ? "none" : "block",
                      color: fieldIconColors.copyOfMutation
                    }}
                    onClick={() => {
                      setLabelValue("Copy of Mutation"),
                        setOpennedModal("copyOfMutation")
                      setSmShow(true),
                        console.log("modal open"),
                        setFieldValue(landScheduleData !== null ? landScheduleData?.mutation : null);
                    }}
                  ></ReportProblemIcon>
                </div>
              </div>
              <div className="col col-3 p-1">
                <h6>Copy of Jamabandi</h6>
                <div className="d-flex flex-row align-items-center my-1 ">
                  <IconButton onClick={() => getDocShareholding(landScheduleData?.jambandhi)}>
                    <DownloadForOfflineIcon color="primary" className="mx-1" />
                  </IconButton>
                  <ReportProblemIcon
                    style={{
                      display: hideRemarks ? "none" : "block",
                      color: fieldIconColors.copyOfJamabandi
                    }}
                    onClick={() => {
                      setLabelValue("Copy of Jamabandi"),
                        setOpennedModal("copyOfJamabandi")
                      setSmShow(true),
                        console.log("modal open"),
                        setFieldValue(landScheduleData !== null ? landScheduleData?.jambandhi : null);
                    }}
                  ></ReportProblemIcon>
                </div>
              </div>
              <div className="col col-3 p-1">
                <h6>Details of lease / patta, if any</h6>
                <div className="d-flex flex-row align-items-center my-1 ">
                  <IconButton onClick={() => getDocShareholding(landScheduleData?.detailsOfLease)}>
                    <DownloadForOfflineIcon color="primary" className="mx-1" />
                  </IconButton>
                  <ReportProblemIcon
                    style={{
                      display: hideRemarks ? "none" : "block",
                      color: fieldIconColors.detailsOfLease
                    }}
                    onClick={() => {
                      setLabelValue("Details of lease / patta, if any"),
                        setOpennedModal("detailsOfLease")
                      setSmShow(true),
                        console.log("modal open"),
                        setFieldValue(landScheduleData !== null ? landScheduleData?.detailsOfLease : null);
                    }}
                  ></ReportProblemIcon>
                </div>
              </div>
            </div>
            <br></br>
            <div className="row mx-1">
              <div className="col col-3 p-1">
                {/* &nbsp;&nbsp; */}
                <h6>Add Sales/deed/exchange</h6>
                {/* &nbsp;&nbsp; */}
                <div className="d-flex flex-row align-items-center my-1 ">
                  <IconButton onClick={() => getDocShareholding(landScheduleData?.addSalesDeed)}>
                    <DownloadForOfflineIcon color="primary" className="mx-1" />
                  </IconButton>

                  <ReportProblemIcon
                    style={{
                      display: hideRemarks ? "none" : "block",
                      color: fieldIconColors.addSalesDeed
                    }}
                    onClick={() => {
                      setLabelValue("Add Sales/deed/exchange"),
                        setOpennedModal("addSalesDeed")
                      setSmShow(true),
                        console.log("modal open"),
                        setFieldValue(landScheduleData !== null ? landScheduleData?.addSalesDeed : null);
                    }}
                  ></ReportProblemIcon>
                </div>
              </div>
              <div className="col col-3 p-1">
                <h6>Copy of spa/GPA/board resolution</h6>
                <div className="d-flex flex-row align-items-center my-1 ">
                  <IconButton onClick={() => getDocShareholding(landScheduleData?.copyofSpaBoard)}>
                    <DownloadForOfflineIcon color="primary" className="mx-1" />
                  </IconButton>
                  <ReportProblemIcon
                    style={{
                      display: hideRemarks ? "none" : "block",
                      color: fieldIconColors.copyofSpaBoard
                    }}
                    onClick={() => {
                      setLabelValue("Copy of spa/GPA/board resolution"),
                        setOpennedModal("copyofSpaBoard")
                      setSmShow(true),
                        console.log("modal open"),
                        setFieldValue(landScheduleData !== null ? landScheduleData?.copyofSpaBoard : null);
                    }}
                  ></ReportProblemIcon>
                </div>
              </div>
              <div className="col col-3 p-1">
                <h6>Revised Land Schedule</h6>
                <div className="d-flex flex-row align-items-center my-1 ">
                  {/* propose<IconButton onClick={()=>getDocShareholding(landScheduleData?.thirdPartyDoc)}>
                          <DownloadForOfflineIcon color="primary" className="mx-1"  />
                        </IconButton>dColony */}
                  <IconButton onClick={() => getDocShareholding(landScheduleData?.revisedLansSchedule)}>
                    <DownloadForOfflineIcon color="primary" className="mx-1" />
                  </IconButton>
                  <ReportProblemIcon
                    style={{
                      display: hideRemarks ? "none" : "block",
                      color: fieldIconColors.revisedLansSchedule
                    }}
                    onClick={() => {
                      setLabelValue("Revised Land Schedule"),
                        setOpennedModal("revisedLansSchedule")
                      setSmShow(true),
                        console.log("modal open"),
                        setFieldValue(landScheduleData !== null ? landScheduleData?.revisedLansSchedule : null);
                    }}
                  ></ReportProblemIcon>
                </div>
              </div>

              <div className="col col-3 p-1">
                <h6>Copy of Shajra Plan</h6>
                <div className="d-flex flex-row align-items-center my-1 ">

                  <IconButton onClick={() => getDocShareholding(landScheduleData?.copyOfShajraPlan)}>
                    <DownloadForOfflineIcon color="primary" className="mx-1" />
                  </IconButton>
                  <ReportProblemIcon
                    style={{
                      display: hideRemarks ? "none" : "block",
                      color: fieldIconColors.copyOfShajraPlan
                    }}
                    onClick={() => {
                      setLabelValue("Copy of Shajra Plan"),
                        setOpennedModal("copyOfShajraPlan")
                      setSmShow(true),
                        console.log("modal open"),
                        setFieldValue(landScheduleData !== null ? landScheduleData?.copyOfShajraPlan : null);
                    }}
                  ></ReportProblemIcon>
                </div>
              </div>

            </div>
            <br></br>
            {/* <div style={{ position: "relative", marginBottom: 40 }}>
              <Button onClick={() => props.passUncheckedList({ data: uncheckedValue })}>Submit</Button>
            </div> */}
          </Form.Group>
        </div>
      </Collapse>
    </Form>
  );
};

export default Developerinfo;
