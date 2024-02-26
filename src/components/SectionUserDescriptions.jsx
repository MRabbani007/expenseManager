import React from "react";
import { FaCheck, FaTimes } from "react-icons/fa";

import {
  expenseDesc_living,
  expenseDesc_food,
  expenseDesc_shopping,
  expenseDesc_medical,
  expenseDesc_sport_entertainment,
  expenseDesc_transport,
} from "../data/templates";
import BlockExpenseDesc from "./BlockExpenseDesc";
import Slider from "./Slider";

const SectionUserDescriptions = () => {
  return (
    <div className="">
      <Slider>
        <BlockExpenseDesc
          listTitle={"Living"}
          expenseDescArray={expenseDesc_living}
        />
        <BlockExpenseDesc
          listTitle={"Food & Shopping"}
          expenseDescArray={[...expenseDesc_food, ...expenseDesc_shopping]}
        />
        <BlockExpenseDesc
          listTitle={"Medical"}
          expenseDescArray={expenseDesc_medical}
        />
        <BlockExpenseDesc
          listTitle={"Sport & Entertainment"}
          expenseDescArray={expenseDesc_sport_entertainment}
        />
        <BlockExpenseDesc
          listTitle={"Transport"}
          expenseDescArray={expenseDesc_transport}
        />
      </Slider>
    </div>
  );
};

export default SectionUserDescriptions;
