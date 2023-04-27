import { Interview } from "@/types/index";
import { Card, CardContent, CardActions } from '@mui/material';
import { CustomButton } from "../ui/Button";
import { TypoGraphy } from "../ui/Typography";

interface Props {
  interview: Interview;
}

export const InterviewCard = ({ interview }: Props) => {
  return (
    <Card key={interview.id} sx={{ maxWidth: 400 }}>
      <CardContent>
        <TypoGraphy variant="h5" sx={{ mb: 1 }} title={interview.title} />
        <TypoGraphy variant="body2" title={interview.description} />
      </CardContent>
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <CustomButton size="small" variant="contained" color="primary" title="Action 1" />
        <CustomButton size="small" variant="contained" title="Action 2" />
      </CardActions>
    </Card>
  );
};