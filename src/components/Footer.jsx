import styled from 'styled-components';
import { TiSocialFacebook, TiSocialInstagram } from 'react-icons/ti';

function Footer() {
	return (
		<FooterDiv>
			Linn © 2022
			<div>
				<TiSocialFacebook />
			</div>
			<div>
				<TiSocialInstagram />
			</div>
		</FooterDiv>
	);
}

const FooterDiv = styled.footer`
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 1rem;
	padding: 1rem;
	background-color: #333d7a;
	color: white;

	div {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 2rem;
		height: 2rem;
		border-radius: 50%;
		background-color: transparent;
		cursor: pointer;
		transition: all 200ms ease-in-out;

		svg {
			position: relative;
			color: #fff;
			font-size: 1.5rem;
			transition: all 200ms ease-in-out;

			::before {
				content: ' ggez';
				position: absolute;
				width: 100%;
				left: 0;
				bottom: -16px;
				height: 2px;
				background-color: #fff;
			}
		}

		&:hover {
			background-color: #b8c2ff;

			svg {
				color: #333d7a;
			}
		}
	}
`;

export default Footer;
