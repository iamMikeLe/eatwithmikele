import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import Modal from "@mui/material/Modal";
import { Button, Typography } from "components";
import { useTranslation } from "react-i18next";

import { setDarkMode, useMaterialUIController } from "context";

//store
import {
  selectSettingsModal,
  setShowSettingsModal,
} from "store/appSettingsSlice";
import { useAppDispatch, useAppSelector } from "store/hooks";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function SettingsModal() {
  const settingsModal = useAppSelector(selectSettingsModal);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const [{ darkMode }, dispatchContext] = useMaterialUIController();

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={settingsModal}
      onClose={() => dispatch(setShowSettingsModal(false))}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={settingsModal}>
        <Box sx={style}>
          <Typography id="transition-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="transition-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
          <Button
            variant="gradient"
            color="dark"
            onClick={() => setDarkMode(dispatchContext, !darkMode)}
          >
            {t("TOGGLE_DARK_MODE")}
          </Button>
        </Box>
      </Fade>
    </Modal>
  );
}