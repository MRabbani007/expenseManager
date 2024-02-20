import CardHeader from "../components/CardHeader";
import CardIncomeExpense from "../components/CardIncomeExpense";
import CardPayment from "../components/CardPayment";

const HomePage = () => {
  return (
    <div className="flex flex-col gap-3">
      <CardHeader />
      <CardIncomeExpense />
      <CardPayment />
    </div>
  );
};

export default HomePage;
