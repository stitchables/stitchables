import { useQuery, gql } from "@apollo/client"
import { getConfiguredContractAddresses } from "utils/contractInfoHelper"

const countOwnedProjectsQuery = (walletAddress: string) => `
  query GetProjects {
    projects(
        where: {
          contract_in: ["${getConfiguredContractAddresses().join("\",\"").toLowerCase()}"]
          active: true
        }
    ) {
      id
      tokens (
        where: {
          owner: "${walletAddress}"
        }
        first: 1
      ) {
        id
        tokenId
        invocation
      }
    }
  }`

const useCountOwnedProjects = (walletAddress: string) => {
  let { loading, error, data } = useQuery(gql(countOwnedProjectsQuery(walletAddress)))

  if (data) data = data.projects.filter((project: { tokens: string | any[] }) => project.tokens.length > 0).length

  return {
    loading,
    error,
    data
  }
}

export default useCountOwnedProjects
