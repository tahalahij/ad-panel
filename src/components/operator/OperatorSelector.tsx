import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import { useAuthenticationState } from "../../context";
import { userHasAccess } from "../../utils/UserAccess";
import { useOperatorData } from "../../layouts/list/useOperatorData";
import { SxProps, Theme } from "@mui/material";

type OperatorSelectorProps = {
  operatorId: string;
  onOperatorChanged?: (id: string) => void;
  onChange?: (event: SelectChangeEvent<string>) => void;
  hasError?: boolean;
  sx?: SxProps<Theme>;
};

export const OperatorSelector = ({
  operatorId,
  onOperatorChanged,
  onChange,
  hasError = false,
  sx = { width: "35ch", marginTop: 2, marginRight: "20px", marginLeft: "20px" },
}: OperatorSelectorProps) => {
  const authState = useAuthenticationState();
  const { userList } = useOperatorData("OPERATOR");

  return userHasAccess(authState.role, ["ADMIN", "CONTROLLER"]) ? (
    <FormControl
      sx={sx}
    >
      <InputLabel id="schedule-operator-id-label">نام اپراتور</InputLabel>
      <Select
        // disabled={auth.role === "CONTROLLER"}
        labelId="schedule-operator-id-label"
        id="operatorId"
        name="operatorId"
        label="نام اپراتور"
        value={operatorId}
        error={hasError}
        onChange={(e) =>
          onChange
            ? onChange(e)
            : onOperatorChanged
            ? onOperatorChanged(e.target.value)
            : {}
        }
      >
        {userList?.map((item) => (
          <MenuItem value={item._id} key={item._id}>
            {item.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  ) : null;
};
