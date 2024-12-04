import { db } from "../_lib/prisma";
import { DataTable } from "../_components/ui/data-table";
import { transactionColumns } from "./_columns";
import AddTrasanctionButton from "../_components/add-transaction-button";
import Navbar from "../_components/navbar";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { ScrollArea } from "../_components/ui/scroll-area";
import { canUserAddTransactions } from "../_data/can-user-add-transaction";

const TranscripitionPage = async () => {
  const { userId } = await auth();
  if (!userId) {
    redirect("/login");
  }

  //acessar as transações do banco de dados
  const transactions = await db.transaction.findMany({
    where: {
      userId,
    },
  });

  const userCanAddTransaction = await canUserAddTransactions();

  return (
    <>
      <Navbar />
      <div className="space-y-6 overflow-hidden p-6">
        {/* Titulo e Botao */}
        <div className="flex w-full items-center justify-between">
          <h1 className="text-2xl font-bold">Transações</h1>
          <AddTrasanctionButton userCanAddTransaction={userCanAddTransaction} />
        </div>
        <ScrollArea>
          <DataTable columns={transactionColumns} data={transactions} />
        </ScrollArea>
      </div>
    </>
  );
};

export default TranscripitionPage;
