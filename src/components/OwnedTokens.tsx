import useTheme from "@mui/material/styles/useTheme"
import { OrderDirection, Token } from "utils/types"
import {
  Grid,
  Link,
  Alert,
  Typography,
  Box,
  Pagination
} from "@mui/material"
import Loading from "components/Loading"
import TokenView from "components/TokenView"
import useWindowSize from "hooks/useWindowSize"
import useOwnedTokens from "hooks/useOwnedTokens"
import useCountOwnedTokens from "hooks/useCountOwnedTokens"
import {useContext, useEffect, useState} from "react"
import CustomTypography from "./CustomTypography";
import usePagination from "@mui/material/usePagination";
import {
  ChevronLeft,
  ChevronLeftRounded,
  ChevronRight,
  ChevronRightRounded,
  SkipPrevious,
  SkipPreviousOutlined
} from "@mui/icons-material";
import {BackgroundContext} from "./Providers";
import CustomPagination from "./CustomPagination";

interface Props {
  contractAddress: string
  projectId: string
  walletAddress: string
  aspectRatio: number
}

const OwnedTokens = ({contractAddress, projectId, walletAddress, aspectRatio}: Props) => {

  const backgroundConfig = useContext(BackgroundContext)

  const OWNED_TOKENS_PER_PAGE = 3

  const [orderDirection, setOrderDirection] = useState<OrderDirection>(OrderDirection.ASC)
  const [currentPage, setCurrentPage] = useState(0)
  const skip = currentPage * OWNED_TOKENS_PER_PAGE
  const first = OWNED_TOKENS_PER_PAGE

  const ownedTokens = useOwnedTokens(projectId, walletAddress, {first, skip, orderDirection})
  const countOwnedTokens = useCountOwnedTokens(projectId, walletAddress)

  console.log(currentPage)
  // const { items } = usePagination({
  //   count: Math.ceil(countOwnedTokens.data / OWNED_TOKENS_PER_PAGE),
  //   onChange: (event, page) => {
  //     setCurrentPage(page - 1)
  //   }
  // })

  if (ownedTokens.loading || countOwnedTokens.loading) {
    return (
      <Box>
        <Loading/>
      </Box>
    )
  }

  if (ownedTokens.error) {
    return (
      <Box>
        <Alert severity="error">
          Error loading tokens
        </Alert>
      </Box>
    )
  }

  if (ownedTokens.data.tokens.length === 0 || countOwnedTokens.data === 0) {
    return (
      <Box>
        <Alert severity="info">
          No tokens found for this project.
        </Alert>
      </Box>
    )
  }

  return (
    <Box>

      <Box
        sx={{
          marginY: "20px",
          display: "flex",
          alignItems: "center",
          gap: "20px"
        }}
      >
        {
          ownedTokens.data.tokens.map(((token: Token) => (
            <Box key={token.id}>
              <Link href={`/token/${contractAddress}/${token.tokenId}`}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    textDecoration: "none",
                    '&:hover': {
                      textDecoration: "none"
                    }
                  }}
                >
                  <CustomTypography text={`#${token.invocation}`} fontSize={"15px"}/>
                  <TokenView contractAddress={contractAddress} tokenId={token.tokenId} width={300} aspectRatio={aspectRatio}/>
                </Box>
              </Link>
            </Box>
          )))
        }
      </Box>

      <CustomPagination
        count={Math.ceil(countOwnedTokens.data / OWNED_TOKENS_PER_PAGE)}
        page={currentPage + 1}
        onChange={(event, page) => setCurrentPage(Math.min(Math.max(page - 1, 0), Math.ceil(countOwnedTokens.data / OWNED_TOKENS_PER_PAGE) - 1))}
      />

    </Box>
  )
}

export default OwnedTokens
