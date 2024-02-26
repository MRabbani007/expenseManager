// Imported Components
import SectionExpenseDesc from "../components/SectionExpenseDesc";
import SectionViewTransactions from "../components/SectionViewTransactions";
import SectionAddTransaction from "../components/SectionAddTransaction";
import CardDatePayMethod from "../components/CardDatePayMethod";

const AddTransactionsPage = () => {
  return (
    <div className="flex flex-col items-center gap-3">
      <CardDatePayMethod />
      <SectionExpenseDesc />
      <SectionAddTransaction />
      <SectionViewTransactions />
    </div>
  );
};

export default AddTransactionsPage;
