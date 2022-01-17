import {
  Hero,
  Empresa,
  FaleConosco,
  Localizacao,
  Produtos,
} from "../components";
import { graphCMSClient } from "../services";
import { gql } from "graphql-request";

function Home({ empresas, produtos, localAssets }) {
  return (
    <>
      <main className="pt-32 ">
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
}

export default Home;
