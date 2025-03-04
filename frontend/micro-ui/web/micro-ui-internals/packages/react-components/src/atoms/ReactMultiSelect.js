import React from "react";
import Select from "react-select";
import { Controller } from "react-hook-form";

const MultiSelectField = (props) => {
  return (
    <div className="app-input-text" style={{ width: "100%" }}>
      <Controller
        name={props?.name}
        control={props?.control}
        rules={props?.rules}
        render={({ field: { onChange, value } }) => (
          <Select
            isMulti={props.multiSelect}
            placeholder={props?.placeholder}
            isLoading={props?.loading}
            options={props?.data}
            isDisabled={props?.isDisabled}
            value={props?.value ? props?.data?.filter((option) => option?.value === props?.value) : value}
            onChange={(e) => {
              onChange(e);
              if (props?.onChange) props?.onChange(e);
            }}
          />
        )}
      />
    </div>
  );
};
export default MultiSelectField;
