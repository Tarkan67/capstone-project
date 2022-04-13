import { Avatar, Button, Popover, Typography } from "@mui/material";
import { useSession, signOut } from "next-auth/react";
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";
import styles from "./LeaderBoardButton.module.css";
import LeaderBoard from "../LeaderBoard/LeaderBoard";

export default function LeaderBoardButton() {
  const { data: session } = useSession();
  if (session) {
    return (
      <PopupState variant="popover" popupId="demo-popup-popover">
        {(popupState) => (
          <>
            <Button
              variant="contained"
              className={styles.LeaderBoardButton}
              {...bindTrigger(popupState)}
            >
              Ranking
            </Button>
            <Popover
              {...bindPopover(popupState)}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
            >
              <LeaderBoard></LeaderBoard>
            </Popover>
          </>
        )}
      </PopupState>
    );
  }
  return <></>;
}
