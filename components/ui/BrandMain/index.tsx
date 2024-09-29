import Image from "next/image";
import logoHeader from "public/logo-header.png";

export default () => (
  <>
    <div>
      <Image src={logoHeader} alt="Dopamina Logo" />
    </div>
  </>
);
