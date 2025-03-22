import { request } from "@/api";

import type { PromiseResponseData } from "@/api";
import type { TradeItem } from "@/pages/trade/type";

export const getTrade = (): PromiseResponseData<TradeItem[]> =>
  request.get("/trade");
