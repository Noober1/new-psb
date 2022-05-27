import LogoImage from "../../assets/images/logo192.png";
import Image from "next/image";
import clsx from "clsx";

const Logo = ({ className }: { className: string }) => {
  return (
    <div className={clsx("relative", className)} style={{ aspectRatio: "1/1" }}>
      <Image src={LogoImage} layout="fill" objectFit="cover" alt="Logo" />
    </div>
  );
};

export default Logo;
