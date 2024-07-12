import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import { IconUser } from "@tabler/icons-react";
import { User } from "firebase/auth";
import { useEffect, useRef, useState } from "react";
import { signOutUser } from "@/actions/auth";

interface UserHeaderButtonProps {
  user: User | null;
}

export default function UserHeaderButton({ user }: UserHeaderButtonProps) {
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
      className="flex items-center justify-center gap-3 px-4 py-2 rounded-lg hover:bg-stone-100 dark:hover:bg-dark-300 cursor-pointer">
        <p className="font-semibold text-sm hidden sm:block">
          {user?.displayName?.toLocaleUpperCase() ?? "User"}
        </p>
        {user?.photoURL ? (
          <div className="h-9 w-9 overflow-hidden rounded-full ring ring-emerald-500 ring-offset-base-100">
            <img className="h-full" src={user.photoURL} alt="profile" />
          </div>
        ) : (
          <IconUser />
        )}
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
                  <MenuItem onClick={async () => await signOutUser()}>
                    <p className="text-sm">Logout</p>
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
}
