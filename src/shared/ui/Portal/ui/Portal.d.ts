import { ReactNode } from "react";
interface PortalProps {
    children: ReactNode;
    element?: HTMLElement;
}
export declare const Portal: (props: PortalProps) => import("react").ReactPortal;
export {};
