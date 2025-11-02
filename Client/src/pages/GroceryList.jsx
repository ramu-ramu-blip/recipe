import React, { useState } from "react";

export default function GroceryList({ recipes = [] }) {
  const [list, setList] = useState([]);

  const generateList = () => {
    const allIngredients = recipes.flatMap((r) =>
      r.ingredients ? r.ingredients.split(",") : []
    );
    const unique = [...new Set(allIngredients.map((i) => i.trim()))];
    setList(unique);
  };

  const toggleItem = (item) => {
    setList((prev) =>
      prev.map((i) =>
        i === item ? (i.includes("(Bought)") ? i.replace(" (Bought)", "") : `${i} (Bought)`) : i
      )
    );
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center text-orange-400">
        🛒 Grocery List Generator
      </h2>

      <button
        onClick={generateList}
        className="bg-orange-400 text-white px-4 py-2 rounded-lg mb-4 hover:bg-orange-500"
      >
         Grocery List
      </button>

      {list.length > 0 ? (
        <ul className="space-y-2">
          {list.map((item, i) => (
            <li
              key={i}
              onClick={() => toggleItem(item)}
              className={`cursor-pointer p-2 rounded-md border ${
                item.includes("(Bought)")
                  ? "bg-green-100 line-through"
                  : "hover:bg-gray-100"
              }`}
            >
              {item}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 text-center">
          Click “Generate Grocery List” after selecting your meal plan.
        </p>
      )}
    </div>
  );
}
