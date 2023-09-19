import {useState, useEffect, useRef, useContext} from "react"
import {
  Box,
  Typography,
  Alert,
  FormControl,
  NativeSelect,
  Pagination,
  Grid,
  Link
} from "@mui/material"
import { PROJECTS_PER_PAGE } from "config"
import { OrderDirection, Project } from "utils/types"
import Loading from "components/Loading"
import OwnedTokens from "components/OwnedTokens"
import useOwnedProjects from "hooks/useOwnedProjects"
import useCountOwnedProjects from "hooks/useCountOwnedProjects"
import { parseAspectRatio } from "utils/scriptJSON"
import useWindowSize from "../hooks/useWindowSize";
import {BackgroundContext} from "./Providers";
import CustomTypography from "./CustomTypography";
import CustomPagination from "./CustomPagination";

interface Props {
  walletAddress: string
}

const OwnedProjects = ({ walletAddress }: Props) => {

  const backgroundConfig = useContext(BackgroundContext)

  const [currentPage, setCurrentPage] = useState(0)
  const [orderDirection, setOrderDirection] = useState<OrderDirection>(OrderDirection.DESC)

  const skip = currentPage * PROJECTS_PER_PAGE
  const first = PROJECTS_PER_PAGE

  const ownedProjects = useOwnedProjects(walletAddress, {skip, first, orderDirection})
  const countOwnedProjects = useCountOwnedProjects(walletAddress)

  if (ownedProjects.loading || countOwnedProjects.loading) {
    return (
      <Box>
        <Loading/>
      </Box>
    )
  }

  if (ownedProjects.error || countOwnedProjects.error) {
    return (
      <Box>
        <Alert severity="error">
          Error loading projects
        </Alert>
      </Box>
    )
  }

  if (ownedProjects.data.length === 0 || countOwnedProjects.data === 0) {
    return (
      <Box>
        <Alert severity="error">
          No projects found
        </Alert>
      </Box>
    )
  }

  return (
    <Box>
      {
        ownedProjects.data.map((project: Project) => (
          <Box
            key={project.id}
            sx={{
              borderStyle: "solid",
              borderColor: `${backgroundConfig.colors.primary}`,
              borderWidth: `3px`,
              margin: "-3px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center"
            }}
          >

            <Box
              sx={{
                width: "calc(100% + 6px)",
                paddingY: "10px",
                borderStyle: "solid",
                borderColor: `${backgroundConfig.colors.primary}`,
                borderWidth: `3px`,
                margin: "-3px",
                display: "flex",
                justifyContent: "center"
              }}
            >
              <Link
                href={`/project/${project.contract.id}/${project.projectId}`}
                underline="hover"
                sx={{
                  textDecoration: "none",
                  '&:hover': {
                    textDecoration: "none"
                  }
                }}
              >
                <CustomTypography
                  text={`${project.name} by ${project.artistName}`}
                  fontSize={"36px"}
                />
              </Link>
            </Box>

            <OwnedTokens
              contractAddress={project.contract.id}
              projectId={project.id}
              walletAddress={walletAddress}
              aspectRatio={project.aspectRatio || parseAspectRatio(project.scriptJSON)}
            />

          </Box>
        ))
      }

      <CustomPagination
        count={Math.ceil(countOwnedProjects.data / PROJECTS_PER_PAGE)}
        page={currentPage + 1}
        onChange={(event, page) => {
          window.scrollTo(0, 0)
          setCurrentPage(Math.min(Math.max(page - 1, 0), Math.ceil(countOwnedProjects.data / PROJECTS_PER_PAGE) - 1))
        }}
        show={Math.ceil(countOwnedProjects.data / PROJECTS_PER_PAGE) > 1}
      />

    </Box>
  )
}

export default OwnedProjects
