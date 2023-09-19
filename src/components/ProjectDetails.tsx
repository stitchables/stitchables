import useTheme from "@mui/material/styles/useTheme"
import {useContext, useState} from "react"
import {
  Box,
  Grid,
  Breadcrumbs,
  Divider,
  Typography,
  Button,
  Stack,
  FormControl,
  InputLabel,
  NativeSelect,
  Pagination,
  Alert,
  Link
} from "@mui/material"
import { TOKENS_PER_PAGE } from "config"
import { OrderDirection } from "utils/types"
import {parseScriptType, parseAspectRatio, parseScriptTypeAndVersion} from "utils/scriptJSON"
import ProjectDate from "components/ProjectDate"
import ProjectExplore from "components/ProjectExplore"
import TokenView from "components/TokenView"
import Tokens from "components/Tokens"
import Loading from "components/Loading"
import Collapsible from "components/Collapsible"
import useProject from "hooks/useProject"
import useWindowSize from "hooks/useWindowSize"
import { getContractConfigByAddress } from "utils/contractInfoHelper"
import EditProjectButton from "components/EditProjectButton"
import { useAccount } from "wagmi"
import MintingInterfaceFilter from "components/MintingInterfaceFilter"
import CustomTypography from "./CustomTypography";
import ReactMarkdown from "react-markdown";
import {BackgroundContext} from "./Providers";
import CustomPagination from "./CustomPagination";

interface Props {
  contractAddress: string
  id: string
}

const ProjectDetails = ({ contractAddress, id }: Props) => {

  const backgroundConfig = useContext(BackgroundContext)
  const contractConfig = getContractConfigByAddress(contractAddress)

  const { address } = useAccount()
  const project = useProject(`${contractAddress}-${id}`)
  const [currentPage, setCurrentPage] = useState(0)
  const [orderDirection, setOrderDirection] = useState(OrderDirection.ASC)

  if (project.loading || project.loading) {
    return (
      <Box>
        <Loading/>
      </Box>
    )
  }

  if (project.error || project.error) {
    return (
      <Box>
        <Alert severity="error">
          Error loading projects
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
          paddingTop: "10px",
          paddingBottom: "40px"
        }}
      >
        <CustomTypography
          text={`${project.data.project.name} by ${project.data.project.artistName}`}
          fontSize={"30px"}
        />
      </Box>

      <Box
        sx={{
          display: "flex",
          paddingBottom: "40px"
        }}
      >
        <Box
          sx={{
            minWidth: "700px",
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start"
          }}
        >
          <TokenView contractAddress={contractAddress} tokenId={project.data.project.tokens[0].tokenId} width={600} aspectRatio={project.data.project.aspectRatio} live={true}/>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "center"
          }}
        >
          <MintingInterfaceFilter
            contractVersion={contractConfig?.CONTRACT_VERSION}
            coreContractAddress={contractAddress}
            mintContractAddress={contractConfig?.MINT_CONTRACT_ADDRESS}
            projectId={project.data.project.projectId}
            artistAddress={project.data.project.artistAddress}
            scriptAspectRatio={project.data.project.aspectRatio}
          />

          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center"
            }}
          >
            <Box
              sx={{
                paddingX: "40px"
              }}
            >
              <CustomTypography
                text={`License: ${project.data.project.license}`}
                fontSize={"20px"}
              />
            </Box>
            <Box
              sx={{
                paddingX: "40px"
              }}
            >
              <CustomTypography
                text={`Script: ${parseScriptTypeAndVersion(project.data.project.scriptTypeAndVersion)}`}
                fontSize={"20px"}
              />
            </Box>
          </Box>

          <ReactMarkdown
            className="markdown"
            children={project.data.project.description}
            components={{
              p: ({node, ...props}) => {
                return (
                  <Typography
                    {...props}
                    color={backgroundConfig.colors.primary}
                    sx={{
                      marginBlockStart: "1em",
                      marginBlockEnd: "1em",
                      fontSize: "18px",
                      textShadow: `${backgroundConfig.colors.shadowPrimary} 0px 0px 10px, ${backgroundConfig.colors.shadowPrimary} 0px 0px 10px`
                    }}
                  />
                )
              }
            }}
          />

        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center"
          }}
        >
          <Tokens
            contractAddress={contractAddress}
            projectId={`${contractAddress.toLowerCase()}-${id}`}
            first={TOKENS_PER_PAGE}
            skip={currentPage*TOKENS_PER_PAGE}
            orderDirection={orderDirection}
            aspectRatio={project.data.project.aspectRatio}
          />
        </Box>
        <CustomPagination
          count={Math.ceil(project.data.project.invocations / TOKENS_PER_PAGE)}
          page={currentPage + 1}
          onChange={(event, page) => setCurrentPage(Math.min(Math.max(page - 1, 0), Math.ceil(project.data.project.invocations / TOKENS_PER_PAGE) - 1))}
        />
      </Box>

      {/*<Grid spacing={2} container>*/}
      {/*  {*/}
      {/*    token && (*/}
      {/*      <Grid item md={8}>*/}
      {/*        <TokenView*/}
      {/*          contractAddress={contractConfig?.CORE_CONTRACT_ADDRESS}*/}
      {/*          tokenId={token.tokenId}*/}
      {/*          width={200}*/}
      {/*          invocation={token.invocation}*/}
      {/*          aspectRatio={project.aspectRatio || parseAspectRatio(project.scriptJSON)}*/}
      {/*          live*/}
      {/*        />*/}
      {/*      </Grid>*/}
      {/*    )*/}
      {/*  }*/}
      {/*  <Grid item md={4} xs={12} sm={12}>*/}
      {/*    <Box sx={{width: "100%", paddingLeft: [0, 0, 2]}}>*/}
      {/*      <ProjectDate startTime={project?.minterConfiguration?.startTime!}/>*/}
      {/*      <Typography variant="h1" mt={3}>*/}
      {/*        {project.name}*/}
      {/*      </Typography>*/}
      {/*      <Typography variant="h6" mb={2}>*/}
      {/*        {project.artistName}*/}
      {/*      </Typography>*/}
      {/*      <Divider sx={{display: ["none", "block", "none"], marginBottom: 2}}/>*/}
      {/*      {*/}
      {/*        contractConfig.EDIT_PROJECT_URL && address?.toLowerCase() === project.artistAddress &&*/}
      {/*        (*/}
      {/*          <EditProjectButton*/}
      {/*              contractAddress={contractAddress}*/}
      {/*              projectId={project.projectId}*/}
      {/*              editProjectUrl={contractConfig?.EDIT_PROJECT_URL}*/}
      {/*          />*/}
      {/*        )*/}
      {/*      }*/}
      {/*      <MintingInterfaceFilter*/}
      {/*          contractVersion={contractConfig?.CONTRACT_VERSION}*/}
      {/*          coreContractAddress={contractAddress}*/}
      {/*          mintContractAddress={contractConfig?.MINT_CONTRACT_ADDRESS}*/}
      {/*          projectId={project.projectId}*/}
      {/*          artistAddress={project.artistAddress}*/}
      {/*          scriptAspectRatio={project.aspectRatio || parseAspectRatio(project.scriptJSON)}*/}
      {/*      />*/}
      {/*    </Box>*/}
      {/*  </Grid>*/}
      {/*</Grid>*/}
      {/*<Grid spacing={2} container mt={4} pb={4}>*/}
      {/*  <Grid item md={7} sm={12} xs={12}>*/}
      {/*    <Typography variant="h6" mb={2}>*/}
      {/*      About {project.name}*/}
      {/*    </Typography>*/}
      {/*    <ProjectExplore project={project}/>*/}
      {/*    <Box paddingRight={[0, 0, 4]}>*/}
      {/*      <Collapsible content={project.description}/>*/}
      {/*    </Box>*/}
      {/*    <Box sx={{display: "flex", marginTop: 4 }}>*/}
      {/*      <Box mr={6}>*/}
      {/*        <Typography>*/}
      {/*          License*/}
      {/*        </Typography>*/}
      {/*        <Typography>*/}
      {/*          {project.license}*/}
      {/*        </Typography>*/}
      {/*      </Box>*/}
      {/*      <Box>*/}
      {/*        <Typography>*/}
      {/*          Library*/}
      {/*        </Typography>*/}
      {/*        <Typography>*/}
      {/*          {parseScriptType(project.scriptJSON) || project.scriptTypeAndVersion}*/}
      {/*        </Typography>*/}
      {/*      </Box>*/}
      {/*    </Box>*/}
      {/*  </Grid>*/}
      {/*  <Grid item md={5} sm={12} xs={12}>*/}
      {/*    <Box display="flex" mb={4}>*/}
      {/*      {*/}
      {/*        project.website && (*/}
      {/*          <Button*/}
      {/*            sx={{textTransform: "none", marginRight: 4}}*/}
      {/*            onClick={() => window.open(project.website)}*/}
      {/*          >*/}
      {/*            Artist link*/}
      {/*          </Button>*/}
      {/*        )*/}
      {/*      }*/}
      {/*    </Box>*/}
      {/*  </Grid>*/}
      {/*</Grid>*/}
      {/*<Divider/>*/}
      {/*<Box px={1}>*/}
      {/*  <Box mt={4} mb={4} sx={{display: "flex", justifyContent: "space-between"}}>*/}
      {/*    <Typography variant="h4">{project.invocations} Item{Number(project.invocations) === 1 ? "" : "s"}</Typography>*/}
      {/*    <Box sx={{display: "flex", alignItems: "center"}}>*/}
      {/*      <Box>*/}
      {/*        <FormControl fullWidth>*/}
      {/*          <InputLabel variant="standard" htmlFor="uncontrolled-native">*/}
      {/*            <Typography fontWeight={600}>Sort</Typography>*/}
      {/*          </InputLabel>*/}
      {/*          <NativeSelect*/}
      {/*            value={orderDirection}*/}
      {/*            sx={{fontSize: 14}}*/}
      {/*            onChange={(e) => {*/}
      {/*              setOrderDirection(e.target.value as OrderDirection)*/}
      {/*            }}*/}
      {/*          >*/}
      {/*            <option value={OrderDirection.DESC}>Latest</option>*/}
      {/*            <option value={OrderDirection.ASC}>Earliest</option>*/}
      {/*          </NativeSelect>*/}
      {/*        </FormControl>*/}
      {/*      </Box>*/}
      {/*    </Box>*/}
      {/*  </Box>*/}
      {/*  <Tokens*/}
      {/*    contractAddress={contractAddress}*/}
      {/*    projectId={`${contractAddress.toLowerCase()}-${id}`}*/}
      {/*    first={TOKENS_PER_PAGE}*/}
      {/*    skip={currentPage*TOKENS_PER_PAGE}*/}
      {/*    orderDirection={orderDirection}*/}
      {/*    aspectRatio={project.aspectRatio || parseAspectRatio(project.scriptJSON)}*/}
      {/*  />*/}
      {/*  <Box sx={{display: "flex", justifyContent: "center"}}>*/}
      {/*    <Stack mt={6} mb={8} spacing={2}>*/}
      {/*      <Pagination*/}
      {/*        count={Math.ceil(project.invocations/TOKENS_PER_PAGE)}*/}
      {/*        color="primary"*/}
      {/*        page={currentPage + 1}*/}
      {/*        onChange={(event, page) => {*/}
      {/*          setCurrentPage(page - 1)*/}
      {/*        }}*/}
      {/*      />*/}
      {/*    </Stack>*/}
      {/*  </Box>*/}
      {/*</Box>*/}
    </Box>
  )
}

export default ProjectDetails
