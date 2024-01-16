import { gql } from "@apollo/client";

const GET_ALL_BANNERS = gql`
  query getBanners {
    system_banner {
      expire_date
      id
      name
      path
      redirect_link
    }
  }
`;

export { GET_ALL_BANNERS };
