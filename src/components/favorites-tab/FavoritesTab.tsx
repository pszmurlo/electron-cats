import { Box, List, ListItem, Typography } from "@mui/material";
import { CatFact } from "../../types/apiTypes";

interface FavoritesTabProps {
  facts: CatFact[];
}

const FavoritesTab = ({ facts }: FavoritesTabProps) => {
  return (
    <Box sx={{ p: 2 }}>
      {facts.length === 0 ? (
        <Typography variant="h5">No favorites yet!</Typography>
      ) : (
        <List>
          {facts.map((fact) => (
            <ListItem key={fact._id} sx={{ paddingX: 0 }}>
              <Typography variant="h6">{fact.text}</Typography>
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
};

export default FavoritesTab;
