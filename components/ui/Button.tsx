import { Button, ButtonProps } from '@mui/material';

interface Props extends ButtonProps {
	title: string
}
export const CustomButton = (props: Props) => {
	const { title, ...buttonProps } = props;
	return(
		<Button {...buttonProps}>
			{title}
		</Button>
	)
}
