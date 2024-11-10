"use client";

import { Transaction } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import TransactionTypeBadge from "../_components/type-badge";
import { Button } from "@/app/_components/ui/button";
import { PencilIcon, TrashIcon } from "lucide-react";

export const TRANSACTION_CATEGORY_LABELS = {
  HOUSING: "Housing",
  TRANSPORTATION: "Transportation",
  FOOD: "Food",
  ENTERTAINMENT: "Entertainment",
  HEALTH: "Health",
  UTILITY: "Utility",
  SALARY: "Salary",
  EDUCATION: "Education",
  OTHER: "Other",
};

export const TRANSACTION_PAYMENT_METHOD_LABELS = {
  CREDIT_CARD: "Credit Card",
  DEBIT_CARD: "Debit Card",
  BANK_TRANSFER: "Bank Transfer",
  BANK_SLIP: "Bank Slip",
  CASH: "Cash",
  PIX: "Pix",
  OTHER: "Other",
};

export const transactionColumns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row: { original: transaction } }) => (
      <TransactionTypeBadge transaction={transaction}></TransactionTypeBadge>
    ),
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row: { original: transaction } }) =>
      TRANSACTION_CATEGORY_LABELS[transaction.category],
  },
  {
    accessorKey: "paymentMethod",
    header: "Payment Method",
    cell: ({ row: { original: transaction } }) =>
      TRANSACTION_PAYMENT_METHOD_LABELS[transaction.paymentMethod],
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row: { original: transaction } }) => {
      return new Date(transaction.date).toLocaleDateString("en-US", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      });
    },
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row: { original: transaction } }) => {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(Number(transaction.amount));
    },
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: () => {
      return (
        <div className="space-x-1">
          <Button variant="ghost" size="icon">
            <PencilIcon className="text-muted-foreground"></PencilIcon>
          </Button>
          <Button variant="ghost" size="icon">
            <TrashIcon className="text-muted-foreground"></TrashIcon>
          </Button>
        </div>
      );
    },
  },
];
