import { SetMetadata } from "@nestjs/common";
import { IS_PUBLIC } from "@/common/constants/public.constant";

export const Public = () => SetMetadata(IS_PUBLIC, true);
