import styled, { keyframes } from "styled-components";


const birthdayRainbow = keyframes`
	0% {
		border-color: hsl(0, 100%, 50%);
		color: hsl(0, 100%, 50%);
	}
	25% {
		border-color: hsl(90, 100%, 50%);
		color: hsl(90, 100%, 50%);
	}
	50% {
		border-color: hsl(180, 100%, 50%);
		color: hsl(180, 100%, 50%);
	}
	75% {
		border-color: hsl(270, 100%, 50%);
		color: hsl(270, 100%, 50%);
	}
	100% {
		border-color: hsl(360, 100%, 50%);
		color: hsl(360, 100%, 50%);
	}
`

const birthdayScale = keyframes`
	0% {
		transform: scale(1);
	}
	50% {
		transform: scale(1.1);
	}
	100% {
		transform: scale(1);
	}
`

const birthdayRotate = keyframes`
	0% {
		transform: rotate(0deg);
	}
	25% {
		transform: rotate(-10deg);
	}
	50% {
		transform: rotate(0deg);
	}
	75% {
		transform: rotate(10deg);
	}
	100% {
		transform: rotate(0deg);
	}
`

const imgShadowRainbow = keyframes`
	0% {
		filter:
			drop-shadow(0px 8px 0px hsl(0, 100%, 50%))
			drop-shadow(8px 0px 0px hsl(0, 100%, 50%))
			drop-shadow(0px -8px 0px hsl(0, 100%, 50%))
			drop-shadow(-8px 0px 0px hsl(0, 100%, 50%))
		;
	}
	25% {
		filter:
			drop-shadow(0px 8px 0px hsl(90, 100%, 50%))
			drop-shadow(8px 0px 0px hsl(90, 100%, 50%))
			drop-shadow(0px -8px 0px hsl(90, 100%, 50%))
			drop-shadow(-8px 0px 0px hsl(90, 100%, 50%))
		;
	}
	50% {
		filter:
			drop-shadow(0px 8px 0px hsl(180, 100%, 50%))
			drop-shadow(8px 0px 0px hsl(180, 100%, 50%))
			drop-shadow(0px -8px 0px hsl(180, 100%, 50%))
			drop-shadow(-8px 0px 0px hsl(180, 100%, 50%))
		;
	}
	75% {
		filter:
			drop-shadow(0px 8px 0px hsl(270, 100%, 50%))
			drop-shadow(8px 0px 0px hsl(270, 100%, 50%))
			drop-shadow(0px -8px 0px hsl(270, 100%, 50%))
			drop-shadow(-8px 0px 0px hsl(270, 100%, 50%))
		;
	}
	100% {
		filter:
			drop-shadow(0px 8px 0px hsl(360, 100%, 50%))
			drop-shadow(8px 0px 0px hsl(360, 100%, 50%))
			drop-shadow(0px -8px 0px hsl(360, 100%, 50%))
			drop-shadow(-8px 0px 0px hsl(360, 100%, 50%))
		;
	}
`

export const BirthdayButton = styled.div`
	margin: -24px auto 0px;
	padding: 4px 12px;
	background: white;
	color: black;
	border-radius: 32px;
	font-weight: bold;
	font-style: italic;
	cursor: pointer;
` as any

export const BirthdayEffectsContainer = styled.div`
	position: fixed; 
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	background-color: #000000B0;
	z-index: 100;
	border: 40px solid red;
	pointer-events: none;
	user-select: none;
	animation: ${birthdayRainbow} 1s linear;
	animation-iteration-count: infinite;
	animation-fill-mode: forwards;
	backdrop-filter: blur(8px);
`

export const BirthdayEffectsContent = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	height: 100%;
	color: white;
	font-size: 48px;
	flex-direction: row;
	text-align: center;
	font-weight: bold;
	animation: ${birthdayRainbow} 1s linear, ${birthdayScale} 0.3s linear;
	animation-iteration-count: infinite;
	animation-fill-mode: forwards;

	img {
		margin: -16px;
		animation: ${imgShadowRainbow} 1s linear;
		animation-iteration-count: infinite;
		animation-fill-mode: forwards;
		height: 512px;
	}

	& > * {
		animation: ${birthdayRotate} 1s linear;
		animation-iteration-count: infinite;
		animation-fill-mode: forwards;
	}
`

