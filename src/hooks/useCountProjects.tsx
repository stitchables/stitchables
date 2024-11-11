import { useQuery, gql } from "@apollo/client"
import { getConfiguredContractAddresses } from "utils/contractInfoHelper"

const countProjectsQuery = () => `
  query GetProjects {
    projects(
        where: {
          contract_in: ["${getConfiguredContractAddresses().join("\",\"").toLowerCase()}"]
          active: true
        }
    ) {
      id
    }
  }`

const useCountProjects = () => {
  let { loading, error, data } = useQuery(gql(countProjectsQuery()))

  if (data) data = data.projects.length

  return {
    loading,
    error,
    data
  }
}

export default useCountProjects
