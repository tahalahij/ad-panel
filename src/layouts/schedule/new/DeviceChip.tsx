import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import { Device } from "../../../types/DeviceType";

type DeviceChipProps = {
  selected: string[];
  devices: Device[];
};

export function DeviceChip(props: DeviceChipProps) {
  const { selected, devices } = props;

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
      {selected.map((value) => (
        <Chip key={value} label={devices.find((d) => d._id === value)?.name || ''} />
      ))}
    </Box>
  );
}
