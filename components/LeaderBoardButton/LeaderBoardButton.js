import { Button, Popover } from "@mui/material";
import { useSession } from "next-auth/react";
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";
import LeaderBoard from "../LeaderBoard/LeaderBoard";

export default function LeaderBoardButton({ page, handleCloseNavMenu }) {
  const { data: session } = useSession();
  if (session) {
    return (
      <PopupState variant="popover" popupId="demo-popup-popover">
        {(popupState) => (
          <>
            <Button
              key={page}
              onClick={handleCloseNavMenu}
              {...bindTrigger(popupState)}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              {page}
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
