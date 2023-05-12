import { CustomButton } from "@/components/ui/CustomButton";
import { useRouter } from "next/router";

export const BackButton = () => {
  const router = useRouter();
  const handleClick = () => {
    router.back();
  };

  return (
    <CustomButton variant="outlined" onClick={handleClick} title="戻る" />
  );
};
