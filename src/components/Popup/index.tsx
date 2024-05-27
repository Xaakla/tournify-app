import React from "react";
import { DialogContentLabel } from "./styles";
import Dialog, {
  DialogContent,
  SlideAnimation,
  DialogFooter,
  DialogButton,
} from "react-native-popup-dialog";
interface PopupPropsInterface {
  isVisible: boolean;
  onTouchOutside: Function;
  leftBtnLabel: string;
  rightBtnLabel: string;
  onPressLeftBtn: Function;
  onPressRightBtn: Function;
  contentLabel: string;
}

function Popup({
  isVisible,
  contentLabel,
  leftBtnLabel,
  onPressLeftBtn,
  onPressRightBtn,
  onTouchOutside,
  rightBtnLabel,
}: PopupPropsInterface) {
  return (
    <Dialog
      visible={isVisible}
      dialogAnimation={
        new SlideAnimation({
          slideFrom: "bottom",
        })
      }
      onTouchOutside={onTouchOutside}
      footer={
        <DialogFooter>
          <DialogButton text={leftBtnLabel} onPress={onPressLeftBtn} />
          <DialogButton text={rightBtnLabel} onPress={onPressRightBtn} />
        </DialogFooter>
      }
    >
      <DialogContent>
        <DialogContentLabel>{contentLabel}</DialogContentLabel>
      </DialogContent>
    </Dialog>
  );
}

export default Popup;
