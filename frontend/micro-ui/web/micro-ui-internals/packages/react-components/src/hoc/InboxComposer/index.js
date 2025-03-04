import React, { Fragment, useCallback, useEffect, useMemo, useReducer, useState } from "react"
import InboxLinks from "../../atoms/InboxLinks"
import Table from "../../atoms/Table"
import { SearchField, SearchForm } from "../../molecules/SearchForm"
import { FilterForm, FilterFormField } from "../../molecules/FilterForm"
import SubmitBar from "../../atoms/SubmitBar"
import { useTranslation } from "react-i18next"
import Card from "../../atoms/Card"
import { Loader } from "../../atoms/Loader"
import { useForm, Controller } from "react-hook-form";
import SearchAction from "../../molecules/SearchAction"
import FilterAction from "../../molecules/FilterAction"
import SortAction from "../../molecules/SortAction"
import DetailsCard from "../../molecules/DetailsCard"
import PopUp from "../../atoms/PopUp"
import { CloseSvg } from "../../atoms/svgindex"
import MobileComponentDirectory from "./MobileComponentDirectory"

const InboxComposer = ({
    isInboxLoading,
    PropsForInboxLinks,
    SearchFormFields,
    searchFormDefaultValues,
    onSearchFormSubmit,
    onSearchFormReset,
    resetSearchFormDefaultValues,
    FilterFormFields,
    filterFormDefaultValues,
    propsForInboxTable,
    propsForInboxMobileCards,
    onFilterFormSubmit,
    onFilterFormReset,
    resetFilterFormDefaultValues,
    onMobileSortOrderData,
    sortFormDefaultValues,
    onSortFormReset,
    formState: inboxFormState,
}) => {

    const { t } = useTranslation()

    // console.log("log123...",JSON.stringify(FilterFormFields ))

    function activateModal(state, action) {
        switch (action.type) {
            case "set":
                return action.payload
            case "remove":
                return false
            default:
                break;
        }
    }

    const [currentlyActiveMobileModal, setActiveMobileModal] = useReducer(activateModal, false)

    const closeMobilePopupModal = () => {
        setActiveMobileModal({ type: "remove" })
    }

    const { register: registerSearchFormField, control: controlSearchForm, handleSubmit: handleSearchFormSubmit, setValue: setSearchFormValue, getValues: getSearchFormValue, reset: resetSearchForm, formState: searchFormState, clearErrors: clearSearchFormErrors } = useForm({
        defaultValues: { ...searchFormDefaultValues }
    })

    const { register: registerFilterFormField, control: controlFilterForm, handleSubmit: handleFilterFormSubmit, setValue: setFilterFormValue, getValues: getFilterFormValue, reset: resetFilterForm } = useForm({
        defaultValues: { ...filterFormDefaultValues }
    })

    const onResetFilterForm = () => {
        onFilterFormReset(setFilterFormValue)
    }

    const onResetSearchForm = () => {
        onSearchFormReset(setSearchFormValue)
        clearSearchFormErrors()
    }

    useEffect(() => {
        if (resetFilterForm && resetSearchForm && inboxFormState) {
            resetFilterForm(inboxFormState?.filterForm)
            resetSearchForm(inboxFormState?.searchForm)
        }
    }, [inboxFormState, resetSearchForm, resetFilterForm])

    const isMobile = window.Digit.Utils.browser.isMobile();
    const [applicationStatus, setApplicationStatus] = useState("");
    const [serviceType, setServiceType] = useState("");

    if (isMobile) {

        const CurrentMobileModalComponent = useCallback(({ ...props }) => currentlyActiveMobileModal ? MobileComponentDirectory[currentlyActiveMobileModal]({ ...props }) : null, [currentlyActiveMobileModal])

        const propsForCurrentMobileModalComponent = {
            SearchFormFields,
            FilterFormFields,
            registerSearchFormField,
            searchFormState,
            handleSearchFormSubmit,
            onResetSearchForm,
            registerFilterFormField,
            onResetFilterForm,
            controlFilterForm,
            handleFilterFormSubmit,
            setFilterFormValue,
            getFilterFormValue,
            closeMobilePopupModal,
            onSearchFormSubmit,
            onFilterFormSubmit,
            onMobileSortOrderData,
            sortFormDefaultValues,
            onSortFormReset,
            MobileSortFormValues: propsForInboxMobileCards?.MobileSortFormValues,
            t,
        }


        return <div className="InboxComposerWrapper">
            {/* TODO fix design for card */}
            {/* <InboxLinks {...PropsForInboxLinks} /> */}
            <div className="searchBox">
                <SearchAction text={t("ES_COMMON_SEARCH")} handleActionClick={() => setActiveMobileModal({ type: "set", payload: "SearchFormComponent" })} />
                <FilterAction text={t("ES_COMMON_FILTER")} handleActionClick={() => setActiveMobileModal({ type: "set", payload: "FilterFormComponent" })} />
                <SortAction text={t("COMMON_TABLE_SORT")} handleActionClick={() => setActiveMobileModal({ type: "set", payload: "SortFormComponent" })} />
            </div>
            {currentlyActiveMobileModal ? <PopUp>
                <CurrentMobileModalComponent {...propsForCurrentMobileModalComponent} />
            </PopUp> : null}
            {isInboxLoading ? <Loader /> : <DetailsCard {...propsForInboxMobileCards} />}
        </div>
    }
    return <div className="InboxComposerWrapper">
        <InboxLinks {...PropsForInboxLinks} />
        <SearchForm onSubmit={onSearchFormSubmit} handleSubmit={handleSearchFormSubmit} id="search-form" className="rm-mb form-field-flex-one" >
            <SearchFormFields registerRef={registerSearchFormField} searchFormState={searchFormState} {...{ controlSearchForm }} />
            <div className="SubmitAndClearAllContainer">
                <SearchField className="submit">
                    <SubmitBar label={t("ES_COMMON_SEARCH")} submit form="search-form" />
                    <p onClick={onResetSearchForm}>{t(`ES_COMMON_CLEAR_SEARCH`)}</p>
                </SearchField>
            </div>
        </SearchForm>
        <FilterForm onSubmit={() => onFilterFormSubmit({
            appliactionType: serviceType,
            status: applicationStatus,
        })} handleSubmit={handleFilterFormSubmit} id="filter-form" onResetFilterForm={onResetFilterForm}>
            <FilterFormFields registerRef={registerFilterFormField} {...{ controlFilterForm, handleFilterFormSubmit, setFilterFormValue, getFilterFormValue, applicationStatus, setApplicationStatus, serviceType, setServiceType }} />

            {/* <SubmitBar label={t("ES_COMMON_SEARCH")} submit form="filter-form"/> */}
        </FilterForm>
        {isInboxLoading ? <Loader /> : <div>
            {propsForInboxTable?.data?.length < 1 ? <Card className="margin-unset text-align-center">
                {propsForInboxTable.noResultsMessage ? t(propsForInboxTable.noResultsMessage) : t("CS_MYAPPLICATIONS_NO_APPLICATION")}
            </Card>
                : <Table
                    t={t}
                    {...propsForInboxTable}
                />}
        </div>}
    </div>
}

export default InboxComposer