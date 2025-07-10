'use client'

import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { useState } from 'react';
import styles from './planets.module.css';

const correctOrder = [
    "Mercury", "Venus", "Earth", "Mars", "Jupiter", "Saturn", "Uranus", "Neptune", "Pluto"
];

const initialPlanets = [
    { name: "Jupiter", info: "Largest planet in the Solar System.", img: "/planets/jupiter.png" },
    { name: "Venus", info: "Hottest planet, thick atmosphere.", img: "/planets/venus.png" },
    { name: "Earth", info: "Our home planet.", img: "/planets/earth.png" },
    { name: "Mars", info: "The Red Planet.", img: "/planets/mars.png" },
    { name: "Uranus", info: "Has a blue-green color due to methane.", img: "/planets/uranus.png" },
    { name: "Saturn", info: "Famous for its rings.", img: "/planets/saturn.png" },
    { name: "Neptune", info: "Farthest known planet from the Sun.", img: "/planets/neptune.png" },
    { name: "Mercury", info: "Smallest planet, closest to the Sun.", img: "/planets/mercury.png" },
    { name: "Pluto", info: "Dwarf planet, formerly the ninth planet.", img: "/planets/pluto.png" },
];

export default function PlanetsPage() {
    const [planets, setPlanets] = useState(initialPlanets);
    const [showCongrats, setShowCongrats] = useState(false);

    const onDragEnd = (result: DropResult) => {
        if (!result.destination) return;
        const items = Array.from(planets);
        const [reordered] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reordered);
        setPlanets(items);

        // Check if order is correct
        const isCorrect = items.every((planet, idx) => planet.name === correctOrder[idx]);
        if (isCorrect) setShowCongrats(true);
    };

    return (
        <div className={styles.planetContainer}>
            <h2>Order the planets in the correct order!</h2>
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="planets" direction="horizontal">
                    {(provided) => (
                        <div
                            className={styles.planetRow}
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                        >
                            {planets.map((planet, idx) => (
                                <Draggable
                                    key={planet.name}
                                    draggableId={planet.name}
                                    index={idx}
                                >
                                    {(provided) => (
                                        <div
                                            className={styles.planetCard}
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                        >
                                            <img src={planet.img} alt={planet.name} className={styles.planetImg} />
                                            <div className={styles.planetInfo}>
                                                <strong>{planet.name}</strong>
                                                <p>{planet.info}</p>
                                            </div>
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
            {showCongrats && (
                <div className={styles.popup}>
                    <div className={styles.popupContent}>
                        <h3>Congratulations!</h3>
                        <p>You ordered the planets correctly!</p>
                        <button onClick={() => setShowCongrats(false)}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
}