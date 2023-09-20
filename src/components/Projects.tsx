import {useState, useEffect, useContext, useRef} from "react"
import {
  Box,
  Typography,
  Alert,
  FormControl,
  NativeSelect,
  Pagination,
  Grid, Link
} from "@mui/material"
import useTheme from "@mui/material/styles/useTheme"
import { PROJECTS_PER_PAGE } from "config"
import { OrderDirection, Project } from "utils/types"
import ProjectPreview from "components/ProjectPreview"
import Loading from "components/Loading"
import useProjects from "hooks/useProjects"
import useWindowSize from "hooks/useWindowSize"
import useCountProjects from "hooks/useCountProjects"
import {BackgroundContext} from "./Providers";
import TokenImage from "./TokenImage";
import CustomPagination from "./CustomPagination";

const Projects = () => {

  const projectBoxWidth = 450
  const projectBoxHeight = 800
  const projectBoxBorderWidth = 3
  const projectTitleHeight = 65
  const projectDetailsHeight = 100

  const backgroundConfig = useContext(BackgroundContext)

  const countProjects = useCountProjects()
  const [currentPage, setCurrentPage] = useState(0)
  const [orderDirection, setOrderDirection] = useState<OrderDirection>(OrderDirection.DESC)
  const skip = currentPage * PROJECTS_PER_PAGE
  const first = PROJECTS_PER_PAGE
  const projects = useProjects({skip, first, orderDirection})

  const size = useWindowSize()
  const refContainer = useRef<HTMLInputElement>()
  const [countBoxesX, setCountBoxesX] = useState(1)
  useEffect(() => {
    if (refContainer.current) {
      const bb = refContainer.current.getBoundingClientRect();
      setCountBoxesX(Math.floor(bb.width / (projectBoxWidth - projectBoxBorderWidth)))
    }
  }, [size])

  if (projects.loading || countProjects.loading) {
    return (
      <Box ref={refContainer}>
        <Loading/>
      </Box>
    )
  }

  if (projects.error || countProjects.error) {
    return (
      <Box ref={refContainer}>
        <Alert severity="error">
          Error loading projects
        </Alert>
      </Box>
    )
  }

  if (projects.data.length === 0 || countProjects.data === 0) {
    return (
      <Box ref={refContainer}>
        <Alert severity="error">
          No projects found
        </Alert>
      </Box>
    )
  }

  const countEmptyBoxes = countBoxesX - (projects.data.projects.length - Math.floor((projects.data.projects.length - 1) / countBoxesX) * countBoxesX)
  const emptyBoxes = []
  for (let i = 0; i < countEmptyBoxes; i++) {
    emptyBoxes.push(
      <Box
        key={`empty${i}`}
        sx={{
          width: `${projectBoxWidth}px`,
          height: `${projectBoxHeight}px`,
          borderStyle: "solid",
          borderColor: `${backgroundConfig.colors.primary}`,
          borderWidth: `${projectBoxBorderWidth}px`,
          margin: `${-0.5 * projectBoxBorderWidth}px`,
          display: "flex",
          flexDirection: "column",
          '&:hover': {
            background: "rgba(0, 0, 0, 0.2)"
          }
        }}
      />
    )
  }

  return (
    <Box>
      <Box
        ref={refContainer}
        sx={{
          width: "100%",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center"
        }}
      >
        {
          projects.data.projects.map((project: Project) => (

            <Link
              key={`${project.id}`}
              href={`/project/${project.contract.id}/${project.projectId}`}
              sx={{
                textDecoration: "none",
                '&:hover': {
                  textDecoration: "none"
                }
              }}
            >
              <Box
                sx={{
                  width: `${projectBoxWidth}px`,
                  height: `${projectBoxHeight}px`,
                  borderStyle: "solid",
                  borderColor: `${backgroundConfig.colors.primary}`,
                  borderWidth: `${projectBoxBorderWidth}px`,
                  margin: `${-0.5 * projectBoxBorderWidth}px`,
                  display: "flex",
                  flexDirection: "column",
                  '&:hover': {
                    background: "rgba(0, 0, 0, 0.2)"
                  }
                }}
              >

                <Box
                  sx={{
                    width: `calc(100% + ${2 * projectBoxBorderWidth}px)`,
                    height: `${projectTitleHeight}px`,
                    borderStyle: "solid",
                    borderColor: `${backgroundConfig.colors.primary}`,
                    borderWidth: `${projectBoxBorderWidth}px`,
                    margin: `${-projectBoxBorderWidth}px`,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <Typography
                    variant={"h2"}
                    color={backgroundConfig.colors.primary}
                    sx={{
                      textShadow: `${backgroundConfig.colors.shadowPrimary} 0px 0px 17px`,
                    }}
                  >
                    {project.name}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    flexGrow: 1,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <TokenImage
                    contractAddress={project.contract.id}
                    tokenId={`${1000000 * Number(project.projectId)}`}
                    width={350}
                    height={350 / project.aspectRatio}
                  />
                </Box>

                <Box
                  sx={{
                    width: `calc(100% + ${2 * projectBoxBorderWidth}px)`,
                    height: `${projectDetailsHeight}px`,
                    borderStyle: "solid",
                    borderColor: `${backgroundConfig.colors.primary}`,
                    borderWidth: `${projectBoxBorderWidth}px`,
                    margin: `${-projectBoxBorderWidth}px`,
                    paddingLeft: "10px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "flex-start"
                  }}
                >
                  <Typography
                    color={backgroundConfig.colors.primary}
                    sx={{
                      fontSize: "20px",
                      textShadow: `${backgroundConfig.colors.shadowPrimary} 0px 0px 17px`,
                    }}
                  >
                    {`${project.artistName}`}
                  </Typography>
                  <Typography
                    color={backgroundConfig.colors.primary}
                    sx={{
                      fontSize: "18px",
                      textShadow: `${backgroundConfig.colors.shadowPrimary} 0px 0px 17px`,
                      paddingLeft: "5px"
                    }}
                  >
                    {`${project.pricePerTokenInWei.toString()} ${project.currencySymbol}`}
                  </Typography>
                  <Typography
                    color={backgroundConfig.colors.primary}
                    sx={{
                      fontSize: "18px",
                      textShadow: `${backgroundConfig.colors.shadowPrimary} 0px 0px 17px`,
                      paddingLeft: "5px"
                    }}
                  >
                    {`${project.invocations.toString()} of ${project.maxInvocations} minted`}
                  </Typography>
                </Box>

              </Box>
            </Link>
          ))
        }
        {emptyBoxes}
      </Box>

      <CustomPagination
        count={Math.ceil(countProjects.data / PROJECTS_PER_PAGE)}
        page={currentPage + 1}
        onChange={(event, page) => {
          window.scrollTo(0, 0)
          setCurrentPage(Math.min(Math.max(page - 1, 0), Math.ceil(countProjects.data / PROJECTS_PER_PAGE) - 1))
        }}
        show={Math.ceil(countProjects.data / PROJECTS_PER_PAGE) > 1}
      />

    </Box>
  )
}

export default Projects
