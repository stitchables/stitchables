import { Box, Link, Typography } from "@mui/material"
import Connect from "components/Connect"
import {useContext} from "react";
import {BackgroundContext} from "./Providers";
import CustomTypography from "./CustomTypography";

let items = [
  {
    label: "Stitchables",
    url: "/",
    enabled: true
  },
  {
    label: "Collection",
    url: "/collection",
    enabled: true
  },
  {
    label: "Events",
    url: "/events",
    enabled: true
  },
  {
    label: "About",
    url: "/about",
    enabled: true
  }
]

const Header = () => {
  const backgroundConfig = useContext(BackgroundContext)
  return (
    <Box>
      <Box sx={{display: "flex", justifyContent: "space-between", paddingTop: "30px", paddingBottom: "20px"}}>
        <Box sx={{display: "flex"}}>
          {items.map((item) => (
            <Link
              key={item.label}
              href={item.url}
              sx={{
                paddingRight: "25px",
                pointerEvents: item.enabled ? "auto" : "none",
                textDecoration: "none",
                '&:hover': {
                  textDecoration: "none"
                }
            }}>
              <CustomTypography text={item.label} fontSize={"25px"}/>
            </Link>
          ))}
        </Box>
        <Box sx={{display: "block"}}>
          <Typography component={'span'}>
            <Connect isMobile={false}/>
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}

export default Header
