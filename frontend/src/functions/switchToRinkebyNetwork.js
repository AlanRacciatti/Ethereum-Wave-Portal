const switchToRinkebyNetwork = async () => {
  try {
    const { ethereum } = window;

    if (ethereum) {
      setTimeout(async () => {
        let chainId = window.ethereum.chainId;

        if (chainId !== "0x4") {
          await window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [
              {
                chainId: "0x4",
              },
            ],
          });

          window.location.reload();
        }
      }, 500);
    }
  } catch (error) {
    console.error(error);
  }
};

export {switchToRinkebyNetwork};
