import Link from "next/link";
import { RiWhatsappFill } from "react-icons/ri";

const FloatingButton = ({ content }) => {
  const component = "floating-button";
  return (
    <div
      id={`${component}`}
      className="fixed z-50 bottom-4 right-4 flex items-center justify-center rounded-full shadow-theme-green/70 shadow-xl"
    >
      <Link href={content?.href} passHref>
        <a target={"_blank"} rel={"noreferrer"} className="w-full h-full z-10">
          <RiWhatsappFill className="text-6xl text-[#25B33C]" />
        </a>
      </Link>
      <div
        id={`${component}-background`}
        className="bg-white rounded-full h-full w-full absolute -z-10"
      ></div>
    </div>
  );
};

export default FloatingButton;
