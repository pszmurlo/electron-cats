import {
  Box,
  BoxProps,
  List,
  ListItem,
  ListItemProps,
  Typography,
  styled,
} from "@mui/material";
import { CatFact } from "../../types/apiTypes";

interface FavoritesTabProps {
  facts: CatFact[];
}

const Container = styled(Box)<BoxProps>(() => ({
  padding: 16,
}));

const ListItemStyled = styled(ListItem)<ListItemProps>(() => ({
  paddingLeft: 0,
  paddingRight: 0,
}));

const FavoritesTab = ({ facts }: FavoritesTabProps) => {
  return (
    <Container>
      {facts.length === 0 ? (
        <Typography variant="h5">No favorites yet!</Typography>
      ) : (
        <List>
          {facts.map((fact) => (
            <ListItemStyled key={fact._id}>
              <Typography variant="h6">{fact.text}</Typography>
            </ListItemStyled>
          ))}
        </List>
      )}
    </Container>
  );
};

export default FavoritesTab;
