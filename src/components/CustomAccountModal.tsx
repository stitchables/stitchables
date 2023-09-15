import {Button, Icon, Typography} from "@mui/material";
import Box from "@mui/material/Box";
import {useAccount, useBalance, useDisconnect, useEnsName} from "wagmi";
import {formatEtherFixed} from "../utils/numbers";
import {CopyAll, ExitToApp, Search} from "@mui/icons-material";

const CustomAccountModal = () => {

  const account = useAccount()

  const { disconnect } = useDisconnect()

  const ensName = useEnsName({address: account.address, chainId: 1})
  const shortAddress = account.address ? `${account.address.slice(0, 6)}...${account.address.slice(38, 42)}` : null
  const balance = useBalance({address: account.address})

  return (
    <Box
      sx={{
        marginTop: "-50px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}
    >

      <Box
        component={"img"}
        sx={{
          height: "50px",
          marginY: "20px"
        }}
        alt={"Stitchables"}
        src={"/media/logos/logo.png"}
      />

      <Typography
        sx={{
          fontSize: "20px"
        }}
      >
        {ensName.data || shortAddress}
      </Typography>

      <Typography
        sx={{
          fontSize: "15px"
        }}
      >
        {`${formatEtherFixed(balance.data ? balance.data?.value.toString() : "0", 2)} ETH`}
      </Typography>

      <Box
        sx={{
          paddingTop: "15px",
          display: "flex",
          gap: "10px"
        }}
      >
        <Button
          onClick={() => {navigator.clipboard.writeText(account.address ? account.address.toString() : "")}}
          sx={{
            width: "115px",
            display: "flex",
            flexDirection: "column",
            backgroundColor: "rgb(230, 230, 230)",
            "&:hover": {
              backgroundColor: "rgb(230, 230, 250)",
            }
          }}
        >
          <CopyAll/>
          <Typography
            sx={{
              fontSize: "13px"
            }}
          >
            Copy Address
          </Typography>
        </Button>

        <Button
          onClick={() => disconnect()}
          sx={{
            width: "115px",
            display: "flex",
            flexDirection: "column",
            backgroundColor: "rgb(230, 230, 230)",
            "&:hover": {
              backgroundColor: "rgb(230, 230, 250)",
            }
          }}
        >
          <ExitToApp/>
          <Typography
            sx={{
              fontSize: "13px"
            }}
          >
            Disconnect
          </Typography>
        </Button>

        <Button
          href={`/user/${account.address}`}
          sx={{
            width: "115px",
            display: "flex",
            flexDirection: "column",
            backgroundColor: "rgb(230, 230, 230)",
            "&:hover": {
              backgroundColor: "rgb(230, 230, 250)",
            }
          }}
        >
          <Search/>
          <Typography
            sx={{
              fontSize: "13px"
            }}
          >
            My NFTs
          </Typography>
        </Button>
      </Box>
    </Box>
  )
}

export default CustomAccountModal
