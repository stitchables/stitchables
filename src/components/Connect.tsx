import { ConnectButton } from "@rainbow-me/rainbowkit"
import Box from "@mui/material/Box"
import {Button, Link, Typography} from "@mui/material"
import {useContext} from "react";
import {BackgroundContext} from "./Providers";

interface Props {
  isMobile: boolean
}

const Connect = ({ isMobile = false }: Props) => {
  const backgroundConfig = useContext(BackgroundContext)
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
                    <Link onClick={openConnectModal} underline={"hover"}
                          sx={{
                            textShadow: `${backgroundConfig.colors.shadowPrimary} 0px 0px 17px`,
                          }}>
                      <Typography variant={"h1"} color={backgroundConfig.colors.primary}>Connect</Typography>
                    </Link>
                  );
                }

                if (chain.unsupported) {
                  return (
                    <Link onClick={openChainModal} underline={"hover"}
                          sx={{
                            textShadow: `${backgroundConfig.colors.shadowPrimary} 0px 0px 17px`,
                          }}>
                      <Typography variant={"h1"} color={backgroundConfig.colors.primary}>Wrong network</Typography>
                    </Link>
                  );
                }

                return (
                  <Box sx={{
                    display: "flex",
                    gap: "25px",
                    flexDirection: "row",
                    justifyContent: "right"
                  }}>
                    <Link onClick={openAccountModal} underline={"hover"} sx={{justifyContent: "center", textShadow: "#000 1px 0 20px"}}>
                      <Typography variant={"h1"} color={backgroundConfig.colors.primary}>{account.displayName}</Typography>
                    </Link>
                    <Link href={`/user/${account.address}`} underline="hover"
                          sx={{
                            textShadow: `${backgroundConfig.colors.shadowPrimary} 0px 0px 17px`,
                          }}>
                      <Typography variant={"h1"} color={backgroundConfig.colors.primary}>My NFTs</Typography>
                    </Link>
                  </Box>
                );
              })()}
            </div>
          );
        }}
      </ConnectButton.Custom>
    </Box>
  )
}

export default Connect
