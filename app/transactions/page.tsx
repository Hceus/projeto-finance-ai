import { db } from "../_lib/prisma";
import { DataTable } from "../_components/ui/data-table";
import { transactionColumns } from "./_columns";
import AddTrasanctionButton from "../_components/add-transaction-button";

const TranscripitionPage = async () => {
  //acessar as transações do banco de dados

  const transactions = await db.transaction.findMany({});
  return (
    <div className="space-y-6 p-6">
      {/* Titulo e Botao */}
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl font-bold">Transações</h1>
        <AddTrasanctionButton />
      </div>
      <DataTable columns={transactionColumns} data={transactions} />
    </div>
  );
};

export default TranscripitionPage;
