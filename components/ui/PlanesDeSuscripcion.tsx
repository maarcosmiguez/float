import { XMarkIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { useEffect } from "react";
import SociosCounter from "./SociosCounter";

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
      mercadoPagoUrl:
        "https://www.mercadopago.com.uy/subscriptions/checkout?preapproval_plan_id=2c938084922e71cf01923fe647960477",
      paypalPlanId: "P-2SL43044JV839462EM5Q3EUA",
      paypalStyle: { shape: "rect", color: "silver", layout: "horizontal", label: "subscribe" },
    },
    {
      name: "Aportante Starter",
      desc: "Invitanos una cerveza al mes.",
      price: 250,
      mercadoPagoUrl:
        "https://www.mercadopago.com.uy/subscriptions/checkout?preapproval_plan_id=2c938084922e71cf01923fe526bd0476",
    },
    {
      name: "Aportante Black",
      desc: "Si no sos familiar nuestro deberías serlo.",
      price: 2000,
      mercadoPagoUrl:
        "https://www.mercadopago.com.uy/subscriptions/checkout?preapproval_plan_id=2c938084922e71cf01923fe38a000475",
      paypalPlanId: "P-65R03174UU863414SM5Q3KUQ",
      paypalStyle: { shape: "rect", color: "black", layout: "horizontal", label: "subscribe" },
    },
  ];

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://www.paypal.com/sdk/js?client-id=Acrsr1uZ6C4oJrP_V_XHvsZgbZrsO7V985olW35vayoAQoXSsrcqbY8x1d8M8OGgZsfTHVFbUxbNM8h_&vault=true&intent=subscription";
    script.async = true;
    script.onload = () => {
      plans.forEach((plan, idx) => {
        if (plan.paypalPlanId) {
          const containerId = `paypal-button-container-${idx}`;
          if (document.getElementById(containerId)) {
            window.paypal
              .Buttons({
                style: plan.paypalStyle,
                createSubscription: function (data: any, actions: any) {
                  return actions.subscription.create({
                    plan_id: plan.paypalPlanId,
                  });
                },
                onApprove: function (data: any) {
                  alert(`Subscription ID: ${data.subscriptionID}`);
                },
              })
              .render(`#${containerId}`);
          }
        }
      });
    };
    document.body.appendChild(script);
  }, []);

  return (
    <div className="custom-screen relative pt-2 sm:pb-6 mt-52 md:mt-0">
      {closeModal && (
        <div className="flex justify-end">
          <button
            onClick={() => closeModal(false)}
            className="relative z-10 p-1 rounded-md text-gray-400 hover:bg-zinc-700 duration-150"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>
      )}
      <div className="relative max-w-screen-xl mx-auto text-gray-300 sm:px-4 md:px-8">
        <div className="max-w-xl mx-auto space-y-2 px-4 sm:text-center sm:px-0">
          <h3 className="text-dopamina-amarillo font-semibold">Aporte mensual</h3>
          <p className="text-3xl sm:text-4xl heading">Hacete blandengue</p>
          <p>
            A Dopamina lo hace grande su gente. Somos un medio independiente y
            nos banca quien nos ve, no un dueño con agenda. Cada aporte es
            aire para seguir al aire.
          </p>
        </div>

        <div className="mt-10">
          <SociosCounter />
        </div>

        {/* Membresía de Youtube: la vía recomendada */}
        <div className="mt-10 max-w-2xl mx-auto rounded-2xl border-2 border-dopamina-amarillo bg-gradient-to-br from-dopamina-violeta/20 to-transparent p-6 sm:p-8 text-center space-y-3">
          <span className="inline-block text-xs font-bold tracking-wide uppercase text-dopamina-amarillo">
            La forma recomendada
          </span>
          <p className="text-2xl sm:text-3xl heading">Hacete miembro en Youtube</p>
          <p className="text-gray-300 max-w-md mx-auto">
            Un click, sin vueltas: te sumás como miembro del canal y listo. Acceso a contenido exclusivo, insignias y la satisfacción de bancar el medio que mirás.
          </p>
          <a
            href="https://www.youtube.com/@estoesdopamina/join"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold bg-dopamina-amarillo text-zinc-950 hover:bg-yellow-300 duration-150"
          >
            Hacerme miembro
          </a>
        </div>

        <div className="mt-10 flex items-center gap-4 max-w-2xl mx-auto">
          <div className="flex-1 h-px bg-zinc-800" />
          <span className="text-xs text-zinc-500 uppercase tracking-wide">o elegí tu aporte</span>
          <div className="flex-1 h-px bg-zinc-800" />
        </div>
        <p className="text-center text-sm text-gray-400 mt-2">
          Mercado Pago para Uruguay, PayPal si estás afuera.
        </p>

        <div className="mt-6 justify-center sm:flex">
          {plans.map((item, idx) => (
            <div
              key={idx}
              className={`relative flex-1 flex items-stretch flex-col mt-10 border-2 sm:mt-0 sm:rounded-xl sm:max-w-md ${
                idx === 2 ? "bg-gray-950 border-dopamina-violeta" : idx === 0 ? "bg-gray-900 border-white" : "border-transparent"
              }`}
            >
              <div className="p-8 space-y-6 md:p-8">
                <span className="text-gray-200 font-medium">{item.name}</span>
                <div className="text-dopamina-amarillo text-3xl font-semibold">
                  ${item.price}
                  <span className="text-xl font-normal">/mes</span>
                </div>
                <p className="text-gray-300 text-xs">{item.desc}</p>
                <div className="flex flex-col gap-1">
                  {/* Botón de Mercado Pago */}
                  <button className="px-3 py-3 rounded-lg w-full font-semibold cursor-pointer text-sm duration-150 text-white bg-dopamina-violeta hover:bg-violet-600 active:bg-violet-700">
                    <Link href={item.mercadoPagoUrl}>Mercado Pago</Link>
                  </button>
                  {/* Contenedor del botón PayPal (solo si aplica) */}
                  {item.paypalPlanId && (
                    <div
                      id={`paypal-button-container-${idx}`}
                      className="mt-4"
                    ></div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
               {/* Sección para aporte único */}
               <div className="mt-16 text-center">
               <div className="flex justify-center">
            <form
              action="https://www.paypal.com/ncp/payment/4VUHJ8PLGKS9N"
              method="post"
              target="_top"
              style={{ display: "inline-grid", justifyItems: "center", alignContent: "start", gap: "1rem" }}
            >
              <input
                className="pp-4VUHJ8PLGKS9N"
                type="submit"
                value="Aportá por única vez"
                style={{
                  textAlign: "center",
                  border: "none",
                  borderRadius: "1.5rem",
                  minWidth: "11.625rem",
                  padding: "0 2rem",
                  height: "2.625rem",
                  fontWeight: "bold",
                  backgroundColor: "#FFD140",
                  color: "#000000",
                  fontFamily: '"Helvetica Neue", Arial, sans-serif',
                  fontSize: "1rem",
                  lineHeight: "1.25rem",
                  cursor: "pointer",
                }}
              />
              <img
                src="https://www.paypalobjects.com/images/Debit_Credit.svg"
                alt="cards"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
