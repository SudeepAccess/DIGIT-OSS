import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { AppContainer, BackButton, Toast } from "@egovernments/digit-ui-react-components";
import { Route, Switch, useHistory, useRouteMatch, useLocation } from "react-router-dom";
import { loginSteps } from "./config";
import SelectMobileNumber from "./SelectMobileNumber";
import SelectOtp from "./SelectOtp";
import SelectName from "./SelectName";

const TYPE_REGISTER = { type: "register" };
const TYPE_LOGIN = { type: "login" };
const DEFAULT_USER = "digit-user";
const DEFAULT_REDIRECT_URL = "/digit-ui/citizen";

/* set citizen details to enable backward compatiable */
const setCitizenDetail = (userObject, token, tenantId) => {
  let locale = JSON.parse(sessionStorage.getItem("Digit.initData"))?.value?.selectedLanguage;
  localStorage.setItem("Citizen.tenant-id", tenantId);
  localStorage.setItem("tenant-id", tenantId);
  localStorage.setItem("citizen.userRequestObject", JSON.stringify(userObject));
  localStorage.setItem("locale", locale);
  localStorage.setItem("Citizen.locale", locale);
  localStorage.setItem("token", token);
  localStorage.setItem("Citizen.token", token);
  localStorage.setItem("user-info", JSON.stringify(userObject));
  localStorage.setItem("Citizen.user-info", JSON.stringify(userObject));
}

const getFromLocation = (state, searchParams) => {
  return state?.from || searchParams?.from || DEFAULT_REDIRECT_URL;
};

const Login = ({ stateCode, isUserRegistered = true }) => {
  const { t } = useTranslation();
  const location = useLocation();
  const { path, url } = useRouteMatch();
  const history = useHistory();
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [isOtpValid, setIsOtpValid] = useState(true);
  const [tokens, setTokens] = useState(null);
  const [params, setParmas] = useState(isUserRegistered ? {} : location?.state?.data);
  const [errorTO, setErrorTO] = useState(null);
  const searchParams = Digit.Hooks.useQueryParams();

  useEffect(() => {
    let errorTimeout;
    if (error) {
      if (errorTO) {
        clearTimeout(errorTO);
        setErrorTO(null);
      }
      errorTimeout = setTimeout(() => {
        setError("");
      }, 5000);
      setErrorTO(errorTimeout);
    }
    return () => {
      errorTimeout && clearTimeout(errorTimeout);
    };
  }, [error]);

  useEffect(() => {
    if (!user) {
      return;
    }
    console.log("GETUSERDA",user);
    Digit.SessionStorage.set("citizen.userRequestObject", user);
    Digit.UserService.setUser(user);
    setCitizenDetail(user?.info, user?.access_token, stateCode)
    const redirectPath = location.state?.from || DEFAULT_REDIRECT_URL;
    history.replace(redirectPath);
  }, [user]);

  const stepItems = useMemo(() =>
    loginSteps.map(
      (step) => {
        const texts = {};
        for (const key in step.texts) {
          texts[key] = t(step.texts[key]);
        }
        return { ...step, texts };
      },
      [loginSteps]
    )
  );

  const getUserType = () => Digit.UserService.getType();

  const handleOtpChange = (otp) => {
    setParmas({ ...params, otp });
  };

  const handleMobileChange = (event) => {
    const { value } = event.target;
    if (value.length <= 10) {
      setParmas({ ...params, mobileNumber: value });
    }
  };

  const selectMobileNumber = async (mobileNumber) => {
    setParmas({ ...params, ...mobileNumber });
    const data = {
      ...mobileNumber,
      tenantId: stateCode,
      userType: getUserType(),
    };
    if (isUserRegistered) {
      const [res, err] = await sendOtp({ otp: { ...data, ...TYPE_LOGIN } });
      if (!err) {
        history.replace(`${path}/otp`, { from: getFromLocation(location.state, searchParams), role: location.state?.role });
        return;
      } else {
        if (!(location.state && location.state.role === 'FSM_DSO')) {
          history.push(`/digit-ui/citizen/register/name`, { from: getFromLocation(location.state, searchParams), data: data });
        }
      }
      if (location.state?.role) {
        setError(location.state?.role === "FSM_DSO" ? t("ES_ERROR_DSO_LOGIN") : "User not registered.");
      }
    } else {
      const [res, err] = await sendOtp({ otp: { ...data, ...TYPE_REGISTER } });
      if (!err) {
        history.replace(`${path}/otp`, { from: getFromLocation(location.state, searchParams) });
        return;
      }
    }
  };

  const selectName = async (name) => {
    const data = {
      ...params,
      tenantId: stateCode,
      userType: getUserType(),
      ...name
    };
    setParmas({ ...params, ...name });
    const [res, err] = await sendOtp({ otp: { ...data, ...TYPE_REGISTER } });
    if (res) {
      history.replace(`${path}/otp`, { from: getFromLocation(location.state, searchParams) });
    }

  };

  const selectOtp = async () => {
    try {
      setIsOtpValid(true);
      const { mobileNumber, otp, name } = params;
      if (isUserRegistered) {
        const requestData = {
          username: mobileNumber,
          password: otp,
          tenantId: stateCode,
          userType: getUserType(),
        };

        const { ResponseInfo, UserRequest: info, ...tokens } = await Digit.UserService.authenticate(requestData);

        if (location.state?.role) {
          const roleInfo = info.roles.find((userRole) => userRole.code === location.state.role);
          if (!roleInfo || !roleInfo.code) {
            setError(t("ES_ERROR_USER_NOT_PERMITTED"));
            setTimeout(() => history.replace(DEFAULT_REDIRECT_URL), 5000);
            return;
          }
        }
        if (window?.globalConfigs?.getConfig("ENABLE_SINGLEINSTANCE")) {
          info.tenantId = Digit.ULBService.getStateId();
        }
        console.log("INFOTOK",info,tokens);
        setUser({ info, ...tokens });
      } else if (!isUserRegistered) {
        const requestData = {
          name,
          username: mobileNumber,
          otpReference: otp,
          tenantId: stateCode,
          mobileNumber: mobileNumber,
        };

        const { ResponseInfo, UserRequest: info, ...tokens } = await Digit.UserService.registerUser(requestData, stateCode);

        if (window?.globalConfigs?.getConfig("ENABLE_SINGLEINSTANCE")) {
          info.tenantId = Digit.ULBService.getStateId();
        }

        

        setUser({ info, ...tokens });
      }
    } catch (err) {
      setIsOtpValid(false);
    }
  };

  const resendOtp = async () => {
    const { mobileNumber } = params;
    const data = {
      mobileNumber,
      tenantId: stateCode,
      userType: getUserType(),
    };
    if (!isUserRegistered) {
      const [res, err] = await sendOtp({ otp: { ...data, ...TYPE_REGISTER } });
    } else if (isUserRegistered) {
      const [res, err] = await sendOtp({ otp: { ...data, ...TYPE_LOGIN } });
    }
  };

  const sendOtp = async (data) => {
    try {
      const res = await Digit.UserService.sendOtp(data, stateCode);
      return [res, null];
    } catch (err) {
      return [null, err];
    }
  };

  return (
    <Switch>
      <AppContainer>
        <BackButton />
        <Route path={`${path}`} exact>
          <SelectMobileNumber
            onSelect={selectMobileNumber}
            config={stepItems[0]}
            mobileNumber={params.mobileNumber || ""}
            onMobileChange={handleMobileChange}
            showRegisterLink={isUserRegistered && !location.state?.role}
            t={t}
          />
        </Route>
        <Route path={`${path}/otp`}>
          <SelectOtp
            config={{ ...stepItems[1], texts: { ...stepItems[1].texts, cardText: `${stepItems[1].texts.cardText} ${params.mobileNumber || ""}` } }}
            onOtpChange={handleOtpChange}
            onResend={resendOtp}
            onSelect={selectOtp}
            otp={params.otp}
            error={isOtpValid}
            t={t}
          />
        </Route>
        <Route path={`${path}/name`}>
          <SelectName config={stepItems[2]} onSelect={selectName} t={t} />
        </Route>
        {error && <Toast error={true} label={error} onClose={() => setError(null)} />}
      </AppContainer>
    </Switch>
  );
};

export default Login;
