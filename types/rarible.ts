export interface Creator {
  account: string;
  value: number;
}

export interface Royalty {
  account: string;
  value: number;
}

export interface Content {
  "@type": string;
  url: string;
  representation: string;
  mimeType: string;
  width: number;
  height: number;
}

export interface Meta {
  name: string;
  description: string;
  attributes: any[];
  content: Content[];
  restrictions: any[];
}

export interface PriceHistory {
  date: Date;
  makeValue: string;
  takeValue: string;
}

export interface Type {
  "@type": string;
  contract: string;
}

export interface Make {
  type: Type;
  value: string;
}

export interface Creator2 {
  account: string;
  value: number;
}

export interface Royalty2 {
  account: string;
  value: number;
}

export interface Type2 {
  "@type": string;
  contract: string;
  tokenId: string;
  uri: string;
  creators: Creator2[];
  royalties: Royalty2[];
  signatures: string[];
}

export interface Take {
  type: Type2;
  value: string;
}

export interface OriginFee {
  account: string;
  value: number;
}

export interface Data {
  "@type": string;
  payouts: any[];
  originFees: OriginFee[];
}

export interface BestBidOrder {
  id: string;
  fill: string;
  platform: string;
  status: string;
  makeStock: string;
  cancelled: boolean;
  createdAt: Date;
  lastUpdatedAt: Date;
  takePrice: string;
  takePriceUsd: string;
  priceHistory: PriceHistory[];
  maker: string;
  make: Make;
  take: Take;
  salt: string;
  signature: string;
  pending: any[];
  data: Data;
}

interface BestSellOrder {
  id: string;
  fill: string;
  platform: string;
  status: string;
  startedAt: Date;
  endedAt: Date;
  makeStock: string;
  cancelled: boolean;
  createdAt: Date;
  lastUpdatedAt: Date;
  makePrice: string;
  makePriceUsd: string;
  priceHistory: PriceHistory[];
  maker: string;
  make: Make;
  take: Take;
  salt: string;
  signature: string;
  pending: any[];
  data: Data;
}

export interface NFT {
  id: string;
  blockchain: string;
  contract: string;
  tokenId: string;
  creators: Creator[];
  owners: any[];
  royalties: Royalty[];
  lazySupply: string;
  pending: any[];
  mintedAt: Date;
  lastUpdatedAt: Date;
  supply: string;
  meta: Meta;
  deleted: boolean;
  bestSellOrder?: BestSellOrder;
  bestBidOrder: BestBidOrder;
  auctions: any[];
  totalStock: string;
  sellers: number;
}
