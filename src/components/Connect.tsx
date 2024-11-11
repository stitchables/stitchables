import { ConnectButton } from "@rainbow-me/rainbowkit"
import Box from "@mui/material/Box"
import {Button, Fade, Link, Typography} from "@mui/material"
import {useContext, useEffect, useState} from "react";
import {BackgroundContext} from "./Providers";
import CustomTypography from "./CustomTypography";
import {useAccount, useDisconnect} from "wagmi";
import {Close} from "@mui/icons-material";
import EmbroideryDownloader from "./EmbroideryDownloader";
import CustomAccountModal from "./CustomAccountModal";

interface Props {
  isMobile: boolean
}

const Connect = ({ isMobile = false }: Props) => {

  const account = useAccount()

  const backgroundConfig = useContext(BackgroundContext)

  const [openAccount, setOpenAccount] = useState(false)

  useEffect(() => {
    if (!account.isConnected) {
      setOpenAccount(false);
    }
  }, [account.isConnected])

  const customOpenAccountModal = () => {
    setOpenAccount(true);
  }

  return (
    <Box>
      <ConnectButton.Custom>
        {({
            account,
            chain,
            openAccountModal,
            openChainModal,
            openConnectModal,
            authenticationStatus,
            mounted,
          }) => {
          // Note: If your app doesn't use authentication, you
          // can remove all 'authenticationStatus' checks
          const ready = mounted && authenticationStatus !== 'loading';
          const connected =
            ready &&
            account &&
            chain &&
            (!authenticationStatus ||
              authenticationStatus === 'authenticated');

          return (
            <div
              {...(!ready && {
                'aria-hidden': true,
                'style': {
                  opacity: 0,
                  pointerEvents: 'none',
                  userSelect: 'none',
                },
              })}
            >
              {(() => {
                if (!connected) {
                  return (
                    <Link
                      onClick={openConnectModal}
                      underline={"hover"}
                      sx={{
                        textShadow: `${backgroundConfig.colors.shadowPrimary} 0px 0px 17px`,
                        textDecoration: "none",
                        '&:hover': {
                          textDecoration: "none"
                        }
                      }}
                    >
                      <CustomTypography
                        text={"Connect"}
                        fontSize={"25px"}
                      />
                    </Link>
                  );
                }

                if (chain.unsupported) {
                  return (
                    <Link
                      onClick={openChainModal}
                      underline={"hover"}
                      sx={{
                        textShadow: `${backgroundConfig.colors.shadowPrimary} 0px 0px 17px`,
                        textDecoration: "none",
                        '&:hover': {
                          textDecoration: "none"
                        }
                      }}
                    >
                      <CustomTypography
                        text={"Wrong Network"}
                        fontSize={"25px"}
                      />
                    </Link>
                  );
                }

                return (
                    <Link
                      // onClick={openAccountModal}
                      onClick={customOpenAccountModal}
                      underline={"hover"}
                      sx={{
                        justifyContent: "center",
                        textShadow: "#000 1px 0 20px",
                        textDecoration: "none",
                        '&:hover': {
                          textDecoration: "none"
                        }
                      }}
                    >
                      <CustomTypography
                        text={account.displayName}
                        fontSize={"25px"}
                      />
                    </Link>
                );
              })()}
            </div>
          );
        }}
      </ConnectButton.Custom>


      <Fade in={openAccount} timeout={500}>
        <Box
          onClick={(event) => setOpenAccount(false)}
          sx={{
            width: "100%",
            height: "100%",
            position: "fixed",
            top: "0px",
            left: "0px",
            display: openAccount ? "flex" : "none",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            zIndex: "1"
          }}
        >
          <Box
            onClick={ (event) => event.stopPropagation() }
            sx={{
              width: "400px",
              position: "fixed",
              display: openAccount ? "block" : "none",
              backgroundColor: "white",
              borderRadius: "10px"
            }}
          >
            <Box sx={{padding: "20px"}}>
              <Box sx={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center"
              }}>
                <Button onClick={() => { setOpenAccount(false); }}>
                  <Close/>
                </Button>
              </Box>
              <CustomAccountModal/>
            </Box>
          </Box>
        </Box>
      </Fade>

    </Box>
  )
}

export default Connect
