import { useEffect, useRef } from "react";
//@ts-ignore
import { Loader } from "@googlemaps/js-api-loader";

//@ts-ignore
function MapComponent({ address }) {
  const mapRef = useRef(null);
  //@ts-ignore
  // const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
      version: "weekly",
    });

    loader.load().then(() => {
      //@ts-ignore
      if (!window.google) {
        console.error("Google Maps JavaScript API failed to load.");
        return;
      }
      //@ts-ignorex
      const geocoder = new window.google.maps.Geocoder();
      //@ts-ignore
      geocoder.geocode({ address: address }, (results, status) => {
        if (status === "OK") {
          //@ts-ignore
          const map = new window.google.maps.Map(mapRef.current, {
            //@ts-ignore
            center: results[0].geometry.location,
            zoom: 8,
          });
          //@ts-ignore
          /*const marker = */ new window.google.maps.Marker({
            map: map,
            //@ts-ignore
            position: results[0].geometry.location,
          });
        } else {
          console.error(`Geocode was not successful for the following reason: ${status}`);
        }
      });

      // setMapLoaded(true);
    });
  }, [address]);

  return <div style={{ height: "400px", width: "400px" }} ref={mapRef} />;
}

export default MapComponent;
