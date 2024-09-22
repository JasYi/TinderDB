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
} from "lucide-react";

function TinderCards() {
  const [clusters, setClusters] = useState([]);

  useEffect(() => {
    // Fetch cluster data
    fetchClusters();
  }, []);

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

  const swiped = (direction, clusterId) => {
    console.log("Swiped", direction, clusterId);
  };

  const outOfFrame = (name) => {
    console.log("Out of frame:", name);
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
            onSwipe={(dir) => swiped(dir, cluster.clusterId)}
            onCardLeftScreen={() => outOfFrame(cluster.clusterName)}
            style={{
              zIndex: clusters.length - index,
              transform: `scale(${1 - index * 0.05}) translateY(-${
                index * 10
              }px)`,
            }}>
            <div className={styles.card}>
              <div className="align-end size-full flex">
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                  <h2 className="text-white text-2xl font-bold">
                    {cluster.db}.{cluster.collection}
                  </h2>
                </div>
                <div className="p-4 align-bottom">
                  <div className="space-y-2">
                    <div className="flex items-center text-gray-600">
                      <MapPin className="w-5 h-5 mr-2" />
                      <span>{cluster.data_size}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Briefcase className="w-5 h-5 mr-2" />
                      <span>{cluster.lb_carbon}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <GraduationCap className="w-5 h-5 mr-2" />
                      <span>{cluster.clusterName}</span>
                    </div>
                  </div>
                  <p className="text-gray-700 mb-4">{cluster.llm_bio}</p>
                </div>
                {/* <h3>{cluster.clusterName}</h3>
              <p>Database: {cluster.db}</p>
              <p>Size: {cluster.data_size} GB</p>
              <p>Carbon Footprint: {cluster.lb_carbon} lbs CO2</p>
              <p>Collection: {cluster.collection}</p> */}
                {/* <p>Collections:</p>
              <ul>
                {cluster.collections.map((collection, index) => (
                  <li key={index}>{collection}</li>
                ))}
              </ul> */}
              </div>
            </div>
          </TinderCard>
        ))}
      </div>
    </div>
  );
}

export default TinderCards;
