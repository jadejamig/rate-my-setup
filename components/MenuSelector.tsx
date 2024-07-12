import { ClickAwayListener, Grow, MenuItem, MenuList, Paper, Popper } from "@mui/material";
import { useEffect, useRef, useState } from "react";

type MenuItemProps = {
  label: string;
  onClick: () => void;
};

interface MenuSelectorProps {
  children: React.ReactNode;
  menuItems: MenuItemProps[];
}

export default function MenuSelector({ children, menuItems }: MenuSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const anchorRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => {
    setIsOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: Event | React.SyntheticEvent) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setIsOpen(false);
  };

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === "Tab") {
      event.preventDefault();
      setIsOpen(false);
    } else if (event.key === "Escape") {
      setIsOpen(false);
    }
  }

    // return focus to the button when we transitioned from !open -> open
    const prevOpen = useRef(isOpen);
    useEffect(() => {
      if (prevOpen.current === true && isOpen === false) {
        anchorRef.current!.focus();
      }
  
      prevOpen.current = isOpen;
    }, [open]);
  return (
    <>
      <div
      ref={anchorRef}
      onClick={handleToggle}
      >
        {children}
      </div>
      <Popper
        open={isOpen}
        anchorEl={anchorRef.current}
        role={undefined}
        placement="bottom-end"
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom-start" ? "left top" : "left bottom",
            }}
            
          >
            <Paper sx={{ boxShadow: 'none'}}>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  id="composition-menu"
                  aria-labelledby="composition-button"
                  onKeyDown={handleListKeyDown}
                  className="shadow-lg"
                > 
                  {menuItems.map((menuItem) => {
                    return (
                      <MenuItem onClick={menuItem.onClick}>
                        <p className="text-sm">{menuItem.label}</p>
                      </MenuItem>
                    )
                  })}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
}