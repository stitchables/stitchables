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
import {useState} from "react";
import {Close} from "@mui/icons-material";

interface Props {
  contractAddress: string
  id: string
}

const TokenDetails = ({ contractAddress, id }: Props) => {
  const theme = useTheme()
  const windowSize = useWindowSize()
  const { loading, error, data } = useToken(`${contractAddress.toLowerCase()}-${id}`)
  const token = data?.token
  const contractConfig = getContractConfigByAddress(contractAddress)
  const [showEmbroideryDownloader, setShowEmbroideryDownloader] = useState(false)

  if (loading) {
    return <Loading/>
  }

  if (error) {
    return (
      <Box>
        <Alert severity="error">
          Error loading token
        </Alert>
      </Box>
    )
  }

  const width = windowSize.width > theme.breakpoints.values.md
    ? (Math.min(windowSize.width, 1200)- 48)*0.666666
      : windowSize.width > theme.breakpoints.values.sm
        ? windowSize.width - 48
        : windowSize.width - 32

  return token && contractConfig && (
    <Box>

      <Breadcrumbs aria-label="breadcrumb" sx={{marginBottom: 4}}>
        <Link href="/projects" underline="hover" sx={{color: "#666"}}>
          Home
        </Link>
        <Link href={`/project/${contractAddress}/${token.project.projectId}`} underline="hover" sx={{color: "#666"}}>
          {token.project.name}
        </Link>
        <Typography>
          {token.invocation}
        </Typography>
      </Breadcrumbs>
      <Grid container spacing={2}>
        <Grid item md={8}>
          <TokenView
            contractAddress={contractAddress}
            tokenId={token.tokenId}
            width={width}
            aspectRatio={token.project.aspectRatio || parseAspectRatio(token.project.scriptJSON)}
            live
          />
          <Box sx={{marginTop: 1, display: "flex", justifyContent: "space-between", alignItems: "center"}}>
            <Box>
              <Typography>
                Owned by <Address address={token.owner.id}></Address>
              </Typography>
            </Box>
            <Box sx={{display: "flex", justifyContent: "space-between"}}>
              <Button
                startIcon={<VisibilityIcon sx={{color: "#666"}}/>}
                sx={{
                  fontSize: 14,
                  textTransform: "none",
                  minWidth: [0, 0, "64px"],
                  padding: [0, 0, "default"]
                }}
                onClick={() => {
                  const generatorUrl = contractConfig?.GENERATOR_URL
                  window.open(`${generatorUrl}/${contractAddress?.toLowerCase()}/${token.tokenId}`)
                }}
                >
                <Typography fontSize="14px" display={["none", "none", "block"]}>
                  Live view
                </Typography>
              </Button>
              <Button
                startIcon={<ImageIcon sx={{color: "#666"}}/>}
                sx={{
                  fontSize: 14,
                  textTransform: "none",
                  marginLeft: [1, 1, 2],
                  minWidth: [0, 0, "64px"],
                  padding: [0, 0, "default"]
                }}
                onClick={() => {
                  const mediaUrl = contractConfig?.MEDIA_URL
                  window.open(`${mediaUrl}/${token.tokenId}.png`)
                }}
                >
                <Typography fontSize="14px" display={["none", "none", "block"]}>
                  Image
                </Typography>
              </Button>
              <Button
                startIcon={<CreateIcon sx={{color: "#666"}}/>}
                sx={{
                  fontSize: 14,
                  textTransform: "none",
                  marginLeft: [1, 1, 2],
                  minWidth: [0, 0, "64px"],
                  padding: [0, 0, "default"]
                }}
                onClick={() => {
                  // const embroideryUrl = contractConfig?.EMBROIDERY_URL
                  // window.open(`${embroideryUrl}/${contractAddress?.toLowerCase()}/${token.tokenId}.pes?width_mm=400&height_mm=400`)
                  setShowEmbroideryDownloader(true);
                }}
              >
                <Typography fontSize="14px" display={["none", "none", "block"]}>
                  Embroidery
                </Typography>
              </Button>
            </Box>
          </Box>
        </Grid>
        <Grid item md={4}>
          <Typography fontSize="16px" mb={4}>
            Minted {moment.unix(token.createdAt).format("LL")}
          </Typography>
          <Typography variant="h1">
            {token.project.name} #{token.invocation}
          </Typography>
          <Typography variant="h6">
            {token.project.artistName}
          </Typography>
          <Box>
            <Box>
              <Button
                endIcon={<ArrowForwardIcon />}
                onClick={() => {
                  window.open(`https://etherscan.io/token/${contractAddress?.toLowerCase()}?a=${token.tokenId}`)
                }}
                >
                <Typography fontSize="14px" sx={{textTransform: "none"}}>
                  View on Etherscan
                </Typography>
              </Button>
            </Box>
            <Box>
              <Button
                endIcon={<ArrowForwardIcon />}
                onClick={() => {
                  window.open(`https://opensea.io/assets/ethereum/${contractAddress?.toLowerCase()}/${token.tokenId}`)
                }}
                >
                <Typography fontSize="14px" sx={{textTransform: "none"}}>
                  View on OpenSea
                </Typography>
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Grid container spacing={2} mt={4} mb={4}>
        <Grid item md={6}>
          <TokenTraits contractAddress={contractAddress} tokenId={token.tokenId}/>
        </Grid>
      </Grid>


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
                <Box sx={{
                  marginLeft: "20px"
                }}>
                  <Typography textAlign={"center"}>
                    Embroidery Options
                  </Typography>
                </Box>
                <Button onClick={() => { setShowEmbroideryDownloader(false); }}>
                  <Close/>
                </Button>
              </Box>
              <EmbroideryDownloader baseUrl={`${contractConfig?.EMBROIDERY_URL}/${contractAddress?.toLowerCase()}/${token.tokenId}`}/>
            </Box>
          </Box>
        </Box>
      </Fade>

    </Box>
  )
}

export default TokenDetails
