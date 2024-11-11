import { Typography } from "@mui/material";
import {useContext} from "react";
import {BackgroundContext} from "./Providers";

interface Props {
  text: string
  fontSize: string
}

const CustomTypography = ({text, fontSize}: Props) => {
  const backgroundConfig = useContext(BackgroundContext)
  return (
    <Typography
      color={backgroundConfig.colors.primary}
      sx={{
        fontSize: {fontSize},
        textShadow: `${backgroundConfig.colors.shadowPrimary} 0px 0px 17px, ${backgroundConfig.colors.shadowPrimary} 0px 0px 20px`,
        '&:hover': {
          textShadow: `${backgroundConfig.colors.shadowSecondary} 0px 0px 5px`,
        }
      }}
    >
      {text}
    </Typography>
  )
}

export default CustomTypography
