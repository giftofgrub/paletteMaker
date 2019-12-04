import sizes from './sizes';
import bg from './bg.svg';

export default {
  root: {
    height: "100vh",
    display: "flex",
    alignItems: "flex-start",
    overflow: "scroll",
    justifyContent: "center",
    backgroundColor: "#0f31aa",
    backgroundImage: `url(${bg})`,
    /* background by SVGBackgrounds.com */
  },
  heading: {
    fontSize: "2rems"
  },
  container: {
    width: "50%",
    display: "flex",
    alignItems:"flex-start",
    flexDirection: "column",
    flexWrap: "wrap",
    [sizes.down("xl")]: {
      width: "80%"
    },
    [sizes.down("xl")]: {
      width: "75%"
    },
  },
  nav: {
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
    color: "white",
    alignItems: "center",
    "& a": {
      color: "white",
    }
  },
  palettes: {
    boxSizing: "border-box",
    width: "100%",
    display: "grid",
    gridTemplateColumns: "repeat(3,30%)",
    gridGap: "1.5rem",
    [sizes.down("md")]: {
      gridTemplateColumns: "repeat(2,50%)"
    },
    [sizes.down("xs")]: {
      gridTemplateColumns: "repeat(1,100%)",
      gridGap: "1rem",
    }
  }
}