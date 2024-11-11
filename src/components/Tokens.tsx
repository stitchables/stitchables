import useTheme from "@mui/material/styles/useTheme"
import { TOKENS_PER_PAGE } from "config"
import { OrderDirection, Token } from "utils/types"
import {
  Grid,
  Link,
  Alert,
  Typography, Box
} from "@mui/material"
import Loading from "components/Loading"
import TokenView from "components/TokenView"
import useTokens from "hooks/useTokens"
import useWindowSize from "hooks/useWindowSize"
import CustomTypography from "./CustomTypography";

interface Props {
  contractAddress: string
  projectId: string
  first?: number
  skip?: number
  orderDirection?: OrderDirection
  aspectRatio?: number
}

const Tokens = ({contractAddress, projectId, first=TOKENS_PER_PAGE, skip=0, orderDirection=OrderDirection.ASC, aspectRatio=1}: Props) => {

  const tokens = useTokens(projectId, {first, skip, orderDirection})

  if (tokens.loading || tokens.loading) {
    return (
      <Box>
        <Loading/>
      </Box>
    )
  }

  if (tokens.error || tokens.error) {
    return (
      <Box>
        <Alert severity="error">
          Error loading projects
        </Alert>
      </Box>
    )
  }

  if (tokens.data.length === 0) {
    return (
      <Box>
        <Alert severity="error">
          No tokens found for this project
        </Alert>
      </Box>
    )
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: "40px"
      }}
    >
      {
        tokens.data.tokens.map(((token: Token) => (
          <Link key={token.id} href={`/token/${contractAddress}/${token.tokenId}`}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "10px"
              }}
            >
              <TokenView
                contractAddress={contractAddress}
                tokenId={token.tokenId}
                aspectRatio={aspectRatio}
                width={300}
              />
              <CustomTypography text={`#${token.invocation}`} fontSize={"18px"}/>
            </Box>
          </Link>
        )))
      }
    </Box>
    // data.tokens.length > 0 ?
    //   <Grid spacing={2} container>
    //     {
    //       data.tokens.map(((token:Token) => (
    //         <Grid key={token.tokenId} item md={4} sm={6} xs={6}>
    //           <Link href={`/token/${contractAddress}/${token.tokenId}`}>
    //             <TokenView
    //               contractAddress={contractAddress}
    //               tokenId={token.tokenId}
    //               aspectRatio={aspectRatio}
    //               width={width}
    //             />
    //           </Link>
    //           <Typography mt={0.25} fontWeight="bold">
    //             #{token.invocation.toString()}
    //           </Typography>
    //         </Grid>
    //       )))
    //     }
    //   </Grid>
    // : null
  )
}

export default Tokens
