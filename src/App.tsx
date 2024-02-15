import { Box, BoxProps, Tab, Tabs, styled } from "@mui/material";
import { useEffect, useState } from "react";
import DailyFact from "./components/daily-fact/DailyFact";
import FavoritesTab from "./components/favorites-tab/FavoritesTab";
import FrequencySelection from "./components/frequency-selection/FrequencySelection";
import useFetchData from "./hooks/useFetchData";
import useLocalStorage from "./hooks/useLocalStorage";
import { CatFact } from "./types/apiTypes";

const Container = styled(Box)<BoxProps>(() => ({
  display: "flex",
  flexDirection: "column",
}));

const TabsWrapper = styled(Box)<BoxProps>(() => ({
  display: "flex",
  flexDirection: "column",
  flexGrow: 1,
  marginBottom: 16,
}));

const App = () => {
  const [currentFact, setCurrentFact] = useState<CatFact | null>(null);
  const [activeTab, setActiveTab] = useState(0);

  const { data, isLoading, error, fetchNewFact } = useFetchData({
    url: "/facts/random",
    queryParams: { amount: 1, animal_type: "cat" },
  });

  const { favorites, saveFavorite } = useLocalStorage();

  const handleAddToFavorites = () => {
    saveFavorite({ id: currentFact._id, text: currentFact.text });
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
    <Container>
      <TabsWrapper>
        <Tabs
          value={activeTab}
          onChange={handleChangeTab}
          aria-label="Daily Fact or Favorites"
        >
          <Tab label="Daily Fact" />
          <Tab label="Favorites" />
        </Tabs>
      </TabsWrapper>
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
      {activeTab === 1 && <FavoritesTab facts={favorites} />}
    </Container>
  );
};

export default App;
