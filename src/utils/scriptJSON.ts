export const parseJson = (json: string) => {
  try {
    return JSON.parse(json)
  } catch (error) {
    return null
  }
}

export const parseAspectRatio = (scriptJSON:string) => {
  const scriptParams = parseJson(scriptJSON)

  if (!scriptParams) {
    return 1
  }

  const { aspectRatio } = scriptParams

  if (typeof aspectRatio === "string") {
    if (aspectRatio.indexOf("/") !== -1) {
      const [numerator, denominator] = aspectRatio.split("/")
      return parseFloat(numerator) / parseFloat(denominator)
    } else {
      return parseFloat(aspectRatio)
    }
  }
  return aspectRatio
}

export const parseScriptType = (scriptJSON: string) => {
  const scriptParams = parseJson(scriptJSON)
  return scriptParams?.type
}

export const parseScriptTypeAndVersion = (scriptTypeAndVersion: string) => {
  let split = scriptTypeAndVersion.split("@")
  if (split[0] === "p5") return `${split[0]}.js v${split[1]}`
  return `${split[0]} v${split[1]}`
}
