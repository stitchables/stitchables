import { useState } from "react"
import { useAccount, useBalance, useContractReads } from "wagmi"
import { BigNumber, utils } from "ethers"
import {Box, Typography} from "@mui/material"
import GenArt721CoreV3_EngineABI from "abi/V3/GenArt721CoreV3_Engine.json"
import MinterSetPriceV4ABI from "abi/V3/MinterSetPriceV4.json"
import MintingProgress from "components/MintingProgress"
import MintingPrice from "components/MintingPrice"
import MinterSetPriceV4Button from "components/MinterButtons/MinterSetPriceV4Button"
import CustomTypography from "../CustomTypography";

interface Props {
  coreContractAddress: string,
  mintContractAddress: string,
  projectId: string,
  artistAddress: string,
  scriptAspectRatio: number
}

const MinterSetPriceV4Interface = (
  {
    coreContractAddress,
    mintContractAddress,
    projectId,
    artistAddress,
    scriptAspectRatio
  }: Props
) => {

  const account = useAccount()
  const balance = useBalance({
    address: account.address
  })

  const [projectStateData, setProjectStateData] = useState<any | null>(null)
  const [projectPriceInfo, setProjectPriceInfo] = useState<any | null>(null)
  const [projectConfig, setProjectConfig] = useState<any | null>(null)

  const { data, isError, isLoading } = useContractReads({
    contracts: [
      {
        address: coreContractAddress as `0x${string}`,
        abi: GenArt721CoreV3_EngineABI,
        functionName: "projectStateData",
        args: [BigNumber.from(projectId)]
      },
      {
        address: mintContractAddress as `0x${string}`,
        abi: MinterSetPriceV4ABI,
        functionName: "getPriceInfo",
        args: [BigNumber.from(projectId)]
      },
      {
        address: mintContractAddress as `0x${string}`,
        abi: MinterSetPriceV4ABI,
        functionName: "projectConfig",
        args: [BigNumber.from(projectId)]
      }
    ],
    watch: true,
    onSuccess(data) {
      setProjectStateData(data[0])
      setProjectPriceInfo(data[1])
      setProjectConfig(data[2])
    }
  })

  if (!data || !projectStateData || !projectPriceInfo || !projectConfig || isLoading || isError) {
    return null
  }

  const invocations = projectStateData.invocations.toNumber()
  const maxInvocations = projectStateData.maxInvocations.toNumber()
  const maxHasBeenInvoked = projectConfig.maxHasBeenInvoked
  const currencySymbol = projectPriceInfo.currencySymbol
  const currentPriceWei = projectPriceInfo.tokenPriceInWei
  const priceIsConfigured = projectPriceInfo.isConfigured
  const isSoldOut = maxHasBeenInvoked || invocations >= maxInvocations
  const isPaused = projectStateData.paused
  const isArtist = account.isConnected && account.address?.toLowerCase() === artistAddress?.toLowerCase()
  const isNotArtist = account.isConnected && account.address?.toLowerCase() !== artistAddress?.toLowerCase()
  const artistCanMint = isArtist && priceIsConfigured && !isSoldOut
  const anyoneCanMint = isNotArtist && priceIsConfigured && !isSoldOut && !isPaused

  return (
    <Box
      sx={{
        width: "100%"
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-evenly"
        }}
      >
        <CustomTypography text={`${invocations} / ${maxInvocations} minted`} fontSize={"20px"}/>
        <CustomTypography text={`Fixed Price: ${utils.formatEther(currentPriceWei.toString())} ETH`} fontSize={"20px"}/>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          paddingY: "30px"
        }}
      >
        <MinterSetPriceV4Button
          coreContractAddress={coreContractAddress}
          mintContractAddress={mintContractAddress}
          projectId={projectId}
          priceWei={currentPriceWei}
          currencySymbol={currencySymbol}
          isConnected={account.isConnected}
          artistCanMint={artistCanMint}
          anyoneCanMint={anyoneCanMint}
          scriptAspectRatio={scriptAspectRatio}
          verifyBalance={balance?.data?.formatted! >= utils.formatEther(projectPriceInfo.tokenPriceInWei.toString())}
          isPaused={isPaused}
          isSoldOut={isSoldOut}
        />
      </Box>
    </Box>
  )
}

export default MinterSetPriceV4Interface
