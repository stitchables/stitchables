import {
  Box, Button,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Input, InputAdornment,
  InputLabel, MenuItem, OutlinedInput,
  Radio,
  RadioGroup, Select, SelectChangeEvent, TextField, Typography
} from "@mui/material";
import {useState} from "react";
import CreateIcon from "@mui/icons-material/Create";
import {getContractConfigByAddress} from "../utils/contractInfoHelper";

interface Props {
  baseUrl: string
}

const EmbroideryDownloader = ({ baseUrl }: Props) => {
  const [fileFormat, setFileFormat] = useState('pes')
  const [units, setUnits] = useState('mm')
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)

  return (
    <Box sx={{width: "100%"}}>
      <FormControl fullWidth={true} sx={{marginY: "10px"}}>
        <InputLabel id="file-format-label">File Format</InputLabel>
        <Select
          labelId="file-format-label"
          value={fileFormat}
          label="File Format"
          onChange={(e) => setFileFormat(e.target.value)}
        >
          <MenuItem value={"pes"}>.pes</MenuItem>
          <MenuItem value={"dst"}>.dst</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth={true} sx={{marginY: "10px"}}>
        <InputLabel id="units-label">Units</InputLabel>
        <Select
          labelId="units-label"
          value={units}
          label="Units"
          onChange={(e) => setUnits(e.target.value)}
        >
          <MenuItem value={"mm"}>mm</MenuItem>
          <MenuItem value={"in"}>in</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth={true} sx={{marginY: "10px"}}>
        <TextField
          type="number"
          label="Width"
          onChange={(e) => setWidth(Number(e.target.value))}
          InputProps={{
            endAdornment: <InputAdornment position="end">{units}</InputAdornment>,
          }}
        />
      </FormControl>

      <FormControl fullWidth={true} sx={{marginY: "10px"}}>
        <TextField
          type="number"
          label="Height"
          onChange={(e) => setHeight(Number(e.target.value))}
          InputProps={{
            endAdornment: <InputAdornment position="end">{units}</InputAdornment>,
          }}
        />
      </FormControl>


      <Box sx={{
        display: "flex",
        justifyContent: "center",
        marginY: "10px"
      }}>
        <Button
          variant={"outlined"}
          onClick={() => {
            let widthMM = width
            let heightMM = height
            if (units === "in") {
              widthMM = 25.4 * width
              heightMM = 25.4 * height
            }
            window.open(`${baseUrl}.${fileFormat}?width_mm=${Math.floor(widthMM)}&height_mm=${Math.floor(heightMM)}`)
          }}
        >
          <Typography fontSize="14px" display={["none", "none", "block"]}>
            Download
          </Typography>
        </Button>
      </Box>
    </Box>
  )
}

export default EmbroideryDownloader
