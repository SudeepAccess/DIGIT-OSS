import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import { PrivateRoute } from "@egovernments/digit-ui-react-components";
import PayersDetails from "./payers-details";

import { MyBills } from "./bills";
import { SelectPaymentType } from "./payment-type/index";
import { SuccessfulPayment, FailedPayment } from "./response";
import Test from "./response/test";

const CitizenPayment = ({ stateCode, cityCode, moduleCode }) => {
  const { path: currentPath } = useRouteMatch();
  const commonProps = { stateCode, cityCode, moduleCode };

  return (
    <React.Fragment>
      <Switch>
        <Route path={`${currentPath}/my-bills/:businessService`}>
          <MyBills stateCode={stateCode} />
        </Route>
        <Route path={`${currentPath}/billDetails/:businessService/:consumerCode/:paymentAmt`}>
          <PayersDetails {...commonProps} stateCode={stateCode} basePath={currentPath} />
        </Route>
        <Route path={`${currentPath}/collect/:businessService/:consumerCode`}>
          <SelectPaymentType {...commonProps} stateCode={stateCode} basePath={currentPath} />
        </Route>
        <Route path={`${currentPath}/success/:businessService/:consumerCode/:tenantId`}>
          <SuccessfulPayment {...commonProps} />
          {/* <Test /> */}
        </Route>
        <Route path={`${currentPath}/failure`}>
          <FailedPayment {...commonProps} />
        </Route>
      </Switch>
    </React.Fragment>
  );
};

export default CitizenPayment;
