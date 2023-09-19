import { Trait } from "utils/types"
import {
  Typography,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow, Box
} from "@mui/material"
import Loading from "components/Loading"
import useTokenTraits from "hooks/useTokenTraits"
import CustomTypography from "./CustomTypography";

interface Props {
  contractAddress: string
  tokenId: string
}

const TokenTraits = ({ contractAddress, tokenId }: Props) => {
  const tokenTraits = useTokenTraits(contractAddress, tokenId)
  const traits = tokenTraits.data?.traits?.filter((t:Trait) => t.value.indexOf('All') === -1)

  if (tokenTraits.loading || tokenTraits.loading) {
    return (
      <Box>
        <Loading/>
      </Box>
    )
  }

  if (tokenTraits.error || tokenTraits.error) {
    return (
      <Box>
        <Alert severity="error">
          Error loading token traits
        </Alert>
      </Box>
    )
  }

  if (!traits) {
    return (
      <Box>
        <Alert severity="error">
          No token traits found
        </Alert>
      </Box>
    )
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}
    >
      <CustomTypography text={"Features"} fontSize={"20px"}/>
      {
        traits.map((trait: Trait) => {
          const split = trait.value.split(":")
          return (
            <Box key={trait.value}>
              <CustomTypography text={`${split[0]}: ${split[1]}`} fontSize={"18px"}/>
            </Box>
          )
        })
      }
    </Box>
    // <CustomTypography text={"Traits"} fontSize={"20px"}/>
    // <TableContainer sx={{marginBottom: 4}}>
    //   <Typography variant="h6" mb={2}>Features</Typography>
    //   <Table>
    //     <TableHead>
    //       <TableRow>
    //         <TableCell>
    //           <Typography fontWeight={600}>
    //             Feature
    //           </Typography>
    //         </TableCell>
    //         <TableCell>
    //           <Typography fontWeight={600}>
    //             Value
    //           </Typography>
    //         </TableCell>
    //       </TableRow>
    //     </TableHead>
    //     <TableBody>
    //       {traits.map((trait:Trait) => {
    //         const p = trait.value.split(":")
    //         return (
    //           <TableRow key={p[0]}>
    //             <TableCell>
    //               <Typography>
    //                 {p[0]}
    //               </Typography>
    //             </TableCell>
    //             <TableCell>
    //               <Typography>
    //                 {p[1]}
    //               </Typography>
    //             </TableCell>
    //           </TableRow>
    //         )
    //       })}
    //     </TableBody>
    //   </Table>
    // </TableContainer>
  )
}

export default TokenTraits
