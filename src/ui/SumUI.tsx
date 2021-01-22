import { TextField } from "@material-ui/core";

export const SumUI: React.FC<any> = ({ sum }) => {
  return <TextField size="medium" aria-readonly={true} value={sum} />;
};
