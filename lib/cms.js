import { gql } from "graphql-request";

export const HOME_QUERY = gql`
  query GetProps {
    empresas {
      id
      name
      text
      image {
        id
        url
      }
    }
    produtos {
      id
      name
      text
      composition
      image {
        url
      }
      chemicals {
        id
        name
        value
      }
    }
    localAssets(first: 1) {
      locationVideo {
        height
        width
        url
      }
    }
    navigationLinks {
      name
      href
      id
    }
    socials {
      id
      name
      ref
      href
    }
  }
`;

export function pickSocials(socials = []) {
  const list = Array.isArray(socials) ? socials : [];

  return {
    whatsapp: list.find((social) => social.ref === "whatsapp") || null,
    instagram: list.find((social) => social.ref === "instagram") || null,
    github: list.find((social) => social.ref === "github") || null,
  };
}
