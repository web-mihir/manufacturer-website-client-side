import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import OrderInfoTable from '../../../Components/DashboardComponents/OrderInfoTable';

const OrderStatusModal = ({ order, closeModal }) => {

   return (
      <Modal show={order} onHide={closeModal}>
         <Modal.Body>
            <OrderInfoTable order={order}></OrderInfoTable>
         </Modal.Body>
         <Modal.Footer>
            <Button variant="secondary" onClick={closeModal}>
               Close
            </Button>
         </Modal.Footer>
      </Modal>
   );
};

export default OrderStatusModal;