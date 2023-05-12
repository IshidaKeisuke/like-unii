import { Typography, TypographyProps } from "@mui/material";

interface TypoProps extends TypographyProps {
  title: string;
}

export const TypoGraphy = (props: TypoProps) => {
  const { title, ...typographyProps } = props;
  return <Typography {...typographyProps}>{title}</Typography>;
};
