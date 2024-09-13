import React from "react";
import "./spinner.scss";
import { connect } from "react-redux";

const GlobalSpinner = (props) => {
  const { loader, theme } = props;
  return loader ? (
    <div className="global-loader">
      <div className={theme === "dark" ? "lds-ripple" : "lds-ripple-light"}>
        <div></div>
        <div></div>
      </div>
    </div>
  ) : null;
};

const mapStateToProps = (state) => ({
  loader: state.general.loader,
});

export default connect(mapStateToProps, null)(GlobalSpinner);
