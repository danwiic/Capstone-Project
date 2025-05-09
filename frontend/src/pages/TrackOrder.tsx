import { useEffect, useRef, useState } from "react";
import Navbar from "../components/Nav/Navbar";

export default function TrackOrder() {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const containerRef = useRef(null);

  // Load the 17track script
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "//www.17track.net/externalcall.js";
    script.async = true;
    script.onload = () => setScriptLoaded(true);

    document.body.appendChild(script);

    return () => {
      // Clean up on unmount
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  function doTrack() {
    if (!trackingNumber) {
      alert("Enter your tracking number.");
      return;
    }

    if (!scriptLoaded || !window.YQV5) {
      alert("Tracking system is still loading. Please try again in a moment.");
      return;
    }

    window.YQV5.trackSingle({
      YQ_ContainerId: "YQContainer",
      YQ_Height: 800,
      YQ_Fc: "0",
      YQ_Lang: "en",
      YQ_Num: trackingNumber,
    });
  }

  return (
    <Navbar>
      <div className="px-30 mw-full p-4 flex flex-col gap-4">
        <h1 className="text-xl font-bold mb-4">Track Your Order</h1>
        <div className="flex  gap-2 mb-6">
          <input
            type="text"
            id="YQNum"
            value={trackingNumber}
            onChange={(e) => setTrackingNumber(e.target.value)}
            maxLength={50}
            placeholder="Enter tracking number"
            className="border text-sm focus:outline-2 outline-mayormoto-pink bg-white border-gray-300 p-2 rounded flex-grow"
          />
          <button
            onClick={doTrack}
            className="bg-mayormoto-pink text-white text-sm px-4 py-2 rounded hover:bg-mayormoto-pink/80"
            disabled={!scriptLoaded}
          >
            TRACK
          </button>
        </div>
        <div
          id="YQContainer"
          ref={containerRef}
          className="rounded  max-h-auto bg-white border-gray-300 border w-full"
        >
          <div className="flex items-center justify-center py-20 px-20 text-sm text-gray-500">
            Please enter your tracking number to view the location of your
            order.
          </div>
        </div>
      </div>
    </Navbar>
  );
}
