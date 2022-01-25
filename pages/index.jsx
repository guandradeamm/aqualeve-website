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
    <div className="pt-20 sm:pt-24 md:pt-32 lg:pt-36">
      <Header content={navigationLinks} />
      <main className="h-screen w-screen snap-y snap-mandatory overflow-scroll">
        <div className="snap-start w-full h-full">
          <Hero />
        </div>
        <div className="snap-start w-full h-full">
          <Empresa content={empresas} />
        </div>
        <Produtos content={produtos} />
        <Localizacao content={localAssets} />
        <FaleConosco />
      </main>
    </div>
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
      }
    `);
  return { props: { empresas, produtos, localAssets, navigationLinks } };
}

export default Home;
