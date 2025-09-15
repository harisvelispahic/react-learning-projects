import MealItem from "./MealItem.jsx";
import LoadingIcon from "./UI/LoadingIcon.jsx";
import Error from "./Error.jsx";

import useHttp from "../hooks/useHttp";

const requestConfig = {};

export default function Meals() {
  const { data: meals, isLoading, error } = useHttp("http://localhost:3000/meals", requestConfig, []);

  if (isLoading) return <LoadingIcon />;

  if (error) return <Error title="Failed to fetch meals." message={error} />;

  return (
    <ul id="meals">
      {meals.map((meal) => (
        <MealItem key={meal.id} meal={meal} />
      ))}
    </ul>
  );
}
