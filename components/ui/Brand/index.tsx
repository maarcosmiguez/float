import Image from "next/image";
import dopaminaLogo from "public/dopamina-logo.png";

export default () => (
  <>
    <div>
      <Image className="max-w-[90px]" src={dopaminaLogo} alt="Dopamina Logo" />
    </div>
  </>
);
