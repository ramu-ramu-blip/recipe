// import React from "react";

// export default function ShareRecipe({ recipe }) {
//   const shareRecipe = async () => {
//     if (navigator.share) {
//       await navigator.share({
//         title: recipe.title,
//         text: `Check out this recipe: ${recipe.title}`,
//         url: window.location.href,
//       });
//     } else {
//       alert("Sharing not supported on this browser.");
//     }
//   };

//   return (
//     <div className="flex justify-center mt-4">
//       <button
//         onClick={shareRecipe}
//         className="bg-orange-400 text-white px-4 py-2 rounded-lg hover:bg-orange-500"
//       >
//         Share Recipe
//       </button>
//     </div>
//   );
// }
