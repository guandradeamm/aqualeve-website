import {
  Hero,
  Empresa,
  FaleConosco,
  Localizacao,
  Produtos,
<<<<<<< HEAD
  Header,
=======
>>>>>>> b2b14e2b2ab51cdc249a4b8de6523961620aa546
} from "../components";
import { graphCMSClient } from "../services";
import { gql } from "graphql-request";

<<<<<<< HEAD
function Home({ empresas, produtos, localAssets, navigationLinks }) {
  return (
    <>
      <Header content={navigationLinks} />
      <main className="pt-20 sm:pt-24 md:pt-32 lg:pt-36 w-screen h-screen">
=======
function Home({ empresas, produtos, localAssets }) {
  return (
    <>
      <main className="pt-32 ">
>>>>>>> b2b14e2b2ab51cdc249a4b8de6523961620aa546
        <Hero />
        <Empresa content={empresas} />
        <Produtos content={produtos} />
        <Localizacao content={localAssets} />
        <FaleConosco />
      </main>
    </>
  );
}
export async function getStaticProps() {
<<<<<<< HEAD
  const { empresas, produtos, localAssets, navigationLinks } =
    await graphCMSClient.request(gql`
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
      }
    `);
  return { props: { empresas, produtos, localAssets, navigationLinks } };
=======
  const { empresas, produtos, localAssets } = await graphCMSClient.request(gql`
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
    }
  `);
  return { props: { empresas, produtos, localAssets } };
>>>>>>> b2b14e2b2ab51cdc249a4b8de6523961620aa546
}

export default Home;
