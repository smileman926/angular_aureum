export interface TierModel {
  _id: string;
  name: string;
  congratulations_viewed: boolean;
  congratulations_viewed_financial: boolean;
}

export interface BaseTierResponse {
  status: number;
  message?: string;
}

export interface TiersResponse extends BaseTierResponse {
  data: TierModel[];
}
