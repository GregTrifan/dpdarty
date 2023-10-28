import { useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { NextPage } from "next";
import { QRCodeSVG } from "qrcode.react";
import CopyToClipboard from "react-copy-to-clipboard";
import { useDisconnect, useSwitchNetwork } from "wagmi";
import {
  ArrowLeftOnRectangleIcon,
  ArrowTopRightOnSquareIcon,
  ArrowsRightLeftIcon,
  CheckCircleIcon,
  ChevronDownIcon,
  DocumentDuplicateIcon,
  QrCodeIcon,
} from "@heroicons/react/24/outline";
import { Address, Balance, BlockieAvatar } from "~~/components/scaffold-eth";
import { useAutoConnect, useNetworkColor } from "~~/hooks/scaffold-eth";
import { getBlockExplorerAddressLink, getTargetNetwork } from "~~/utils/scaffold-eth";

/**
 * Custom Auth profile page
 */
const Profile: NextPage = () => {
  useAutoConnect();
  const networkColor = useNetworkColor();
  const configuredNetwork = getTargetNetwork();
  const { disconnect } = useDisconnect();
  const { switchNetwork } = useSwitchNetwork();
  const [addressCopied, setAddressCopied] = useState(false);

  return (
    <div>
      <ConnectButton.Custom>
        {({ account, chain, openConnectModal, mounted }) => {
          const connected = mounted && account && chain;
          const blockExplorerAddressLink = account
            ? getBlockExplorerAddressLink(getTargetNetwork(), account.address)
            : undefined;

          return (
            <div className="max-w-xs mx-auto text-center mt-8 z-20">
              {(() => {
                if (!connected) {
                  return (
                    <button
                      className="btn btn-secondary shadow-md shadow-secondary "
                      onClick={() => {
                        openConnectModal();
                      }}
                    >
                      Connect wallet
                    </button>
                  );
                }

                if (chain.unsupported || chain.id !== configuredNetwork.id) {
                  return (
                    <div className="px-2 flex justify-center items-center">
                      <div className="dropdown dropdown-bottom">
                        <label tabIndex={0} className="btn btn-error dropdown-toggle gap-1">
                          <span>Wrong network</span>
                          <ChevronDownIcon className="h-6 w-4 ml-2 sm:ml-0" />
                        </label>
                        <ul
                          tabIndex={0}
                          className="dropdown-content menu p-2 mt-2 shadow-center shadow-secondary bg-base-200 rounded-box gap-1"
                        >
                          <li>
                            <button
                              className=" !rounded-xl flex py-3 gap-3"
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
                              className="menu-item text-error !rounded-xl flex gap-3 py-3"
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
                  <div className="px-2 text-center">
                    <div className="avatar justify-center">
                      <div className="rounded-full h-24 w-24 p-1.5">
                        <BlockieAvatar address={account.address} size={30} ensImage={account.ensAvatar} />
                      </div>
                    </div>
                    <div className="my-3 mr-4">
                      {addressCopied ? (
                        <div className="btn-sm !rounded-xl text-lg text-center my-auto flex justify-center gap-1">
                          <CheckCircleIcon
                            className="text-xl font-normal h-6 w-4 cursor-pointer my-auto ml-2 sm:ml-0"
                            aria-hidden="true"
                          />
                          {`${account.address.substring(0, 4)}...${account.address.slice(-4)}`}
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
                          <div className="btn-sm !rounded-xl text-lg text-center my-auto flex justify-center gap-1">
                            <DocumentDuplicateIcon
                              className="text-xl font-normal h-6 w-4 cursor-pointer my-auto ml-2 sm:ml-0"
                              aria-hidden="true"
                            />
                            {`${account.address.substring(0, 4)}...${account.address.slice(-4)}`}
                          </div>
                        </CopyToClipboard>
                      )}
                    </div>
                    <Balance address={account.address} className="min-h-0 h-auto text-center mx-auto my-3 text-lg" />
                    <div className="mt-8 ">
                      <label htmlFor="qrcode-modal" className="btn btn-ghost my-2 mx-auto !rounded-xl flex gap-2 py-3">
                        <QrCodeIcon className="h-6 w-4 ml-2 sm:ml-0" />
                        <span className="whitespace-nowrap">View QR Code</span>
                      </label>
                      <button className="btn btn-ghost my-2 mx-auto !rounded-xl flex gap-2 py-3 w-full">
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
                      <button
                        className="btn btn-error mx-auto !rounded-xl flex gap-2 py-3 w-full"
                        type="button"
                        onClick={() => disconnect()}
                      >
                        <ArrowLeftOnRectangleIcon className="h-6 w-4" /> <span>Disconnect</span>
                      </button>
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
            </div>
          );
        }}
      </ConnectButton.Custom>
      <div
        className="group relative left-0 right-0 bottom-42 md:top-24 text-center overflow-hidden"
        style={{ zIndex: -1 }}
      >
        <h2 className="font-bold text-white/30 ml-52 mb-24 absolute" style={{ fontSize: "128px" }}>
          Your
        </h2>
        <h1 className="font-black text-white/20 z-0 mr-12 mt-12" style={{ fontSize: "230px" }}>
          Profile
        </h1>
        <div className="absolute left-0 right-0 w-full h-2 bg-gradient-to-r from-primary/70 via-primary/50 to-primary/70 opacity-0 transform translate-y-1/2 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
    </div>
  );
};

export default Profile;
