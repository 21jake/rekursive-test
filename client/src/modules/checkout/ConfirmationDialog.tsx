import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react-pro';

interface IConfirmationDialogProps {
  visible: boolean;
}

const ConfirmationDialog = ({ visible }: IConfirmationDialogProps) => {
  return (
    <CModal visible={visible} backdrop="static">
      <CModalHeader closeButton={false}>
        <CModalTitle>Successfully placed an order</CModalTitle>
      </CModalHeader>
      <CModalBody>Your order is getting processed. Press "Order again" to place another order!</CModalBody>
      <CModalFooter>
        <CButton color="primary" onClick={() => window.location.reload()}>
          Order again!
        </CButton>
      </CModalFooter>
    </CModal>
  );
};

export default ConfirmationDialog;
