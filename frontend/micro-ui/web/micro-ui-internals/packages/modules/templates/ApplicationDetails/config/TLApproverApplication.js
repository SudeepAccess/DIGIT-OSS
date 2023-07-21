import { AdvanceTextArea, Dropdown, MultiSelectDropdown, UploadFile } from "@egovernments/digit-ui-react-components";
import React from "react";



export const configTLApproverApplication = ({
  t,
  action,
  approvers,
  selectedApprover,
  setSelectedApprover,
  selectFile,
  uploadedFile,
  setUploadedFile,
  assigneeLabel,
  businessService,
  setComment,
  comment,
}) => {
  let checkCondtions = true;
  if (action?.action == "SENDBACKTOCITIZEN" || action?.action == "APPROVE") checkCondtions = false;
  if (action.isTerminateState) checkCondtions = false;
  // let checkCondtion = true;
  // if(action?.action === "HEARING" ) checkCondtion =true;
  // console.log("setStatesetComment",setComment,comment);

  return {
    label: {
      heading: `WF_${action?.action}_APPLICATION`,
      submit: `WF_${businessService?.toUpperCase()}_${action?.action}`,
      cancel: "WF_EMPLOYEE_NEWTL_CANCEL",
    },
    form: [
      {
        body: [
          {
            label: !checkCondtions ? null : t("WF_ASSIGNEE_NAME_LABEL"),
            placeholder: !checkCondtions ? null : t("WF_ASSIGNEE_NAME_PLACEHOLDER"),
            // isMandatory: false,
            type: "dropdown",
            populators: !checkCondtions ? null : (
              // <Dropdown
              //   option={approvers}
              //   autoComplete="off"
              //   optionKey="name"
              //   id="fieldInspector"
              //   select={setSelectedApprover}
              //   selected={selectedApprover}
              // />
              
             <React.Fragment>
            
                 <MultiSelectDropdown
              options={approvers}
              // options={[{name:"dtp"},{name:"ctp"},{name:"acp"}]}
              autoComplete="off"
              optionsKey="name"
              id="fieldInspector"
              onSelect={setSelectedApprover}
              selected={selectedApprover}
              showSelectedValue={true}
            />
            {/* <p>{JSON.stringify(selectedApprover)}</p>
           <p>{JSON.stringify(approvers)}</p> 
           <p>{JSON.stringify(setSelectedApprover)}</p>  */}
           
             </React.Fragment>
            ),
            
          },
          //////////////////////TCP///////////////////////

          
          // {
          //   label: !checkCondtion ? null :  t("WF_COMMON_COMMENTS"),
          //   type: "input",
          //   populators: !checkCondtions ? null :  (  
          //     // <AdvanceTextArea
          //     // modal={true}
          //     // setState={setComment}
          //     // ></AdvanceTextArea>
          //     // <DatePicker selected={setComment} onChange={(date) => setStartDate(date)} />
          //     <input  modal={true} type="date" name="comments" placeholder="dd-mm-yyyy" />
          //   )
          //   //  populators: {
          //   //   name: "comments",
          //   // },
           
          // },
       
          // populators: {
          //     name: "comments",
          //   },
          //////////////////////TCP///////////////////////
          //////////////////////TCP///////////////////////
          // {
          //   label: t("TL_APPROVAL_CHECKLIST_BUTTON_UP_FILE"),
          //   populators: (
          //     <UploadFile
          //       id={"workflow-doc"}
          //       accept=".jpg"
          //       onUpload={selectFile}
          //       onDelete={() => {
          //         setUploadedFile(null);
          //       }}
          //       message={uploadedFile ? `1 ${t(`ES_PT_ACTION_FILEUPLOADED`)}` : t(`CS_ACTION_NO_FILEUPLOADED`)}
          //     />
          //   )
          // },

      //////////////////////TCP///////////////////////
          //   {
          //     label: action.docUploadRequired ? t("ES_PT_UPLOAD_FILE") : null,
          //     populators: action.docUploadRequired ? (
          //       <UploadFile
          //         // accept=".jpg"
          //         onUpload={selectFile}
          //         onDelete={() => {
          //           setUploadedFile(null);
          //         }}
          //         message={uploadedFile ? `1 ${t(`ES_PT_ACTION_FILEUPLOADED`)}` : t(`ES_PT_ACTION_NO_FILEUPLOADED`)}
          //       />
          //     ) : null,
          //   },
        ],
      },
    ],
  };
};
