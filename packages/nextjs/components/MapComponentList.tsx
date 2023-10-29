import { useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { mapsTheme } from "./assets/MapsTheme";
//@ts-ignore
import { Loader } from "@googlemaps/js-api-loader";

//@ts-ignore
function MapComponent({ addresses }) {
  const router = useRouter();
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

      //@ts-ignore
      const map = new window.google.maps.Map(mapRef.current, {
        //@ts-ignore
        center: { lat: 51.5074, lng: -0.1278 },
        zoom: 4,
        styles: mapsTheme,
      });

      console.log(addresses);

      //@ts-ignore
      const geocoder = new window.google.maps.Geocoder();

      const infoWindows: any[] = []; // keeping track of the array of infoWindows

      //@ts-ignore
      addresses.forEach(item => {
        //@ts-ignore
        geocoder.geocode({ address: item.Address }, (results, status) => {
          if (status === "OK") {
            const contentString = `
            <div id="content" style="color: black">
            <h1 style="font-weight: bold; font-size: 2em">${item.Name}</h1>
            <p style="font-size: 1.2em">${item.Address}</p>
            <button id="navigateLink" data-id=${item.id} style="background-color: #4CAF50; border: none; color: white; padding: 15px 32px; text-align: center; text-decoration: none; display: inline-block; font-size: 16px;">Join the party</button>
            </div>`;

            //@ts-ignore
            const infowindow = new google.maps.InfoWindow({
              content: contentString,
              ariaLabel: item.Name,
            });

            //@ts-ignore
            google.maps.event.addListenerOnce(infowindow, "domready", () => {
              const navigateLink = document.getElementById("navigateLink");

              if (navigateLink) {
                const clubID = navigateLink.getAttribute("data-id");
                navigateLink.addEventListener("click", () => {
                  router.push("/party/" + clubID);
                });
              }
            });

            infoWindows.push(infowindow);

            //@ts-ignore
            const marker = new window.google.maps.Marker({
              map: map,
              //@ts-ignore
              position: results[0].geometry.location,
            });

            marker.addListener("click", () => {
              //@ts-ignore
              infoWindows.forEach(infoWindow => {
                infoWindow.close();
              });

              infowindow.open({
                anchor: marker,
                map,
              });
            });
          } else {
            console.error(`Geocode was not successful for the following reason: ${status}`);
          }
        });
      });
    });
  }, [addresses]);

  return <div style={{ height: "400px", width: "400px" }} ref={mapRef} />;
}

export default MapComponent;
