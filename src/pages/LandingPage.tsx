import {
  Box,
  Typography
} from "@mui/material"
import Page from "components/Page"
import {useContext, useEffect, useRef, useState} from "react";
import useWindowSize from "../hooks/useWindowSize";
import {BackgroundContext} from "../components/Providers";

const LandingPage = () => {

  const backgroundConfig = useContext(BackgroundContext)

  const size = useWindowSize();

  const refContainer = useRef<HTMLInputElement>();
  const [boundingBox, setBoundingBox] = useState<DOMRect>(new DOMRect(0, 0, 0, 0));
  const [boxSize, setBoxSize] = useState(100);
  const [borderWidth, setBorderWidth] = useState(3);
  const [countBoxesX, setCountBoxesX] = useState(0);
  const [countBoxesY, setCountBoxesY] = useState(0);

  useEffect(() => {
    if (refContainer.current) {
      setBoundingBox(refContainer.current.getBoundingClientRect())
      const x = 2 * Math.floor(Math.floor(refContainer.current.offsetWidth / (boxSize - 1)) / 2)
      const y = 2 * Math.floor(Math.floor(refContainer.current.offsetHeight / (boxSize - 1)) / 2)
      setCountBoxesX(x)
      setCountBoxesY(y)
      if (refContainer.current.offsetWidth < 500) setBoxSize(50)
      else setBoxSize(100)
    }
  }, [size])

  const circleSize = boxSize / 7;
  const boxes = []
  const circles = []
  for (let i = 0; i < countBoxesX; i++) {
    for (let j = 0; j < countBoxesY; j++) {

      boxes.push(<Box key={`box${i * countBoxesY + j}`} sx={{
        borderTopLeftRadius: i === 0 && j === 0 ? "10px" : "0px",
        borderTopRightRadius: i === countBoxesX - 1 && j === 0 ? "10px" : "0px",
        borderBottomLeftRadius: i === 0 && j === countBoxesY - 1 ? "10px" : "0px",
        borderBottomRightRadius: i === countBoxesX - 1 && j === countBoxesY - 1 ? "10px" : "0px",
        width: `${boxSize}px`,
        height: `${boxSize}px`,
        borderStyle: "solid",
        borderColor: `${backgroundConfig.colors.primary}`,
        borderWidth: `${borderWidth}px`,
        margin: `-${0.5 * borderWidth}px`,
        gridRowStart: `${j + 1}`,
        gridColumnStart: `${i + 1}`,
        boxShadow: `${backgroundConfig.colors.shadowPrimary} 1px 1px 5px inset, ${backgroundConfig.colors.shadowPrimary} -1px -1px 5px inset`
      }}/>)

      if (i % 4 === 0 && j % 4 === 0 && i < countBoxesX - 3 && j < countBoxesY - 3) {
        const xPos = boundingBox.x - 0.5 * (circleSize - 2)
          + 0.5 * (boundingBox.width - (countBoxesX * boxSize - borderWidth * countBoxesX))
          + i * (boxSize - borderWidth)
          + 0.5 * (countBoxesX - 4 * (Math.floor(countBoxesX / 4) - 1)) * (boxSize - borderWidth)
        const yPos = boundingBox.y - 0.5 * (circleSize - 2)
          + 0.5 * (boundingBox.height - (countBoxesY * boxSize - borderWidth * countBoxesY))
          + j * (boxSize - borderWidth)
          + 0.5 * (countBoxesY - 4 * (Math.floor(countBoxesY / 4) - 1)) * (boxSize - borderWidth)
        circles.push(<Box key={`circle${i * countBoxesY + j}`} sx={{
          position: "absolute",
          left: `${xPos}px`,
          top: `${yPos}px`,
          width: `${circleSize}px`,
          height: `${circleSize}px`,
          borderRadius: `${circleSize}px`,
          borderStyle: "solid",
          borderColor: `${backgroundConfig.colors.primary}`,
          borderWidth: `${borderWidth}px`,
          backgroundImage: `url(./media/backgrounds/bg${backgroundConfig.index}.jpg)`
        }}/>)
      }
    }
  }

  return (
    <Page>
      <Box ref={refContainer} sx={{
        width: "100%",
        flexGrow: 1,
        display: "grid",
        justifyContent: "center",
        alignContent: "center"
      }}>
        {boxes}
        {circles}
      </Box>
    </Page>
  )
}

export default LandingPage
