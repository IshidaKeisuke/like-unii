import Link from "next/link";
import { Interview } from "@/types/index";
import { Card, CardContent, CardActions } from '@mui/material';
import { CustomButton } from "../../ui/CustomButton";
import { TypoGraphy } from "../../ui/Typography";

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
        <Link href={`/interview/${interview.id}`}>
          <CustomButton size="small" variant="contained" color="primary" title="応募する" />
        </Link>
      </CardActions>
    </Card>
  );
};
