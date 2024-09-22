"use client";
import React, { useState, useEffect } from "react";
import TinderCard from "react-tinder-card";
import styles from "./TinderCards.module.css";
import {
  Heart,
  X,
  MapPin,
  Briefcase,
  GraduationCap,
  ChevronDown,
  ChevronUp,
  database,
  Database,
  Fuel,
} from "lucide-react";
import Image from "next/image";

function TinderCards() {
  const [clusters, setClusters] = useState([]);

  useEffect(() => {
    // Fetch cluster data
    fetchClusters();
  }, []);

  const findBreakdown = (weight) => {
    // mouse 0.06
    // chicken 5
    // hedgehog 1 lb
    // rabbit 2 lb
    var rolling_weight = weight;
    var num_chicken = Math.floor(rolling_weight / 5);
    rolling_weight = rolling_weight % 5;
    var num_rabbit = Math.floor(rolling_weight / 2);
    rolling_weight = rolling_weight % 2;
    var num_hedgehog = Math.floor(rolling_weight / 1);
    rolling_weight = rolling_weight % 1;
    var num_mouse = Math.floor(rolling_weight / 0.06);
    return [num_chicken, num_rabbit, num_hedgehog, num_mouse];
  };

  const fetchClusters = async () => {
    try {
      console.log("Fetching clusters...");
      const response = await fetch("http://127.0.0.1:5328/api/get_clients");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (data.clusters && Array.isArray(data.clusters)) {
        // Group collections by clusterId
        setClusters(data.clusters);
      } else {
        console.error("Unexpected data structure:", data);
      }
    } catch (error) {
      console.error("Error fetching clusters:", error.message);
    }
  };
  const swiped = async (direction, cluster) => {
    console.log("Swiped", direction, cluster.clusterId);
    if (direction === "left") {
      try {
        const response = await fetch(
          `http://127.0.0.1:5328/api/archive?groupId=${cluster.groupId}&clusterName=${cluster.clusterName}&dbName=${cluster.db}&collectionName=${cluster.collection}`
        );
        if (response.ok) {
          console.log(`Archived collection: ${cluster.collection}`);
          // Remove the archived cluster from the state
          setClusters((prevClusters) =>
            prevClusters.filter((c) => c.clusterId !== cluster.clusterId)
          );
        } else {
          console.error("Failed to archive collection");
        }
      } catch (error) {
        console.error("Error archiving collection:", error);
      }
    } else if (direction === "right") {
      console.log(`Kept collection: ${cluster.collection}`);
    }
  };

  const outOfFrame = (name) => {
    console.log("Out of frame:", name);
  };

  const images = ["/chicken.png", "/rabbit.png", "/hedgehog.png", "/mouse.png"];

  const renderImagesByFrequency = (imageArray, freqArray) => {
    return imageArray.map((image, imageIndex) => {
      const imageCount = freqArray[imageIndex]; // Get the frequency for the current image
      const imageElements = [];

      // Loop to render 'imageCount' number of this image
      for (let i = 0; i < imageCount; i++) {
        imageElements.push(
          <div key={`${image}-${i}`} className="image-wrapper">
            <Image
              src={image}
              alt={`Image ${imageIndex + 1}`}
              width={50}
              height={50}
            />
          </div>
        );
      }

      return imageElements; // Return an array of images for each frequency
    });
  };

  return (
    <div className={styles.tinderCards}>
      <div className={styles.backgroundImage}></div>
      <div className={styles.cardContainer}>
        {clusters.map((cluster, index) => (
          <TinderCard
            className={styles.swipe}
            key={cluster.clusterId}
            preventSwipe={["up", "down"]}
            onSwipe={(dir) => swiped(dir, cluster)}
            onCardLeftScreen={() => outOfFrame(cluster.clusterName)}
            style={{
              zIndex: clusters.length - index,
              transform: `scale(${1 - index * 0.05}) translateY(-${
                index * 10
              }px)`,
            }}>
            <div className={styles.card}>
              <div className="flex items-end w-full h-full pb-3">
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                  <h2 className="text-white text-2xl font-bold">
                    {cluster.db}.{cluster.collection}
                  </h2>
                </div>
                <div className="p-4">
                  <div className="flex flex-wrap pb-5">
                    <h2 className="w-full">Archive and save</h2>
                    {renderImagesByFrequency(
                      images,
                      findBreakdown(cluster.lb_carbon)
                    )}
                    <h2 className="w-full">worth of emissions.</h2>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center text-gray-600">
                      <Database className="w-5 h-5 mr-2" />
                      <span>{cluster.data_size}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Fuel className="w-5 h-5 mr-2" />
                      <span>{cluster.lb_carbon.toFixed(2)} lb CO2</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <GraduationCap className="w-5 h-5 mr-2" />
                      <span>{cluster.clusterName}</span>
                    </div>
                    {/* <div className="flex items-center text-gray-600">
                      <GraduationCap className="w-5 h-5 mr-2" />
                      <span>{cluster.first_doc.join(", ")}</span>
                    </div> */}
                  </div>
                  <p className="text-gray-700 mb-4">{cluster.llm_bio}</p>
                </div>
              </div>
            </div>
          </TinderCard>
        ))}
      </div>
    </div>
  );
}

export default TinderCards;
