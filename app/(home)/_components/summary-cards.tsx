import {
  PiggyBankIcon,
  TrendingDownIcon,
  TrendingUpIcon,
  WalletIcon,
} from "lucide-react";
import SummaryCard from "./summary-card";
import { db } from "@/app/_lib/prisma";

interface SummaryCardsProps {
  month: string;
}

const SummaryCards = async ({ month }: SummaryCardsProps) => {
  const where = {
    date: {
      gte: new Date(`2024-${month}-01`),
      lt: new Date(`2024-${month}-31`),
    },
  };
  const depositTotal = Number(
    (
      await db.transaction.aggregate({
        where: { ...where, type: "DEPOSIT" },
        _sum: { amount: true },
      })
    )?._sum?.amount,
  );
  const investmentsTotal = Number(
    (
      await db.transaction.aggregate({
        where: { ...where, type: "INVESTMENT" },
        _sum: { amount: true },
      })
    )?._sum?.amount,
  );
  const expensesTotal = Number(
    (
      await db.transaction.aggregate({
        where: { ...where, type: "EXPENSE" },
        _sum: { amount: true },
      })
    )?._sum?.amount,
  );
  const balance = depositTotal - investmentsTotal - expensesTotal;

  return (
    <div className="space-y-6">
      <SummaryCard
        icon={<WalletIcon></WalletIcon>}
        title="Balance"
        amount={balance}
        size="large"
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
          amount={depositTotal}
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
