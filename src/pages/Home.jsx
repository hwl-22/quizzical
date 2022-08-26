import { useState, useContext } from 'react';
import Quizzes from './Quizzes';
import StartGame from './StartGame';
import { FormProvider } from '../store/FormContext';

function Home() {
	const [isStarted, setIsStarted] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	return (
		<FormProvider>
			<main>
				{isStarted ? (
					<Quizzes
						isLoading={isLoading}
						setIsLoading={setIsLoading}
						isStarted={isStarted}
						setIsStarted={setIsStarted}
					/>
				) : (
					<StartGame isStarted={isStarted} setIsStarted={setIsStarted} />
				)}
			</main>
		</FormProvider>
	);
}

export default Home;
