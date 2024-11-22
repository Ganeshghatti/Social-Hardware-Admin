 import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { IoMdClose } from "react-icons/io";

export const ModalTrigger = ({ children }) => {
  return <Dialog.Trigger asChild>{children}</Dialog.Trigger>;
};
const Modal = ({
  title,
  children,
  modalBtn,
  closeIcon = true,
  contentProps,
  customCloseIcon,
  ...props
}) => {
  return (
    <Dialog.Root {...props}>
      <Dialog.Trigger asChild>{modalBtn}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="Modal-Overlay inset-0 fixed bg-black/50 z-50" />
        <Dialog.Content
          {...contentProps}
          className={`Modal-Content md:w-auto w-[95vw] md:min-w-[400px] overflow-auto max-w-screen max-h-screen fixed z-50 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] rounded-xl bg-[#F5F8FF] dark:bg-[#2d2d2d] border border-[#1a1a1a]/30  ${contentProps?.className}`}
        >
          {(closeIcon || title) && (
            <div className="flex items-start justify-end w-full p-2">
              {title && (
                <Dialog.Title className="flex-grow font-semibold text-white text-lg">
                  {title}
                </Dialog.Title>
              )}
              {closeIcon && !customCloseIcon && (
                <Dialog.Close className="aspect-square transition-all p-0.5 rounded-md ring ring-orange-500/20 active:ring-orange-500/50">
                  <IoMdClose />
                </Dialog.Close>
              )}
              {customCloseIcon && customCloseIcon}
            </div>
          )}
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default Modal;
