import { useCallback, useMemo, useState } from "react";
import confetti from "canvas-confetti";

import { BirthdayButton, BirthdayEffectsContainer, BirthdayEffectsContent } from "./styles";
import useInterval from "../../hooks/useInterval";


export const Birthday = () => {
	// Hardcoded birthday - replace with user data as needed
	const birthday = {
		month: 10,
		day: 21,
	}
	const today = new Date();
	const todayIsBirthday = useMemo(() => {
		return (
			today.getDate() === birthday.day 
			&& today.getMonth() + 1 === birthday.month
		);
	}, [today, birthday]);

	const [birthdayEffectsOpen, setBirthdayEffectsOpen] = useState(false);

	if (todayIsBirthday) {
		return (
			<>
				<BirthdayButton 
					onMouseDown={() => setBirthdayEffectsOpen(true)}
					onMouseUp={() => setBirthdayEffectsOpen(false)}
					onMouseLeave={() => setBirthdayEffectsOpen(false)}
				>
					click if it's your birthday
				</BirthdayButton>
				<BirthdayEffects open={birthdayEffectsOpen} />
			</>
		);
	}
	return null;
};

export const BirthdayEffects = (props: any) => {

	var confettiDefaults = { startVelocity: 30, spread: 360, ticks: 60 };

	var confettiCallback = useCallback(() => {
		if (!props.open) return;

		var particleCount = 50;
		confetti({ 
			...confettiDefaults, 
			particleCount, 
			origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
		});
		confetti({
			...confettiDefaults,
			particleCount,
			origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
		});
	}, [props.open]);

	useInterval(confettiCallback, 250, props.open);

	if (!props.open) return null;

	return (
		<BirthdayEffectsContainer>
			<BirthdayEffectsContent>
				<div>
					<img src="/assets/cat.gif" alt="Cat" />
				</div>
				<p>HAPPY BIRTHDAY</p>
				<div>
					<img src="/assets/cat.gif" alt="Cat" />
				</div>
			</BirthdayEffectsContent>
		</BirthdayEffectsContainer>
	)
}

const randomInRange = (min: number, max: number) => {
  return Math.random() * (max - min) + min;
}
