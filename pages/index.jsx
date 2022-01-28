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
    <div className="pt-base sm:pt-sm md:pt-md lg:pt-lg">
      <Header content={navigationLinks} />
      <main className="content-base sm:content-sm md:content-md lg:content-lg xl:content-xl snap-y snap-mandatory overflow-x-hidden scrollbar-thin scrollbar-track-transparent scrollbar-thumb-theme-green">
        <div className="snap-start">
          <Hero />
        </div>
        <div className="snap-start">
          <Empresa content={empresas} />
        </div>
        <div className="snap-start">
          <Produtos content={produtos} />
        </div>
        <div className="snap-start">
          <Localizacao content={localAssets} />
        </div>
        <div className="snap-start">
          <FaleConosco />
        </div>
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
