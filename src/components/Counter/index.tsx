import { useState, useEffect } from 'react';

type CounterProps = {
	initialCount: number;
};

export const Counter: React.FC<CounterProps> = ({ initialCount }) => {
	const [count, setCount] = useState(initialCount);

	useEffect(() => {
		const event = new CustomEvent("onCounterMount");
		window.dispatchEvent(event);
		console.log("Componente montado!");
	
		return () => {
		  const event = new CustomEvent("onCounterUnmount");
		  window.dispatchEvent(event);
		  console.log("Componente desmontado!");
		};
	  }, []);
	
	  useEffect(() => {
		if (count === 10) {
		  const event = new CustomEvent("onCounterUpdate", { detail: count });
		  window.dispatchEvent(event);
		  console.log("Componente atualizado!");
		}
	  }, [count]);

	const handleIncrement = () => {
		setCount((prevCount) => prevCount + 1);
	};

	return (
		<div>
			<h2>Contador: {count}</h2>
			<button onClick={handleIncrement}>Incrementar +</button>
		</div>
	);
};
