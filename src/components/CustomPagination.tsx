import {Box} from "@mui/material";
import {ChangeEvent, useContext} from "react";
import {BackgroundContext} from "./Providers";
import CustomTypography from "./CustomTypography";
import {ChevronLeftRounded, ChevronRightRounded} from "@mui/icons-material";
import usePagination from "@mui/material/usePagination";
import {toast} from "react-toastify";

interface Props {
  count: number
  page: number
  onChange: (event: ChangeEvent<unknown>, page: number) => void
  show?: boolean
}

const CustomPagination = ({count, page, onChange, show = true}: Props) => {

  const backgroundConfig = useContext(BackgroundContext)

  const { items } = usePagination({count: count, page: page, onChange: onChange})

  if (!show) return null

  return (
    <Box
      sx={{
        paddingY: "20px",
        display: "flex",
        justifyContent: "center",
        gap: "20px"
      }}
    >
      {
        items.map(({ page, type, selected, ...item }, index) => {
          if (type === 'start-ellipsis' || type === 'end-ellipsis') {
            return (
              <Box key={index}>
                <CustomTypography text={"..."} fontSize={"18px"}/>
              </Box>
            )
          } else if (type === 'page') {
            return (
              <Box
                key={index}
                {...item}
                sx={{
                  cursor: "pointer"
                }}
              >
                <Box
                  sx={{
                    width: "30px",
                    height: "30px",
                    backgroundColor: selected ? "black" : "grey",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: "15px"
                  }}
                >
                  <CustomTypography text={`${page}`} fontSize={"18px"}/>
                </Box>
              </Box>
            )
          } else if (type === "previous") {
            return (
              <Box
                key={index}
                {...item}
                sx={{
                  cursor: "pointer",
                  width: "30px",
                  height: "30px",
                  backgroundColor: "grey",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: "15px"
                }}
              >
                <ChevronLeftRounded
                  sx={{
                    color: backgroundConfig.colors.primary,
                    boxShadow: `0px 0px 10px 1px ${backgroundConfig.colors.shadowPrimary}66, 0px 0px 10px 1px ${backgroundConfig.colors.shadowPrimary}66 inset`,
                    '&:hover': {
                      boxShadow: `0px 0px 10px 1px ${backgroundConfig.colors.shadowSecondary}66, 0px 0px 10px 1px ${backgroundConfig.colors.shadowSecondary}66 inset`,
                    }
                  }}
                />
              </Box>
            )
          } else if (type === "next") {
            return (
              <Box
                key={index}
                {...item}
                sx={{
                  cursor: "pointer",
                  width: "30px",
                  height: "30px",
                  backgroundColor: "grey",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: "15px"
                }}
              >
                <ChevronRightRounded
                  sx={{
                    cursor: "pointer",
                    color: backgroundConfig.colors.primary,
                    boxShadow: `0px 0px 10px 1px ${backgroundConfig.colors.shadowPrimary}66, 0px 0px 10px 1px ${backgroundConfig.colors.shadowPrimary}66 inset`,
                    '&:hover': {
                      boxShadow: `0px 0px 10px 1px ${backgroundConfig.colors.shadowSecondary}66, 0px 0px 10px 1px ${backgroundConfig.colors.shadowSecondary}66 inset`,
                    }
                  }}
                />
              </Box>
            )
          }
        })
      }
    </Box>
  )
}

export default CustomPagination
