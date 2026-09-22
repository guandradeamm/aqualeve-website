import {
  Hero,
  Empresa,
  FaleConosco,
  Localizacao,
  Produtos,
  Header,
  Footer,
  FloatingButton,
} from "../components";
import { graphCMSClient } from "../services";
import { HOME_QUERY, pickSocials } from "../lib/cms";

function Home({
  empresas,
  produtos,
  localAssets,
  navigationLinks,
  whatsapp,
  instagram,
  github,
}) {
  return (
    <div className="pt-base sm:pt-sm md:pt-md lg:pt-lg">
      <Header content={{ navigationLinks, instagram }} />
      <main className="content-base sm:content-sm md:content-md lg:content-lg xl:content-xl snap-y snap-mandatory overflow-x-hidden scrollbar-thin scrollbar-track-transparent scrollbar-thumb-theme-green">
        <div>
          <Hero />
        </div>
        <div>
          <Empresa content={empresas} />
        </div>
        <div>
          <Produtos content={produtos} />
        </div>
        <div>
          <Localizacao content={localAssets} />
        </div>
        <div>
          <FaleConosco />
        </div>
        <FloatingButton content={whatsapp} />
        <Footer content={{ github }} />
      </main>
    </div>
  );
}
export async function getStaticProps() {
  const { empresas, produtos, localAssets, navigationLinks, socials } =
    await graphCMSClient.request(HOME_QUERY);
  const { whatsapp, instagram, github } = pickSocials(socials);
  return {
    props: {
      empresas,
      produtos,
      localAssets,
      navigationLinks,
      whatsapp,
      instagram,
      github,
    },
  };
}

export default Home;
