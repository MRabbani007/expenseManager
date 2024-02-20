// Imported Components
import SectionExpenseDesc from "../components/SectionExpenseDesc";
import SectionViewTransactions from "../components/SectionViewTransactions";
import SectionAddTransaction from "../components/SectionAddTransaction";
import CardDatePayMethod from "../components/CardDatePayMethod";

const AddTransactionsPage = () => {
  return (
    <div className="flex flex-col items-center">
      <CardDatePayMethod />
      <SectionExpenseDesc />
      <div className="my-3">
        <SectionAddTransaction />
      </div>
      <div className="px-2">
        <SectionViewTransactions />
      </div>
    </div>
  );
};

export default AddTransactionsPage;
