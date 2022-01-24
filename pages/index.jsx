import {
  Hero,
  Empresa,
  FaleConosco,
  Localizacao,
  Produtos,
  Header,
} from "../components";
import { graphCMSClient } from "../services";
import { gql } from "graphql-request";

function Home({ empresas, produtos, localAssets, navigationLinks }) {
  return (
    <>
      <Header content={navigationLinks} />
      <main className="pt-20 sm:pt-24 md:pt-32 lg:pt-36 w-screen h-screen">
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
}

export default Home;
