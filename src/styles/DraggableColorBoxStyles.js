import sizes from './sizes';
import chroma from 'chroma-js';

const styles = {
  root: {
    width: "20%",
    height: "45.5%",
    margin: "0 auto",
    display: "inline-block",
    position: "relative",
    cursor: "pointer",
    marginBottom: "-3.5px",
    "&:hover svg": {
      color: "white",
      transform: "scale(1.5)"
    },
    [sizes.down("lg")] : {
      width: "25%",
      height: "36%"
    },
    [sizes.down("md")] : {
      width: "50%",
      height: "18%"
    },
    [sizes.down("sm")] : {
      width: "100%",
      height: "9%"
    }
  },
  boxContent: {
    position: "absolute",
    width: "100%",
    left: "0px",
    bottom: "0px",
    padding: "10px",
    color: 
      props => 
        chroma(props.color).luminance() <= 0.08 ? 
          "rgba(255,255,255,0.8)" : 
          "rgba(0,0,0,0.6)",
    textTransform: "uppercase",
    fontSize: "12px",
    display: "flex",
    justifyContent: "space-between",
  },
  deleteIcon: {
    color: "rgba(0, 0, 0, 0.5)",
    transition: "all 0.3s ease-in-out"
  },
}

export default styles;