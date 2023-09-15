import { Box, Link, Typography } from "@mui/material"
import CustomTypography from "./CustomTypography";
import {Chat, GitHub, Instagram, Twitter} from "@mui/icons-material";
import {useContext} from "react";
import {BackgroundContext} from "./Providers";

const Footer = () => {
  const backgroundConfig = useContext(BackgroundContext)
  return (
    <Box
      sx={{
        paddingY: "20px",
        display: "flex",
        alignItems: "center"
      }}
    >

      <Box
        sx={{
          width: "33.33%",
          display: "flex",
          justifyContent: "flex-start",
          gap: "20px"
        }}
      >
        <Link
          href={"termsOfService"}
          sx={{
            textDecoration: "none",
            '&:hover': {
              textDecoration: "none"
            }
          }}
        >
          <CustomTypography text={"Terms of Service"} fontSize={"18px"}/>
        </Link>
        <Link
          href={"privacyPolicy"}
          sx={{
            textDecoration: "none",
            '&:hover': {
              textDecoration: "none"
            }
          }}
        >
          <CustomTypography text={"Privacy Policy"} fontSize={"18px"}/>
        </Link>
      </Box>

      <Box
        sx={{
          width: "33.33%",
          display: "flex",
          justifyContent: "center",
          gap: "20px"
        }}
      >

        <Link
          href={"https://www.instagram.com/stitchables.io/"}
          target={"_blank"}
          sx={{
            textDecoration: "none",
            '&:hover': {
              textDecoration: "none"
            }
          }}
        >
          <Instagram
            sx={{
              color: backgroundConfig.colors.primary,
              boxShadow: `0px 0px 10px 1px ${backgroundConfig.colors.shadowPrimary}66, 0px 0px 10px 1px ${backgroundConfig.colors.shadowPrimary}66 inset`,
              '&:hover': {
                boxShadow: `0px 0px 10px 1px ${backgroundConfig.colors.shadowSecondary}66, 0px 0px 10px 1px ${backgroundConfig.colors.shadowSecondary}66 inset`,
              }
            }}
          />
        </Link>

        <Link
          href={"https://twitter.com/stitchablesio"}
          target={"_blank"}
          sx={{
            textDecoration: "none",
            '&:hover': {
              textDecoration: "none"
            }
          }}
        >
          <Twitter
            sx={{
              color: backgroundConfig.colors.primary,
              boxShadow: `0px 0px 10px 1px ${backgroundConfig.colors.shadowPrimary}66, 0px 0px 10px 1px ${backgroundConfig.colors.shadowPrimary}66 inset`,
              '&:hover': {
                boxShadow: `0px 0px 10px 1px ${backgroundConfig.colors.shadowSecondary}66, 0px 0px 10px 1px ${backgroundConfig.colors.shadowSecondary}66 inset`,
              }
            }}
          />
        </Link>

        <Link
          href={"https://github.com/stitchables"}
          target={"_blank"}
          sx={{
            textDecoration: "none",
            '&:hover': {
              textDecoration: "none"
            }
          }}
        >
          <GitHub
            sx={{
              color: backgroundConfig.colors.primary,
              boxShadow: `0px 0px 10px 1px ${backgroundConfig.colors.shadowPrimary}66, 0px 0px 10px 1px ${backgroundConfig.colors.shadowPrimary}66 inset`,
              '&:hover': {
                boxShadow: `0px 0px 10px 1px ${backgroundConfig.colors.shadowSecondary}66, 0px 0px 10px 1px ${backgroundConfig.colors.shadowSecondary}66 inset`,
              }
            }}
          />
        </Link>

        <Link
          href={"https://discord.gg/7s4rNHwPH"}
          target={"_blank"}
          sx={{
            textDecoration: "none",
            '&:hover': {
              textDecoration: "none"
            }
          }}
        >
          <Chat
            sx={{
              color: backgroundConfig.colors.primary,
              boxShadow: `0px 0px 10px 1px ${backgroundConfig.colors.shadowPrimary}66, 0px 0px 10px 1px ${backgroundConfig.colors.shadowPrimary}66 inset`,
              '&:hover': {
                boxShadow: `0px 0px 10px 1px ${backgroundConfig.colors.shadowSecondary}66, 0px 0px 10px 1px ${backgroundConfig.colors.shadowSecondary}66 inset`,
              }
            }}
          />
        </Link>
      </Box>

      <Box
        sx={{
          width: "33.33%",
          display: "flex",
          justifyContent: "flex-end"
        }}
      >
        <Link
          href={"https://www.artblocksengine.io/"}
          target={"_blank"}
          sx={{
            textDecoration: "none",
            '&:hover': {
              textDecoration: "none"
            }
          }}
        >
          <CustomTypography text={"Art Blocks Engine"} fontSize={"18px"}/>
        </Link>
      </Box>

    </Box>
  )
}

export default Footer
