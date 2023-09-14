import {
  Container,
  Box
} from "@mui/material"

import Header from "components/Header"
import {useContext} from "react";
import { BackgroundContext } from "components/Providers";

interface Props {
  children: React.ReactNode
}

const Page = ({ children }: Props) => {
  const backgroundConfig = useContext(BackgroundContext)
  return (
    <Box sx={{
      paddingX: "40px",
      display: "flex",
      flexDirection: "column",
      minWidth: "100vw",
      minHeight: "100vh",
      backgroundImage: `url(${process.env.PUBLIC_URL}/media/backgrounds/bg${backgroundConfig.index}.jpg)`,
      backgroundRepeat: "repeat",
      backgroundSize: "1000px"
    }}>
      <Header/>
      {children}
    </Box>
  )
}

export default Page
