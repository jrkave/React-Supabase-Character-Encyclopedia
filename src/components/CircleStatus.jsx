import { Fragment } from "react";
import '../styles/CircleStatus.css';

const CircleStatus = ({ status }) => {
    let color;

    // Set color of circle depending on status
    if (status === 'Unknown') {
        color = 'lightgray';
    } else if (status === 'Dead') {
        color = 'red';
    } else {
        color = '#00FF00';
    }

    const styles = { backgroundColor: color };
  
    return color ? (
      <Fragment>
        <span className="colored-circle" style={styles} />
      </Fragment>
    ) : null;
  };
  
  export default CircleStatus;