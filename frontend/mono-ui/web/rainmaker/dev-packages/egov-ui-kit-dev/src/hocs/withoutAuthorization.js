import React from "react";
import { connect } from "react-redux";
// import AppBar from "@material-ui/core/AppBar";
import "./index.css";
import { getLocale, getTenantId, getUserInfo, setStoredModulesList, setLocale } from "egov-ui-kit/utils/localStorageUtils";
import digitLogo from "egov-ui-kit/assets/images/logo_black.png";
import Label from "egov-ui-kit/utils/translationNode";
import { isPublicSearch } from "egov-ui-framework/ui-utils/commons";
import get from "lodash/get";
import { fetchLocalizationLabel, setLocalizationLabels } from "egov-ui-kit/redux/app/actions";
import { DropDown, AppBar } from "components";
import { getQueryArg } from "egov-ui-kit/utils/commons";
import Toolbar from "material-ui/Toolbar";
import msevaLogo from "egov-ui-kit/assets/images/logo_black.png";
import { getModuleName } from "../utils/commons";

const getUlbGradeLabel = (ulbGrade) => {
  if (ulbGrade) {
    let ulbWiseHeaderName = ulbGrade.toUpperCase();
    if (ulbWiseHeaderName.indexOf(" ") > 0) {
      ulbWiseHeaderName = ulbWiseHeaderName.split(" ").join("_");
    }
    return "ULBGRADE" + "_" + ulbWiseHeaderName;
  }
};

const withoutAuthorization = (redirectionUrl) => (Component) => {
  class Wrapper extends React.Component {
    state = {
      languageSelected: getLocale(),
    };
    style = {
      baseStyle: {
        background: "#ffffff",
        height: "65px",
        marginRight: "30px",
        width: "98px",
        marginBottom: "24px",
      },
      label: {
        color: "#5F5C57",
        fontSize: "12px",
        paddingRight: "0px",
      },
      arrowIconStyle: {
        marginTop: "7px",
        marginLeft: "10px",
      },
      iconStyle: {
        marginRight: "30px",
      },
      listStyle: {
        display: "block",
      },
      listInnerDivStyle: {
        padding: "10px",
        display: "flex",
        alignItems: "center",
      },
      baseTenantStyle: {
        background: "#0572bb",
        height: "65px",
        marginRight: "30px",
        width: "120px",
        marginBottom: "24px",
      },
      titleStyle: { fontSize: "20px", fontWeight: 500 },
      headerStyle: {
        position: "absolute",
        width: "100%"
      }
    };

    componentDidMount() {
      if (this.props.authenticated && !isPublicSearch()) {
        if(!this.props.isOpenLink){
          this.props.history.push(redirectionUrl);
        }
      }
      if(isPublicSearch()){
        const locale=getQueryArg(window.location.href, "locale") || 'en_IN';
        setLocale(locale);
        this.onLanguageChange(locale);
      }
    }

    onLanguageChange = (event, index, value) => {
      //const {setRote} = this.props;
      this.setState({ languageSelected: value });
      let tenantId = getTenantId();

      if (process.env.REACT_APP_NAME === "Citizen") {
        const tenantInfo = getQueryArg(window.location.href, "tenantId");
        const userInfo = JSON.parse(getUserInfo());
        tenantId = userInfo && userInfo.permanentCity;
        tenantId = tenantInfo ? tenantInfo : tenantId;
      }
      var resetList=[];
      var newList =JSON.stringify(resetList);
      setStoredModulesList(newList);
      let locale= getLocale();
      let resultArray=[];
      setLocalizationLabels(locale, resultArray);
      this.props.fetchLocalizationLabel(value, tenantId, tenantId);
    };


    checkForPublicSeach = () => {
      return isPublicSearch();
    }

    render() {
      const { isOpenLink, ulbLogo, defaultTitle, ulbName, hasLocalisation, languages, ...rest } = this.props;
      const { languageSelected } = this.state;
      const isPublicSearch = this.checkForPublicSeach();
      const logoClassName = isPublicSearch ? "citizen-header-logo public-search-logo" : "citizen-header-logo"
      const { style } = this;
      return (
        <div>
          {/* FIXME need to move appbar as new component */}
          {isOpenLink ? (
            <div className="rainmaker-header-cont" style={isPublicSearch ? style.headerStyle : { position: "relative" }}>
              <div style={{ lineHeight: "64px" }}>
                <AppBar
                  className="rainmaker-header"
                  title={
                    <div className="citizen-header-logo-label">
                      <div className={logoClassName}>
                        <img src={ulbLogo ? ulbLogo : pbLogo} onError={(event) => event.target.setAttribute("src", pbLogo)} />
                      </div>
                      {!isPublicSearch && <div className="rainmaker-displayInline">
                        <Label
                          containerStyle={{ marginLeft: "10px" }}
                          className="screenHeaderLabelStyle appbar-municipal-label"
                          label={ulbName && `TENANT_TENANTS_${ulbName.toUpperCase().replace(/[.]/g, "_")}`}
                        />
                        <Label
                          containerStyle={{ marginLeft: "4px" }}
                          className="screenHeaderLabelStyle appbar-municipal-label"
                          label={defaultTitle}
                        />
                      </div>}
                    </div>
                  }
                  titleStyle={style.titleStyle}
                  {...rest}
                >
                  <Toolbar className="app-toolbar" style={{ padding: "0px", height: "64px", background: "#ffffff" }}>
                    {hasLocalisation && (
                      <div className="userSettingsContainer">
                        <DropDown
                          onChange={this.onLanguageChange}
                          listStyle={style.listStyle}
                          style={style.baseStyle}
                          labelStyle={style.label}
                          dropDownData={languages}
                          value={languageSelected}
                          underlineStyle={{ borderBottom: "none" }}
                        />
                      </div>
                    )}
                  </Toolbar>
                  {/* <div className="appbar-right-logo">
                    <img src={digitLogo} />
                  </div> */}
                </AppBar>
              </div>
              <div>
                <Component {...this.props} />
              </div>
            </div>
          ) : (
            <Component {...this.props} />
          )}
          
        </div>
      );
    }
  }
  const mapStateToProps = (state) => {
    const { authenticated } = state.auth;
    let { stateInfoById } = state.common || [];
    let hasLocalisation = false;
    let defaultUrl = process.env.REACT_APP_NAME === "Citizen" ? "/user/register" : "/user/login";
    let isOpenLink = window.location.pathname.includes("openlink") || window.location.pathname.includes("withoutAuth");
    const cities = state.common.cities || [];
    const tenantId = getTenantId() || process.env.REACT_APP_DEFAULT_TENANT_ID;
    const userTenant = cities && cities.filter((item) => item.code === tenantId);
    const ulbGrade = userTenant && get(userTenant[0], "city.ulbGrade");
    const ulbName = userTenant && get(userTenant[0], "code");
    const defaultTitle = ulbGrade && getUlbGradeLabel(ulbGrade);
    const ulbLogo = isPublicSearch() ? msevaLogo : (userTenant.length > 0 ? get(userTenant[0], "logoId") : "");
    if (stateInfoById && stateInfoById.length > 0) {
      hasLocalisation = stateInfoById[0].hasLocalisation;
      defaultUrl = stateInfoById[0].defaultUrl;
    }
    let languages = get(stateInfoById, "0.languages", []);

    return { authenticated, hasLocalisation, defaultUrl, isOpenLink, ulbLogo, ulbName, defaultTitle, languages };
  };
  const mapDispatchToProps = (dispatch) => {
    return {
      // logout: () => dispatch(logout()),
      fetchLocalizationLabel: (locale, tenants, tenant) => dispatch(fetchLocalizationLabel(locale, tenants, tenant)),
      // updateActiveRoute: (routepath, menuName) => dispatch(updateActiveRoute(routepath, menuName)),
    };
  };

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(Wrapper);
};

export default withoutAuthorization;
