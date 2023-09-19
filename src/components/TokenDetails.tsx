import moment from "moment"
import { parseAspectRatio } from "utils/scriptJSON"
import {
  Box,
  Typography,
  Link,
  Grid,
  Alert,
  Button,
  Breadcrumbs, Fade
} from "@mui/material"
import VisibilityIcon from "@mui/icons-material/Visibility"
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"
import ImageIcon from "@mui/icons-material/Image"
import CreateIcon from '@mui/icons-material/Create';
import useTheme from "@mui/material/styles/useTheme"
import TokenTraits from "components/TokenTraits"
import Address from "components/Address"
import Loading from "components/Loading"
import TokenView from "components/TokenView"
import useToken from "hooks/useToken"
import useWindowSize from "hooks/useWindowSize"
import { getContractConfigByAddress } from "utils/contractInfoHelper";
import EmbroideryDownloader from "./EmbroideryDownloader";
import {useContext, useState} from "react";
import {Close, Instagram} from "@mui/icons-material";
import CustomTypography from "./CustomTypography";
import {BackgroundContext} from "./Providers";
import {useEnsName} from "wagmi";
import address from "components/Address";

interface Props {
  contractAddress: string
  id: string
}

const TokenDetails = ({ contractAddress, id }: Props) => {

  const backgroundConfig = useContext(BackgroundContext)
  const contractConfig = getContractConfigByAddress(contractAddress)

  const token = useToken(`${contractAddress.toLowerCase()}-${id}`)

  const ensName = useEnsName({
    address: token.data?.token.owner.id,
    chainId: 1
  })
  const shortAddress = `${token.data?.token.owner.id.slice(0, 6)}...${ token.data?.token.owner.id.slice(38, 42)}`

  const [showEmbroideryDownloader, setShowEmbroideryDownloader] = useState(false)

  if (token.loading || token.loading) {
    return (
      <Box>
        <Loading/>
      </Box>
    )
  }

  if (token.error || token.error) {
    return (
      <Box>
        <Alert severity="error">
          Error loading token
        </Alert>
      </Box>
    )
  }

  if (!contractConfig) {
    return (
      <Box>
        <Alert severity="error">
          Contract config not found
        </Alert>
      </Box>
    )
  }

  return (
    <Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          paddingBottom: "20px"
        }}
      >
        <Link
          href={`/project/${contractAddress}/${token.data.token.project.projectId}`}
          sx={{
            textDecoration: "none",
            '&:hover': {
              textDecoration: "none"
            }
          }}
        >
          <CustomTypography text={`${token.data.token.project.name} Gallery`} fontSize={"25px"}/>
        </Link>
      </Box>

      <Box
        sx={{
          display: "flex"
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "800px"
          }}
        >
          <TokenView
            contractAddress={contractAddress}
            tokenId={token.data.token.tokenId}
            width={800}
            aspectRatio={token.data.token.project.aspectRatio}
            live={true}
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-evenly"
            }}
          >

            <Link
              href={`${contractConfig.GENERATOR_URL}/${contractAddress.toLowerCase()}/${token.data.token.tokenId}`}
              target={"_blank"}
              sx={{
                textDecoration: "none",
                '&:hover': {
                  textDecoration: "none",
                  boxShadow: `0px 0px 10px 1px ${backgroundConfig.colors.shadowSecondary}66, 0px 0px 10px 1px ${backgroundConfig.colors.shadowSecondary}66 inset`,
                },
                display: "flex",
                gap: "5px",
                boxShadow: `0px 0px 10px 1px ${backgroundConfig.colors.shadowPrimary}66, 0px 0px 10px 1px ${backgroundConfig.colors.shadowPrimary}66 inset`
              }}
            >
              <VisibilityIcon
                sx={{
                  color: backgroundConfig.colors.primary
                }}
              />
              <CustomTypography text={"Live"} fontSize={"15px"}/>
            </Link>

            <Link
              href={`${contractConfig.MEDIA_URL}/${token.data.token.tokenId}.png`}
              target={"_blank"}
              sx={{
                textDecoration: "none",
                '&:hover': {
                  textDecoration: "none",
                  boxShadow: `0px 0px 10px 1px ${backgroundConfig.colors.shadowSecondary}66, 0px 0px 10px 1px ${backgroundConfig.colors.shadowSecondary}66 inset`,
                },
                display: "flex",
                gap: "5px",
                boxShadow: `0px 0px 10px 1px ${backgroundConfig.colors.shadowPrimary}66, 0px 0px 10px 1px ${backgroundConfig.colors.shadowPrimary}66 inset`
              }}
            >
              <ImageIcon
                sx={{
                  color: backgroundConfig.colors.primary
                }}
              />
              <CustomTypography text={"Image"} fontSize={"15px"}/>
            </Link>

            <Link
              onClick={() => setShowEmbroideryDownloader(true)}
              sx={{
                textDecoration: "none",
                '&:hover': {
                  textDecoration: "none",
                  boxShadow: `0px 0px 10px 1px ${backgroundConfig.colors.shadowSecondary}66, 0px 0px 10px 1px ${backgroundConfig.colors.shadowSecondary}66 inset`,
                },
                display: "flex",
                gap: "5px",
                boxShadow: `0px 0px 10px 1px ${backgroundConfig.colors.shadowPrimary}66, 0px 0px 10px 1px ${backgroundConfig.colors.shadowPrimary}66 inset`
              }}
            >
              <ImageIcon
                sx={{
                  color: backgroundConfig.colors.primary
                }}
              />
              <CustomTypography text={"Embroidery"} fontSize={"15px"}/>
            </Link>


          </Box>
        </Box>

        <Box
          sx={{
            marginTop: "20px",
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}
        >

          <CustomTypography
            text={`${token.data.token.project.name} #${token.data.token.invocation} by ${token.data.token.project.artistName}`}
            fontSize={"25px"}
          />

          <Box
            sx={{
              paddingY: "30px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center"
            }}
          >
            <CustomTypography
              text={`Minted ${moment.unix(token.data.token.createdAt).format("LL")}`}
              fontSize={"20px"}
            />
            <Link
              href={`/user/${token.data.token.owner.id}`}
              sx={{
                textDecoration: "none",
                '&:hover': {
                  textDecoration: "none"
                }
              }}
            >
              <CustomTypography
                text={`Owned by ${ensName.data || shortAddress}`}
                fontSize={"20px"}
              />
            </Link>
          </Box>

          <Link
            href={`https://etherscan.io/token/${contractAddress?.toLowerCase()}?a=${token.data.token.tokenId}`}
            target={"_blank"}
            sx={{
              textDecoration: "none",
              '&:hover': {
                textDecoration: "none"
              }
            }}
          >
            <CustomTypography
              text={`View on Etherscan`}
              fontSize={"18px"}
            />
          </Link>
          <Link
            href={`https://opensea.io/assets/ethereum/${contractAddress?.toLowerCase()}/${token.data.token.tokenId}`}
            target={"_blank"}
            sx={{
              textDecoration: "none",
              '&:hover': {
                textDecoration: "none"
              }
            }}
          >
            <CustomTypography
              text={`View on OpenSea`}
              fontSize={"18px"}
            />
          </Link>

          <Box
            sx={{
              paddingTop: "30px"
            }}
          >
            <TokenTraits contractAddress={contractAddress} tokenId={token.data.token.tokenId}/>
          </Box>

        </Box>

      </Box>


      <Fade in={showEmbroideryDownloader} timeout={500}>
        <Box sx={{
          width: "100%",
          height: "100%",
          position: "fixed",
          top: "0px",
          left: "0px",
          display: showEmbroideryDownloader ? "flex" : "none",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(0, 0, 0, 0.5)"
        }}>
          <Box sx={{
            width: "400px",
            position: "fixed",
            display: showEmbroideryDownloader ? "block" : "none",
            backgroundColor: "white",
            borderRadius: "10px"
          }}>
            <Box sx={{padding: "20px"}}>
              <Box sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              }}>
                <Box>
                  <Typography textAlign={"center"}>
                    Embroidery Options
                  </Typography>
                </Box>
                <Button onClick={() => { setShowEmbroideryDownloader(false); }}>
                  <Close/>
                </Button>
              </Box>
              <EmbroideryDownloader baseUrl={`${contractConfig?.EMBROIDERY_URL}/${contractAddress?.toLowerCase()}/${token.data.token.tokenId}`}/>
            </Box>
          </Box>
        </Box>
      </Fade>

    </Box>
  )
}

export default TokenDetails
