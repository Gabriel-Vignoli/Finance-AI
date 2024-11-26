import {
  PiggyBankIcon,
  TrendingDownIcon,
  TrendingUpIcon,
  WalletIcon,
} from "lucide-react";
import SummaryCard from "./summary-card";

interface SummaryCardsProps {
  month: string;
  balance: number;
  depositsTotal: number;
  investmentsTotal: number;
  expensesTotal: number;
  userCanAddTransaction?: boolean;
}

const SummaryCards = async ({
  balance,
  depositsTotal,
  investmentsTotal,
  expensesTotal,
  userCanAddTransaction,
}: SummaryCardsProps) => {
  return (
    <div className="space-y-6">
      <SummaryCard
        icon={<WalletIcon></WalletIcon>}
        title="Balance"
        amount={balance}
        size="large"
        userCanAddTransaction={userCanAddTransaction}
      ></SummaryCard>

      <div className="grid grid-cols-3 gap-6">
        <SummaryCard
          icon={<PiggyBankIcon size={16}></PiggyBankIcon>}
          title="Invested"
          amount={investmentsTotal}
        ></SummaryCard>

        <SummaryCard
          icon={
            <TrendingUpIcon size={16} className="text-primary"></TrendingUpIcon>
          }
          title="Deposit"
          amount={depositsTotal}
        ></SummaryCard>

        <SummaryCard
          icon={
            <TrendingDownIcon
              size={16}
              className="text-red-500"
            ></TrendingDownIcon>
          }
          title="Expenses"
          amount={expensesTotal}
        ></SummaryCard>
      </div>
    </div>
  );
};

export default SummaryCards;
