export interface ContractStorage {
  title: string;
  admin: string;
  target: number;
  donations: { [key: string]: number };
  total_fund: number;
  timestamp: number;
  charity: string;
}

export interface CharityComponentProps {
  storage: ContractStorage;
}
