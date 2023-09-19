import Page from "components/Page"
import {Box, Typography} from "@mui/material"
import {useContext} from "react";
import {BackgroundContext} from "../components/Providers";

const PrivacyPolicyPage = () => {
  const backgroundConfig = useContext(BackgroundContext)
  return (
    <Page>
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
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
          COMING SOON
        </Typography>
      </Box>
    </Page>
  )
}

export default PrivacyPolicyPage
