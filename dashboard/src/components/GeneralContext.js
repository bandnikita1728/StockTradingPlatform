import React, { useState } from "react";
import OrderActionWindow from "./BuyActionWindow";

const GeneralContext = React.createContext({
  openBuyWindow: (uid) => {},
  closeBuyWindow: () => {},
  openSellWindow: (uid) => {},
  closeSellWindow: () => {},
});

export const GeneralContextProvider = (props) => {
  const [orderWindow, setOrderWindow] = useState(null); // { uid, mode } | null

  const handleOpenBuyWindow = (uid) => setOrderWindow({ uid, mode: "BUY" });
  const handleCloseBuyWindow = () => setOrderWindow(null);
  const handleOpenSellWindow = (uid) => setOrderWindow({ uid, mode: "SELL" });
  const handleCloseSellWindow = () => setOrderWindow(null);

  return (
    <GeneralContext.Provider
      value={{
        openBuyWindow: handleOpenBuyWindow,
        closeBuyWindow: handleCloseBuyWindow,
        openSellWindow: handleOpenSellWindow,
        closeSellWindow: handleCloseSellWindow,
      }}
    >
      {props.children}
      {orderWindow && (
        <OrderActionWindow uid={orderWindow.uid} mode={orderWindow.mode} />
      )}
    </GeneralContext.Provider>
  );
};

export default GeneralContext;
