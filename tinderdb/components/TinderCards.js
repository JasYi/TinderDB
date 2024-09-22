"use client";
import React, { useState, useEffect } from "react";
import TinderCard from "react-tinder-card";
import styles from "./TinderCards.module.css";

function TinderCards() {
  const [clusters, setClusters] = useState([]);

  useEffect(() => {
    // Fetch cluster data
    fetchClusters();
  }, []);

  const fetchClusters = async () => {
    try {
      console.log('Fetching clusters...');
      const response = await fetch('http://127.0.0.1:5328/api/get_clients');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (data.clusters && Array.isArray(data.clusters)) {
        // Group collections by clusterId
        const groupedClusters = data.clusters.reduce((acc, cluster) => {
          if (!acc[cluster.clusterId]) {
            acc[cluster.clusterId] = {
              ...cluster,
              collections: []
            };
          }
          acc[cluster.clusterId].collections.push(cluster.collection);
          return acc;
        }, {});
        setClusters(Object.values(groupedClusters));
      } else {
        console.error('Unexpected data structure:', data);
      }
    } catch (error) {
      console.error('Error fetching clusters:', error.message);
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
              transform: `scale(${1 - index * 0.05}) translateY(-${index * 10}px)`
            }}
          >
            <div className={styles.card}>
              <h3>{cluster.clusterName}</h3>
              <p>Database: {cluster.db}</p>
              <p>Size: {cluster.data_size} GB</p>
              <p>Carbon Footprint: {cluster.lb_carbon} lbs CO2</p>
              <p>Collections:</p>
              <ul>
                {cluster.collections.map((collection, index) => (
                  <li key={index}>{collection}</li>
                ))}
              </ul>
            </div>
          </TinderCard>
        ))}
      </div>
    </div>
  );
}

export default TinderCards;