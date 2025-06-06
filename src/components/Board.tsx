import React, {
	useEffect,
	useState,
	useDeferredValue,
	useTransition,
} from 'react';
import type { JSX } from 'react';
import './Board.css';

// Type definitions
type Coord = [number, number]; // Represents a coordinate on the grid [row, col]

// Props interface for the Board component
interface BoardProps {
	rows: number; // Number of rows in the grid
	cols: number; // Number of columns in the grid
	snake: Coord[]; // Array of coordinates representing the snake's body
	food: Coord; // Coordinate of the food
}

// Interface for particle effect
interface Particle {
	id: number; // Unique identifier for the particle
	x: number; // X coordinate
	y: number; // Y coordinate
	color: string; // Color of the particle
}

const Board: React.FC<BoardProps> = ({ rows, cols, snake, food }) => {
	// State for particle effects with transitions
	const [particles, setParticles] = useState<Particle[]>([]);
	const [prevFood, setPrevFood] = useState<Coord>(food);
	const [isPending, startTransition] = useTransition();

	// Deferred values for smooth rendering
	const deferredParticles = useDeferredValue(particles);
	const deferredSnake = useDeferredValue(snake);
	const deferredFood = useDeferredValue(food);

	// Effect to create particles when food is eaten
	useEffect(() => {
		if (food[0] !== prevFood[0] || food[1] !== prevFood[1]) {
			startTransition(() => {
				// Create 8 particles with random colors
				const newParticles = Array.from({ length: 8 }, (_, i) => ({
					id: Date.now() + i,
					x: prevFood[1] * 30 + 15, // Center of the cell
					y: prevFood[0] * 30 + 15,
					color: `hsl(${Math.random() * 360}, 100%, 50%)`, // Random HSL color
				}));
				setParticles(prev => [...prev, ...newParticles]);
				setPrevFood(food);
			});
		}
	}, [food, prevFood]);

	// Effect to clean up particles after animation
	useEffect(() => {
		const timer = setInterval(() => {
			startTransition(() => {
				setParticles(prev => prev.filter(p => Date.now() - p.id < 500));
			});
		}, 100);
		return () => clearInterval(timer);
	}, []);

	// Render the game board grid
	const renderBoard = () => {
		const cells: JSX.Element[] = [];

		// Create grid cells
		for (let i = 0; i < rows; i++) {
			for (let j = 0; j < cols; j++) {
				const isSnake = deferredSnake.some(([x, y]) => x === i && y === j);
				const isSnakeHead =
					deferredSnake[0][0] === i && deferredSnake[0][1] === j;
				const isFood = deferredFood[0] === i && deferredFood[1] === j;

				cells.push(
					<div
						key={`${i}-${j}`}
						className={`cell ${isSnake ? 'snake-cell' : ''} ${
							isSnakeHead ? 'snake-head' : ''
						} ${isFood ? 'food-cell' : ''}`}
					/>
				);
			}
		}

		return cells;
	};

	return (
		<div
			className='game-board'
			style={{
				gridTemplateColumns: `repeat(${cols}, 30px)`,
				width: `${cols * 30}px`,
				height: `${rows * 30}px`,
			}}
		>
			{renderBoard()}
			{deferredParticles.map(particle => (
				<div
					key={particle.id}
					className='particle'
					style={{
						left: particle.x,
						top: particle.y,
						backgroundColor: particle.color,
						width: '8px',
						height: '8px',
						borderRadius: '50%',
						transform: `translate(-50%, -50%) rotate(${
							Math.random() * 360
						}deg)`,
					}}
				/>
			))}
			{isPending && <div className='loading-indicator'>Loading...</div>}
		</div>
	);
};

export default Board;
