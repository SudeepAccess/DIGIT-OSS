import React from "react";
import { useTranslation } from "react-i18next";
import { TickMark } from "@egovernments/digit-ui-react-components";

let actions = [];

const getAction = (flow) => {
  switch (flow) {
    case "STAKEHOLDER": actions = [
      'Applicant Type',
      'BPA_ADD_INFO_LABEL',
      'BPA_AUTHORIZED_USER_LABEL',
      'BPA_DEVELOPER_CAPACITY_LABEL',
      'BPA_DOC_DETAILS_SUMMARY',
      'BPA_STEPPER_SUMMARY_HEADER',
    ]
      break;
    case 'ARCHITECT.CLASSA': actions = [
      'Applicant Type',
      'Personal Details',
      'BPA_DOC_DETAILS_SUMMARY',
      'BPA_STEPPER_SUMMARY_HEADER',
    ]
      break;
    case "OCBPA": actions = [
      'BPA_BASIC_AND_PLOT_DETAILS_LABEL',
      'BPA_SCRUTINY_DETAILS',
      'BPA_DOCUMENT_AND_NOC_DETAILS_LABEL',
      'BPA_STEPPER_SUMMARY_HEADER',
    ];
      break;
    default: actions = [
      'BPA_STEPPER_SCRUTINY_DETAILS_HEADER',
      'BPA_OWNER_AND_DOCUMENT_DETAILS_LABEL',
      'BPA_PAYMENT_DETAILS_SUMMARY',
      'BPA_STEPPER_SUMMARY_HEADER',
    ]
  }
}
const Timeline = ({ currentStep = 1, flow = "", onChangeStep = () => { console.log("change step function is not passed") }, isAPILoaded = true }) => {
  const { t } = useTranslation();
  const isMobile = window.Digit.Utils.browser.isMobile();
  if(isAPILoaded){
    getAction(flow);
  }
  return (
    <div className="timeline-container" style={isMobile ? {} : { marginRight: "auto" }} >
      {actions.map((action, index, arr) => (
        <div className="timeline-checkpoint" style={{ cursor: index + 1 < currentStep ? "pointer" : "default" }} key={index} onClick={() => onChangeStep(index + 1)}>
          <div className="timeline-content">
            <span className={`circle ${index <= currentStep - 1 && 'active'}`}>{index < currentStep - 1 ? <TickMark /> : index + 1}</span>
            <span className="secondary-color">{t(action)}</span>
          </div>
          {index < arr.length - 1 && <span className={`line ${index < currentStep - 1 && 'active'}`}></span>}
        </div>
      ))}
    </div>
  )
}

export default Timeline; 