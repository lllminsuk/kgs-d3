import { gql } from "@apollo/client";

export const SEARCH = gql`
  query Search($limit: Int!, $words: String!) {
    search(limit: $limit, words: $words) {
      nodes {
        id
        type
        url
        main
        sub
        title
        uploadTime
      }
      links {
        source
        target
        label
      }
    }
  }
`;
