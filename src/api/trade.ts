import { request } from "@/api";

import type { PromiseResponseData } from "@/api";
import type { TradeItem } from "@/pages/trade/type";

export interface TradeParams {
  startTime: string;
  endTime: string;
}

export const getTrade = (
  params: TradeParams
): PromiseResponseData<TradeItem[]> => request.post("/trade", params);
