import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import { useAuthenticationState } from "../../context";
import { userHasAccess } from "../../utils/UserAccess";
import { useOperatorData } from "../../layouts/list/useOperatorData";

type OperatorSelectorProps = {
  operatorId: string;
  onOperatorChanged: (id: string) => void;
};

export const OperatorSelector = ({
  operatorId,
  onOperatorChanged,
}: OperatorSelectorProps) => {
  const authState = useAuthenticationState();
  const { userList } = useOperatorData("OPERATOR");

  return userHasAccess(authState.role, ["ADMIN", "CONTROLLER"]) ? (
    <FormControl sx={{ width: "30ch", marginTop: 2 }}>
      <InputLabel id="schedule-operator-id-label">نام اپراتور</InputLabel>
      <Select
        // disabled={auth.role === "CONTROLLER"}
        labelId="schedule-operator-id-label"
        id="operatorId"
        name="operatorId"
        label="نام اپراتور"
        value={operatorId}
        onChange={(e) => onOperatorChanged(e.target.value)}
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
