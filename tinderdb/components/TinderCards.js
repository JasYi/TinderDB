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
    if (direction === 'left') {
      try {
        const response = await fetch(`http://127.0.0.1:5328/api/archive?groupId=${cluster.groupId}&clusterName=${cluster.clusterName}&dbName=${cluster.db}&collectionName=${cluster.collection}`);
        if (response.ok) {
          console.log(`Archived collection: ${cluster.collection}`);
          // Remove the archived cluster from the state
          setClusters(prevClusters => prevClusters.filter(c => c.clusterId !== cluster.clusterId));
        } else {
          console.error('Failed to archive collection');
        }
      } catch (error) {
        console.error('Error archiving collection:', error);
      }
    } else if (direction === 'right') {
      console.log(`Kept collection: ${cluster.collection}`);
    }
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
           onSwipe={(dir) => swiped(dir, cluster)}
           onCardLeftScreen={() => outOfFrame(cluster.clusterName)}
           style={{
             zIndex: clusters.length - index,
             transform: `scale(${1 - index * 0.05}) translateY(-${index * 10}px)`,
           }}>
           <div className={styles.card}>
             <h3>{cluster.clusterName}</h3>
             <p>Database: {cluster.db}</p>
             <p>Size: {cluster.data_size}</p>
             <p>Carbon Footprint: {cluster.lb_carbon} lbs CO2</p>
             <p>Collection: {cluster.collection}</p>
           </div>
         </TinderCard>
        ))}
      </div>
    </div>
  );
}

export default TinderCards;
