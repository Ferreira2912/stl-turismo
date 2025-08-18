import { useState } from 'react';
import { Calendar } from 'lucide-react';
import Button from '../common/Button';
import ReservationSystem from './ReservationSystem';

const ReservationButton = ({ 
  packageData = null, 
  text = "Fazer Reserva", 
  variant = "primary",
  size = "lg",
  className = "",
  icon = true 
}) => {
  const [isReservationOpen, setIsReservationOpen] = useState(false);

  const openReservation = () => {
    setIsReservationOpen(true);
  };

  const closeReservation = () => {
    setIsReservationOpen(false);
  };

  return (
    <>
      <Button
        variant={variant}
        size={size}
        onClick={openReservation}
        className={`${className}`}
        icon={icon ? Calendar : null}
        iconPosition="left"
      >
        {text}
      </Button>

      <ReservationSystem
        packageData={packageData}
        isOpen={isReservationOpen}
        onClose={closeReservation}
      />
    </>
  );
};

export default ReservationButton;
