import React from "react";
import useFetchData from "./hooks/useFetchData";

const App = () => {
  const { data, isLoading, error } = useFetchData({
    url: "/facts/random",
    queryParams: { amount: 1, animal_type: "cat" },
  });

  if (isLoading) return <div>Loading cat facts...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <ul>
        {data && Array.isArray(data)
          ? data.map((fact) => <li key={fact._id}>{fact.text}</li>)
          : data && <li>{data.text}</li>}
      </ul>
    </div>
  );
};

export default App;
