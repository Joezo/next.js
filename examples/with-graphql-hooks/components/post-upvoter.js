import React from 'react'
import { useMutation } from 'graphql-hooks'

const UPDATE_POST = `
  mutation updatePost($id: ID!, $votes: Int) {
    updatePost(id: $id, votes: $votes) {
      id
      __typename
      votes
    }
  }
`

export default function PostUpvoter ({ votes, id }) {
  const [updatePost, state] = useMutation(UPDATE_POST)
  console.log('state', state)
  return (
    <button onClick={() => upvotePost(votes, id, updatePost)}>
      {votes}
      <style jsx>{`
        button {
          background-color: transparent;
          border: 1px solid #e4e4e4;
          color: #000;
        }
        button:active {
          background-color: transparent;
        }
        button:before {
          align-self: center;
          border-color: transparent transparent #000000 transparent;
          border-style: solid;
          border-width: 0 4px 6px 4px;
          content: '';
          height: 0;
          margin-right: 5px;
          width: 0;
        }
      `}</style>
    </button>
  )
}

function upvotePost (votes, id, updatePost) {
  updatePost({
    variables: {
      id,
      votes: votes + 1
    }
  })
}
