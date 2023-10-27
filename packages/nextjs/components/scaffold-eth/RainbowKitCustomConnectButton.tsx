import { useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { QRCodeSVG } from "qrcode.react";
import CopyToClipboard from "react-copy-to-clipboard";
import { useDisconnect, useSwitchNetwork } from "wagmi";
import {
  ArrowLeftOnRectangleIcon,
  ArrowRightOnRectangleIcon,
  ArrowTopRightOnSquareIcon,
  ArrowsRightLeftIcon,
  CheckCircleIcon,
  DocumentDuplicateIcon,
  QrCodeIcon,
} from "@heroicons/react/24/outline";
import { Address, Balance, BlockieAvatar } from "~~/components/scaffold-eth";
import { useAutoConnect, useNetworkColor } from "~~/hooks/scaffold-eth";
import { getBlockExplorerAddressLink, getTargetNetwork } from "~~/utils/scaffold-eth";

/**
 * Custom Wagmi Connect Button (watch balance + custom design)
 */
export const RainbowKitCustomConnectButton = () => {
  useAutoConnect();
  const networkColor = useNetworkColor();
  const configuredNetwork = getTargetNetwork();
  const { disconnect } = useDisconnect();
  const { switchNetwork } = useSwitchNetwork();
  const [addressCopied, setAddressCopied] = useState(false);

  return (
    <ConnectButton.Custom>
      {({ account, chain, openConnectModal, mounted }) => {
        const connected = mounted && account && chain;
        const blockExplorerAddressLink = account
          ? getBlockExplorerAddressLink(getTargetNetwork(), account.address)
          : undefined;

        return (
          <>
            {(() => {
              if (!connected) {
                return (
                  <div
                    className="relative mx-auto"
                    onClick={() => {
                      openConnectModal();
                    }}
                  >
                    <div className="w-32 h-16 relative mx-auto">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 32 16"
                        className="w-full h-full absolute top-0 left-0 z-10 filter drop-shadow-md"
                      >
                        <polygon points="0,0 32,0 16,16" className="fill-secondary" />
                      </svg>
                    </div>
                    <div className="avatar absolute left-0 right-0 justify-center top-0 z-20">
                      <div className="rounded-full h-12 w-12 p-1.5">
                        <ArrowRightOnRectangleIcon className="h-9 w-9" />
                      </div>
                    </div>
                  </div>
                );
              }

              if (chain.unsupported || chain.id !== configuredNetwork.id) {
                return (
                  <div className="px-2 flex justify-center items-center">
                    <div className="dropdown dropdown-bottom">
                      <div tabIndex={0} className="">
                        <div className="w-32 h-16 relative mx-auto">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 32 16"
                            className="w-full h-full absolute top-0 left-0 z-10 filter drop-shadow-md  dropdown-toggle"
                          >
                            <polygon points="0,0 32,0 16,16" className="fill-red-500" />
                          </svg>
                        </div>
                        <div className="avatar absolute left-0 right-0 justify-center top-0 z-20">
                          <div className="rounded-full h-12 w-12 p-1.5">
                            <ArrowRightOnRectangleIcon className="h-9 w-9" />
                          </div>
                        </div>
                      </div>
                      <ul
                        tabIndex={0}
                        className="dropdown-content menu p-2 mt-2 shadow-center shadow-secondary bg-base-200 rounded-box gap-1"
                      >
                        <li>
                          <button
                            className="btn-sm !rounded-xl flex py-3 gap-3"
                            type="button"
                            onClick={() => switchNetwork?.(configuredNetwork.id)}
                          >
                            <ArrowsRightLeftIcon className="h-6 w-4 ml-2 sm:ml-0" />
                            <span className="whitespace-nowrap">
                              Switch to <span style={{ color: networkColor }}>{configuredNetwork.name}</span>
                            </span>
                          </button>
                        </li>
                        <li>
                          <button
                            className="menu-item text-error btn-sm !rounded-xl flex gap-3 py-3"
                            type="button"
                            onClick={() => disconnect()}
                          >
                            <ArrowLeftOnRectangleIcon className="h-6 w-4 ml-2 sm:ml-0" /> <span>Disconnect</span>
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                );
              }

              return (
                <div className="px-2 flex justify-center items-center">
                  <div className="dropdown dropdown-bottom leading-3">
                    <div tabIndex={0} className="relative mx-auto ">
                      <div className="w-32 h-16 relative mx-auto ">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 32 16"
                          className="w-full h-full absolute top-0 left-0 z-10 filter drop-shadow-md dropdown-toggle"
                        >
                          <polygon points="0,0 32,0 16,16" className="fill-secondary" />
                        </svg>
                      </div>
                      <div className="avatar absolute left-0 right-0 justify-center top-0 z-20">
                        <div className="rounded-full h-12 w-12 p-1.5">
                          <BlockieAvatar address={account.address} size={30} ensImage={account.ensAvatar} />
                        </div>
                      </div>
                    </div>
                    <ul
                      tabIndex={0}
                      className="dropdown-content menu z-[2] p-2 mt-2 shadow-center shadow-secondary bg-base-200 rounded-box gap-1"
                    >
                      <li>
                        <Balance address={account.address} className="min-h-0 h-auto" />
                      </li>
                      <li>
                        {addressCopied ? (
                          <div className="btn-sm !rounded-xl flex gap-3 py-3">
                            <CheckCircleIcon
                              className="text-xl font-normal h-6 w-4 cursor-pointer ml-2 sm:ml-0"
                              aria-hidden="true"
                            />
                            <span className=" whitespace-nowrap">Copy address</span>
                          </div>
                        ) : (
                          <CopyToClipboard
                            text={account.address}
                            onCopy={() => {
                              setAddressCopied(true);
                              setTimeout(() => {
                                setAddressCopied(false);
                              }, 800);
                            }}
                          >
                            <div className="btn-sm !rounded-xl flex gap-3 py-3">
                              <DocumentDuplicateIcon
                                className="text-xl font-normal h-6 w-4 cursor-pointer ml-2 sm:ml-0"
                                aria-hidden="true"
                              />
                              <span className=" whitespace-nowrap">Copy address</span>
                            </div>
                          </CopyToClipboard>
                        )}
                      </li>
                      <li>
                        <label htmlFor="qrcode-modal" className="btn-sm !rounded-xl flex gap-3 py-3">
                          <QrCodeIcon className="h-6 w-4 ml-2 sm:ml-0" />
                          <span className="whitespace-nowrap">View QR Code</span>
                        </label>
                      </li>
                      <li>
                        <button className="menu-item btn-sm !rounded-xl flex gap-3 py-3" type="button">
                          <ArrowTopRightOnSquareIcon className="h-6 w-4 ml-2 sm:ml-0" />
                          <a
                            target="_blank"
                            href={blockExplorerAddressLink}
                            rel="noopener noreferrer"
                            className="whitespace-nowrap"
                          >
                            View on Block Explorer
                          </a>
                        </button>
                      </li>
                      <li>
                        <button
                          className="menu-item text-error btn-sm !rounded-xl flex gap-3 py-3"
                          type="button"
                          onClick={() => disconnect()}
                        >
                          <ArrowLeftOnRectangleIcon className="h-6 w-4 ml-2 sm:ml-0" /> <span>Disconnect</span>
                        </button>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <input type="checkbox" id="qrcode-modal" className="modal-toggle" />
                    <label htmlFor="qrcode-modal" className="modal cursor-pointer">
                      <label className="modal-box relative">
                        {/* dummy input to capture event onclick on modal box */}
                        <input className="h-0 w-0 absolute top-0 left-0" />
                        <label
                          htmlFor="qrcode-modal"
                          className="btn btn-ghost btn-sm btn-circle absolute right-3 top-3"
                        >
                          ✕
                        </label>
                        <div className="space-y-3 py-6">
                          <div className="flex space-x-4 flex-col items-center gap-6">
                            <QRCodeSVG value={account.address} size={256} />
                            <Address address={account.address} format="long" disableAddressLink />
                          </div>
                        </div>
                      </label>
                    </label>
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
