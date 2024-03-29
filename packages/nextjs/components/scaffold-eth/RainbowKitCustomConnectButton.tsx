import { useRouter } from "next/router";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { HomeIcon } from "@heroicons/react/20/solid";
import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";
import { useAutoConnect } from "~~/hooks/scaffold-eth";
import { getTargetNetwork } from "~~/utils/scaffold-eth";

/**
 * Custom Wagmi Connect Button (watch balance + custom design)
 */
export const RainbowKitCustomConnectButton = () => {
  useAutoConnect();
  const configuredNetwork = getTargetNetwork();

  const router = useRouter();
  return (
    <ConnectButton.Custom>
      {({ account, chain, mounted }) => {
        const connected = mounted && account && chain;
        return (
          <>
            {(() => {
              if (!connected) {
                return (
                  <div
                    className="max-w-fit"
                    onClick={() => {
                      router.push("/profile");
                    }}
                  >
                    <div className="w-32 h-16 relative mx-auto ">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 32 32"
                        className="w-full h-full absolute top-0 left-0 z-10 filter drop-shadow-md"
                      >
                        <polygon points="16,0 32,16 16,32 0,16" className="fill-secondary animate-pulse" />
                      </svg>
                    </div>
                    <div className="avatar absolute left-0 right-0 justify-center top-2 z-20">
                      <div className="rounded-full h-12 w-12 p-1.5 ">
                        <ArrowRightOnRectangleIcon className="h-9 w-9" />
                      </div>
                    </div>
                  </div>
                );
              }

              if (chain.unsupported || chain.id !== configuredNetwork.id) {
                return (
                  <div className="px-2 flex justify-center items-center">
                    <div
                      onClick={() => {
                        router.push("/profile");
                      }}
                    >
                      <div className="w-32 h-16 relative mx-auto">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 32 32"
                          className="w-full h-full absolute top-0 left-0 z-10 filter drop-shadow-md"
                        >
                          <polygon points="16,0 32,16 16,32 0,16" className="fill-danger animate-pulse" />
                        </svg>
                      </div>
                      <div className="avatar absolute left-0 right-0 justify-center top-2 z-20">
                        <div className="rounded-full h-12 w-12 p-1.5">
                          <ArrowRightOnRectangleIcon className="h-9 w-9" />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <div className="px-2 flex justify-center items-center">
                  <div className=" leading-3">
                    <div
                      onClick={() => {
                        router.push("/");
                      }}
                      className="relative mx-auto "
                    >
                      <div className="w-32 h-16 relative mx-auto ">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 32 32"
                          className="w-full h-full absolute top-0 left-0 z-10 filter drop-shadow-md"
                        >
                          <polygon points="16,0 32,16 16,32 0,16" className="fill-secondary animate-pulse" />
                        </svg>
                      </div>
                      <div className="avatar absolute left-0 right-0 justify-center top-1 z-20">
                        <div className="rounded-full h-12 w-12 p-1.5">
                          <HomeIcon className="h-9 w-9" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })()}
          </>
        );
      }}
    </ConnectButton.Custom>
  );
};
