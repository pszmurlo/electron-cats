import { Box, Tab, Tabs } from "@mui/material";
import { useEffect, useState } from "react";
import DailyFact from "./components/daily-fact/DailyFact";
import FavoritesTab from "./components/favorites-tab/FavoritesTab";
import FrequencySelection from "./components/frequency-selection/FrequencySelection";
import useFetchData from "./hooks/useFetchData";

const App = () => {
  const [currentFact, setCurrentFact] = useState(null);
  const [favoriteFacts, setFavoriteFacts] = useState([]);
  const [activeTab, setActiveTab] = useState(0);

  const { data, isLoading, error, fetchNewFact } = useFetchData({
    url: "/facts/random",
    queryParams: { amount: 1, animal_type: "cat" },
  });

  const handleAddToFavorites = () => {
    setFavoriteFacts([...favoriteFacts, currentFact]);
    setCurrentFact(null);
    fetchNewFact();
  };

  const handleDeleteFact = () => {
    setCurrentFact(null);
    fetchNewFact();
  };

  const handleChangeTab = (_event: React.SyntheticEvent, newTab: number) => {
    setActiveTab(newTab);
  };

  useEffect(() => {
    if (data) {
      setCurrentFact(data);
    }
  }, [data]);

  window.electronAPI.fetchCatFact(() => {
    if (currentFact) {
      window.electronAPI.catFact(currentFact?.text);
    }
  });

  if (error) return <div>Error: {error.message}</div>;

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Box
        sx={{ flexGrow: 1, display: "flex", flexDirection: "column", mb: 2 }}
      >
        <Tabs
          value={activeTab}
          onChange={handleChangeTab}
          aria-label="Daily Fact or Favorites"
        >
          <Tab label="Daily Fact" />
          <Tab label="Favorites" />
        </Tabs>
      </Box>
      {activeTab === 0 && (
        <>
          <DailyFact
            fact={currentFact}
            onAddToFavorites={handleAddToFavorites}
            onDelete={handleDeleteFact}
            isLoading={isLoading}
          />
          <FrequencySelection />
        </>
      )}
      {activeTab === 1 && <FavoritesTab facts={favoriteFacts} />}
    </Box>
  );
};

export default App;
