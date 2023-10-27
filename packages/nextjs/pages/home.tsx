/* eslint-disable @next/next/no-img-element */
import React from "react";
import { StarIcon } from "@heroicons/react/24/outline";

const HomePage = () => {
  return (
    <div className="mx-auto max-w-xl lg:max-w-6xl">
      <div className="my-8 grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-8">
        {Array(4).fill(
          <div className="card bg-base-100 shadow-xl max-w-84">
            <figure>
              <img
                src="https://images.pexels.com/photos/2114365/pexels-photo-2114365.jpeg?cs=srgb&dl=pexels-jerome-govender-2114365.jpg&fm=jpg"
                alt="Shoes"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">
                The Electric Eclipse
                <div className="badge badge-secondary">HOT</div>
              </h2>
              <p>42 Solar Street, London, EC1M 6SN, United Kingdom</p>
              <div className="card-actions justify-end">
                <div className="badge badge-outline">
                  5 <StarIcon className="text-white h-4 w-4 ml-1" />
                </div>

                <div className="badge badge-warning">$$</div>
              </div>
            </div>
          </div>,
        )}
      </div>
    </div>
  );
};

export default HomePage;
