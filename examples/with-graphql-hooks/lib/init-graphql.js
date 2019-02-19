import { GraphQLClient } from 'graphql-hooks'
import memCache from 'graphql-hooks-memcache'
import unfetch from 'isomorphic-unfetch'

let graphQLClient = null

function create (initialState = {}) {
  return new GraphQLClient({
    connectToDevTools: process.browser,
    ssrMode: !process.browser, // Disables forceFetch on the server (so queries are only run once)
    url: 'https://api.graph.cool/simple/v1/cixmkt2ul01q00122mksg82pn',
    // link: new HttpLink({
    //   uri: 'https://api.graph.cool/simple/v1/cixmkt2ul01q00122mksg82pn', // Server URL (must be absolute)
    //   credentials: 'same-origin' // Additional fetch() options like `credentials` or `headers`
    // }),
    cache: memCache({ initialState }),
    fetch: process.browser ? fetch.bind() : unfetch // eslint-disable-line
  })
}

export default function initGraphQL (initialState) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!process.browser) {
    return create(initialState)
  }

  // Reuse client on the client-side
  if (!graphQLClient) {
    graphQLClient = create(initialState)
  }

  return graphQLClient
}
