import CssBaseline from "@mui/material/CssBaseline"
import "@rainbow-me/rainbowkit/styles.css"
import { ThemeProvider } from "@mui/material/styles"
import theme from "theme"
import { RainbowKitProvider, getDefaultWallets, midnightTheme } from "@rainbow-me/rainbowkit"
import { configureChains, createClient, WagmiConfig } from "wagmi"
import { mainnet, goerli } from 'wagmi/chains'
import { infuraProvider } from "wagmi/providers/infura"
import { publicProvider } from "wagmi/providers/public"
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client"
import { GRAPHQL_URL, INFURA_KEY, EXPECTED_CHAIN_ID, WALLET_CONNECT_PROJECT_ID } from "config"
import {createContext, useState} from "react";

const client = new ApolloClient({
  uri: GRAPHQL_URL,
  cache: new InMemoryCache()
})

// Defaults to goerli testing network if mainnet is not set
const expectedChains = [EXPECTED_CHAIN_ID === 1 ? mainnet : goerli]
const initialChain = EXPECTED_CHAIN_ID === 1 ? mainnet : goerli

const { chains, provider, webSocketProvider } = configureChains(
  expectedChains,
  [
    infuraProvider({apiKey: INFURA_KEY, priority: 0}),
    publicProvider({priority: 1})
  ]
)

const { connectors } = getDefaultWallets({
  appName: "Engine",
  chains,
  projectId: WALLET_CONNECT_PROJECT_ID
})

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider
})

interface Props {
  children: React.ReactNode
}

const backgroundConfigs = [
  {index: 1, colors: {primary: "#fcfbf4", secondary: "#fcfbf4", shadowPrimary: "#000000", shadowSecondary: "#32a852"}},
  {index: 2, colors: {primary: "#fcfbf4", secondary: "#fcfbf4", shadowPrimary: "#000000", shadowSecondary: "#51D6FF"}},
  {index: 4, colors: {primary: "#fcfbf4", secondary: "#fcfbf4", shadowPrimary: "#000000", shadowSecondary: "#fcba03"}},
  {index: 5, colors: {primary: "#fcfbf4", secondary: "#fcfbf4", shadowPrimary: "#000000", shadowSecondary: "#eb4034"}},
  {index: 6, colors: {primary: "#FDFCDC", secondary: "#fcfbf4", shadowPrimary: "#000000", shadowSecondary: "#F07167"}},
  {index: 7, colors: {primary: "#fcfbf4", secondary: "#fcfbf4", shadowPrimary: "#000000", shadowSecondary: "#B97375"}},
  {index: 8, colors: {primary: "#fcfbf4", secondary: "#fcfbf4", shadowPrimary: "#000000", shadowSecondary: "#FFC857"}}
]
export const BackgroundContext = createContext(backgroundConfigs[0])

const AppProvider = ({children}:Props) => {
  const backgroundConfig = backgroundConfigs[Math.floor(Math.random() * backgroundConfigs.length)];

  return (
    <BackgroundContext.Provider value={backgroundConfig}>
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider
           chains={chains}
           initialChain={initialChain}
           theme={
            midnightTheme({
              borderRadius: "medium"
            })
          }>
          <ApolloProvider client={client}>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              {children}
            </ThemeProvider>
          </ApolloProvider>
        </RainbowKitProvider>
      </WagmiConfig>
    </BackgroundContext.Provider>
  )
}

export default AppProvider
