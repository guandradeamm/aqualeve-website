import React from "react";
import Image from "next/image";
import { useCampaign } from "../common/CampaignProvider";

function PinkRibbon({ className = "" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      width="28"
      height="28"
      aria-hidden="true"
      fill="currentColor"
    >
      <path d="M12.2 21.2c-.3-.2-6.4-4.7-7.6-8.3C3.4 10.2 4 7.6 6.2 6.4c1.5-.8 3.3-.4 4.4.8l1.4 1.5 1.4-1.5c1.1-1.2 2.9-1.6 4.4-.8 2.2 1.2 2.8 3.8 1.6 6.5-1.2 3.6-7.3 8.1-7.6 8.3-.2.1-.4.1-.6 0z" />
      <path
        d="M9.2 5.2c.6-.9 1.7-1.4 2.8-1.2.4.1.7.3 1 .5.3-.2.6-.4 1-.5 1.1-.2 2.2.3 2.8 1.2.5.8.5 1.8 0 2.6L12 12.1 9.2 7.8c-.5-.8-.5-1.8 0-2.6z"
        opacity="0.85"
      />
    </svg>
  );
}

const Hero = () => {
  const campaign = useCampaign();
  const hero = campaign?.hero;
  const component = "hero";

  return (
    <div
      id={component}
      className="content-base sm:content-sm md:content-md lg:content-lg xl:content-xl py-10 lg:py-0"
    >
      <div className="w-full h-full relative">
        {hero ? (
          <div
            className="pointer-events-none absolute inset-0 z-[1]"
            style={{
              backgroundImage:
                "linear-gradient(to right, var(--campaign-overlay-from), var(--campaign-overlay-via), transparent)",
            }}
            aria-hidden
          />
        ) : null}
        <div className="w-full h-2/6 flex items-center justify-center absolute inset-0 z-10">
          <div className="w-4/5 lg:mt-40">
            {hero?.eyebrow ? (
              <p className="mb-3 flex items-center gap-2 font-mont text-sm font-semibold uppercase tracking-[0.2em] text-campaign-heading sm:text-base">
                {hero.showRibbon ? (
                  <PinkRibbon className="text-campaign-cta" />
                ) : null}
                {hero.eyebrow}
              </p>
            ) : null}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl lg:leading-snug font-livvic font-semibold italic text-theme-middle-blue">
              A água mais pura
              <br />
              <span className="text-theme-dark-blue"> de Minas</span>
            </h1>
            {hero?.message ? (
              <p className="mt-4 max-w-xl font-questrial text-base text-theme-dark-blue sm:text-lg lg:text-xl">
                {hero.message}
              </p>
            ) : null}
          </div>
        </div>
        <Image
          priority
          src="/assets/img/banner.jpg"
          alt="A água mais pura de Minas"
          layout="fill"
          className="object-right-bottom object-cover w-full h-full"
        />
      </div>
    </div>
  );
};

export default Hero;
