import { Portal } from "@/shared/ui/Portal";
import { styled, SwipeableDrawer, SwipeableDrawerProps } from "@mui/material";
import { ReactNode } from "react";
import { grey } from "@mui/material/colors";

export interface DrawerMobileProps extends SwipeableDrawerProps {
  open: boolean;
  onClose: () => void;
  onOpen: () => void;
  height?: string;
  disableSwipeToOpen?: boolean;
  children: ReactNode;
}

const Puller = styled("div")(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor: theme.palette.mode === "light" ? grey[300] : grey[900],
  borderRadius: 3,
  position: "absolute",
  top: 8,
  left: "calc(50% - 15px)",
}));

const DrawerWrapper = styled("div")(() => ({
  minHeight: "400px",
  marginTop: "24px",
  padding: "24px",
  borderTopLeftRadius: "8px",
  borderTopRightRadius: "8px",
}));

export const Drawer = (props: DrawerMobileProps) => {
  const {
    open,
    onClose,
    onOpen,
    height,
    disableSwipeToOpen,
    children,
    ...other
  } = props;

  return (
    <Portal>
      <SwipeableDrawer
        open={open}
        anchor={"bottom"}
        onClose={onClose}
        onOpen={onOpen}
        disableSwipeToOpen={disableSwipeToOpen}
        swipeAreaWidth={disableSwipeToOpen ? 0 : undefined}
        PaperProps={{
          sx: {
            borderTopLeftRadius: "8px",
            borderTopRightRadius: "8px",
            height,
          },
        }}
      >
        <DrawerWrapper>
          <Puller />
          {children}
        </DrawerWrapper>
      </SwipeableDrawer>
    </Portal>
  );
};
