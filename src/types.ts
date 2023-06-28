export interface ContractStorage {
  title: string;
  admin: string;
  target: number;
  donations: {};
  total_fund: number;
  timestamp: number;
  charity: string;
}

export interface CharityComponentProps {
  storage: ContractStorage;
}
