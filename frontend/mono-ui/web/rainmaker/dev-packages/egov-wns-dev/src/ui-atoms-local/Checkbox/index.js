import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import "./index.css";

const styles = {
  root: {
    color: "#db251c",
    "&$checked": {
      color: "#db251c"
    }
  },
  checked: {}
};

class CheckboxLabels extends React.Component {
  state = {
    checkedG: true
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  render() {
    const { classes, content } = this.props;

    return (
      <FormGroup row>
        <FormControlLabel
          classes={{ label: "checkbox-label" }}
          control={
            <Checkbox
              checked={this.state.checkedG}
              onChange={this.handleChange("checkedG")}
              value="checkedG"
              classes={{
                root: classes.root,
                checked: classes.checked
              }}
            />
          }
          label={content}
        />
      </FormGroup>
    );
  }
}

CheckboxLabels.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CheckboxLabels);
