import Page from "components/Page"
import { Typography } from "@mui/material"
import {useContext} from "react";
import {BackgroundContext} from "../components/Providers";

const AboutPage = () => {
  const backgroundConfig = useContext(BackgroundContext)
  return (
    <Page>
      <Typography
        variant={"h1"}
        color={backgroundConfig.colors.primary}
        sx={{
          textShadow: `${backgroundConfig.colors.shadowPrimary} 0px 0px 17px`,
          '&:hover': {
            textShadow: `${backgroundConfig.colors.shadowSecondary} 0px 0px 17px`,
          }
        }}
      >
        ABOUT
      </Typography>
    </Page>
  )
}

export default AboutPage
