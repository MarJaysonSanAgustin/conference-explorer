import { gql } from "@apollo/client";

export const getAllConferencesQuery = gql`
  query {
    conferences {
      id
      slogan
      name
      startDate
      endDate
      year
      series {
        id
      }
      locations {
        name
        image {
          title
          url
          style {
            backgroundSize
          }
        }
      }
    }
  }
`;

export const getConferenceByIdQuery = (id: string) => gql`
  query {
    conference(id: "${id}") {
      id
      slogan
      name
      startDate
      endDate
      year
      series {
        id
      }
      locations {
        country {
          name
          code
        }
        image {
          title
          url
          style {
            backgroundSize
          }
        }
      city
      name
      address
    }
    organizer {
      name
    }
    series {
      name
    }
    websiteUrl
    }
  }
`;
