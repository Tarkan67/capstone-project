import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, Link } from "@mui/material";

export default function ActionAreaCard({ path, title, imageSrc }) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <Link href={path} underline="none">
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image={imageSrc}
            alt="level"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {title}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Link>
    </Card>
  );
}
