import {
	useState,
	useEffect,
	useCallback,
	useTransition,
	useDeferredValue,
	useOptimistic,
} from 'react';
import type { FC } from 'react';
import Board from './components/Board';
import GameMenu from './components/GameMenu';
import './App.css';

// Type definitions
type Coord = [number, number]; // Represents a coordinate on the grid [row, col]
type Difficulty = 'easy' | 'medium' | 'hard';

// Game constants
const INITIAL_SNAKE: Coord[] = [[5, 5]]; // Starting position of the snake
const INITIAL_DIRECTION: Coord = [0, 1]; // Initial direction: moving right
const CELL_SIZE = 30; // Size of each cell in pixels

// Game speed settings for different difficulty levels (in milliseconds)
const DIFFICULTY_SPEEDS = {
	easy: 200,
	medium: 150,
	hard: 100,
};

const App: FC = () => {
	// Window size state for responsive grid
	const [windowWidth, setWindowWidth] = useState(window.innerWidth);
	const [windowHeight, setWindowHeight] = useState(window.innerHeight);
	const [isPending, startTransition] = useTransition();

	// Calculate grid dimensions based on window size
	const maxWidth = Math.min(windowWidth - 40, 800);
	const maxHeight = windowHeight - 200;
	const cols = Math.floor(maxWidth / CELL_SIZE);
	const rows = Math.floor(maxHeight / CELL_SIZE);

	// Generate random food position
	const getRandomFood = useCallback((): Coord => {
		const x = Math.floor(Math.random() * rows);
		const y = Math.floor(Math.random() * cols);
		return [x, y];
	}, [rows, cols]);

	// Game state
	const [gameStarted, setGameStarted] = useState(false);
	const [difficulty, setDifficulty] = useState<Difficulty>('easy');
	const [snake, setSnake] = useState<Coord[]>(INITIAL_SNAKE);
	const [food, setFood] = useState<Coord>(getRandomFood);
	const [direction, setDirection] = useState<Coord>(INITIAL_DIRECTION);
	const [score, setScore] = useState<number>(0);
	const [gameOver, setGameOver] = useState<boolean>(false);
	const [isPaused, setIsPaused] = useState<boolean>(false);

	// High score state with optimistic updates
	const [highScore] = useState(() => {
		const saved = localStorage.getItem('snakeHighScore');
		return saved ? parseInt(saved, 10) : 0;
	});
	const [optimisticScore, updateOptimisticScore] = useOptimistic(
		highScore,
		(state, newScore: number) => Math.max(state, newScore)
	);

	// Deferred values for smooth rendering
	const deferredScore = useDeferredValue(score);
	const deferredSnake = useDeferredValue(snake);
	const deferredFood = useDeferredValue(food);

	// Handle window resize with transition
	useEffect(() => {
		const handleResize = () => {
			startTransition(() => {
				setWindowWidth(window.innerWidth);
				setWindowHeight(window.innerHeight);
			});
		};
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	// Handle keyboard input with transition
	const handleKeyDown = useCallback(
		(e: KeyboardEvent) => {
			if (e.key === 'p' || e.key === 'P') {
				startTransition(() => {
					setIsPaused(prev => !prev);
				});
				return;
			}

			if (isPaused) return;

			startTransition(() => {
				switch (e.key) {
					case 'ArrowUp':
						if (direction[0] === 0) setDirection([-1, 0]);
						break;
					case 'ArrowDown':
						if (direction[0] === 0) setDirection([1, 0]);
						break;
					case 'ArrowLeft':
						if (direction[1] === 0) setDirection([0, -1]);
						break;
					case 'ArrowRight':
						if (direction[1] === 0) setDirection([0, 1]);
						break;
				}
			});
		},
		[direction, isPaused]
	);

	// Reset game state with transition
	const resetGame = () => {
		startTransition(() => {
			setSnake([[Math.floor(rows / 2), Math.floor(cols / 2)]]);
			setDirection(INITIAL_DIRECTION);
			setFood(getRandomFood());
			setScore(0);
			setGameOver(false);
			setIsPaused(false);
		});
	};

	// Start new game with selected difficulty
	const startGame = (selectedDifficulty: Difficulty) => {
		startTransition(() => {
			setDifficulty(selectedDifficulty);
			setGameStarted(true);
			resetGame();
		});
	};

	// Add keyboard event listener
	useEffect(() => {
		window.addEventListener('keydown', handleKeyDown);
		return () => window.removeEventListener('keydown', handleKeyDown);
	}, [handleKeyDown]);

	// Main game loop with optimistic updates
	useEffect(() => {
		if (gameOver || isPaused) return;

		const interval = setInterval(() => {
			setSnake(prev => {
				const [headX, headY] = prev[0];
				const [dx, dy] = direction;
				const newHead: Coord = [headX + dx, headY + dy];

				const isOutOfBounds =
					newHead[0] < 0 ||
					newHead[1] < 0 ||
					newHead[0] >= rows ||
					newHead[1] >= cols;
				const hitsSelf = prev.some(
					([x, y]) => x === newHead[0] && y === newHead[1]
				);

				if (isOutOfBounds || hitsSelf) {
					startTransition(() => {
						setGameOver(true);
						if (score > highScore) {
							updateOptimisticScore(score);
							localStorage.setItem('snakeHighScore', score.toString());
						}
					});
					return prev;
				}

				const newSnake = [newHead, ...prev];
				const ateFood = newHead[0] === food[0] && newHead[1] === food[1];

				if (ateFood) {
					startTransition(() => {
						setFood(getRandomFood());
						setScore(prev => prev + 1);
					});
				} else {
					newSnake.pop();
				}

				return newSnake;
			});
		}, DIFFICULTY_SPEEDS[difficulty]);

		return () => clearInterval(interval);
	}, [
		direction,
		food,
		gameOver,
		rows,
		cols,
		getRandomFood,
		difficulty,
		score,
		highScore,
		isPaused,
		updateOptimisticScore,
	]);

	// Show game menu if game hasn't started
	if (!gameStarted) {
		return <GameMenu onStartGame={startGame} highScore={optimisticScore} />;
	}

	// Main game render
	return (
		<div className='game-container'>
			<div className='game-header'>
				<h2>Snake Game 🐍</h2>
				<div className='game-info'>
					<div className='score-display'>Score: {deferredScore}</div>
					<div className='high-score-display'>
						High Score: {optimisticScore}
					</div>
					<div className='difficulty-display'>Difficulty: {difficulty}</div>
				</div>
				{isPaused && <div className='pause-overlay'>PAUSED</div>}
				{isPending && <div className='loading-indicator'>Loading...</div>}
			</div>

			{gameOver ? (
				<div className='game-over'>
					<h3>Game Over 💀</h3>
					<p>Final Score: {deferredScore}</p>
					<div className='game-over-buttons'>
						<button onClick={resetGame}>Play Again</button>
						<button onClick={() => setGameStarted(false)}>Main Menu</button>
					</div>
				</div>
			) : (
				<Board
					rows={rows}
					cols={cols}
					snake={deferredSnake}
					food={deferredFood}
				/>
			)}
		</div>
	);
};

export default App;
