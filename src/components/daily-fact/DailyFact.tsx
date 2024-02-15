import {
  Box,
  BoxProps,
  Button,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Collapse,
  Stack,
  Typography,
  styled,
} from "@mui/material";
import { useState } from "react";
import { CatFact } from "../../types/apiTypes";

interface DailyFactProps {
  fact: CatFact;
  isLoading: boolean;
  onAddToFavorites: (event: React.SyntheticEvent) => void;
  onDelete: (event: React.SyntheticEvent) => void;
}

const Container = styled(Box)<BoxProps>(() => ({
  display: "flex",
  justifyContent: "center",
  padding: 16,
}));

const DailyFact = ({
  fact,
  isLoading,
  onAddToFavorites,
  onDelete,
}: DailyFactProps) => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

  const handleMouseOver = () => {
    setIsCollapsed(true);
  };

  const handleMouseOut = () => {
    setIsCollapsed(false);
  };

  return (
    <Container>
      {isLoading ? (
        <CircularProgress />
      ) : (
        fact && (
          <div
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
            role="region"
            style={{ width: "100%" }}
            data-testid="fact-card"
          >
            <Card>
              <CardHeader title="Amazing Cat Fact" />
              <CardContent>
                <Typography variant="body1">{fact.text}</Typography>
              </CardContent>
              <Collapse in={isCollapsed} timeout="auto" unmountOnExit>
                <Stack direction="row" justifyContent="space-between" p={2}>
                  <Button variant="outlined" onClick={onAddToFavorites}>
                    Add to Favorites
                  </Button>
                  <Button variant="outlined" color="error" onClick={onDelete}>
                    Delete
                  </Button>
                </Stack>
              </Collapse>
            </Card>
          </div>
        )
      )}
    </Container>
  );
};

export default DailyFact;
