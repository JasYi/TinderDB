"use client";
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import TinderCards from '../components/TinderCards';
import SwipeButtons from '../components/SwipeButtons';

export default function Home() {
  const [clusters, setClusters] = useState([]);

  useEffect(() => {
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

  const swipeLeft = () => {
    if (clusters.length > 0) {
      swiped('left', clusters[clusters.length - 1]);
    }
  };

  const swipeRight = () => {
    if (clusters.length > 0) {
      swiped('right', clusters[clusters.length - 1]);
    }
  };

  return (
    <div className="app">
      <Header />
      <TinderCards clusters={clusters} swiped={swiped} outOfFrame={outOfFrame} />
      <SwipeButtons swipeLeft={swipeLeft} swipeRight={swipeRight} />
    </div>
  );
}