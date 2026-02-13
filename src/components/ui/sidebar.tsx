import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const SIDEBAR_WIDTH = "16rem";
const SIDEBAR_WIDTH_ICON = "3rem";

type SidebarContext = {
  state: "expanded" | "collapsed";
  open: boolean;
  setOpen: (open: boolean) => void;
  openMobile: boolean;
  setOpenMobile: (open: boolean) => void;
  isMobile: boolean;
  toggleSidebar: () => void;
};

const SidebarContext = React.createContext<SidebarContext | undefined>(
  undefined,
);

function useSidebar() {
  const context = React.useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
}

interface SidebarProviderProps {
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}

const SidebarProvider = React.forwardRef<HTMLDivElement, SidebarProviderProps>(
  ({ defaultOpen = true, open: openProp, onOpenChange, children }, ref) => {
    const [_open, _setOpen] = React.useState(defaultOpen);
    const [openMobile, setOpenMobile] = React.useState(false);
    const [isMobile, setIsMobile] = React.useState(false);

    const open = openProp ?? _open;
    const setOpen = React.useCallback(
      (value: boolean | ((value: boolean) => boolean)) => {
        const openState = typeof value === "function" ? value(open) : value;
        if (onOpenChange) {
          onOpenChange(openState);
        } else {
          _setOpen(openState);
        }
      },
      [onOpenChange, open],
    );

    React.useEffect(() => {
      const handleResize = () => {
        const mobile = window.innerWidth < 768;
        setIsMobile(mobile);
        if (mobile) {
          setOpenMobile(false);
        }
      };

      handleResize();
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);

    const toggleSidebar = React.useCallback(() => {
      if (isMobile) {
        setOpenMobile((prev) => !prev);
      } else {
        setOpen((prev) => !prev);
      }
    }, [isMobile, setOpen]);

    const state = open ? "expanded" : "collapsed";

    const contextValue: SidebarContext = {
      state,
      open,
      setOpen,
      openMobile,
      setOpenMobile,
      isMobile,
      toggleSidebar,
    };

    return (
      <SidebarContext.Provider value={contextValue}>
        <div
          ref={ref}
          className="flex h-screen w-full overflow-hidden"
          style={
            {
              "--sidebar-width": SIDEBAR_WIDTH,
              "--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
            } as React.CSSProperties
          }
        >
          {children}
        </div>
      </SidebarContext.Provider>
    );
  },
);
SidebarProvider.displayName = "SidebarProvider";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  side?: "left" | "right";
  variant?: "sidebar" | "floating" | "inset";
  collapsible?: "offcanvas" | "icon" | "none";
}

const Sidebar = React.forwardRef<HTMLDivElement, SidebarProps>(
  (
    {
      side = "left",
      variant = "sidebar",
      collapsible = "icon",
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const { state, isMobile, openMobile, setOpenMobile } = useSidebar();

    if (isMobile) {
      return (
        <>
          {openMobile && (
            <>
              <div
                className="fixed inset-0 z-[60] bg-black/50"
                onClick={() => setOpenMobile(false)}
              />
              <aside
                ref={ref}
                className={cn(
                  "fixed inset-y-0 left-0 z-[70] flex h-full w-64 flex-col border-r bg-white transition-transform duration-200",
                  className,
                )}
                {...props}
              >
                {children}
              </aside>
            </>
          )}
        </>
      );
    }

    return (
      <aside
        ref={ref}
        className={cn(
          "flex h-full shrink-0 flex-col border-r bg-white transition-all duration-200",
          state === "expanded" ? "w-64" : "w-[3rem]",
          className,
        )}
        {...props}
      >
        {children}
      </aside>
    );
  },
);
Sidebar.displayName = "Sidebar";

const SidebarHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col gap-2 p-4", className)}
    {...props}
  />
));
SidebarHeader.displayName = "SidebarHeader";

const SidebarContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-1 flex-col overflow-y-auto", className)}
    {...props}
  />
));
SidebarContent.displayName = "SidebarContent";

const SidebarFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col gap-2 p-4", className)}
    {...props}
  />
));
SidebarFooter.displayName = "SidebarFooter";

const SidebarSeparator = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("h-px bg-gray-200", className)} {...props} />
));
SidebarSeparator.displayName = "SidebarSeparator";

const SidebarInset = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <main
    ref={ref}
    className={cn("flex flex-1 flex-col overflow-hidden bg-gray-50", className)}
    {...props}
  />
));
SidebarInset.displayName = "SidebarInset";

const SidebarMenu = React.forwardRef<
  HTMLUListElement,
  React.HTMLAttributes<HTMLUListElement>
>(({ className, ...props }, ref) => (
  <ul ref={ref} className={cn("flex w-full flex-col", className)} {...props} />
));
SidebarMenu.displayName = "SidebarMenu";

const SidebarMenuItem = React.forwardRef<
  HTMLLIElement,
  React.HTMLAttributes<HTMLLIElement>
>(({ className, ...props }, ref) => (
  <li ref={ref} className={cn("list-none", className)} {...props} />
));
SidebarMenuItem.displayName = "SidebarMenuItem";

const sidebarMenuButtonVariants = cva(
  "flex w-full items-center gap-3 px-4 py-3 text-sm font-medium transition-colors hover:bg-gray-100",
  {
    variants: {
      isActive: {
        true: "bg-blue-50 text-blue-600 border-l-2 border-blue-600",
        false: "text-gray-600",
      },
    },
    defaultVariants: {
      isActive: false,
    },
  },
);

interface SidebarMenuButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  isActive?: boolean;
}

const SidebarMenuButton = React.forwardRef<
  HTMLButtonElement,
  SidebarMenuButtonProps
>(({ asChild = false, isActive = false, className, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      ref={ref}
      className={cn(sidebarMenuButtonVariants({ isActive }), className)}
      {...props}
    />
  );
});
SidebarMenuButton.displayName = "SidebarMenuButton";

const SidebarTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, onClick, ...props }, ref) => {
  const { toggleSidebar } = useSidebar();

  return (
    <button
      ref={ref}
      onClick={(e) => {
        onClick?.(e);
        toggleSidebar();
      }}
      className={cn(
        "inline-flex items-center justify-center rounded-md p-2 hover:bg-gray-100",
        className,
      )}
      {...props}
    />
  );
});
SidebarTrigger.displayName = "SidebarTrigger";

export {
  Sidebar,
  SidebarProvider,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarSeparator,
  SidebarInset,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
  useSidebar,
};
