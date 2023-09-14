import {useState, useEffect, useContext} from "react"
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

const Projects = () => {

  const backgroundConfig = useContext(BackgroundContext)

  const theme = useTheme()
  const windowSize = useWindowSize()
  const [countProjects, setCountProjects] = useState(0)
  const [currentPage, setCurrentPage] = useState(0)
  const skip = currentPage * PROJECTS_PER_PAGE
  const first = PROJECTS_PER_PAGE
  const [orderDirection, setOrderDirection] = useState<OrderDirection>(OrderDirection.DESC)
  const { loading, error, data } = useProjects({skip, first, orderDirection})
  const countProjectsResponse = useCountProjects()

  useEffect(() => {
    if (countProjectsResponse.data?.projects?.length) {
      setCountProjects(countProjectsResponse.data?.projects?.length)
    }
  }, [countProjectsResponse.data?.projects?.length])

  let width = 280
  const maxColumns = 2
  if (windowSize && !isNaN(windowSize.width)) {
    width = windowSize.width > theme.breakpoints.values.md
      ? (Math.min(windowSize.width, 1200)- 96)/maxColumns
        : windowSize.width > theme.breakpoints.values.sm
          ? windowSize.width - 64
          : windowSize.width - 48
  }

  if (loading) {
    return (
      <Box>
        <Loading/>
      </Box>
    )
  }

  if (error) {
    return (
      <Box>
        <Alert severity="error">
          Error loading projects
        </Alert>
      </Box>
    )
  }

  if (data?.projects?.length === 0) {
    return (
      <Box>
        <Alert severity="error">
          No projects found
        </Alert>
      </Box>
    )
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center"
      }}
    >
      {
        data.projects.map((project: Project) => (

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
                width: "500px",
                height: "800px",
                borderStyle: "solid",
                borderColor: `${backgroundConfig.colors.primary}`,
                borderWidth: "3px",
                margin: `-1.5px`,
                display: "flex",
                flexDirection: "column",
                '&:hover': {
                  background: "rgba(0, 0, 0, 0.15)"
                }
              }}
            >

              <Box
                sx={{
                  width: "calc(100% + 6px)",
                  height: "65px",
                  borderStyle: "solid",
                  borderColor: `${backgroundConfig.colors.primary}`,
                  borderWidth: "3px",
                  margin: `-3px`,
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
                  width: "calc(100% + 6px)",
                  height: "100px",
                  borderStyle: "solid",
                  borderColor: `${backgroundConfig.colors.primary}`,
                  borderWidth: "3px",
                  margin: `-3px`,
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
      <Box
        sx={{
          width: "500px",
          height: "800px",
          borderStyle: "solid",
          borderColor: `${backgroundConfig.colors.primary}`,
          borderWidth: "3px",
          margin: `-1.5px`
        }}
      >
      </Box>
    </Box>
  )
  // return (
  //   <Box>
  //     {
  //       loading ? (
  //       )
  //     }
  //   </Box>
  //   // <Box>
  //   //   <Box>
  //   //     {
  //   //       loading ?
  //   //       (
  //   //         <Box marginTop={10}>
  //   //           <Loading/>
  //   //         </Box>
  //   //       ) :
  //   //       error ?
  //   //       (
  //   //         <Box marginTop={10}>
  //   //           <Alert severity="error">
  //   //             Error loading projects
  //   //           </Alert>
  //   //         </Box>
  //   //       ) :
  //   //       data?.projects?.length > 0 ?
  //   //       (
  //   //         <Grid container spacing={3} sx={{margin: "32px 0"}}>
  //   //           {
  //   //             data?.projects && (
  //   //               data.projects.map((project: Project) => (
  //   //                 <Grid item md={6} key={project.id}>
  //   //                   <ProjectPreview
  //   //                     project={project}
  //   //                     width={width}
  //   //                     showDescription
  //   //                   />
  //   //                 </Grid>
  //   //               ))
  //   //             )
  //   //           }
  //   //         </Grid>
  //   //       ) :
  //   //       data?.projects?.length === 0 ? (
  //   //         <Box marginTop={10}>
  //   //           <Alert severity="info">
  //   //             No projects found
  //   //           </Alert>
  //   //         </Box>
  //   //       ) :
  //   //       null
  //   //     }
  //   //     {
  //   //       !error && !loading && data?.projects?.length > 0 && (
  //   //         <Box sx={{display: "flex", justifyContent: "center", marginBottom: "50px"}}>
  //   //           <Pagination
  //   //             count={Math.ceil(countProjects/PROJECTS_PER_PAGE)}
  //   //             color="primary"
  //   //             page={currentPage + 1}
  //   //             onChange={(event, page) => {
  //   //               window.scrollTo(0, 0)
  //   //               setCurrentPage(page - 1)
  //   //             }}/>
  //   //         </Box>
  //   //       )
  //   //     }
  //   //   </Box>
  //   // </Box>
  // )
}

export default Projects
