import React, { useContext, useState } from 'react'
import { useQuery, ClientContext } from 'graphql-hooks'
import ErrorMessage from './error-message'
import PostUpvoter from './post-upvoter'

export const allPostsQuery = `
  query allPosts($first: Int!, $skip: Int!) {
    allPosts(orderBy: createdAt_DESC, first: $first, skip: $skip) {
      id
      title
      votes
      url
      createdAt
    }
    _allPostsMeta {
      count
    }
  }
`

export default function PostList () {
  const [listSize, setListSize] = useState(10)

  const { loading, error, data, refetch, ...rest } = useQuery(allPostsQuery, {
    variables: { skip: 0, first: listSize }
  })

  if (error) return <ErrorMessage message='Error loading posts.' />
  if (loading && !data) return <div>Loading</div>

  const { allPosts, _allPostsMeta } = data

  const areMorePosts = allPosts.length < _allPostsMeta.count
  return (
    <section>
      <ul>
        {allPosts.map((post, index) => (
          <li key={post.id}>
            <div>
              <span>{index + 1}. </span>
              <a href={post.url}>{post.title}</a>
              <PostUpvoter id={post.id} votes={post.votes} onUpdate={refetch} />
            </div>
          </li>
        ))}
      </ul>
      {areMorePosts ? (
        <button onClick={() => setListSize(listSize + 10)}>
          {' '}
          {loading && !data ? 'Loading...' : 'Show More'}{' '}
        </button>
      ) : (
        ''
      )}
      <style jsx>{`
        section {
          padding-bottom: 20px;
        }
        li {
          display: block;
          margin-bottom: 10px;
        }
        div {
          align-items: center;
          display: flex;
        }
        a {
          font-size: 14px;
          margin-right: 10px;
          text-decoration: none;
          padding-bottom: 0;
          border: 0;
        }
        span {
          font-size: 14px;
          margin-right: 5px;
        }
        ul {
          margin: 0;
          padding: 0;
        }
        button:before {
          align-self: center;
          border-style: solid;
          border-width: 6px 4px 0 4px;
          border-color: #ffffff transparent transparent transparent;
          content: '';
          height: 0;
          margin-right: 5px;
          width: 0;
        }
      `}</style>
    </section>
  )
}
