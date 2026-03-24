import { SwipeableDrawerProps } from "@mui/material";
import { ReactNode } from "react";
export interface DrawerMobileProps extends SwipeableDrawerProps {
    open: boolean;
    onClose: () => void;
    onOpen: () => void;
    height?: string;
    disableSwipeToOpen?: boolean;
    children: ReactNode;
}
export declare const Drawer: (props: DrawerMobileProps) => import("react/jsx-runtime").JSX.Element;
