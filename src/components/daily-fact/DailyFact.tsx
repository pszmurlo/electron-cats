import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Collapse,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { CatFact } from "../../types/apiTypes";

interface DailyFactProps {
  fact: CatFact;
  isLoading: boolean;
  onAddToFavorites: (event: React.SyntheticEvent) => void;
  onDelete: (event: React.SyntheticEvent) => void;
}

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
    <Box sx={{ p: 2 }} display="flex" justifyContent="center">
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
    </Box>
  );
};

export default DailyFact;
