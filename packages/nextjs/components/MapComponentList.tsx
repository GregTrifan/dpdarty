import { useEffect, useRef } from "react";
//@ts-ignore
import { Loader } from "@googlemaps/js-api-loader";

//@ts-ignore
function MapComponent({ addresses }) {
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
      });

      console.log(addresses);

      //@ts-ignore
      const geocoder = new window.google.maps.Geocoder();

      const contentString =
        '<div id="content" style="color: black">' +
        '<div id="siteNotice">' +
        "</div>" +
        '<h1 id="firstHeading" class="firstHeading">Uluru</h1>' +
        '<div id="bodyContent">' +
        "<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large " +
        "sandstone rock formation in the southern part of the " +
        "Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) " +
        "south west of the nearest large town, Alice Springs; 450&#160;km " +
        "(280&#160;mi) by road. Kata Tjuta and Uluru are the two major " +
        "features of the Uluru - Kata Tjuta National Park. Uluru is " +
        "sacred to the Pitjantjatjara and Yankunytjatjara, the " +
        "Aboriginal people of the area. It has many springs, waterholes, " +
        "rock caves and ancient paintings. Uluru is listed as a World " +
        "Heritage Site.</p>" +
        '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">' +
        "https://en.wikipedia.org/w/index.php?title=Uluru</a> " +
        "(last visited June 22, 2009).</p>" +
        "</div>" +
        "</div>";

      //@ts-ignore
      addresses.forEach(item => {
        //@ts-ignore
        geocoder.geocode({ address: item.Address }, (results, status) => {
          if (status === "OK") {
            //@ts-ignore
            const infowindow = new google.maps.InfoWindow({
              content: contentString,
              ariaLabel: "Uluru",
            });

            //@ts-ignore
            const marker = new window.google.maps.Marker({
              map: map,
              //@ts-ignore
              position: results[0].geometry.location,
            });

            marker.addListener("click", () => {
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
