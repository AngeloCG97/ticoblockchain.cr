import gql from 'graphql-tag'

export const NOTIFICATION_SUBSCRIPTION = gql`
  subscription {
    record_tracking {
      id
      project_id
      json_data
      user_reference
      hash_result
      created_at
      updated_at
    }
  }
`
