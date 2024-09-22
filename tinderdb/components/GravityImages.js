"use client";

// components/GravityImages.js
import React, { useEffect, useRef } from "react";
import Matter from "matter-js";

const GravityImages = () => {
  const scene = useRef(null);
  const engine = useRef(Matter.Engine.create());
  const render = useRef(null);

  useEffect(() => {
    const width = 800;
    const height = 600;

    // Create renderer
    render.current = Matter.Render.create({
      element: scene.current,
      engine: engine.current,
      options: {
        width,
        height,
        wireframes: false, // Set to true if you want wireframe rendering
        background: "transparent",
      },
    });

    // Create ground
    const ground = Matter.Bodies.rectangle(width / 2, height + 50, width, 100, {
      isStatic: true,
    });

    // Create walls
    const wallLeft = Matter.Bodies.rectangle(-50, height / 2, 100, height, {
      isStatic: true,
    });
    const wallRight = Matter.Bodies.rectangle(
      width + 50,
      height / 2,
      100,
      height,
      {
        isStatic: true,
      }
    );

    // Create image bodies
    const imageBodies = [];

    const imagePaths = ["/logo.png"];

    imagePaths.forEach((imagePath, index) => {
      const image = Matter.Bodies.rectangle(
        100 + index * 200, // x position
        -100, // y position (start off-screen)
        100, // width
        100, // height
        {
          render: {
            sprite: {
              texture: imagePath,
              xScale: 1,
              yScale: 1,
            },
          },
        }
      );
      imageBodies.push(image);
    });

    // Add all bodies to the world
    Matter.World.add(engine.current.world, [
      ground,
      wallLeft,
      wallRight,
      ...imageBodies,
    ]);

    // Run the engine and renderer
    Matter.Engine.run(engine.current);
    Matter.Render.run(render.current);

    // Clean up on unmount
    return () => {
      Matter.Render.stop(render.current);
      Matter.World.clear(engine.current.world);
      Matter.Engine.clear(engine.current);
      render.current.canvas.remove();
      render.current.canvas = null;
      render.current.context = null;
      render.current.textures = {};
    };
  }, []);

  return <div ref={scene} />;
};

export default GravityImages;
