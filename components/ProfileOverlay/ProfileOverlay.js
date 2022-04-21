import { Avatar, Button, IconButton, Popover, Typography } from "@mui/material";
import { useSession, signOut } from "next-auth/react";
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";
import styles from "./ProfileOverlay.module.css";

export default function ProfileOverlay() {
  const { data: session } = useSession();
  if (session) {
    return (
      <PopupState variant="popover" popupId="demo-popup-popover">
        {(popupState) => (
          <>
            <IconButton sx={{ p: 0 }}>
              <Avatar
                alt="Github-Profile-Image"
                src={session.user.image}
                {...bindTrigger(popupState)}
              ></Avatar>
            </IconButton>
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
              <Avatar
                alt="Github-Profile-Image"
                src={session.user.image}
                className={styles.Avatar}
              ></Avatar>
              <Typography sx={{ p: 2 }}>{session.user.name}</Typography>
              <Typography sx={{ p: 2 }}>{session.user.email}</Typography>
              <Button
                variant="contained"
                onClick={() => signOut()}
                className={styles.SignOutButton}
              >
                Sign out
              </Button>
            </Popover>
          </>
        )}
      </PopupState>
    );
  }
  return <></>;
}
