import { XMarkIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

export const PlanesDeSuscripcion = ({
  closeModal,
}: {
  closeModal?: (val: boolean) => void;
}) => {
  const plans = [
    {
      name: "Aportante Premium",
      desc: "Una gran ayuda para que esto exista y crezca.",
      price: 500,
      isMostPop: true,
      url: "https://www.mercadopago.com.uy/subscriptions/checkout?preapproval_plan_id=2c938084922e71cf01923fe647960477",
    },
    {
      name: "Aportante Starter",
      desc: "Invitanos una cerveza al mes.",
      price: 250,
      isMostPop: false,
      url: "https://www.mercadopago.com.uy/subscriptions/checkout?preapproval_plan_id=2c938084922e71cf01923fe526bd0476",
    },
    {
      name: "Aportante Black",
      desc: "Si no sos familiar nuestro deberías serlo.",
      price: 2000,
      isMostPop: true,
      isMostTop: true,
      url: "https://www.mercadopago.com.uy/subscriptions/checkout?preapproval_plan_id=2c938084922e71cf01923fe38a000475",
    },
  ];

  return (
    <div className="custom-screen relative pt-2 sm:pb-6 mt-52 md:mt-0">
      {closeModal && (
        <div className="flex justify-end">
          <button
            onClick={() => closeModal && closeModal(false)}
            className="relative z-10 p-1 rounded-md text-gray-400 hover:bg-zinc-700 duration-150"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>
      )}
      {closeModal && (
        <div
          className="absolute inset-0 blur-[118px] max-w-lg h-[800px] mx-auto md:max-w-8xl sm:h-[400px]"
          style={{
            background:
              "linear-gradient(106.89deg, rgba(192, 132, 252, 0.11) 15.73%, rgba(14, 165, 233, 0.41) 15.74%, rgba(232, 121, 249, 0.26) 56.49%, rgba(79, 70, 229, 0.4) 115.91%)",
          }}
        ></div>
      )}
      <div className="relative max-w-screen-xl mx-auto text-gray-300 sm:px-4 md:px-8">
        <div className="max-w-xl mx-auto space-y-2 px-4 sm:text-center sm:px-0">
          <h3 className="text-cyan-400 font-semibold">Aporte mensual</h3>
          <p className="text-3xl sm:text-4xl heading">Hacete blandengue</p>
          <p>
            Suscripción mensual via Mercado Pago. Precio en pesos uruguayos.
          </p>
        </div>
        <div className="mt-10 justify-center sm:flex">
          {plans.map((item, idx) => (
            <div
              key={idx}
              className={`relative flex-1 flex items-stretch flex-col mt-10 border-2 sm:mt-0 sm:rounded-xl sm:max-w-md   ${
                item.isMostTop
                  ? "bg-gray-950 border-cyan-400 border-x-0 sm:border-x-2"
                  : item.isMostPop
                  ? "bg-gray-900 border-white border-x-0 sm:border-x-2"
                  : "border-transparent"
              }`}
            >
              <div className="p-8 space-y-6 md:p-8">
                <span className="text-gray-200 font-medium">{item.name}</span>
                <div className="text-cyan-400 text-3xl font-semibold">
                  ${item.price}
                  <span className="text-xl font-normal">/mes</span>
                </div>
                <p className="text-gray-300 text-xs">{item.desc}</p>
                <button className="px-3 py-3 mt-3 rounded-lg w-full font-semibold cursor-pointer text-sm duration-150 text-white bg-cyan-500 hover:bg-cyan-600 active:bg-cyan-700 hover:animate-pulse">
                  <Link href={item.url}>Suscribite</Link>
                </button>
              </div>
            </div>
          ))}
        </div>
        {/* Sección para aportes únicos */}
        <div className="mt-10 text-center">
          <h3 className="text-cyan-400 font-semibold mb-4">Aportá por única vez</h3>
          <div className=" flex justify-center space-x-4 animation-pulse">
            <Link href="https://mpago.la/1AjKfBc" className="text-white hover:text-gray-200 duration-150">
              $200
            </Link>
            <Link href="https://mpago.la/2cZEDA9" className="text-white hover:text-gray-200 duration-150">
              $400
            </Link>
            <Link href="https://mpago.la/17NwSeL" className="text-white hover:text-gray-200 duration-150">
              $800
            </Link>
            <Link href="https://mpago.la/2caXqs5" className="text-white hover:text-gray-200 duration-150">
              $1500
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
