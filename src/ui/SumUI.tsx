import { Box, makeStyles, Typography } from "@material-ui/core";
import * as U from "../util/Util";

const defaultProps = {
  borderColor: "text.primary",
  m: 1,
  border: 14,
};

const useStyles = makeStyles((theme) => ({
  box: {
    // padding: 10,
    // height: 200,
    borderWidth: 5,
    border: 5,
    padding: 20,
    // display: "flex",
    // flexDirection: "row",
    // justifyContent: "center",
  },
}));

export const SumUI: React.FC<any> = ({ sum }) => {
  const classes = useStyles();

  return (
    <Box border={6} className={classes.box}>
      {/* <Box border={14}> */}
      <Typography variant="h3">
        {U.formatNumComma(sum)}
        {/* <TextField size="medium" aria-readonly={true} value={sum} /> */}
      </Typography>
    </Box>
  );
};
