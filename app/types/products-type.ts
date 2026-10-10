export interface ProductData {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: string;
  image: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change: ChangeDataType;
  markets: MarketDataType[];
}

type ChangeDataType = {
  dir: "up" | "down" | "same";
  pct: number;
};

type MarketDataType = {
  market: string;
  division: string;
  min: number;
  max: number;
};
