import Page from "components/Page"
import {Box, Typography} from "@mui/material"
import {useContext} from "react";
import {BackgroundContext} from "../components/Providers";
import CustomTypography from "../components/CustomTypography";

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
        <CustomTypography text={"COMING SOON"} fontSize={"24px"}/>
      </Box>
    </Page>
  )
}

export default PrivacyPolicyPage
